import "server-only";
import { getCurrentMembership } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import type { ChecklistItem } from "@/app/painel/components/OnboardingChecklist";

export type OnboardingState = {
  welcomedAt: Date | null;
  dismissedAt: Date | null;
  items: ChecklistItem[];
};

/**
 * Computa o estado do onboarding pro layout do /painel.
 *
 * Conforme BUILD_PLAN.md §"2.5 — Tutorial leve":
 *   1. Conta criada
 *   2. Importar pacientes (CTA /painel/pacientes?import=1)
 *   3. Convidar equipe (CTA /painel/configuracoes/equipe) — ROTA NÃO EXISTE → "em breve"
 *   4. Personalizar horários (CTA /painel/configuracoes/horarios) —
 *      done quando Clinic.businessHoursCustomizedAt !== null
 *   5. Conectar WhatsApp (Fase 4) — "em breve"
 *
 * Heurística do item 2: existe pelo menos 1 Patient na clínica.
 * Os defaults injetados (seedClinicDefaults) NÃO criam Patient,
 * então o count direto basta. Reaceito o trade-off de "qualquer paciente
 * conta", mesmo se o user criar 1 manualmente sem importar planilha — o
 * objetivo do item é "tem dados de paciente no sistema", e isso ele tem.
 *
 * Multi-tenant: lê clinicId/userId da sessão internamente (mesmo padrão das
 * Server Actions de onboarding). Retorna null se não houver membership —
 * caller decide se renderiza ou não.
 */
export async function getOnboardingState(): Promise<OnboardingState | null> {
  const ms = await getCurrentMembership();
  if (!ms) return null;

  const [user, clinic, patientsCount] = await Promise.all([
    prisma.user.findUnique({
      where: { id: ms.userId },
      select: { welcomedAt: true },
    }),
    prisma.clinic.findUnique({
      where: { id: ms.clinicId },
      select: {
        onboardingDismissedAt: true,
        businessHoursCustomizedAt: true,
      },
    }),
    prisma.patient.count({ where: { clinicId: ms.clinicId } }),
  ]);

  const items: ChecklistItem[] = [
    {
      id: "conta",
      label: "Conta criada",
      done: true,
    },
    {
      id: "pacientes",
      label: "Importar pacientes",
      done: patientsCount >= 1,
      href: "/painel/pacientes?import=1",
    },
    {
      id: "equipe",
      label: "Convidar equipe",
      done: false,
      comingSoon: true,
    },
    {
      id: "horarios",
      label: "Personalizar horários",
      done: clinic?.businessHoursCustomizedAt != null,
      href: "/painel/configuracoes/horarios",
    },
    {
      id: "whatsapp",
      label: "Conectar WhatsApp",
      done: false,
      comingSoon: true,
    },
  ];

  return {
    welcomedAt: user?.welcomedAt ?? null,
    dismissedAt: clinic?.onboardingDismissedAt ?? null,
    items,
  };
}
