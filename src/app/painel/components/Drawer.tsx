"use client";

// "use client" — motivo: useEffect (ESC + scroll lock), useId, onClick handlers.

import { useEffect, useId } from "react";
import type { ReactNode } from "react";

type DrawerProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

/**
 * Drawer lateral da direita pro painel. Slide-in 240ms, overlay sólido
 * translúcido (sem backdrop-blur — proibido fora do nav floating pill).
 * Fecha por clique no overlay, botão X ou ESC.
 */
export function Drawer({ open, onClose, title, children }: DrawerProps) {
  const titleId = useId();

  useEffect(() => {
    if (!open) return;

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div role="dialog" aria-modal="true" aria-labelledby={titleId}>
      <button
        type="button"
        aria-label="Fechar"
        onClick={onClose}
        className="fixed inset-0 z-40 bg-[color-mix(in_oklch,var(--color-ink-0)_32%,transparent)] animate-[fadeIn_var(--dur-fast)_var(--ease-out)] cursor-default"
      />

      <aside className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-[480px] bg-paper-0 border-l border-paper-3 shadow-[0_24px_60px_-28px_rgba(20,50,60,0.22)] animate-[slideInRight_var(--dur-mid)_var(--ease-out)] flex flex-col">
        <header className="flex items-center justify-between gap-4 px-6 py-4 border-b border-paper-3 shrink-0">
          <h2
            id={titleId}
            className="font-display text-lg font-semibold tracking-[-0.02em] text-ink-0 m-0"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="w-8 h-8 rounded-md hover:bg-paper-2 transition-colors inline-flex items-center justify-center text-ink-2 hover:text-ink-0"
          >
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="w-4 h-4"
              aria-hidden
            >
              <path
                d="M4 4l8 8M12 4l-8 8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </aside>
    </div>
  );
}
