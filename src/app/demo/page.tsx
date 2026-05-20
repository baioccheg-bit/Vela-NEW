import { KPICard } from "./components/KPICard";
import { RevenueChart } from "./components/RevenueChart";
import { AppointmentsTable } from "./components/AppointmentsTable";
import { kpis } from "./lib/mock-data";

export default function DemoOverviewPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <KPICard key={k.label} kpi={k} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <AgentsPanel />
      </div>

      <AppointmentsTable />
    </div>
  );
}

function AgentsPanel() {
  const agents = [
    { name: "Júlia", role: "WhatsApp", actions: 84, status: "online", color: "champagne" },
    { name: "Atlas", role: "Financeiro", actions: 31, status: "online", color: "champagne" },
    { name: "Sofia", role: "Retenção", actions: 19, status: "online", color: "champagne" },
    { name: "Max", role: "Operações", actions: 8, status: "idle", color: "ivory" },
  ];

  return (
    <div className="p-6 rounded-2xl bg-ivory/[0.03] border border-ivory/5 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-xs uppercase tracking-widest text-ivory/40 font-dm-mono mb-1">Agentes IA</div>
          <div className="font-cormorant text-xl text-ivory">Atividade hoje</div>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[11px] text-champagne">
          <span className="w-1.5 h-1.5 rounded-full bg-champagne animate-pulse" />
          ao vivo
        </span>
      </div>

      <ul className="space-y-3">
        {agents.map((a) => (
          <li key={a.name} className="flex items-center gap-3 p-3 rounded-xl bg-obsidian/40 border border-ivory/5">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-champagne/30 to-deep-teal/40 flex items-center justify-center font-cormorant text-ivory text-base">
              {a.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm text-ivory">{a.name}</span>
                <span className="text-[10px] text-ivory/40 font-dm-mono uppercase tracking-widest">{a.role}</span>
              </div>
              <div className="text-[11px] text-ivory/50 mt-0.5">
                <span className="font-dm-mono text-champagne">{a.actions}</span> ações nas últimas 24h
              </div>
            </div>
            <span
              className={`w-2 h-2 rounded-full ${
                a.status === "online" ? "bg-champagne animate-pulse" : "bg-ivory/30"
              }`}
            />
          </li>
        ))}
      </ul>

      <div className="mt-6 pt-6 border-t border-ivory/5">
        <div className="text-[11px] text-ivory/50 leading-relaxed">
          Os agentes economizaram <span className="text-champagne font-dm-mono">14h 22min</span> de
          trabalho manual da equipe hoje.
        </div>
      </div>
    </div>
  );
}
