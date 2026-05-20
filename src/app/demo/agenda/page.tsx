import { weekAgenda, weekDays, type AppointmentStatus } from "../lib/mock-data";

const statusStyles: Record<AppointmentStatus, string> = {
  confirmado: "bg-champagne/10 border-champagne/30 text-ivory",
  pendente: "bg-ivory/[0.03] border-ivory/10 text-ivory/70",
  atendido: "bg-deep-teal/30 border-deep-teal/40 text-ivory/80",
  cancelado: "bg-ivory/[0.02] border-ivory/5 text-ivory/30 line-through",
};

export default function AgendaPage() {
  const today = 2;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Semana anterior"
            className="w-9 h-9 rounded-lg bg-ivory/[0.03] border border-ivory/5 flex items-center justify-center text-ivory/60 hover:text-champagne hover:border-champagne/30 transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Próxima semana"
            className="w-9 h-9 rounded-lg bg-ivory/[0.03] border border-ivory/5 flex items-center justify-center text-ivory/60 hover:text-champagne hover:border-champagne/30 transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div className="ml-3 font-cormorant text-xl text-ivory">Maio 2026</div>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          {(["confirmado", "atendido", "pendente", "cancelado"] as AppointmentStatus[]).map((s) => (
            <div key={s} className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-sm border ${statusStyles[s].split(" ").slice(0, 2).join(" ")}`} />
              <span className="text-ivory/60 capitalize">{s}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-ivory/[0.03] border border-ivory/5 overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[900px]">
            <div className="grid grid-cols-[80px_repeat(7,1fr)] border-b border-ivory/5">
              <div className="px-3 py-4" />
              {weekDays.map((d, i) => (
                <div
                  key={d}
                  className={`px-3 py-4 text-center border-l border-ivory/5 ${
                    i === today ? "bg-champagne/[0.04]" : ""
                  }`}
                >
                  <div
                    className={`text-[10px] uppercase tracking-widest font-dm-mono ${
                      i === today ? "text-champagne" : "text-ivory/40"
                    }`}
                  >
                    {d.split(" ")[0]}
                  </div>
                  <div
                    className={`mt-1 font-cormorant text-2xl ${
                      i === today ? "text-champagne" : "text-ivory"
                    }`}
                  >
                    {d.split(" ")[1]}
                  </div>
                </div>
              ))}
            </div>

            {weekAgenda.map((slot) => (
              <div key={slot.time} className="grid grid-cols-[80px_repeat(7,1fr)] border-b border-ivory/5 last:border-b-0">
                <div className="px-3 py-3 text-[11px] font-dm-mono text-ivory/40 self-center">{slot.time}</div>
                {slot.days.map((cell, i) => (
                  <div
                    key={i}
                    className={`px-2 py-2 border-l border-ivory/5 min-h-[64px] ${
                      i === today ? "bg-champagne/[0.02]" : ""
                    }`}
                  >
                    {cell && (
                      <div
                        className={`p-2 rounded-lg border text-[11px] leading-tight transition-all hover:scale-[1.02] cursor-pointer ${statusStyles[cell.status]}`}
                      >
                        <div className="font-medium truncate">{cell.patient}</div>
                        <div className="text-[10px] opacity-70 truncate mt-0.5">{cell.procedure}</div>
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
          { label: "Próximo horário livre", value: "Qui 10:00", hint: "Dr. Bruno" },
          { label: "Lista de espera", value: "14 pacientes", hint: "Júlia notifica automaticamente" },
        ].map((item) => (
          <div key={item.label} className="p-5 rounded-2xl bg-ivory/[0.03] border border-ivory/5">
            <div className="text-[10px] uppercase tracking-widest text-ivory/40 font-dm-mono mb-2">
              {item.label}
            </div>
            <div className="font-cormorant text-2xl text-ivory">{item.value}</div>
            <div className="text-xs text-ivory/50 mt-1">{item.hint}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
