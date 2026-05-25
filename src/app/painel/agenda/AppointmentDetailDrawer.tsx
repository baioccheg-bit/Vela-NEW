"use client";

// "use client" — motivo: várias mutações com useTransition (confirmar, atender,
// ausente, cancelar, reagendar), troca de sub-tela (detalhes ↔ reagendar ↔ editar),
// edição inline de notas via useState.

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState, useTransition } from "react";
import type { ReactNode } from "react";
import type { AppointmentStatus } from "@/generated/prisma/client";

import { Button } from "@/components/Button";
import { Drawer } from "../components/Drawer";
import { fieldInputCls, Field } from "../components/Field";
import { StatusBadge } from "../components/StatusBadge";

import {
  attendAppointment,
  cancelAppointment,
  confirmAppointment,
  missAppointment,
  rescheduleAppointment,
  updateAppointment,
  updateAppointmentNotes,
} from "./actions";
import {
  AppointmentForm,
  type AppointmentFormInitial,
  type SerializedPatientOption,
  type SerializedProcedureOption,
  type SerializedProfessionalOption,
} from "./AppointmentForm";
import {
  formatDateTimeDisplayBR,
  isOffGridMinute,
  isTerminal,
} from "./lib/format";
import type { ActionResult } from "./lib/schema";

export type AppointmentDetailView = {
  id: string;
  status: AppointmentStatus;
  startsAtISO: string;
  durationMin: number;
  priceBRL: number | null;
  notes: string | null;
  originalStartsAtISO: string | null;
  rescheduledAtISO: string | null;
  patient: { id: string; name: string; phone: string };
  procedure: {
    id: string;
    name: string;
    durationMin: number;
    priceBRL: number;
    active: boolean;
  };
  professional: {
    id: string;
    name: string;
    color: string;
    active: boolean;
  } | null;
};

type Mode = "details" | "reschedule" | "edit";

type Props = {
  open: boolean;
  appointment: AppointmentDetailView | null;
  patients: SerializedPatientOption[];
  professionals: SerializedProfessionalOption[];
  procedures: SerializedProcedureOption[];
  onClose: () => void;
};

