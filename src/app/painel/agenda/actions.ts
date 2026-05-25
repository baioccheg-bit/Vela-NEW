"use server";

import { revalidatePath } from "next/cache";
import type { z } from "zod";
import { AppointmentStatus } from "@/generated/prisma/client";

import { requireMembership } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

// String literal (sem importar `Prisma` como valor — arrastaria runtime
// do Prisma pro bundle do client via stub de server action).
const TX_SERIALIZABLE = "Serializable" as const;
const ERR_SERIALIZATION_FAILURE = "P2034";

import {
  appointmentInputSchema,
  cancelSchema,
  DURATION_MAX,
  isTerminal,
  NON_BLOCKING_STATUSES,
  rescheduleSchema,
  type ActionResult,
  type AppointmentInput,
} from "./lib/schema";

const LIST_PATH = "/painel/agenda";
const OVERVIEW_PATH = "/painel";

// ── Tipos auxiliares ───────────────────────────────────────────

type ConflictKind =
  | "VALIDATION"
  | "NOT_FOUND"
  | "INACTIVE_PATIENT"
  | "INACTIVE_PROFESSIONAL"
  | "INACTIVE_PROCEDURE"
  | "MISMATCHED_CLINIC"
  | "SLOT_CONFLICT"
  | "TERMINAL_STATUS"
  | "INVALID_TRANSITION";

class DomainError extends Error {
  constructor(public kind: ConflictKind, message: string) {
    super(message);
  }
}

// ── Helpers ────────────────────────────────────────────────────

function flattenFieldErrors(
  err: z.ZodError<AppointmentInput>,
): Record<string, string> {
  const flat = err.flatten().fieldErrors;
  return Object.fromEntries(
    Object.entries(flat).map(([k, v]) => [k, v?.[0] ?? "Campo inválido"]),
  );
}

function parseForm(fd: FormData) {
  return appointmentInputSchema.safeParse({
    patientId: String(fd.get("patientId") ?? ""),
    professionalId: String(fd.get("professionalId") ?? ""),
    procedureId: String(fd.get("procedureId") ?? ""),
    startsAt: String(fd.get("startsAt") ?? ""),
    durationMin: String(fd.get("durationMin") ?? ""),
    priceBRL: String(fd.get("priceBRL") ?? ""),
    notes: String(fd.get("notes") ?? ""),
  });
}

function mapDomainErrorToResult(err: DomainError): ActionResult<never> {
  return { ok: false, error: err.message };
}

function mapUnknownErrorToResult(err: unknown): ActionResult<never> {
  // Prisma SERIALIZABLE conflict — outro operador escreveu o mesmo slot.
  // Duck-typing por `code` pra evitar importar o constructor (que arrastaria
  // o runtime do Prisma pro bundle do client via server-action stub).
  if (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    (err as { code?: unknown }).code === ERR_SERIALIZATION_FAILURE
  ) {
    return {
      ok: false,
      error: "Outro operador agendou neste horário. Recarregue e tente novamente.",
    };
  }
  // LGPD: não logamos input bruto (paciente/notes/telefone).
  return { ok: false, error: "Não foi possível salvar. Tente novamente." };
}

/**
 * Janela de busca de candidatos pro conflict check (R2 da Fase 2.4).
 *
 * Existente conflita com novo [newStartsAt, newStartsAt + newDuration) quando
 *   existing.startsAt + existing.durationMin > newStartsAt
 *   AND existing.startsAt < newStartsAt + newDuration
 *
 * Como existing.durationMin <= DURATION_MAX, basta buscar candidatos com
 *   startsAt >= newStartsAt - DURATION_MAX min  (cobre o caso 23:00 cruzando 00:30)
 *   AND startsAt < newStartsAt + newDuration min
 * e refinar com o teste exato em JS.
 */
function buildConflictWindow(newStartsAt: Date, newDurationMin: number) {
  return {
    windowStart: new Date(newStartsAt.getTime() - DURATION_MAX * 60_000),
    windowEnd: new Date(newStartsAt.getTime() + newDurationMin * 60_000),
  };
}

type CandidateRow = { id: string; startsAt: Date; durationMin: number };

