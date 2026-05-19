"use client";

import { motion, useScroll, useTransform, useInView, useSpring, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

// VELA Flame Icon
function FlameIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2c0 0-2 2-2 5 0 1.5 1 2.5 1 4 0 0-2-1-3-3 0 0-1 2 0 5 1 3 4 4 4 7 0 0 3-2 3-6 0-1.5-.5-2.5-.5-3.5 0 0 1.5 2 1.5 4.5 0 0 2-2 2-5 0-4-3-8-6-8z" />
    </svg>
  );
}

// Arrow Icon
function ArrowIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 17L17 7M17 7H7M17 7V17" />
    </svg>
  );
}

// Lightning Icon
function LightningIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

// Navbar Component
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Plataforma", href: "/plataforma" },
    { label: "Agentes", href: "/agentes" },
    { label: "Planos", href: "/planos" },
    { label: "Sobre", href: "/sobre" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          scrolled
            ? "w-[95%] max-w-6xl py-2.5"
            : "w-[95%] max-w-6xl py-3"
        }`}
      >
        <div className={`rounded-2xl transition-all duration-500 ${
          scrolled
            ? "glass shadow-xl shadow-obsidian/10"
            : "bg-ivory/90 shadow-lg shadow-obsidian/5"
        }`}>
          <div className="px-6 flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="/"
              className="flex items-center gap-2.5 group"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-9 h-9 rounded-xl bg-champagne flex items-center justify-center text-obsidian shadow-sm group-hover:shadow-md transition-shadow">
                <FlameIcon className="w-5 h-5" />
              </div>
              <span className="font-cormorant text-xl font-bold tracking-tight text-obsidian">
                VELA
              </span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2 text-sm text-obsidian/70 hover:text-obsidian rounded-full hover:bg-obsidian/5 transition-all duration-300"
                  whileHover={{ y: -1 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <motion.a
                href="/entrar"
                className="px-4 py-2 text-sm text-obsidian/70 hover:text-obsidian rounded-full hover:bg-obsidian/5 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                Entrar
              </motion.a>
              <motion.a
                href="/solicitar-acesso"
                className="px-5 py-2.5 bg-champagne text-obsidian text-sm font-medium rounded-full hover:bg-amber-gold transition-all duration-300 shadow-sm hover:shadow-md"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Solicitar acesso
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 -mr-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              <div className="w-5 h-5 flex flex-col justify-center gap-1">
                <span
                  className={`h-0.5 w-full bg-obsidian transition-all duration-300 ${
                    mobileOpen ? "rotate-45 translate-y-[3px]" : ""
                  }`}
                />
                <span
                  className={`h-0.5 w-full bg-obsidian transition-all duration-300 ${
                    mobileOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`h-0.5 w-full bg-obsidian transition-all duration-300 ${
                    mobileOpen ? "-rotate-45 -translate-y-[3px]" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-ivory pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="text-xl font-cormorant text-obsidian py-3 px-4 rounded-xl hover:bg-obsidian/5 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="h-px bg-obsidian/10 my-4" />
              <a
                href="/entrar"
                className="text-base text-obsidian/70 py-3 px-4"
                onClick={() => setMobileOpen(false)}
              >
                Entrar
              </a>
              <a
                href="/solicitar-acesso"
                className="mx-4 mt-2 px-6 py-3.5 bg-champagne text-obsidian text-base font-medium rounded-full text-center"
                onClick={() => setMobileOpen(false)}
              >
                Solicitar acesso
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Hero Component
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-ivory via-ivory to-white" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-champagne/10 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-champagne/10 border border-champagne/20 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-champagne animate-pulse" />
          <span className="text-sm text-obsidian/80 font-medium">Teste 30 dias grátis</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-cormorant text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold leading-[1.1] tracking-tight text-obsidian"
        >
          Sua clínica no piloto<br />inteligente.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl text-obsidian/60 max-w-2xl mx-auto leading-relaxed"
        >
          Impulsione o sucesso da sua clínica com IA que elimina tarefas manuais e acelera o faturamento.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <motion.a
            href="/plataforma"
            className="group px-7 py-3.5 bg-champagne text-obsidian text-base font-medium rounded-full hover:bg-amber-gold transition-all duration-300 shadow-lg shadow-champagne/25 flex items-center gap-2"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Começar agora
            <ArrowIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.a>
          <motion.a
            href="/agentes"
            className="group px-7 py-3.5 border border-obsidian/20 text-obsidian text-base font-medium rounded-full hover:border-champagne hover:bg-champagne/5 transition-all duration-300 flex items-center gap-2"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Conhecer agentes
            <ArrowIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>

        {/* Product Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 relative"
        >
          <div className="relative max-w-5xl mx-auto">
            {/* Phone mockup - left */}
            <motion.div
              initial={{ opacity: 0, x: -60, y: 40 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="absolute -left-4 md:-left-12 top-8 md:top-16 z-20 w-48 md:w-64"
            >
              <div className="bg-obsidian rounded-3xl p-3 shadow-2xl">
                <div className="bg-ivory rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-3 pb-3 border-b border-obsidian/10">
                    <div className="w-8 h-8 rounded-full bg-champagne flex items-center justify-center">
                      <span className="text-xs font-bold text-obsidian">J</span>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-obsidian">Júlia</div>
                      <div className="text-[10px] text-obsidian/50">Agente VELA</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-champagne/20 rounded-lg p-2 text-[10px] text-obsidian/80">
                      Olá! Confirmamos sua consulta para amanhã às 14h ✨
                    </div>
                    <div className="bg-obsidian/5 rounded-lg p-2 text-[10px] text-obsidian/60 text-right">
                      Perfeito, obrigado!
                    </div>
                    <div className="bg-champagne/20 rounded-lg p-2 text-[10px] text-obsidian/80">
                      Link de pagamento: R$ 350,00
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Dashboard mockup - main */}
            <div className="bg-obsidian rounded-2xl shadow-2xl shadow-obsidian/20 overflow-hidden gold-glow">
              {/* Browser header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-obsidian/80 border-b border-ivory/10">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-obsidian/50" />
                  <div className="w-3 h-3 rounded-full bg-obsidian/50" />
                  <div className="w-3 h-3 rounded-full bg-obsidian/50" />
                </div>
                <div className="flex-1 text-center">
                  <div className="inline-block px-3 py-1 bg-ivory/5 rounded-md text-[10px] text-ivory/40 font-dm-mono">
                    app.vela.com.br/financeiro
                  </div>
                </div>
              </div>

              {/* Dashboard content */}
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-cormorant text-ivory">Faturamento</h3>
                  <span className="text-xs text-ivory/50 font-dm-mono">Últimos 7 dias</span>
                </div>

                {/* Billing table */}
                <div className="space-y-3">
                  {[
                    { patient: "Ana Silva", value: "R$ 450,00", status: "Paga", statusColor: "bg-champagne" },
                    { patient: "Carlos Mendes", value: "R$ 280,00", status: "Pendente", statusColor: "bg-deep-teal" },
                    { patient: "Beatriz Costa", value: "R$ 520,00", status: "Paga", statusColor: "bg-champagne" },
                    { patient: "Roberto Lima", value: "R$ 350,00", status: "Atrasada", statusColor: "bg-amber-gold" },
                  ].map((item, i) => (
                    <motion.div
                      key={item.patient}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + i * 0.1 }}
                      className="flex items-center justify-between p-3 rounded-lg bg-ivory/5 hover:bg-ivory/10 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-ivory/10 flex items-center justify-center text-xs font-medium text-ivory/70">
                          {item.patient.charAt(0)}
                        </div>
                        <span className="text-sm text-ivory/80">{item.patient}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-dm-mono text-ivory">{item.value}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium text-obsidian ${item.statusColor}`}>
                          {item.status}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Feature Cards Component
