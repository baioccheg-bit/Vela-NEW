"use server";

import { revalidatePath } from "next/cache";
import { requireMembership } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

/**
 * Marca o user atual como "já viu o modal de boas-vindas".
 * Chamada pelo WelcomeModal ao fechar (tour concluído ou pular).
 *
 * Multi-tenant: usa userId da sessão. Não confia em parâmetro do client.
 */
export async function markWelcomed(): Promise<void> {
  const ms = await requireMembership("/painel");
  await prisma.user.update({
    where: { id: ms.userId },
    data: { welcomedAt: new Date() },
  });
  revalidatePath("/painel");
}

/**
 * Marca o checklist como dispensado para a clínica atual.
 * Chamada pelo OnboardingChecklist ao clicar no X.
 *
 * Multi-tenant: usa clinicId da sessão. Só usuários com membership
 * podem dispensar (a action exige membership via requireMembership).
 */
export async function dismissChecklist(): Promise<void> {
  const ms = await requireMembership("/painel");
  await prisma.clinic.update({
    where: { id: ms.clinicId },
    data: { onboardingDismissedAt: new Date() },
  });
  revalidatePath("/painel");
}
