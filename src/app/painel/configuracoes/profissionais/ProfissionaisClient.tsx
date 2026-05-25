"use client";

// "use client" — motivo: estado do Drawer (criar), filtro ativos/inativos,
// router.refresh() pra revalidar após criar/desativar.

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { Drawer } from "../../components/Drawer";
import { PROFESSIONAL_PALETTE } from "./lib/schema";
import { createProfessional } from "./actions";
import { ProfessionalForm } from "./ProfessionalForm";

export type SerializedProfessional = {
  id: string;
  name: string;
  role: string;
  color: string;
  active: boolean;
};

type Tab = "ativos" | "inativos";

const colorLabels = new Map<string, string>(
  PROFESSIONAL_PALETTE.map((p) => [p.hex, p.label] as const),
);

function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .slice(0, 2)
    .join("");
}

export function ProfissionaisClient({
  professionals,
}: {
  professionals: SerializedProfessional[];
}) {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("ativos");

  const counts = useMemo(() => {
    const ativos = professionals.filter((p) => p.active).length;
    return { ativos, inativos: professionals.length - ativos };
  }, [professionals]);

  const filtered = useMemo(() => {
    return professionals.filter((p) =>
      tab === "ativos" ? p.active : !p.active,
    );
  }, [professionals, tab]);

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
            <path
              d="M8 3v10M3 8h10"
              strokeLinecap="round"
            />
          </svg>
          Novo profissional
        </button>
      </div>

      <div className="rounded-xl bg-paper-0 border border-paper-3 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] uppercase tracking-[0.12em] font-mono text-ink-3">
                <th className="text-left font-normal px-6 py-3">Profissional</th>
                <th className="text-left font-normal px-6 py-3 hidden md:table-cell">
                  Função
                </th>
                <th className="text-left font-normal px-6 py-3 hidden lg:table-cell">
                  Cor
                </th>
                <th className="text-right font-normal px-6 py-3">Status</th>
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
                      href={`/painel/configuracoes/profissionais/${p.id}`}
                      className="flex items-center gap-3"
                    >
                      <span
                        className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-display font-semibold text-paper-0"
                        style={{ backgroundColor: `#${p.color}` }}
                        aria-hidden
                      >
                        {initials(p.name)}
                      </span>
                      <span>
                        <span className="block text-ink-0 font-medium">
                          {p.name}
                        </span>
                        <span className="block text-[11px] text-ink-3 font-mono md:hidden">
                          {p.role}
                        </span>
                      </span>
                    </Link>
                  </td>
                  <td className="px-6 py-3.5 text-ink-1 hidden md:table-cell">
                    {p.role}
                  </td>
                  <td className="px-6 py-3.5 hidden lg:table-cell">
                    <span className="inline-flex items-center gap-2">
                      <span
                        className="w-4 h-4 rounded-sm border border-paper-3"
                        style={{ backgroundColor: `#${p.color}` }}
                        aria-hidden
                      />
                      <span className="text-ink-2 text-xs font-mono">
                        {colorLabels.get(p.color) ?? `#${p.color}`}
                      </span>
                    </span>
                  </td>
                  <td className="px-6 py-3.5 text-right">
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
                      href={`/painel/configuracoes/profissionais/${p.id}`}
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
                          Nenhum profissional cadastrado ainda.
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
                        Nenhum profissional inativo.
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
        title="Novo profissional"
      >
        <ProfessionalForm
          action={createProfessional}
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
