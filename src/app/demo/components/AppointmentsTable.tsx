import { todaysAppointments, formatBRL } from "../lib/mock-data";
import { StatusBadge } from "./StatusBadge";

export function AppointmentsTable() {
  return (
    <div className="rounded-2xl bg-ivory/[0.03] border border-ivory/5 overflow-hidden">
      <div className="flex items-center justify-between px-6 py-5 border-b border-ivory/5">
        <div>
          <div className="text-xs uppercase tracking-widest text-ivory/40 font-dm-mono mb-1">Hoje</div>
          <div className="font-cormorant text-xl text-ivory">Agendamentos do dia</div>
        </div>
        <span className="text-xs text-ivory/40 font-dm-mono">{todaysAppointments.length} atendimentos</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-[10px] uppercase tracking-widest text-ivory/30 font-dm-mono">
              <th className="text-left font-normal px-6 py-3">Horário</th>
              <th className="text-left font-normal px-6 py-3">Paciente</th>
              <th className="text-left font-normal px-6 py-3">Procedimento</th>
              <th className="text-left font-normal px-6 py-3 hidden lg:table-cell">Profissional</th>
              <th className="text-left font-normal px-6 py-3">Status</th>
              <th className="text-right font-normal px-6 py-3">Valor</th>
            </tr>
          </thead>
          <tbody>
            {todaysAppointments.map((ap, i) => (
              <tr
                key={ap.id}
                className={`border-t border-ivory/5 hover:bg-ivory/[0.02] transition-colors ${
                  i === 0 ? "bg-champagne/[0.03]" : ""
                }`}
              >
                <td className="px-6 py-4 font-dm-mono text-ivory/80">{ap.time}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-deep-teal/30 flex items-center justify-center text-[11px] text-ivory/70">
                      {ap.patient.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                    </div>
                    <span className="text-ivory">{ap.patient}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-ivory/70">{ap.procedure}</td>
                <td className="px-6 py-4 text-ivory/60 hidden lg:table-cell">{ap.professional}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={ap.status} />
                </td>
                <td className="px-6 py-4 text-right font-dm-mono text-ivory">
                  {ap.value > 0 ? formatBRL(ap.value) : <span className="text-ivory/30">—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
