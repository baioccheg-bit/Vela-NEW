# Plano de Build — VELA SaaS

> Plano de construção do produto VELA do estado mock atual até MVP funcional. Execução **uma fase por sessão** no Claude Code. As regras gerais de design, stack e off-limits estão em `CLAUDE.md` — este documento **não as repete**, apenas referencia.

---

## Como usar este documento

1. Para iniciar uma fase, cole no Claude Code:
   ```
   Vamos executar a Fase N do docs/BUILD_PLAN.md. Leia o CLAUDE.md, leia esta fase inteira, leia os arquivos referenciados, então liste o que vai criar/alterar ANTES de codar. Espere minha aprovação.
   ```
2. Não pular fases. Não combinar fases. A ordem importa.
3. Ao final de cada fase, Claude Code deve atualizar o checkbox no roadmap do `README.md` e nada mais.

---

## Estado atual (não construir de novo)

- ✅ Site institucional travado (Hallmark rev 2)
- ✅ Design system (`design.md` + `tokens.css`)
- ✅ Schema multi-tenant: `Clinic`, `User`, `Membership`, `Invite`, `Subscription`, `Lead`
- ✅ NextAuth (email+senha, magic link, Google, Microsoft)
- ✅ Fluxo de leads end-to-end (`/contratar` → `/admin/leads` → `Invite` → `/registrar` → login)
- ✅ Resend wired pra emails transacionais
- ✅ UI do app em `/demo` (4 rotas) — **mockada**, tudo vem de `src/app/demo/lib/mock-data.ts`

## O que este plano constrói

| Fase | Entrega                                                         | Sessões estimadas |
| ---- | --------------------------------------------------------------- | ----------------- |
| 1    | Persistência real (substitui mock por Prisma)                   | 2-3               |
| 1.5  | Reposicionamento: `/demo`→`/painel`, destravar, criar `/minha-conta` | 1            |
| 2    | CRUDs do core (agenda, pacientes, procedimentos, profissionais) + tutorial leve | 4-6   |
| 3    | (REMOVIDA) Onboarding agora é leve e mora dentro da Fase 2     | —                 |
| 4    | Júlia — engine de IA + inbox interno + cadastro de paciente via WhatsApp | 3-4      |
| 5    | Sofia — cobrança Pix com gateway abstrato + mock                | 2-3               |
| 6    | Subscription billing (Vela cobrando da clínica)                 | 2                 |
| 7    | NF-e via parceiro                                               | 1-2               |

**MVP fechado ao final da Fase 5.** Fases 6-7 são pré-launch público.

**Pós-MVP:** Tauri (empacotamento desktop Windows/macOS), apps Android/iOS, Max, Atlas, WhatsApp Business API oficial.

---

## Decisão de escopo dos agentes (locked)

- **Júlia (agenda) e Sofia (cobrança)** entram no MVP. São o diferencial e atacam as duas maiores dores da clínica: gestão de WhatsApp e inadimplência.
- **Max (atendimento) e Atlas (análise)** ficam pós-MVP. Max overlapa com Júlia se Júlia já cuida da agenda no WhatsApp. Atlas é nice-to-have (relatórios).
- Não criar páginas, rotas ou prompts pra Max e Atlas neste plano. Se já existirem em `/agentes/`, não tocar.

---

## Regras de execução (válidas em todas as fases)

- Regras gerais em `CLAUDE.md`. Leia-o antes de cada sessão.
- **Antes de tocar qualquer arquivo:** ler arquivos referenciados na fase, listar arquivos que vai criar/editar, esperar aprovação.
- **Server Components por padrão.** Server Actions pra mutations. `"use client"` só com motivo (estado, evento, efeito).
- **Multi-tenant é lei.** Toda query Prisma DEVE filtrar por `clinicId` da sessão. Server Actions DEVEM verificar `Membership` antes de qualquer mutation. Nunca confiar em `clinicId` vindo do client.
- **Validation:** instale `zod` (única lib nova autorizada por este plano) na Fase 1. Todo input de Server Action passa por schema Zod.
- **Erros visíveis ao usuário:** pt-BR, direto, sem técnico ("Não foi possível salvar o agendamento. Tente novamente." — não "ServerError 500").
- **Rodar `npm run lint` e `npm run build` no fim de cada fase.** Não fechar a fase com qualquer um dos dois quebrado.

