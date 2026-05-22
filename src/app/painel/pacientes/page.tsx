import { requireMembership } from "@/lib/auth/session";
import { getPatients } from "../lib/queries";
import { PacientesClient } from "./PacientesClient";

export default async function PacientesPage() {
  const { clinicId } = await requireMembership("/painel/pacientes");
  const patients = await getPatients(clinicId);

  // Serializa Decimal/Date pra propriedades plain (Server→Client boundary)
  const rows = patients.map((p) => ({
    id: p.id,
    name: p.name,
    phone: p.phone,
    birthDate: p.birthDate?.toISOString() ?? null,
    tag: p.tag,
    lastVisitAt: p.lastVisitAt?.toISOString() ?? null,
    proceduresCount: p.proceduresCount,
    totalSpentBRL: Number(p.totalSpentBRL),
  }));

  return <PacientesClient patients={rows} />;
}
