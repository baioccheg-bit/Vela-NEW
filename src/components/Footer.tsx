"use client";

import { motion } from "framer-motion";

function FlameIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2c0 0-2 2-2 5 0 1.5 1 2.5 1 4 0 0-2-1-3-3 0 0-1 2 0 5 1 3 4 4 4 7 0 0 3-2 3-6 0-1.5-.5-2.5-.5-3.5 0 0 1.5 2 1.5 4.5 0 0 2-2 2-5 0-4-3-8-6-8z" />
    </svg>
  );
}

function ArrowIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 17L17 7M17 7H7M17 7V17" />
    </svg>
  );
}

const footerLinks = {
  Plataforma: [
    { label: "Visão geral", href: "/plataforma" },
    { label: "Financeiro", href: "/plataforma/financeiro" },
    { label: "Agenda", href: "/plataforma/agenda" },
    { label: "Prontuários", href: "/plataforma/prontuarios" },
    { label: "Documentos", href: "/plataforma/documentos" },
  ],
  Agentes: [
    { label: "Visão geral", href: "/agentes" },
    { label: "Júlia", href: "/agentes/julia" },
    { label: "Sofia", href: "/agentes/sofia" },
    { label: "Max", href: "/agentes/max" },
    { label: "Atlas", href: "/agentes/atlas" },
  ],
  Empresa: [
    { label: "Sobre", href: "/sobre" },
    { label: "Carreiras", href: "/sobre#carreiras" },
    { label: "Imprensa", href: "/sobre#imprensa" },
    { label: "Contato", href: "/sobre#contato" },
  ],
  Planos: [
    { label: "Planos e preços", href: "/planos" },
    { label: "Para clínicas", href: "/planos#clinicas" },
    { label: "Para consultórios", href: "/planos#consultorios" },
  ],
};

const socialLinks = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="bg-obsidian pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main footer grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-x-8 gap-y-10 mb-16">
          {/* Brand column */}
          <div className="col-span-2">
            <motion.a
              href="/"
              className="flex items-center gap-2.5 mb-6"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-9 h-9 rounded-xl bg-champagne flex items-center justify-center text-obsidian shadow-md">
                <FlameIcon className="w-5 h-5" />
              </div>
              <span className="font-cormorant text-2xl font-bold tracking-tight text-ivory">
                VELA
              </span>
            </motion.a>
            <p className="text-ivory/50 text-sm leading-relaxed mb-6 max-w-xs">
              Inteligência que ilumina negócios. A plataforma definitiva para
              clínicas que buscam excelência operacional e crescimento
              sustentável.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { label: "LGPD Compliant", icon: "🔒" },
                { label: "Site Seguro", icon: "🛡️" },
                { label: "Google for Startups", icon: "🚀" },
              ].map((badge) => (
                <span
                  key={badge.label}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-ivory/5 border border-ivory/10 text-[10px] text-ivory/60 uppercase tracking-wider"
                >
                  <span>{badge.icon}</span>
                  {badge.label}
                </span>
              ))}
            </div>

            {/* Social links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-ivory/5 border border-ivory/10 flex items-center justify-center text-ivory/60 hover:text-champagne hover:border-champagne/30 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-ivory font-medium mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-ivory/50 text-sm hover:text-champagne transition-colors duration-300 inline-flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowIcon className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-ivory/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap gap-6 text-sm text-ivory/40">
            <a
              href="/privacidade"
              className="hover:text-ivory/60 transition-colors"
            >
              Política de Privacidade
            </a>
            <a
              href="/termos"
              className="hover:text-ivory/60 transition-colors"
            >
              Termos & Condições
            </a>
          </div>
          <p className="text-ivory/40 text-sm">
            2026 © VELA. Todos os direitos reservados.
          </p>
        </div>

        {/* Giant watermark */}
        <div className="mt-16 text-center overflow-hidden">
          <div className="watermark-text font-cormorant font-bold select-none">
            VELA
          </div>
        </div>
      </div>
    </footer>
  );
}