---

## Fase 1 — Persistência real

### Objetivo
Substituir `src/app/demo/lib/mock-data.ts` por dados vindos do PostgreSQL via Prisma. As 4 rotas (`/demo`, `/painel/agenda`, `/demo/pacientes`, `/painel/julia`) continuam funcionando, sem mudar UI, lendo do DB.

### Pré-requisitos
- Ler: `prisma/schema.prisma`, `src/app/demo/lib/mock-data.ts`, todas as 4 page.tsx em `src/app/demo/`.
- Confirmar que `DATABASE_URL` aponta pro Supabase em dev.

### Schema novo no Prisma

Adicionar models, todos com `clinicId` indexado:

```prisma
model Professional {
  id          String   @id @default(cuid())
  clinicId    String
  clinic      Clinic   @relation(fields: [clinicId], references: [id], onDelete: Cascade)
  name        String
  role        String   // "Dermatologista", "Esteticista", etc
  color       String   // hex pra badge na agenda
  active      Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  appointments Appointment[]

  @@index([clinicId])
}

model Procedure {
  id          String   @id @default(cuid())
  clinicId    String
  clinic      Clinic   @relation(fields: [clinicId], references: [id], onDelete: Cascade)
  name        String
  durationMin Int
  basePrice   Decimal  @db.Decimal(10, 2)
  active      Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  appointments Appointment[]

  @@index([clinicId])
}

enum PatientTag {
  VIP
  ATIVO
  NOVO
  INATIVO
}

model Patient {
  id            String      @id @default(cuid())
  clinicId      String
  clinic        Clinic      @relation(fields: [clinicId], references: [id], onDelete: Cascade)
  name          String
  birthDate     DateTime?
  phone         String      // E.164: +5511999999999
  email         String?
  tag           PatientTag  @default(NOVO)
  notes         String?     @db.Text
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt
  appointments  Appointment[]

  @@index([clinicId])
  @@index([clinicId, phone])
}

enum AppointmentStatus {
  CONFIRMADO
  PENDENTE
  ATENDIDO
  CANCELADO
}

model Appointment {
  id              String             @id @default(cuid())
  clinicId        String
  clinic          Clinic             @relation(fields: [clinicId], references: [id], onDelete: Cascade)
  patientId       String
  patient         Patient            @relation(fields: [patientId], references: [id])
  procedureId     String
  procedure       Procedure          @relation(fields: [procedureId], references: [id])
  professionalId  String
  professional    Professional       @relation(fields: [professionalId], references: [id])
  startsAt        DateTime
  endsAt          DateTime
  status          AppointmentStatus  @default(PENDENTE)
  value           Decimal            @db.Decimal(10, 2)
  notes           String?            @db.Text
  createdAt       DateTime           @default(now())
  updatedAt       DateTime           @updatedAt

  @@index([clinicId, startsAt])
  @@index([patientId])
}
```

Adicionar back-relations correspondentes em `Clinic`.

### Implementação

1. Migrar schema: `npm run db:migrate` → nome da migration: `add_core_clinical_models`.
2. Instalar zod: `npm install zod`.
3. Criar `src/lib/db.ts` exportando uma instância singleton do Prisma Client.
4. Criar `src/lib/auth/session.ts` com helper `getCurrentMembership()` que retorna `{ user, clinic, role }` ou redireciona pra `/entrar`. Usar em todo Server Component/Action de `/demo`.
5. Criar `src/app/demo/lib/queries.ts` com funções server-only:
   - `getTodayAppointments(clinicId)`
   - `getKPIs(clinicId)`
   - `getWeeklyRevenue(clinicId)`
   - `getPatients(clinicId, filter?)`
   - `getJuliaConversations(clinicId)` — por enquanto retorna `[]`, real na Fase 4
6. Refatorar as 4 page.tsx pra usar as queries acima em vez do mock. Manter exatamente a mesma UI.
7. Criar `prisma/seed-demo.ts`: dado um `clinicId`, popular ~20 pacientes, 5 profissionais, 10 procedimentos, 30 agendamentos do mês atual. Adicionar comando `npm run db:seed:demo` no `package.json`. Útil pra dev.
8. Não deletar `mock-data.ts` ainda — só os tipos ficam, dados saem. Tipos podem ser substituídos por inferência de `Prisma.AppointmentGetPayload` etc.

