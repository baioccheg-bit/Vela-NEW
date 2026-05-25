"use client";

// "use client" — motivo: useState (step do tour), useTransition (chamada
// da Server Action markWelcomed), onClick handlers.

import { useState, useTransition } from "react";
import { Modal } from "./Modal";
import { markWelcomed } from "../lib/onboarding/actions";

type Props = {
  /** Se true ao montar, modal abre imediatamente. Calculado server-side
   *  no layout a partir de user.welcomedAt === null. */
  initialOpen: boolean;
};

type TourStep = {
  eyebrow: string;
  title: string;
  body: string;
};

const TOUR_STEPS: TourStep[] = [
  {
    eyebrow: "Passo 1 de 3",
    title: "Agenda da semana",
    body: "Clique num slot vazio pra criar um agendamento. Clique num existente pra confirmar, reagendar ou cancelar.",
  },
  {
    eyebrow: "Passo 2 de 3",
    title: "Pacientes em 15 segundos",
    body: "Cadastro mínimo precisa só de nome e telefone. Para migrar de planilha, use o botão Importar na lista de pacientes.",
  },
  {
    eyebrow: "Passo 3 de 3",
    title: "Júlia cuida do WhatsApp",
    body: "Aqui você acompanha as conversas e assume quando quiser. A conexão real com o WhatsApp chega na próxima entrega.",
  },
];

export function WelcomeModal({ initialOpen }: Props) {
  const [open, setOpen] = useState(initialOpen);
  // step 0 = intro com escolha tour/pular; 1..N = passos do tour
  const [step, setStep] = useState<number>(0);
  const [pending, startTransition] = useTransition();

  function dismiss() {
    if (pending) return;
    startTransition(async () => {
      await markWelcomed();
      setOpen(false);
    });
  }

  function startTour() {
    setStep(1);
  }

  function nextStep() {
    if (step >= TOUR_STEPS.length) {
      dismiss();
      return;
    }
    setStep(step + 1);
  }

  const isIntro = step === 0;
  const isLastStep = step === TOUR_STEPS.length;
  const currentTour = !isIntro ? TOUR_STEPS[step - 1] : null;

  return (
    <Modal
      open={open}
      onClose={dismiss}
      title={isIntro ? "Sua clínica está pronta" : "Tour rápido"}
      requireExplicitClose
      maxWidth={520}
    >
      {isIntro ? (
        <div className="flex flex-col gap-6">
          <p className="text-sm text-ink-1 leading-relaxed m-0">
            A Vela já vem com profissional inicial, procedimentos
            genéricos e agenda funcionando. Quer um tour de 90 segundos
            pra conhecer o painel?
          </p>

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
            <button
              type="button"
              onClick={dismiss}
              disabled={pending}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm text-ink-2 border border-[color-mix(in_oklch,var(--color-ink-0)_16%,transparent)] hover:text-ink-0 hover:border-ink-0 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Pular, sei o que fazer
            </button>
            <button
              type="button"
              onClick={startTour}
              disabled={pending}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-medium bg-ink-0 text-paper-0 hover:bg-accent transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Tour rápido
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div>
            <div className="text-[10px] uppercase tracking-[0.12em] font-mono text-ink-3">
              {currentTour!.eyebrow}
            </div>
            <h3 className="font-display text-xl font-semibold tracking-[-0.025em] text-ink-0 mt-2 mb-3">
              {currentTour!.title}
            </h3>
            <p className="text-sm text-ink-1 leading-relaxed m-0">
              {currentTour!.body}
            </p>
          </div>

          <div className="flex items-center justify-between gap-3 pt-2 border-t border-paper-2">
            <button
              type="button"
              onClick={dismiss}
              disabled={pending}
              className="text-xs font-mono uppercase tracking-[0.08em] text-ink-3 hover:text-ink-1 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Pular
            </button>
            <button
              type="button"
              onClick={nextStep}
              disabled={pending}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-medium bg-ink-0 text-paper-0 hover:bg-accent transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLastStep ? "Concluir" : "Próximo"}
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
