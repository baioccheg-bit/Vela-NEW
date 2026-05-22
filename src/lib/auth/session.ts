import "server-only";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export type CurrentMembership = {
  userId: string;
  clinicId: string;
  role: "ADMIN" | "MANAGER" | "RECEPTIONIST" | "FINANCE" | "PROFESSIONAL";
};

/**
 * Retorna a sessão e o membership ativo do usuário.
 *
 * - Se o usuário não estiver autenticado, retorna `null`.
 * - Se o usuário não tiver membership, retorna `null` (não é cliente de
 *   nenhuma clínica ainda).
 * - Se tiver múltiplos memberships, retorna o primeiro (UI de troca
 *   de clínica vem na Fase 4).
 */
export async function getCurrentMembership(): Promise<CurrentMembership | null> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  const membership = await prisma.membership.findFirst({
    where: { userId: session.user.id },
    select: { clinicId: true, role: true },
    orderBy: { createdAt: "asc" },
  });
  if (!membership) return null;

  return {
    userId: session.user.id,
    clinicId: membership.clinicId,
    role: membership.role,
  };
}

/**
 * Resolve o clinicId para a rota /demo:
 *   - se houver usuário logado com membership, usa o membership ativo
 *   - senão, cai pro slug "demo" (showcase pública)
 *
 * Garante que /demo sempre tem dados pra mostrar mesmo sem auth.
 */
export async function getDemoClinicId(): Promise<string> {
  const ms = await getCurrentMembership();
  if (ms) return ms.clinicId;

  const demo = await prisma.clinic.findUnique({
    where: { slug: "demo" },
    select: { id: true },
  });
  if (!demo) {
    throw new Error(
      "Clínica demo não existe. Rode `npm run db:seed:demo` para popular."
    );
  }
  return demo.id;
}
