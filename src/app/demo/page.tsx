import { KPICard } from "./components/KPICard";
import { RevenueChart } from "./components/RevenueChart";
import { AppointmentsTable } from "./components/AppointmentsTable";
import { kpis } from "./lib/mock-data";

export default function DemoOverviewPage() {
  return (
    <div className="space-y-5">
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
    { name: "Júlia", role: "WhatsApp", actions: 84, status: "online" as const },
    { name: "Atlas", role: "Financeiro", actions: 31, status: "online" as const },
    { name: "Sofia", role: "Retenção", actions: 19, status: "online" as const },
    { name: "Max", role: "Operações", actions: 8, status: "idle" as const },
  ];

  return (
    <div className="p-6 rounded-xl bg-paper-0 border border-paper-3 h-full flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="text-[10px] uppercase tracking-[0.12em] font-mono text-ink-2 mb-1">
            Agentes IA
          </div>
          <div className="font-display text-xl font-semibold text-ink-0 tracking-[-0.02em]">
            Atividade <span className="italic-accent">hoje</span>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.1em] text-accent">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          ao vivo
        </span>
      </div>

      <ul className="space-y-2 flex-1">
        {agents.map((a) => (
          <li
            key={a.name}
            className="flex items-center gap-3 p-3 rounded-lg border border-paper-3 bg-paper-1"
          >
            <span className="w-9 h-9 rounded-lg bg-paper-2 text-ink-1 flex items-center justify-center font-display font-semibold text-sm shrink-0">
              {a.name[0]}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm text-ink-0 font-medium">{a.name}</span>
                <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-ink-3">
                  {a.role}
                </span>
              </div>
              <div className="text-[11px] text-ink-2 mt-0.5">
                <span className="font-mono tabular-nums text-ink-1">{a.actions}</span> ações nas últimas 24h
              </div>
            </div>
            <span
              className={`w-2 h-2 rounded-full ${
                a.status === "online" ? "bg-accent animate-pulse" : "bg-paper-3"
              }`}
              aria-hidden
            />
          </li>
        ))}
      </ul>

      <div className="mt-5 pt-5 border-t border-paper-3">
        <div className="text-[11px] text-ink-2 leading-relaxed">
          Os agentes economizaram{" "}
          <span className="text-accent font-mono font-medium">14h 22min</span> de trabalho manual da equipe hoje.
        </div>
      </div>
    </div>
  );
}