function hasOverlap(
  candidates: CandidateRow[],
  newStartsAt: Date,
  newDurationMin: number,
  excludeId: string | null,
): boolean {
  const newEnd = new Date(newStartsAt.getTime() + newDurationMin * 60_000);
  return candidates.some((c) => {
    if (excludeId && c.id === excludeId) return false;
    const cEnd = new Date(c.startsAt.getTime() + c.durationMin * 60_000);
    return c.startsAt < newEnd && newStartsAt < cEnd;
  });
}

// ── createAppointment ──────────────────────────────────────────

export async function createAppointment(
  _prev: ActionResult<unknown> | null,
  fd: FormData,
): Promise<ActionResult<{ id: string }>> {
  const { clinicId } = await requireMembership(LIST_PATH);

  const parsed = parseForm(fd);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Verifique os campos destacados.",
      fieldErrors: flattenFieldErrors(parsed.error),
    };
  }
  const input = parsed.data;

  try {
    const created = await prisma.$transaction(
      async (tx) => {
        const [patient, professional, procedure] = await Promise.all([
          tx.patient.findFirst({
            where: { id: input.patientId, clinicId },
            select: { id: true },
          }),
          tx.professional.findFirst({
            where: { id: input.professionalId, clinicId },
            select: { id: true, active: true },
          }),
          tx.procedure.findFirst({
            where: { id: input.procedureId, clinicId },
            select: {
              id: true,
              active: true,
              durationMin: true,
              priceBRL: true,
            },
          }),
        ]);

        if (!patient) throw new DomainError("MISMATCHED_CLINIC", "Paciente não encontrado.");
        if (!professional) throw new DomainError("MISMATCHED_CLINIC", "Profissional não encontrado.");
        if (!procedure) throw new DomainError("MISMATCHED_CLINIC", "Procedimento não encontrado.");
        if (!professional.active) throw new DomainError("INACTIVE_PROFESSIONAL", "Profissional inativo.");
        if (!procedure.active) throw new DomainError("INACTIVE_PROCEDURE", "Procedimento inativo.");

        // Snapshot: override do form, fallback pro Procedure atual.
        const duration = input.durationMin ?? procedure.durationMin;
        // Prisma aceita number/string/Decimal em colunas Decimal — passamos
        // o number direto pra não importar o constructor `Prisma.Decimal`.
        const price =
          input.priceBRL !== undefined ? input.priceBRL : procedure.priceBRL;

        const { windowStart, windowEnd } = buildConflictWindow(
          input.startsAt,
          duration,
        );
        const candidates = await tx.appointment.findMany({
          where: {
            clinicId,
            professionalId: input.professionalId,
            status: { notIn: NON_BLOCKING_STATUSES },
            startsAt: { gte: windowStart, lt: windowEnd },
          },
          select: { id: true, startsAt: true, durationMin: true },
        });

        if (hasOverlap(candidates, input.startsAt, duration, null)) {
          throw new DomainError(
            "SLOT_CONFLICT",
            "Profissional já tem um agendamento neste horário.",
          );
        }

        return tx.appointment.create({
          data: {
            clinicId,
            patientId: input.patientId,
            professionalId: input.professionalId,
            procedureId: input.procedureId,
            startsAt: input.startsAt,
            durationMin: duration,
            priceBRL: price,
            notes: input.notes ?? null,
            status: AppointmentStatus.PENDENTE,
          },
          select: { id: true },
        });
      },
      { isolationLevel: TX_SERIALIZABLE },
    );

    revalidatePath(LIST_PATH);
    revalidatePath(OVERVIEW_PATH);
    return { ok: true, data: { id: created.id } };
  } catch (err) {
    if (err instanceof DomainError) return mapDomainErrorToResult(err);
    return mapUnknownErrorToResult(err);
  }
}

// ── updateAppointment (full edit; só não-terminal) ────────────