### Critério de aceite
- Após rodar `npm run db:seed:demo` numa clínica de teste, abrir `/demo`, `/painel/agenda`, `/demo/pacientes` e ver dados reais do banco.
- `/painel/julia` mostra lista vazia (sem erro).
- Logout → tentar acessar `/demo` → redireciona pra `/entrar`.
- Usuário de uma clínica não vê dados de outra (testar criando 2 clínicas).

---

## Fase 1.5 — Reposicionamento (concluída)

Renomeou `/demo` → `/painel`, destravou interações (removeu `.demo-frozen`), criou `/minha-conta` como hub pós-login, atualizou redirects, navbar e BUILD_PLAN. Não muda funcionalidade — só prepara o terreno pra Fase 2.

---

## Fase 2 — CRUDs do core + tutorial leve

### Objetivo
Permitir criar, editar e cancelar agendamentos, pacientes, procedimentos e profissionais via UI. Todas as mutations via Server Actions com validação Zod e checagem de membership. Onboarding agora vive aqui como tutorial não-bloqueante (NÃO há mais wizard obrigatório).

### Pré-requisitos
- Fase 1 e 1.5 completas.
- Ler: rotas atuais de `/painel`, `Button` component.

### Princípios de UX (locked)

1. **Cadastro mínimo de paciente: só nome + telefone obrigatórios.** Resto preenche com o tempo. Donos de clínica não têm paciência pra formulário longo.
2. **Defaults inteligentes pra clínica nova.** No primeiro acesso, a clínica vem com: horário padrão seg-sex 8h-18h + sáb 8h-12h, procedimentos genéricos pré-cadastrados (consulta, avaliação, retorno), usuário admin já vira o primeiro `Professional`. Cliente edita o que não serve.
3. **Tutorial é flutuante, não-bloqueante.** Checklist no canto + modal de boas-vindas com tour de 90s. Pode pular tudo. App entra usável.
4. **Importação de Excel/CSV de pacientes na Fase 2.3.** Toda clínica tem caderno/planilha — esse é o primeiro CTA do tutorial.

### Sub-fases (executar em sessões separadas se necessário)

#### 2.1 — Profissionais
- Rota nova: `src/app/painel/configuracoes/profissionais/page.tsx` (lista) e `[id]/page.tsx` (edit). Já há entrada placeholder no Sidebar (seção "Configurações") — destravar.
- Form: nome, função, cor (color picker simples ou paleta restrita), ativo.
- Server Actions em `src/app/painel/configuracoes/profissionais/actions.ts`: `createProfessional`, `updateProfessional`, `deactivateProfessional`.

#### 2.2 — Procedimentos
- Mesmo padrão: `/painel/configuracoes/procedimentos`.
- Campos: nome, duração (min), preço base, ativo.

#### 2.3 — Pacientes (cadastro rápido + importação)
- Editar `/painel/pacientes`: botão "Novo paciente" → drawer com form **só nome + telefone obrigatórios**. Campos opcionais (e-mail, nascimento, CPF, tag, notas) ficam num "expandir" colapsado.
- Rota detalhe: `/painel/pacientes/[id]` — ficha completa, edição inline dos campos opcionais.
- **Importação Excel/CSV:** botão "Importar planilha" → modal de upload. Aceita `.xlsx` e `.csv`. Mapeamento manual de colunas (nome → coluna A, telefone → coluna B). Preview de 5 linhas antes de confirmar. Skipa duplicados por telefone E.164.
  - Lib autorizada: `xlsx` (única exceção ao "nada de lib nova").
- Validação: telefone em E.164, e-mail opcional mas válido se preenchido. CPF só valida formato se preenchido.

#### 2.4 — Agendamentos
- Editar `/painel/agenda`: clicar num slot vazio → drawer "Novo agendamento". Clicar num agendamento existente → drawer "Detalhes" com ações: confirmar, marcar como atendido, cancelar, reagendar.
- Form de novo agendamento: paciente (autocomplete por nome/telefone, com botão "+ cadastrar novo" inline), profissional, procedimento, data/hora, duração (default do procedimento), valor (default do procedimento), observações.
- Validações: data/hora futura, sem conflito de profissional no horário, paciente existe.
- Server Actions com `revalidatePath('/painel/agenda')` e `/painel`.

