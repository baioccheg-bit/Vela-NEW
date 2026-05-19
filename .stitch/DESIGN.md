# Design System: VELA — Gestão Inteligente

**Projeto:** VELA SaaS — Plataforma AI-native para clínicas de estética  
**Tagline:** Inteligência que ilumina negócios  
**Projeto ID:** [inserir após criação no Stitch]

---

## 1. Visual Theme & Atmosphere

A VELA embody um **santuário dark premium** que combina a sofisticação de marcas de luxo com a precisão de uma plataforma data-first. A interface transmite **confiança silenciosa** — não grita, não implora atenção, mas comanda respeito através de uma estética refinada e minimalista.

O clima é **elegante e resultado-orientado**, com uma paleta escura que evoca exclusividade e profissionalismo. A filosofia de design é "menos é mais" — cada elemento tem propósito claro, whitespace generoso cria respiro entre conteúdo, e o dourado Champagne é usado com extrema moderação para máximo impacto.

**Características Principais:**
- Dark mode profundo como base (Obsidian #0A0A0A)
- Whitespace generoso criando hierarquia visual clara
- Toques de Champagne (#C9A96E) apenas em CTAs e momentos-chave
- Tipografia serifada elegante para headlines (Cormorant Garamond)
- Sans-serif limpa para UI e body (DM Sans)
- Monospace para dados e KPIs (DM Mono)
- Sombras whisper-soft para elevação sutil
- Nunca: azul, roxo, verde, exclamações, emojis, linguagem genérica

**Vibe Geral:** Sofisticado, confiante, data-first, premium, brasileiro, profissional.

---

## 2. Color Palette & Roles

### Fundação Escura
- **Obsidian Profundo** (#0A0A0A) — Background principal da página. Preto rico e profundo que cria base dramática e exclusiva. Usado em 80% da superfície da landing page.

### Superfícies Claras
- **Ivory Suave** (#F7F5F2) — Background para cards, containers elevados e seções de conteúdo que precisam de contraste. Cria ilusão de elevação sem sombras pesadas.

### Acentos Premium
- **Champagne Dourado** (#C9A96E) — **A cor da ação.** Exclusivamente para:
  - Botões CTA primários ("Começar grátis", "Entrar")
  - Links de ação primária
  - Estados hover em elementos interativos
  - Highlights de dados importantes
  - **Regra:** Usar com moderação. Máximo 3-5 elementos por tela.

### Dados e Confiança
- **Deep Teal** (#1A4A4A) — Acento secundário para:
  - Visualização de dados e gráficos
  - Elementos que comunicam confiança e estabilidade
  - Estados de sucesso em formulários
  - Badges e indicadores

### Tipografia em Fundo Claro
- **Amber Gold** (#B8943C) — Texto em superfícies Ivory:
  - Headlines em cards claros
  - Títulos de seção
  - Ênfase e destaque

### Hierarquia de Texto (Fundo Escuro)
- **Ivory Primário** (#F7F5F2) — Headlines e texto principal
- **Silver Secundário** (#9CA3AF) — Texto de corpo e labels
- **Slate Terciário** (#6B7280) — Texto mutado, placeholders, metadata

### Estados Funcionais (Reservado)
- **Sucesso Verde Escuro** (#065F46) — Confirmações, status ativo
- **Erro Terracotta** (#991B1B) — Erros críticos, alerts
- **Atenção Âmbar** (#92400E) — Warnings, estados pendentes

---

## 3. Typography Rules

### Família de Fontes

**Headlines: Cormorant Garamond (Serif)**
- Caráter: Elegante, clássica, luxuosa
- Uso: H1, H2, títulos de seção, logo
- Peso: 400 (Regular) a 600 (Semi-bold)
- Letter-spacing: 0.02em para headlines grandes

**UI/Body: DM Sans (Sans-serif)**
- Caráter: Moderna, geométrica, limpa
- Uso: Body copy, labels, navegação, botões
- Pesos: 200 (Extra Light), 300 (Light), 400 (Regular)
- Letter-spacing: Normal

**Data/Metrics: DM Mono (Monospace)**
- Caráter: Técnica, precisa, data-first
- Uso: KPIs, números, valores, tabelas de dados
- Peso: 400 (Regular)
- Letter-spacing: -0.01em para compactação

### Hierarquia Tipográfica

| Elemento | Família | Tamanho | Peso | Letter-spacing | Uso |
|----------|---------|---------|------|----------------|-----|
| H1 Hero | Cormorant | 3.5-4.5rem | 500 | 0.02em | Headline principal |
| H2 Seção | Cormorant | 2.5-3rem | 500 | 0.01em | Títulos de seção |
| H3 Card | Cormorant | 1.5-1.75rem | 400 | Normal | Títulos de cards |
| Body | DM Sans | 1rem | 300 | Normal | Texto de corpo |
| Labels | DM Sans | 0.875rem | 400 | 0.05em | Labels de formulário |
| Navegação | DM Sans | 1rem | 400 | 0.06em | Menu items |
| KPIs | DM Mono | 2-3rem | 400 | -0.01em | Números e métricas |
| Botões | DM Sans | 1rem | 500 | 0.05em | Textos de CTA |

### Princípios de Espaçamento
- Line-height: 1.2 para headlines, 1.6 para body
- Margens entre elementos de texto: 1-1.5rem
- Margens entre seções: 4-6rem
- Padding interno de cards: 2-2.5rem

---

## 4. Component Stylings

### Botões

**CTA Primário (Champagne)**
- Background: Champagne (#C9A96E)
- Text: Obsidian (#0A0A0A) em DM Sans Medium
- Shape: Subtly rounded (8px / rounded-lg)
- Padding: 0.875rem vertical, 2rem horizontal
- Hover: Darken para #B8943C com transição 250ms ease
- Focus: Outer glow em Champagne (#C9A96E40)
- Tamanho mínimo: 44x44px (touch-friendly)

**CTA Secundário (Outline)**
- Border: 1px em Champagne (#C9A96E)
- Background: Transparent
- Text: Champagne (#C9A96E)
- Hover: Background preenche com Champagne 10%
- Uso: "Ver demonstração", ações secundárias

**Botões de Navegação**
- Style: Ghost button, sem border
- Text: Ivory (#F7F5F2)
- Hover: Champagne sutil (20% opacity)

### Cards & Containers

**Cards de Features**
- Background: Ivory (#F7F5F2)
- Corners: Gently rounded (12px / rounded-xl)
- Shadow: Whisper-soft (`0 2px 8px rgba(0,0,0,0.08)`)
- Border: Opcional, 1px em Silver (#E5E7EB) se sem sombra
- Padding: 2.5rem interno
- Hover: TranslateY -4px + shadow enhanced (`0 8px 24px rgba(0,0,0,0.12)`)
- Transição: 250ms ease-in-out

**Hero Section Container**
- Background: Gradiente sutil de Obsidian (#0A0A0A) para #0F0F0F
- Padding: 6-8rem vertical, 3rem horizontal
- Max-width: 1440px centralizado

**Seções de Conteúdo**
- Alternância: Obsidian → Ivory → Obsidian para separação visual
- Padding vertical: 4-6rem entre seções
- Padding horizontal: 3rem (mobile: 1.5rem)

### Navegação

**Header Navigation**
- Style: Horizontal clean com logo à esquerda
- Logo: Cormorant Garamond, 1.5rem, weight 600, Champagne (#C9A96E)
- Menu items: DM Sans 1rem, weight 400, Ivory (#F7F5F2)
- Espaçamento: 2-3rem entre items
- Hover: Transição 200ms para Champagne
- Active: Underline 2px em Champagne
- Mobile: Hamburger menu com drawer sliding

**Mobile Navigation**
- Hamburger: 3 linhas em Ivory, 24x24px
- Drawer: Background Obsidian com overlay escuro
- Items: 3rem height, DM Sans 1.125rem
- Border-bottom: 1px em Silver sutil

### Formulários & Inputs

**Campos de Input**
- Background: Ivory (#F7F5F2) em fundo escuro
- Border: 1px em Silver (#9CA3AF)
- Corners: 8px (matching buttons)
- Padding: 0.875rem vertical, 1.25rem horizontal
- Text: Obsidian (#0A0A0A) em DM Sans
- Placeholder: Silver (#9CA3AF)
- Focus: Border Champagne (#C9A96E) + outer glow sutil
- Label: DM Sans 0.875rem, weight 400, Ivory acima do input

### Hero Section

**Estrutura**
- Layout: Centralizado, max-width 800px para texto
- Headline: Cormorant Garamond 4rem, weight 500, Ivory
- Subheadline: DM Sans 1.25rem, weight 300, Silver
- CTAs: Stack vertical em mobile, horizontal em desktop
- Background: Obsidian com gradiente radial sutil

### Feature Cards Grid

**Grid Layout**
- Colunas: 3 em desktop, 2 em tablet, 1 em mobile
- Gap: 2rem entre cards
- Card: Ivory background, 12px rounded corners
- Ícone: 48x48px, Champagne ou Deep Teal
- Título: Cormorant 1.5rem, Obsidian
- Descrição: DM Sans 1rem, Silver, line-height 1.6

### Prova Social

**Seção de Logos**
- Título: "Usado por clínicas em todo o Brasil"
- Layout: Grid horizontal de logos
- Style: Logos em grayscale (opacity 60%)
- Hover: Full color com transição 300ms
- Tamanho: 120-160px por logo

### Footer

**Estrutura**
- Background: Obsidian (#0A0A0A)
- Padding: 4rem vertical, 3rem horizontal
- Layout: 3 colunas (Logo + Sobre, Links, Social)
- Texto: Silver (#9CA3AF) DM Sans 0.875rem
- Links: Hover para Champagne
- Copyright: "VELA © 2026 — Gestão Inteligente"

---

## 5. Layout Principles

### Grid & Estrutura

**Max Content Width:** 1440px  
**Grid System:** 12-column responsive  
**Gutters:** 24px (mobile), 32px (desktop)

**Breakpoints:**
- Mobile: <768px (1 coluna)
- Tablet: 768-1024px (2 colunas)
- Desktop: 1024-1440px (3-4 colunas)
- Large Desktop: >1440px (max-width centralizado)

### Estratégia de Whitespace

**Unidade Base:** 8px

| Espaçamento | Valor | Uso |
|-------------|-------|-----|
| Micro | 8-16px | Entre elementos relacionados |
| Pequeno | 24-32px | Entre componentes |
| Médio | 48-64px | Entre seções secundárias |
| Grande | 80-128px | Entre seções principais |
| Hero | 128-192px | Padding vertical do hero |

**Edge Padding:**
- Mobile: 24px (1.5rem)
- Tablet: 32px (2rem)
- Desktop: 48-96px (3-6rem)

### Alinhamento & Balance Visual

- **Texto:** Left-aligned para body e navegação
- **Headlines Hero:** Centralizado
- **Cards:** Left-aligned em grid
- **CTAs:** Centralizados no hero, full-width em mobile
- **Imagens:** Full-bleed em cards, 16:9 ou 4:3 ratio

### Responsive Behavior

**Mobile-First:**
- Core experience perfeito em 375px
- Touch targets: 44x44px mínimo
- Font sizes escaláveis (16px base)
- Imagens responsive com lazy-loading

**Progressive Enhancement:**
- Colunas adicionais em breakpoints maiores
- Padding escala proporcionalmente
- Hero headline reduz de 4rem → 2.5rem em mobile

### Princípios de Design VELA

1. **Dark First:** Todo design começa com fundo Obsidian
2. **Champagne com Moderação:** Máximo 3-5 usos por tela
3. **Whitespace é Luxo:** Respirar > Preencher
4. **Tipografia Hierárquica:** Cormorant → DM Sans → DM Mono
5. **Data-First:** KPIs e números em DM Mono
6. **Português Sempre:** Todo texto em PT-BR
7. **Nunca:** Azul, roxo, verde, emojis, exclamações

---

## 6. Instruções para Geração no Stitch

### Prompt Template

```markdown
[Descrição da página e propósito]

**DESIGN SYSTEM (REQUIRED):**
- Platform: Web, Desktop-first
- Theme: Dark mode premium
- Background: Obsidian (#0A0A0A)
- Surface: Ivory (#F7F5F2) for cards
- Primary CTA: Champagne (#C9A96E)
- Text on Dark: Ivory (#F7F5F2)
- Typography: Cormorant headlines, DM Sans body, DM Mono data

**Page Structure:**
1. **Header:** [descrição]
2. **Hero:** [descrição]
3. **Content:** [descrição]
4. **Footer:** [descrição]
```

### Keywords para Usar

- "Dark premium sanctuary"
- "Generous breathing room"
- "Subtly rounded buttons"
- "Gently rounded cards"
- "Whisper-soft shadows"
- "Champagne gold accents"
- "Elegant serif headlines"
- "Clean sans-serif UI"
- "Monospace data display"

### Exemplo: Landing Page VELA

```markdown
Landing page premium para VELA — SaaS AI-native para clínicas de estética.
Vibe sofisticada, confiante, data-first. Dark mode luxuoso.

**DESIGN SYSTEM (REQUIRED):**
- Platform: Web, Desktop-first
- Theme: Dark mode, premium minimalist
- Background: Obsidian (#0A0A0A)
- Surface: Ivory (#F7F5F2) for feature cards
- Primary CTA: Champagne (#C9A96E) for buttons
- Secondary: Deep Teal (#1A4A4A) for data
- Text: Ivory (#F7F5F2) on dark, Amber Gold (#B8943C) on light
- Typography: Cormorant Garamond headlines, DM Sans body, DM Mono metrics
- Buttons: Subtly rounded (8px)
- Cards: Gently rounded (12px), whisper-soft shadows

**Page Structure:**
1. **Header:** Logo VELA em Cormorant Champagne (esquerda), navegação "Funcionalidades" "Planos" "Sobre" (centro), botão "Entrar" em Champagne (direita)
2. **Hero Section:** Headline "Inteligência que ilumina negócios" em Cormorant 4rem Ivory, subheadline "Gestão inteligente para clínicas..." em DM Sans Silver, CTA primário "Começar grátis" em Champagne
3. **Features Grid:** 3 cards em Ivory com: "Agenda com Júlia IA", "Dashboard KPIs", "IA Nativa" — ícones em Champagne, títulos em Cormorant, descrições em DM Sans
4. **Social Proof:** "Usado por clínicas no Brasil" com logos em grayscale
5. **Footer:** Links Sobre/Preços/Contato, social icons, "VELA © 2026"
```

---

**Nota:** Este arquivo DESIGN.md é a "source of truth" para todos os designs VELA no Stitch. Consulte antes de gerar novas telas para manter consistência visual.
