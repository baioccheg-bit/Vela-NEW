import { revenueLast7Days, formatBRL } from "../lib/mock-data";

export function RevenueChart() {
  const max = Math.max(...revenueLast7Days.map((d) => d.value));
  const total = revenueLast7Days.reduce((sum, d) => sum + d.value, 0);
  const avg = total / revenueLast7Days.length;
  const peakIndex = revenueLast7Days.findIndex((d) => d.value === max);

  return (
    <div className="p-6 rounded-xl bg-paper-0 border border-paper-3 h-full flex flex-col">
      <div className="flex items-start justify-between mb-6 gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.12em] font-mono text-ink-2 mb-2">
            Faturamento · últimos 7 dias
          </div>
          <div className="font-display text-3xl md:text-4xl font-semibold text-ink-0 leading-none tracking-[-0.03em] tabular-nums">
            {formatBRL(total)}
          </div>
          <div className="mt-2 text-sm text-ink-1">
            Média diária{" "}
            <span className="italic-accent">{formatBRL(avg)}</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5 text-[11px] font-mono uppercase tracking-[0.1em] text-ink-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-sm bg-accent" />
            <span>Receita</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-0.5 bg-ink-3 border-t border-dashed border-ink-3" />
            <span>Média</span>
          </div>
        </div>
      </div>

      <div className="relative flex-1 min-h-[200px] flex items-end gap-3">
        <div
          aria-hidden
          className="absolute left-0 right-0 border-t border-dashed border-ink-3 opacity-50"
          style={{ bottom: `${(avg / max) * 100}%` }}
        />
        {revenueLast7Days.map((d, i) => {
          const heightPct = (d.value / max) * 100;
          const isPeak = i === peakIndex;
          return (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-2 group min-w-0">
              <div
                className={`text-[10px] font-mono tabular-nums whitespace-nowrap transition-colors ${
                  isPeak ? "text-accent font-medium" : "text-ink-3 group-hover:text-ink-1"
                }`}
              >
                {formatBRL(d.value)}
              </div>
              <div className="w-full flex-1 flex items-end">
                <div
                  className={`w-full rounded-t transition-colors ${
                    isPeak ? "bg-accent" : "bg-paper-3 group-hover:bg-accent-soft"
                  }`}
                  style={{ height: `${heightPct}%` }}
                />
              </div>
              <div className="text-[11px] font-mono uppercase tracking-[0.08em] text-ink-2">
                {d.day}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
