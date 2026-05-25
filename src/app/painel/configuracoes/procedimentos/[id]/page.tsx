import { notFound } from "next/navigation";

import { requireMembership } from "@/lib/auth/session";
import { getProcedureById } from "../../../lib/queries";
import { EditClient } from "./EditClient";

export default async function EditProcedurePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { clinicId } = await requireMembership(
    `/painel/configuracoes/procedimentos/${id}`,
  );

  const procedure = await getProcedureById(clinicId, id);
  if (!procedure) notFound();

  return (
    <EditClient
      procedure={{
        id: procedure.id,
        name: procedure.name,
        durationMin: procedure.durationMin,
        priceBRL: Number(procedure.priceBRL),
        active: procedure.active,
      }}
    />
  );
}
