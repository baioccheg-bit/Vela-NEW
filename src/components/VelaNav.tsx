"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/** Shared floating-pill nav for all Vela-designed pages.
 *  Pricing link points to landing /#pricing so it works from any page. */
export function VelaNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Plataforma", href: "/plataforma" },
    { label: "Agentes", href: "/agentes" },
    { label: "Preços", href: "/#pricing" },
    { label: "FAQ", href: "/faq" },
  ];

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center pointer-events-none">
        <nav
          className={`pointer-events-auto mt-3 mx-3 flex items-center gap-1 rounded-full border transition-all duration-300 ${
            scrolled
              ? "bg-[color:var(--color-paper-0)]/85 backdrop-blur-md backdrop-saturate-150 border-[color:var(--color-rule)] shadow-[0_8px_24px_-12px_rgba(0,0,0,0.18)]"
              : "bg-[color:var(--color-paper-0)]/65 backdrop-blur-sm border-transparent"
          } px-2 py-1.5`}
          aria-label="Principal"
        >
          <Link
            href="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-[color:var(--color-paper-3)] transition-colors"
          >
            <span className="font-display text-lg leading-none font-semibold tracking-[-0.015em] text-[color:var(--color-ink-0)]">
              Vela
            </span>
          </Link>

          <div className="hidden md:flex items-center">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-3 py-1.5 text-sm text-[color:var(--color-ink-2)] hover:text-[color:var(--color-ink-0)] hover:bg-[color:var(--color-paper-3)] rounded-full transition-colors whitespace-nowrap"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <span className="hidden md:block w-px h-5 bg-[color:var(--color-paper-3)] mx-1" aria-hidden />

          <Link
            href="/entrar"
            className="hidden md:inline-flex px-3 py-1.5 text-sm text-[color:var(--color-ink-2)] hover:text-[color:var(--color-ink-0)] hover:bg-[color:var(--color-paper-3)] rounded-full transition-colors whitespace-nowrap"
          >
            Entrar
          </Link>
          <Link
            href="/contratar"
            className="ml-0.5 inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-[color:var(--color-ink-0)] !text-white rounded-full hover:bg-[color:var(--color-accent)] transition-colors whitespace-nowrap"
          >
            <span className="!text-white">Começar</span>
            <span aria-hidden className="inline-block transition-transform !text-white">→</span>
          </Link>

          <button
            type="button"
            className="md:hidden ml-0.5 p-2 -mr-1 rounded-full text-[color:var(--color-ink-0)] hover:bg-[color:var(--color-paper-3)]"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              {menuOpen ? (
                <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </nav>
      </header>

      {menuOpen && (
        <div className="md:hidden fixed inset-0 top-[64px] z-40 bg-[color:var(--color-paper-0)]/95 backdrop-blur-md">
          <div className="flex flex-col gap-1 p-6 pt-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="py-3 px-3 text-lg text-[color:var(--color-ink-0)] border-b border-[color:var(--color-paper-3)]"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/entrar"
              onClick={() => setMenuOpen(false)}
              className="mt-4 py-3 px-3 text-base text-[color:var(--color-ink-2)]"
            >
              Entrar
            </Link>
            <Link
              href="/contratar"
              onClick={() => setMenuOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-1.5 py-3 bg-[color:var(--color-ink-0)] !text-white rounded-full"
            >
              Começar →
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
