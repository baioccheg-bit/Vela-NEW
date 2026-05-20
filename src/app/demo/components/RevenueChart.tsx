import { revenueLast7Days, formatBRL } from "../lib/mock-data";

export function RevenueChart() {
  const max = Math.max(...revenueLast7Days.map((d) => d.value));
  const total = revenueLast7Days.reduce((sum, d) => sum + d.value, 0);
  const avg = total / revenueLast7Days.length;

  return (
    <div className="p-6 rounded-2xl bg-ivory/[0.03] border border-ivory/5">
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="text-xs uppercase tracking-widest text-ivory/40 font-dm-mono mb-2">
            Faturamento — últimos 7 dias
          </div>
          <div className="font-cormorant text-3xl md:text-4xl text-ivory leading-none">
            {formatBRL(total)}
          </div>
          <div className="mt-2 text-xs text-ivory/50">
            Média diária <span className="text-champagne font-dm-mono">{formatBRL(avg)}</span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-sm bg-champagne" />
            <span className="text-ivory/60">Receita</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-0.5 bg-ivory/20" />
            <span className="text-ivory/60">Média</span>
          </div>
        </div>
      </div>

      <div className="relative h-56 flex items-end gap-3">
        <div
          className="absolute left-0 right-0 border-t border-dashed border-ivory/15"
          style={{ bottom: `${(avg / max) * 100}%` }}
        />
        {revenueLast7Days.map((d) => {
          const heightPct = (d.value / max) * 100;
          return (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-3 group">
              <div className="text-[10px] font-dm-mono text-ivory/40 group-hover:text-champagne transition-colors">
                {formatBRL(d.value)}
              </div>
              <div className="w-full flex-1 flex items-end">
                <div
                  className="w-full bg-gradient-to-t from-champagne/80 to-champagne rounded-t-md transition-all duration-500 group-hover:from-amber-gold group-hover:to-amber-gold"
                  style={{ height: `${heightPct}%` }}
                />
              </div>
              <div className="text-[11px] text-ivory/50 font-dm-mono">{d.day}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
