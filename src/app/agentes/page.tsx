"use client";

import { motion } from "framer-motion";
import { Navbar, Footer, LinkButton } from "@/components";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const agents = [
  {
    name: "Júlia",
    role: "Agendamento",
    specialty: "Especialista em conversão de agendamentos",
    description: "Júlia é sua primeira linha de atendimento. Ela conversa com pacientes via WhatsApp, agenda consultas, envia lembretes e confirmações, e trabalha para reduzir faltas com follow-up inteligente.",
    capabilities: [
      "Agendamento via WhatsApp",
      "Confirmação automática",
      "Lembretes inteligentes",
      "Reagendamento automático",
      "Lista de espera ativa",
      "Redução de no-show",
    ],
    gradient: "from-champagne to-amber-gold",
    stats: { metric: "38%", label: "redução de faltas" },
  },
  {
    name: "Sofia",
    role: "Relacionamento",
    specialty: "Especialista em retenção e pós-atendimento",
    description: "Sofia cuida do relacionamento com seus pacientes após cada visita. Ela envia mensagens de follow-up, campanhas de reativação e mantém seus pacientes engajados com sua clínica.",
    capabilities: [
      "Follow-up pós-consulta",
      "Campanhas de reativação",
      "Aniversários e datas especiais",
      "Pesquisa de satisfação",
      "Programa de fidelidade",
      "NPS automático",
    ],
    gradient: "from-deep-teal to-champagne",
    stats: { metric: "2.5x", label: "mais retenção" },
  },
  {
    name: "Max",
    role: "Financeiro",
    specialty: "Especialista em cobranças e pagamentos",
    description: "Max automatiza todo o fluxo de cobranças da sua clínica. Ele envia links de pagamento, acompanha inadimplência e emite notas fiscais automaticamente.",
    capabilities: [
      "Links de pagamento",
      "Cobrança recorrente",
      "Aviso de vencimento",
      "Negociação automática",
      "Emissão de NFSe",
      "Reconciliação",
    ],
    gradient: "from-amber-gold to-deep-teal",
    stats: { metric: "65%", label: "menos inadimplência" },
  },
  {
    name: "Atlas",
    role: "Analytics",
    specialty: "Especialista em inteligência de negócios",
    description: "Atlas transforma dados em insights acionáveis. Ele monitora KPIs, identifica tendências e sugere ações para melhorar a performance da sua clínica.",
    capabilities: [
      "Dashboards em tempo real",
      "Previsão de faturamento",
      "Análise de ocupação",
      "Segmentação de pacientes",
      "Alertas inteligentes",
      "Relatórios personalizados",
    ],
    gradient: "from-champagne to-deep-teal",
    stats: { metric: "40%", label: "mais eficiência" },
  },
];

function ArrowIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 17L17 7M17 7H7M17 7V17" />
    </svg>
  );
}

export default function AgentesPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
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
              <span className="text-sm text-obsidian/80 font-medium">IA especializada</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-cormorant text-5xl md:text-6xl lg:text-7xl font-semibold text-obsidian leading-[1.1]"
            >
              Conheça os agentes<br />
              <span className="gradient-text">VELA</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-lg text-obsidian/60 max-w-2xl mx-auto"
            >
              Quatro especialistas em IA trabalhando 24/7 para otimizar cada aspecto da sua clínica.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-10"
            >
              <LinkButton href="/solicitar-acesso" size="lg">
                Conhecer agentes
              </LinkButton>
            </motion.div>
          </div>
        </section>

        {/* Agents Grid */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-6">
              {agents.map((agent, i) => (
                <motion.div
                  key={agent.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative p-8 rounded-3xl bg-ivory border border-obsidian/5 hover:border-champagne/30 transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ backgroundImage: `linear-gradient(135deg, rgba(201, 169, 110, 0.08), transparent)` }} />

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${agent.gradient} flex items-center justify-center text-obsidian shadow-lg`}>
                        <span className="font-cormorant text-2xl font-bold">{agent.name.charAt(0)}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-cormorant text-champagne">{agent.stats.metric}</div>
                        <div className="text-xs text-obsidian/50">{agent.stats.label}</div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="mb-6">
                      <h3 className="font-cormorant text-2xl text-obsidian mb-1">{agent.name}</h3>
                      <div className="text-sm text-champagne font-medium mb-2">{agent.role}</div>
                      <p className="text-obsidian/60 text-sm leading-relaxed">{agent.description}</p>
                    </div>

                    {/* Capabilities */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {agent.capabilities.slice(0, 4).map((cap) => (
                        <span
                          key={cap}
                          className="px-3 py-1.5 rounded-full bg-white border border-obsidian/5 text-xs text-obsidian/70"
                        >
                          {cap}
                        </span>
                      ))}
                      {agent.capabilities.length > 4 && (
                        <span className="px-3 py-1.5 rounded-full bg-obsidian/5 text-xs text-obsidian/50">
                          +{agent.capabilities.length - 4}
                        </span>
                      )}
                    </div>

                    {/* CTA */}
                    <LinkButton href={`/agentes/${agent.name.toLowerCase()}`} variant="outline" size="sm">
                      Conheça {agent.name} <ArrowIcon className="w-4 h-4 ml-1" />
                    </LinkButton>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-24 bg-ivory">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-cormorant text-4xl md:text-5xl text-obsidian mb-4">
                Como os agentes funcionam
              </h2>
              <p className="text-obsidian/60 max-w-2xl mx-auto">
                Cada agente é treinado com dados reais de clínicas brasileiras e se adapta ao seu fluxo de trabalho.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: "01", title: "Integração", desc: "Conectamos com seu WhatsApp, calendário e sistema atual." },
                { step: "02", title: "Treinamento", desc: "Os agentes aprendem suas regras de negócio e preferências." },
                { step: "03", title: "Automação", desc: "Eles começam a trabalhar automaticamente, 24 horas por dia." },
              ].map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="text-center"
                >
                  <div className="text-5xl font-cormorant text-champagne/30 mb-4">{item.step}</div>
                  <h3 className="font-cormorant text-xl text-obsidian mb-2">{item.title}</h3>
                  <p className="text-obsidian/60 text-sm">{item.desc}</p>
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
              Sua equipe está completa
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-ivory/60 mb-10"
            >
              Adicione os agentes VELA ao seu time hoje mesmo.
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