#### 2.5 — Tutorial leve (substitui antiga Fase 3)
- **Modal de welcome** ao primeiro acesso de `/painel`: "Bem-vinda. A Vela já está pronta. Quer um tour de 90 segundos?" — botões "Tour rápido" / "Pular, sei o que fazer". Estado salvo em `User.welcomedAt`.
- **Checklist flutuante** no canto inferior direito (componente `<OnboardingChecklist/>`):
  1. ✓ Conta criada
  2. □ Importar pacientes (CTA → `/painel/pacientes?import=1`)
  3. □ Convidar equipe (CTA → `/painel/configuracoes/equipe`)
  4. □ Personalizar horários (CTA → `/painel/configuracoes/horarios`)
  5. □ Conectar WhatsApp (desabilitado até Fase 4)
- Cada item desaparece ao concluir OU clicar "marcar como feito". Checklist some inteiro quando vazio OU quando user fecha (flag `Clinic.onboardingDismissedAt`).
- **Defaults injetados na criação da clínica** (server action de signup/seed): horários padrão, procedimentos genéricos, profissional ADMIN inicial. Ver seção "Defaults" abaixo.

#### 2.6 — Horários de funcionamento
- Rota: `/painel/configuracoes/horarios`.
- Schema novo: `BusinessHours { clinicId, weekday (0-6), opensAt (HH:MM), closesAt (HH:MM), active }`.
- UI: 7 linhas (uma por dia), toggle "abre/fechado", 2 campos de horário.
- Necessário pra Fase 4 (Júlia valida disponibilidade).

### Defaults injetados (Fase 2.5)

Quando uma `Clinic` é criada (signup ou seed-demo), também criar:

- **BusinessHours:** seg-sex 8:00-18:00, sáb 8:00-12:00, dom fechado.
- **Procedures (genéricos):** "Consulta", "Retorno", "Avaliação" (duração 30min, preço 0 — clínica edita).
- **Professional:** o user que criou a clínica vira `Professional` com role livre (ex "Administradora"). Pode desativar depois.

### Padrões de UI (reuse, não recriar)
- Drawer/modal: criar componente `src/app/painel/components/Drawer.tsx` seguindo `design.md` — surface sólida `--color-paper-0`, borda `--color-paper-3`, sem gradiente, sem backdrop-blur. Animação de slide via CSS keyframe (≤240ms).
- Inputs: criar `src/app/painel/components/Field.tsx` com label, input, error. Borda `--color-paper-3`, focus ring `--color-focus`.
- Botões: usar o `Button` existente.

### Critério de aceite
- Posso cadastrar 1 profissional, 1 procedimento e 1 paciente, depois agendar pra ele, e ver tudo refletido na visão geral, agenda e ficha.
- Cadastro de paciente novo leva ≤15 segundos (só nome + telefone).
- Posso importar uma planilha Excel com 50 pacientes em ≤2min, sem perder linhas (skip por duplicidade).
- Tentar agendar 2 atendimentos pro mesmo profissional no mesmo horário → erro claro.
- Cancelar agendamento mantém histórico (só troca status).
- Cliente novo (sem dados) entra em `/painel` e vê dashboard funcionando — não vê "vazio assustador".
- Checklist do onboarding aparece, mas é dispensável.

---

## Fase 3 — REMOVIDA (substituída pelo tutorial leve na Fase 2.5)

> Decisão (sessão Fase 1.5): o wizard obrigatório de 4 passos afastaria donos de clínica (público com pouco tempo). O onboarding virou tutorial flutuante não-bloqueante que vive dentro da Fase 2 (sub-fase 2.5). Cliente novo entra no app já funcional, com defaults inteligentes, e completa a personalização no próprio ritmo. O modelo `BusinessHours` também migrou pra Fase 2 (sub-fase 2.6).

---

## Fase 4 — Júlia (engine de IA + inbox interno)

> WhatsApp Business API real fica fora desta fase porque depende de aprovação Meta (4-8 semanas). Construímos a engine com um canal "web" interno; trocar pelo WhatsApp depois é só plugar um adapter.

