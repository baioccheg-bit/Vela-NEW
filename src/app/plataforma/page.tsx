"use client";

import { motion } from "framer-motion";
import { Navbar, Footer, LinkButton } from "@/components";
import { useState } from "react";

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

function ArrowIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 17L17 7M17 7H7M17 7V17" />
    </svg>
  );
}

const modules = [
  {
    title: "Controle Financeiro",
    slug: "financeiro",
    description: "Automatize cobranças, reconciliação bancária e emissão de notas fiscais. Tenha visibilidade completa do faturamento em tempo real.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    features: ["Cobrança automática", "Reconciliação bancária", "Notas fiscais", "Relatórios financeiros", "Fluxo de caixa"],
    visual: (
      <div className="bg-obsidian rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-cormorant text-ivory">Faturamento Mensal</span>
          <span className="text-xs text-ivory/50">Dez 2025</span>
        </div>
        <div className="flex items-end gap-2 h-24">
          {[45, 62, 38, 71, 55, 82, 67].map((h, i) => (
            <div key={i} className="flex-1 bg-champagne/20 rounded-t-sm relative">
              <div className="absolute bottom-0 left-0 right-0 bg-champagne rounded-t-sm" style={{ height: `${h}%` }} />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-ivory/40">
          {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "Agenda Inteligente",
    slug: "agenda",
    description: "Preenchimento automático de lacunas, confirmações via WhatsApp, lembretes inteligentes e redução de até 38% nas faltas.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    features: ["Preenchimento automático", "Confirmação WhatsApp", "Lembretes", "Lista de espera", "Recorrência"],
    visual: (
      <div className="bg-white rounded-xl p-4 border border-obsidian/5">
        <div className="grid grid-cols-7 gap-1 text-center text-[9px] text-obsidian/40 mb-2">
          {["D", "S", "T", "Q", "Q", "S", "S"].map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 35 }).map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded text-[9px] flex items-center justify-center ${
                [5, 12, 19, 26].includes(i) ? "bg-champagne text-obsidian font-medium" :
                [8, 15, 22, 29].includes(i) ? "bg-deep-teal/10 text-deep-teal" :
                i < 31 ? "text-obsidian/60" : "text-transparent"
              }`}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "Prontuários",
    slug: "prontuarios",
    description: "Registros clínicos organizados, seguros e de fácil acesso. Templates personalizáveis e histórico completo do paciente.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    features: ["Templates personalizados", "Histórico completo", "Anexos e imagens", "Assinatura digital", "Busca inteligente"],
    visual: (
      <div className="bg-ivory rounded-xl p-4 border border-obsidian/5">
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3 p-2 bg-white rounded-lg">
              <div className="w-8 h-8 rounded-lg bg-deep-teal/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-deep-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="h-2 w-24 bg-obsidian/20 rounded" />
                <div className="h-1.5 w-16 bg-obsidian/10 rounded mt-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "Central de Documentos",
    slug: "documentos",
    description: "Organize contratos, termos de consentimento e documentos operacionais. Assinatura eletrônica integrada e controle de versões.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
    ),
    features: ["Assinatura eletrônica", "Controle de versões", "Pastas personalizadas", "Permissões de acesso", "Busca full-text"],
    visual: (
      <div className="bg-white rounded-xl p-4 border border-obsidian/5">
        <div className="space-y-2">
          {["Contrato de Prestação", "Termo de Consentimento", "Anamnese"].map((doc, i) => (
            <div key={i} className="flex items-center gap-3 p-2.5 hover:bg-obsidian/5 rounded-lg transition-colors cursor-pointer">
              <div className="w-9 h-9 rounded-lg bg-champagne/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-champagne" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-sm text-obsidian">{doc}</div>
                <div className="text-[10px] text-obsidian/40">Atualizado há {i + 2} dias</div>
              </div>
              <span className="text-[10px] text-champagne bg-champagne/10 px-2 py-0.5 rounded-full">PDF</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

export default function PlataformaPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-ivory via-white to-ivory" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-champagne/5 rounded-full blur-[120px]" />

          <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-champagne/10 border border-champagne/20 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-champagne animate-pulse" />
              <span className="text-sm text-obsidian/80 font-medium">Plataforma completa</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-cormorant text-5xl md:text-6xl lg:text-7xl font-semibold text-obsidian leading-[1.1]"
            >
              Tudo que sua clínica precisa<br />em um só lugar.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-lg text-obsidian/60 max-w-2xl mx-auto"
            >
              Módulos integrados que conversam entre si, eliminando retrabalho e dando visibilidade completa da sua operação.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
            >
              <LinkButton href="/solicitar-acesso" size="lg">
                Solicitar acesso
              </LinkButton>
              <LinkButton href="#modulos" variant="outline" size="lg">
                Conhecer módulos
              </LinkButton>
            </motion.div>
          </div>
        </section>

        {/* Modules Grid */}
        <section id="modulos" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.h2 variants={fadeInUp} className="font-cormorant text-4xl md:text-5xl text-obsidian">
                Módulos da plataforma
              </motion.h2>
              <motion.p variants={fadeInUp} className="mt-4 text-obsidian/60 max-w-2xl mx-auto">
                Cada módulo foi desenhado para resolver uma dor específica da gestão de clínicas.
              </motion.p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {modules.map((module, i) => (
                <motion.div
                  key={module.slug}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative p-8 rounded-3xl bg-ivory border border-obsidian/5 hover:border-champagne/30 transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-champagne/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-champagne/10 flex items-center justify-center text-champagne group-hover:scale-110 transition-transform duration-500">
                        {module.icon}
                      </div>
                      <LinkButton href={`/plataforma/${module.slug}`} variant="ghost" size="sm">
                        Saiba mais <ArrowIcon className="w-4 h-4 ml-1" />
                      </LinkButton>
                    </div>

                    <h3 className="font-cormorant text-2xl md:text-3xl text-obsidian mb-3">
                      {module.title}
                    </h3>
                    <p className="text-obsidian/60 leading-relaxed mb-6">
                      {module.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {module.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-3 py-1.5 rounded-full bg-white border border-obsidian/5 text-xs text-obsidian/70"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6">{module.visual}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Integration Section */}
        <section className="py-24 md:py-32 bg-ivory">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="text-center"
            >
              <motion.h2
                variants={fadeInUp}
                className="font-cormorant text-4xl md:text-5xl text-obsidian mb-6"
              >
                Integração total entre módulos
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-obsidian/60 max-w-2xl mx-auto mb-12"
              >
                Quando um paciente agenda uma consulta, todo o fluxo é automático: confirmação, cobrança, prontuário e nota fiscal.
              </motion.p>

              {/* Integration diagram */}
              <motion.div
                variants={fadeInUp}
                className="relative p-8 rounded-3xl bg-white border border-obsidian/5"
              >
                <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
                  {modules.map((m, i) => (
                    <div
                      key={m.slug}
                      className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-ivory hover:bg-champagne/10 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-xl bg-champagne/10 flex items-center justify-center text-champagne">
                        {m.icon}
                      </div>
                      <span className="text-sm font-medium text-obsidian">{m.title.split(" ")[0]}</span>
                    </div>
                  ))}
                </div>
                <div className="absolute inset-0 pointer-events-none">
                  <svg className="w-full h-full" viewBox="0 0 800 200">
                    <path
                      d="M100 100 Q400 50 700 100"
                      stroke="#C9A96E"
                      strokeWidth="1"
                      fill="none"
                      strokeDasharray="4 4"
                      opacity="0.5"
                    />
                  </svg>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-deep-teal">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-cormorant text-4xl md:text-5xl text-ivory mb-6"
            >
              Pronto para modernizar sua clínica?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-ivory/60 mb-10"
            >
              Agende uma demonstração e veja a plataforma em ação.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <LinkButton href="/solicitar-acesso" size="lg">
                Solicitar acesso
              </LinkButton>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
