// Schemas Zod e helpers de validação. Mantenha imports VALOR ("zod",
// "@/generated/prisma/client") só aqui — Client Components devem importar
// SÓ types deste arquivo. Para usar formatters/parsers no client, importe
// de "./format".
import { z } from "zod";

import { parseDateTimeBR } from "./format";

/**
 * Resultado padronizado de Server Actions desta feature.
 * Mesmo formato das 2.1/2.2/2.3 — manter alinhado.
 */
export type ActionResult<T = null> =
  | { ok: true; data: T }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

// ── Constantes de domínio ──────────────────────────────────────

/** Múltiplo padrão da duração. UI bloqueia 5/10/15… */
export const DURATION_STEP_MIN = 5;
/** Mínimo aceitável de duração (ex: aplicação rápida). */
export const DURATION_MIN = 5;
/** Máximo (8h). Usado como limite da janela de conflito também. */
export const DURATION_MAX = 480;
/** Mesmo teto financeiro do Procedure (R$ 99.999,99). */
export const PRICE_MAX_BRL = 99999.99;

/** Limite de quanto no passado um agendamento pode ser registrado/marcado. */
export const PAST_TOLERANCE_DAYS = 1;
/** Limite de quanto no futuro pode marcar (sanidade). */
export const FUTURE_TOLERANCE_DAYS = 365;

// ── Schemas Zod ────────────────────────────────────────────────

const cuidSchema = z
  .string()
  .trim()
  .min(1, "Obrigatório")
  .regex(/^[a-z0-9]{20,40}$/, "Identificador inválido");

const dateTimeBRSchema = z
  .string()
  .trim()
  .min(1, "Data e hora obrigatórias")
  .transform((v, ctx) => {
    const d = parseDateTimeBR(v);
    if (!d) {
      ctx.addIssue({
        code: "custom",
        message: "Use dd/mm/aaaa HH:mm (ex: 25/05/2026 14:30).",
      });
      return z.NEVER;
    }
    const now = Date.now();
    const pastLimit = now - PAST_TOLERANCE_DAYS * 24 * 60 * 60 * 1000;
    const futureLimit = now + FUTURE_TOLERANCE_DAYS * 24 * 60 * 60 * 1000;
    if (d.getTime() < pastLimit) {
      ctx.addIssue({
        code: "custom",
        message: "Data muito no passado (limite 1 dia).",
      });
      return z.NEVER;
    }
    if (d.getTime() > futureLimit) {
      ctx.addIssue({
        code: "custom",
        message: "Data muito no futuro (limite 1 ano).",
      });
      return z.NEVER;
    }
    return d;
  });

const emptyToUndefined = (v: unknown) =>
  typeof v === "string" && v.trim() === "" ? undefined : v;

const durationOverrideSchema = z.preprocess(
  emptyToUndefined,
  z
    .string()
    .optional()
    .transform((v, ctx) => {
      if (v === undefined) return undefined;
      const n = Number(v);
      if (!Number.isInteger(n)) {
        ctx.addIssue({ code: "custom", message: "Duração inválida." });
        return z.NEVER;
      }
      if (n < DURATION_MIN || n > DURATION_MAX) {
        ctx.addIssue({
          code: "custom",
          message: `Duração entre ${DURATION_MIN} e ${DURATION_MAX} minutos.`,
        });
        return z.NEVER;
      }
      if (n % DURATION_STEP_MIN !== 0) {
        ctx.addIssue({
          code: "custom",
          message: `Duração em múltiplos de ${DURATION_STEP_MIN}.`,
        });
        return z.NEVER;
      }
      return n;
    }),
);

const priceOverrideSchema = z.preprocess(
  emptyToUndefined,
  z
    .string()
    .optional()
    .transform((v, ctx) => {
      if (v === undefined) return undefined;
      // Aceita "150" ou "150,00" ou "150.00".
      const normalized = v.replace(/\./g, "").replace(",", ".");
      const n = Number(normalized);
      if (!Number.isFinite(n)) {
        ctx.addIssue({ code: "custom", message: "Valor inválido." });
        return z.NEVER;
      }
      if (n < 0) {
        ctx.addIssue({ code: "custom", message: "Valor não pode ser negativo." });
        return z.NEVER;
      }
      if (n > PRICE_MAX_BRL) {
        ctx.addIssue({
          code: "custom",
          message: "Valor acima do limite (R$ 99.999,99).",
        });
        return z.NEVER;
      }
      // Arredonda pra 2 casas (Decimal do banco).
      return Math.round(n * 100) / 100;
    }),
);

const notesSchema = z.preprocess(
  emptyToUndefined,
  z
    .string()
    .max(2000, "Observações longas demais (limite 2000 caracteres)")
    .optional(),
);

export const appointmentInputSchema = z.object({
  patientId: cuidSchema,
  professionalId: cuidSchema,
  procedureId: cuidSchema,
  startsAt: dateTimeBRSchema,
  durationMin: durationOverrideSchema,
  priceBRL: priceOverrideSchema,
  notes: notesSchema,
});

export type AppointmentInput = z.infer<typeof appointmentInputSchema>;

/** Schema avulso pro form de reagendar (só nova data/hora). */
export const rescheduleSchema = z.object({
  startsAt: dateTimeBRSchema,
});

export type RescheduleInput = z.infer<typeof rescheduleSchema>;

/** Schema avulso pro cancelamento (motivo opcional vai pra notes). */
export const cancelSchema = z.object({
  reason: z.preprocess(
    emptyToUndefined,
    z.string().max(500, "Motivo longo demais (limite 500 caracteres)").optional(),
  ),
});

export type CancelInput = z.infer<typeof cancelSchema>;

// Helpers de status (TERMINAL_STATUSES, NON_BLOCKING_STATUSES, isTerminal)
// moveram pra ./format pra evitar arrastar zod no bundle do client.
// Re-export pra retrocompat de imports já feitos pelo servidor.
export {
  TERMINAL_STATUSES,
  NON_BLOCKING_STATUSES,
  isTerminal,
} from "./format";
