import { notFound } from "next/navigation";

import { requireMembership } from "@/lib/auth/session";
import { getProfessionalById } from "../../../lib/queries";
import { EditClient } from "./EditClient";

export default async function EditProfessionalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { clinicId } = await requireMembership(
    `/painel/configuracoes/profissionais/${id}`,
  );

  const professional = await getProfessionalById(clinicId, id);
  if (!professional) notFound();

  return (
    <EditClient
      professional={{
        id: professional.id,
        name: professional.name,
        role: professional.role,
        color: professional.color,
        active: professional.active,
      }}
    />
  );
}
