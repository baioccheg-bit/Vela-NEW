import type { KPI } from "../lib/mock-data";

export function KPICard({ kpi }: { kpi: KPI }) {
  const positive = kpi.delta >= 0;
  return (
    <div className="group p-6 rounded-2xl bg-ivory/[0.03] border border-ivory/5 hover:border-champagne/30 transition-all duration-300">
      <div className="flex items-start justify-between mb-6">
        <span className="text-xs uppercase tracking-widest text-ivory/40 font-dm-mono">{kpi.label}</span>
        <span
          className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-full ${
            positive ? "bg-champagne/10 text-champagne" : "bg-deep-teal/30 text-ivory/70"
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className={`w-3 h-3 ${positive ? "" : "rotate-180"}`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17V7m0 0h10M7 7l10 10" />
          </svg>
          {Math.abs(kpi.delta).toFixed(1)}%
        </span>
      </div>
      <div className="font-cormorant text-4xl md:text-5xl text-ivory leading-none tracking-tight">
        {kpi.value}
      </div>
      <div className="mt-3 text-xs text-ivory/50">{kpi.hint}</div>
    </div>
  );
}
