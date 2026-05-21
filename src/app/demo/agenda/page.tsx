import { weekAgenda, weekDays, type AppointmentStatus } from "../lib/mock-data";

const statusStyles: Record<AppointmentStatus, string> = {
  confirmado: "bg-accent-tint border-accent text-ink-0",
  pendente: "bg-paper-1 border-paper-3 text-ink-1",
  atendido: "bg-paper-2 border-paper-3 text-ink-1",
  cancelado: "bg-paper-1 border-paper-3 text-ink-3 line-through",
};

const statusLabels: Record<AppointmentStatus, string> = {
  confirmado: "Confirmado",
  atendido: "Atendido",
  pendente: "Pendente",
  cancelado: "Cancelado",
};

export default function AgendaPage() {
  const today = 2;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Semana anterior"
            className="w-9 h-9 rounded-md bg-paper-0 border border-paper-3 flex items-center justify-center text-ink-1 hover:bg-paper-2 hover:text-ink-0 transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Próxima semana"
            className="w-9 h-9 rounded-md bg-paper-0 border border-paper-3 flex items-center justify-center text-ink-1 hover:bg-paper-2 hover:text-ink-0 transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div className="ml-3 font-display text-xl font-semibold tracking-[-0.02em] text-ink-0">
            Esta <span className="italic-accent">semana</span>.
          </div>
        </div>

        <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.1em] text-ink-2">
          {(["confirmado", "atendido", "pendente", "cancelado"] as AppointmentStatus[]).map((s) => (
            <div key={s} className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-sm border ${statusStyles[s].split(" ").slice(0, 2).join(" ")}`} />
              <span>{statusLabels[s]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-paper-0 border border-paper-3 overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[900px]">
            <div className="grid grid-cols-[72px_repeat(7,minmax(0,1fr))] border-b border-paper-3 bg-paper-1">
              <div className="px-3 py-3" />
              {weekDays.map((d, i) => (
                <div
                  key={d}
                  className={`relative px-3 py-3 text-center border-l border-paper-3 ${
                    i === today ? "bg-accent-tint" : ""
                  }`}
                >
                  {i === today && (
                    <span
                      aria-hidden
                      className="absolute top-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent"
                    />
                  )}
                  <div
                    className={`text-[10px] uppercase tracking-[0.12em] font-mono ${
                      i === today ? "text-accent" : "text-ink-3"
                    }`}
                  >
                    {d.split(" ")[0]}
                  </div>
                  <div
                    className={`mt-1 font-display text-xl font-semibold tracking-[-0.02em] ${
                      i === today ? "text-accent" : "text-ink-0"
                    }`}
                  >
                    {d.split(" ")[1]}
                  </div>
                </div>
              ))}
            </div>

            {weekAgenda.map((slot) => (
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
                    className={`px-2 py-2 border-l border-paper-3 min-h-[64px] ${
                      i === today ? "bg-[color-mix(in_oklch,var(--color-accent)_3%,transparent)]" : ""
                    }`}
                  >
                    {cell && (
                      <div
                        className={`p-2 rounded-md border text-[11px] leading-tight cursor-pointer hover:shadow-sm transition-shadow ${statusStyles[cell.status]}`}
                      >
                        <div className="font-medium truncate">{cell.patient}</div>
                        <div className="text-[10px] opacity-75 truncate mt-0.5">{cell.procedure}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Ocupação semanal", value: "87%", hint: "média de 7,4h/dia" },
          { label: "Próximo horário livre", value: "Qui · 10:00", hint: "Dr. Bruno" },
          { label: "Lista de espera", value: "14 pacientes", hint: "Júlia notifica automaticamente" },
        ].map((item) => (
          <div key={item.label} className="p-5 rounded-xl bg-paper-0 border border-paper-3">
            <div className="text-[10px] uppercase tracking-[0.12em] font-mono text-ink-2 mb-2">
              {item.label}
            </div>
            <div className="font-display text-2xl font-semibold tracking-[-0.025em] text-ink-0">
              {item.value}
            </div>
            <div className="text-xs text-ink-2 mt-1">{item.hint}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
