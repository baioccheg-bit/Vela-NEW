// Formatadores, helpers de timezone e helpers de status. Arquivo separado
// do schema.ts pra que Client Components possam importar sem arrastar `zod`
// (zod-4 traz `node:module` numa cadeia transitiva e quebra o build do
// client). Por isso aqui só importamos `AppointmentStatus` como TIPO —
// usamos as string-literais do enum diretamente, sem arrastar o runtime
// do Prisma.

import type { AppointmentStatus } from "@/generated/prisma/client";

// ── Helpers de status ──────────────────────────────────────────

/** Status considerados terminais — não permitem mudança de status nem reschedule. */
export const TERMINAL_STATUSES: AppointmentStatus[] = [
  "ATENDIDO",
  "CANCELADO",
  "AUSENTE",
];

/** Status que NÃO bloqueiam slot do profissional (no conflict check). */
export const NON_BLOCKING_STATUSES: AppointmentStatus[] = [
  "CANCELADO",
  "AUSENTE",
];

export function isTerminal(status: AppointmentStatus): boolean {
  return TERMINAL_STATUSES.includes(status);
}

/**
 * America/Sao_Paulo é UTC-3 fixo desde 2019 (DST abolido).
 * Se o Brasil reintroduzir horário de verão, esse offset hardcoded
 * vira bug entre outubro e fevereiro — TODO revisar nesse cenário.
 */
const BR_OFFSET = "-03:00";

/**
 * Parse "dd/mm/yyyy HH:mm" como horário em America/Sao_Paulo e devolve
 * o Date (instante UTC equivalente). Roundtrip-check rejeita 31/02 etc.
 * Não usa libs externas; offset BR é constante.
 */
export function parseDateTimeBR(input: string): Date | null {
  const m = input.trim().match(/^(\d{2})\/(\d{2})\/(\d{4})\s+(\d{2}):(\d{2})$/);
  if (!m) return null;
  const [, dd, mm, yyyy, hh, min] = m;
  const day = Number(dd);
  const month = Number(mm);
  const year = Number(yyyy);
  const hour = Number(hh);
  const minute = Number(min);

  if (month < 1 || month > 12) return null;
  if (day < 1 || day > 31) return null;
  if (hour < 0 || hour > 23) return null;
  if (minute < 0 || minute > 59) return null;

  // Roundtrip em UTC pra não contaminar com TZ do servidor.
  const utcCheck = new Date(Date.UTC(year, month - 1, day, hour, minute));
  if (
    utcCheck.getUTCFullYear() !== year ||
    utcCheck.getUTCMonth() !== month - 1 ||
    utcCheck.getUTCDate() !== day ||
    utcCheck.getUTCHours() !== hour ||
    utcCheck.getUTCMinutes() !== minute
  ) {
    return null;
  }

  const iso = `${yyyy}-${mm}-${dd}T${hh}:${min}:00${BR_OFFSET}`;
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? null : d;
}

/**
 * Formata um Date como "dd/mm/yyyy HH:mm" em America/Sao_Paulo.
 * Usa Intl pra não depender do TZ do servidor.
 */
export function formatDateTimeDisplayBR(d: Date): string {
  const fmt = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  // "25/05/2026, 14:30" → "25/05/2026 14:30"
  return fmt.format(d).replace(", ", " ");
}

/**
 * Formata só a parte de hora "HH:mm" em SP. Útil pro detail drawer.
 */
export function formatTimeBR(d: Date): string {
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(d);
}

/**
 * Devolve true se o minuto de startsAt (em SP) não é 0.
 * Usado pra avisar UX: a grade visual da agenda só mostra hora cheia.
 * Dívida registrada em docs/BUILD_PLAN.md §"Dívida técnica registrada".
 */
export function isOffGridMinute(d: Date): boolean {
  const m = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Sao_Paulo",
    minute: "2-digit",
    hour12: false,
  }).format(d);
  return Number(m) !== 0;
}
