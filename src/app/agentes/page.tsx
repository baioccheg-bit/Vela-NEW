import { VelaNav } from "@/components/VelaNav";
import { VelaFooter } from "@/components/VelaFooter";
import Link from "next/link";
import "../home.css";

export const metadata = {
  title: "Agentes — Vela",
  description:
    "Conheça os agentes Vela: Júlia (agenda + WhatsApp), Sofia (cobrança), Max (atendimento) e Atlas (análise). Quatro membros da sua equipe que não tiram folga.",
};

type Agent = {
  name: string;
  role: string;
  tagline: string;
  description: string;
  abilities: string[];
  sample: { from: "agent" | "patient"; text: string }[];
};

const AGENTS: Agent[] = [
  {
    name: "Júlia",
    role: "Agenda · WhatsApp",
    tagline: "Confirma, remarca, oferece horário.",
    description:
      "A Júlia é quem fala com o paciente. Confirma a consulta 24h antes, oferece o horário vago pra lista de espera, remarca quando alguém desmarca. Tudo em português natural, sem cara de robô — porque ela aprende com cada interação da sua clínica.",
    abilities: [
      "Confirmação automática 24h antes",
      "Remarcação fluida no WhatsApp",
      "Lista de espera ativa",
      "Passagem pra equipe quando precisa",
    ],
    sample: [
      { from: "patient", text: "Oi, posso remarcar minha consulta de quinta?" },
      { from: "agent", text: "Claro, Mariana. Tenho sexta às 10:30 ou sábado às 09:30. Qual prefere?" },
      { from: "patient", text: "Sábado às 09:30 está ótimo." },
      { from: "agent", text: "Perfeito, confirmado pra sábado. Vou te lembrar na sexta à noite." },
    ],
  },
  {
    name: "Sofia",
    role: "Cobrança · Caixa",
    tagline: "Cobra, recebe, concilia.",
    description:
      "Sofia emite Pix, cartão e boleto. Manda o link logo após o atendimento, com gentileza. Cobra quem vence, oferece parcelamento, emite nota fiscal. O caixa entra reconciliado, sem ninguém abrir planilha — você abre o painel e vê o que entrou.",
    abilities: [
      "Pix gerado e enviado pelo agente",
      "Régua de cobrança automática",
      "Conciliação bancária no painel",
      "Nota fiscal emitida no mesmo fluxo",
    ],
    sample: [
      { from: "agent", text: "Sua sessão de hoje: R$ 350. Link de Pix abaixo." },
      { from: "agent", text: "https://pix.vela.com.br/inv-04212" },
      { from: "patient", text: "Pago." },
      { from: "agent", text: "Confirmado, recebi. NF-e enviada pro seu email." },
    ],
  },
  {
    name: "Max",
    role: "Atendimento · Plantão",
    tagline: "Responde 24/7. Passa o bastão quando precisa.",
    description:
      "Max é o atendimento de plantão. Responde dúvidas básicas (preços, horários, endereço, preparação pra procedimento), envia receituários e atestados quando autorizado, e quando o paciente pede algo que precisa de equipe humana, transfere com o contexto da conversa inteira — pessoa não repete nada.",
    abilities: [
      "Dúvidas básicas em segundos",
      "Envio de receituários e atestados",
      "Triagem inicial pra equipe",
      "Conversa nunca se perde",
    ],
    sample: [
      { from: "patient", text: "Posso comer antes do procedimento amanhã?" },
      { from: "agent", text: "Pra harmonização facial, jejum não é necessário. Só evite álcool nas 24h antes." },
      { from: "patient", text: "Perfeito, obrigada." },
      { from: "agent", text: "Imagina! Qualquer dúvida, é só chamar." },
    ],
  },
  {
    name: "Atlas",
    role: "Análise · Inteligência",
    tagline: "Vê padrões. Sugere ação.",
    description:
      "Atlas observa o histórico da clínica e diz o que ninguém estava olhando: paciente sumiu há 60 dias, procedimento X tem cancelamento muito alto às terças, profissional Y tem fila de espera enquanto Z tem horário vago. Sugere ação, você decide.",
    abilities: [
      "Alerta de paciente em risco de churn",
      "Recomendação de remarketing automático",
      "Análise de ocupação por profissional",
      "Relatórios mensais entregues no WhatsApp",
    ],
    sample: [
      { from: "agent", text: "Helena, 12 pacientes VIP não voltam há mais de 90 dias." },
      { from: "agent", text: "Sugiro mensagem de retorno com 15% de desconto. Posso enviar?" },
      { from: "patient", text: "Sim, pode mandar." },
      { from: "agent", text: "Enviado. Vou te avisar quando algum responder." },
    ],
  },
];

