"use client";

// "use client" — motivo: useState/useTransition pras 3 mutações da ficha
// (drawer de edição completa, dropdown inline de tag, textarea inline de
// observações), useRouter pra refresh após cada mutation.

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { ChangeEvent } from "react";
import {
  AppointmentStatus,
  PatientTag,
} from "@/generated/prisma/client";

import { Button } from "@/components/Button";
import { Avatar } from "../../components/Avatar";
import { Drawer } from "../../components/Drawer";
import { fieldInputCls } from "../../components/Field";
import { StatusBadge } from "../../components/StatusBadge";
import { formatBRL } from "../../lib/mock-data";

import {
  updatePatient,
  updatePatientNotes,
  updatePatientTag,
} from "../actions";
import { PatientForm } from "../PatientForm";
import {
  ageFromBirthDate,
  formatCPFDisplay,
  formatDateTimeBR,
  formatPhoneDisplay,
} from "../lib/format";

export type SerializedPatient = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  cpf: string | null;
  birthDate: string | null;
  tag: PatientTag;
  notes: string | null;
};

export type SerializedAppointment = {
  id: string;
  startsAt: string;
  status: AppointmentStatus;
  procedureName: string;
  professionalName: string | null;
  priceBRL: number | null;
};

const tagStyles: Record<PatientTag, string> = {
  VIP: "bg-accent text-paper-0",
  ATIVO: "bg-accent-tint text-accent",
  NOVO: "bg-paper-2 text-ink-1 border border-paper-3",
  INATIVO: "bg-paper-1 text-ink-3",
};

const tagLabels: Record<PatientTag, string> = {
  VIP: "VIP",
  ATIVO: "Ativo",
  NOVO: "Novo",
  INATIVO: "Inativo",
};

const tagOptions: Array<{ value: PatientTag; label: string }> = [
  { value: "NOVO", label: "Novo" },
  { value: "ATIVO", label: "Ativo" },
  { value: "VIP", label: "VIP" },
  { value: "INATIVO", label: "Inativo" },
];

