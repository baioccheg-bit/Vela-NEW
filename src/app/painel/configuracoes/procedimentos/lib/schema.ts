// Compartilhado entre Server Action (validação) e Client (parse de preço).
// Não pode ser "server-only".
import { z } from "zod";

/**
 * Resultado padronizado de Server Actions desta feature.
 * Mesmo formato da 2.1 (Profissionais) — manter alinhado.
 */
export type ActionResult<T = null> =
  | { ok: true; data: T }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

/**
 * Schema do formulário de Procedimento.
 * - `priceBRL` é `nonnegative` (≥ 0): avaliações iniciais, retornos e
 *   cortesias são procedimentos legítimos sem cobrança.
 * - `durationMin` precisa ser múltiplo de 5: clínica não agenda em
 *   janelas quebradas (ex.: 23min).
 */
export const procedureInputSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Nome precisa ter ao menos 2 caracteres")
    .max(120, "Nome longo demais"),
  durationMin: z.coerce
    .number({ message: "Duração inválida" })
    .int("Duração deve ser um número inteiro")
    .positive("Duração deve ser maior que zero")
    .max(480, "Duração máxima de 8 horas (480 minutos)")
    .refine((v) => v % 5 === 0, "A duração deve ser múltiplo de 5 minutos"),
  priceBRL: z.coerce
    .number({ message: "Preço inválido" })
    .nonnegative("Preço não pode ser negativo")
    .max(99999.99, "Preço excede o limite de R$ 99.999,99")
    .refine(
      (v) => Math.round(v * 100) === v * 100,
      "Use no máximo 2 casas decimais",
    ),
  active: z.boolean(),
});

export type ProcedureInput = z.infer<typeof procedureInputSchema>;

/**
 * Normaliza entrada de preço aceitando os formatos comuns no Brasil:
 *   "350"        → 350
 *   "350,00"     → 350
 *   "350.00"     → 350
 *   "1.234,56"   → 1234.56  (ponto = milhar, vírgula = decimal)
 *   "1,234.56"   → 1234.56  (vírgula = milhar, ponto = decimal)
 *
 * Heurística: o último separador (vírgula ou ponto) é tratado como decimal;
 * o outro é tratado como separador de milhar e removido. Retorna `null`
 * pra string vazia ou não-numérica — a validação Zod cuida do resto.
 */
export function parseBRLInput(raw: string): number | null {
  const cleaned = raw.replace(/[^\d.,-]/g, "").trim();
  if (!cleaned) return null;
  const lastComma = cleaned.lastIndexOf(",");
  const lastDot = cleaned.lastIndexOf(".");
  let normalized: string;
  if (lastComma === -1 && lastDot === -1) {
    normalized = cleaned;
  } else if (lastComma > lastDot) {
    normalized = cleaned.replace(/\./g, "").replace(",", ".");
  } else {
    normalized = cleaned.replace(/,/g, "");
  }
  const n = Number(normalized);
  return Number.isFinite(n) ? n : null;
}
