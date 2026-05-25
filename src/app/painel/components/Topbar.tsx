"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";

const titles: Record<string, { title: string; subtitle: string }> = {
  "/painel": { title: "Visão geral", subtitle: "Resumo operacional da clínica em tempo real" },
  "/painel/agenda": { title: "Agenda", subtitle: "Semana atual" },
  "/painel/pacientes": { title: "Pacientes", subtitle: "Base ativa e histórico de atendimentos" },
  "/painel/julia": { title: "Júlia", subtitle: "Agente de WhatsApp · conversas em andamento" },
  "/painel/configuracoes/profissionais": { title: "Profissionais", subtitle: "Equipe que atende na clínica" },
  "/painel/configuracoes/procedimentos": { title: "Procedimentos", subtitle: "Tabela de preços e duração" },
  "/painel/configuracoes/horarios": { title: "Horário de funcionamento", subtitle: "Define quando a Júlia pode agendar" },
};

const PROFESSIONALS_BASE = "/painel/configuracoes/profissionais";
const PROCEDURES_BASE = "/painel/configuracoes/procedimentos";
const PATIENTS_BASE = "/painel/pacientes";

export function Topbar() {
  const pathname = usePathname();

  const meta = useMemo(() => {
    if (titles[pathname]) return titles[pathname];
    if (
      pathname.startsWith(`${PROFESSIONALS_BASE}/`) &&
      pathname !== PROFESSIONALS_BASE
    ) {
      return {
        title: "Editar profissional",
        subtitle: "Equipe que atende na clínica",
      };
    }
    if (
      pathname.startsWith(`${PROCEDURES_BASE}/`) &&
      pathname !== PROCEDURES_BASE
    ) {
      return {
        title: "Editar procedimento",
        subtitle: "Tabela de preços e duração",
      };
    }
    if (
      pathname.startsWith(`${PATIENTS_BASE}/`) &&
      pathname !== PATIENTS_BASE
    ) {
      return {
        title: "Paciente",
        subtitle: "Ficha e histórico",
      };
    }
    return titles["/painel"];
  }, [pathname]);

  return (
    <header className="sticky top-0 z-20 bg-paper-0 border-b border-paper-3">
      <div className="flex items-center justify-between gap-4 px-6 md:px-8 py-4">
        <div className="min-w-0">
          <h1 className="font-display text-2xl md:text-3xl font-semibold tracking-[-0.025em] text-ink-0 leading-none">
            {meta.title}
          </h1>
          <p className="text-[11px] font-mono uppercase tracking-[0.12em] text-ink-3 mt-2.5">
            {meta.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-md bg-paper-1 border border-paper-3 text-xs text-ink-3 hover:text-ink-0 hover:bg-paper-2 transition-colors max-w-[280px]"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5 shrink-0" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="truncate">Buscar paciente, procedimento…</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-paper-0 border border-paper-3 text-ink-2 shrink-0">
              ⌘K
            </span>
          </button>

          <button
            type="button"
            aria-label="Notificações"
            className="relative w-9 h-9 rounded-md bg-paper-1 border border-paper-3 flex items-center justify-center text-ink-1 hover:text-ink-0 hover:bg-paper-2 transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-accent" aria-hidden />
          </button>

          <div className="flex items-center gap-2.5 pl-2 ml-1 border-l border-paper-3">
            <div className="text-right hidden md:block">
              <div className="text-sm text-ink-0 leading-none font-medium">Dra. Helena</div>
              <div className="text-[10px] font-mono uppercase tracking-[0.12em] text-ink-3 mt-1.5">
                administradora
              </div>
            </div>
            <span className="w-9 h-9 rounded-full bg-accent text-paper-0 flex items-center justify-center font-display font-semibold text-sm">
              H
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
