# VELA — Project Intelligence for Claude Code

> **Regra zero:** o design da VELA está travado em `design.md` e `tokens.css` (gerados pelo skill Hallmark, revisão 2). Sua função é **implementar lógica e dados** seguindo o sistema existente. Você **não redesenha**, **não cria componentes equivalentes**, **não inventa tokens**, **não adiciona gradiente**, **não adiciona biblioteca de motion**, **não mexe no site institucional**.

---

## Antes de qualquer tarefa, leia nesta ordem

1. `README.md` — produto, fluxo de leads, estado atual
2. `design.md` — sistema de design travado (genre, tokens, motion stance, surface discipline, anti-patterns)
3. `tokens.css` — fonte da verdade dos tokens
4. `AGENTS.md` — regras de versão do Next.js
5. `prisma/schema.prisma` — modelo multi-tenant
6. A página vizinha mais parecida com o que você vai construir, em `src/app/demo/*/page.tsx`

> Se algo na sua memória conflitar com `design.md`, `design.md` ganha. Se algo conflitar com a versão do Next.js, leia `node_modules/next/dist/docs/`.

---

## Produto

- **Nome:** VELA
- **Pitch:** "Sua clínica opera sozinha. A plataforma e os agentes que cuidam da agenda, da cobrança e do WhatsApp do paciente — para que sua equipe cuide do atendimento."
- **Distribuição final:** app desktop empacotado com Tauri, baixado pelo cliente após pagar mensalidade. Hoje roda como web app no mesmo repo.
- **Idioma:** 100% pt-BR (UI, copy, mensagens de erro do usuário).
- **Tom:** direto, preciso, premium. Nunca ponto de exclamação, nunca emoji na UI, nunca copy genérico ("Bem-vindo", "Ótima escolha", "Estamos felizes em…").

### Agentes IA

| Agente | Domínio       | Status                          |
| ------ | ------------- | ------------------------------- |
| Júlia  | Agenda        | inbox no produto, sem WhatsApp  |
| Sofia  | Cobrança      | a wirear                        |
| Max    | Atendimento   | a wirear                        |
| Atlas  | Análise       | a wirear                        |

---

## Stack

- **Next.js 16** App Router · React 19 · React Compiler
- **TypeScript** strict
- **Tailwind CSS 4** com `@theme inline` referenciando `tokens.css`
- **Prisma 7 + PostgreSQL** (multi-tenant: `Clinic` + `Membership` + `User`)
- **NextAuth.js 4** (email+senha, magic link, Google, Microsoft)
- **Resend** (email transacional)
- **bcryptjs** (hash de senha)
- **OpenAI SDK 6** (instalado, ainda não wired)
- Para o empacotamento desktop: **Tauri 2** (em construção)

Sem motion library. Sem shadcn/ui. Sem Material/Chakra/Radix solto. Sem framer-motion. Nada além do que está no `package.json`.

---

## Sistema de design — leia `design.md` antes, este é o resumo operacional

### Tokens — usar apenas estes (definidos em `tokens.css`)

**Paper (backgrounds claros, cool-tinted):**
- `--color-paper-0` — `oklch(98.4% 0.004 220)` — background principal
- `--color-paper-1` — `oklch(96.2% 0.008 220)` — surfaces sutilmente diferenciadas
- `--color-paper-2` — `oklch(93.0% 0.013 220)` — divisores e fundos de input
- `--color-paper-3` — `oklch(89.0% 0.018 220)` — bordas e separadores fortes

**Ink (texto, fills escuros):**
- `--color-ink-0` — `oklch(18.0% 0.025 220)` — texto primário, CTAs sólidos
- `--color-ink-1` — `oklch(35.0% 0.020 220)` — texto secundário
- `--color-ink-2` — `oklch(52.0% 0.015 220)` — texto de apoio, labels
- `--color-ink-3` — `oklch(70.0% 0.010 220)` — estados desabilitados

**Accent — deep teal (única matriz cromática, sem companion):**
- `--color-accent` — `oklch(45.0% 0.110 195)` — destaque, hover do CTA primary
- `--color-accent-soft` — `oklch(62.0% 0.080 195)` — link, dot ON
- `--color-accent-deep` — `oklch(30.0% 0.060 195)` — background do tier featured
- `--color-accent-tint` — `oklch(94.0% 0.025 195)` — background sutil, hover de botão
- `--color-focus` — `oklch(40.0% 0.140 195)` — outline de foco

**Proibido:** qualquer outra cor. Sem `bg-red-*`, sem `bg-blue-*`, sem `bg-gray-*`, sem `bg-zinc-*`. Para erro, use `ink-2` + ícone. Sem companion (o Hallmark removeu o lime do Tally — não traga de volta).

### Tipografia — 3 famílias é o teto

