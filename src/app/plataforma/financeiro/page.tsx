"use client";

import { motion } from "framer-motion";
import { Navbar, Footer, LinkButton } from "@/components";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export default function FinanceiroPage() {
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
                  <span className="text-sm text-obsidian/80 font-medium">Financeiro</span>
                </div>
                <h1 className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-semibold text-obsidian leading-[1.1] mb-6">
                  Controle financeiro<br />automatizado.
                </h1>
                <p className="text-lg text-obsidian/60 mb-8 leading-relaxed">
                  Esqueça as planilhas. A VELA automatiza cobranças, reconcilia pagamentos e emite notas fiscais — tudo integrado ao seu fluxo de trabalho.
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
                className="relative"
              >
                <div className="bg-obsidian rounded-2xl shadow-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-cormorant text-ivory">Fluxo de Caixa</h3>
                    <span className="text-xs text-ivory/50">Últimos 30 dias</span>
                  </div>
                  <div className="space-y-4">
                    {[
                      { label: "Receitas", value: "R$ 47.280", change: "+12%", positive: true },
                      { label: "Despesas", value: "R$ 18.450", change: "-3%", positive: true },
                      { label: "Saldo", value: "R$ 28.830", change: "+18%", positive: true },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between p-4 rounded-xl bg-ivory/5">
                        <div>
                          <div className="text-sm text-ivory/50">{item.label}</div>
                          <div className="text-xl font-cormorant text-ivory">{item.value}</div>
                        </div>
                        <span className={`text-sm font-medium ${item.positive ? "text-champagne" : "text-red-400"}`}>
                          {item.change}
                        </span>
                      </div>
                    ))}
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
                Tudo sob controle
              </h2>
              <p className="text-obsidian/60 max-w-2xl mx-auto">
                Ferramentas completas para gestão financeira da sua clínica.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Cobrança automática",
                  description: "Envie links de pagamento por WhatsApp e e-mail automaticamente após cada consulta.",
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  ),
                },
                {
                  title: "Reconciliação bancária",
                  description: "Importe extratos e concilie pagamentos automaticamente com inteligência.",
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  ),
                },
                {
                  title: "Notas fiscais",
                  description: "Emissão automática de NFSe integrada ao seu regime tributário.",
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
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

        {/* CTA */}
        <section className="py-24 bg-deep-teal">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-cormorant text-4xl md:text-5xl text-ivory mb-6"
            >
              Financeiro sem complicação
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-ivory/60 mb-10"
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
