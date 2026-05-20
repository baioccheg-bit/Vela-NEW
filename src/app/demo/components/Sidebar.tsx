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
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    href: "/demo/agenda",
    label: "Agenda",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    href: "/demo/pacientes",
    label: "Pacientes",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    href: "/demo/julia",
    label: "Júlia (WhatsApp)",
    badge: "2",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:flex-col w-64 bg-obsidian border-r border-ivory/5 shrink-0">
      <div className="px-6 py-6 border-b border-ivory/5">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-champagne to-amber-gold flex items-center justify-center">
            <span className="font-cormorant text-obsidian text-lg font-semibold">V</span>
          </div>
          <div>
            <div className="font-cormorant text-ivory text-lg leading-none">VELA</div>
            <div className="text-[10px] text-ivory/40 font-dm-mono tracking-widest">CLÍNICA HELENA</div>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-6">
        <div className="text-[10px] uppercase tracking-widest text-ivory/30 px-3 mb-3 font-dm-mono">Plataforma</div>
        <ul className="space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                    active
                      ? "bg-champagne/10 text-champagne"
                      : "text-ivory/60 hover:text-ivory hover:bg-ivory/5"
                  }`}
                >
                  <span className={active ? "text-champagne" : ""}>{item.icon}</span>
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-champagne text-obsidian font-medium">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="px-3 py-4 border-t border-ivory/5">
        <div className="px-3 py-3 rounded-lg bg-ivory/[0.03]">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-champagne animate-pulse" />
            <span className="text-[10px] uppercase tracking-widest text-ivory/40 font-dm-mono">Agentes ativos</span>
          </div>
          <div className="text-xs text-ivory/70 leading-relaxed">
            Júlia, Atlas e Sofia processaram <span className="text-champagne">142 interações</span> hoje.
          </div>
        </div>
      </div>
    </aside>
  );
}
