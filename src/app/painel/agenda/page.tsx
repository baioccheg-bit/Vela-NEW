import { requireMembership } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

import {
  getProcedures,
  getProfessionals,
  getWeekAgenda,
  getWeekAppointmentsDetailed,
} from "../lib/queries";

import { AgendaClient } from "./AgendaClient";
import type { AppointmentDetailView } from "./AppointmentDetailDrawer";

export default async function AgendaPage() {
  const { clinicId } = await requireMembership("/painel/agenda");

  const [weekAgenda, weekAppointments, professionals, procedures, patients] =
    await Promise.all([
      getWeekAgenda(clinicId),
      getWeekAppointmentsDetailed(clinicId),
      getProfessionals(clinicId),
      getProcedures(clinicId),
      prisma.patient.findMany({
        where: { clinicId },
        select: { id: true, name: true, phone: true },
        orderBy: { name: "asc" },
      }),
    ]);

  // Borda RSC→Client: Decimal/Date viram number/string serializáveis.
  const appointmentsById: Record<string, AppointmentDetailView> = {};
  for (const a of weekAppointments) {
    appointmentsById[a.id] = {
      id: a.id,
      status: a.status,
      startsAtISO: a.startsAt.toISOString(),
      durationMin: a.durationMin,
      priceBRL: a.priceBRL ? Number(a.priceBRL) : null,
      notes: a.notes,
      originalStartsAtISO: a.originalStartsAt?.toISOString() ?? null,
      rescheduledAtISO: a.rescheduledAt?.toISOString() ?? null,
      patient: {
        id: a.patient.id,
        name: a.patient.name,
        phone: a.patient.phone,
      },
      procedure: {
        id: a.procedure.id,
        name: a.procedure.name,
        durationMin: a.procedure.durationMin,
        priceBRL: Number(a.procedure.priceBRL),
        active: a.procedure.active,
      },
      professional: a.professional
        ? {
            id: a.professional.id,
            name: a.professional.name,
            color: a.professional.color,
            active: a.professional.active,
          }
        : null,
    };
  }

  const serializedProcedures = procedures.map((p) => ({
    id: p.id,
    name: p.name,
    durationMin: p.durationMin,
    priceBRL: Number(p.priceBRL),
    active: p.active,
  }));

  const serializedProfessionals = professionals.map((p) => ({
    id: p.id,
    name: p.name,
    active: p.active,
  }));

  return (
    <AgendaClient
      weekAgenda={weekAgenda}
      appointmentsById={appointmentsById}
      patients={patients}
      professionals={serializedProfessionals}
      procedures={serializedProcedures}
    />
  );
}
