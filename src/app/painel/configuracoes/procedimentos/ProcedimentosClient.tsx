"use client";

// "use client" — motivo: estado do Drawer (criar), filtro ativos/inativos,
// router.refresh() pra revalidar após criar.

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { Drawer } from "../../components/Drawer";
import { formatBRL, formatDuration } from "../../lib/mock-data";
import { createProcedure } from "./actions";
import { ProcedureForm } from "./ProcedureForm";

export type SerializedProcedure = {
  id: string;
  name: string;
  durationMin: number;
  priceBRL: number;
  active: boolean;
};

type Tab = "ativos" | "inativos";

export function ProcedimentosClient({
  procedures,
}: {
  procedures: SerializedProcedure[];
}) {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("ativos");

  const counts = useMemo(() => {
    const ativos = procedures.filter((p) => p.active).length;
    return { ativos, inativos: procedures.length - ativos };
  }, [procedures]);

  const filtered = useMemo(() => {
    return procedures.filter((p) => (tab === "ativos" ? p.active : !p.active));
  }, [procedures, tab]);

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between gap-4">
        <div className="inline-flex items-center gap-1 p-1 rounded-md bg-paper-1 border border-paper-3">
          {(["ativos", "inativos"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`px-3 py-1 rounded text-xs transition-colors ${
                tab === t
                  ? "bg-paper-0 text-ink-0 font-medium shadow-sm"
                  : "text-ink-2 hover:text-ink-0"
              }`}
            >
              {t === "ativos" ? "Ativos" : "Inativos"} (
              {t === "ativos" ? counts.ativos : counts.inativos})
            </button>
          ))}
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
          Novo procedimento
        </button>
      </div>

      <div className="rounded-xl bg-paper-0 border border-paper-3 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] uppercase tracking-[0.12em] font-mono text-ink-3">
                <th className="text-left font-normal px-6 py-3">Procedimento</th>
                <th className="text-left font-normal px-6 py-3 hidden md:table-cell">
                  Duração
                </th>
                <th className="text-right font-normal px-6 py-3">Preço base</th>
                <th className="text-right font-normal px-6 py-3 hidden sm:table-cell">
                  Status
                </th>
                <th className="px-6 py-3 w-12" aria-label="Ações" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr
                  key={p.id}
                  className="border-t border-paper-3 hover:bg-paper-1 transition-colors"
                >
                  <td className="px-6 py-3.5">
                    <Link
                      href={`/painel/configuracoes/procedimentos/${p.id}`}
                      className="block"
                    >
                      <span className="block text-ink-0 font-medium">
                        {p.name}
                      </span>
                      <span className="block text-[11px] text-ink-3 font-mono md:hidden mt-0.5">
                        {formatDuration(p.durationMin)}
                      </span>
                    </Link>
                  </td>
                  <td className="px-6 py-3.5 text-ink-1 hidden md:table-cell font-mono text-[13px]">
                    {formatDuration(p.durationMin)}
                  </td>
                  <td className="px-6 py-3.5 text-right text-ink-0 font-medium tabular-nums">
                    {formatBRL(p.priceBRL)}
                  </td>
                  <td className="px-6 py-3.5 text-right hidden sm:table-cell">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.08em] font-medium ${
                        p.active
                          ? "bg-accent-tint text-accent"
                          : "bg-paper-2 text-ink-3"
                      }`}
                    >
                      {p.active ? "Ativo" : "Inativo"}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 text-right">
                    <Link
                      href={`/painel/configuracoes/procedimentos/${p.id}`}
                      className="text-[11px] font-mono uppercase tracking-[0.12em] text-accent hover:text-accent-deep transition-colors"
                    >
                      Editar
                    </Link>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center">
                    {tab === "ativos" ? (
                      <div className="space-y-3">
                        <p className="text-ink-2 text-sm">
                          Nenhum procedimento cadastrado ainda.
                        </p>
                        <button
                          type="button"
                          onClick={() => setDrawerOpen(true)}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ink-0 text-paper-0 text-sm font-medium hover:bg-accent transition-colors"
                        >
                          Cadastrar primeiro
                        </button>
                      </div>
                    ) : (
                      <p className="text-ink-3 text-sm">
                        Nenhum procedimento inativo.
                      </p>
                    )}
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
        title="Novo procedimento"
      >
        <ProcedureForm
          action={createProcedure}
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
