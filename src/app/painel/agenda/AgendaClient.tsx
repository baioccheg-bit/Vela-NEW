"use client";

// "use client" — motivo: estado dos drawers (criar e detalhes), click handlers
// nos slots da grade, router.refresh após mutations.

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { AppointmentStatus } from "@/generated/prisma/client";

import { Drawer } from "../components/Drawer";

import { createAppointment } from "./actions";
import type { WeekAgendaView } from "./lib/view-types";
import {
  AppointmentForm,
  type SerializedPatientOption,
  type SerializedProcedureOption,
  type SerializedProfessionalOption,
} from "./AppointmentForm";
import {
  AppointmentDetailDrawer,
  type AppointmentDetailView,
} from "./AppointmentDetailDrawer";

const statusStyles: Record<AppointmentStatus, string> = {
  CONFIRMADO: "bg-accent-tint border-accent text-ink-0",
  PENDENTE: "bg-paper-1 border-paper-3 text-ink-1",
  ATENDIDO: "bg-paper-2 border-paper-3 text-ink-1",
  CANCELADO: "bg-paper-1 border-paper-3 text-ink-3 line-through",
  AUSENTE: "bg-paper-1 border-paper-3 text-ink-3",
};

const statusLabels: Record<AppointmentStatus, string> = {
  CONFIRMADO: "Confirmado",
  ATENDIDO: "Atendido",
  PENDENTE: "Pendente",
  CANCELADO: "Cancelado",
  AUSENTE: "Ausente",
};

const legendOrder: AppointmentStatus[] = [
  "CONFIRMADO",
  "ATENDIDO",
  "PENDENTE",
  "CANCELADO",
];

type Props = {
  weekAgenda: WeekAgendaView;
  appointmentsById: Record<string, AppointmentDetailView>;
  patients: SerializedPatientOption[];
  professionals: SerializedProfessionalOption[];
  procedures: SerializedProcedureOption[];
};

