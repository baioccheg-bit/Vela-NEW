"use server";

import { revalidatePath } from "next/cache";
import type { z } from "zod";

import { requireMembership } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";

import {
  businessHoursArraySchema,
  type ActionResult,
  type BusinessHoursArrayInput,
} from "./lib/schema";

const LIST_PATH = "/painel/configuracoes/horarios";

/**
 * Mapeia os zod issues do array de 7 dias para um objeto chaveado por Weekday.
 * Ex: erro em `[2].closesAt` no payload onde idx 2 é QUARTA → { QUARTA: "..." }.
 *
 * Se o issue aparece no nível do array (path[0] indefinido) — caso do refine
 * "cada dia exatamente uma vez" — caímos no fallback "_form".
 */
function mapArrayErrors(
  err: z.ZodError<BusinessHoursArrayInput>,
  input: BusinessHoursArrayInput,
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of err.issues) {
    const idx = issue.path[0];
    if (typeof idx === "number" && input[idx]) {
      const weekday = input[idx].weekday;
      if (!out[weekday]) out[weekday] = issue.message;
    } else if (!out._form) {
      out._form = issue.message;
    }
  }
  return out;
}

/**
 * Salva os 7 horários da semana em batch (uma operação atômica).
 *
 * Multi-tenant: clinicId vem da sessão, nunca do payload.
 *
 * Concorrência: transação Serializable evita race quando 2 admins editam
 *   simultaneamente (sem isso, o último write ganharia silenciosamente).
 *
 * Upsert por (clinicId, weekday): cria se faltar (clínicas antigas pré-2.6),
 *   atualiza se existir. O seed garante 7 registros, mas o upsert blinda.
 *
 * Marca businessHoursCustomizedAt apenas na PRIMEIRA execução: o
 *   updateMany com filtro `WHERE id = X AND businessHoursCustomizedAt IS NULL`
 *   é no-op nas execuções seguintes. Heurística do checklist (item
 *   "Personalizar horários") fica done a partir desse momento.
 *
 * Não trata conflito de serialização com retry (BUILD_PLAN.md - debt):
 *   se o Postgres lançar P2034 a action retorna erro genérico em pt-BR;
 *   admin re-tenta manualmente. Caso raro (2 admins na mesma clínica
 *   editando horários no mesmo segundo).
 */
export async function updateBusinessHours(
  input: BusinessHoursArrayInput,
): Promise<ActionResult> {
  const { clinicId } = await requireMembership(LIST_PATH);

  const parsed = businessHoursArraySchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Verifique os horários destacados.",
      fieldErrors: mapArrayErrors(parsed.error, input),
    };
  }

  try {
    await prisma.$transaction(
      async (tx) => {
        for (const row of parsed.data) {
          await tx.businessHours.upsert({
            where: { clinicId_weekday: { clinicId, weekday: row.weekday } },
            create: {
              clinicId,
              weekday: row.weekday,
              opensAt: row.opensAt,
              closesAt: row.closesAt,
              active: row.active,
            },
            update: {
              opensAt: row.opensAt,
              closesAt: row.closesAt,
              active: row.active,
            },
          });
        }
        await tx.clinic.updateMany({
          where: { id: clinicId, businessHoursCustomizedAt: null },
          data: { businessHoursCustomizedAt: new Date() },
        });
      },
      { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
    );

    revalidatePath(LIST_PATH);
    revalidatePath("/painel");
    return { ok: true, data: null };
  } catch {
    return { ok: false, error: "Não foi possível salvar. Tente novamente." };
  }
}
