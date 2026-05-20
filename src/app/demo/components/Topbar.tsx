"use client";

import { usePathname } from "next/navigation";

const titles: Record<string, { title: string; subtitle: string }> = {
  "/demo": { title: "Visão geral", subtitle: "Resumo operacional da clínica em tempo real" },
  "/demo/agenda": { title: "Agenda", subtitle: "Semana atual — 20 de maio de 2026" },
  "/demo/pacientes": { title: "Pacientes", subtitle: "Base ativa e histórico de atendimentos" },
  "/demo/julia": { title: "Júlia", subtitle: "Agente de WhatsApp — conversas em andamento" },
};

export function Topbar() {
  const pathname = usePathname();
  const meta = titles[pathname] ?? titles["/demo"];

  return (
    <header className="sticky top-0 z-20 bg-obsidian/80 backdrop-blur-xl border-b border-ivory/5">
      <div className="flex items-center justify-between px-8 py-5">
        <div>
          <h1 className="font-cormorant text-2xl md:text-3xl text-ivory leading-none">{meta.title}</h1>
          <p className="text-xs text-ivory/40 mt-1.5">{meta.subtitle}</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-ivory/[0.03] border border-ivory/5 text-xs text-ivory/60 hover:text-ivory hover:border-champagne/30 transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Buscar paciente, procedimento…</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-ivory/5 font-dm-mono">⌘K</span>
          </button>

          <button
            type="button"
            aria-label="Notificações"
            className="relative w-10 h-10 rounded-lg bg-ivory/[0.03] border border-ivory/5 flex items-center justify-center text-ivory/60 hover:text-ivory transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-champagne" />
          </button>

          <div className="flex items-center gap-3 pl-3 border-l border-ivory/5">
            <div className="text-right hidden md:block">
              <div className="text-sm text-ivory leading-none">Dra. Helena</div>
              <div className="text-[10px] text-ivory/40 mt-1 font-dm-mono uppercase tracking-widest">Administradora</div>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-champagne to-amber-gold flex items-center justify-center text-obsidian text-sm font-medium">
              H
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
