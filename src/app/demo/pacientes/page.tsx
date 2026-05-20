"use client";

import { useMemo, useState } from "react";
import { patients, formatBRL, formatDate, type Patient } from "../lib/mock-data";

type TagFilter = "todos" | Patient["tag"];

const tagStyles: Record<Patient["tag"], string> = {
  vip: "bg-champagne/15 text-champagne border-champagne/30",
  ativo: "bg-deep-teal/30 text-ivory/80 border-deep-teal/40",
  novo: "bg-ivory/[0.06] text-ivory/80 border-ivory/15",
  inativo: "bg-ivory/[0.02] text-ivory/40 border-ivory/5",
};

const tagLabels: Record<Patient["tag"], string> = {
  vip: "VIP",
  ativo: "Ativo",
  novo: "Novo",
  inativo: "Inativo",
};

export default function PacientesPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<TagFilter>("todos");

  const filtered = useMemo(() => {
    return patients.filter((p) => {
      const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase());
      const matchesFilter = filter === "todos" || p.tag === filter;
      return matchesQuery && matchesFilter;
    });
  }, [query, filter]);

  const totalRevenue = patients.reduce((sum, p) => sum + p.totalSpent, 0);
  const vipCount = patients.filter((p) => p.tag === "vip").length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Base total", value: patients.length.toString() },
          { label: "Pacientes VIP", value: vipCount.toString() },
          { label: "LTV acumulado", value: formatBRL(totalRevenue) },
          { label: "Ticket médio", value: formatBRL(totalRevenue / patients.length) },
        ].map((s) => (
          <div key={s.label} className="p-5 rounded-2xl bg-ivory/[0.03] border border-ivory/5">
            <div className="text-[10px] uppercase tracking-widest text-ivory/40 font-dm-mono mb-2">
              {s.label}
            </div>
            <div className="font-cormorant text-2xl md:text-3xl text-ivory">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-ivory/[0.03] border border-ivory/5 overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-6 py-5 border-b border-ivory/5">
          <div className="relative flex-1 max-w-md">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ivory/40"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Buscar paciente…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-obsidian/60 border border-ivory/5 text-sm text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-champagne/40 transition-colors"
            />
          </div>

          <div className="flex items-center gap-1 p-1 rounded-lg bg-obsidian/40 border border-ivory/5">
            {(["todos", "vip", "ativo", "novo", "inativo"] as TagFilter[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setFilter(t)}
                className={`px-3 py-1.5 rounded-md text-xs capitalize transition-colors ${
                  filter === t
                    ? "bg-champagne text-obsidian font-medium"
                    : "text-ivory/60 hover:text-ivory"
                }`}
              >
                {t === "todos" ? "Todos" : tagLabels[t as Patient["tag"]]}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] uppercase tracking-widest text-ivory/30 font-dm-mono">
                <th className="text-left font-normal px-6 py-3">Paciente</th>
                <th className="text-left font-normal px-6 py-3 hidden md:table-cell">Contato</th>
                <th className="text-left font-normal px-6 py-3 hidden lg:table-cell">Última visita</th>
                <th className="text-right font-normal px-6 py-3">Procedimentos</th>
                <th className="text-right font-normal px-6 py-3">LTV</th>
                <th className="text-right font-normal px-6 py-3">Tag</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-t border-ivory/5 hover:bg-ivory/[0.02] transition-colors cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-deep-teal/30 flex items-center justify-center text-xs text-ivory/80">
                        {p.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                      </div>
                      <div>
                        <div className="text-ivory">{p.name}</div>
                        <div className="text-[11px] text-ivory/40 font-dm-mono">{p.age} anos · {p.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-ivory/60 font-dm-mono text-xs hidden md:table-cell">{p.phone}</td>
                  <td className="px-6 py-4 text-ivory/60 hidden lg:table-cell">{formatDate(p.lastVisit)}</td>
                  <td className="px-6 py-4 text-right text-ivory/80 font-dm-mono">{p.procedures}</td>
                  <td className="px-6 py-4 text-right text-ivory font-dm-mono">
                    {p.totalSpent > 0 ? formatBRL(p.totalSpent) : <span className="text-ivory/30">—</span>}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium border ${tagStyles[p.tag]}`}>
                      {tagLabels[p.tag]}
                    </span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-ivory/40">
                    Nenhum paciente encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
