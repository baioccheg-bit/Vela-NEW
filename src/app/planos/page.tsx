"use client";

import { motion } from "framer-motion";
import { Navbar, Footer, LinkButton } from "@/components";
import { useState } from "react";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const plans = [
  {
    name: "Consultório",
    description: "Para profissionais autônomos e pequenos consultórios",
    monthlyPrice: "R$ 297",
    annualPrice: "R$ 247",
    popular: false,
    features: [
      "Até 200 pacientes/mês",
      "Agendamento inteligente",
      "1 Agente VELA (Júlia)",
      "Cobrança automática",
      "Prontuários eletrônicos",
      "Suporte por e-mail",
    ],
    notIncluded: ["Múltiplos profissionais", "API de integração", "Gerente de conta dedicado"],
  },
  {
    name: "Clínica",
    description: "Para clínicas em crescimento com múltiplos profissionais",
    monthlyPrice: "R$ 597",
    annualPrice: "R$ 497",
    popular: true,
    features: [
      "Pacientes ilimitados",
      "Todos os Agentes VELA",
      "Múltiplos profissionais",
      "Financeiro completo",
      "Prontuários avançados",
      "Suporte prioritário WhatsApp",
      "Relatórios personalizados",
    ],
    notIncluded: ["API de integração", "SLA dedicado"],
  },
  {
    name: "Enterprise",
    description: "Para redes de clínicas e operações de grande porte",
    monthlyPrice: "Sob consulta",
    annualPrice: "Sob consulta",
    popular: false,
    features: [
      "Tudo do plano Clínica",
      "Múltiplas unidades",
      "API de integração",
      "SLA 99,9% uptime",
      "Gerente de conta dedicado",
      "Treinamento in loco",
      "Customizações específicas",
    ],
    notIncluded: [],
  },
];

function CheckIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );
}

function XIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
    </svg>
  );
}

export default function PlanosPage() {
  const [annual, setAnnual] = useState(true);

  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-24 md:py-32">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-champagne/10 border border-champagne/20 mb-8"
            >
              <span className="text-sm text-obsidian/80 font-medium">Planos flexíveis</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-cormorant text-5xl md:text-6xl lg:text-7xl font-semibold text-obsidian leading-[1.1]"
            >
              Invista no crescimento<br />da sua clínica.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-lg text-obsidian/60 max-w-2xl mx-auto"
            >
              Planos que escalam com seu negócio. Comece pequeno e cresça sem limites.
            </motion.p>

            {/* Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-10 flex items-center justify-center gap-4"
            >
              <span className={`text-sm ${!annual ? "text-obsidian" : "text-obsidian/50"}`}>Mensal</span>
              <button
                onClick={() => setAnnual(!annual)}
                className="relative w-14 h-7 rounded-full bg-obsidian/10 transition-colors"
              >
                <div className={`absolute top-1 w-5 h-5 rounded-full bg-champagne transition-all duration-300 ${annual ? "left-8" : "left-1"}`} />
              </button>
              <span className={`text-sm ${annual ? "text-obsidian" : "text-obsidian/50"}`}>
                Anual
                <span className="ml-2 px-2 py-0.5 rounded-full bg-champagne/20 text-[10px] text-obsidian font-medium">
                  -17%
                </span>
              </span>
            </motion.div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="pb-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {plans.map((plan, i) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative p-8 rounded-3xl ${
                    plan.popular
                      ? "bg-obsidian text-ivory ring-2 ring-champagne"
                      : "bg-white border border-obsidian/5"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-champagne text-obsidian text-sm font-medium rounded-full whitespace-nowrap">
                      Mais popular
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className={`font-cormorant text-2xl mb-2 ${plan.popular ? "text-ivory" : "text-obsidian"}`}>
                      {plan.name}
                    </h3>
                    <p className={`text-sm ${plan.popular ? "text-ivory/60" : "text-obsidian/60"}`}>
                      {plan.description}
                    </p>
                  </div>

                  <div className="mb-6">
                    <div className={`text-4xl font-cormorant ${plan.popular ? "text-champagne" : "text-obsidian"}`}>
                      {annual ? plan.annualPrice : plan.monthlyPrice}
                    </div>
                    <div className={`text-sm ${plan.popular ? "text-ivory/50" : "text-obsidian/50"}`}>
                      {plan.monthlyPrice !== "Sob consulta" ? "por mês, faturado anualmente" : "entre em contato"}
                    </div>
                  </div>

                  <LinkButton
                    href="/solicitar-acesso"
                    variant={plan.popular ? "primary" : "outline"}
                    className="w-full mb-8"
                    size="lg"
                  >
                    {plan.monthlyPrice === "Sob consulta" ? "Falar com vendas" : "Começar teste grátis"}
                  </LinkButton>

                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <CheckIcon className={`w-5 h-5 flex-shrink-0 ${plan.popular ? "text-champagne" : "text-deep-teal"}`} />
                        <span className={`text-sm ${plan.popular ? "text-ivory/80" : "text-obsidian/70"}`}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Not included */}
                  {plan.notIncluded.length > 0 && (
                    <div className="space-y-3 pt-6 border-t border-ivory/10">
                      {plan.notIncluded.map((feature) => (
                        <div key={feature} className="flex items-start gap-3">
                          <XIcon className="w-5 h-5 flex-shrink-0 text-obsidian/30" />
                          <span className={`text-sm ${plan.popular ? "text-ivory/40" : "text-obsidian/40"}`}>
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Preview */}
        <section className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-cormorant text-4xl md:text-5xl text-obsidian mb-4">
                Dúvidas comuns
              </h2>
            </motion.div>

            <div className="space-y-4">
              {[
                { q: "Posso mudar de plano depois?", a: "Sim, você pode fazer upgrade ou downgrade a qualquer momento. A diferença de valor é cobrada ou creditada proporcionalmente." },
                { q: "Tem período de fidelidade?", a: "Planos mensais não têm fidelidade. Planos anuais têm contrato de 12 meses com desconto especial." },
                { q: "Como funciona o teste grátis?", a: "Você tem 30 dias de acesso completo à plataforma, sem necessidade de cartão de crédito. Ao final, escolha seu plano." },
              ].map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-2xl bg-ivory border border-obsidian/5"
                >
                  <h3 className="font-cormorant text-lg text-obsidian mb-2">{faq.q}</h3>
                  <p className="text-obsidian/60 text-sm">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-deep-teal">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-cormorant text-4xl md:text-5xl text-ivory mb-6"
            >
              Comece grátis hoje
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-ivory/60 mb-10"
            >
              30 dias de teste. Sem cartão de crédito. Cancele quando quiser.
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
