"use server";

import { revalidatePath } from "next/cache";
import type { z } from "zod";

import { requireMembership } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

import {
  professionalInputSchema,
  type ActionResult,
  type ProfessionalInput,
} from "./lib/schema";

const LIST_PATH = "/painel/configuracoes/profissionais";

function flattenFieldErrors(
  err: z.ZodError<ProfessionalInput>,
): Record<string, string> {
  const flat = err.flatten().fieldErrors;
  return Object.fromEntries(
    Object.entries(flat).map(([k, v]) => [k, v?.[0] ?? "Campo inválido"]),
  );
}

function parseForm(fd: FormData) {
  return professionalInputSchema.safeParse({
    name: String(fd.get("name") ?? ""),
    role: String(fd.get("role") ?? ""),
    color: String(fd.get("color") ?? ""),
    active: fd.get("active") === "on",
  });
}

/**
 * Cria um novo profissional na clínica do membership atual.
 * clinicId vem da sessão — nunca do FormData.
 */
export async function createProfessional(
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
    const created = await prisma.professional.create({
      data: { ...parsed.data, clinicId },
      select: { id: true },
    });
    revalidatePath(LIST_PATH);
    return { ok: true, data: { id: created.id } };
  } catch {
    return { ok: false, error: "Não foi possível cadastrar. Tente novamente." };
  }
}

/**
 * Atualiza um profissional. O `id` é bound via `.bind(null, id)` no client.
 * O where compound { id, clinicId } garante isolamento entre clínicas:
 * se o id pertencer a outra clínica, count === 0 e retornamos "não encontrado".
 */
export async function updateProfessional(
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
    const r = await prisma.professional.updateMany({
      where: { id, clinicId },
      data: parsed.data,
    });
    if (r.count === 0) {
      return { ok: false, error: "Profissional não encontrado." };
    }
    revalidatePath(LIST_PATH);
    revalidatePath(`${LIST_PATH}/${id}`);
    return { ok: true, data: null };
  } catch {
    return { ok: false, error: "Não foi possível salvar. Tente novamente." };
  }
}

/**
 * Soft delete via flag `active = false`. Mantém histórico de agendamentos
 * intacto. Reativar usa o caminho simétrico.
 */
export async function deactivateProfessional(id: string): Promise<ActionResult> {
  const { clinicId } = await requireMembership(`${LIST_PATH}/${id}`);

  const r = await prisma.professional.updateMany({
    where: { id, clinicId },
    data: { active: false },
  });
  if (r.count === 0) {
    return { ok: false, error: "Profissional não encontrado." };
  }
  revalidatePath(LIST_PATH);
  revalidatePath(`${LIST_PATH}/${id}`);
  return { ok: true, data: null };
}

export async function reactivateProfessional(id: string): Promise<ActionResult> {
  const { clinicId } = await requireMembership(`${LIST_PATH}/${id}`);

  const r = await prisma.professional.updateMany({
    where: { id, clinicId },
    data: { active: true },
  });
  if (r.count === 0) {
    return { ok: false, error: "Profissional não encontrado." };
  }
  revalidatePath(LIST_PATH);
  revalidatePath(`${LIST_PATH}/${id}`);
  return { ok: true, data: null };
}