export async function updateAppointment(
  id: string,
  _prev: ActionResult<unknown> | null,
  fd: FormData,
): Promise<ActionResult> {
  const { clinicId } = await requireMembership(LIST_PATH);

  const parsed = parseForm(fd);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Verifique os campos destacados.",
      fieldErrors: flattenFieldErrors(parsed.error),
    };
  }
  const input = parsed.data;

  try {
    await prisma.$transaction(
      async (tx) => {
        const current = await tx.appointment.findFirst({
          where: { id, clinicId },
          select: {
            id: true,
            status: true,
            patientId: true,
            professionalId: true,
            procedureId: true,
          },
        });
        if (!current) throw new DomainError("NOT_FOUND", "Agendamento não encontrado.");
        if (isTerminal(current.status)) {
          throw new DomainError(
            "TERMINAL_STATUS",
            "Agendamento já finalizado. Use o atalho de observações.",
          );
        }

        // Active check apenas nos campos que o operador trocou (R1).
        const patientChanged = current.patientId !== input.patientId;
        const professionalChanged = current.professionalId !== input.professionalId;
        const procedureChanged = current.procedureId !== input.procedureId;

        const [patient, professional, procedure] = await Promise.all([
          tx.patient.findFirst({
            where: { id: input.patientId, clinicId },
            select: { id: true },
          }),
          tx.professional.findFirst({
            where: { id: input.professionalId, clinicId },
            select: { id: true, active: true },
          }),
          tx.procedure.findFirst({
            where: { id: input.procedureId, clinicId },
            select: {
              id: true,
              active: true,
              durationMin: true,
              priceBRL: true,
            },
          }),
        ]);

        if (!patient) throw new DomainError("MISMATCHED_CLINIC", "Paciente não encontrado.");
        if (!professional) throw new DomainError("MISMATCHED_CLINIC", "Profissional não encontrado.");
        if (!procedure) throw new DomainError("MISMATCHED_CLINIC", "Procedimento não encontrado.");
        if (professionalChanged && !professional.active) {
          throw new DomainError("INACTIVE_PROFESSIONAL", "Profissional inativo.");
        }
        if (procedureChanged && !procedure.active) {
          throw new DomainError("INACTIVE_PROCEDURE", "Procedimento inativo.");
        }
        // Paciente não tem flag active no schema atual — só validamos clinicId.
        void patientChanged;

        const duration = input.durationMin ?? procedure.durationMin;
        // Prisma aceita number/string/Decimal em colunas Decimal — passamos
        // o number direto pra não importar o constructor `Prisma.Decimal`.
        const price =
          input.priceBRL !== undefined ? input.priceBRL : procedure.priceBRL;

        const { windowStart, windowEnd } = buildConflictWindow(
          input.startsAt,
          duration,
        );
        const candidates = await tx.appointment.findMany({
          where: {
            clinicId,
            professionalId: input.professionalId,
            status: { notIn: NON_BLOCKING_STATUSES },
            startsAt: { gte: windowStart, lt: windowEnd },
          },
          select: { id: true, startsAt: true, durationMin: true },
        });
        if (hasOverlap(candidates, input.startsAt, duration, id)) {
          throw new DomainError(
            "SLOT_CONFLICT",
            "Profissional já tem um agendamento neste horário.",
          );
        }

        await tx.appointment.update({
          where: { id },
          data: {
            patientId: input.patientId,
            professionalId: input.professionalId,
            procedureId: input.procedureId,
            startsAt: input.startsAt,
            durationMin: duration,
            priceBRL: price,
            notes: input.notes ?? null,
          },
        });
      },
      { isolationLevel: TX_SERIALIZABLE },
    );

    revalidatePath(LIST_PATH);
    revalidatePath(OVERVIEW_PATH);
    return { ok: true, data: null };
  } catch (err) {
    if (err instanceof DomainError) return mapDomainErrorToResult(err);
    return mapUnknownErrorToResult(err);
  }
}

// ── updateAppointmentNotes (atalho — funciona em qualquer status) ─

export async function updateAppointmentNotes(
  id: string,
  notes: string,
): Promise<ActionResult> {
  const { clinicId } = await requireMembership(LIST_PATH);

  if (typeof notes !== "string" || notes.length > 2000) {
    return { ok: false, error: "Observações inválidas." };
  }

  try {
    const r = await prisma.appointment.updateMany({
      where: { id, clinicId },
      data: { notes: notes.trim() === "" ? null : notes },
    });
    if (r.count === 0) {
      return { ok: false, error: "Agendamento não encontrado." };
    }
    revalidatePath(LIST_PATH);
    return { ok: true, data: null };
  } catch {
    return { ok: false, error: "Não foi possível salvar." };
  }
}

