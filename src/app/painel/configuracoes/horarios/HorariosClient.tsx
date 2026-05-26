"use client";

// "use client" — motivo: estado dos 7 dias (toggle aberto/fechado + valores
// HH:mm), validação client-side antes de submit, useTransition pra disable
// do botão durante a Server Action.

import { useMemo, useState, useTransition } from "react";

import type { Weekday } from "@/generated/prisma/enums";

import { updateBusinessHours } from "./actions";
import {
  WEEKDAY_LABELS,
  WEEKDAYS_ORDERED,
  hhmmToMinutes,
  type BusinessHourInput,
} from "./lib/schema";

type Props = {
  initial: BusinessHourInput[];
};

type RowErrors = Partial<Record<Weekday, string>>;

export function HorariosClient({ initial }: Props) {
  const [rows, setRows] = useState<BusinessHourInput[]>(initial);
  const [pending, startTransition] = useTransition();
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [rowErrors, setRowErrors] = useState<RowErrors>({});
  const [savedAt, setSavedAt] = useState<Date | null>(null);

  // Linhas ordenadas pra render: ordem cronológica garantida pela schema lib.
  const ordered = useMemo(() => {
    const map = new Map(rows.map((r) => [r.weekday, r]));
    return WEEKDAYS_ORDERED.map((wd) => map.get(wd)).filter(
      (r): r is BusinessHourInput => Boolean(r),
    );
  }, [rows]);

  function updateRow(weekday: Weekday, patch: Partial<BusinessHourInput>) {
    setSavedAt(null);
    setRowErrors((prev) => {
      if (!prev[weekday]) return prev;
      const next = { ...prev };
      delete next[weekday];
      return next;
    });
    setGeneralError(null);
    setRows((prev) =>
      prev.map((r) => (r.weekday === weekday ? { ...r, ...patch } : r)),
    );
  }

  function validateClient(): RowErrors {
    const errs: RowErrors = {};
    for (const r of rows) {
      const open = hhmmToMinutes(r.opensAt);
      const close = hhmmToMinutes(r.closesAt);
      if (open === null || close === null) {
        errs[r.weekday] = "Use formato HH:mm (ex: 08:00).";
        continue;
      }
      if (open >= close) {
        errs[r.weekday] = "Abertura precisa ser antes do fechamento.";
      }
    }
    return errs;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setGeneralError(null);

    const errs = validateClient();
    if (Object.keys(errs).length > 0) {
      setRowErrors(errs);
      return;
    }

    startTransition(async () => {
      const result = await updateBusinessHours(rows);
      if (!result.ok) {
        if (result.fieldErrors) {
          const mapped: RowErrors = {};
          for (const [key, msg] of Object.entries(result.fieldErrors)) {
            if (key === "_form") continue;
            mapped[key as Weekday] = msg;
          }
          setRowErrors(mapped);
        }
        setGeneralError(result.error);
        return;
      }
      setRowErrors({});
      setSavedAt(new Date());
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="rounded-xl bg-paper-0 border border-paper-3 overflow-hidden">
        <ul className="divide-y divide-paper-3">
          {ordered.map((row) => {
            const error = rowErrors[row.weekday];
            return (
              <li key={row.weekday} className="px-6 py-4">
                <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
                  <div className="md:w-32 shrink-0">
                    <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-ink-2">
                      {WEEKDAY_LABELS[row.weekday]}
                    </span>
                  </div>

                  <button
                    type="button"
                    role="switch"
                    aria-checked={row.active}
                    onClick={() =>
                      updateRow(row.weekday, { active: !row.active })
                    }
                    className={
                      row.active
                        ? "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-tint text-accent text-[11px] font-mono uppercase tracking-[0.08em] transition-colors shrink-0"
                        : "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-paper-2 text-ink-3 text-[11px] font-mono uppercase tracking-[0.08em] transition-colors shrink-0"
                    }
                  >
                    <span
                      aria-hidden
                      className={
                        row.active
                          ? "w-1.5 h-1.5 rounded-full bg-accent"
                          : "w-1.5 h-1.5 rounded-full bg-ink-3"
                      }
                    />
                    {row.active ? "Aberto" : "Fechado"}
                  </button>

                  <div className="flex items-center gap-2 flex-1">
                    <label className="sr-only" htmlFor={`opens-${row.weekday}`}>
                      Abertura {WEEKDAY_LABELS[row.weekday]}
                    </label>
                    <input
                      id={`opens-${row.weekday}`}
                      type="time"
                      step={60}
                      value={row.opensAt}
                      disabled={!row.active}
                      onChange={(e) =>
                        updateRow(row.weekday, { opensAt: e.target.value })
                      }
                      className={
                        row.active
                          ? "px-3 py-2 rounded-md bg-paper-1 border border-paper-3 text-sm text-ink-0 focus:outline-none focus:border-[color:var(--color-focus)] transition-colors tabular-nums"
                          : "px-3 py-2 rounded-md bg-paper-2 border border-paper-3 text-sm text-ink-3 cursor-not-allowed tabular-nums"
                      }
                    />

                    <span
                      aria-hidden
                      className="text-ink-3 text-sm font-mono"
                    >
                      →
                    </span>

                    <label className="sr-only" htmlFor={`closes-${row.weekday}`}>
                      Fechamento {WEEKDAY_LABELS[row.weekday]}
                    </label>
                    <input
                      id={`closes-${row.weekday}`}
                      type="time"
                      step={60}
                      value={row.closesAt}
                      disabled={!row.active}
                      onChange={(e) =>
                        updateRow(row.weekday, { closesAt: e.target.value })
                      }
                      className={
                        row.active
                          ? "px-3 py-2 rounded-md bg-paper-1 border border-paper-3 text-sm text-ink-0 focus:outline-none focus:border-[color:var(--color-focus)] transition-colors tabular-nums"
                          : "px-3 py-2 rounded-md bg-paper-2 border border-paper-3 text-sm text-ink-3 cursor-not-allowed tabular-nums"
                      }
                    />
                  </div>
                </div>

                {error && (
                  <p
                    role="alert"
                    className="flex items-start gap-1.5 text-[11px] font-mono text-ink-2 mt-2 md:ml-36"
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
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex items-center justify-between gap-4 px-1">
        <div className="text-[11px] font-mono text-ink-3 min-h-[1em]">
          {generalError && !Object.keys(rowErrors).length ? (
            <span className="text-ink-2">{generalError}</span>
          ) : savedAt ? (
            <span>Horários salvos.</span>
          ) : (
            <span>
              Dias fechados não são oferecidos a pacientes via Júlia.
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ink-0 text-paper-0 text-sm font-medium hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {pending ? "Salvando…" : "Salvar alterações"}
        </button>
      </div>
    </form>
  );
}
