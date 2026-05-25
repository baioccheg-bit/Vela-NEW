"use client";

// "use client" — motivo: useActionState (React 19) pra capturar o ActionResult,
// useState pros campos controlados (data/hora, autocomplete de paciente,
// override de duração/preço), useEffect pra reset de duração/preço quando o
// procedimento muda (proteção 3a) e onSuccess do parent.

import { useActionState, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/Button";

import { Field, fieldInputCls } from "../components/Field";
import { formatPhoneDisplay } from "../pacientes/lib/format";

import type { ActionResult } from "./lib/schema";
import { formatDateTimeDisplayBR } from "./lib/format";

export type SerializedPatientOption = {
  id: string;
  name: string;
  phone: string; // E.164
};

export type SerializedProfessionalOption = {
  id: string;
  name: string;
  active: boolean;
};

export type SerializedProcedureOption = {
  id: string;
  name: string;
  durationMin: number;
  priceBRL: number; // serializado pra number na borda RSC→Client
  active: boolean;
};

export type AppointmentFormInitial = {
  id: string;
  patientId: string;
  professionalId: string;
  procedureId: string;
  startsAtISO: string;
  durationMin: number;
  priceBRL: number;
  notes: string | null;
};

type Props = {
  action: (
    prev: ActionResult<unknown> | null,
    fd: FormData,
  ) => Promise<ActionResult<unknown>>;
  submitLabel: string;
  patients: SerializedPatientOption[];
  professionals: SerializedProfessionalOption[];
  procedures: SerializedProcedureOption[];
  /** Em criação: pré-preenche data/hora (slot clicado) e/ou profissional. */
  defaults?: {
    startsAtISO?: string;
    professionalId?: string;
  };
  initial?: AppointmentFormInitial;
  onSuccess?: () => void;
  onCancel?: () => void;
};

/** Formata um valor numérico em "1234,56" pro input controlado de preço. */
function formatPriceForInput(n: number | undefined): string {
  if (n === undefined || n === null || Number.isNaN(n)) return "";
  return n.toFixed(2).replace(".", ",");
}

/** ISO → "dd/mm/yyyy HH:mm" via formatter SP. Usado pra montar default
 *  do input de data/hora. */
function isoToInputBR(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return formatDateTimeDisplayBR(d);
}

export function AppointmentForm({
  action,
  submitLabel,
  patients,
  professionals,
  procedures,
  defaults,
  initial,
  onSuccess,
  onCancel,
}: Props) {
  const [state, formAction, pending] = useActionState<
    ActionResult<unknown> | null,
    FormData
  >(action, null);

  const activeProcedures = useMemo(
    () => procedures.filter((p) => p.active || p.id === initial?.procedureId),
    [procedures, initial?.procedureId],
  );
  const activeProfessionals = useMemo(
    () =>
      professionals.filter(
        (p) => p.active || p.id === initial?.professionalId,
      ),
    [professionals, initial?.professionalId],
  );

  const [patientId, setPatientId] = useState(initial?.patientId ?? "");
  const [patientQuery, setPatientQuery] = useState(
    initial ? patients.find((p) => p.id === initial.patientId)?.name ?? "" : "",
  );
  const [patientListOpen, setPatientListOpen] = useState(false);

  const [professionalId, setProfessionalId] = useState(
    initial?.professionalId ?? defaults?.professionalId ?? "",
  );

  const [procedureId, setProcedureId] = useState(initial?.procedureId ?? "");

  const initialStartsAtBR = initial
    ? isoToInputBR(initial.startsAtISO)
    : defaults?.startsAtISO
      ? isoToInputBR(defaults.startsAtISO)
      : "";
  const [startsAt, setStartsAt] = useState(initialStartsAtBR);

  const initialDurationDefault = initial
    ? String(initial.durationMin)
    : "";
  const initialPriceDefault = initial
    ? formatPriceForInput(initial.priceBRL)
    : "";

  const [durationMin, setDurationMin] = useState(initialDurationDefault);
  const [priceBRL, setPriceBRL] = useState(initialPriceDefault);

  /**
   * Proteção 3a: trocar de procedimento RESETA duração e preço pros valores
   * do novo procedimento. Override anterior é descartado — é o comportamento
   * esperado (default sempre segue o procedimento atual). Reset é feito no
   * onChange do select pra evitar setState-in-effect.
   */
  function handleProcedureChange(newProcedureId: string) {
    setProcedureId(newProcedureId);
    const proc = procedures.find((p) => p.id === newProcedureId);
    if (proc) {
      setDurationMin(String(proc.durationMin));
      setPriceBRL(formatPriceForInput(proc.priceBRL));
    } else {
      setDurationMin("");
      setPriceBRL("");
    }
  }

  useEffect(() => {
    if (state?.ok) onSuccess?.();
  }, [state, onSuccess]);

  const fieldErrors = state && !state.ok ? state.fieldErrors : undefined;
  const generalError =
    state && !state.ok && !state.fieldErrors ? state.error : null;

  // Autocomplete simples de paciente (filtra por nome ou telefone formatado).
  const filteredPatients = useMemo(() => {
    const q = patientQuery.trim().toLowerCase();
    if (q === "") return patients.slice(0, 8);
    const digits = q.replace(/\D/g, "");
    return patients
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (digits !== "" && p.phone.includes(digits)),
      )
      .slice(0, 8);
  }, [patients, patientQuery]);

  const selectedProc = procedures.find((p) => p.id === procedureId);

  return (
    <form action={formAction} className="space-y-5">
      {/* Hidden inputs com os IDs canônicos */}
      <input type="hidden" name="patientId" value={patientId} />
      <input type="hidden" name="professionalId" value={professionalId} />
      <input type="hidden" name="procedureId" value={procedureId} />

      <Field
        label="Paciente"
        required
        hint="Busque por nome ou telefone."
        error={fieldErrors?.patientId}
      >
        <div className="relative">
          <input
            type="text"
            value={patientQuery}
            onChange={(e) => {
              setPatientQuery(e.target.value);
              setPatientId("");
              setPatientListOpen(true);
            }}
            onFocus={() => setPatientListOpen(true)}
            onBlur={() => {
              // Delay pra permitir o click no item da lista resolver primeiro.
              setTimeout(() => setPatientListOpen(false), 120);
            }}
            placeholder="Digite o nome…"
            autoComplete="off"
            className={fieldInputCls}
          />
          {patientListOpen && filteredPatients.length > 0 && (
            <ul
              role="listbox"
              className="absolute z-10 left-0 right-0 mt-1 max-h-56 overflow-y-auto rounded-md bg-paper-0 border border-paper-3 shadow-[0_24px_60px_-28px_rgba(20,50,60,0.22)]"
            >
              {filteredPatients.map((p) => (
                <li
                  key={p.id}
                  role="option"
                  aria-selected={p.id === patientId}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setPatientId(p.id);
                    setPatientQuery(p.name);
                    setPatientListOpen(false);
                  }}
                  className="px-3 py-2 cursor-pointer hover:bg-paper-1 border-b border-paper-3 last:border-b-0"
                >
                  <div className="text-sm text-ink-0">{p.name}</div>
                  <div className="text-[11px] font-mono text-ink-3">
                    {formatPhoneDisplay(p.phone)}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field
          label="Profissional"
          required
          error={fieldErrors?.professionalId}
        >
          <select
            value={professionalId}
            onChange={(e) => setProfessionalId(e.target.value)}
            className={fieldInputCls}
          >
            <option value="">Selecione…</option>
            {activeProfessionals.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
                {!p.active ? " (inativo)" : ""}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label="Procedimento"
          required
          error={fieldErrors?.procedureId}
        >
          <select
            value={procedureId}
            onChange={(e) => handleProcedureChange(e.target.value)}
            className={fieldInputCls}
          >
            <option value="">Selecione…</option>
            {activeProcedures.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
                {!p.active ? " (inativo)" : ""}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field
        label="Data e hora"
        required
        hint="dd/mm/aaaa HH:mm — horário de São Paulo."
        error={fieldErrors?.startsAt}
      >
        <input
          name="startsAt"
          type="text"
          value={startsAt}
          onChange={(e) => setStartsAt(e.target.value)}
          placeholder="25/05/2026 14:30"
          inputMode="numeric"
          autoComplete="off"
          className={fieldInputCls}
        />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field
          label="Duração (min)"
          hint={
            selectedProc
              ? `Padrão do procedimento: ${selectedProc.durationMin} min.`
              : "Default vem do procedimento."
          }
          error={fieldErrors?.durationMin}
        >
          <input
            name="durationMin"
            type="number"
            min={5}
            max={480}
            step={5}
            value={durationMin}
            onChange={(e) => setDurationMin(e.target.value)}
            inputMode="numeric"
            className={fieldInputCls}
          />
        </Field>

        <Field
          label="Valor (R$)"
          hint={
            selectedProc
              ? `Padrão do procedimento: ${formatPriceForInput(selectedProc.priceBRL)}.`
              : "Default vem do procedimento."
          }
          error={fieldErrors?.priceBRL}
        >
          <input
            name="priceBRL"
            type="text"
            value={priceBRL}
            onChange={(e) => setPriceBRL(e.target.value)}
            placeholder="0,00"
            inputMode="decimal"
            className={fieldInputCls}
          />
        </Field>
      </div>

      <Field
        label="Observações"
        hint="Visíveis só pra equipe. Máx. 2000 caracteres."
        error={fieldErrors?.notes}
      >
        <textarea
          name="notes"
          defaultValue={initial?.notes ?? ""}
          maxLength={2000}
          rows={3}
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
