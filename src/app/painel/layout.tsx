import type { Metadata } from "next";
import { Sidebar } from "./components/Sidebar";
import { Topbar } from "./components/Topbar";
import { OnboardingChecklist } from "./components/OnboardingChecklist";
import { WelcomeModal } from "./components/WelcomeModal";
import { getOnboardingState } from "./lib/onboarding/queries";

export const metadata: Metadata = {
  title: "Vela — Painel",
  description: "Painel operacional da clínica.",
};

// Layout async — motivo: precisa carregar User.welcomedAt e
// Clinic.onboardingDismissedAt + computar estado dos itens do checklist
// pra alimentar WelcomeModal e OnboardingChecklist (ambos Client Components).
// getOnboardingState lê a sessão internamente e retorna null se não houver
// membership — as pages filhas já garantem auth via requireMembership.
export default async function PainelLayout({ children }: { children: React.ReactNode }) {
  const onboarding = await getOnboardingState();

  return (
    <div className="min-h-screen bg-paper-0 text-ink-0 flex font-body">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 p-6 md:p-8">
          <div className="mx-auto max-w-[1400px]">{children}</div>
        </main>
      </div>

      {onboarding && (
        <>
          <WelcomeModal initialOpen={onboarding.welcomedAt === null} />
          <OnboardingChecklist
            items={onboarding.items}
            dismissedAt={onboarding.dismissedAt}
          />
        </>
      )}
    </div>
  );
}
