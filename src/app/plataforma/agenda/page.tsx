"use client";

import { motion } from "framer-motion";
import { Navbar, Footer, LinkButton } from "@/components";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export default function AgendaPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-ivory via-white to-ivory" />
          <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-champagne/5 rounded-full blur-[100px]" />

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-champagne/10 border border-champagne/20 mb-6">
                  <span className="text-sm text-obsidian/80 font-medium">Agenda Inteligente</span>
                </div>
                <h1 className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-semibold text-obsidian leading-[1.1] mb-6">
                  Sua agenda sempre<br />cheia.
                </h1>
                <p className="text-lg text-obsidian/60 mb-8 leading-relaxed">
                  Preenchimento automático de lacunas, confirmações via WhatsApp e redução de até 38% nas faltas.
                </p>
                <div className="flex flex-wrap gap-4">
                  <LinkButton href="/solicitar-acesso" size="lg">
                    Começar agora
                  </LinkButton>
                  <LinkButton href="/plataforma" variant="outline" size="lg">
                    Voltar à plataforma
                  </LinkButton>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-obsidian/5">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-cormorant text-obsidian">Dezembro 2025</h3>
                    <span className="text-xs text-obsidian/50">Dra. Patricia</span>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center text-xs text-obsidian/40 mb-2">
                    {["D", "S", "T", "Q", "Q", "S", "S"].map((d) => (
                      <span key={d}>{d}</span>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: 35 }).map((_, i) => {
                      const hasAppointment = [5, 6, 12, 13, 19, 20, 26, 27].includes(i);
                      const isToday = i === 8;
                      return (
                        <div
                          key={i}
                          className={`aspect-square rounded-lg text-[10px] flex items-center justify-center relative ${
                            isToday
                              ? "bg-champagne text-obsidian font-bold"
                              : hasAppointment
                              ? "bg-deep-teal/10 text-deep-teal"
                              : i < 31
                              ? "text-obsidian/60 hover:bg-obsidian/5"
                              : "text-transparent"
                          }`}
                        >
                          {i + 1}
                          {hasAppointment && (
                            <div className="absolute bottom-1 w-1 h-1 rounded-full bg-champagne" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4 pt-4 border-t border-obsidian/5 flex items-center justify-between text-xs">
                    <span className="text-obsidian/60">12 consultas hoje</span>
                    <span className="text-champagne font-medium">85% ocupado</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-cormorant text-4xl md:text-5xl text-obsidian mb-4">
                Agenda que trabalha por você
              </h2>
              <p className="text-obsidian/60 max-w-2xl mx-auto">
                Automatize cada aspecto do agendamento da sua clínica.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Preenchimento automático",
                  description: "Horários cancelados são preenchidos automaticamente com lista de espera.",
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                },
                {
                  title: "Confirmação WhatsApp",
                  description: "Cada consulta é confirmada automaticamente 24h antes via WhatsApp.",
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  ),
                },
                {
                  title: "Lembretes inteligentes",
                  description: "Múltiplos lembretes que reduzem faltas em até 38%.",
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  ),
                },
                {
                  title: "Lista de espera ativa",
                  description: "Pacientes interessados são notificados instantaneamente sobre vagas.",
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                    </svg>
                  ),
                },
                {
                  title: "Recorrência",
                  description: "Agende sessões recorrentes com um clique e gere receita previsível.",
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  ),
                },
                {
                  title: "Multi-profissional",
                  description: "Gerencie agendas de múltiplos profissionais em uma única visão.",
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.172M11 9.172A3 3 0 0119 11V13a3 3 0 01-3 3M9 20H4a2 2 0 01-2-2v-9a2 2 0 012-2h5m6 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                },
              ].map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 rounded-2xl bg-ivory border border-obsidian/5 hover:border-champagne/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-champagne/10 flex items-center justify-center text-champagne mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="font-cormorant text-xl text-obsidian mb-2">{feature.title}</h3>
                  <p className="text-obsidian/60 text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-24 bg-deep-teal">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="font-cormorant text-4xl md:text-5xl text-ivory mb-12">
                Impacto na sua agenda
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { metric: "38%", label: "Redução de faltas", sub: "em média" },
                  { metric: "92%", label: "Taxa de confirmação", sub: "via WhatsApp" },
                  { metric: "+24%", label: "Receita mensal", sub: "com preenchimento automático" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.metric}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                  >
                    <div className="text-5xl md:text-6xl font-cormorant text-champagne mb-2">{stat.metric}</div>
                    <div className="text-lg text-ivory font-medium">{stat.label}</div>
                    <div className="text-sm text-ivory/50">{stat.sub}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-ivory">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-cormorant text-4xl md:text-5xl text-obsidian mb-6"
            >
              Otimize sua agenda hoje
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-obsidian/60 mb-10"
            >
              Teste grátis por 30 dias. Sem cartão de crédito.
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
