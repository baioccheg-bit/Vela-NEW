"use client";

// "use client" — motivo: useState (minimizado/expandido), useTransition (Server
// Action dismissChecklist), onClick handlers.

import Link from "next/link";
import { useState, useTransition } from "react";
import { dismissChecklist } from "../lib/onboarding/actions";

export type ChecklistItem = {
  id: "conta" | "pacientes" | "equipe" | "horarios" | "whatsapp";
  label: string;
  done: boolean;
  /** Quando presente, item navegável. Quando ausente OU comingSoon=true,
   *  item renderiza desabilitado sem link. */
  href?: string;
  /** True = item "em breve" (fase futura). Não conta no progresso e não navega. */
  comingSoon?: boolean;
};

type Props = {
  items: ChecklistItem[];
  /** Timestamp em que o user fechou o checklist. Se !== null, não renderiza. */
  dismissedAt: Date | null;
};

export function OnboardingChecklist({ items, dismissedAt }: Props) {
  const [minimized, setMinimized] = useState(false);
  const [pending, startTransition] = useTransition();

  // Lógica do "some inteiro": dismissedAt setado OU todos os itens ATIVOS prontos.
  // Itens "em breve" não contam — checklist não some só porque sobrou item em breve.
  const activeItems = items.filter((i) => !i.comingSoon);
  const allActiveDone = activeItems.length > 0 && activeItems.every((i) => i.done);
  if (dismissedAt !== null || allActiveDone) return null;

  const doneCount = activeItems.filter((i) => i.done).length;
  const totalActive = activeItems.length;

  function dismiss() {
    if (pending) return;
    startTransition(async () => {
      await dismissChecklist();
    });
  }

  return (
    <aside
      role="complementary"
      aria-label="Próximos passos"
      className="fixed bottom-6 right-6 z-30 w-[320px] bg-paper-1 border border-paper-3 rounded-[var(--radius-lg)] shadow-[0_24px_60px_-28px_rgba(20,50,60,0.18)]"
    >
      <header className="flex items-start justify-between gap-3 px-4 py-3 border-b border-paper-2">
        <div className="min-w-0">
          <div className="text-[10px] uppercase tracking-[0.12em] font-mono text-ink-3">
            Próximos passos
          </div>
          <div className="text-xs font-mono text-ink-2 mt-1">
            {doneCount} de {totalActive} {totalActive === 1 ? "concluído" : "concluídos"}
          </div>
        </div>
        <div className="flex items-center gap-0.5 shrink-0">
          <button
            type="button"
            onClick={() => setMinimized((m) => !m)}
            aria-label={minimized ? "Expandir" : "Minimizar"}
            className="w-7 h-7 rounded-md hover:bg-paper-2 transition-colors inline-flex items-center justify-center text-ink-2 hover:text-ink-0"
          >
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="w-3.5 h-3.5"
              aria-hidden
            >
              {minimized ? (
                <path d="M4 10l4-4 4 4" strokeLinecap="round" />
              ) : (
                <path d="M4 6l4 4 4-4" strokeLinecap="round" />
              )}
            </svg>
          </button>
          <button
            type="button"
            onClick={dismiss}
            disabled={pending}
            aria-label="Dispensar"
            className="w-7 h-7 rounded-md hover:bg-paper-2 transition-colors inline-flex items-center justify-center text-ink-2 hover:text-ink-0 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="w-3.5 h-3.5"
              aria-hidden
            >
              <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </header>

      {!minimized && (
        <ul className="p-2 list-none m-0">
          {items.map((item) => (
            <li key={item.id}>
              <ChecklistRow item={item} />
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}

function ChecklistRow({ item }: { item: ChecklistItem }) {
  if (item.comingSoon) {
    return (
      <span className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-ink-3 cursor-not-allowed">
        <StateIcon state="empty" />
        <span className="flex-1">{item.label}</span>
        <span className="text-[9px] font-mono uppercase tracking-[0.08em] text-ink-3 border border-paper-3 rounded px-1.5 py-0.5">
          em breve
        </span>
      </span>
    );
  }
  if (item.done) {
    return (
      <span className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-ink-2">
        <StateIcon state="done" />
        <span className="flex-1 line-through decoration-ink-3">{item.label}</span>
      </span>
    );
  }
  return (
    <Link
      href={item.href ?? "#"}
      className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-ink-1 hover:bg-paper-2 hover:text-ink-0 transition-colors"
    >
      <StateIcon state="empty" />
      <span className="flex-1">{item.label}</span>
      <svg
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-3.5 h-3.5 text-ink-3"
        aria-hidden
      >
        <path d="M6 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  );
}

function StateIcon({ state }: { state: "done" | "empty" }) {
  if (state === "done") {
    return (
      <span className="w-4 h-4 rounded-full bg-accent-soft inline-flex items-center justify-center shrink-0">
        <svg
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-2.5 h-2.5 text-paper-0"
          aria-hidden
        >
          <path d="M3 6.5l2 2 4-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    );
  }
  return (
    <span
      className="w-4 h-4 rounded-full border border-paper-3 shrink-0"
      aria-hidden
    />
  );
}
