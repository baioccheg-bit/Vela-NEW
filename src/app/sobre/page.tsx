"use client";

import { motion } from "framer-motion";
import { Navbar, Footer, LinkButton } from "@/components";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const milestones = [
  { year: "2023", event: "VELA nasce em São Paulo com uma missão: transformar a gestão de clínicas brasileiras com IA." },
  { year: "2024", event: "Lançamento dos Agentes VELA. Primeira clínica atinge R$ 100k/mês usando a plataforma." },
  { year: "2025", event: "1.000+ clínicas atendidas. R$ 89k MRR médio dos clientes. Expansão para todo Brasil." },
  { year: "2026", event: "Google for Startups. +200 clínicas premium. 8.6M+ tarefas automatizadas." },
];

const values = [
  {
    title: "Produto primeiro",
    description: "Acreditamos que um produto excepcional é a melhor forma de servir nossos clientes. Cada decisão passa pelo filtro: isso torna a experiência melhor?",
  },
  {
    title: "Parceiros de verdade",
    description: "Não somos fornecedores. Somos parceiros do crescimento da sua clínica. Seu sucesso é nosso sucesso — e isso está no nosso DNA.",
  },
  {
    title: "Transparência radical",
    description: "Dados claros, comunicações diretas, expectativas reais. Construímos confiança através da honestidade em cada interação.",
  },
  {
    title: "Inovação com propósito",
    description: "IA não é buzzword para nós. É ferramenta para resolver problemas reais. Cada feature nasce de uma dor concreta dos nossos clientes.",
  },
];

const team = [
  { name: "Time de Produto", role: "Engenharia, Design e IA" },
  { name: "Time de Sucesso", role: "Atendimento e Onboarding" },
  { name: "Time Comercial", role: "Vendas e Parcerias" },
];

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-24 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-ivory via-white to-ivory" />
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-champagne/5 rounded-full blur-[120px]" />

          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="font-cormorant text-5xl md:text-6xl lg:text-7xl font-semibold text-obsidian leading-[1.1] mb-6">
                Inteligência que ilumina<br />negócios.
              </h1>
              <p className="text-lg text-obsidian/60 max-w-2xl mx-auto">
                A VELA nasceu para resolver um problema real: clínicas excelentes perdendo tempo com gestão manual.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Story */}
        <section className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-lg max-w-none"
            >
              <p className="text-obsidian/70 leading-relaxed mb-6">
                Em 2023, nossos fundadores — vindos de experiências em saúde, tecnologia e operações —
                perceberam um padrão: clínicas brasileiras excelentes no atendimento, mas sobrecarregadas
                com tarefas manuais que consumiam horas preciosas.
              </p>
              <p className="text-obsidian/70 leading-relaxed mb-6">
                Planilhas, WhatsApp pessoal para agendamento, cobranças feitas manualmente, pacientes
                que faltavam sem aviso. O tempo que poderia ser dedicado a cuidar de pessoas estava
                sendo desperdiçado com burocracia.
              </p>
              <p className="text-obsidian/70 leading-relaxed">
                A VELA foi construída com uma convicção: <strong className="text-obsidian">automação inteligente liberta profissionais para fazerem o que fazem de melhor.</strong>
                Hoje, mais de 200 clínicas premium confiam na nossa plataforma para gerir suas operações
                enquanto focam no que realmente importa — transformar vidas.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Milestones */}
        <section className="py-24 bg-ivory">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-cormorant text-4xl md:text-5xl text-obsidian mb-4">
                Nossa jornada
              </h2>
            </motion.div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-champagne/30" />

              {milestones.map((milestone, i) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className={`relative flex items-center gap-8 mb-12 last:mb-0 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"} pl-20 md:pl-0`}>
                    <div className="inline-block">
                      <div className="text-4xl font-cormorant text-champagne mb-2">{milestone.year}</div>
                      <p className="text-obsidian/70">{milestone.event}</p>
                    </div>
                  </div>
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-champagne border-4 border-ivory" />
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-cormorant text-4xl md:text-5xl text-obsidian mb-4">
                Nossos valores
              </h2>
              <p className="text-obsidian/60 max-w-2xl mx-auto">
                Os princípios que guiam cada decisão da VELA.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, i) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 rounded-2xl bg-ivory border border-obsidian/5"
                >
                  <h3 className="font-cormorant text-xl text-obsidian mb-3">{value.title}</h3>
                  <p className="text-obsidian/60 leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-24 bg-deep-teal" id="carreiras">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-cormorant text-4xl md:text-5xl text-ivory mb-6">
                  Construa o futuro<br />das clínicas brasileiras.
                </h2>
                <p className="text-ivory/60 mb-8 leading-relaxed">
                  Estamos sempre em busca de pessoas talentosas que compartilhem nossa missão.
                  Se você acredita em produto, dados e impacto real, venha conversar.
                </p>
                <LinkButton href="#contato" variant="primary" size="lg">
                  Ver vagas abertas
                </LinkButton>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="grid gap-4"
              >
                {team.map((role) => (
                  <div
                    key={role.name}
                    className="p-6 rounded-2xl bg-obsidian/30 border border-ivory/10 flex items-center justify-between"
                  >
                    <div>
                      <div className="text-ivory font-medium">{role.name}</div>
                      <div className="text-ivory/50 text-sm">{role.role}</div>
                    </div>
                    <ArrowIcon className="w-5 h-5 text-champagne" />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Press */}
        <section className="py-24 bg-ivory" id="imprensa">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-cormorant text-4xl md:text-5xl text-obsidian mb-4">
                Na mídia
              </h2>
            </motion.div>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
              {["Valor Econômico", "StartSe", "CNBC", "Veja", "Empresas & Negócios"].map((logo) => (
                <div
                  key={logo}
                  className="text-obsidian/30 font-cormorant text-lg hover:text-obsidian/50 transition-colors"
                >
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-24 bg-white" id="contato">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-cormorant text-4xl md:text-5xl text-obsidian mb-6"
            >
              Vamos conversar?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-obsidian/60 mb-10"
            >
              Dúvidas sobre a VELA? Entre em contato com nosso time.
            </motion.p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:contato@vela.com.br"
                className="px-6 py-3 rounded-full bg-obsidian text-ivory hover:bg-obsidian/80 transition-colors"
              >
                contato@vela.com.br
              </a>
              <a
                href="tel:+5511999999999"
                className="px-6 py-3 rounded-full border border-obsidian/20 text-obsidian hover:border-champagne transition-colors"
              >
                (11) 99999-9999
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function ArrowIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 17L17 7M17 7H7M17 7V17" />
    </svg>
  );
}
