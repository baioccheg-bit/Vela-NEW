import { notFound } from "next/navigation";

import { requireMembership } from "@/lib/auth/session";
import {
  getPatientAppointments,
  getPatientById,
} from "../../lib/queries";
import { PatientDetailClient } from "./PatientDetailClient";

export default async function PatientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { clinicId } = await requireMembership(`/painel/pacientes/${id}`);

  const patient = await getPatientById(clinicId, id);
  if (!patient) notFound();

  const appointments = await getPatientAppointments(clinicId, id);

  return (
    <PatientDetailClient
      patient={{
        id: patient.id,
        name: patient.name,
        phone: patient.phone,
        email: patient.email,
        cpf: patient.cpf,
        birthDate: patient.birthDate?.toISOString() ?? null,
        tag: patient.tag,
        notes: patient.notes,
      }}
      appointments={appointments.map((a) => ({
        id: a.id,
        startsAt: a.startsAt.toISOString(),
        status: a.status,
        procedureName: a.procedure.name,
        professionalName: a.professional?.name ?? null,
        priceBRL: a.priceBRL ? Number(a.priceBRL) : null,
      }))}
    />
  );
}