### Objetivo
Júlia conversa com paciente em pt-BR pra: confirmar agendamento, cancelar/reagendar, agendar do zero (consultar disponibilidade real do DB), responder perguntas básicas sobre procedimentos, **e cadastrar paciente novo** (extrai nome + telefone da própria conversa, sem ninguém da recepção digitar).

### Pré-requisitos
- Fase 3 completa.
- `OPENAI_API_KEY` no `.env`.

### Schema novo

```prisma
enum ChannelType {
  WEB        // canal interno pra testar e onboarding
  WHATSAPP   // futuro
}

enum MessageDirection {
  INBOUND    // do paciente pra Júlia
  OUTBOUND   // de Júlia/operador pro paciente
}

enum MessageSender {
  PATIENT
  JULIA
  OPERATOR    // humano da clínica assumindo a conversa
}

model Conversation {
  id          String        @id @default(cuid())
  clinicId    String
  clinic      Clinic        @relation(fields: [clinicId], references: [id], onDelete: Cascade)
  patientId   String?
  patient     Patient?      @relation(fields: [patientId], references: [id])
  channel     ChannelType
  externalId  String?       // ID no canal externo (WhatsApp msg id, etc)
  takenOver   Boolean       @default(false)  // true quando operador assumiu
  lastMessageAt DateTime    @default(now())
  createdAt   DateTime      @default(now())
  messages    Message[]

  @@index([clinicId, lastMessageAt])
}

model Message {
  id              String            @id @default(cuid())
  conversationId  String
  conversation    Conversation      @relation(fields: [conversationId], references: [id], onDelete: Cascade)
  direction       MessageDirection
  sender          MessageSender
  body            String            @db.Text
  toolCalls       Json?             // function calls feitos pela Júlia (audit trail)
  createdAt       DateTime          @default(now())

  @@index([conversationId, createdAt])
}
```

### Implementação

1. Criar `src/lib/agents/julia/` com:
   - `system-prompt.ts` — prompt mestre da Júlia em pt-BR, com tom da marca (direto, sem exclamação, sem emoji), persona, escopo (só agenda).
   - `tools.ts` — function tools que a Júlia pode chamar via OpenAI tool use:
     - `checkAvailability(date, procedureId)` → retorna slots disponíveis
     - `createAppointment(patientId, procedureId, professionalId, startsAt)` → cria agendamento PENDENTE
     - `confirmAppointment(appointmentId)` → muda status
     - `cancelAppointment(appointmentId, reason)`
     - `rescheduleAppointment(appointmentId, newStartsAt)`
     - `getPatientByPhone(phone)` → busca paciente da clínica
     - `createPatient(name, phone, email?)` → cria paciente novo (Júlia chama quando paciente desconhecido entra na conversa)
     - `getProceduresMenu()` → lista procedimentos ativos
   - `runner.ts` — função `processIncomingMessage(conversationId, body)`: carrega últimas N mensagens, chama OpenAI com tools, executa tool calls (sempre validando `clinicId` da conversa), persiste resposta em `Message` (sender = JULIA), retorna resposta. Sempre salvar `toolCalls` pro audit.
2. Refatorar `/painel/julia/page.tsx`: lista de conversas reais (`getJuliaConversations` da Fase 1, agora populada). Selecionar conversa → painel à direita com histórico de mensagens e input de operador.
3. Botão "Assumir conversa" → seta `Conversation.takenOver = true`. A partir daí, mensagens novas não vão pra Júlia, só pro inbox do operador. Botão "Devolver pra Júlia" desliga o flag.
4. Endpoint público `POST /api/webhooks/web-channel` recebe mensagens de teste:
   ```json
   { "clinicId": "...", "phone": "+5511...", "body": "Oi, quero agendar" }
   ```
   Cria ou recupera `Conversation`, salva `Message` INBOUND, dispara `processIncomingMessage`. Útil pra dev e pra futura integração com WhatsApp.
5. Pra produção: rate limit no webhook + assinatura por clínica (header `X-Vela-Clinic-Token`) que será o mesmo que validará webhooks do WhatsApp depois.

