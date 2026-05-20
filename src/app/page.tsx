/* Hallmark · macrostructure: Marquee Hero · genre: modern-minimal
 * theme: studied-DNA (source: https://www.usehallmark.com/examples/tally/)
 * REVISION 2 · cleaner pass: no gradients, wordmark-only brand, demo-grade dashboard.
 * paper-band: light cool · display-style: geometric-sans · accent-hue: deep-teal
 * companion: none · nav: N5 Floating pill · footer: Ft5 Statement
 * motion: pulse · marquee · transition-only (no JS motion library)
 * studied: yes · DNA-source: url
 */
"use client";

import { useState } from "react";
import "./home.css";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* ───────── nav · N5 Floating pill (wordmark only, no icon) ───────── */}
      <nav className="nav" aria-label="Principal">
        <a href="/" className="nav__brand">Vela</a>

        <div className="nav__links">
          <a className="nav__link" href="#workbench">Plataforma</a>
          <a className="nav__link" href="#features">Agentes</a>
          <a className="nav__link" href="#pricing">Preços</a>
          <a className="nav__link" href="#faq">FAQ</a>
        </div>

        <span className="nav__divider" aria-hidden />
        <a className="nav__signin" href="/entrar">Entrar</a>
        <a className="nav__cta" href="/solicitar-acesso">
          Começar <span aria-hidden>→</span>
        </a>

        <button
          type="button"
          className="nav__burger"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            {menuOpen ? (
              <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      <div className={`mobile-sheet ${menuOpen ? "is-open" : ""}`}>
        <a href="#workbench" onClick={() => setMenuOpen(false)}>Plataforma</a>
        <a href="#features" onClick={() => setMenuOpen(false)}>Agentes</a>
        <a href="#pricing" onClick={() => setMenuOpen(false)}>Preços</a>
        <a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a>
        <span className="divider" />
        <a href="/entrar" onClick={() => setMenuOpen(false)}>Entrar</a>
        <a href="/solicitar-acesso" onClick={() => setMenuOpen(false)}>Começar →</a>
      </div>

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

        {/* hero marquee strip */}
        <div className="hero__marquee" aria-hidden>
          <div className="hero__marquee__track">
            <span>Agenda inteligente</span>
            <span>Cobrança no Pix</span>
            <span>WhatsApp Business</span>
            <span>Nota fiscal</span>
            <span>Prontuário digital</span>
            <span>Multiunidade</span>
            <span>Agente Júlia</span>
            <span>Agenda inteligente</span>
            <span>Cobrança no Pix</span>
            <span>WhatsApp Business</span>
            <span>Nota fiscal</span>
            <span>Prontuário digital</span>
            <span>Multiunidade</span>
            <span>Agente Júlia</span>
          </div>
        </div>
      </section>

      {/* ───────── logos strip ───────── */}
      <section className="logos">
        <div className="container">
          <div className="logos__label">Construído para clínicas como</div>
          <div className="logos__row">
            {/* TODO: swap for real customer SVG logos when available */}
            <div className="l-1">Clínica Lumen</div>
            <div className="l-2">estética dom</div>
            <div className="l-3">VITA</div>
            <div className="l-4">AURORA</div>
            <div className="l-5">Norte</div>
            <div className="l-6">Sanare</div>
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

          <div className="bench" role="img" aria-label="Demonstração do painel Vela">
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

      {/* ───────── stats triplet (real numbers TBD — placeholders) ───────── */}
      <section className="stats">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Resultados</span>
              <h2 className="section-head__title">
                O que a Vela <em>devolve</em> pra sua clínica.
              </h2>
            </div>
            <p className="section-head__desc">
              Os números abaixo serão preenchidos com a média dos clientes reais antes do
              lançamento. Por enquanto, marcadores honestos no lugar de claims inventados.
            </p>
          </div>

          <div className="stats__grid">
            <div className="stats__card">
              <div className="stats__num is-placeholder">—</div>
              <div className="stats__label">redução de no-show</div>
              <div className="stats__note">
                Confirmações automáticas via WhatsApp + lista de espera ativa.
              </div>
              <span className="stats__placeholder-flag">métrica a confirmar</span>
            </div>

            <div className="stats__card">
              <div className="stats__num is-placeholder">—</div>
              <div className="stats__label">horas/semana economizadas</div>
              <div className="stats__note">
                Tempo que volta pra equipe quando agente faz a cobrança e a confirmação.
              </div>
              <span className="stats__placeholder-flag">métrica a confirmar</span>
            </div>

            <div className="stats__card">
              <div className="stats__num is-placeholder">—</div>
              <div className="stats__label">clínicas em operação</div>
              <div className="stats__note">
                Contagem real, atualizada mensalmente — sem &ldquo;mais de N&rdquo;.
              </div>
              <span className="stats__placeholder-flag">métrica a confirmar</span>
            </div>
          </div>
        </div>
      </section>

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

          {/*
            NOTE on pricing: placeholder amounts (R$ 297 / R$ 697 / R$ 1.497) match
            the Brazilian B2B clinic SaaS range. Confirm with the user before launch.
          */}
          <div className="pricing__grid">
            <div className="tier">
              <div className="tier__name">Essencial</div>
              <div className="tier__price">
                <span className="currency">R$</span>297<small>/ mês</small>
              </div>
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
              <a className="btn btn--ghost" href="/solicitar-acesso">Começar com Essencial</a>
            </div>

            <div className="tier tier--featured">
              <span className="tier__badge">Recomendado</span>
              <div className="tier__name">Clínica</div>
              <div className="tier__price">
                <span className="currency">R$</span>697<small>/ mês</small>
              </div>
              <p className="tier__desc">Clínica de 2 a 5 profissionais com volume estável.</p>
              <ul className="tier__features">
                <li>Tudo do Essencial</li>
                <li>Sofia · cobrança automática</li>
                <li>Max · atendimento 24/7</li>
                <li>Até 5 profissionais · atendimentos ilimitados</li>
                <li>Painel multi-unidade</li>
                <li>Suporte prioritário (resposta em 4h)</li>
              </ul>
              <a className="btn btn--primary" href="/solicitar-acesso">Começar com Clínica</a>
            </div>

            <div className="tier">
              <div className="tier__name">Rede</div>
              <div className="tier__price">
                <span className="currency">R$</span>1.497<small>/ mês</small>
              </div>
              <p className="tier__desc">Grupo com múltiplas unidades ou alto volume.</p>
              <ul className="tier__features">
                <li>Tudo da Clínica</li>
                <li>Atlas · agente analítico</li>
                <li>Múltiplas unidades · sem limite de profissionais</li>
                <li>Integrações sob demanda (ERP, contabilidade)</li>
                <li>Gerente de conta dedicado</li>
                <li>SLA contratado</li>
              </ul>
              <a className="btn btn--ghost" href="/solicitar-acesso">Começar com Rede</a>
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

      {/* ───────── footer · Ft5 Statement ───────── */}
      <footer className="footer">
        <div className="container">
          <p className="footer__statement">
            Software que devolve o <em>tempo</em> à sua clínica.
          </p>

          <div className="footer__row">
            <div className="footer__col">
              <h5>Produto</h5>
              <ul>
                <li><a href="/plataforma">Plataforma</a></li>
                <li><a href="/agentes">Agentes</a></li>
                <li><a href="#pricing">Preços</a></li>
                <li><a href="/demo">Demonstração</a></li>
              </ul>
            </div>
            <div className="footer__col">
              <h5>Empresa</h5>
              <ul>
                <li><a href="/sobre">Sobre</a></li>
                <li><a href="#">Contato</a></li>
                <li><a href="#">Carreiras</a></li>
              </ul>
            </div>
            <div className="footer__col">
              <h5>Legal</h5>
              <ul>
                <li><a href="#">Privacidade</a></li>
                <li><a href="#">Termos</a></li>
                <li><a href="#">LGPD</a></li>
              </ul>
            </div>
            <div className="footer__col">
              <h5>Conta</h5>
              <ul>
                <li><a href="/entrar">Entrar</a></li>
                <li><a href="/solicitar-acesso">Começar avaliação</a></li>
              </ul>
            </div>
          </div>

          <div className="footer__legal">
            <span className="wordmark">Vela</span>
            <span>{new Date().getFullYear()} © Vela · Hospedado em São Paulo · LGPD compliant</span>
          </div>
        </div>
      </footer>
    </>
  );
}