- `--font-display` / `--font-body` → **Geist** (300–700)
- `--font-mono` → **Geist Mono** (labels uppercase, dados tabulares, eyebrows)
- `--font-italic` → **Instrument Serif** italic, **na cor accent**, **uma palavra por título** (hero h1, section heads, CTA titles, footer statement)

**Voz tipográfica:**
- Display: Geist 600, tracking `-0.025em` a `-0.035em` (mais tight em hero).
- Eyebrows e labels: Geist Mono, `letter-spacing: 0.12em`, uppercase.
- Italic accent: NUNCA mais de uma palavra por título. NUNCA em texto corrido. NUNCA em outra cor.

### Spacing & ritmo

- Sistema 4-pt.
- Type scale: 1.25 (major-third).
- Tudo derivado de `tokens.css`.

### Motion stance (CRÍTICO)

- ❌ **Sem biblioteca JS de motion.** Não usar framer-motion, motion-one, etc.
- ❌ **Sem `transition-all`.** Especifique a propriedade (`transition-colors`, `transition-opacity`, etc).
- ❌ **Sem hover-scale em cards.** Cards não crescem ao passar o mouse.
- ❌ **Sem easings "bouncy".** Apenas o ease definido: `--ease-out: cubic-bezier(0.22, 0.61, 0.36, 1)`.
- ✅ Animações ativas autorizadas: `pulse` (status dot, 1800ms infinite) e `marquee` (hero strip, 38s linear infinite). **Apenas estas duas no projeto.**
- ✅ Durações: `--dur-fast: 140ms`, `--dur-mid: 240ms`, `--dur-slow: 420ms`. Use estas.
- ✅ `prefers-reduced-motion`: marquee para; transitions caem para 140ms; animações desligam. Tem que continuar funcionando.

### Surface discipline

- ❌ **Sem gradientes.** Em backgrounds, fills ou bordas. Só cores sólidas.
- ❌ **Sem `backdrop-blur`** salvo no nav floating pill (única exceção).
- ✅ Hairlines (divisores finos): `color-mix(in oklch, var(--color-ink-0) 8%/14%, transparent)`.
- ✅ Shadows apenas em elementos elevados (cards, mockup, CTA pill), suaves: ex `0 24px 60px -28px rgba(20,50,60,0.22)`.

### Radius

- `--radius-md: 12px` — botões pequenos, badges
- `--radius-lg: 20px` — cards
- `--radius-xl: 28px` — surfaces grandes
- `--radius-pill: 999px` — pills, dots, avatares circulares

### CTA voice

- **Primary:** fill `--color-ink-0`, text `--color-paper-0`, pill radius, padding `14px / 22px`. Hover: bg vira `--color-accent`, `translateY(-1px)`.
- **Secondary:** ghost transparente, border `ink-0 @ 16%`, mesma pill radius.
- Em panel escuro (CTA panel): primary inverte (paper bg / ink text).

### Layout archetypes (locks do site institucional — **NÃO ALTERAR**)

- Nav: floating pill top-centered, content-sized, blur backdrop
- Hero: split diptych 1.45fr / 1fr, com card pure-CSS rotacionado 0.5°
- Section heads: 2-col grid (eyebrow+title à esquerda, descrição à direita)
- Pricing: 3 tiers, featured em `--color-accent-deep` com `scale(1.02)`
- Footer: statement (frase display + 4-col link grid + mono legal row)
- Wordmark only (Geist 600) — sem ícone ao lado do nome em nenhuma instância

---

## Estrutura de rotas

```
src/app/
├── (institucional — NÃO TOCAR)
│   ├── page.tsx              # landing (Marquee Hero + Workbench demo)
│   ├── plataforma/           # módulos
│   ├── agentes/              # Júlia, Sofia, Max, Atlas
│   ├── planos/
│   ├── sobre/
│   ├── entrar/               # login (consumir, não editar)
│   ├── solicitar-acesso/
│   ├── contratar/            # form de lead
│   ├── registrar/            # convite com token
│   └── admin/                # painel interno da equipe VELA
└── demo/                     # APP REAL (o que vai virar desktop com Tauri)
    ├── layout.tsx            # shell — sidebar + topbar
    ├── page.tsx              # visão geral (KPIs + receita + agendamentos)
    ├── agenda/               # grade semanal + lista de espera
    ├── pacientes/            # base filtrável + LTV + ticket médio
    ├── julia/                # inbox WhatsApp
    ├── components/           # componentes locais
    └── lib/mock-data.ts      # tipos + mocks
```

**Toda nova rota do produto autenticado entra em `src/app/demo/<rota>/page.tsx`** e herda o shell. Para registrar na sidebar, edite `navItems` em `src/app/demo/components/Sidebar.tsx`. Para o título dinâmico, edite `titles` em `src/app/demo/components/Topbar.tsx`.

