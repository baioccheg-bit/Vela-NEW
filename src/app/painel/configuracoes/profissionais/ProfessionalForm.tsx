"use client";

// "use client" — motivo: useActionState (React 19) pra capturar resultado da
// Server Action, useState pra controlar visualmente a cor selecionada, useEffect
// pra disparar onSuccess quando a action retorna ok.

import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/Button";
import { Field, fieldInputCls } from "../../components/Field";
import {
  PROFESSIONAL_PALETTE,
  type ActionResult,
} from "./lib/schema";

export type ProfessionalFormInitial = {
  id?: string;
  name: string;
  role: string;
  color: string;
  active: boolean;
};

type ProfessionalFormProps = {
  action: (
    prev: ActionResult<unknown> | null,
    fd: FormData,
  ) => Promise<ActionResult<unknown>>;
  submitLabel: string;
  initial?: ProfessionalFormInitial;
  onSuccess?: () => void;
  onCancel?: () => void;
};

const PALETTE_HEXES: readonly string[] = PROFESSIONAL_PALETTE.map((p) => p.hex);

function pickInitialColor(value: string | undefined): string {
  if (value && PALETTE_HEXES.includes(value)) return value;
  return PROFESSIONAL_PALETTE[0].hex;
}

export function ProfessionalForm({
  action,
  submitLabel,
  initial,
  onSuccess,
  onCancel,
}: ProfessionalFormProps) {
  const [state, formAction, pending] = useActionState<
    ActionResult<unknown> | null,
    FormData
  >(action, null);

  const [color, setColor] = useState<string>(pickInitialColor(initial?.color));

  useEffect(() => {
    if (state?.ok) onSuccess?.();
  }, [state, onSuccess]);

  const fieldErrors =
    state && !state.ok ? state.fieldErrors : undefined;
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
        label="Função"
        required
        hint="Ex: Dermatologista, Esteticista, Fisioterapeuta"
        error={fieldErrors?.role}
      >
        <input
          name="role"
          type="text"
          defaultValue={initial?.role}
          maxLength={80}
          autoComplete="off"
          className={fieldInputCls}
        />
      </Field>

      <Field
        label="Cor de identificação"
        required
        hint="Aparece nos cards da agenda"
        error={fieldErrors?.color}
      >
        <div className="grid grid-cols-6 gap-2 pt-1">
          {PROFESSIONAL_PALETTE.map(({ hex, label }) => {
            const selected = color === hex;
            return (
              <button
                key={hex}
                type="button"
                onClick={() => setColor(hex)}
                aria-label={label}
                aria-pressed={selected}
                title={label}
                className={`h-9 rounded-md border-2 transition-colors ${
                  selected
                    ? "border-ink-0"
                    : "border-paper-3 hover:border-ink-3"
                }`}
                style={{ backgroundColor: `#${hex}` }}
              />
            );
          })}
        </div>
        <input type="hidden" name="color" value={color} />
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
          <Button
            variant="ghost"
            size="sm"
            type="button"
            onClick={onCancel}
          >
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
