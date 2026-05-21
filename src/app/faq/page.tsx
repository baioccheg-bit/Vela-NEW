"use client";

import { VelaNav } from "@/components/VelaNav";
import { VelaFooter } from "@/components/VelaFooter";
import Link from "next/link";
import { useState } from "react";
import "../home.css";

type Group = {
  title: string;
  items: { q: string; a: React.ReactNode }[];
};

const GROUPS: Group[] = [
  {
    title: "Sobre a Vela",
    items: [
      {
        q: "O que é a Vela exatamente?",
        a: (
          <>
            Vela é uma plataforma de gestão para clínicas brasileiras com{" "}
            agentes de IA embutidos. A plataforma cobre agenda, cobrança,
            prontuário básico, WhatsApp e relatórios. Os agentes (Júlia, Sofia,
            Max, Atlas) fazem o trabalho repetitivo que sua equipe não deveria
            estar fazendo: confirmar consulta, cobrar pagamento, responder
            dúvida básica, analisar churn.
          </>
        ),
      },
      {
        q: "A Vela substitui o sistema que eu já uso?",
        a: (
          <>
            Na maioria dos casos, sim. A Vela cobre agenda, prontuário básico,
            cobrança e relacionamento com o paciente. Sistemas verticais (raio-X
            digital, prescrição médica especializada) continuam onde estão — a
            Vela se integra com eles via API ou exportação.
          </>
        ),
      },
      {
        q: "Pra que tipo de clínica a Vela serve?",
        a: (
          <>
            Estamos focados em clínicas de estética, dermatologia, odontologia,
            fisioterapia, psicologia e clínicas multiprofissionais — qualquer
            operação onde agendamento, cobrança e relacionamento com paciente
            via WhatsApp são partes importantes da rotina. Se você tem entre 1
            e 50 profissionais, a Vela serve.
          </>
        ),
      },
    ],
  },
  {
    title: "Onboarding e migração",
    items: [
      {
        q: "Quanto tempo leva pra começar a operar?",
        a: (
          <>
            Em média 24 horas. Importamos sua agenda do Google Calendar, iCloud
            ou planilha; configuramos a Júlia com seus templates de mensagem;
            conectamos seu WhatsApp Business; e fazemos um teste no seu próprio
            número. No dia seguinte você está cobrando o primeiro paciente via
            Pix.
          </>
        ),
      },
      {
        q: "Preciso parar a operação durante a migração?",
        a: (
          <>
            Não. O setup acontece em paralelo. Sua agenda atual continua
            funcionando normalmente até você decidir cortar — a Vela só{" "}
            <em>complementa</em> primeiro, depois substitui quando você quiser.
          </>
        ),
      },
      {
        q: "Vocês treinam minha equipe?",
        a: (
          <>
            Sim. Uma sessão de 1h ao vivo com sua equipe via Google Meet, mais
            material em vídeo permanente no painel. Nos planos Clínica e Rede,
            você tem suporte humano respondendo no WhatsApp em até 4h úteis.
          </>
        ),
      },
    ],
  },
  {
    title: "Pagamento e contratos",
    items: [
      {
        q: "Como funcionam os planos?",
        a: (
          <>
            São três: Essencial (profissional autônomo), Clínica (2 a 5
            profissionais), Rede (múltiplas unidades). Sem fidelidade — você
            cancela quando quiser pelo painel. Os preços específicos a gente
            apresenta durante a conversa de contratação, depois de entender o
            tamanho da sua operação.
          </>
        ),
      },
      {
        q: "Como a Vela cobra do paciente?",
        a: (
          <>
            Pix, cartão de crédito (à vista ou recorrente) e boleto bancário.
            As taxas são as do gateway de pagamento — a Vela não cobra markup.
            Tudo via Sofia, sem o paciente sair da conversa do WhatsApp.
          </>
        ),
      },
      {
        q: "Posso testar antes de contratar?",
        a: (
          <>
            Sim. Oferecemos 14 dias de avaliação sem cartão de crédito. Você
            importa sua agenda, configura um agente e roda em produção. Se ao
            final do período não fizer sentido, é só não assinar — sem
            cobrança, sem ligação chata de retenção.
          </>
        ),
      },
    ],
  },
  {
    title: "Segurança e LGPD",
    items: [
      {
        q: "Meus dados estão seguros?",
        a: (
          <>
            Sim. Dados em repouso e em trânsito criptografados (AES-256 e
            TLS 1.3). Backups diários redundantes, hospedagem em São Paulo, log
            de auditoria por usuário, acesso por papel. Conformidade LGPD desde
            o primeiro dia.
          </>
        ),
      },
      {
        q: "Os dados do paciente ficam só na minha clínica?",
        a: (
          <>
            Sim. Cada clínica tem seu próprio ambiente lógico isolado. Os
            agentes treinam com os dados da sua clínica, mas o modelo não
            compartilha aprendizados com outras clínicas. Sua base de pacientes
            é sua — você pode exportar tudo a qualquer momento.
          </>
        ),
      },
      {
        q: "E se eu cancelar? O que acontece com os dados?",
        a: (
          <>
            Você baixa uma exportação completa (CSV + JSON estruturado) com
            todos os pacientes, agendamentos, cobranças e histórico de
            mensagens. 30 dias depois do cancelamento, removemos os dados dos
            nossos servidores em definitivo, conforme exigido pela LGPD.
          </>
        ),
      },
    ],
  },
  {
    title: "Integrações",
    items: [
      {
        q: "A Vela conecta com Google Calendar?",
        a: (
          <>
            Sim, sincronização bidirecional. Mesma coisa pra iCloud e Outlook.
            Você pode importar tudo de uma vez no onboarding ou manter
            sincronização contínua.
          </>
        ),
      },
      {
        q: "Funciona com minha máquina de cartão?",
        a: (
          <>
            A cobrança da Vela é digital (Pix + cartão online via gateway), pra
            o paciente pagar de qualquer lugar. Se você ainda usa máquina
            presencial, ela continua funcionando em paralelo — só lance o valor
            no painel manualmente e a conciliação cuida do resto.
          </>
        ),
      },
      {
        q: "Tem API pra eu integrar com outras ferramentas?",
        a: (
          <>
            Sim, API REST completa disponível no plano Rede. Para os outros
            planos, oferecemos integrações nativas com as ferramentas mais
            comuns (Google Calendar, Pix bancário, WhatsApp Business).
          </>
        ),
      },
    ],
  },
];