export default function AgentesPage() {
  return (
    <>
      <VelaNav />
      <main>
        {/* hero */}
        <section className="page-hero">
          <div className="container">
            <span className="eyebrow">Agentes</span>
            <h1 className="page-hero__title">
              Quatro agentes. Uma <span className="italic-accent">equipe</span> que não tira folga.
            </h1>
            <p className="page-hero__sub">
              Cada um com voz própria, regras configuráveis e o bom senso de
              chamar uma pessoa quando o assunto pede. Treinados na sua clínica,
              aprendendo com cada interação real, operando 24/7.
            </p>
            <div className="page-hero__ctas">
              <Link href="/contratar" className="btn btn--primary">
                Contratar plano <span aria-hidden>→</span>
              </Link>
              <Link href="/plataforma" className="btn btn--ghost">
                Ver a plataforma
              </Link>
            </div>
          </div>
        </section>

        {/* agent profiles */}
        {AGENTS.map((agent, idx) => (
          <section
            key={agent.name}
            className={`feature-row ${idx % 2 === 1 ? "feature-row--reverse" : ""}`}
          >
            <div className="container feature-row__inner">
              <div className="feature-row__text">
                <span className="eyebrow">{agent.role}</span>
                <h2 className="feature-row__title">
                  {agent.name}.{" "}
                  <span className="italic-accent">{agent.tagline.split(" ")[0]}</span>
                  {agent.tagline.slice(agent.tagline.split(" ")[0].length)}
                </h2>
                <p className="feature-row__desc">{agent.description}</p>
                <ul className="feature-row__points">
                  {agent.abilities.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>

              <div className="feature-row__visual">
                <AgentChat name={agent.name} messages={agent.sample} />
              </div>
            </div>
          </section>
        ))}

        {/* final CTA */}
        <section className="cta">
          <div className="container">
            <div className="cta__panel">
              <h2 className="cta__title">
                Sua equipe <span className="italic-accent">amplificada</span> em 24h.
              </h2>
              <p className="cta__sub">
                Os agentes Vela são configurados pelo nosso time durante o
                onboarding. Você define o tom, as regras, o horário. Eles
                executam — e aprendem com sua operação.
              </p>
              <div className="hero__ctas" style={{ justifyContent: "center" }}>
                <Link href="/contratar" className="btn btn--primary">
                  Contratar plano <span aria-hidden>→</span>
                </Link>
                <Link href="/faq" className="btn btn--ghost">
                  Tirar dúvidas
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <VelaFooter />
    </>
  );
}

function AgentChat({
  name,
  messages,
}: {
  name: string;
  messages: { from: "agent" | "patient"; text: string }[];
}) {
  return (
    <div className="mockup mockup--tilt-rev" style={{ maxWidth: 380 }}>
      <div className="mockup__head">
        <span className="mockup__avatar">{name[0]}</span>
        <div>
          <div className="mockup__title">{name}</div>
          <div className="mockup__subtitle">
            <span className="dot dot--green" aria-hidden /> ativa nesta conversa
          </div>
        </div>
      </div>
      <div className="mockup__chat">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`chat-bubble ${m.from === "agent" ? "chat-bubble--out" : "chat-bubble--in"}`}
          >
            {m.text}
          </div>
        ))}
      </div>
    </div>
  );
}