// ── confirmAppointment (idempotente) ──────────────────────────

export async function confirmAppointment(id: string): Promise<ActionResult> {
  const { clinicId } = await requireMembership(LIST_PATH);

  try {
    const current = await prisma.appointment.findFirst({
      where: { id, clinicId },
      select: { id: true, status: true },
    });
    if (!current) return { ok: false, error: "Agendamento não encontrado." };

    if (current.status === AppointmentStatus.CONFIRMADO) {
      return { ok: true, data: null }; // idempotente
    }
    if (current.status !== AppointmentStatus.PENDENTE) {
      return {
        ok: false,
        error: "Só agendamentos pendentes podem ser confirmados.",
      };
    }

    await prisma.appointment.update({
      where: { id },
      data: { status: AppointmentStatus.CONFIRMADO },
    });
    revalidatePath(LIST_PATH);
    revalidatePath(OVERVIEW_PATH);
    return { ok: true, data: null };
  } catch {
    return { ok: false, error: "Não foi possível confirmar." };
  }
}

// ── attendAppointment ─────────────────────────────────────────

export async function attendAppointment(id: string): Promise<ActionResult> {
  const { clinicId } = await requireMembership(LIST_PATH);

  try {
    const current = await prisma.appointment.findFirst({
      where: { id, clinicId },
      select: { id: true, status: true },
    });
    if (!current) return { ok: false, error: "Agendamento não encontrado." };

    if (current.status === AppointmentStatus.ATENDIDO) {
      return { ok: true, data: null };
    }
    if (
      current.status !== AppointmentStatus.CONFIRMADO &&
      current.status !== AppointmentStatus.PENDENTE
    ) {
      return {
        ok: false,
        error: "Só agendamentos ativos podem ser marcados como atendidos.",
      };
    }

    await prisma.appointment.update({
      where: { id },
      data: { status: AppointmentStatus.ATENDIDO },
    });

    // TODO Fase 5: trigger Sofia — criar Charge via gateway abstrato.
    // Ver docs/BUILD_PLAN.md §"Fase 5" e src/lib/payments/types.ts (a criar).

    revalidatePath(LIST_PATH);
    revalidatePath(OVERVIEW_PATH);
    return { ok: true, data: null };
  } catch {
    return { ok: false, error: "Não foi possível registrar atendimento." };
  }
}

// ── missAppointment ───────────────────────────────────────────

export async function missAppointment(id: string): Promise<ActionResult> {
  const { clinicId } = await requireMembership(LIST_PATH);

  try {
    const current = await prisma.appointment.findFirst({
      where: { id, clinicId },
      select: { id: true, status: true },
    });
    if (!current) return { ok: false, error: "Agendamento não encontrado." };

    if (current.status === AppointmentStatus.AUSENTE) {
      return { ok: true, data: null };
    }
    if (
      current.status !== AppointmentStatus.CONFIRMADO &&
      current.status !== AppointmentStatus.PENDENTE
    ) {
      return {
        ok: false,
        error: "Só agendamentos ativos podem ser marcados como ausentes.",
      };
    }

    await prisma.appointment.update({
      where: { id },
      data: { status: AppointmentStatus.AUSENTE },
    });
    revalidatePath(LIST_PATH);
    revalidatePath(OVERVIEW_PATH);
    return { ok: true, data: null };
  } catch {
    return { ok: false, error: "Não foi possível marcar como ausente." };
  }
}

// ── cancelAppointment ─────────────────────────────────────────

