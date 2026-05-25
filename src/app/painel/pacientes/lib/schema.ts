// Compartilhado entre Server Action (validação) e Client (parsing local).
// Não pode ser "server-only".
import { z } from "zod";
import { PatientTag } from "@/generated/prisma/client";

/**
 * Resultado padronizado de Server Actions desta feature.
 * Mesmo formato das 2.1/2.2 — manter alinhado.
 */
export type ActionResult<T = null> =
  | { ok: true; data: T }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

// ── Helpers de telefone ────────────────────────────────────────

/**
 * Normaliza telefone BR para E.164: "+55DDDNNNNNNNN" (fixo) ou
 * "+55DDDNNNNNNNNN" (celular).
 *
 * Aceita: 10 dig (DDD+fixo), 11 dig (DDD+celular), 12 dig (55+DDD+fixo),
 * 13 dig (55+DDD+celular). Tudo que não for dígito é descartado antes.
 *
 * Rejeita: comprimentos fora desse conjunto, country code != 55,
 * DDD começando com 0.
 *
 * A Fase 4 (Júlia) faz lookup por phone — se a normalização aqui
 * divergir do que chega no webhook do WhatsApp, o paciente não é achado.
 */
export function normalizePhoneBR(input: string): string | null {
  const digits = input.replace(/\D/g, "");
  let ddd: string;
  let rest: string;
  switch (digits.length) {
    case 10:
    case 11:
      ddd = digits.slice(0, 2);
      rest = digits.slice(2);
      break;
    case 12:
    case 13:
      if (digits.slice(0, 2) !== "55") return null;
      ddd = digits.slice(2, 4);
      rest = digits.slice(4);
      break;
    default:
      return null;
  }
  const dddNum = Number(ddd);
  if (!Number.isInteger(dddNum) || dddNum < 11 || dddNum > 99) return null;
  if (rest.length !== 8 && rest.length !== 9) return null;
  return `+55${ddd}${rest}`;
}

/**
 * Retorna true se o E.164 é celular (rest com 9 dígitos).
 * Júlia/Sofia usam pra decidir se podem mandar WhatsApp.
 * "+55" (3) + DDD (2) + 9 = 14 chars exatos.
 */
export function isMobilePhone(phoneE164: string): boolean {
  return phoneE164.startsWith("+55") && phoneE164.length === 14;
}

// ── Validador de CPF ───────────────────────────────────────────

/**
 * Valida CPF pelos 2 dígitos verificadores. Aceita "123.456.789-00"
 * ou "12345678900". Rejeita CPFs com todos os dígitos iguais.
 * Retorna 11 dígitos sem máscara, ou null se inválido.
 *
 * Dívida técnica menor: não há lista negra de CPFs de teste públicos
 * (00000000191 é o "CPF de teste" da Receita e passa nos DVs).
 */
export function validateCPF(input: string): string | null {
  const digits = input.replace(/\D/g, "");
  if (digits.length !== 11) return null;
  if (/^(\d)\1{10}$/.test(digits)) return null;

  let sum = 0;
  for (let i = 0; i < 9; i++) sum += Number(digits[i]) * (10 - i);
  let dv1 = (sum * 10) % 11;
  if (dv1 === 10) dv1 = 0;
  if (dv1 !== Number(digits[9])) return null;

  sum = 0;
  for (let i = 0; i < 10; i++) sum += Number(digits[i]) * (11 - i);
  let dv2 = (sum * 10) % 11;
  if (dv2 === 10) dv2 = 0;
  if (dv2 !== Number(digits[10])) return null;

  return digits;
}

// ── Parsing de data de nascimento ─────────────────────────────

/**
 * Parse "dd/mm/yyyy" → Date local. Valida que o roundtrip bate
 * (ex: 31/02/2020 vira 02/03/2020 silenciosamente — rejeitamos).
 */
export function parseBirthDateBR(input: string): Date | null {
  const m = input.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!m) return null;
  const dd = Number(m[1]);
  const mm = Number(m[2]);
  const yyyy = Number(m[3]);
  const d = new Date(yyyy, mm - 1, dd);
  if (
    d.getFullYear() !== yyyy ||
    d.getMonth() !== mm - 1 ||
    d.getDate() !== dd
  ) {
    return null;
  }
  return d;
}

// ── Schema Zod do form ─────────────────────────────────────────

const MIN_BIRTH_YEAR = new Date().getFullYear() - 130;

/** Coerce "" → undefined antes de validar (form data manda string vazia). */
const emptyStringToUndefined = (v: unknown) =>
  typeof v === "string" && v.trim() === "" ? undefined : v;

export const patientInputSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Nome precisa ter ao menos 2 caracteres")
    .max(120, "Nome longo demais"),
  phone: z
    .string()
    .trim()
    .min(1, "Telefone é obrigatório")
    .transform((v, ctx) => {
      const e164 = normalizePhoneBR(v);
      if (!e164) {
        ctx.addIssue({
          code: "custom",
          message:
            "Telefone inválido. Use DDD + número (ex: (11) 99999-9999).",
        });
        return z.NEVER;
      }
      return e164;
    }),
  email: z.preprocess(
    emptyStringToUndefined,
    z.string().trim().email("E-mail inválido").optional(),
  ),
  cpf: z.preprocess(
    emptyStringToUndefined,
    z
      .string()
      .trim()
      .optional()
      .transform((v, ctx) => {
        if (v === undefined) return undefined;
        const cleaned = validateCPF(v);
        if (!cleaned) {
          ctx.addIssue({ code: "custom", message: "CPF inválido" });
          return z.NEVER;
        }
        return cleaned;
      }),
  ),
  birthDate: z.preprocess(
    emptyStringToUndefined,
    z
      .string()
      .trim()
      .optional()
      .transform((v, ctx) => {
        if (v === undefined) return undefined;
        const d = parseBirthDateBR(v);
        if (!d) {
          ctx.addIssue({
            code: "custom",
            message: "Data inválida. Use dd/mm/aaaa.",
          });
          return z.NEVER;
        }
        if (d.getTime() >= Date.now()) {
          ctx.addIssue({
            code: "custom",
            message: "Data de nascimento não pode ser no futuro.",
          });
          return z.NEVER;
        }
        if (d.getFullYear() < MIN_BIRTH_YEAR) {
          ctx.addIssue({
            code: "custom",
            message: "Data de nascimento muito antiga (máximo 130 anos).",
          });
          return z.NEVER;
        }
        return d;
      }),
  ),
  tag: z.nativeEnum(PatientTag, { message: "Tag inválida" }),
  notes: z.preprocess(
    emptyStringToUndefined,
    z
      .string()
      .max(2000, "Observações longas demais (limite 2000 caracteres)")
      .optional(),
  ),
});

export type PatientInput = z.infer<typeof patientInputSchema>;

/** Schema avulso para o atalho de salvar só observações. */
export const patientNotesSchema = z
  .string()
  .max(2000, "Observações longas demais (limite 2000 caracteres)");

/** Schema avulso para o atalho de dropdown de tag. */
export const patientTagSchema = z.nativeEnum(PatientTag, {
  message: "Tag inválida",
});
