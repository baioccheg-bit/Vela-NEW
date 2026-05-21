import type { KPI } from "../lib/mock-data";

export function KPICard({ kpi }: { kpi: KPI }) {
  const positive = kpi.delta >= 0;
  return (
    <div className="relative p-6 rounded-xl bg-paper-0 border border-paper-3 overflow-hidden">
      <span
        aria-hidden
        className="absolute top-0 left-6 right-6 h-[2px] bg-accent opacity-60"
      />
      <div className="flex items-start justify-between mb-5">
        <span className="text-[10px] uppercase tracking-[0.12em] font-mono text-ink-2">
          {kpi.label}
        </span>
        <span
          className={`inline-flex items-center gap-1 text-[11px] font-mono font-medium px-2 py-0.5 rounded ${
            positive
              ? "text-accent bg-accent-tint"
              : "text-ink-2 bg-paper-2"
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`w-3 h-3 ${positive ? "" : "rotate-180"}`}
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17V7m0 0h10M7 7l10 10" />
          </svg>
          {Math.abs(kpi.delta).toFixed(1)}%
        </span>
      </div>
      <div className="font-display text-4xl md:text-[42px] text-ink-0 leading-none tracking-[-0.03em] font-semibold tabular-nums">
        {kpi.value}
      </div>
      <div className="mt-3 text-xs text-ink-2">{kpi.hint}</div>
    </div>
  );
}
