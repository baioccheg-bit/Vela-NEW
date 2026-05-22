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
| 2    | CRUDs do core (agenda, pacientes, procedimentos, profissionais) | 4-6               |
| 3    | Onboarding wizard pós-registro                                  | 1-2               |
| 4    | Júlia — engine de IA + inbox interno (WhatsApp depois)          | 3-4               |
| 5    | Sofia — cobrança Pix com gateway abstrato + mock                | 2-3               |
| 6    | Subscription billing (Vela cobrando da clínica)                 | 2                 |
| 7    | NF-e via parceiro                                               | 1-2               |

**MVP fechado ao final da Fase 5.** Fases 6-7 são pré-launch público. Max, Atlas, WhatsApp real e Tauri ficam pós-MVP.

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
Substituir `src/app/demo/lib/mock-data.ts` por dados vindos do PostgreSQL via Prisma. As 4 rotas (`/demo`, `/demo/agenda`, `/demo/pacientes`, `/demo/julia`) continuam funcionando, sem mudar UI, lendo do DB.

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
- Após rodar `npm run db:seed:demo` numa clínica de teste, abrir `/demo`, `/demo/agenda`, `/demo/pacientes` e ver dados reais do banco.
- `/demo/julia` mostra lista vazia (sem erro).
- Logout → tentar acessar `/demo` → redireciona pra `/entrar`.
- Usuário de uma clínica não vê dados de outra (testar criando 2 clínicas).

---

## Fase 2 — CRUDs do core

### Objetivo
Permitir criar, editar e cancelar agendamentos, pacientes, procedimentos e profissionais via UI. Todas as mutations via Server Actions com validação Zod e checagem de membership.

### Pré-requisitos
- Fase 1 completa.
- Ler: rotas atuais de `/demo`, `Button` component.

### Sub-fases (executar em sessões separadas se necessário)

#### 2.1 — Profissionais
- Rota nova: `src/app/demo/configuracoes/profissionais/page.tsx` (lista) e `[id]/page.tsx` (edit). Não esquecer de adicionar em `navItems` do Sidebar (seção "Configurações" — nova seção uppercase mono).
- Form: nome, função, cor (color picker simples ou paleta restrita), ativo.
- Server Actions em `src/app/demo/configuracoes/profissionais/actions.ts`: `createProfessional`, `updateProfessional`, `deactivateProfessional`.

#### 2.2 — Procedimentos
- Mesmo padrão: `/demo/configuracoes/procedimentos`.
- Campos: nome, duração (min), preço base, ativo.

#### 2.3 — Pacientes
- Editar `/demo/pacientes`: botão "Novo paciente" → modal/drawer com form.
- Rota detalhe: `/demo/pacientes/[id]` — ficha completa do paciente com histórico de agendamentos (lista somente leitura por enquanto), botão editar.
- Validação: telefone em E.164, e-mail opcional mas válido se preenchido.

#### 2.4 — Agendamentos
- Editar `/demo/agenda`: clicar num slot vazio → drawer "Novo agendamento". Clicar num agendamento existente → drawer "Detalhes" com ações: confirmar, marcar como atendido, cancelar, reagendar.
- Form de novo agendamento: paciente (autocomplete por nome/telefone), profissional, procedimento, data/hora, duração (default vinda do procedimento), valor (default vindo do procedimento), observações.
- Validações: data/hora futura, sem conflito de profissional no horário, paciente existe.
- Server Actions com `revalidatePath('/demo/agenda')` e `/demo`.

### Padrões de UI (reuse, não recriar)
- Drawer/modal: criar componente `src/app/demo/components/Drawer.tsx` seguindo `design.md` — surface sólida `--color-paper-0`, borda `--color-paper-3`, sem gradiente, sem backdrop-blur (só nav floating pill tem). Animação de slide via CSS keyframe simples (≤240ms).
- Inputs: criar `src/app/demo/components/Field.tsx` com label, input, error. Estilo: borda `--color-paper-3`, focus ring `--color-focus`.
- Botões: usar o `Button` existente. Variantes primary/secondary já existem.

