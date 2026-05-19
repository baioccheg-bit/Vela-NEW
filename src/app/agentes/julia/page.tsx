"use client";

import { motion } from "framer-motion";
import { Navbar, Footer, LinkButton } from "@/components";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export default function JuliaPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-ivory via-white to-ivory" />
          <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-champagne/5 rounded-full blur-[100px]" />

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-champagne/10 border border-champagne/20 mb-6">
                  <span className="text-sm text-obsidian/80 font-medium">Agente de Agendamento</span>
                </div>
                <h1 className="font-cormorant text-5xl md:text-6xl font-semibold text-obsidian mb-4">
                  Olá, eu sou a Júlia.
                </h1>
                <p className="text-lg text-obsidian/60 mb-8 leading-relaxed">
                  Especialista em conversão de agendamentos. Trabalho 24/7 via WhatsApp para garantir que sua agenda esteja sempre cheia e seus pacientes compareçam.
                </p>
                <div className="flex flex-wrap gap-4">
                  <LinkButton href="/solicitar-acesso" size="lg">
                    Adicionar Júlia
                  </LinkButton>
                  <LinkButton href="/agentes" variant="outline" size="lg">
                    Ver todos os agentes
                  </LinkButton>
                </div>
              </motion.div>

              {/* Phone mockup */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex justify-center"
              >
                <div className="w-72 bg-obsidian rounded-[2.5rem] p-3 shadow-2xl">
                  <div className="bg-ivory rounded-[2rem] overflow-hidden">
                    {/* Chat header */}
                    <div className="bg-champagne p-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-obsidian/20 flex items-center justify-center">
                        <span className="font-cormorant font-bold text-obsidian">J</span>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-obsidian">Júlia</div>
                        <div className="text-[10px] text-obsidian/70">Agente VELA • Online</div>
                      </div>
                    </div>

                    {/* Chat messages */}
                    <div className="p-4 space-y-3 min-h-[280px]">
                      <div className="bg-champagne/20 rounded-2xl rounded-tl-sm p-3 text-xs text-obsidian/80">
                        Olá Maria! 👋 Sua consulta com Dra. Patricia está confirmada para amanhã às 14h.
                      </div>
                      <div className="bg-obsidian/5 rounded-2xl rounded-tr-sm p-3 text-xs text-obsidian/60 text-right">
                        Perfeito! Preciso levar algum documento?
                      </div>
                      <div className="bg-champagne/20 rounded-2xl rounded-tl-sm p-3 text-xs text-obsidian/80">
                        Apenas seu documento com foto. Chegue 10min antes! ✨
                      </div>
                      <div className="bg-champagne/20 rounded-2xl rounded-tl-sm p-3 text-xs text-obsidian/80">
                        📍 <a href="#" className="text-champagne underline">Rua Augusta, 1500 - São Paulo</a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-cormorant text-4xl md:text-5xl text-obsidian mb-4">
                O que Júlia faz por você
              </h2>
              <p className="text-obsidian/60 max-w-2xl mx-auto">
                Automatize todo o fluxo de agendamento e confirmação de consultas.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Agendamento 24/7",
                  desc: "Atende pacientes a qualquer hora, mesmo fora do horário comercial.",
                  icon: "📅",
                },
                {
                  title: "Confirmação automática",
                  desc: "Confirma cada consulta via WhatsApp 24h antes.",
                  icon: "✅",
                },
                {
                  title: "Redução de faltas",
                  desc: "Lembretes inteligentes que reduzem no-show em até 38%.",
                  icon: "📉",
                },
                {
                  title: "Reagendamento",
                  desc: "Oferece horários alternativos automaticamente quando necessário.",
                  icon: "🔄",
                },
                {
                  title: "Lista de espera",
                  desc: "Preenche vagas canceladas em minutos com sua lista de espera.",
                  icon: "⏳",
                },
                {
                  title: "Triagem inicial",
                  desc: "Coleta informações básicas antes da primeira consulta.",
                  icon: "📋",
                },
              ].map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-2xl bg-ivory border border-obsidian/5 hover:border-champagne/30 transition-all duration-300"
                >
                  <div className="text-3xl mb-4">{feature.icon}</div>
                  <h3 className="font-cormorant text-lg text-obsidian mb-2">{feature.title}</h3>
                  <p className="text-obsidian/60 text-sm">{feature.desc}</p>
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
                Resultados reais
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { metric: "38%", label: "Redução de faltas", sub: "em média nas clínicas VELA" },
                  { metric: "2.400+", label: "Mensagens/mês", sub: "enviadas automaticamente" },
                  { metric: "94%", label: "Taxa de resposta", sub: "pacientes respondem em até 1h" },
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
              Adicione Júlia ao seu time
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-obsidian/60 mb-10"
            >
              Configuração em menos de 30 minutos. Teste grátis por 30 dias.
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