function formatBRL(n: number): string {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function AppointmentDetailDrawer({
  open,
  appointment,
  patients,
  professionals,
  procedures,
  onClose,
}: Props) {
  if (!appointment) return null;
  // Inner é remontado quando o `appointment.id` muda (key no parent abaixo),
  // o que dá reset gratuito do estado sem precisar de useEffect-com-setState.
  return (
    <AppointmentDetailDrawerInner
      key={`${appointment.id}:${String(open)}`}
      open={open}
      appointment={appointment}
      patients={patients}
      professionals={professionals}
      procedures={procedures}
      onClose={onClose}
    />
  );
}

function AppointmentDetailDrawerInner({
  open,
  appointment,
  patients,
  professionals,
  procedures,
  onClose,
}: Props & { appointment: AppointmentDetailView }) {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("details");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [cancelReason, setCancelReason] = useState("");
  const [showCancelInput, setShowCancelInput] = useState(false);

  const [notes, setNotes] = useState(appointment.notes ?? "");
  const [notesPending, startNotesTransition] = useTransition();
  const [notesMessage, setNotesMessage] = useState<{
    ok: boolean;
    text: string;
  } | null>(null);

  const terminal = isTerminal(appointment.status);
  const startsAt = new Date(appointment.startsAtISO);
  const offGrid = isOffGridMinute(startsAt);

  // Override hint (proteção 3b): se preço/duração divergem do procedimento atual.
  const priceOverridden =
    appointment.priceBRL !== null &&
    Math.abs(appointment.priceBRL - appointment.procedure.priceBRL) > 0.005;
  const durationOverridden =
    appointment.durationMin !== appointment.procedure.durationMin;

  function refresh() {
    router.refresh();
  }

  function runAction(fn: () => Promise<ActionResult>, closeOnOk = false) {
    setError(null);
    startTransition(async () => {
      const r = await fn();
      if (!r.ok) {
        setError(r.error);
        return;
      }
      refresh();
      if (closeOnOk) onClose();
    });
  }

  function handleSaveNotes() {
    setNotesMessage(null);
    startNotesTransition(async () => {
      const r = await updateAppointmentNotes(appointment.id, notes);
      if (!r.ok) {
        setNotesMessage({ ok: false, text: r.error });
        return;
      }
      setNotesMessage({ ok: true, text: "Observações salvas." });
      refresh();
    });
  }

  const drawerTitle =
    mode === "reschedule"
      ? "Reagendar"
      : mode === "edit"
        ? "Editar agendamento"
        : "Detalhes do agendamento";

  return (
    <Drawer open={open} onClose={onClose} title={drawerTitle}>
      {mode === "details" && (
        <DetailsView
          appointment={appointment}
          startsAt={startsAt}
          offGrid={offGrid}
          terminal={terminal}
          priceOverridden={priceOverridden}
          durationOverridden={durationOverridden}
          notes={notes}
          setNotes={setNotes}
          notesPending={notesPending}
          notesMessage={notesMessage}
          onSaveNotes={handleSaveNotes}
          onConfirm={() =>
            runAction(() => confirmAppointment(appointment.id), false)
          }
          onAttend={() =>
            runAction(() => attendAppointment(appointment.id), false)
          }
          onMiss={() => runAction(() => missAppointment(appointment.id), false)}
          onCancelClick={() => setShowCancelInput((v) => !v)}
          onConfirmCancel={() =>
            runAction(
              () => cancelAppointment(appointment.id, cancelReason),
              true,
            )
          }
          onReschedule={() => setMode("reschedule")}
          onEdit={() => setMode("edit")}
          showCancelInput={showCancelInput}
          cancelReason={cancelReason}
          setCancelReason={setCancelReason}
          error={error}
          pending={pending}
        />
      )}

      {mode === "reschedule" && (
        <RescheduleView
          appointmentId={appointment.id}
          currentStartsAt={startsAt}
          onBack={() => setMode("details")}
          onSuccess={() => {
            setMode("details");
            refresh();
          }}
        />
      )}

      {mode === "edit" && (
        <AppointmentForm
          action={updateAppointment.bind(null, appointment.id)}
          submitLabel="Salvar alterações"
          patients={patients}
          professionals={professionals}
          procedures={procedures}
          initial={
            {
              id: appointment.id,
              patientId: appointment.patient.id,
              professionalId: appointment.professional?.id ?? "",
              procedureId: appointment.procedure.id,
              startsAtISO: appointment.startsAtISO,
              durationMin: appointment.durationMin,
              priceBRL: appointment.priceBRL ?? appointment.procedure.priceBRL,
              notes: appointment.notes,
            } satisfies AppointmentFormInitial
          }
          onSuccess={() => {
            setMode("details");
            refresh();
          }}
          onCancel={() => setMode("details")}
        />
      )}
    </Drawer>
  );
}

// ── Sub-componentes ────────────────────────────────────────────

type DetailsViewProps = {
  appointment: AppointmentDetailView;
  startsAt: Date;
  offGrid: boolean;
  terminal: boolean;
  priceOverridden: boolean;
  durationOverridden: boolean;
  notes: string;
  setNotes: (v: string) => void;
  notesPending: boolean;
  notesMessage: { ok: boolean; text: string } | null;
  onSaveNotes: () => void;
  onConfirm: () => void;
  onAttend: () => void;
  onMiss: () => void;
  onCancelClick: () => void;
  onConfirmCancel: () => void;
  onReschedule: () => void;
  onEdit: () => void;
  showCancelInput: boolean;
  cancelReason: string;
  setCancelReason: (v: string) => void;
  error: string | null;
  pending: boolean;
};

function DetailsView({
  appointment,
  startsAt,
  offGrid,
  terminal,
  priceOverridden,
  durationOverridden,
  notes,
  setNotes,
  notesPending,
  notesMessage,
  onSaveNotes,
  onConfirm,
  onAttend,
  onMiss,
  onCancelClick,
  onConfirmCancel,
  onReschedule,
  onEdit,
  showCancelInput,
  cancelReason,
  setCancelReason,
  error,
  pending,
}: DetailsViewProps) {
  const notesDirty = (appointment.notes ?? "") !== notes;
  const procActive = appointment.procedure.active;
  const profActive = appointment.professional?.active ?? false;

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[10px] uppercase tracking-[0.12em] font-mono text-ink-2 mb-1">
            Paciente
          </div>
          <div className="font-display text-lg font-semibold text-ink-0 truncate">
            {appointment.patient.name}
          </div>
        </div>
        <StatusBadge status={appointment.status} />
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-paper-3">
        <Block label="Data e hora">
          <div className="font-mono tabular-nums text-ink-0">
            {formatDateTimeDisplayBR(startsAt)}
          </div>
          {appointment.originalStartsAtISO && (
            <div className="text-[11px] font-mono text-ink-3 mt-1">
              Reagendado de{" "}
              {formatDateTimeDisplayBR(new Date(appointment.originalStartsAtISO))}
            </div>
          )}
          {offGrid && (
            <div className="text-[11px] font-mono text-ink-3 mt-1">
              Minuto não-cheio — pode não aparecer na grade.
            </div>
          )}
        </Block>

        <Block label="Profissional">
          <div className="text-ink-0">
            {appointment.professional?.name ?? "—"}
          </div>
          {appointment.professional && !profActive && (
            <div className="text-[11px] font-mono text-ink-3 mt-1">
              Inativo
            </div>
          )}
        </Block>

        <Block label="Procedimento">
          <div className="text-ink-0">{appointment.procedure.name}</div>
          {!procActive && (
            <div className="text-[11px] font-mono text-ink-3 mt-1">
              Inativo
            </div>
          )}
        </Block>

        <Block label="Valor">
          <div className="font-mono tabular-nums text-ink-0 inline-flex items-center gap-1.5">
            {appointment.priceBRL !== null
              ? formatBRL(appointment.priceBRL)
              : "—"}
            {priceOverridden && (
              <span
                aria-label="Valor difere da tabela do procedimento"
                title="Valor difere da tabela do procedimento"
                className="text-accent text-[10px] font-mono"
              >
                *
              </span>
            )}
          </div>
        </Block>

        <Block label="Duração">
          <div className="font-mono tabular-nums text-ink-0 inline-flex items-center gap-1.5">
            {appointment.durationMin} min
            {durationOverridden && (
              <span
                aria-label="Duração difere do padrão do procedimento"
                title="Duração difere do padrão do procedimento"
                className="text-accent text-[10px] font-mono"
              >
                *
              </span>
            )}
          </div>
        </Block>

        <Block label="Telefone">
          <div className="font-mono text-ink-1 text-xs">
            {appointment.patient.phone}
          </div>
        </Block>
      </div>

      {(priceOverridden || durationOverridden) && (
        <p className="text-[11px] font-mono text-ink-3">
          <span className="text-accent">*</span> Valor ajustado em relação ao
          padrão do procedimento.
        </p>
      )}

      {/* Observações inline (sempre editáveis, mesmo em status terminal) */}
      <div className="pt-4 border-t border-paper-3">
        <div className="flex items-baseline justify-between mb-2">
          <h3 className="text-[10px] uppercase tracking-[0.12em] font-mono text-ink-2">
            Observações
          </h3>
          <span className="text-[10px] uppercase tracking-[0.12em] font-mono text-ink-3">
            {notes.length}/2000
          </span>
        </div>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          maxLength={2000}
          rows={3}
          className={`${fieldInputCls} resize-y`}
          placeholder="Notas internas…"
        />
        <div className="flex items-center justify-end gap-3 mt-2">
          {notesMessage && (
            <span
              role={notesMessage.ok ? "status" : "alert"}
              className={`text-[11px] font-mono ${
                notesMessage.ok ? "text-accent" : "text-ink-2"
              }`}
            >
              {notesMessage.text}
            </span>
          )}
          <Button
            variant="primary"
            size="sm"
            type="button"
            disabled={!notesDirty || notesPending}
            onClick={onSaveNotes}
          >
            {notesPending ? "Salvando…" : "Salvar observações"}
          </Button>
        </div>
      </div>

      {/* Ações por status */}
      {!terminal && (
        <div className="pt-4 border-t border-paper-3 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            {appointment.status === "PENDENTE" && (
              <Button
                variant="primary"
                size="sm"
                type="button"
                onClick={onConfirm}
                disabled={pending}
              >
                Confirmar
              </Button>
            )}
            {(appointment.status === "PENDENTE" ||
              appointment.status === "CONFIRMADO") && (
              <>
                <Button
                  variant="primary"
                  size="sm"
                  type="button"
                  onClick={onAttend}
                  disabled={pending}
                >
                  Marcar como atendido
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  type="button"
                  onClick={onMiss}
                  disabled={pending}
                >
                  Marcar ausente
                </Button>
              </>
            )}
            <Button
              variant="ghost"
              size="sm"
              type="button"
              onClick={onReschedule}
              disabled={pending}
            >
              Reagendar
            </Button>
            <Button
              variant="ghost"
              size="sm"
              type="button"
              onClick={onEdit}
              disabled={pending}
            >
              Editar
            </Button>
            <Button
              variant="ghost"
              size="sm"
              type="button"
              onClick={onCancelClick}
              disabled={pending}
            >
              Cancelar agendamento
            </Button>
          </div>

          {showCancelInput && (
            <div className="rounded-md bg-paper-1 border border-paper-3 p-3 space-y-2">
              <label className="block text-[10px] uppercase tracking-[0.12em] font-mono text-ink-2">
                Motivo (opcional)
              </label>
              <input
                type="text"
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                maxLength={500}
                placeholder="Ex: paciente pediu pra remarcar"
                className={fieldInputCls}
              />
              <div className="flex items-center justify-end gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  type="button"
                  onClick={onConfirmCancel}
                  disabled={pending}
                >
                  Confirmar cancelamento
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {error && (
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
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}

function Block({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.12em] font-mono text-ink-2 mb-1">
        {label}
      </div>
      {children}
    </div>
  );
}

// ── Reschedule sub-tela ────────────────────────────────────────

function RescheduleView({
  appointmentId,
  currentStartsAt,
  onBack,
  onSuccess,
}: {
  appointmentId: string;
  currentStartsAt: Date;
  onBack: () => void;
  onSuccess: () => void;
}) {
  const boundReschedule = rescheduleAppointment.bind(null, appointmentId);
  const [state, formAction, pending] = useActionState<
    ActionResult<unknown> | null,
    FormData
  >(boundReschedule, null);

  const [startsAt, setStartsAt] = useState(
    formatDateTimeDisplayBR(currentStartsAt),
  );

  useEffect(() => {
    if (state?.ok) onSuccess();
  }, [state, onSuccess]);

  const fieldErrors = state && !state.ok ? state.fieldErrors : undefined;
  const generalError =
    state && !state.ok && !state.fieldErrors ? state.error : null;

  return (
    <form action={formAction} className="space-y-5">
      <p className="text-sm text-ink-1">
        Horário atual:{" "}
        <span className="font-mono text-ink-0">
          {formatDateTimeDisplayBR(currentStartsAt)}
        </span>
      </p>

      <Field
        label="Nova data e hora"
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
        <Button variant="ghost" size="sm" type="button" onClick={onBack}>
          Voltar
        </Button>
        <Button variant="primary" size="sm" type="submit" disabled={pending}>
          {pending ? "Reagendando…" : "Confirmar novo horário"}
        </Button>
      </div>
    </form>
  );
}