function FeatureCards() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Plataforma Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="group relative p-8 md:p-10 rounded-3xl bg-ivory border border-obsidian/5 hover:border-champagne/30 transition-all duration-500 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-champagne/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-champagne/10 flex items-center justify-center text-champagne mb-6">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </div>
              <h3 className="font-cormorant text-3xl text-obsidian mb-4">Plataforma</h3>
              <p className="text-obsidian/60 leading-relaxed mb-6">
                Automatize cobranças, centralize prontuários e agendamentos e aumente a eficiência da sua clínica.
              </p>
              <a href="/plataforma" className="inline-flex items-center gap-2 text-champagne font-medium hover:gap-3 transition-all">
                Saiba mais <ArrowIcon className="w-4 h-4" />
              </a>

              {/* Calendar mockup */}
              <div className="mt-8 p-4 rounded-xl bg-white border border-obsidian/5">
                <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-obsidian/40 mb-2">
                  {["D", "S", "T", "Q", "Q", "S", "S"].map((d) => (
                    <span key={d}>{d}</span>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: 31 }).map((_, i) => (
                    <div
                      key={i}
                      className={`aspect-square rounded-md text-[10px] flex items-center justify-center ${
                        [5, 12, 19, 26].includes(i) ? "bg-champagne text-obsidian font-medium" :
                        [8, 15, 22].includes(i) ? "bg-deep-teal/20 text-deep-teal" :
                        "text-obsidian/60"
                      }`}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Agentes Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="group relative p-8 md:p-10 rounded-3xl bg-ivory border border-obsidian/5 hover:border-champagne/30 transition-all duration-500 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-champagne/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-champagne/10 flex items-center justify-center text-champagne mb-6">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-cormorant text-3xl text-obsidian mb-4">Agentes VELA</h3>
              <p className="text-obsidian/60 leading-relaxed mb-6">
                Os novos membros da sua equipe: trabalham 7 dias por semana, executando tarefas com mais velocidade e menos falhas.
              </p>
              <a href="/agentes" className="inline-flex items-center gap-2 text-champagne font-medium hover:gap-3 transition-all">
                Saiba mais <ArrowIcon className="w-4 h-4" />
              </a>

              {/* Agent portrait */}
              <div className="mt-8 p-4 rounded-xl bg-white border border-obsidian/5 flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-champagne to-amber-gold flex items-center justify-center text-2xl font-cormorant font-bold text-obsidian">
                  J
                </div>
                <div>
                  <div className="font-medium text-obsidian">Júlia</div>
                  <div className="text-xs text-obsidian/50">Agente Digital</div>
                  <div className="text-[10px] text-champagne mt-1">Especialista em conversão de agendamentos</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Automation Flow Component
function AutomationFlow() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const target = 8699824;
      const duration = 2500;
      const steps = 60;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView]);

  const flowNodes = [
    "Atendimento agendado",
    "Lembrete de atendimento",
    "Link de pagamento",
    "Lembrete de pagamento",
    "Pagamento verificado",
    "Nota fiscal enviada",
  ];

  return (
    <section ref={ref} className="py-24 md:py-32 bg-white">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-cormorant text-3xl md:text-4xl lg:text-5xl text-obsidian mb-16"
        >
          A primeira plataforma de automações<br />para clínicas do Brasil
        </motion.h2>

        {/* Flow diagram */}
        <div className="relative mb-16">
          <svg className="w-full max-w-2xl mx-auto" viewBox="0 0 400 320">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#C9A96E" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#C9A96E" stopOpacity="1" />
              </linearGradient>
            </defs>

            {/* Connecting lines */}
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.3 }}
              d="M50 40 L200 160 M350 40 L200 160 M50 100 L200 160 M350 100 L200 160 M50 160 L200 160 M350 160 L200 160"
              stroke="url(#gradient)"
              strokeWidth="1.5"
              fill="none"
            />

            {/* Flow nodes */}
            {flowNodes.map((node, i) => {
              const x = i % 2 === 0 ? 50 : 350;
              const y = 40 + (i * 24);
              return (
                <motion.g
                  key={node}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <circle cx={x} cy={y} r="16" fill="#F7F5F2" stroke="#C9A96E" strokeWidth="1.5" />
                  {/* Lightning icon as path */}
                  <path
                    d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                    fill="#C9A96E"
                    transform={`translate(${x - 8}, ${y - 8}) scale(0.65)`}
                  />
                  <text
                    x={x + (i % 2 === 0 ? -20 : 20)}
                    y={y + 5}
                    textAnchor={i % 2 === 0 ? "end" : "start"}
                    className="text-[11px] fill-obsidian"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {node}
                  </text>
                </motion.g>
              );
            })}

            {/* Center point */}
            <motion.circle
              cx="200"
              cy="160"
              r="24"
              fill="#C9A96E"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1, type: "spring" }}
            />
          </svg>
        </div>

        {/* Big number */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="font-dm-mono text-5xl md:text-7xl lg:text-8xl text-obsidian tabular-nums">
            {count.toLocaleString("pt-BR")}
          </div>
          <p className="mt-4 text-obsidian/60">
            Tarefas automatizadas para mais de 1.000 clientes
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// Testimonials Marquee Component
function TestimonialsMarquee() {
  const testimonials = [
    { quote: "Com a VELA sabemos exatamente o faturamento em tempo real.", author: "Dr. Vinicius", specialty: "Oftalmologista" },
    { quote: "A equipe da VELA treinou nossa equipe e trouxe segurança a todos.", author: "Fernanda M.", specialty: "Psicóloga" },
    { quote: "Com a VELA temos gráficos de pacientes e faturamento. Poupa muito trabalho.", author: "Dr. Fabiano", specialty: "Médico" },
    { quote: "Eu perdia tempo com planilhas. Com a VELA foi uma virada de chave.", author: "Camila T.", specialty: "Psicóloga" },
    { quote: "Depois da VELA conseguimos abrir a segunda unidade da clínica.", author: "Mirla C.", specialty: "Fonoaudióloga" },
    { quote: "Plataforma ágil, rápida e com custo-benefício excelente.", author: "Laís S.", specialty: "Fonoaudióloga" },
  ];

  return (
    <section className="py-16 overflow-hidden bg-white">
      <div className="flex animate-scroll-left gap-6">
        {[...testimonials, ...testimonials].map((t, i) => (
          <div
            key={`${t.author}-${i}`}
            className="flex-shrink-0 w-80 p-6 rounded-2xl bg-ivory border border-obsidian/5"
          >
            <p className="text-obsidian/80 leading-relaxed mb-4">"{t.quote}"</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-champagne to-amber-gold flex items-center justify-center text-obsidian font-cormorant font-bold text-sm">
                {t.author.charAt(0)}
              </div>
              <div>
                <div className="text-sm font-medium text-obsidian">{t.author}</div>
                <div className="text-xs text-obsidian/50">{t.specialty}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Split Section Component
function SplitSection() {
  return (
    <section className="py-24 md:py-32 bg-ivory">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left - Photo placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[500px] rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-champagne/40 via-amber-gold/30 to-deep-teal/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-obsidian/10 blur-2xl" />
            </div>
          </motion.div>

          {/* Right - Content card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-10 rounded-3xl bg-white border border-obsidian/5"
          >
            <h2 className="font-cormorant text-3xl md:text-4xl text-obsidian mb-6">
              Se seu negócio vai bem, o nosso também.
            </h2>
            <p className="text-obsidian/60 leading-relaxed mb-8">
              Desenvolvemos uma plataforma que automatiza rotinas e oferece visibilidade total da operação. Com os nossos Agentes VELA sua gestão ganha agilidade e precisão.
            </p>

            <ul className="space-y-4 mb-8">
              {[
                { title: "Produto", desc: "Inovação faz parte do nosso dia a dia." },
                { title: "Atendimento", desc: "Nosso time é uma extensão do seu." },
                { title: "Personalização", desc: "Adaptamos a plataforma à sua clínica." },
              ].map((item) => (
                <li key={item.title} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-champagne/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-champagne" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium text-obsidian">{item.title}.</span>
                    <span className="text-obsidian/60"> {item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>

            <motion.a
              href="/solicitar-acesso"
              className="px-7 py-3.5 bg-champagne text-obsidian font-medium rounded-full hover:bg-amber-gold transition-all duration-300 inline-block"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Solicitar acesso
            </motion.a>
          </motion.div>
        </div>

        {/* Tech company logos */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-12 pt-8 border-t border-obsidian/10"
        >
          {["google", "microsoft", "apple", "amazon", "meta", "youtube"].map((logo) => (
            <motion.img
              key={logo}
              src={`/logos/${logo}.svg`}
              alt={`${logo.charAt(0).toUpperCase() + logo.slice(1)} logo`}
              className="h-8 md:h-10 w-auto object-contain opacity-40 hover:opacity-70 transition-opacity duration-300"
              whileHover={{ scale: 1.05 }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// AI Agents Section (Dark)
function AIAgentsDark() {
  const agents = [
    { quote: "Automatizei completamente o agendamento da minha clínica", tag: "CLIENTES VELA", author: "Dra. Patricia R.", specialty: "Dermatologista" },
    { quote: "Como resolvi cobranças e notas fiscais sem esforço", tag: "CLIENTES VELA", author: "Dr. Marcos V.", specialty: "Clínico Geral" },
    { quote: "Minha clínica rumo a uma economia de R$50mil em 12 meses", tag: "CLIENTES VELA", author: "Dra. Juliana M.", specialty: "Fisioterapeuta" },
    { quote: "Melhorei a relação com pacientes profissionalizando cobranças", tag: "CLIENTES VELA", author: "Dra. Amanda S.", specialty: "Psicóloga" },
  ];

  return (
    <section className="py-24 md:py-32 bg-deep-teal overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 text-champagne mb-4">
              <ArrowIcon className="w-5 h-5 rotate-45" />
              <span className="text-sm font-dm-mono uppercase tracking-wider">Os Agentes VELA</span>
            </div>
            <h2 className="font-cormorant text-3xl md:text-4xl lg:text-5xl text-ivory max-w-xl">
              Seja qual for o volume da sua clínica, os agentes VELA acompanham seu crescimento.
            </h2>
          </div>
          <motion.a
            href="/agentes"
            className="self-start md:self-auto px-6 py-3 border border-champagne text-champagne rounded-full hover:bg-champagne hover:text-obsidian transition-all duration-300 inline-block"
            whileHover={{ scale: 1.03 }}
          >
            Conhecer agentes
          </motion.a>
        </div>

        {/* Agent cards - horizontal scroll */}
        <div className="flex gap-6 overflow-x-auto pb-8 -mx-6 px-6 md:mx-0 md:px-0 scrollbar-hide">
          {agents.map((agent, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex-shrink-0 w-80 md:w-96 p-6 rounded-2xl bg-obsidian/50 border border-ivory/10"
            >
              <div className="text-4xl text-champagne mb-4">❝</div>
              <p className="text-ivory font-cormorant text-xl leading-relaxed mb-6">
                {agent.quote}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-champagne to-amber-gold flex items-center justify-center text-obsidian font-cormorant font-bold">
                  {agent.author.charAt(5)}
                </div>
                <div>
                  <div className="text-sm font-medium text-ivory">{agent.author}</div>
                  <div className="text-xs text-ivory/50">{agent.specialty}</div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-ivory/10">
                <span className="text-[10px] text-champagne font-dm-mono uppercase tracking-wider">
                  {agent.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// FAQ Component
function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "O que é a VELA?",
      a: "A VELA é uma plataforma de gestão inteligente para clínicas que utiliza IA para automatizar agendamentos, cobranças e retenção de pacientes. Nossa missão é permitir que profissionais de saúde foquem no que realmente importa: transformar vidas.",
    },
    {
      q: "Como a VELA funciona?",
      a: "Através dos nossos Agentes VELA — Júlia, Sofia, Max e Atlas — que trabalham 24/7 para otimizar sua operação. Eles se integram ao seu fluxo de trabalho existente e automatizam tarefas repetitivas com inteligência contextual.",
    },
    {
      q: "Como a VELA protege os dados dos pacientes?",
      a: "Somos 100% LGPD compliant. Todos os dados são criptografados em repouso e em trânsito, com backups automáticos e acesso restrito. Sua clínica e seus pacientes estão sempre protegidos.",
    },
    {
      q: "Quanto custa a VELA?",
      a: "Oferecemos planos flexíveis que se adaptam ao tamanho da sua clínica. Entre em contato para uma demonstração personalizada e proposta comercial sob medida.",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-deep-teal border-t border-ivory/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* FAQ Accordion */}
          <div>
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`border-b border-ivory/10 ${i === 0 ? "pt-0" : ""}`}
              >
                <button
                  className="w-full py-6 flex items-center justify-between text-left"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <span className="text-lg text-ivory font-medium pr-8">{faq.q}</span>
                  <span className={`text-champagne transition-transform duration-300 ${openIndex === i ? "rotate-45" : ""}`}>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === i ? "auto" : 0,
                    opacity: openIndex === i ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 text-ivory/60 leading-relaxed">{faq.a}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Right side CTA */}
          <div className="flex flex-col justify-center">
            <motion.h2
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="font-cormorant text-4xl md:text-5xl lg:text-6xl text-ivory leading-tight mb-8"
            >
              Sua clínica no piloto inteligente.
            </motion.h2>
            <motion.a
              href="/solicitar-acesso"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="self-start px-8 py-4 bg-champagne text-obsidian text-base font-medium rounded-full hover:bg-amber-gold transition-all duration-300 inline-block"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Solicitar acesso
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-obsidian pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main footer grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-16">
          {/* Brand column */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-8 h-8 rounded-lg bg-champagne flex items-center justify-center text-obsidian">
                <FlameIcon className="w-5 h-5" />
              </div>
              <span className="font-cormorant text-xl font-bold tracking-tight text-ivory">VELA</span>
            </div>
            <p className="text-ivory/50 text-sm leading-relaxed mb-6 max-w-xs">
              Inteligência que ilumina negócios. A plataforma definitiva para clínicas que buscam excelência.
            </p>
            {/* Trust badges */}
            <div className="flex flex-wrap gap-4">
              {["LGPD Compliant", "Site Seguro", "Google for Startups"].map((badge) => (
                <span key={badge} className="px-3 py-1.5 rounded-full bg-ivory/5 border border-ivory/10 text-[10px] text-ivory/60 uppercase tracking-wider">
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {[
            { title: "Empresa", links: ["Sobre", "Carreiras", "Imprensa", "Contato"] },
            { title: "Agentes", links: ["Júlia", "Sofia", "Max", "Atlas"] },
            { title: "Social", links: ["Instagram", "LinkedIn", "YouTube"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-ivory font-medium mb-4">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-ivory/50 text-sm hover:text-champagne transition-colors duration-300">
                      {link}
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
            <a href="#" className="hover:text-ivory/60 transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-ivory/60 transition-colors">Termos & Condições</a>
          </div>
          <p className="text-ivory/40 text-sm">2026 © VELA. Todos os direitos reservados.</p>
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

// Main Page Component
export default function Home() {
  return (
    <div className="min-h-screen bg-ivory overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <FeatureCards />
        <AutomationFlow />
        <TestimonialsMarquee />
        <SplitSection />
        <AIAgentsDark />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
