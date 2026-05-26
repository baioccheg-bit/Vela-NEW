import { requireMembership } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import type { Weekday } from "@/generated/prisma/enums";

import { HorariosClient } from "./HorariosClient";
import type { BusinessHourInput } from "./lib/schema";
import { WEEKDAYS_ORDERED } from "./lib/schema";

const PATH = "/painel/configuracoes/horarios";

/**
 * Defaults usados quando a clínica não tem registro pra algum Weekday.
 * Casa com seedClinicBusinessHours em src/lib/clinics/seed-defaults.ts —
 * mas duplicado aqui de propósito: a page nunca depende do seed ter rodado
 * (clínica pré-2.6 pode existir sem nenhum BusinessHours).
 *
 * A Server Action `updateBusinessHours` faz upsert, então salvar com esses
 * defaults injetados no cliente é equivalente a criar os 7 registros.
 */
const DEFAULTS: Record<Weekday, { opensAt: string; closesAt: string; active: boolean }> = {
  SEGUNDA: { opensAt: "08:00", closesAt: "18:00", active: true },
  TERCA:   { opensAt: "08:00", closesAt: "18:00", active: true },
  QUARTA:  { opensAt: "08:00", closesAt: "18:00", active: true },
  QUINTA:  { opensAt: "08:00", closesAt: "18:00", active: true },
  SEXTA:   { opensAt: "08:00", closesAt: "18:00", active: true },
  SABADO:  { opensAt: "08:00", closesAt: "12:00", active: true },
  DOMINGO: { opensAt: "08:00", closesAt: "12:00", active: false },
};

export default async function HorariosPage() {
  const { clinicId } = await requireMembership(PATH);

  const rows = await prisma.businessHours.findMany({
    where: { clinicId },
    select: { weekday: true, opensAt: true, closesAt: true, active: true },
  });

  const byWeekday = new Map(rows.map((r) => [r.weekday, r]));

  // Sempre devolve exatamente 7 entradas, em ordem cronológica.
  // Preenche com DEFAULTS pra clínicas sem registro completo.
  const initial: BusinessHourInput[] = WEEKDAYS_ORDERED.map((weekday) => {
    const found = byWeekday.get(weekday);
    if (found) {
      return {
        weekday,
        opensAt: found.opensAt,
        closesAt: found.closesAt,
        active: found.active,
      };
    }
    const d = DEFAULTS[weekday];
    return { weekday, opensAt: d.opensAt, closesAt: d.closesAt, active: d.active };
  });

  return <HorariosClient initial={initial} />;
}
