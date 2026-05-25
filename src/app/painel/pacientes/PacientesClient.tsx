"use client";

// "use client" — motivo: estado de busca, filtro de tag, Drawer pra criar paciente,
// router.refresh após criar (revalidate vem da action mas o componente também
// precisa re-renderizar com dados novos).

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { PatientTag } from "@/generated/prisma/client";

import { Drawer } from "../components/Drawer";
import { formatBRL, formatDate } from "../lib/mock-data";
import { createPatient } from "./actions";
import { PatientForm } from "./PatientForm";
import { formatPhoneDisplay } from "./lib/format";

export type PatientRowSerialized = {
  id: string;
  name: string;
  phone: string; // E.164 (obrigatório a partir da Fase 2.3)
  birthDate: string | null; // ISO
  tag: PatientTag;
  lastVisitAt: string | null; // ISO
  proceduresCount: number;
  totalSpentBRL: number;
};

type TagFilter = "TODOS" | PatientTag;

const tagStyles: Record<PatientTag, string> = {
  VIP: "bg-accent text-paper-0",
  ATIVO: "bg-accent-tint text-accent",
  NOVO: "bg-paper-2 text-ink-1 border border-paper-3",
  INATIVO: "bg-paper-1 text-ink-3",
};

const tagLabels: Record<PatientTag, string> = {
  VIP: "VIP",
  ATIVO: "Ativo",
  NOVO: "Novo",
  INATIVO: "Inativo",
};

function ageFromBirthdate(iso: string | null): number | null {
  if (!iso) return null;
  const birth = new Date(iso);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

export function PacientesClient({ patients }: { patients: PatientRowSerialized[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<TagFilter>("TODOS");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filtered = useMemo(() => {
    return patients.filter((p) => {
      const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase());
      const matchesFilter = filter === "TODOS" || p.tag === filter;
      return matchesQuery && matchesFilter;
    });
  }, [patients, query, filter]);

  const totalRevenue = patients.reduce((sum, p) => sum + p.totalSpentBRL, 0);
  const vipCount = patients.filter((p) => p.tag === "VIP").length;

  const summary = [
    { label: "Base total", value: patients.length.toString() },
    { label: "Pacientes VIP", value: vipCount.toString() },
    { label: "LTV acumulado", value: formatBRL(totalRevenue) },
    {
      label: "Ticket médio",
      value: patients.length > 0 ? formatBRL(totalRevenue / patients.length) : formatBRL(0),
    },
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {summary.map((s) => (
          <div key={s.label} className="relative p-5 rounded-xl bg-paper-0 border border-paper-3 overflow-hidden">
            <span aria-hidden className="absolute top-0 left-5 right-5 h-[2px] bg-accent opacity-60" />
            <div className="text-[10px] uppercase tracking-[0.12em] font-mono text-ink-2 mb-2">
              {s.label}
            </div>
            <div className="font-display text-2xl md:text-3xl font-semibold tracking-[-0.025em] text-ink-0 tabular-nums">
              {s.value}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-end justify-between gap-4 pt-3">
        <div>
          <div className="text-[10px] uppercase tracking-[0.12em] font-mono text-ink-2">Base</div>
          <h2 className="font-display text-xl font-semibold text-ink-0 tracking-[-0.02em] mt-1">
            Pacientes <span className="italic-accent">ativos</span>.
          </h2>
        </div>
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ink-0 text-paper-0 text-sm font-medium hover:bg-accent transition-colors"
        >
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="w-3.5 h-3.5"
            aria-hidden
          >
            <path d="M8 3v10M3 8h10" strokeLinecap="round" />
          </svg>
          Novo paciente
        </button>
      </div>

      <div className="rounded-xl bg-paper-0 border border-paper-3 overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-6 py-4 border-b border-paper-3">
          <div className="relative flex-1 max-w-md">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-3 pointer-events-none"
              aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Buscar paciente…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-md bg-paper-1 border border-paper-3 text-sm text-ink-0 placeholder:text-ink-3 focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          <div className="inline-flex items-center gap-1 p-1 rounded-md bg-paper-1 border border-paper-3">
            {(["TODOS", "VIP", "ATIVO", "NOVO", "INATIVO"] as TagFilter[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setFilter(t)}
                className={`px-3 py-1 rounded text-xs transition-colors ${
                  filter === t
                    ? "bg-paper-0 text-ink-0 font-medium shadow-sm"
                    : "text-ink-2 hover:text-ink-0"
                }`}
              >
                {t === "TODOS" ? "Todos" : tagLabels[t as PatientTag]}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] uppercase tracking-[0.12em] font-mono text-ink-3">
                <th className="text-left font-normal px-6 py-3">Paciente</th>
                <th className="text-left font-normal px-6 py-3 hidden md:table-cell">Contato</th>
                <th className="text-left font-normal px-6 py-3 hidden lg:table-cell">Última visita</th>
                <th className="text-right font-normal px-6 py-3">Procedimentos</th>
                <th className="text-right font-normal px-6 py-3">LTV</th>
                <th className="text-right font-normal px-6 py-3">Tag</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const age = ageFromBirthdate(p.birthDate);
                return (
                  <tr
                    key={p.id}
                    className="border-t border-paper-3 hover:bg-paper-1 transition-colors"
                  >
                    <td className="px-6 py-3.5">
                      <Link
                        href={`/painel/pacientes/${p.id}`}
                        className="flex items-center gap-3"
                      >
                        <div className="w-9 h-9 rounded-full bg-paper-2 text-ink-1 flex items-center justify-center text-xs font-display font-semibold">
                          {p.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                        </div>
                        <div>
                          <div className="text-ink-0 font-medium">{p.name}</div>
                          <div className="text-[11px] text-ink-3 font-mono">
                            {age !== null ? `${age} anos · ` : ""}
                            {p.id.slice(0, 8)}
                          </div>
                        </div>
                      </Link>
                    </td>
                    <td className="px-6 py-3.5 text-ink-2 font-mono text-xs hidden md:table-cell">
                      {formatPhoneDisplay(p.phone)}
                    </td>
                    <td className="px-6 py-3.5 text-ink-2 hidden lg:table-cell">
                      {p.lastVisitAt ? formatDate(p.lastVisitAt.slice(0, 10)) : <span className="text-ink-3">—</span>}
                    </td>
                    <td className="px-6 py-3.5 text-right text-ink-1 font-mono tabular-nums">
                      {p.proceduresCount}
                    </td>
                    <td className="px-6 py-3.5 text-right text-ink-0 font-mono tabular-nums">
                      {p.totalSpentBRL > 0 ? formatBRL(p.totalSpentBRL) : <span className="text-ink-3">—</span>}
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.08em] font-medium ${tagStyles[p.tag]}`}
                      >
                        {p.tag === "VIP" && <span aria-hidden className="text-[11px] leading-none">★</span>}
                        {tagLabels[p.tag]}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-ink-3">
                    Nenhum paciente encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Novo paciente"
      >
        <PatientForm
          action={createPatient}
          submitLabel="Cadastrar"
          onSuccess={() => {
            setDrawerOpen(false);
            router.refresh();
          }}
          onCancel={() => setDrawerOpen(false)}
        />
      </Drawer>
    </div>
  );
}