export function PatientDetailClient({
  patient,
  appointments,
}: {
  patient: SerializedPatient;
  appointments: SerializedAppointment[];
}) {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [tagPending, startTagTransition] = useTransition();
  const [tagError, setTagError] = useState<string | null>(null);

  const [notes, setNotes] = useState(patient.notes ?? "");
  const [notesPending, startNotesTransition] = useTransition();
  const [notesMessage, setNotesMessage] = useState<{
    ok: boolean;
    text: string;
  } | null>(null);
  const notesDirty = (patient.notes ?? "") !== notes;

  const boundUpdate = updatePatient.bind(null, patient.id);
  const age = patient.birthDate
    ? ageFromBirthDate(new Date(patient.birthDate))
    : null;

  function handleTagChange(e: ChangeEvent<HTMLSelectElement>) {
    const newTag = e.target.value as PatientTag;
    setTagError(null);
    startTagTransition(async () => {
      const r = await updatePatientTag(patient.id, newTag);
      if (!r.ok) {
        setTagError(r.error);
        return;
      }
      router.refresh();
    });
  }

  function handleSaveNotes() {
    setNotesMessage(null);
    startNotesTransition(async () => {
      const r = await updatePatientNotes(patient.id, notes);
      if (!r.ok) {
        setNotesMessage({ ok: false, text: r.error });
        return;
      }
      setNotesMessage({ ok: true, text: "Observações salvas." });
      router.refresh();
    });
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="rounded-xl bg-paper-0 border border-paper-3 p-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-5">
          <div className="min-w-0 flex items-start gap-4">
            <Avatar name={patient.name} id={patient.id} size="lg" decorative />
            <div className="min-w-0">
              <h2 className="font-display text-2xl font-semibold text-ink-0 tracking-[-0.025em] leading-tight">
                {patient.name}
              </h2>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-sm text-ink-1">
                <span className="font-mono">
                  {formatPhoneDisplay(patient.phone)}
                </span>
                {patient.email && (
                  <>
                    <span className="text-ink-3" aria-hidden>
                      ·
                    </span>
                    <span className="truncate">{patient.email}</span>
                  </>
                )}
                {age !== null && (
                  <>
                    <span className="text-ink-3" aria-hidden>
                      ·
                    </span>
                    <span className="font-mono text-xs text-ink-2">
                      {age} anos
                    </span>
                  </>
                )}
                {patient.cpf && (
                  <>
                    <span className="text-ink-3" aria-hidden>
                      ·
                    </span>
                    <span className="font-mono text-xs text-ink-2">
                      {formatCPFDisplay(patient.cpf)}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          <Button
            variant="primary"
            size="sm"
            type="button"
            onClick={() => setDrawerOpen(true)}
          >
            Editar paciente
          </Button>
        </div>

        {/* Inline tag */}
        <div className="mt-5 pt-5 border-t border-paper-3 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="text-[10px] uppercase tracking-[0.12em] font-mono text-ink-2 shrink-0">
            Tag
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.08em] font-medium ${tagStyles[patient.tag]}`}
            >
              {patient.tag === "VIP" && (
                <span aria-hidden className="text-[11px] leading-none">
                  ★
                </span>
              )}
              {tagLabels[patient.tag]}
            </span>
            <select
              value={patient.tag}
              onChange={handleTagChange}
              disabled={tagPending}
              className={`${fieldInputCls} max-w-[180px] py-1.5`}
              aria-label="Mudar tag do paciente"
            >
              {tagOptions.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
            {tagError && (
              <span
                role="alert"
                className="text-[11px] font-mono text-ink-2"
              >
                {tagError}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Observações inline */}
      <div className="rounded-xl bg-paper-0 border border-paper-3 p-6">
        <div className="flex items-baseline justify-between mb-3">
          <h3 className="font-display text-base font-semibold text-ink-0">
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
          rows={4}
          className={`${fieldInputCls} resize-y`}
          placeholder="Histórico clínico, preferências, alergias…"
        />
        <div className="flex items-center justify-end gap-3 mt-3">
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
            onClick={handleSaveNotes}
          >
            {notesPending ? "Salvando…" : "Salvar observações"}
          </Button>
        </div>
      </div>

      {/* Histórico de agendamentos */}
      <div className="rounded-xl bg-paper-0 border border-paper-3 overflow-hidden">
        <div className="px-6 py-4 border-b border-paper-3">
          <h3 className="font-display text-base font-semibold text-ink-0">
            Histórico
          </h3>
          <p className="text-[11px] font-mono text-ink-3 mt-1">
            {appointments.length}{" "}
            {appointments.length === 1 ? "atendimento" : "atendimentos"}
          </p>
        </div>
        {appointments.length === 0 ? (
          <div className="px-6 py-12 text-center text-sm text-ink-3">
            Nenhum atendimento registrado.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[10px] uppercase tracking-[0.12em] font-mono text-ink-3">
                  <th className="text-left font-normal px-6 py-3">Data</th>
                  <th className="text-left font-normal px-6 py-3">
                    Procedimento
                  </th>
                  <th className="text-left font-normal px-6 py-3 hidden md:table-cell">
                    Profissional
                  </th>
                  <th className="text-right font-normal px-6 py-3 hidden sm:table-cell">
                    Valor
                  </th>
                  <th className="text-right font-normal px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((a) => (
                  <tr key={a.id} className="border-t border-paper-3">
                    <td className="px-6 py-3.5 text-ink-1 font-mono text-xs tabular-nums">
                      {formatDateTimeBR(a.startsAt)}
                    </td>
                    <td className="px-6 py-3.5 text-ink-0">
                      {a.procedureName}
                    </td>
                    <td className="px-6 py-3.5 text-ink-1 hidden md:table-cell">
                      {a.professionalName ?? (
                        <span className="text-ink-3">—</span>
                      )}
                    </td>
                    <td className="px-6 py-3.5 text-right text-ink-0 font-mono tabular-nums hidden sm:table-cell">
                      {a.priceBRL !== null && a.priceBRL > 0 ? (
                        formatBRL(a.priceBRL)
                      ) : (
                        <span className="text-ink-3">—</span>
                      )}
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <StatusBadge status={a.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Editar paciente"
      >
        <PatientForm
          action={boundUpdate}
          submitLabel="Salvar alterações"
          initial={patient}
          onSuccess={() => {
            setDrawerOpen(false);
            router.refresh();
          }}
          onCancel={() => setDrawerOpen(false)}
        />
      </Drawer>
    </div>
  );
}
