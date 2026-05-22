/**
 * Seed da clínica DEMO usada na rota /demo (showcase pública).
 *
 * É idempotente: você pode rodar várias vezes que ele reseta a base
 * da clínica `demo` antes de popular de novo.
 *
 * Rode com: npm run db:seed:demo
 */
import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import {
  PrismaClient,
  PatientTag,
  AppointmentStatus,
  MessageSender,
  MembershipRole,
  UserRole,
} from "../src/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const CLINIC_SLUG = "demo";
const CLINIC_NAME = "Clínica Lumen (demo)";
const DEMO_USER_EMAIL = "demo@vela.com.br";
const DEMO_USER_NAME = "Helena Vasconcelos";
const DEMO_USER_PASSWORD = "demo123";

async function main() {
  console.log("→ Resetando clínica demo…");

  // Apaga clínica antiga (cascade derruba patients/appointments/etc)
  await prisma.clinic.deleteMany({ where: { slug: CLINIC_SLUG } });

  const clinic = await prisma.clinic.create({
    data: { name: CLINIC_NAME, slug: CLINIC_SLUG },
  });
  console.log(`✓ Clínica criada: ${clinic.id}`);

  // ── Usuário demo + membership (login p/ /demo) ────────────────
  const passwordHash = await bcrypt.hash(DEMO_USER_PASSWORD, 12);
  const demoUser = await prisma.user.upsert({
    where: { email: DEMO_USER_EMAIL },
    update: { passwordHash, emailVerified: new Date(), name: DEMO_USER_NAME },
    create: {
      email: DEMO_USER_EMAIL,
      name: DEMO_USER_NAME,
      passwordHash,
      role: UserRole.CUSTOMER,
      emailVerified: new Date(),
    },
  });
  // Membership não cascateou junto com a clínica (deletamos a clínica
  // velha, mas o user demo pode existir de seed anterior sem membership).
  await prisma.membership.deleteMany({ where: { userId: demoUser.id } });
  await prisma.membership.create({
    data: { userId: demoUser.id, clinicId: clinic.id, role: MembershipRole.ADMIN },
  });
  console.log(`✓ Usuário demo: ${DEMO_USER_EMAIL} / ${DEMO_USER_PASSWORD}`);

  // ── Profissionais ──────────────────────────────────────────────
  const professionals = await Promise.all(
    [
      { name: "Dra. Helena Vasconcelos", role: "Dermatologista", color: "C9A96E" },
      { name: "Dr. Bruno Tavares", role: "Cirurgião plástico", color: "8B6B3E" },
      { name: "Marina Silveira", role: "Esteticista", color: "1A4A4A" },
      { name: "Dra. Camila Souza", role: "Dermatologista", color: "B8943C" },
      { name: "Rafael Mendes", role: "Fisioterapeuta dermatofuncional", color: "4A5568" },
    ].map((p) => prisma.professional.create({ data: { ...p, clinicId: clinic.id } }))
  );
  console.log(`✓ ${professionals.length} profissionais`);

  // ── Procedimentos ─────────────────────────────────────────────
  const procedures = await Promise.all(
    [
      { name: "Botox (face superior)", durationMin: 45, priceBRL: 1800 },
      { name: "Preenchimento labial", durationMin: 60, priceBRL: 2400 },
      { name: "Limpeza de pele profunda", durationMin: 90, priceBRL: 350 },
      { name: "Microagulhamento", durationMin: 75, priceBRL: 800 },
      { name: "Peeling químico", durationMin: 60, priceBRL: 650 },
      { name: "Avaliação inicial", durationMin: 30, priceBRL: 0 },
      { name: "Bioestimulador (Sculptra)", durationMin: 90, priceBRL: 4200 },
      { name: "Toxina (axilas)", durationMin: 45, priceBRL: 2100 },
      { name: "Drenagem linfática", durationMin: 60, priceBRL: 280 },
      { name: "Laser CO2 fracionado", durationMin: 90, priceBRL: 3500 },
    ].map((p) => prisma.procedure.create({ data: { ...p, clinicId: clinic.id } }))
  );
  console.log(`✓ ${procedures.length} procedimentos`);

  // ── Pacientes ──────────────────────────────────────────────────
  const patientSeeds: Array<{
    name: string;
    phone: string;
    tag: PatientTag;
    birthYear: number;
  }> = [
    { name: "Helena Vasconcelos", phone: "+5511999990001", tag: "VIP", birthYear: 1985 },
    { name: "Beatriz Mello", phone: "+5511999990002", tag: "VIP", birthYear: 1978 },
    { name: "Larissa Andrade", phone: "+5511999990003", tag: "ATIVO", birthYear: 1990 },
    { name: "Sofia Carvalho", phone: "+5511999990004", tag: "ATIVO", birthYear: 1988 },
    { name: "Mariana Castro", phone: "+5511999990005", tag: "ATIVO", birthYear: 1982 },
    { name: "Júlia Ferreira", phone: "+5511999990006", tag: "ATIVO", birthYear: 1995 },
    { name: "Renata Oliveira", phone: "+5511999990007", tag: "ATIVO", birthYear: 1980 },
    { name: "Carolina Lima", phone: "+5511999990008", tag: "VIP", birthYear: 1975 },
    { name: "Isabela Rocha", phone: "+5511999990009", tag: "ATIVO", birthYear: 1992 },
    { name: "Patricia Nunes", phone: "+5511999990010", tag: "NOVO", birthYear: 1998 },
    { name: "Camila Duarte", phone: "+5511999990011", tag: "NOVO", birthYear: 1996 },
    { name: "Fernanda Pinto", phone: "+5511999990012", tag: "ATIVO", birthYear: 1986 },
    { name: "Daniela Costa", phone: "+5511999990013", tag: "INATIVO", birthYear: 1979 },
    { name: "Vanessa Ribeiro", phone: "+5511999990014", tag: "ATIVO", birthYear: 1991 },
    { name: "Aline Martins", phone: "+5511999990015", tag: "VIP", birthYear: 1983 },
    { name: "Luiza Barbosa", phone: "+5511999990016", tag: "ATIVO", birthYear: 1989 },
    { name: "Roberta Souza", phone: "+5511999990017", tag: "NOVO", birthYear: 2000 },
    { name: "Tatiana Almeida", phone: "+5511999990018", tag: "ATIVO", birthYear: 1987 },
    { name: "Gabriela Pereira", phone: "+5511999990019", tag: "INATIVO", birthYear: 1981 },
    { name: "Natalia Cardoso", phone: "+5511999990020", tag: "ATIVO", birthYear: 1993 },
  ];

  const patients = await Promise.all(
    patientSeeds.map((p) =>
      prisma.patient.create({
        data: {
          clinicId: clinic.id,
          name: p.name,
          phone: p.phone,
          tag: p.tag,
          birthDate: new Date(p.birthYear, 5, 15),
          email: `${p.name.toLowerCase().split(" ")[0]}@example.com`,
        },
      })
    )
  );
  console.log(`✓ ${patients.length} pacientes`);

  // ── Appointments (semana atual + passados pra histórico) ─────
  // Estratégia: ~30 appointments total.
  //   - 8 nos próximos 7 dias (mix CONFIRMADO / PENDENTE)
  //   - 12 nos últimos 30 dias (ATENDIDO, alimenta receita do mês)
  //   - 6 nos últimos 60-90 dias (ATENDIDO, alimenta histórico)
  //   - 2 CANCELADO / 2 AUSENTE espalhados

  const now = new Date();
  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);

  type ApSeed = {
    patientIdx: number;
    procIdx: number;
    profIdx: number;
    dayOffset: number; // dias relativos a hoje (negativo = passado)
    hour: number;
    status: AppointmentStatus;
  };

  const appointmentSeeds: ApSeed[] = [
    // hoje
    { patientIdx: 0, procIdx: 0, profIdx: 0, dayOffset: 0, hour: 9, status: AppointmentStatus.CONFIRMADO },
    { patientIdx: 1, procIdx: 6, profIdx: 0, dayOffset: 0, hour: 10, status: AppointmentStatus.CONFIRMADO },
    { patientIdx: 2, procIdx: 2, profIdx: 2, dayOffset: 0, hour: 11, status: AppointmentStatus.PENDENTE },
    { patientIdx: 3, procIdx: 1, profIdx: 1, dayOffset: 0, hour: 14, status: AppointmentStatus.CONFIRMADO },
    { patientIdx: 9, procIdx: 5, profIdx: 3, dayOffset: 0, hour: 15, status: AppointmentStatus.PENDENTE },
    { patientIdx: 7, procIdx: 7, profIdx: 0, dayOffset: 0, hour: 16, status: AppointmentStatus.CONFIRMADO },
    // próximos dias da semana
    { patientIdx: 4, procIdx: 4, profIdx: 3, dayOffset: 1, hour: 9, status: AppointmentStatus.CONFIRMADO },
    { patientIdx: 5, procIdx: 3, profIdx: 2, dayOffset: 1, hour: 11, status: AppointmentStatus.PENDENTE },
    { patientIdx: 11, procIdx: 0, profIdx: 0, dayOffset: 2, hour: 10, status: AppointmentStatus.CONFIRMADO },
    { patientIdx: 14, procIdx: 6, profIdx: 1, dayOffset: 2, hour: 14, status: AppointmentStatus.CONFIRMADO },
    { patientIdx: 15, procIdx: 2, profIdx: 2, dayOffset: 3, hour: 9, status: AppointmentStatus.PENDENTE },
    { patientIdx: 8, procIdx: 9, profIdx: 1, dayOffset: 3, hour: 15, status: AppointmentStatus.CONFIRMADO },
    // últimos 7 dias (atendidos)
    { patientIdx: 0, procIdx: 1, profIdx: 0, dayOffset: -1, hour: 14, status: AppointmentStatus.ATENDIDO },
    { patientIdx: 2, procIdx: 0, profIdx: 0, dayOffset: -1, hour: 16, status: AppointmentStatus.ATENDIDO },
    { patientIdx: 5, procIdx: 4, profIdx: 3, dayOffset: -2, hour: 10, status: AppointmentStatus.ATENDIDO },
    { patientIdx: 7, procIdx: 6, profIdx: 0, dayOffset: -2, hour: 14, status: AppointmentStatus.ATENDIDO },
    { patientIdx: 14, procIdx: 1, profIdx: 1, dayOffset: -3, hour: 11, status: AppointmentStatus.ATENDIDO },
    { patientIdx: 1, procIdx: 7, profIdx: 0, dayOffset: -4, hour: 15, status: AppointmentStatus.ATENDIDO },
    { patientIdx: 8, procIdx: 3, profIdx: 2, dayOffset: -5, hour: 10, status: AppointmentStatus.ATENDIDO },
    { patientIdx: 3, procIdx: 9, profIdx: 1, dayOffset: -6, hour: 14, status: AppointmentStatus.ATENDIDO },
    // mês corrente, mais distante
    { patientIdx: 4, procIdx: 0, profIdx: 3, dayOffset: -10, hour: 9, status: AppointmentStatus.ATENDIDO },
    { patientIdx: 6, procIdx: 8, profIdx: 4, dayOffset: -12, hour: 11, status: AppointmentStatus.ATENDIDO },
    { patientIdx: 13, procIdx: 4, profIdx: 2, dayOffset: -14, hour: 14, status: AppointmentStatus.ATENDIDO },
    { patientIdx: 19, procIdx: 2, profIdx: 2, dayOffset: -18, hour: 16, status: AppointmentStatus.ATENDIDO },
    // mês anterior (alimenta delta vs anterior)
    { patientIdx: 0, procIdx: 6, profIdx: 0, dayOffset: -35, hour: 14, status: AppointmentStatus.ATENDIDO },
    { patientIdx: 1, procIdx: 1, profIdx: 1, dayOffset: -42, hour: 10, status: AppointmentStatus.ATENDIDO },
    { patientIdx: 7, procIdx: 0, profIdx: 0, dayOffset: -50, hour: 11, status: AppointmentStatus.ATENDIDO },
    // exceções
    { patientIdx: 12, procIdx: 5, profIdx: 0, dayOffset: -3, hour: 9, status: AppointmentStatus.CANCELADO },
    { patientIdx: 18, procIdx: 5, profIdx: 0, dayOffset: -5, hour: 16, status: AppointmentStatus.AUSENTE },
    { patientIdx: 10, procIdx: 2, profIdx: 2, dayOffset: -7, hour: 11, status: AppointmentStatus.CANCELADO },
  ];

  const appointments = await Promise.all(
    appointmentSeeds.map((s) => {
      const startsAt = new Date(startOfToday);
      startsAt.setDate(startOfToday.getDate() + s.dayOffset);
      startsAt.setHours(s.hour, 0, 0, 0);
      const proc = procedures[s.procIdx];
      const useTablePrice = s.status === AppointmentStatus.ATENDIDO;
      return prisma.appointment.create({
        data: {
          clinicId: clinic.id,
          patientId: patients[s.patientIdx].id,
          procedureId: proc.id,
          professionalId: professionals[s.profIdx].id,
          startsAt,
          durationMin: proc.durationMin,
          status: s.status,
          priceBRL: useTablePrice ? proc.priceBRL : null,
        },
      });
    })
  );
  console.log(`✓ ${appointments.length} agendamentos`);

  // ── Denormalizar contadores em Patient ────────────────────────
  for (const patient of patients) {
    const attended = await prisma.appointment.findMany({
      where: { patientId: patient.id, status: AppointmentStatus.ATENDIDO },
      select: { startsAt: true, priceBRL: true },
      orderBy: { startsAt: "desc" },
    });
    const total = attended.reduce((sum, a) => sum + Number(a.priceBRL ?? 0), 0);
    await prisma.patient.update({
      where: { id: patient.id },
      data: {
        proceduresCount: attended.length,
        totalSpentBRL: total,
        lastVisitAt: attended[0]?.startsAt ?? null,
      },
    });
  }
  console.log("✓ Denormalizado proceduresCount / lastVisitAt / totalSpentBRL");

  // ── Conversas da Júlia ────────────────────────────────────────
  const convSeeds = [
    {
      patientIdx: 0,
      unread: 0,
      messages: [
        { sender: MessageSender.PATIENT, text: "Oi! Consigo remarcar a sessão de quinta?" },
        { sender: MessageSender.JULIA, text: "Claro, Helena. Tenho quinta às 14h ou sexta às 10h. Qual prefere?" },
        { sender: MessageSender.PATIENT, text: "Sexta 10h tá ótimo, obrigada!" },
        { sender: MessageSender.JULIA, text: "Reagendado para sexta-feira às 10h com a Dra. Helena. Mando lembrete na quinta à noite. ✨" },
      ],
    },
    {
      patientIdx: 2,
      unread: 2,
      messages: [
        { sender: MessageSender.PATIENT, text: "Boa tarde, posso adiar para semana que vem?" },
        { sender: MessageSender.JULIA, text: "Posso sim. Tenho terça às 11h, quarta às 14h ou sexta às 16h." },
        { sender: MessageSender.PATIENT, text: "Quarta 14h" },
        { sender: MessageSender.PATIENT, text: "E vou levar minha filha pra avaliação tb, dá pra encaixar?" },
      ],
    },
    {
      patientIdx: 5,
      unread: 0,
      messages: [
        { sender: MessageSender.JULIA, text: "Júlia, lembrando seu botox amanhã às 9h com a Dra. Helena. Confirma?" },
        { sender: MessageSender.PATIENT, text: "Confirmo!" },
        { sender: MessageSender.JULIA, text: "Combinado. Evita álcool hoje à noite e cafeína 2h antes. Até amanhã 🌿" },
      ],
    },
    {
      patientIdx: 11,
      unread: 1,
      messages: [
        { sender: MessageSender.PATIENT, text: "Quanto fica o preenchimento labial?" },
        { sender: MessageSender.JULIA, text: "R$ 2.400 com produto Allergan, sessão de 1h. Posso te enviar 2 horários esta semana?" },
        { sender: MessageSender.PATIENT, text: "Pode" },
      ],
    },
    {
      patientIdx: 14,
      unread: 0,
      messages: [
        { sender: MessageSender.PATIENT, text: "A Dra. Camila tá atendendo dia 28?" },
        { sender: MessageSender.JULIA, text: "Sim, tem manhã (9h/10h/11h) e tarde (14h/15h). Algum desses?" },
        { sender: MessageSender.PATIENT, text: "11h." },
        { sender: MessageSender.JULIA, text: "Agendado. Vou mandar lembrete 24h antes." },
      ],
    },
    {
      patientIdx: 7,
      unread: 0,
      messages: [
        { sender: MessageSender.HUMAN, text: "Carolina, te liguei mas não atendeu. Tudo bem?" },
        { sender: MessageSender.PATIENT, text: "Oi, desculpa, estava em reunião. Pode me chamar agora" },
        { sender: MessageSender.HUMAN, text: "Te ligo em 2min." },
      ],
    },
  ];

  for (let i = 0; i < convSeeds.length; i++) {
    const seed = convSeeds[i];
    const conv = await prisma.conversation.create({
      data: {
        clinicId: clinic.id,
        patientId: patients[seed.patientIdx].id,
        unread: seed.unread,
        lastPreview: seed.messages[seed.messages.length - 1].text.slice(0, 80),
        lastMessageAt: new Date(Date.now() - i * 30 * 60 * 1000),
      },
    });
    for (let j = 0; j < seed.messages.length; j++) {
      const m = seed.messages[j];
      const sentAt = new Date(
        Date.now() - i * 30 * 60 * 1000 - (seed.messages.length - j) * 60 * 1000
      );
      await prisma.message.create({
        data: { conversationId: conv.id, sender: m.sender, text: m.text, sentAt },
      });
    }
  }
  console.log(`✓ ${convSeeds.length} conversas`);

  console.log("\n✨ Seed demo concluído.");
  console.log(`   Login: ${DEMO_USER_EMAIL} / ${DEMO_USER_PASSWORD}`);
  console.log("   Visite http://localhost:3000/entrar → entra com essas credenciais → /demo");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
