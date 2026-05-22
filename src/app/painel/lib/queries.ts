import "server-only";
import { Prisma, AppointmentStatus } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

// ── Tipos derivados do Prisma (single source of truth) ──────────

export type AppointmentWithRels = Prisma.AppointmentGetPayload<{
  include: {
    patient: { select: { id: true; name: true; tag: true } };
    professional: { select: { id: true; name: true; color: true } };
    procedure: { select: { id: true; name: true; priceBRL: true } };
  };
}>;

export type PatientRow = Prisma.PatientGetPayload<{
  select: {
    id: true;
    name: true;
    phone: true;
    birthDate: true;
    tag: true;
    lastVisitAt: true;
    proceduresCount: true;
    totalSpentBRL: true;
  };
}>;

export type ConversationWithLast = Prisma.ConversationGetPayload<{
  include: {
    patient: { select: { id: true; name: true } };
    messages: { orderBy: { sentAt: "asc" } };
  };
}>;

// ── KPIs (cards do dashboard /painel) ───────────────────────────

export type KPI = {
  label: string;
  value: string;
  delta?: string;
  trend?: "up" | "down" | "flat";
  hint?: string;
};

export async function getKPIs(clinicId: string): Promise<KPI[]> {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfPrevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const endOfPrevMonth = startOfMonth;

  const [
    appointmentsThisMonth,
    revenueAgg,
    revenuePrevAgg,
    activePatients,
    confirmedNext7d,
  ] = await Promise.all([
    prisma.appointment.count({
      where: { clinicId, startsAt: { gte: startOfMonth } },
    }),
    prisma.appointment.aggregate({
      where: {
        clinicId,
        status: AppointmentStatus.ATENDIDO,
        startsAt: { gte: startOfMonth },
      },
      _sum: { priceBRL: true },
    }),
    prisma.appointment.aggregate({
      where: {
        clinicId,
        status: AppointmentStatus.ATENDIDO,
        startsAt: { gte: startOfPrevMonth, lt: endOfPrevMonth },
      },
      _sum: { priceBRL: true },
    }),
    prisma.patient.count({
      where: { clinicId, tag: { in: ["VIP", "ATIVO"] } },
    }),
    prisma.appointment.count({
      where: {
        clinicId,
        status: AppointmentStatus.CONFIRMADO,
        startsAt: {
          gte: now,
          lt: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
        },
      },
    }),
  ]);

  const revenue = Number(revenueAgg._sum.priceBRL ?? 0);
  const revenuePrev = Number(revenuePrevAgg._sum.priceBRL ?? 0);
  const delta =
    revenuePrev > 0 ? ((revenue - revenuePrev) / revenuePrev) * 100 : null;

  return [
    {
      label: "Faturamento (mês)",
      value: formatBRL(revenue),
      delta: delta !== null ? `${delta >= 0 ? "+" : ""}${delta.toFixed(1)}%` : undefined,
      trend: delta === null ? "flat" : delta >= 0 ? "up" : "down",
      hint: "vs. mês anterior",
    },
    {
      label: "Atendimentos no mês",
      value: appointmentsThisMonth.toString(),
      hint: "todas as fases",
    },
    {
      label: "Pacientes ativos",
      value: activePatients.toString(),
      hint: "VIP + Ativo",
    },
    {
      label: "Confirmados próx. 7d",
      value: confirmedNext7d.toString(),
      hint: "Júlia confirma 24h antes",
    },
  ];
}

// ── Receita por dia (últimos 7 dias, pro RevenueChart) ─────────

export type RevenuePoint = { day: string; valueBRL: number };

export async function getWeeklyRevenue(clinicId: string): Promise<RevenuePoint[]> {
  const now = new Date();
  const start = new Date(now);
  start.setDate(now.getDate() - 6);
  start.setHours(0, 0, 0, 0);

  const rows = await prisma.appointment.findMany({
    where: {
      clinicId,
      status: AppointmentStatus.ATENDIDO,
      startsAt: { gte: start },
    },
    select: { startsAt: true, priceBRL: true },
  });

  // group by yyyy-mm-dd
  const byDay = new Map<string, number>();
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    byDay.set(dayKey(d), 0);
  }
  for (const row of rows) {
    const key = dayKey(row.startsAt);
    const v = Number(row.priceBRL ?? 0);
    byDay.set(key, (byDay.get(key) ?? 0) + v);
  }

  const labels = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
  return Array.from(byDay.entries()).map(([key, valueBRL]) => {
    const d = new Date(key);
    return { day: labels[d.getDay()], valueBRL };
  });
}

