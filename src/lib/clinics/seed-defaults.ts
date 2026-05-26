// Sem "import 'server-only'" intencionalmente: este módulo também é
// importado pelos scripts standalone em prisma/scripts/ via tsx, que
// não rodam dentro do bundler RSC do Next.js. As funções tocam
// prisma diretamente — chamar do client falharia em runtime de
// qualquer jeito.
import { prisma } from "@/lib/prisma";

/**
 * Defaults injetados na criação de uma Clinic (Fase 2.5 — tutorial leve).
 *
 * Princípio do BUILD_PLAN.md §"Princípios de UX (locked)" item 2:
 * "Defaults inteligentes pra clínica nova. (…) procedimentos genéricos
 *  pré-cadastrados (consulta, avaliação, retorno) (…). Cliente edita o
 *  que não serve."
 *
 * BusinessHours fica pra Fase 2.6 (rota /painel/configuracoes/horarios).
 *
 * Idempotência: se a clínica já tem qualquer Procedure ativo, o helper
 * NÃO injeta nada. Trade-off: se o admin manualmente criar 1 procedimento
 * próprio antes do helper, os defaults não entram. Em troca, chamar 2x
 * nunca duplica.
 */
export async function seedClinicDefaults(clinicId: string): Promise<void> {
  const existing = await prisma.procedure.count({
    where: { clinicId, active: true },
  });
  if (existing > 0) return;

  await prisma.procedure.createMany({
    data: [
      { clinicId, name: "Consulta", durationMin: 30 },
      { clinicId, name: "Retorno", durationMin: 30 },
      { clinicId, name: "Avaliação", durationMin: 30 },
    ],
  });
}

/**
 * Cria o primeiro Professional da clínica usando o nome do user admin.
 *
 * Chamado em /api/registrar/route.ts logo após o User + Membership ADMIN
 * serem criados. Não pode ficar dentro de seedClinicDefaults porque na
 * aprovação do lead a Clinic já existe mas ainda não há User registrado.
 *
 * BUILD_PLAN.md §"Defaults injetados (Fase 2.5)":
 * "o user que criou a clínica vira Professional com role livre
 *  (ex 'Administradora'). Pode desativar depois."
 *
 * Idempotência: se a clínica já tem qualquer Professional ativo, pula.
 * O schema atual não tem FK userId em Professional — o vínculo é
 * implícito por nome. Reaceitação documentada do trade-off.
 *
 * SEM catch silencioso: falha aqui aborta o /api/registrar. Justificativa:
 * o Professional inicial é parte do contrato "clínica funcional pós-registro".
 *
 * Cor: não passamos `color` explícito — caímos no `@default("2A6062")` do
 * schema, que coincide com PROFESSIONAL_PALETTE[0] ("Teal"). Reverter via UI
 * funciona porque a cor está na paleta canônica. Refatorar pra passar cor
 * explícita quando refatorar o Button legacy (ver Dívida técnica Fase 2.5).
 */
export async function createInitialProfessionalForAdmin(
  _userId: string,
  clinicId: string,
  userName: string,
): Promise<void> {
  const existing = await prisma.professional.count({
    where: { clinicId, active: true },
  });
  if (existing > 0) return;

  await prisma.professional.create({
    data: {
      clinicId,
      name: userName,
      role: "Administradora",
    },
  });
}

/**
 * Defaults de horário de funcionamento injetados na criação de uma Clinic
 * (Fase 2.6, BUILD_PLAN.md §"Defaults injetados").
 *
 * Defaults:
 *   - Segunda a sexta: 08:00–18:00, aberto.
 *   - Sábado: 08:00–12:00, aberto.
 *   - Domingo: 08:00–12:00, FECHADO (active=false). Mantemos horário default
 *     por consistência com a regex do Zod (opensAt < closesAt sempre).
 *
 * Idempotência: count === 0 → cria os 7; caso contrário não toca.
 *
 * Função SEPARADA de seedClinicDefaults intencionalmente: callers podem
 * querer rodar horários isoladamente (ex: clínica antiga pré-2.6 sem
 * horários cadastrados).
 *
 * NÃO seta Clinic.businessHoursCustomizedAt — esse campo só é setado quando
 * o admin salva via UI. Defaults injetados = "ainda não personalizou", o que
 * mantém o item "Personalizar horários" pendente no checklist de onboarding.
 */
export async function seedClinicBusinessHours(clinicId: string): Promise<void> {
  const existing = await prisma.businessHours.count({ where: { clinicId } });
  if (existing > 0) return;

  await prisma.businessHours.createMany({
    data: [
      { clinicId, weekday: "SEGUNDA", opensAt: "08:00", closesAt: "18:00", active: true },
      { clinicId, weekday: "TERCA",   opensAt: "08:00", closesAt: "18:00", active: true },
      { clinicId, weekday: "QUARTA",  opensAt: "08:00", closesAt: "18:00", active: true },
      { clinicId, weekday: "QUINTA",  opensAt: "08:00", closesAt: "18:00", active: true },
      { clinicId, weekday: "SEXTA",   opensAt: "08:00", closesAt: "18:00", active: true },
      { clinicId, weekday: "SABADO",  opensAt: "08:00", closesAt: "12:00", active: true },
      { clinicId, weekday: "DOMINGO", opensAt: "08:00", closesAt: "12:00", active: false },
    ],
  });
}
