// Tipos puros (sem dependência de Prisma/queries server-only) usados
// no boundary RSC→Client. Mantidos aqui pra que Client Components possam
// importar sem arrastar `prisma` ou `server-only` no bundle do navegador.
//
// O page.tsx (RSC) faz a serialização final antes de passar pro Client.

import type { AppointmentStatus } from "@/generated/prisma/client";

export type WeekCellView = {
  id: string;
  patient: string;
  procedure: string;
  professionalName: string | null;
  professionalColor: string | null;
  status: AppointmentStatus;
  startsAtISO: string;
};

export type WeekSlotView = {
  time: string;
  days: Array<WeekCellView | null>;
};

export type WeekAgendaView = {
  weekDays: string[]; // ex: "Seg 13"
  /** ISO YYYY-MM-DD por coluna, na ordem da semana. */
  weekDates: string[];
  todayIndex: number;
  slots: WeekSlotView[];
};
