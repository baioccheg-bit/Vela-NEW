// Compartilhado entre Server Action (validação) e Client (validação pré-submit).
// Não pode ser "server-only".
import { z } from "zod";
// Importamos do `enums.ts` (não de `client.ts`) porque este schema é compartilhado
// com componentes "use client": `client.ts` puxa node:module/path/url e quebra
// o bundle do browser; `enums.ts` é puro e seguro pros 2 lados.
import { Weekday } from "@/generated/prisma/enums";

/**
 * Resultado padronizado de Server Actions desta feature.
 * Mesmo formato das outras sub-fases (2.1/2.2/2.3/2.4) — manter alinhado.
 * fieldErrors aqui é mapeado por Weekday (ex: { TERCA: "Abertura precisa…" }).
 */
export type ActionResult<T = null> =
  | { ok: true; data: T }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

// ── Helpers HH:mm ────────────────────────────────────────────────

/**
 * Regex HH:mm 24h. Aceita "00:00" até "23:59".
 * Validamos sempre, mesmo em dia fechado (active=false), pra evitar dado
 * inconsistente persistido no banco (ex: "abre 18:00, fecha 08:00").
 */
const HHMM_REGEX = /^([01]\d|2[0-3]):[0-5]\d$/;

/** "08:30" → { hours: 8, minutes: 30 }. Retorna null se inválido. */
export function parseHHmm(s: string): { hours: number; minutes: number } | null {
  if (!HHMM_REGEX.test(s)) return null;
  const [h, m] = s.split(":");
  return { hours: Number(h), minutes: Number(m) };
}

/** "08:30" → 510. Retorna null se inválido. Útil pro refine opensAt < closesAt. */
export function hhmmToMinutes(s: string): number | null {
  const p = parseHHmm(s);
  return p ? p.hours * 60 + p.minutes : null;
}

// ── Schemas Zod ──────────────────────────────────────────────────

export const businessHourSchema = z
  .object({
    weekday: z.nativeEnum(Weekday),
    opensAt: z.string().regex(HHMM_REGEX, "Use formato HH:mm (ex: 08:00)"),
    closesAt: z.string().regex(HHMM_REGEX, "Use formato HH:mm (ex: 18:00)"),
    active: z.boolean(),
  })
  .refine(
    (v) => {
      const open = hhmmToMinutes(v.opensAt);
      const close = hhmmToMinutes(v.closesAt);
      return open !== null && close !== null && open < close;
    },
    {
      path: ["closesAt"],
      message: "Abertura precisa ser antes do fechamento.",
    },
  );

export type BusinessHourInput = z.infer<typeof businessHourSchema>;

/**
 * Array com exatamente 7 entradas, uma por Weekday (sem duplicatas/faltas).
 * Conferência por Set: se o tamanho ≠ 7, falta dia ou tem repetido.
 */
export const businessHoursArraySchema = z
  .array(businessHourSchema)
  .length(7, "São necessárias 7 entradas (uma por dia da semana).")
  .refine(
    (arr) => new Set(arr.map((r) => r.weekday)).size === 7,
    { message: "Cada dia da semana deve aparecer exatamente uma vez." },
  );

export type BusinessHoursArrayInput = z.infer<typeof businessHoursArraySchema>;

// ── Rótulos pt-BR pra UI ─────────────────────────────────────────

/**
 * Ordem cronológica explícita (Segunda → Domingo). Casa com a ordem do enum
 * no schema.prisma. UI itera por aqui pra garantir ordem visual.
 */
export const WEEKDAYS_ORDERED: ReadonlyArray<Weekday> = [
  Weekday.SEGUNDA,
  Weekday.TERCA,
  Weekday.QUARTA,
  Weekday.QUINTA,
  Weekday.SEXTA,
  Weekday.SABADO,
  Weekday.DOMINGO,
];

export const WEEKDAY_LABELS: Record<Weekday, string> = {
  SEGUNDA: "Segunda",
  TERCA: "Terça",
  QUARTA: "Quarta",
  QUINTA: "Quinta",
  SEXTA: "Sexta",
  SABADO: "Sábado",
  DOMINGO: "Domingo",
};
