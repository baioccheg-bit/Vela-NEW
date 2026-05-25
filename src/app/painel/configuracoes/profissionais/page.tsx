import { requireMembership } from "@/lib/auth/session";
import { getProfessionals } from "../../lib/queries";
import { ProfissionaisClient } from "./ProfissionaisClient";

const PATH = "/painel/configuracoes/profissionais";

export default async function ProfissionaisPage() {
  const { clinicId } = await requireMembership(PATH);
  const professionals = await getProfessionals(clinicId);

  const rows = professionals.map((p) => ({
    id: p.id,
    name: p.name,
    role: p.role,
    color: p.color,
    active: p.active,
  }));

  return <ProfissionaisClient professionals={rows} />;
}
