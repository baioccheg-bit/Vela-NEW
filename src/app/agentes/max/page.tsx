"use client";

import { motion } from "framer-motion";
import { Navbar, Footer, LinkButton } from "@/components";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export default function MaxPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-ivory via-white to-ivory" />
          <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-amber-gold/5 rounded-full blur-[100px]" />

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-gold/10 border border-amber-gold/20 mb-6">
                  <span className="text-sm text-obsidian/80 font-medium">Agente Financeiro</span>
                </div>
                <h1 className="font-cormorant text-5xl md:text-6xl font-semibold text-obsidian mb-4">
                  Olá, eu sou o Max.
                </h1>
                <p className="text-lg text-obsidian/60 mb-8 leading-relaxed">
                  Especialista em cobranças e pagamentos. Automatizo todo o fluxo financeiro para você receber mais rápido e com menos esforço.
                </p>
                <div className="flex flex-wrap gap-4">
                  <LinkButton href="/solicitar-acesso" size="lg">
                    Adicionar Max
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
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-gold to-champagne flex items-center justify-center">
                        <span className="font-cormorant font-bold text-obsidian text-xl">M</span>
                      </div>
                      <div>
                        <div className="font-cormorant text-lg text-ivory">Max</div>
                        <div className="text-xs text-ivory/50">Cobranças esta semana</div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {[
                        { name: "Ana Silva", value: "R$ 450,00", status: "Enviado", color: "bg-champagne" },
                        { name: "Carlos Mendes", value: "R$ 280,00", status: "Pago", color: "bg-deep-teal" },
                        { name: "Beatriz Costa", value: "R$ 520,00", status: "Vencendo", color: "bg-amber-gold" },
                      ].map((payment) => (
                        <div key={payment.name} className="flex items-center justify-between p-3 rounded-xl bg-ivory/5">
                          <div>
                            <div className="text-sm text-ivory/80">{payment.name}</div>
                            <div className="text-xs text-ivory/50">{payment.value}</div>
                          </div>
                          <span className={`text-[10px] text-obsidian px-2 py-0.5 rounded-full ${payment.color}`}>
                            {payment.status}
                          </span>
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
                Receba sem esforço
              </h2>
              <p className="text-obsidian/60 max-w-2xl mx-auto">
                Max automatiza cobranças e reduz inadimplência sem constrangimento.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Links de pagamento", desc: "Envio automático por WhatsApp e e-mail após consulta.", icon: "💳" },
                { title: "Cobrança recorrente", desc: "Pacientes de tratamento pagam automaticamente todo mês.", icon: "🔁" },
                { title: "Aviso de vencimento", desc: "Lembretes amigáveis antes e depois do vencimento.", icon: "🔔" },
                { title: "Negociação automática", desc: "Propõe planos de pagamento para inadimplentes.", icon: "🤝" },
                { title: "Emissão de NFSe", desc: "Notas fiscais automáticas após cada pagamento.", icon: "📄" },
                { title: "Reconciliação", desc: "Confirma pagamentos e atualiza status automaticamente.", icon: "✅" },
              ].map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-2xl bg-ivory border border-obsidian/5 hover:border-amber-gold/30 transition-all duration-300"
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
                Resultados financeiros
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { metric: "65%", label: "Menos inadimplência", sub: "redução média em 90 dias" },
                  { metric: "3.2x", label: "Mais rápido", sub: "recebimento médio" },
                  { metric: "40h/mês", label: "Economizado", sub: "trabalho manual eliminado" },
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
              Fluxo de caixa sob controle
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-obsidian/60 mb-10"
            >
              Max cuida das cobranças para você focar nos pacientes.
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
