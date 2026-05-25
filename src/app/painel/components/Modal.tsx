"use client";

// "use client" — motivo: useEffect (ESC + scroll lock), useId, onClick handlers.

import { useEffect, useId } from "react";
import type { ReactNode } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  /**
   * Quando true, clicar no overlay NÃO fecha. Padrão pra welcome modal
   * que pede ação consciente (escolher tour ou pular). Padrão = false.
   */
  requireExplicitClose?: boolean;
  /**
   * Largura máxima da superfície. Default 480px (mesma medida do Drawer).
   */
  maxWidth?: number;
  children: ReactNode;
};

/**
 * Modal centralizado pro painel. Distinto do Drawer (que entra pela direita).
 * Visual: surface sólida paper-0, border paper-3, radius-xl, sem gradiente,
 * sem backdrop-blur. ScaleIn 240ms via keyframe declarada em globals.css.
 * ESC sempre fecha. Overlay fecha salvo quando requireExplicitClose = true.
 */
export function Modal({
  open,
  onClose,
  title,
  requireExplicitClose = false,
  maxWidth = 480,
  children,
}: ModalProps) {
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
        onClick={requireExplicitClose ? undefined : onClose}
        disabled={requireExplicitClose}
        className="fixed inset-0 z-40 bg-[color-mix(in_oklch,var(--color-ink-0)_32%,transparent)] animate-[fadeIn_var(--dur-fast)_var(--ease-out)] cursor-default disabled:cursor-default"
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          style={{ maxWidth: `${maxWidth}px` }}
          className="w-full bg-paper-0 border border-paper-3 rounded-[var(--radius-xl)] shadow-[0_24px_60px_-28px_rgba(20,50,60,0.22)] animate-[scaleInCenter_var(--dur-mid)_var(--ease-out)] pointer-events-auto flex flex-col max-h-[calc(100vh-2rem)]"
        >
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
                <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" />
              </svg>
            </button>
          </header>

          <div className="flex-1 overflow-y-auto p-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
