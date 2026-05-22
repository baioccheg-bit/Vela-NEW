import { formatBRL } from "../lib/mock-data";
import type { AppointmentWithRels } from "../lib/queries";
import { StatusBadge } from "./StatusBadge";

const timeFmt = new Intl.DateTimeFormat("pt-BR", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

export function AppointmentsTable({ appointments }: { appointments: AppointmentWithRels[] }) {
  return (
    <div className="rounded-xl bg-paper-0 border border-paper-3 overflow-hidden">
      <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-paper-3">
        <div>
          <div className="text-[10px] uppercase tracking-[0.12em] font-mono text-ink-2 mb-1">
            Hoje
          </div>
          <div className="font-display text-xl font-semibold text-ink-0 tracking-[-0.02em]">
            Agendamentos <span className="italic-accent">do dia</span>
          </div>
        </div>
        <span className="text-[10px] uppercase tracking-[0.12em] font-mono text-ink-2">
          {appointments.length} atendimentos
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-[10px] uppercase tracking-[0.12em] font-mono text-ink-3">
              <th className="text-left font-normal px-6 py-3">Horário</th>
              <th className="text-left font-normal px-6 py-3">Paciente</th>
              <th className="text-left font-normal px-6 py-3">Procedimento</th>
              <th className="text-left font-normal px-6 py-3 hidden lg:table-cell">Profissional</th>
              <th className="text-left font-normal px-6 py-3">Status</th>
              <th className="text-right font-normal px-6 py-3">Valor</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-ink-3 text-sm">
                  Nenhum atendimento hoje.
                </td>
              </tr>
            )}
            {appointments.map((ap, i) => {
              const isNow = i === 0;
              const value = Number(ap.priceBRL ?? ap.procedure.priceBRL ?? 0);
              return (
                <tr
                  key={ap.id}
                  className={`border-t border-paper-3 hover:bg-paper-1 transition-colors ${
                    isNow ? "bg-accent-tint" : ""
                  }`}
                >
                  <td
                    className={`px-6 py-3.5 font-mono tabular-nums ${
                      isNow ? "text-accent font-semibold" : "text-ink-1"
                    }`}
                  >
                    {timeFmt.format(ap.startsAt)}
                  </td>
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-display font-semibold ${
                          isNow ? "bg-accent text-paper-0" : "bg-paper-2 text-ink-1"
                        }`}
                      >
                        {ap.patient.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                      </div>
                      <span className="text-ink-0 font-medium">{ap.patient.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3.5 text-ink-1">{ap.procedure.name}</td>
                  <td className="px-6 py-3.5 text-ink-2 hidden lg:table-cell">
                    {ap.professional?.name ?? <span className="text-ink-3">—</span>}
                  </td>
                  <td className="px-6 py-3.5">
                    <StatusBadge status={ap.status} />
                  </td>
                  <td className="px-6 py-3.5 text-right font-mono tabular-nums text-ink-0">
                    {value > 0 ? formatBRL(value) : <span className="text-ink-3">—</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