export async function cancelAppointment(
  id: string,
  reason?: string,
): Promise<ActionResult> {
  const { clinicId } = await requireMembership(LIST_PATH);

  const parsed = cancelSchema.safeParse({ reason: reason ?? "" });
  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? "Motivo inválido.",
    };
  }

  try {
    const current = await prisma.appointment.findFirst({
      where: { id, clinicId },
      select: { id: true, status: true, notes: true },
    });
    if (!current) return { ok: false, error: "Agendamento não encontrado." };
    if (current.status === AppointmentStatus.CANCELADO) {
      return { ok: true, data: null };
    }
    if (isTerminal(current.status)) {
      return {
        ok: false,
        error: "Agendamento já finalizado e não pode ser cancelado.",
      };
    }

    // Motivo (opcional) vira append ao final das notas — sem campo dedicado
    // no schema atual. Preferimos isso a criar cancelReason via migration
    // só pra MVP. Fase futura: campo próprio se Atlas precisar agregar.
    let newNotes = current.notes;
    const reasonTrimmed = parsed.data.reason?.trim();
    if (reasonTrimmed) {
      const tag = `[cancelado: ${reasonTrimmed}]`;
      newNotes = current.notes ? `${current.notes}\n${tag}` : tag;
    }

    await prisma.appointment.update({
      where: { id },
      data: {
        status: AppointmentStatus.CANCELADO,
        notes: newNotes,
      },
    });
    revalidatePath(LIST_PATH);
    revalidatePath(OVERVIEW_PATH);
    return { ok: true, data: null };
  } catch {
    return { ok: false, error: "Não foi possível cancelar." };
  }
}

// ── rescheduleAppointment ─────────────────────────────────────

export async function rescheduleAppointment(
  id: string,
  _prev: ActionResult<unknown> | null,
  fd: FormData,
): Promise<ActionResult> {
  const { clinicId } = await requireMembership(LIST_PATH);

  const parsed = rescheduleSchema.safeParse({
    startsAt: String(fd.get("startsAt") ?? ""),
  });
  if (!parsed.success) {
    const fieldErrors = Object.fromEntries(
      Object.entries(parsed.error.flatten().fieldErrors).map(([k, v]) => [
        k,
        v?.[0] ?? "Campo inválido",
      ]),
    );
    return {
      ok: false,
      error: "Verifique os campos destacados.",
      fieldErrors,
    };
  }
  const { startsAt: newStartsAt } = parsed.data;

  try {
    await prisma.$transaction(
      async (tx) => {
        const current = await tx.appointment.findFirst({
          where: { id, clinicId },
          select: {
            id: true,
            status: true,
            professionalId: true,
            durationMin: true,
            startsAt: true,
            originalStartsAt: true,
          },
        });
        if (!current) throw new DomainError("NOT_FOUND", "Agendamento não encontrado.");
        if (isTerminal(current.status)) {
          throw new DomainError(
            "TERMINAL_STATUS",
            "Agendamento já finalizado não pode ser reagendado.",
          );
        }
        if (!current.professionalId) {
          throw new DomainError(
            "VALIDATION",
            "Agendamento sem profissional não pode ser reagendado.",
          );
        }

        const { windowStart, windowEnd } = buildConflictWindow(
          newStartsAt,
          current.durationMin,
        );
        const candidates = await tx.appointment.findMany({
          where: {
            clinicId,
            professionalId: current.professionalId,
            status: { notIn: NON_BLOCKING_STATUSES },
            startsAt: { gte: windowStart, lt: windowEnd },
          },
          select: { id: true, startsAt: true, durationMin: true },
        });
        if (hasOverlap(candidates, newStartsAt, current.durationMin, id)) {
          throw new DomainError(
            "SLOT_CONFLICT",
            "Profissional já tem um agendamento neste horário.",
          );
        }

        await tx.appointment.update({
          where: { id },
          data: {
            startsAt: newStartsAt,
            // Preserva o original. Só seta no PRIMEIRO reschedule.
            originalStartsAt: current.originalStartsAt ?? current.startsAt,
            rescheduledAt: new Date(),
          },
        });
      },
      { isolationLevel: TX_SERIALIZABLE },
    );

    revalidatePath(LIST_PATH);
    revalidatePath(OVERVIEW_PATH);
    return { ok: true, data: null };
  } catch (err) {
    if (err instanceof DomainError) return mapDomainErrorToResult(err);
    return mapUnknownErrorToResult(err);
  }
}
