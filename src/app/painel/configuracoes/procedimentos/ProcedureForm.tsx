"use client";

// "use client" — motivo: useActionState (React 19) pra capturar resultado da
// Server Action, useState pra controlar entrada de preço (parse local antes
// de enviar via hidden), useEffect pra disparar onSuccess.

import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/Button";
import { Field, fieldInputCls } from "../../components/Field";
import { formatBRL, formatBRLPlain } from "../../lib/mock-data";
import { parseBRLInput, type ActionResult } from "./lib/schema";

export type ProcedureFormInitial = {
  id?: string;
  name: string;
  durationMin: number;
  priceBRL: number;
  active: boolean;
};

type ProcedureFormProps = {
  action: (
    prev: ActionResult<unknown> | null,
    fd: FormData,
  ) => Promise<ActionResult<unknown>>;
  submitLabel: string;
  initial?: ProcedureFormInitial;
  onSuccess?: () => void;
  onCancel?: () => void;
};

export function ProcedureForm({
  action,
  submitLabel,
  initial,
  onSuccess,
  onCancel,
}: ProcedureFormProps) {
  const [state, formAction, pending] = useActionState<
    ActionResult<unknown> | null,
    FormData
  >(action, null);

  const [priceRaw, setPriceRaw] = useState<string>(
    initial?.priceBRL !== undefined ? formatBRLPlain(initial.priceBRL) : "",
  );
  const priceParsed = parseBRLInput(priceRaw);

  useEffect(() => {
    if (state?.ok) onSuccess?.();
  }, [state, onSuccess]);

  const fieldErrors = state && !state.ok ? state.fieldErrors : undefined;
  const generalError =
    state && !state.ok && !state.fieldErrors ? state.error : null;

  return (
    <form action={formAction} className="space-y-5">
      <Field label="Nome" required error={fieldErrors?.name}>
        <input
          name="name"
          type="text"
          defaultValue={initial?.name}
          maxLength={120}
          autoComplete="off"
          className={fieldInputCls}
        />
      </Field>

      <Field
        label="Duração"
        required
        hint="Em minutos, múltiplo de 5 (ex: 30, 45, 60)"
        error={fieldErrors?.durationMin}
      >
        <input
          name="durationMin"
          type="number"
          min={5}
          max={480}
          step={5}
          defaultValue={initial?.durationMin ?? 60}
          className={fieldInputCls}
        />
      </Field>

      <Field
        label="Preço base"
        required
        hint="Aceita vírgula ou ponto. Use 0 pra avaliação, retorno ou cortesia."
        error={fieldErrors?.priceBRL}
      >
        <div className="relative">
          <span
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[11px] font-mono uppercase tracking-[0.08em] text-ink-3 pointer-events-none"
            aria-hidden
          >
            R$
          </span>
          <input
            type="text"
            inputMode="decimal"
            value={priceRaw}
            onChange={(e) => setPriceRaw(e.target.value)}
            placeholder="0,00"
            autoComplete="off"
            className={`${fieldInputCls} pl-10`}
          />
        </div>
        <input
          type="hidden"
          name="priceBRL"
          value={priceParsed !== null ? priceParsed.toFixed(2) : ""}
        />
        {priceParsed !== null && priceParsed > 0 && (
          <span className="text-[11px] text-ink-3 font-mono mt-1.5 block">
            {formatBRL(priceParsed)}
          </span>
        )}
      </Field>

      <Field label="Status">
        <label className="inline-flex items-center gap-2 select-none cursor-pointer">
          <input
            type="checkbox"
            name="active"
            defaultChecked={initial?.active ?? true}
            className="w-4 h-4 accent-[color:var(--color-accent)]"
          />
          <span className="text-sm text-ink-1">
            Ativo (aparece nos seletores da agenda)
          </span>
        </label>
      </Field>

      {generalError && (
        <p
          role="alert"
          className="flex items-start gap-1.5 text-[12px] font-mono text-ink-2"
        >
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="w-3.5 h-3.5 mt-px shrink-0"
            aria-hidden
          >
            <circle cx="8" cy="8" r="6.5" />
            <path d="M8 5v3.5" strokeLinecap="round" />
            <circle cx="8" cy="10.75" r="0.6" fill="currentColor" />
          </svg>
          <span>{generalError}</span>
        </p>
      )}

      <div className="flex items-center justify-end gap-2 pt-4 border-t border-paper-3">
        {onCancel && (
          <Button variant="ghost" size="sm" type="button" onClick={onCancel}>
            Cancelar
          </Button>
        )}
        <Button variant="primary" size="sm" type="submit" disabled={pending}>
          {pending ? "Salvando…" : submitLabel}
        </Button>
      </div>
    </form>
  );
}
