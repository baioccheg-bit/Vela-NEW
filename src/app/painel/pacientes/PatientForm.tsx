"use client";

// "use client" — motivo: useActionState (React 19) pra capturar resultado da
// Server Action, useState pra controlar máscara local de telefone/CPF/data,
// useEffect pra disparar onSuccess no callback do parent (fechar Drawer).

import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/Button";
import { PatientTag } from "@/generated/prisma/client";
import { Field, fieldInputCls } from "../components/Field";
import {
  formatBirthDateBR,
  formatCPFDisplay,
  formatPhoneDisplay,
} from "./lib/format";
import type { ActionResult } from "./lib/schema";

export type PatientFormInitial = {
  id?: string;
  name: string;
  phone: string; // E.164
  email: string | null;
  cpf: string | null; // 11 dígitos sem máscara
  birthDate: string | null; // ISO
  tag: PatientTag;
  notes: string | null;
};

type PatientFormProps = {
  action: (
    prev: ActionResult<unknown> | null,
    fd: FormData,
  ) => Promise<ActionResult<unknown>>;
  submitLabel: string;
  initial?: PatientFormInitial;
  onSuccess?: () => void;
  onCancel?: () => void;
};

const tagOptions: Array<{ value: PatientTag; label: string }> = [
  { value: "NOVO", label: "Novo" },
  { value: "ATIVO", label: "Ativo" },
  { value: "VIP", label: "VIP" },
  { value: "INATIVO", label: "Inativo" },
];

export function PatientForm({
  action,
  submitLabel,
  initial,
  onSuccess,
  onCancel,
}: PatientFormProps) {
  const [state, formAction, pending] = useActionState<
    ActionResult<unknown> | null,
    FormData
  >(action, null);

  const [phone, setPhone] = useState(
    initial ? formatPhoneDisplay(initial.phone) : "",
  );
  const [cpf, setCpf] = useState(
    initial?.cpf ? formatCPFDisplay(initial.cpf) : "",
  );
  const [birthDate, setBirthDate] = useState(
    initial?.birthDate ? formatBirthDateBR(new Date(initial.birthDate)) : "",
  );

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
        label="Telefone"
        required
        hint="Com DDD. Ex: (11) 99999-9999"
        error={fieldErrors?.phone}
      >
        <input
          name="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          inputMode="tel"
          autoComplete="off"
          placeholder="(11) 99999-9999"
          className={fieldInputCls}
        />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="E-mail" hint="Opcional" error={fieldErrors?.email}>
          <input
            name="email"
            type="email"
            defaultValue={initial?.email ?? ""}
            autoComplete="off"
            className={fieldInputCls}
          />
        </Field>

        <Field label="CPF" hint="Opcional" error={fieldErrors?.cpf}>
          <input
            name="cpf"
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            inputMode="numeric"
            placeholder="000.000.000-00"
            autoComplete="off"
            className={fieldInputCls}
          />
        </Field>

        <Field
          label="Nascimento"
          hint="dd/mm/aaaa, opcional"
          error={fieldErrors?.birthDate}
        >
          <input
            name="birthDate"
            type="text"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            inputMode="numeric"
            placeholder="dd/mm/aaaa"
            autoComplete="off"
            className={fieldInputCls}
          />
        </Field>

        <Field label="Tag" error={fieldErrors?.tag}>
          <select
            name="tag"
            defaultValue={initial?.tag ?? "NOVO"}
            className={fieldInputCls}
          >
            {tagOptions.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field
        label="Observações"
        hint="Histórico clínico, preferências, alergias. Máx. 2000 caracteres."
        error={fieldErrors?.notes}
      >
        <textarea
          name="notes"
          defaultValue={initial?.notes ?? ""}
          maxLength={2000}
          rows={4}
          className={`${fieldInputCls} resize-y`}
        />
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