### Critério de aceite
- Posso fazer um POST de teste pro webhook simulando paciente novo e ver a Júlia responder. Se a mensagem for "quero agendar limpeza de pele dia 30", ela checa disponibilidade real e propõe horários.
- Conversa aparece em `/painel/julia` em tempo real (recarregar a página por enquanto, polling/realtime na próxima fase).
- Operador consegue assumir e responder.
- Audit trail: cada Message de Júlia mostra os tool calls no banco.

---

## Fase 5 — Sofia (cobrança Pix com gateway abstrato)

### Objetivo
Sofia gera cobranças Pix automaticamente após agendamento ser marcado como ATENDIDO, envia lembrete via Júlia (mesmo canal), e marca pago quando o webhook do gateway confirma.

### Pré-requisitos
- Fase 4 completa.

### Schema novo

```prisma
enum ChargeStatus {
  PENDENTE
  GERADA
  PAGA
  EXPIRADA
  CANCELADA
}

model Charge {
  id            String        @id @default(cuid())
  clinicId      String
  clinic        Clinic        @relation(fields: [clinicId], references: [id], onDelete: Cascade)
  appointmentId String        @unique
  appointment   Appointment   @relation(fields: [appointmentId], references: [id])
  patientId     String
  patient       Patient       @relation(fields: [patientId], references: [id])
  amount        Decimal       @db.Decimal(10, 2)
  status        ChargeStatus  @default(PENDENTE)
  gatewayId     String?       // ID retornado pelo provider
  gatewayName   String?       // "asaas" | "mp" | "stripe" | "mock"
  qrCode        String?       @db.Text
  paymentLink   String?
  expiresAt     DateTime?
  paidAt        DateTime?
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt

  @@index([clinicId, status])
}
```

### Gateway abstrato

Criar `src/lib/payments/`:

```typescript
// src/lib/payments/types.ts
export type CreatePixInput = {
  amount: number;          // BRL
  payer: { name: string; phone: string; document?: string };
  description: string;
  externalRef: string;     // appointmentId
  expiresInMinutes: number;
};

export type CreatePixResult = {
  gatewayId: string;
  qrCode: string;          // copia-e-cola
  paymentLink?: string;
  expiresAt: Date;
};

export type PaymentGateway = {
  name: "asaas" | "mp" | "stripe" | "mock";
  createPixCharge(input: CreatePixInput): Promise<CreatePixResult>;
  cancelCharge(gatewayId: string): Promise<void>;
  parseWebhookEvent(payload: unknown, signature: string): Promise<
    | { type: "payment.paid"; gatewayId: string; paidAt: Date }
    | { type: "payment.expired"; gatewayId: string }
    | { type: "unknown" }
  >;
};

// src/lib/payments/index.ts
import { mockGateway } from "./mock";
export function getGateway(): PaymentGateway {
  const name = process.env.PAYMENT_GATEWAY ?? "mock";
  if (name === "mock") return mockGateway;
  throw new Error(`Gateway ${name} ainda não implementado`);
}
```

### Implementação

1. Implementar `mockGateway` em `src/lib/payments/mock.ts` que gera IDs fake e dispara um setTimeout pra simular webhook em 30s. Útil pra dev sem chave de gateway real.
2. Server Action `markAppointmentAttended(appointmentId)`: atualiza status, cria `Charge` via gateway, salva qrCode/link no banco.
3. Endpoint `POST /api/webhooks/payment` recebe webhook do gateway. Validar assinatura, mapear pra `Charge`, atualizar status, se PAGA: dispara mensagem da Júlia agradecendo via `Conversation` do paciente (se existir).
4. UI em `/painel/agenda`: ao marcar como atendido, mostrar QR code Pix num modal + botão "enviar via Júlia". Enviar = chamar `processIncomingMessage` com uma mensagem programada de Sofia (sender = JULIA com tag interna de origem Sofia, ou novo enum SOFIA — preferir adicionar `SOFIA` em `MessageSender`).
5. Nova rota: `/painel/financeiro` — lista cobranças com filtro por status, totais do mês, badge dos status (reusar `StatusBadge` estendido).

### Critério de aceite
- Marcar agendamento como atendido gera cobrança mockada com QR code visível.
- Em 30s o webhook mock dispara, status vai pra PAGA, paciente recebe mensagem na conversa.
- Trocar `PAYMENT_GATEWAY=mock` por outro valor no `.env` quebra com mensagem clara "Gateway X não implementado" (esperado).
- `/painel/financeiro` mostra cobranças com totais corretos.

