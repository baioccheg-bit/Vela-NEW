"use client";

import { motion } from "framer-motion";
import { Navbar, Footer, LinkButton } from "@/components";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export default function SofiaPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-ivory via-white to-ivory" />
          <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-deep-teal/5 rounded-full blur-[100px]" />

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="order-2 lg:order-1"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-deep-teal/10 border border-deep-teal/20 mb-6">
                  <span className="text-sm text-obsidian/80 font-medium">Agente de Relacionamento</span>
                </div>
                <h1 className="font-cormorant text-5xl md:text-6xl font-semibold text-obsidian mb-4">
                  Olá, eu sou a Sofia.
                </h1>
                <p className="text-lg text-obsidian/60 mb-8 leading-relaxed">
                  Especialista em retenção e pós-atendimento. Cuido do relacionamento com seus pacientes para que eles sempre escolham voltar para sua clínica.
                </p>
                <div className="flex flex-wrap gap-4">
                  <LinkButton href="/solicitar-acesso" size="lg">
                    Adicionar Sofia
                  </LinkButton>
                  <LinkButton href="/agentes" variant="outline" size="lg">
                    Ver todos os agentes
                  </LinkButton>
                </div>
              </motion.div>

              {/* Visual */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="order-1 lg:order-2 flex justify-center"
              >
                <div className="w-full max-w-sm">
                  <div className="bg-white rounded-2xl shadow-xl p-6 border border-obsidian/5">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-deep-teal to-champagne flex items-center justify-center">
                        <span className="font-cormorant font-bold text-obsidian text-xl">S</span>
                      </div>
                      <div>
                        <div className="font-cormorant text-lg text-obsidian">Sofia</div>
                        <div className="text-xs text-obsidian/50">Campanhas ativas: 3</div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {[
                        { name: "Reativação 90 dias", patients: "124 pacientes", status: "Em andamento" },
                        { name: "Aniversariantes Março", patients: "45 pacientes", status: "Agendado" },
                        { name: "Pós-procedimento", patients: "28 pacientes", status: "Em andamento" },
                      ].map((campaign) => (
                        <div key={campaign.name} className="p-3 rounded-xl bg-ivory border border-obsidian/5">
                          <div className="text-sm font-medium text-obsidian">{campaign.name}</div>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs text-obsidian/50">{campaign.patients}</span>
                            <span className="text-[10px] text-champagne bg-champagne/10 px-2 py-0.5 rounded-full">{campaign.status}</span>
                          </div>
                        </div>
                      ))}
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
                Retenção que gera receita
              </h2>
              <p className="text-obsidian/60 max-w-2xl mx-auto">
                Sofia mantém seus pacientes engajados e voltando regularmente.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Follow-up pós-consulta", desc: "Mensagem de cuidado 24h após cada atendimento.", icon: "💝" },
                { title: "Reativação automática", desc: "Identifica pacientes inativos e inicia campanhas de retorno.", icon: "🔄" },
                { title: "Datas especiais", desc: "Aniversários e ocasiões importantes com mensagens personalizadas.", icon: "🎂" },
                { title: "Pesquisa NPS", desc: "Coleta feedback e identifica promotores e detratores.", icon: "📊" },
                { title: "Programa de fidelidade", desc: "Pontuação e recompensas para pacientes recorrentes.", icon: "⭐" },
                { title: "Educação em saúde", desc: "Conteúdo relevante enviado periodicamente.", icon: "📚" },
              ].map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-2xl bg-ivory border border-obsidian/5 hover:border-deep-teal/30 transition-all duration-300"
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
                Impacto na retenção
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { metric: "2.5x", label: "Mais retenção", sub: "pacientes retornam mais frequentemente" },
                  { metric: "67%", label: "Taxa de abertura", sub: "mensagens personalizadas" },
                  { metric: "+R$ 18k", label: "Receita adicional", sub: "mês em média por clínica" },
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
              Transforme pacientes em fãs
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-obsidian/60 mb-10"
            >
              Sofia cuida do relacionamento enquanto você cuida das pessoas.
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
