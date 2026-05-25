import { requireMembership } from "@/lib/auth/session";
import { getProcedures } from "../../lib/queries";
import { ProcedimentosClient } from "./ProcedimentosClient";

const PATH = "/painel/configuracoes/procedimentos";

export default async function ProcedimentosPage() {
  const { clinicId } = await requireMembership(PATH);
  const procedures = await getProcedures(clinicId);

  const rows = procedures.map((p) => ({
    id: p.id,
    name: p.name,
    durationMin: p.durationMin,
    priceBRL: Number(p.priceBRL),
    active: p.active,
  }));

  return <ProcedimentosClient procedures={rows} />;
}