---

## Fase 6 — Subscription billing (Vela cobra da clínica)

### Objetivo
A clínica cliente paga mensalidade da Vela. Hoje `Subscription` é placeholder; agora ela controla acesso real.

### Pré-requisitos
- Fase 5 completa.
- Decisão tomada: gateway de subscription (provavelmente Stripe). **Pausar e perguntar** antes de implementar.

### Implementação (esqueleto)

1. Adicionar `Plan` model (Starter, Pro, Premium) com `priceMonthly`, `maxPatients`, `maxProfessionals`, `featuresJson`.
2. Estender `Subscription` com `planId`, `status` (TRIAL, ACTIVE, PAST_DUE, CANCELED), `currentPeriodEnd`, `gatewaySubscriptionId`.
3. Middleware/guard: se `Subscription.status` é `PAST_DUE` ou `CANCELED` e trial expirou, redirecionar todo `/painel/*` pra `/painel/assinatura`.
4. Rota `/painel/assinatura`: mostra plano, status, próxima cobrança, botão upgrade/cancelar.
5. Integração específica do gateway escolhido (Stripe Checkout, Customer Portal, webhooks).

> Essa fase é detalhada na hora porque depende do gateway escolhido. O plano só pré-aloca o espaço.

### Critério de aceite
- Clínica em trial vê banner "Faltam X dias do trial".
- Clínica com pagamento atrasado é bloqueada do `/painel/*` exceto `/painel/assinatura`.
- Webhook do gateway atualiza `Subscription.status` corretamente.

---

## Fase 7 — NF-e

### Objetivo
Emitir NFS-e automaticamente após `Charge.status = PAGA`, via parceiro (NFE.io ou eNotas — abstrair também).

### Pré-requisitos
- Fase 6 completa.
- CNAE, alíquota e dados fiscais da clínica capturados (adicionar ao onboarding ou seção fiscal).

### Implementação (esqueleto)

1. Schema: `FiscalConfig` (cnae, taxRate, certificateRef…), `Invoice` (chargeId, status, xmlUrl, pdfUrl, error).
2. Abstração `src/lib/invoicing/` no mesmo molde do payment gateway.
3. Trigger automático: webhook de payment.paid → enfileirar emissão.
4. Reenvio manual em `/painel/financeiro` quando emissão falha.

### Critério de aceite
- Cobrança paga → invoice emitida automaticamente (mock provider).
- Falha de emissão fica visível e reenviável.

---

## Pós-MVP (fora deste plano)

Ordem provável (não locked):

1. **Tauri** — empacotamento desktop (Windows + macOS) do `/painel`. Bundle ≤10MB, mesmo código web roda dentro de WebView nativa. Bot ão de download já existe em `/minha-conta` (desabilitado). Ver `PROMPT_TAURI_DESKTOP.md`.
2. **WhatsApp Business API real** — adapter sobre `Conversation` model; webhook em `/api/webhooks/whatsapp`. Engine de Júlia não muda (já abstraída em Fase 4).
3. **Apps mobile (Android / iOS)** — provavelmente React Native ou Expo embutindo o WebView do `/painel`. Mesma engine de auth.
4. **Realtime no inbox de Júlia** — Supabase Realtime ou SSE.
5. **Max (atendimento)** — reavaliar se faz sentido depois de Júlia rodar. Pode virar feature de Júlia em vez de agente separado.
6. **Atlas (análise)** — relatórios, BI básico, exportação.

---

## Snapshot de progresso

Ao terminar cada fase, atualize aqui:

- [x] Fase 1 — Persistência real
- [x] Fase 1.5 — Reposicionamento (`/painel`, destravar, `/minha-conta`)
- [ ] Fase 2 — CRUDs do core + tutorial leve
- [ ] ~~Fase 3 — Onboarding wizard~~ (absorvida pela Fase 2.5)
- [ ] Fase 4 — Júlia (engine + inbox + cadastro via WhatsApp)
- [ ] Fase 5 — Sofia (cobrança Pix)
- [ ] Fase 6 — Subscription billing
- [ ] Fase 7 — NF-e

**MVP fecha no checkbox da Fase 5.**
