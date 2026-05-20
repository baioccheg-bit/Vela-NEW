# Design — Vela

Sistema de design travado. Próximas execuções do Hallmark leem este arquivo
primeiro; páginas seguem o que está aqui. Altere de forma intencional — este
arquivo é a regra.

## System
- Genre · modern-minimal
- Macrostructure · Marquee Hero (com Workbench live-demo como segunda fold)
- Theme · studied-DNA (source: usehallmark.com/examples/tally — Tally exemplo)
- Axes · light-cool / geometric-sans / deep-teal
- Companion · none (accent-deep substitui no tier featured)

## Provenance
- Source mode · url
- Source · https://www.usehallmark.com/examples/tally/
- Extraction date · 2026-05-20
- Attestation · (b) referência pública para a marca do usuário
- Confidence · tokens são exatos (extraídos do CSS da fonte); fontes são exatas
  (declaradas via Google Fonts); ritmo é "unknown (URL mode)" — HTML sozinho não
  julga densidade. Hue de accent re-routeada de indigo cool para deep teal a
  pedido do usuário; companion lime removido em favor de uma única paleta teal
  com tints (accent-soft, accent-deep, accent-tint).

## Tokens (canônico · `tokens.css` é a fonte da verdade)
```css
:root {
  /* Paper · warm-tinted near-white, cool-leaning */
  --color-paper-0:   oklch(98.4% 0.004 220);
  --color-paper-1:   oklch(96.2% 0.008 220);
  --color-paper-2:   oklch(93.0% 0.013 220);
  --color-paper-3:   oklch(89.0% 0.018 220);

  /* Ink · cool near-black */
  --color-ink-0:     oklch(18.0% 0.025 220);
  --color-ink-1:     oklch(35.0% 0.020 220);
  --color-ink-2:     oklch(52.0% 0.015 220);
  --color-ink-3:     oklch(70.0% 0.010 220);

  /* Accent · deep teal (single chromatic hue, no companion) */
  --color-accent:      oklch(45.0% 0.110 195);
  --color-accent-soft: oklch(62.0% 0.080 195);
  --color-accent-deep: oklch(30.0% 0.060 195);  /* featured tier background */
  --color-accent-tint: oklch(94.0% 0.025 195);  /* CTA em, button hover bg   */
  --color-focus:       oklch(40.0% 0.140 195);

  /* Type · 3 famílias (o teto) */
  --font-display:  "Geist", ui-sans-serif, system-ui, sans-serif;
  --font-body:     "Geist", ui-sans-serif, system-ui, sans-serif;
  --font-mono:     "Geist Mono", ui-monospace, "SF Mono", Menlo, monospace;
  --font-italic:   "Instrument Serif", "Times New Roman", serif;

  /* Spacing 4-pt, type-scale 1.25 (major-third) — ver tokens.css */

  --ease-out: cubic-bezier(0.22, 0.61, 0.36, 1);
  --dur-fast: 140ms;  --dur-mid: 240ms;  --dur-slow: 420ms;

  --radius-md: 12px;  --radius-lg: 20px;  --radius-xl: 28px;  --radius-pill: 999px;
}
```

## CTA voice
- Primary · `--color-ink-0` fill, `--color-paper-0` text, pill radius, padding
  14px / 22px. Hover: bg vira `--color-accent`, translateY(-1px).
- Secondary · transparent ghost com border `ink-0 @ 16%`, mesma pill radius.
- Em panel escuro (CTA panel): primary inverte (paper bg / ink text).

## Typography voice
- Display: Geist 600, tracking -0.025em a -0.035em (mais tight em hero).
- Italic-accent: Instrument Serif italic em `--color-accent`, usado em UMA
  palavra dentro do display (hero h1, section heads, CTA title, footer
  statement). Nunca mais de uma palavra por título.
- Eyebrows e labels: Geist Mono, 0.12em letter-spacing, uppercase.

## Motion stance
- Sem biblioteca JS de motion. CSS keyframes + transitions apenas.
- Animações ativas: `pulse` (status dot, 1800ms infinite), `marquee` (hero
  strip, 38s linear infinite).
- Reduce-motion: marquee para; transitions caem para 140ms; animações desligam.
- Sem hover-scale em cards. Sem transition-all. Sem easings bouncy.

## Surface discipline
- Sem gradientes em backgrounds, fills ou bordas. Apenas cores sólidas.
- Hairlines via `color-mix(in oklch, --color-ink-0 8%/14%, transparent)`.
- Shadows somente em elementos elevados (cards, mockup, CTA pill) e suaves
  (ex: `0 24px 60px -28px rgba(20,50,60,0.22)`).
- Backdrop-filter (blur+saturate) permitido apenas no nav floating pill.

## Layout archetypes (lock)
- Nav · N5 Floating pill (top-centered, content-sized, blur backdrop)
- Hero · H2 Split Diptych 1.45fr / 1fr, com pure-CSS card rotacionado 0.5° à direita
- Section heads · 2-col grid (eyebrow+title à esquerda, descrição à direita)
- Pricing · 3 tiers, featured tier em `--color-accent-deep` com scale(1.02)
- Footer · Ft5 Statement (frase display em cima, 4-col link grid, mono legal row)

## Notes (anti-patterns a NÃO carregar adiante)
Da diagnose original do Tally:
- **Métricas inventadas.** O exemplo do Tally usa "42B+ events / 9.2× faster /
  $0.00 disputes" — são números fictícios. Para Vela, números reais ou
  marcadores `—` com label "métrica a confirmar". Gate 56 falha qualquer claim
  de proof inventado.
- **LIVE counter fake.** O pill "LIVE · METERING 12,847 EVENTS / SEC" do Tally
  faz sentido pra produto de metering. Vela não tem stream live de eventos —
  o pill foi traduzido para "EM PRODUÇÃO DESDE 2024".
- **Companion lime.** O Tally usa lime no tier featured, em uma stat card, e na
  italic da final CTA. Removido — teal com tints faz o mesmo trabalho.
- **Gradientes decorativos.** O Tally tem gradientes radiais no body, dotted
  grid mascarado no hero, e washes nos cards. Removidos na revisão 2 — Vela
  fica em sólidos puros.
- **Ícone ao lado do wordmark.** O Tally tem mark + nome. Vela é wordmark
  apenas (Geist 600), em todas as instâncias (nav, dashboard, footer).

## Exports
`tokens.css` (neste projeto) é a fonte da verdade. Para Tailwind v4 `@theme`,
DTCG `tokens.json`, ou shadcn/ui CSS variables, peça *"estenda design.md com
exports do Tailwind"* (ou o formato desejado) — Hallmark anexa per
`export-formats.md`.
