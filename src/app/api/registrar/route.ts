/**
 * POST /api/registrar — usuário define senha usando token de invite.
 * Cria User + Membership (com role do invite) + marca invite como usado.
 */
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { createInitialProfessionalForAdmin } from "@/lib/clinics/seed-defaults";
import { UserRole } from "@/generated/prisma/client";

type Payload = {
  token?: string;
  nome?: string;
  senha?: string;
};

export async function POST(req: NextRequest) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Body JSON inválido" }, { status: 400 });
  }

  if (!body.token || !body.nome?.trim() || !body.senha) {
    return NextResponse.json({ error: "Campos obrigatórios ausentes" }, { status: 422 });
  }

  if (body.senha.length < 8) {
    return NextResponse.json({ error: "Senha precisa de pelo menos 8 caracteres" }, { status: 422 });
  }

  const invite = await prisma.invite.findUnique({
    where: { token: body.token },
    include: { clinic: true },
  });
  if (!invite) {
    return NextResponse.json({ error: "Convite inválido" }, { status: 404 });
  }
  if (invite.usedAt) {
    return NextResponse.json({ error: "Convite já foi usado" }, { status: 410 });
  }
  if (invite.expiresAt.getTime() < Date.now()) {
    return NextResponse.json({ error: "Convite expirado" }, { status: 410 });
  }

  const email = invite.email.toLowerCase();
  const passwordHash = await bcrypt.hash(body.senha, 12);

  /* Cria User (ou atualiza se já existe — caso o email já tenha conta
     por outro método, como OAuth) + Membership + marca invite usado. */
  const user = await prisma.user.upsert({
    where: { email },
    update: {
      name: body.nome.trim(),
      passwordHash,
      emailVerified: new Date(),
    },
    create: {
      email,
      name: body.nome.trim(),
      passwordHash,
      emailVerified: new Date(),
      role: UserRole.CUSTOMER,
    },
  });

  await prisma.membership.upsert({
    where: { userId_clinicId: { userId: user.id, clinicId: invite.clinicId } },
    update: { role: invite.role },
    create: {
      userId: user.id,
      clinicId: invite.clinicId,
      role: invite.role,
    },
  });

  // Cria o Professional inicial da clínica usando o nome do user (Fase 2.5).
  // Idempotente: se já houver Professional ativo, pula. SEM catch silencioso —
  // defaults são parte do contrato de "clínica funcional pós-registro".
  await createInitialProfessionalForAdmin(user.id, invite.clinicId, user.name ?? body.nome.trim());

  await prisma.invite.update({
    where: { id: invite.id },
    data: { usedAt: new Date() },
  });

  prisma.auditLog
    .create({
      data: {
        userId: user.id,
        clinicId: invite.clinicId,
        action: "user.register",
        resourceType: "User",
        resourceId: user.id,
        metadata: { inviteId: invite.id },
      },
    })
    .catch(() => {});

  return NextResponse.json({ ok: true });
}
