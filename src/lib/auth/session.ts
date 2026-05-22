import "server-only";
import { redirect } from "next/navigation";
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
 * Versão "guard" — para uso em pages/server actions que exigem auth.
 * Se não houver sessão ou membership, redireciona pra /entrar
 * (com callback pra voltar pra rota original depois do login).
 */
export async function requireMembership(callbackPath: string): Promise<CurrentMembership> {
  const ms = await getCurrentMembership();
  if (!ms) {
    redirect(`/entrar?callbackUrl=${encodeURIComponent(callbackPath)}`);
  }
  return ms;
}