### Critério de aceite
- Posso cadastrar 1 profissional, 1 procedimento e 1 paciente, depois agendar pra ele, e ver tudo refletido na visão geral, agenda e ficha do paciente.
- Tentar agendar 2 atendimentos pro mesmo profissional no mesmo horário → erro claro.
- Mudar status de um agendamento de PENDENTE → CONFIRMADO → ATENDIDO atualiza UI imediatamente.
- Cancelar agendamento mantém histórico (não deleta), apenas troca status.

---

## Fase 3 — Onboarding wizard

### Objetivo
Após o lead aceitar o convite e definir senha em `/registrar`, ele cai num wizard de 4 passos que prepara a clínica pra uso real. "Tão fácil quanto bebê" — sem campos opcionais nesta etapa.

### Pré-requisitos
- Fase 2 completa.
- Ler: `src/app/registrar/page.tsx` e a action que cria `User` + `Membership` ADMIN.

### Implementação

1. Após criar `User` + `Membership`, redirecionar pra `/demo/inicio` em vez de `/demo` se a clínica ainda não tem `Professional`, `Procedure` ou pelo menos 1 horário configurado.
2. Criar `src/app/demo/inicio/page.tsx` — wizard com 4 passos:
   - **Passo 1 — Clínica:** confirmar nome, telefone público, endereço básico. (Hoje só temos nome em `Clinic` — adicionar `phone`, `address`, `city`, `state` em schema. Migration nova.)
   - **Passo 2 — Profissionais:** adicionar pelo menos 1 (reusa Server Action da Fase 2.1).
   - **Passo 3 — Procedimentos:** adicionar pelo menos 1 (reusa Server Action da Fase 2.2).
   - **Passo 4 — Horário de funcionamento:** dia da semana × horário (de/até). Salvar em novo model `BusinessHours` (clinicId, weekday, opensAt, closesAt). Necessário pra Fase 4 (Júlia validar disponibilidade).
3. Cada passo é uma sub-rota: `/demo/inicio/clinica`, `/demo/inicio/profissionais`, `/demo/inicio/procedimentos`, `/demo/inicio/horarios`. Progress bar mono no topo (1/4, 2/4, etc).
4. Após o passo 4: marcar `Clinic.onboardedAt = now()`, redirecionar pra `/demo`.
5. Middleware ou guarda em `layout.tsx` do `/demo`: se `onboardedAt` é null, redirecionar pra `/demo/inicio/<próximo passo pendente>`. Exceção: `/demo/inicio/*` não redireciona.

### Critério de aceite
- Lead aprovado → recebe email → clica → define senha → cai direto no wizard → completa 4 passos → cai em `/demo` com clínica funcional.
- Tentar pular um passo via URL direta volta pro passo pendente.
- Reabrir o app depois de completo NÃO mostra mais o wizard.

---

## Fase 4 — Júlia (engine de IA + inbox interno)

> WhatsApp Business API real fica fora desta fase porque depende de aprovação Meta (4-8 semanas). Construímos a engine com um canal "web" interno; trocar pelo WhatsApp depois é só plugar um adapter.

### Objetivo
Júlia conversa com paciente em pt-BR pra: confirmar agendamento, cancelar/reagendar, agendar do zero (consultar disponibilidade real do DB), responder perguntas básicas sobre procedimentos.

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
     - `getProceduresMenu()` → lista procedimentos ativos
   - `runner.ts` — função `processIncomingMessage(conversationId, body)`: carrega últimas N mensagens, chama OpenAI com tools, executa tool calls (sempre validando `clinicId` da conversa), persiste resposta em `Message` (sender = JULIA), retorna resposta. Sempre salvar `toolCalls` pro audit.