---

## ❌ Off-limits — não editar sem autorização explícita

O site institucional está pronto. Não é seu escopo.

- `src/app/page.tsx`
- `src/app/plataforma/**`
- `src/app/agentes/**`
- `src/app/planos/**`, `src/app/sobre/**`
- `src/app/entrar/**`, `src/app/solicitar-acesso/**`, `src/app/contratar/**`, `src/app/registrar/**`
- `src/app/admin/**`
- `src/components/Navbar.tsx`, `src/components/Footer.tsx`
- `src/app/home.css`
- `docs/**`, `.hallmark/**`, `.stitch/**`
- `design.md`, `tokens.css` — só altere com pedido explícito ("estenda o design system para…")

Se uma mudança global (`next.config.ts`, `tsconfig.json`, `globals.css`, schema do Prisma) afetar essas áreas, **avise antes de aplicar** e mostre o diff.

---

## ✅ Componentes existentes — REUSE, não recrie

Antes de criar qualquer componente novo, rode:
```bash
ls src/components src/app/demo/components
grep -r "ComponenteSimilar" src/
```

### Compartilhados — `src/components/`
- `Button.tsx` → único botão permitido. Variantes conforme `design.md` (primary/secondary).
- `Navbar.tsx`, `Footer.tsx` — não tocar.

### App (`/demo`) — `src/app/demo/components/`
- `Sidebar.tsx` — navegação fixa
- `Topbar.tsx` — header sticky com título por rota
- `KPICard.tsx` — métrica com label + valor grande + delta
- `StatusBadge.tsx` — badge para `AppointmentStatus` (adicione status novo no `map` interno, não duplique)
- `AppointmentsTable.tsx` — referência para qualquer tabela nova
- `RevenueChart.tsx` — referência para gráficos

### Tipos & utils — `src/app/demo/lib/mock-data.ts`
Todos os tipos de domínio (`Appointment`, `Patient`, `Conversation`, `KPI`, etc.) e formatadores (`formatBRL`) estão centralizados aqui. Importe daqui, não redefina.

Se precisar de uma variante de componente, **estenda via prop**, não duplique.

---

## Roadmap (estado atual)

- [x] Site institucional (Marquee Hero + Workbench demo, revisão 2 Hallmark)
- [x] Sistema de design travado (`design.md` + `tokens.css`)
- [x] App rodando em `/demo` — 4 rotas no design system Vela
- [x] Schema multi-tenant + fluxo de leads end-to-end
- [ ] Refator das rotas legacy (plataforma, agentes) para o novo design system
- [ ] Onboarding wizard pós-registro
- [ ] WhatsApp Business API (Júlia em produção)
- [ ] Pix automático (Sofia em produção)
- [ ] Conciliação automática (Atlas em produção)
- [ ] Stripe + Mercado Pago (Subscription real)
- [ ] NF-e via parceiro
- [ ] Empacotamento desktop com Tauri + auto-update

---

## Workflow obrigatório

1. Confirme com o usuário o que vai fazer.
2. Leia os arquivos relevantes (`design.md`, `tokens.css`, página vizinha, componentes a reusar).
3. Liste os arquivos que vai criar/editar **antes** de tocar em nada.
4. Implemente seguindo os tokens e padrões — sem improvisar.
5. Rode `npm run lint`. Não pode quebrar.
6. Resuma o que foi feito.

---

## Regras invioláveis (cheat sheet)

- ❌ Não crie `tailwind.config.ts` — Tailwind 4 usa `@theme inline` em `globals.css`.
- ❌ Não use bibliotecas de UI fora do `package.json`.
- ❌ Não use `bg-gray-*`, `bg-zinc-*`, `bg-slate-*`, `bg-red-*`, `bg-blue-*` etc — só tokens da marca.
- ❌ Não use gradiente em nada (background, border, text).
- ❌ Não use `transition-all`, `hover:scale-*`, easings bouncy.
- ❌ Não introduza biblioteca de motion.
- ❌ Não use emoji na UI.
- ❌ Não use `!important`.
- ❌ Não use ponto de exclamação em copy de produto.
- ❌ Não escreva nada em inglês na UI.
- ❌ Não mexa nas rotas listadas como off-limits.
- ❌ Não invente métricas. Se não tem o número real, use `—` com label "métrica a confirmar".
- ✅ Server Components por padrão. `"use client"` só quando preciso (estado, efeito, evento).
- ✅ TypeScript strict — sem `any`, sem `@ts-ignore`.
- ✅ Toda string visível ao usuário em pt-BR.
- ✅ Italic Instrument Serif: 1 palavra por título, na cor accent, nunca em texto corrido.
- ✅ Reduce-motion tem que continuar funcionando.