export default function FAQPage() {
  const [openKey, setOpenKey] = useState<string | null>("0-0");

  return (
    <>
      <VelaNav />
      <main>
        <section className="page-hero">
          <div className="container">
            <span className="eyebrow">Dúvidas frequentes</span>
            <h1 className="page-hero__title">
              As perguntas que clínicas <span className="italic-accent">fazem</span> antes de assinar.
            </h1>
            <p className="page-hero__sub">
              Se a sua dúvida não está aqui, manda no WhatsApp ou pede contato
              pelo formulário de contratação — respondemos em até 4 horas
              úteis, sempre por pessoa, nunca por chatbot.
            </p>
          </div>
        </section>

        <section className="faq-page">
          <div className="container">
            {GROUPS.map((group, gi) => (
              <div key={group.title} className="faq-group">
                <h2 className="faq-group__title">
                  <span className="faq-group__num">{String(gi + 1).padStart(2, "0")}</span>
                  {group.title}
                </h2>
                <dl className="faq-group__list">
                  {group.items.map((item, ii) => {
                    const key = `${gi}-${ii}`;
                    const isOpen = openKey === key;
                    return (
                      <div key={key} className="faq-item">
                        <dt>
                          <button
                            type="button"
                            className="faq-item__q"
                            aria-expanded={isOpen}
                            onClick={() => setOpenKey(isOpen ? null : key)}
                          >
                            <span>{item.q}</span>
                            <span className={`faq-item__icon ${isOpen ? "is-open" : ""}`} aria-hidden>
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                              </svg>
                            </span>
                          </button>
                        </dt>
                        <dd className={`faq-item__a ${isOpen ? "is-open" : ""}`}>
                          <div className="faq-item__a__inner">{item.a}</div>
                        </dd>
                      </div>
                    );
                  })}
                </dl>
              </div>
            ))}
          </div>
        </section>

        <section className="cta">
          <div className="container">
            <div className="cta__panel">
              <h2 className="cta__title">
                Sua dúvida não foi <span className="italic-accent">respondida</span>?
              </h2>
              <p className="cta__sub">
                Manda mensagem direto, ou peça contato pelo formulário — gente
                de verdade do nosso time vai te responder.
              </p>
              <div className="hero__ctas" style={{ justifyContent: "center" }}>
                <Link href="/contratar" className="btn btn--primary">
                  Falar com o time <span aria-hidden>→</span>
                </Link>
                <Link href="/contato" className="btn btn--ghost">
                  Outras formas de contato
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
