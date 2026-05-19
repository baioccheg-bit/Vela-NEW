"use client";

import { motion } from "framer-motion";
import { Navbar, Footer, LinkButton } from "@/components";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export default function AtlasPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-ivory via-white to-ivory" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-champagne/5 rounded-full blur-[120px]" />

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-champagne/10 border border-champagne/20 mb-6">
                  <span className="text-sm text-obsidian/80 font-medium">Agente de Analytics</span>
                </div>
                <h1 className="font-cormorant text-5xl md:text-6xl font-semibold text-obsidian mb-4">
                  Olá, eu sou o Atlas.
                </h1>
                <p className="text-lg text-obsidian/60 mb-8 leading-relaxed">
                  Especialista em inteligência de negócios. Transformo dados em insights para você tomar decisões que fazem sua clínica crescer.
                </p>
                <div className="flex flex-wrap gap-4">
                  <LinkButton href="/solicitar-acesso" size="lg">
                    Adicionar Atlas
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
                className="flex justify-center"
              >
                <div className="w-full max-w-sm">
                  <div className="bg-obsidian rounded-2xl shadow-xl p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-champagne to-deep-teal flex items-center justify-center">
                        <span className="font-cormorant font-bold text-obsidian text-xl">A</span>
                      </div>
                      <div>
                        <div className="font-cormorant text-lg text-ivory">Atlas</div>
                        <div className="text-xs text-ivory/50">Insights esta semana</div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {[
                        { insight: "Ocupação aumentou 12%", trend: "up", color: "text-champagne" },
                        { insight: "Ticket médio: R$ 385", trend: "up", color: "text-champagne" },
                        { insight: "5 pacientes inativos", trend: "alert", color: "text-amber-gold" },
                      ].map((item, i) => (
                        <div key={item.insight} className="flex items-center justify-between p-3 rounded-xl bg-ivory/5">
                          <div className="text-sm text-ivory/80">{item.insight}</div>
                          <div className={`text-xs font-medium ${item.color}`}>
                            {item.trend === "up" ? "↑" : "⚠"}
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
                Dados que geram decisões
              </h2>
              <p className="text-obsidian/60 max-w-2xl mx-auto">
                Atlas monitora tudo e te diz exatamente onde agir para crescer.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Dashboards em tempo real", desc: "Acompanhe KPIs principais a qualquer momento.", icon: "📊" },
                { title: "Previsão de faturamento", desc: "Projeções baseadas em histórico e tendências.", icon: "📈" },
                { title: "Análise de ocupação", desc: "Identifique horários ociosos e oportunidades.", icon: "📅" },
                { title: "Segmentação de pacientes", desc: "Entenda perfis e comportamentos de consumo.", icon: "👥" },
                { title: "Alertas inteligentes", desc: "Notificações quando algo importante mudar.", icon: "🔔" },
                { title: "Relatórios personalizados", desc: "Exporte dados no formato que precisar.", icon: "📑" },
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
                Inteligência comprovada
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { metric: "40%", label: "Mais eficiência", sub: "na alocação de recursos" },
                  { metric: "25%", label: "Crescimento médio", sub: "de faturamento em 6 meses" },
                  { metric: "15min", label: "Por semana", sub: "tempo analisando dados" },
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
              Decisões baseadas em dados
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-obsidian/60 mb-10"
            >
              Atlas transforma números em crescimento real.
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
