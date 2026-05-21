import { VelaNav } from "@/components/VelaNav";
import { VelaFooter } from "@/components/VelaFooter";
import Link from "next/link";
import "../home.css";

export const metadata = {
  title: "Plataforma — Vela",
  description:
    "Uma plataforma só, conectando agenda, cobrança, WhatsApp, prontuário e múltiplas unidades. Operação em tempo real, controle por papel, integrações nativas.",
};

export default function PlataformaPage() {
  return (
    <>
      <VelaNav />
      <main>
        {/* ───────── hero ───────── */}
        <section className="page-hero">
          <div className="container">
            <span className="eyebrow">Plataforma</span>
            <h1 className="page-hero__title">
              Uma plataforma só. <span className="italic-accent">Todo o resto</span> some.
            </h1>
            <p className="page-hero__sub">
              Agenda, cobrança, prontuário, WhatsApp e múltiplas unidades operando
              no mesmo painel. Em tempo real. Sem exportar planilha. Sem trocar de
              aba. Sem pedir pro contador.
            </p>
            <div className="page-hero__ctas">
              <Link href="/contratar" className="btn btn--primary">
                Contratar plano <span aria-hidden>→</span>
              </Link>
              <Link href="/demo" className="btn btn--ghost">
                Ver pré-visualização
              </Link>
            </div>
          </div>
        </section>

        {/* ───────── feature 1 · agenda ───────── */}
        <section className="feature-row">
          <div className="container feature-row__inner">
            <div className="feature-row__text">
              <span className="eyebrow">Agenda</span>
              <h2 className="feature-row__title">
                A agenda que <span className="italic-accent">se mantém</span> sozinha.
              </h2>
              <p className="feature-row__desc">
                Confirmação 24h antes, lembrete 2h antes, lista de espera ativa
                quando alguém desmarca. Tudo via WhatsApp, em português natural.
                Não precisa ninguém ligando, lembrando, perseguindo.
              </p>
              <ul className="feature-row__points">
                <li><strong>Vista diária, semanal e mensal</strong> por profissional ou por unidade</li>
                <li><strong>Lista de espera inteligente</strong> que oferece vagas no momento certo</li>
                <li><strong>Bloqueios de horário</strong> (almoço, congresso, férias) num clique</li>
                <li><strong>Importação</strong> de Google Calendar, iCloud, planilha</li>
              </ul>
            </div>
            <div className="feature-row__visual">
              <FakeAgendaCard />
            </div>
          </div>
        </section>

        {/* ───────── feature 2 · cobrança ───────── */}
        <section className="feature-row feature-row--reverse">
          <div className="container feature-row__inner">
            <div className="feature-row__text">
              <span className="eyebrow">Cobrança</span>
              <h2 className="feature-row__title">
                Cobre. <span className="italic-accent">Receba</span>. Concilie.
              </h2>
              <p className="feature-row__desc">
                Pix gerado e enviado pelo agente Sofia logo após o atendimento.
                Cartão recorrente pra pacotes. Boleto pra quem prefere. Caixa
                entra reconciliado, sem ninguém abrir planilha.
              </p>
              <ul className="feature-row__points">
                <li><strong>Pix, cartão e boleto</strong> com as taxas do gateway (Vela não cobra markup)</li>
                <li><strong>Recorrência automática</strong> em pacotes parcelados</li>
                <li><strong>Régua de cobrança</strong> configurável (3 dias antes, no dia, 1 dia depois)</li>
                <li><strong>Notas fiscais</strong> emitidas e enviadas no mesmo fluxo</li>
              </ul>
            </div>
            <div className="feature-row__visual">
              <FakeBillingCard />
            </div>
          </div>
        </section>

        {/* ───────── feature 3 · WhatsApp ───────── */}
        <section className="feature-row">
          <div className="container feature-row__inner">
            <div className="feature-row__text">
              <span className="eyebrow">WhatsApp Business</span>
              <h2 className="feature-row__title">
                Atendimento que <span className="italic-accent">não dorme</span>.
              </h2>
              <p className="feature-row__desc">
                Conexão oficial WhatsApp Business API. A Júlia responde em português
                natural, agenda, remarca, cobra. Quando a conversa precisa de
                gente, ela passa pra equipe com o contexto inteiro — sem o
                paciente repetir nada.
              </p>
              <ul className="feature-row__points">
                <li><strong>Templates aprovados</strong> pra mensagens fora da janela de 24h</li>
                <li><strong>Inbox compartilhada</strong> pra toda a equipe ver as conversas</li>
                <li><strong>Tags + etiquetas</strong> pra organizar pacientes (VIP, em retorno, etc.)</li>
                <li><strong>Histórico permanente</strong> — nunca perde uma mensagem</li>
              </ul>
            </div>
            <div className="feature-row__visual">
              <FakeChatCard />
            </div>
          </div>
        </section>

        {/* ───────── live stats strip · "informações ao vivo" ───────── */}
        <section className="live-strip">
          <div className="container">
            <div className="live-strip__head">
              <span className="eyebrow">Em tempo real</span>
              <h2 className="live-strip__title">
                Toda decisão com <span className="italic-accent">o dado certo</span> na mão.
              </h2>
              <p className="live-strip__sub">
                Painel atualizado ao vivo. Faturamento, ocupação, no-show, cobrança
                em aberto, ranking de profissionais. Tudo enquanto você atende.
              </p>
            </div>
            <div className="live-strip__grid">
              <LiveStat label="Atendimentos hoje" value="14" unit="" delta="+2 vs ontem" pulse />
              <LiveStat label="Faturamento semana" value="R$ 18,4" unit="k" delta="+12% vs anterior" />
              <LiveStat label="Confirmação" value="87" unit="%" delta="+4 pp" />
              <LiveStat label="Em aberto" value="R$ 3,1" unit="k" delta="2 cobranças" muted />
            </div>
          </div>
        </section>

        {/* ───────── feature pair · multi-unidade + prontuário ───────── */}
        <section className="feature-pair">
          <div className="container feature-pair__inner">
            <article className="feature-pair__card">
              <span className="eyebrow">Multi-unidade</span>
              <h3 className="feature-pair__title">
                <span className="italic-accent">Uma</span> conta, várias clínicas.
              </h3>
              <p className="feature-pair__desc">
                Cada unidade com sua agenda, seu time, seu caixa. Mas tudo num
                painel só, com permissões por papel — gerente vê só sua unidade,
                proprietário vê tudo.
              </p>
            </article>
            <article className="feature-pair__card">
              <span className="eyebrow">Prontuário digital</span>
              <h3 className="feature-pair__title">
                Histórico <span className="italic-accent">limpo</span> e auditável.
              </h3>
              <p className="feature-pair__desc">
                Anotações por atendimento, anexos (fotos antes/depois, exames),
                evolução por paciente. Tudo criptografado, auditável, compliant
                com Conselho Federal de Medicina.
              </p>
            </article>
          </div>
        </section>

        {/* ───────── final CTA ───────── */}
        <section className="cta">
          <div className="container">
            <div className="cta__panel">
              <h2 className="cta__title">
                Pronta pra ver tudo isso <span className="italic-accent">funcionando</span>?
              </h2>
              <p className="cta__sub">
                Contrate o plano que faz sentido pra sua clínica. Nosso time entra
                em contato pelo WhatsApp e configura tudo em até 24h.
              </p>
              <div className="hero__ctas" style={{ justifyContent: "center" }}>
                <Link href="/contratar" className="btn btn--primary">
                  Contratar plano <span aria-hidden>→</span>
                </Link>
                <Link href="/demo" className="btn btn--ghost">
                  Ver pré-visualização
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

/* ─── visual mockups ─── */
function FakeAgendaCard() {
  const rows = [
    { time: "14:30", name: "Ana Beatriz", state: "agora", cls: "now" },
    { time: "15:00", name: "Carlos Mendes", state: "confirmado", cls: "ok" },
    { time: "15:45", name: "Beatriz Costa", state: "aguarda", cls: "wait" },
    { time: "16:30", name: "Roberto Lima", state: "confirmado", cls: "ok" },
    { time: "17:00", name: "Fernanda M.", state: "novo", cls: "new" },
  ];
  return (
    <div className="mockup mockup--tilt">
      <div className="mockup__head">
        <div>
          <div className="mockup__title">Hoje</div>
          <div className="mockup__subtitle">Dra. Helena · 14 atendimentos</div>
        </div>
        <span className="mockup__tag"><span className="dot" aria-hidden /> ao vivo</span>
      </div>
      <div className="mockup__rows">
        {rows.map((r) => (
          <div key={r.time} className={`mockup__row ${r.cls === "now" ? "is-now" : ""}`}>
            <span className="mockup__time">{r.time}</span>
            <span className="mockup__name">{r.name}</span>
            <span className={`mockup__state state--${r.cls}`}>{r.state}</span>
          </div>
        ))}
      </div>
      <div className="mockup__foot">
        <span>Ocupação</span>
        <span className="num">87%</span>
      </div>
    </div>
  );
}

function FakeBillingCard() {
  const rows = [
    { name: "Pacote estética · Beatriz Costa", val: "R$ 1.450", state: "Pago", cls: "ok" },
    { name: "Consulta · Carlos Mendes", val: "R$ 280", state: "Pago", cls: "ok" },
    { name: "Sessão · Roberto Lima", val: "R$ 350", state: "Aguarda", cls: "wait" },
    { name: "Pacote facial · Ana Beatriz", val: "R$ 2.100", state: "Pago", cls: "ok" },
  ];
  return (
    <div className="mockup">
      <div className="mockup__head">
        <div>
          <div className="mockup__title">Caixa de hoje</div>
          <div className="mockup__subtitle">Sofia · 14:32</div>
        </div>
        <span className="mockup__tag"><span className="dot" aria-hidden /> sincronizando</span>
      </div>
      <div className="mockup__big">R$ 4.180</div>
      <div className="mockup__bar" aria-hidden><i /></div>
      <div className="mockup__rows">
        {rows.map((r) => (
          <div key={r.name} className="mockup__row">
            <span className="mockup__name">{r.name}</span>
            <span className="mockup__price">{r.val}</span>
            <span className={`mockup__state state--${r.cls}`}>{r.state}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FakeChatCard() {
  return (
    <div className="mockup mockup--tilt-rev">
      <div className="mockup__head">
        <span className="mockup__avatar">A</span>
        <div>
          <div className="mockup__title">Ana Beatriz</div>
          <div className="mockup__subtitle">
            <span className="dot dot--green" aria-hidden /> Júlia ativa
          </div>
        </div>
      </div>
      <div className="mockup__chat">
        <div className="chat-bubble chat-bubble--in">Oi! Posso confirmar amanhã 14h30?</div>
        <div className="chat-bubble chat-bubble--out">Confirmado, Ana. Posso já te enviar o link de Pix?</div>
        <div className="chat-bubble chat-bubble--in">Pode sim</div>
        <div className="chat-bubble chat-bubble--out">Pronto. R$ 350 · vencimento hoje, 22h.</div>
      </div>
    </div>
  );
}

function LiveStat({
  label, value, unit, delta, pulse, muted,
}: {
  label: string; value: string; unit?: string; delta?: string; pulse?: boolean; muted?: boolean;
}) {
  return (
    <div className="live-stat">
      <div className="live-stat__head">
        <span className="live-stat__label">{label}</span>
        {pulse && <span className="live-stat__pulse" aria-hidden />}
      </div>
      <div className="live-stat__value">
        {value}{unit && <small>{unit}</small>}
      </div>
      {delta && <div className={`live-stat__delta ${muted ? "is-muted" : ""}`}>{delta}</div>}
    </div>
  );
}
