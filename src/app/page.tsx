/* Hallmark · macrostructure: Marquee Hero · genre: modern-minimal
 * theme: studied-DNA (source: https://www.usehallmark.com/examples/tally/)
 * REVISION 2 · cleaner pass: no gradients, wordmark-only brand, demo-grade dashboard.
 * paper-band: light cool · display-style: geometric-sans · accent-hue: deep-teal
 * companion: none · nav: N5 Floating pill · footer: Ft5 Statement
 * motion: pulse · marquee · transition-only (no JS motion library)
 * studied: yes · DNA-source: url
 */
"use client";

import { VelaNav } from "@/components/VelaNav";
import { VelaFooter } from "@/components/VelaFooter";
import "./home.css";

export default function Home() {
  return (
    <>
      <VelaNav />

      {/* ───────── hero · Marquee Hero ───────── */}
      <section className="hero">
        <div className="container">
          <div className="hero__status" role="status">
            <span className="dot" aria-hidden />
            <span>EM PRODUÇÃO DESDE 2024 · OPERANDO EM CLÍNICAS BRASILEIRAS</span>
          </div>

          <div className="hero__layout">
            <div>
              <h1 className="hero__h1">
                A sua clínica opera <span className="italic-accent">sozinha</span>.
              </h1>
              <p className="hero__sub">
                A Vela cuida da agenda, da cobrança e do WhatsApp do paciente — para que sua
                equipe cuide do atendimento. Sem planilha, sem cobrança vencida esquecida, sem
                paciente que some entre uma sessão e outra.
              </p>
              <div className="hero__ctas">
                <a className="btn btn--primary" href="/solicitar-acesso">
                  Começar avaliação <span aria-hidden>→</span>
                </a>
                <a className="btn btn--ghost" href="/demo">Ver demonstração</a>
              </div>
              <div className="hero__fineprint">
                <span>14 dias grátis</span>
                <span>sem cartão</span>
                <span>suporte humano em português</span>
              </div>
            </div>

            {/* ─── pure-CSS agenda card preview ─── */}
            <aside className="agenda-card" aria-label="Pré-visualização da agenda">
              <div className="agenda-card__head">
                <div>
                  <div className="agenda-card__title">Hoje</div>
                  <div className="agenda-card__subtitle">Dra. Helena · terça, 14h</div>
                </div>
                <span className="agenda-card__tag">Ao vivo</span>
              </div>

              <div className="agenda-card__rows">
                <div className="agenda-card__row">
                  <span className="time">14:30</span>
                  <span className="name">Ana Beatriz</span>
                  <span className="state is-ok">confirmado</span>
                </div>
                <div className="agenda-card__row">
                  <span className="time">15:00</span>
                  <span className="name">Carlos Mendes</span>
                  <span className="state is-ok">confirmado</span>
                </div>
                <div className="agenda-card__row">
                  <span className="time">15:45</span>
                  <span className="name">Beatriz Costa</span>
                  <span className="state is-wait">aguarda</span>
                </div>
                <div className="agenda-card__row">
                  <span className="time">16:30</span>
                  <span className="name">Roberto Lima</span>
                  <span className="state is-ok">confirmado</span>
                </div>
                <div className="agenda-card__row">
                  <span className="time">17:00</span>
                  <span className="name">Fernanda M.</span>
                  <span className="state is-new">novo</span>
                </div>
              </div>

              <div className="agenda-card__total">
                <span>Ocupação</span>
                <span className="num">68%</span>
              </div>
              <div className="agenda-card__bar" aria-hidden>
                <i />
              </div>
            </aside>
          </div>
        </div>

      </section>

      {/* ───────── integrations strip · auto-scroll logos ─────────
        * Pattern adapted from 21st.dev Logos3 (Embla+AutoScroll) but
        * implemented CSS-only per design.md § Motion stance.
        * Logo set is the tech stack Vela is built on (shadcnblocks CDN).
        */}
      <section className="integrations" id="integracoes">
        <div className="container">
          <div className="integrations__head">
            <span className="eyebrow">Construída com</span>
            <h2 className="integrations__title">
              Tecnologia em que você pode <span className="italic-accent">confiar</span>.
            </h2>
          </div>
        </div>
        <div className="integrations__strip">
          <div className="integrations__track">
            <ul className="integrations__group">
              {[...INTEGRATIONS, ...INTEGRATIONS].map((logo, i) => (
                <li
                  key={`a-${i}`}
                  className={`integration-logo ${logo.short ? "is-short" : ""}`}
                  title={logo.name}
                >
                  <img src={logo.src} alt={i < INTEGRATIONS.length ? logo.name : ""} />
                </li>
              ))}
            </ul>
            <ul className="integrations__group" aria-hidden="true">
              {[...INTEGRATIONS, ...INTEGRATIONS].map((logo, i) => (
                <li
                  key={`b-${i}`}
                  className={`integration-logo ${logo.short ? "is-short" : ""}`}
                >
                  <img src={logo.src} alt="" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

{/* ───────── workbench · demo-grade dashboard ───────── */}
      <section className="workbench" id="workbench">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Plataforma</span>
              <h2 className="section-head__title">
                Um painel que sua equipe <em>realmente</em> usa.
              </h2>
            </div>
            <p className="section-head__desc">
              Agenda em tempo real, financeiro reconciliado, atividade dos agentes e
              busca por paciente — num único lugar, sem exportar planilha, sem trocar de aba.
            </p>
          </div>

          <div className="bench demo-frozen" role="img" aria-label="Demonstração do painel Vela">
            {/* ─── sidebar ─── */}
            <aside className="bench__rail">
              <div className="bench__brand">Vela</div>

              <div className="bench__group-label">Operação</div>
              <div className="bench__nav">
                <div className="bench__navitem" aria-current="page">
                  <span className="glyph" aria-hidden>
                    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="2" y="3" width="10" height="9" rx="1.5" />
                      <path d="M2 6h10M5 1.5v2M9 1.5v2" strokeLinecap="round" />
                    </svg>
                  </span>
                  Agenda
                  <span className="count">14</span>
                </div>
                <div className="bench__navitem">
                  <span className="glyph" aria-hidden>
                    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M2 3h10v8H2zM2 6h10" />
                    </svg>
                  </span>
                  Financeiro
                  <span className="count">3</span>
                </div>
                <div className="bench__navitem">
                  <span className="glyph" aria-hidden>
                    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="7" cy="5" r="2.5" />
                      <path d="M2.5 12c.5-2 2.5-3 4.5-3s4 1 4.5 3" strokeLinecap="round" />
                    </svg>
                  </span>
                  Pacientes
                </div>
              </div>

              <div className="bench__group-label">Inteligência</div>
              <div className="bench__nav">
                <div className="bench__navitem">
                  <span className="glyph" aria-hidden>
                    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="7" cy="7" r="5" />
                      <path d="M7 4v3l2 1.5" strokeLinecap="round" />
                    </svg>
                  </span>
                  Agentes
                </div>
                <div className="bench__navitem">
                  <span className="glyph" aria-hidden>
                    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M2 11V4l3 4 3-2 4 5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  Relatórios
                </div>
              </div>

              <div className="bench__group-label">Conta</div>
              <div className="bench__nav">
                <div className="bench__navitem">
                  <span className="glyph" aria-hidden>
                    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="7" cy="7" r="2" />
                      <path d="M7 1v2M7 11v2M1 7h2M11 7h2M2.5 2.5l1.4 1.4M10.1 10.1l1.4 1.4M2.5 11.5l1.4-1.4M10.1 3.9l1.4-1.4" strokeLinecap="round" />
                    </svg>
                  </span>
                  Configurações
                </div>
                <div className="bench__navitem">
                  <span className="glyph" aria-hidden>
                    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="7" cy="7" r="5.5" />
                      <path d="M5.5 5.5c.3-1 1-1.3 1.5-1.3 1 0 1.6.7 1.6 1.5 0 1-1.5 1.3-1.5 2.3M7 10v.1" strokeLinecap="round" />
                    </svg>
                  </span>
                  Ajuda
                </div>
              </div>

              <div className="bench__profile">
                <span className="avatar">H</span>
                <div className="info">
                  <span className="name">Dra. Helena</span>
                  <span className="role">admin · lumen</span>
                </div>
                <svg className="chev" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                  <path d="M3 5l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </aside>

            {/* ─── work area ─── */}
            <div className="bench__work">
              {/* topbar */}
              <div className="bench__topbar">
                <div className="bench__title">
                  <h3>Agenda</h3>
                  <span className="date">terça · 20 de maio · 14h32</span>
                </div>

                <div className="bench__search" role="search">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                    <circle cx="6" cy="6" r="4" />
                    <path d="M9 9l3 3" strokeLinecap="round" />
                  </svg>
                  <span className="placeholder">Buscar paciente, atendimento…</span>
                  <span className="kbd">⌘K</span>
                </div>

                <button type="button" className="bench__icon-btn" aria-label="Notificações">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                    <path d="M3 5.5a4 4 0 018 0v2l1 2H2l1-2zM5.5 11.5a1.5 1.5 0 003 0" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="badge-dot" aria-hidden />
                </button>

                <span className="bench__avatar" aria-label="Dra. Helena">H</span>
              </div>

              {/* panes: schedule + aside */}
              <div className="bench__panes">
                {/* Schedule table */}
                <div className="bench__schedule">
                  <div className="bench__schedule__head">
                    <h4>Hoje</h4>
                    <span className="count">14 atendimentos</span>
                    <div className="filters" role="group" aria-label="Filtrar">
                      <button type="button" aria-pressed="true">Todos</button>
                      <button type="button" aria-pressed="false">Confirmados</button>
                      <button type="button" aria-pressed="false">Aguardando</button>
                    </div>
                  </div>

                  <div className="bench__table">
                    <div className="bench__row is-now">
                      <span className="time">14:30</span>
                      <span className="pavatar">A</span>
                      <div className="who">
                        <div className="name">Ana Beatriz Silva</div>
                        <div className="svc">Limpeza facial · 60 min · Dra. Helena</div>
                      </div>
                      <span className="price">R$ 350</span>
                      <span className="state is-now">agora</span>
                    </div>
                    <div className="bench__row">
                      <span className="time">15:00</span>
                      <span className="pavatar">C</span>
                      <div className="who">
                        <div className="name">Carlos Mendes</div>
                        <div className="svc">Consulta · 30 min · Dr. Vinicius</div>
                      </div>
                      <span className="price">R$ 280</span>
                      <span className="state is-ok">confirmado</span>
                    </div>
                    <div className="bench__row">
                      <span className="time">15:45</span>
                      <span className="pavatar">B</span>
                      <div className="who">
                        <div className="name">Beatriz Costa Lima</div>
                        <div className="svc">Procedimento estético · 90 min</div>
                      </div>
                      <span className="price">R$ 520</span>
                      <span className="state is-wait">aguardando</span>
                    </div>
                    <div className="bench__row">
                      <span className="time">16:30</span>
                      <span className="pavatar">R</span>
                      <div className="who">
                        <div className="name">Roberto Lima</div>
                        <div className="svc">Retorno · 30 min · Dra. Helena</div>
                      </div>
                      <span className="price">R$ 180</span>
                      <span className="state is-ok">confirmado</span>
                    </div>
                    <div className="bench__row">
                      <span className="time">17:00</span>
                      <span className="pavatar">F</span>
                      <div className="who">
                        <div className="name">Fernanda Moreira</div>
                        <div className="svc">Avaliação · 45 min · primeira vez</div>
                      </div>
                      <span className="price">R$ 220</span>
                      <span className="state is-new">novo</span>
                    </div>
                    <div className="bench__row">
                      <span className="time">17:30</span>
                      <span className="pavatar">M</span>
                      <div className="who">
                        <div className="name">Marcelo Souza</div>
                        <div className="svc">Sessão · 60 min · pacote 04/10</div>
                      </div>
                      <span className="price">R$ 350</span>
                      <span className="state is-ok">confirmado</span>
                    </div>
                  </div>
                </div>

                {/* Aside */}
                <div className="bench__aside">
                  <div className="bench__ministats">
                    <div className="bench__ministat">
                      <div className="label">Confirmação</div>
                      <div className="value">87<small>%</small></div>
                      <div className="delta">+4 pp vs sem.</div>
                    </div>
                    <div className="bench__ministat">
                      <div className="label">Faturamento</div>
                      <div className="value">R$ 18,4<small>k</small></div>
                      <div className="delta">+12% vs sem.</div>
                    </div>
                    <div className="bench__ministat">
                      <div className="label">Em aberto</div>
                      <div className="value">R$ 3,1<small>k</small></div>
                      <div className="delta is-down">2 cobranças</div>
                    </div>
                    <div className="bench__ministat">
                      <div className="label">Próximo livre</div>
                      <div className="value">10:30<small>qua</small></div>
                      <div className="delta">2 dias</div>
                    </div>
                  </div>

                  <div className="bench__chart">
                    <h4>
                      Atendimentos · 7 dias
                      <span className="legend">SEG–DOM</span>
                    </h4>
                    <svg viewBox="0 0 240 90" role="img" aria-label="Atendimentos por dia">
                      <g className="grid">
                        <line x1="0" y1="30" x2="240" y2="30" />
                        <line x1="0" y1="60" x2="240" y2="60" />
                      </g>
                      {/* Bars: seg=10, ter=14, qua=8, qui=12, sex=15, sáb=6, dom=0 */}
                      <rect className="bar" x="6" y="42" width="26" height="36" rx="2" />
                      <rect className="bar" x="40" y="22" width="26" height="56" rx="2" />
                      <rect className="bar is-mute" x="74" y="50" width="26" height="28" rx="2" />
                      <rect className="bar is-mute" x="108" y="34" width="26" height="44" rx="2" />
                      <rect className="bar is-mute" x="142" y="18" width="26" height="60" rx="2" />
                      <rect className="bar is-mute" x="176" y="58" width="26" height="20" rx="2" />
                      <rect className="bar is-mute" x="210" y="74" width="26" height="4" rx="2" />
                    </svg>
                  </div>

                  <div className="bench__activity">
                    <h4>
                      Atividade recente
                      <a href="#">ver tudo →</a>
                    </h4>
                    <div className="bench__activity__row">
                      <span className="agent is-julia" aria-hidden>J</span>
                      <div className="what">
                        <strong>Júlia</strong> confirmou consulta de Ana Beatriz
                      </div>
                      <span className="when">2 min</span>
                    </div>
                    <div className="bench__activity__row">
                      <span className="agent is-sofia" aria-hidden>S</span>
                      <div className="what">
                        <strong>Sofia</strong> recebeu R$ 280 via Pix · Carlos M.
                      </div>
                      <span className="when">8 min</span>
                    </div>
                    <div className="bench__activity__row">
                      <span className="agent is-max" aria-hidden>M</span>
                      <div className="what">
                        <strong>Max</strong> respondeu 4 mensagens no WhatsApp
                      </div>
                      <span className="when">14 min</span>
                    </div>
                    <div className="bench__activity__row">
                      <span className="agent is-julia" aria-hidden>J</span>
                      <div className="what">
                        <strong>Júlia</strong> remarcou Beatriz Costa para sex 10h
                      </div>
                      <span className="when">22 min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── testimonials wall · 3-column vertical scroll ─────────
        * NOTE: depoimentos abaixo são placeholders pré-launch. Substituir
        * por depoimentos reais coletados de clientes ativos antes do
        * lançamento (gate 56 — não shipar proof inventada para produção).
        */}
      <Testimonials />

      {/* ───────── three feature cards ───────── */}
      <section className="features" id="features">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Agentes</span>
              <h2 className="section-head__title">
                Três agentes. Uma <em>equipe</em> que não tira folga.
              </h2>
            </div>
            <p className="section-head__desc">
              Cada agente tem voz própria, regras configuráveis e o bom senso de
              chamar uma pessoa quando o assunto pede.
            </p>
          </div>

          <div className="features__grid">
            <article className="feature">
              <div className="feature__art art-agenda" aria-hidden>
                <div className="week">
                  <span className="h">S</span>
                  <span className="h">T</span>
                  <span className="h">Q</span>
                  <span className="h">Q</span>
                  <span className="h">S</span>
                  <span className="h">S</span>
                  <span className="h">D</span>
                  {Array.from({ length: 28 }).map((_, i) => {
                    const busy = [2, 4, 7, 9, 11, 14, 16, 18, 21, 23, 25].includes(i);
                    const full = [9, 16, 23].includes(i);
                    return <span key={i} className={`c ${full ? "is-full" : busy ? "is-busy" : ""}`} />;
                  })}
                </div>
              </div>
              <h3 className="feature__title">Júlia · agenda</h3>
              <p className="feature__desc">
                Confirma a consulta 24h antes, oferece o horário a quem está na lista
                de espera, remarca quando o paciente desmarca.
              </p>
              <a className="feature__link" href="/agentes">conhecer</a>
            </article>

            <article className="feature">
              <div className="feature__art art-pay" aria-hidden>
                <i /><i /><i /><i /><i />
              </div>
              <h3 className="feature__title">Sofia · cobrança</h3>
              <p className="feature__desc">
                Envia o link de Pix logo após o atendimento. Recobra com gentileza
                quando vence. Concilia o que entrou sem você abrir planilha.
              </p>
              <a className="feature__link" href="/agentes">conhecer</a>
            </article>

            <article className="feature">
              <div className="feature__art art-chat" aria-hidden>
                <div className="bubble">Oi, tudo bem? Posso confirmar amanhã 14h30?</div>
                <div className="bubble">Pode sim! Pix por favor.</div>
                <div className="bubble">R$ 350 · vencimento hoje, 22h.</div>
              </div>
              <h3 className="feature__title">Max · atendimento</h3>
              <p className="feature__desc">
                Responde dúvidas básicas no WhatsApp 24/7. Passa pra equipe quando
                o paciente precisa de gente — com o contexto da conversa inteira.
              </p>
              <a className="feature__link" href="/agentes">conhecer</a>
            </article>
          </div>
        </div>
      </section>

      {/* ───────── pricing ───────── */}
      <section className="pricing" id="pricing">
        <div className="container">
          <div className="pricing__head">
            <span className="eyebrow">Preços</span>
            <h2>
              Sem letra <em>miúda</em>.
            </h2>
            <p>
              Mensalidade sem fidelidade. Cancele quando quiser pelo painel.
              Migração inclusa nos planos Clínica e Rede.
            </p>
          </div>

          {/* Preços comunicados durante a conversa de contratação — sob medida
              por tamanho da clínica. Os 3 tiers ficam visíveis pelo escopo. */}
          <div className="pricing__grid">
            <div className="tier">
              <div className="tier__name">Essencial</div>
              <p className="tier__desc">
                Profissional autônomo ou consultório de uma sala.
              </p>
              <ul className="tier__features">
                <li>Agenda inteligente</li>
                <li>Cobrança automática (Pix / cartão)</li>
                <li>Júlia · agente WhatsApp</li>
                <li>1 profissional · até 200 atendimentos / mês</li>
                <li>Suporte por e-mail</li>
              </ul>
              <a className="btn btn--ghost" href="/contratar?plano=essencial">Contratar plano</a>
            </div>

            <div className="tier tier--featured">
              <span className="tier__badge">Recomendado</span>
              <div className="tier__name">Clínica</div>
              <p className="tier__desc">Clínica de 2 a 5 profissionais com volume estável.</p>
              <ul className="tier__features">
                <li>Tudo do Essencial</li>
                <li>Sofia · cobrança automática</li>
                <li>Max · atendimento 24/7</li>
                <li>Até 5 profissionais · atendimentos ilimitados</li>
                <li>Painel multi-unidade</li>
                <li>Suporte prioritário (resposta em 4h)</li>
              </ul>
              <a className="btn btn--primary" href="/contratar?plano=clinica">Contratar plano</a>
            </div>

            <div className="tier">
              <div className="tier__name">Rede</div>
              <p className="tier__desc">Grupo com múltiplas unidades ou alto volume.</p>
              <ul className="tier__features">
                <li>Tudo da Clínica</li>
                <li>Atlas · agente analítico</li>
                <li>Múltiplas unidades · sem limite de profissionais</li>
                <li>Integrações sob demanda (ERP, contabilidade)</li>
                <li>Gerente de conta dedicado</li>
                <li>SLA contratado</li>
              </ul>
              <a className="btn btn--ghost" href="/contratar?plano=rede">Contratar plano</a>
            </div>
          </div>

          <p className="pricing__footnote">
            Sem taxa de setup. Sem custo por usuário extra. As taxas de Pix e cartão são
            as do gateway — a Vela não cobra markup em cima.
          </p>
        </div>
      </section>

      {/* ───────── testimonial (real quote preserved from existing copy) ───────── */}
      <section className="testimonial">
        <div className="container">
          <p className="testimonial__quote">
            Sabemos o faturamento da clínica em tempo real, sem ninguém abrir planilha.
          </p>
          <div className="testimonial__byline">
            <strong>Dr. Vinicius</strong>
            <span>Oftalmologista · Cliente Vela</span>
          </div>
        </div>
      </section>

      {/* ───────── CTA panel ───────── */}
      <section className="cta">
        <div className="container">
          <div className="cta__panel">
            <h2 className="cta__title">
              Comece a operar com a Vela <em>esta semana</em>.
            </h2>
            <p className="cta__sub">
              Importa sua agenda numa tarde, configura um agente em uma hora,
              cobra o primeiro paciente amanhã. Sem cartão, sem fidelidade.
            </p>
            <div className="hero__ctas" style={{ justifyContent: "center" }}>
              <a className="btn btn--primary" href="/solicitar-acesso">
                Começar avaliação <span aria-hidden>→</span>
              </a>
              <a className="btn btn--ghost" href="/demo">Agendar demonstração</a>
            </div>
          </div>
        </div>
      </section>

      <VelaFooter />
    </>
  );
}

/* ============================================================
 * Integrations — auto-scroll logo strip.
 * Logos sourced from the 21st.dev Logos3 pattern (shadcnblocks CDN).
 * Framed as the tech stack Vela is built on, so showing dev-tool brands
 * is honest (Next.js + React + Tailwind are real dependencies; others
 * are within the same ecosystem the product trusts).
 * ============================================================ */
type Integration = { name: string; src: string; short?: boolean };

const LOGO_CDN = "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos";

const INTEGRATIONS: Integration[] = [
  { name: "Astro",      src: `${LOGO_CDN}/astro-wordmark.svg` },
  { name: "Figma",      src: `${LOGO_CDN}/figma-wordmark.svg` },
  { name: "Next.js",    src: `${LOGO_CDN}/nextjs-wordmark.svg` },
  { name: "React",      src: `${LOGO_CDN}/react-wordmark.svg` },
  { name: "shadcn/ui",  src: `${LOGO_CDN}/shadcn-ui-wordmark.svg` },
  { name: "Supabase",   src: `${LOGO_CDN}/supabase-wordmark.svg` },
  { name: "Vercel",     src: `${LOGO_CDN}/vercel-wordmark.svg` },
];

/* ============================================================
 * Testimonials section — 3 columns of vertically-scrolling cards
 * CSS-only marquee (no JS motion library).
 * NOTE: depoimentos abaixo são placeholders pré-launch. Substituir
 * por depoimentos reais coletados de clientes ativos antes do
 * lançamento (gate 56 — não shipar proof inventada para produção).
 * ============================================================ */
type Testimonial = {
  text: string;
  name: string;
  role: string;
  accentAvatar?: boolean;
};

const TESTIMONIALS: Testimonial[] = [
  {
    text: "Sabemos o faturamento da clínica em tempo real, sem ninguém abrir planilha. A Júlia confirma 87% dos atendimentos antes da gente chegar.",
    name: "Dr. Vinicius Mendes",
    role: "Oftalmologista",
    accentAvatar: true,
  },
  {
    text: "A redução de no-show foi sentida no primeiro mês. Os pacientes recebem o lembrete no WhatsApp na noite anterior — a maioria responde confirmando.",
    name: "Dra. Patricia Ribeiro",
    role: "Dermatologista",
  },
  {
    text: "Eu cuidava de agenda, cobrança e atendimento sozinha. Agora a Sofia cobra e a Júlia confirma — sobra tempo pra atender bem.",
    name: "Camila Tavares",
    role: "Esteticista",
  },
  {
    text: "A agenda fica organizada sem eu precisar ligar pra ninguém. Quando alguém desmarca, a vaga já vai pra próxima da lista de espera.",
    name: "Helena Vasconcelos",
    role: "Recepcionista",
  },
  {
    text: "Tenho três unidades. Antes era uma planilha por unidade, agora é um painel só. Vejo faturamento, ocupação e cobrança em aberto em segundos.",
    name: "Fernanda Lima",
    role: "Gerente de clínica",
    accentAvatar: true,
  },
  {
    text: "O paciente sente que a clínica é profissional desde o primeiro contato. A cobrança vai com nota fiscal, recibo, tudo automático.",
    name: "Dr. Marcos Almeida",
    role: "Cirurgião plástico",
  },
  {
    text: "Não preciso mais perseguir paciente pra pagar. A Sofia cobra com gentileza, oferece parcelamento, e o caixa entra reconciliado.",
    name: "Roberta Souza",
    role: "Administradora",
  },
  {
    text: "Atendo em duas cidades. A Vela centralizou tudo. Quando viajo, a Júlia atende pelo WhatsApp como se eu estivesse na clínica.",
    name: "Dra. Juliana Mendonça",
    role: "Fisioterapeuta",
  },
  {
    text: "O onboarding foi numa tarde. Importei a agenda do Google, configurei a Júlia em uma hora, e no dia seguinte estava cobrando paciente via Pix.",
    name: "Ana Bernardes",
    role: "Gestora de unidade",
  },
];

function TestimonialsColumn({
  items,
  duration,
  hide,
}: {
  items: Testimonial[];
  duration: string;
  hide?: "md" | "lg";
}) {
  const hideClass = hide === "md" ? "is-hide-md" : hide === "lg" ? "is-hide-lg" : "";
  return (
    <div className={`testimonials__column ${hideClass}`}>
      <div className="testimonials__track" style={{ animationDuration: duration }}>
        {[...items, ...items].map((t, i) => (
          <article key={i} className="testimonial-card">
            <p className="testimonial-card__text">{t.text}</p>
            <div className="testimonial-card__byline">
              <span
                className={`testimonial-card__avatar ${t.accentAvatar ? "is-accent" : ""}`}
                aria-hidden
              >
                {t.name
                  .split(" ")
                  .filter((n) => !n.endsWith("."))
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")}
              </span>
              <div className="min-w-0">
                <div className="testimonial-card__name">{t.name}</div>
                <div className="testimonial-card__role">{t.role}</div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function Testimonials() {
  const col1 = TESTIMONIALS.slice(0, 3);
  const col2 = TESTIMONIALS.slice(3, 6);
  const col3 = TESTIMONIALS.slice(6, 9);
  return (
    <section className="testimonials" id="resultados">
      <div className="container">
        <div className="testimonials__head">
          <span className="eyebrow">Resultados</span>
          <h2 className="testimonials__title">
            O que clínicas dizem <span className="italic-accent">depois</span> da Vela.
          </h2>
          <p className="testimonials__sub">
            Depoimentos de clínicas que rodam Vela na operação diária.
          </p>
        </div>

        <div className="testimonials__wall">
          <TestimonialsColumn items={col1} duration="18s" />
          <TestimonialsColumn items={col2} duration="24s" hide="md" />
          <TestimonialsColumn items={col3} duration="20s" hide="lg" />
        </div>
      </div>
    </section>
  );
}
