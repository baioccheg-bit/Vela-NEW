import type { ReactNode } from "react";

type FieldProps = {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
};

/**
 * Field — wrapper de label + input + erro/hint pro painel.
 * Server-compatível, sem estado próprio. O <input> concreto entra como children
 * pra que o parent controle name, defaultValue, etc. Apresentação alinhada
 * a design.md: label uppercase Geist Mono, erro em ink-2 + ícone (CLAUDE.md § 78).
 */
export function Field({ label, required, hint, error, children }: FieldProps) {
  return (
    <div>
      <label className="block">
        <span className="text-[10px] uppercase tracking-[0.12em] font-mono text-ink-2 mb-1.5 block">
          {label}
          {required && (
            <span aria-hidden className="text-accent ml-1">
              *
            </span>
          )}
        </span>
        {children}
      </label>
      {error && (
        <p
          role="alert"
          className="flex items-start gap-1.5 text-[11px] font-mono text-ink-2 mt-1.5"
        >
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="w-3 h-3 mt-px shrink-0"
            aria-hidden
          >
            <circle cx="8" cy="8" r="6.5" />
            <path d="M8 5v3.5" strokeLinecap="round" />
            <circle cx="8" cy="10.75" r="0.6" fill="currentColor" />
          </svg>
          <span>{error}</span>
        </p>
      )}
      {hint && !error && (
        <p className="text-[11px] text-ink-3 mt-1.5">{hint}</p>
      )}
    </div>
  );
}

/**
 * Classe canônica do input. Usar onde for renderizar o <input>.
 * Mantida aqui pra evitar duplicação entre Form de criar e Form de editar.
 */
export const fieldInputCls =
  "w-full px-3 py-2 rounded-md bg-paper-1 border border-paper-3 text-sm " +
  "text-ink-0 placeholder:text-ink-3 " +
  "focus:outline-none focus:border-[color:var(--color-focus)] transition-colors";