export function AgendaClient({
  weekAgenda,
  appointmentsById,
  patients,
  professionals,
  procedures,
}: Props) {
  const router = useRouter();
  const [createOpen, setCreateOpen] = useState(false);
  const [createDefaults, setCreateDefaults] = useState<{
    startsAtISO?: string;
  }>({});
  const [detailId, setDetailId] = useState<string | null>(null);

  const selectedAppointment = useMemo(
    () => (detailId ? appointmentsById[detailId] ?? null : null),
    [detailId, appointmentsById],
  );

  function handleSlotClick(dayIdx: number, slotHour: number) {
    // Constrói "yyyy-mm-dd" da coluna + hora do slot em SP, depois ISO.
    const day = weekAgenda.weekDates[dayIdx];
    if (!day) return;
    const [yyyy, mm, dd] = day.split("-");
    // Mantemos o offset BR fixo (mesmo que o helper de parse).
    const iso = `${yyyy}-${mm}-${dd}T${String(slotHour).padStart(2, "0")}:00:00-03:00`;
    setCreateDefaults({ startsAtISO: iso });
    setCreateOpen(true);
  }

  function handleCellClick(id: string) {
    setDetailId(id);
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Semana anterior"
            disabled
            className="w-9 h-9 rounded-md bg-paper-0 border border-paper-3 flex items-center justify-center text-ink-3 cursor-not-allowed"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="w-4 h-4"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Próxima semana"
            disabled
            className="w-9 h-9 rounded-md bg-paper-0 border border-paper-3 flex items-center justify-center text-ink-3 cursor-not-allowed"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="w-4 h-4"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
          <div className="ml-3 font-display text-xl font-semibold tracking-[-0.02em] text-ink-0">
            Esta <span className="italic-accent">semana</span>.
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.1em] text-ink-2">
            {legendOrder.map((s) => (
              <div key={s} className="flex items-center gap-2">
                <span
                  className={`w-3 h-3 rounded-sm border ${statusStyles[s].split(" ").slice(0, 2).join(" ")}`}
                />
                <span>{statusLabels[s]}</span>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              setCreateDefaults({});
              setCreateOpen(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ink-0 text-paper-0 text-sm font-medium hover:bg-accent transition-colors"
          >
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="w-3.5 h-3.5"
              aria-hidden
            >
              <path d="M8 3v10M3 8h10" strokeLinecap="round" />
            </svg>
            Novo agendamento
          </button>
        </div>
      </div>

      <div className="rounded-xl bg-paper-0 border border-paper-3 overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[900px]">
            <div className="grid grid-cols-[72px_repeat(7,minmax(0,1fr))] border-b border-paper-3 bg-paper-1">
              <div className="px-3 py-3" />
              {weekAgenda.weekDays.map((d, i) => (
                <div
                  key={d}
                  className={`relative px-3 py-3 text-center border-l border-paper-3 ${
                    i === weekAgenda.todayIndex ? "bg-accent-tint" : ""
                  }`}
                >
                  {i === weekAgenda.todayIndex && (
                    <span
                      aria-hidden
                      className="absolute top-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent"
                    />
                  )}
                  <div
                    className={`text-[10px] uppercase tracking-[0.12em] font-mono ${
                      i === weekAgenda.todayIndex ? "text-accent" : "text-ink-3"
                    }`}
                  >
                    {d.split(" ")[0]}
                  </div>
                  <div
                    className={`mt-1 font-display text-xl font-semibold tracking-[-0.02em] ${
                      i === weekAgenda.todayIndex ? "text-accent" : "text-ink-0"
                    }`}
                  >
                    {d.split(" ")[1]}
                  </div>
                </div>
              ))}
            </div>

            {weekAgenda.slots.map((slot) => {
              const hour = Number(slot.time.split(":")[0]);
              return (
                <div
                  key={slot.time}
                  className="grid grid-cols-[72px_repeat(7,minmax(0,1fr))] border-b border-paper-3 last:border-b-0"
                >
                  <div className="px-3 py-2.5 text-[11px] font-mono tabular-nums text-ink-2 self-center">
                    {slot.time}
                  </div>
                  {slot.days.map((cell, i) => (
                    <div
                      key={i}
                      className={`relative px-2 py-2 border-l border-paper-3 min-h-[64px] ${
                        i === weekAgenda.todayIndex
                          ? "bg-[color-mix(in_oklch,var(--color-accent)_3%,transparent)]"
                          : ""
                      }`}
                    >
                      {cell ? (
                        <button
                          type="button"
                          onClick={() => handleCellClick(cell.id)}
                          className={`block w-full text-left p-2 rounded-md border text-[11px] leading-tight cursor-pointer hover:shadow-sm transition-shadow ${statusStyles[cell.status]}`}
                        >
                          <div className="font-medium truncate">
                            {cell.patient}
                          </div>
                          <div className="text-[10px] opacity-75 truncate mt-0.5">
                            {cell.procedure}
                          </div>
                          {cell.professionalName && (
                            <div className="text-[10px] opacity-75 truncate mt-0.5">
                              {cell.professionalName}
                            </div>
                          )}
                        </button>
                      ) : (
                        <button
                          type="button"
                          aria-label={`Novo agendamento em ${slot.time}`}
                          onClick={() => handleSlotClick(i, hour)}
                          className="absolute inset-1 rounded-md opacity-0 hover:opacity-100 hover:bg-paper-2 transition-opacity text-[10px] font-mono uppercase tracking-[0.12em] text-ink-3"
                        >
                          + agendar
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Drawer
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Novo agendamento"
      >
        <AppointmentForm
          action={createAppointment}
          submitLabel="Agendar"
          patients={patients}
          professionals={professionals}
          procedures={procedures}
          defaults={createDefaults}
          onSuccess={() => {
            setCreateOpen(false);
            router.refresh();
          }}
          onCancel={() => setCreateOpen(false)}
        />
      </Drawer>

      <AppointmentDetailDrawer
        open={detailId !== null && selectedAppointment !== null}
        appointment={selectedAppointment}
        patients={patients}
        professionals={professionals}
        procedures={procedures}
        onClose={() => setDetailId(null)}
      />
    </div>
  );
}
