"use client";

import { motion } from "framer-motion";
import { Navbar, Footer, LinkButton } from "@/components";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export default function DocumentosPage() {
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
                  <span className="text-sm text-obsidian/80 font-medium">Central de Documentos</span>
                </div>
                <h1 className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-semibold text-obsidian leading-[1.1] mb-6">
                  Documentos organizados<br />e assinados.
                </h1>
                <p className="text-lg text-obsidian/60 mb-8 leading-relaxed">
                  Contratos, termos de consentimento e documentos operacionais com assinatura eletrônica integrada.
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
                    <h3 className="font-cormorant text-lg text-obsidian">Documentos Recentes</h3>
                    <span className="text-xs text-champagne font-medium">+ Novo</span>
                  </div>
                  <div className="space-y-3">
                    {[
                      { name: "Termo de Consentimento - Botox", type: "PDF", updated: "há 2 dias" },
                      { name: "Contrato de Prestação de Serviços", type: "PDF", updated: "há 5 dias" },
                      { name: "Anamnese Completa", type: "PDF", updated: "há 1 semana" },
                      { name: "Política de Cancelamento", type: "PDF", updated: "há 2 semanas" },
                    ].map((doc, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 rounded-xl hover:bg-obsidian/5 transition-colors cursor-pointer group">
                        <div className="w-10 h-10 rounded-lg bg-champagne/10 flex items-center justify-center">
                          <svg className="w-5 h-5 text-champagne" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-obsidian group-hover:text-champagne transition-colors">{doc.name}</div>
                          <div className="text-xs text-obsidian/50">{doc.updated}</div>
                        </div>
                        <span className="text-[10px] text-champagne bg-champagne/10 px-2 py-1 rounded-full">{doc.type}</span>
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
                Gestão documental completa
              </h2>
              <p className="text-obsidian/60 max-w-2xl mx-auto">
                Tudo que sua clínica precisa para operar com segurança e organização.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Assinatura eletrônica",
                  description: "Colete assinaturas digitais válidas juridicamente em qualquer dispositivo.",
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  ),
                },
                {
                  title: "Controle de versões",
                  description: "Mantenha histórico completo de alterações e recupere versões antigas.",
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  ),
                },
                {
                  title: "Pastas personalizadas",
                  description: "Organize documentos por categoria, profissional ou tipo de procedimento.",
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                  ),
                },
                {
                  title: "Permissões de acesso",
                  description: "Controle quem pode visualizar, editar ou assinar cada documento.",
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  ),
                },
                {
                  title: "Busca full-text",
                  description: "Encontre qualquer documento ou termo em segundos.",
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  ),
                },
                {
                  title: "Envio automático",
                  description: "Envie documentos para assinatura via WhatsApp ou e-mail automaticamente.",
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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
              Documentos sem papel
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