2. Refatorar `/demo/julia/page.tsx`: lista de conversas reais (`getJuliaConversations` da Fase 1, agora populada). Selecionar conversa → painel à direita com histórico de mensagens e input de operador.
3. Botão "Assumir conversa" → seta `Conversation.takenOver = true`. A partir daí, mensagens novas não vão pra Júlia, só pro inbox do operador. Botão "Devolver pra Júlia" desliga o flag.
4. Endpoint público `POST /api/webhooks/web-channel` recebe mensagens de teste:
   ```json
   { "clinicId": "...", "phone": "+5511...", "body": "Oi, quero agendar" }
   ```
   Cria ou recupera `Conversation`, salva `Message` INBOUND, dispara `processIncomingMessage`. Útil pra dev e pra futura integração com WhatsApp.
5. Pra produção: rate limit no webhook + assinatura por clínica (header `X-Vela-Clinic-Token`) que será o mesmo que validará webhooks do WhatsApp depois.

### Critério de aceite
- Posso fazer um POST de teste pro webhook simulando paciente novo e ver a Júlia responder. Se a mensagem for "quero agendar limpeza de pele dia 30", ela checa disponibilidade real e propõe horários.
- Conversa aparece em `/demo/julia` em tempo real (recarregar a página por enquanto, polling/realtime na próxima fase).
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
4. UI em `/demo/agenda`: ao marcar como atendido, mostrar QR code Pix num modal + botão "enviar via Júlia". Enviar = chamar `processIncomingMessage` com uma mensagem programada de Sofia (sender = JULIA com tag interna de origem Sofia, ou novo enum SOFIA — preferir adicionar `SOFIA` em `MessageSender`).
5. Nova rota: `/demo/financeiro` — lista cobranças com filtro por status, totais do mês, badge dos status (reusar `StatusBadge` estendido).

### Critério de aceite
- Marcar agendamento como atendido gera cobrança mockada com QR code visível.
- Em 30s o webhook mock dispara, status vai pra PAGA, paciente recebe mensagem na conversa.
- Trocar `PAYMENT_GATEWAY=mock` por outro valor no `.env` quebra com mensagem clara "Gateway X não implementado" (esperado).
- `/demo/financeiro` mostra cobranças com totais corretos.

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
3. Middleware/guard: se `Subscription.status` é `PAST_DUE` ou `CANCELED` e trial expirou, redirecionar todo `/demo/*` pra `/demo/assinatura`.
4. Rota `/demo/assinatura`: mostra plano, status, próxima cobrança, botão upgrade/cancelar.
5. Integração específica do gateway escolhido (Stripe Checkout, Customer Portal, webhooks).

> Essa fase é detalhada na hora porque depende do gateway escolhido. O plano só pré-aloca o espaço.

### Critério de aceite
- Clínica em trial vê banner "Faltam X dias do trial".
- Clínica com pagamento atrasado é bloqueada do `/demo/*` exceto `/demo/assinatura`.
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
4. Reenvio manual em `/demo/financeiro` quando emissão falha.

### Critério de aceite
- Cobrança paga → invoice emitida automaticamente (mock provider).
- Falha de emissão fica visível e reenviável.

---

## Pós-MVP (fora deste plano)

- **Max (atendimento)** — reavaliar se faz sentido depois de Júlia rodar. Pode virar feature de Júlia em vez de agente separado.
- **Atlas (análise)** — relatórios, BI básico, exportação.
- **WhatsApp Business API real** — adapter sobre `Conversation` model; webhook em `/api/webhooks/whatsapp`. Engine de Júlia não muda.
- **Realtime no inbox de Júlia** — Supabase Realtime ou SSE.
- **Tauri** — empacotamento desktop, ver `PROMPT_TAURI_DESKTOP.md`.

---

## Snapshot de progresso

Ao terminar cada fase, atualize aqui:

- [ ] Fase 1 — Persistência real
- [ ] Fase 2 — CRUDs do core
- [ ] Fase 3 — Onboarding wizard
- [ ] Fase 4 — Júlia (engine + inbox)
- [ ] Fase 5 — Sofia (cobrança Pix)
- [ ] Fase 6 — Subscription billing
- [ ] Fase 7 — NF-e

**MVP fecha no checkbox da Fase 5.**
