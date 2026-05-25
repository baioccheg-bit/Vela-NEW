"use server";

import { revalidatePath } from "next/cache";
import type { z } from "zod";
import { PatientTag } from "@/generated/prisma/client";

import { requireMembership } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

import {
  patientInputSchema,
  patientNotesSchema,
  patientTagSchema,
  type ActionResult,
  type PatientInput,
} from "./lib/schema";

const LIST_PATH = "/painel/pacientes";

function flattenFieldErrors(
  err: z.ZodError<PatientInput>,
): Record<string, string> {
  const flat = err.flatten().fieldErrors;
  return Object.fromEntries(
    Object.entries(flat).map(([k, v]) => [k, v?.[0] ?? "Campo inválido"]),
  );
}

function parseForm(fd: FormData) {
  return patientInputSchema.safeParse({
    name: String(fd.get("name") ?? ""),
    phone: String(fd.get("phone") ?? ""),
    email: String(fd.get("email") ?? ""),
    cpf: String(fd.get("cpf") ?? ""),
    birthDate: String(fd.get("birthDate") ?? ""),
    tag: String(fd.get("tag") ?? "NOVO"),
    notes: String(fd.get("notes") ?? ""),
  });
}

/**
 * Normaliza undefined → null pros campos opcionais antes de mandar pro Prisma.
 * Sem isso, `undefined` faz o Prisma "não atualizar"; precisamos do null
 * explícito pra permitir limpar email/cpf/birthDate/notes no edit.
 */
function toDbData(parsed: PatientInput) {
  return {
    name: parsed.name,
    phone: parsed.phone,
    tag: parsed.tag,
    email: parsed.email ?? null,
    cpf: parsed.cpf ?? null,
    birthDate: parsed.birthDate ?? null,
    notes: parsed.notes ?? null,
  };
}

/**
 * Cria um novo paciente na clínica do membership atual.
 * clinicId vem da sessão — nunca do FormData.
 */
export async function createPatient(
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

  try {
    const created = await prisma.patient.create({
      data: { ...toDbData(parsed.data), clinicId },
      select: { id: true },
    });
    revalidatePath(LIST_PATH);
    return { ok: true, data: { id: created.id } };
  } catch {
    // LGPD: não logamos o input bruto (telefone/CPF/email/notes).
    return { ok: false, error: "Não foi possível cadastrar. Tente novamente." };
  }
}

/**
 * Atualiza um paciente. `id` é bound via `.bind(null, id)` no client.
 * O where compound { id, clinicId } fecha IDOR.
 */
export async function updatePatient(
  id: string,
  _prev: ActionResult<unknown> | null,
  fd: FormData,
): Promise<ActionResult> {
  const { clinicId } = await requireMembership(`${LIST_PATH}/${id}`);

  const parsed = parseForm(fd);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Verifique os campos destacados.",
      fieldErrors: flattenFieldErrors(parsed.error),
    };
  }

  try {
    const r = await prisma.patient.updateMany({
      where: { id, clinicId },
      data: toDbData(parsed.data),
    });
    if (r.count === 0) {
      return { ok: false, error: "Paciente não encontrado." };
    }
    revalidatePath(LIST_PATH);
    revalidatePath(`${LIST_PATH}/${id}`);
    return { ok: true, data: null };
  } catch {
    return { ok: false, error: "Não foi possível salvar. Tente novamente." };
  }
}

/**
 * Atalho para salvar só as observações (edit inline na ficha).
 * String vazia limpa o campo (vai como null no banco).
 */
export async function updatePatientNotes(
  id: string,
  notes: string,
): Promise<ActionResult> {
  const { clinicId } = await requireMembership(`${LIST_PATH}/${id}`);

  const parsed = patientNotesSchema.safeParse(notes);
  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? "Observações inválidas.",
    };
  }

  try {
    const r = await prisma.patient.updateMany({
      where: { id, clinicId },
      data: { notes: parsed.data.trim() === "" ? null : parsed.data },
    });
    if (r.count === 0) {
      return { ok: false, error: "Paciente não encontrado." };
    }
    revalidatePath(`${LIST_PATH}/${id}`);
    return { ok: true, data: null };
  } catch {
    return { ok: false, error: "Não foi possível salvar." };
  }
}

/**
 * Atalho para o dropdown de tag na ficha. Tag é manual no MVP.
 */
export async function updatePatientTag(
  id: string,
  tag: PatientTag,
): Promise<ActionResult> {
  const { clinicId } = await requireMembership(`${LIST_PATH}/${id}`);

  const parsed = patientTagSchema.safeParse(tag);
  if (!parsed.success) {
    return { ok: false, error: "Tag inválida." };
  }

  try {
    const r = await prisma.patient.updateMany({
      where: { id, clinicId },
      data: { tag: parsed.data },
    });
    if (r.count === 0) {
      return { ok: false, error: "Paciente não encontrado." };
    }
    revalidatePath(LIST_PATH);
    revalidatePath(`${LIST_PATH}/${id}`);
    return { ok: true, data: null };
  } catch {
    return { ok: false, error: "Não foi possível salvar." };
  }
}