// ── Agendamentos de hoje ───────────────────────────────────────

export async function getTodayAppointments(clinicId: string): Promise<AppointmentWithRels[]> {
  const now = new Date();
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(start.getDate() + 1);

  return prisma.appointment.findMany({
    where: { clinicId, startsAt: { gte: start, lt: end } },
    include: {
      patient: { select: { id: true, name: true, tag: true } },
      professional: { select: { id: true, name: true, color: true } },
      procedure: { select: { id: true, name: true, priceBRL: true } },
    },
    orderBy: { startsAt: "asc" },
  });
}

// ── Agenda da semana (7 dias × 13 slots de hora cheia 8-20) ───

export type WeekSlot = {
  time: string;
  days: Array<{
    patient: string;
    procedure: string;
    status: AppointmentStatus;
  } | null>;
};

export type WeekAgenda = {
  weekDays: string[]; // ex: "Seg 13"
  todayIndex: number;
  slots: WeekSlot[];
};

export async function getWeekAgenda(clinicId: string): Promise<WeekAgenda> {
  const now = new Date();
  // Começa na segunda (1) ou domingo (0)? Usamos segunda pra alinhar com cl iniclínica BR.
  const todayDow = now.getDay(); // 0=dom..6=sáb
  const offsetFromMonday = todayDow === 0 ? 6 : todayDow - 1;
  const monday = new Date(now);
  monday.setDate(now.getDate() - offsetFromMonday);
  monday.setHours(0, 0, 0, 0);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 7);

  const rows = await prisma.appointment.findMany({
    where: {
      clinicId,
      startsAt: { gte: monday, lt: sunday },
      status: { not: AppointmentStatus.CANCELADO },
    },
    select: {
      startsAt: true,
      status: true,
      patient: { select: { name: true } },
      procedure: { select: { name: true } },
    },
    orderBy: { startsAt: "asc" },
  });

  const dayLabels = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
  const weekDays = dayLabels.map((label, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return `${label} ${d.getDate()}`;
  });

  const slots: WeekSlot[] = [];
  for (let hour = 8; hour <= 20; hour++) {
    slots.push({
      time: `${String(hour).padStart(2, "0")}:00`,
      days: Array.from({ length: 7 }, () => null),
    });
  }

  for (const row of rows) {
    const d = row.startsAt;
    const dow = d.getDay();
    const colIdx = dow === 0 ? 6 : dow - 1;
    const slotIdx = d.getHours() - 8;
    if (slotIdx < 0 || slotIdx >= slots.length) continue;
    slots[slotIdx].days[colIdx] = {
      patient: row.patient.name,
      procedure: row.procedure.name,
      status: row.status,
    };
  }

  return { weekDays, todayIndex: offsetFromMonday, slots };
}

// ── Pacientes ──────────────────────────────────────────────────

export async function getPatients(clinicId: string): Promise<PatientRow[]> {
  return prisma.patient.findMany({
    where: { clinicId },
    select: {
      id: true,
      name: true,
      phone: true,
      birthDate: true,
      tag: true,
      lastVisitAt: true,
      proceduresCount: true,
      totalSpentBRL: true,
    },
    orderBy: [{ tag: "asc" }, { name: "asc" }],
  });
}

// ── Conversas Júlia ────────────────────────────────────────────

export async function getJuliaConversations(clinicId: string): Promise<ConversationWithLast[]> {
  return prisma.conversation.findMany({
    where: { clinicId },
    include: {
      patient: { select: { id: true, name: true } },
      messages: { orderBy: { sentAt: "asc" } },
    },
    orderBy: { lastMessageAt: "desc" },
  });
}

// ── Helpers ────────────────────────────────────────────────────

function dayKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
