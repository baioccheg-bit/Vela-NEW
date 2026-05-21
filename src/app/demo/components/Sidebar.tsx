"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
  badge?: string;
};

const navItems: NavItem[] = [
  {
    href: "/demo",
    label: "Visão geral",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    href: "/demo/agenda",
    label: "Agenda",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    href: "/demo/pacientes",
    label: "Pacientes",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    href: "/demo/julia",
    label: "Júlia (WhatsApp)",
    badge: "2",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:flex-col w-60 bg-paper-1 border-r border-paper-3 shrink-0">
      <div className="px-5 py-5 border-b border-paper-3">
        <Link href="/" className="block">
          <div className="font-display text-lg font-semibold tracking-[-0.02em] text-ink-0">Vela</div>
          <div className="text-[10px] uppercase tracking-[0.16em] font-mono text-ink-3 mt-1">
            Clínica Helena
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-5">
        <div className="text-[10px] uppercase tracking-[0.12em] font-mono text-ink-3 px-3 mb-2">
          Operação
        </div>
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`relative flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors ${
                    active
                      ? "bg-paper-2 text-ink-0 font-medium"
                      : "text-ink-1 hover:bg-paper-2 hover:text-ink-0"
                  }`}
                >
                  {active && (
                    <span
                      aria-hidden
                      className="absolute left-0 top-2 bottom-2 w-[2px] rounded-r bg-accent"
                    />
                  )}
                  <span className={active ? "text-accent" : "text-ink-2"}>{item.icon}</span>
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-accent text-paper-0 font-medium">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="px-3 pb-4 mt-auto">
        <div className="p-3 rounded-md border border-paper-3 bg-paper-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="text-[10px] uppercase tracking-[0.12em] font-mono text-ink-2">
              Agentes ativos
            </span>
          </div>
          <div className="text-xs text-ink-1 leading-relaxed">
            Júlia, Atlas e Sofia processaram <strong className="text-ink-0 font-medium">142 interações</strong> hoje.
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2.5 px-2 py-2">
          <span className="w-8 h-8 rounded-full bg-accent text-paper-0 flex items-center justify-center font-display font-semibold text-sm">
            H
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-sm text-ink-0 font-medium leading-tight">Dra. Helena</div>
            <div className="text-[10px] font-mono uppercase tracking-[0.1em] text-ink-3">
              admin · lumen
            </div>
          </div>
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-ink-3 shrink-0" aria-hidden>
            <path d="M3 5l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </aside>
  );
}
