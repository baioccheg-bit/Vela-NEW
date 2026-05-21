/**
 * POST /api/leads/[id]/approve — equipe Vela aprova um lead.
 * Cria a Clinic + Invite, marca o lead como APPROVED, e envia
 * email de convite pro usuário definir a senha em /registrar.
 *
 * Protegido: apenas usuários com role VELA_ADMIN.
 */
import { randomBytes } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { inviteTemplate, sendEmail } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import { LeadStatus, MembershipRole } from "@/generated/prisma/client";

function slugify(input: string): string {
  return input
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "clinica";
}

async function uniqueSlug(base: string): Promise<string> {
  let slug = base;
  let suffix = 1;
  while (await prisma.clinic.findUnique({ where: { slug } })) {
    suffix += 1;
    slug = `${base}-${suffix}`;
  }
  return slug;
}

export async function POST(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "VELA_ADMIN") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 403 });
  }

  const { id } = await ctx.params;
  const lead = await prisma.lead.findUnique({ where: { id } });
  if (!lead) {
    return NextResponse.json({ error: "Lead não encontrado" }, { status: 404 });
  }
  if (lead.status === LeadStatus.APPROVED) {
    return NextResponse.json({ error: "Lead já aprovado" }, { status: 409 });
  }

  // 1. Cria a Clinic
  const slug = await uniqueSlug(slugify(lead.clinica));
  const clinic = await prisma.clinic.create({
    data: {
      name: lead.clinica,
      slug,
      subscription: {
        create: {
          // Subscription começa em TRIAL; ligar Stripe depois.
          trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        },
      },
    },
  });

  // 2. Cria o Invite (token de 7 dias)
  const token = randomBytes(32).toString("base64url");
  const invite = await prisma.invite.create({
    data: {
      token,
      email: lead.email,
      clinicId: clinic.id,
      role: MembershipRole.ADMIN,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      invitedById: session.user.id,
    },
  });

  // 3. Marca lead como aprovado
  await prisma.lead.update({
    where: { id: lead.id },
    data: {
      status: LeadStatus.APPROVED,
      approvedById: session.user.id,
      approvedAt: new Date(),
    },
  });

  // 4. Log de auditoria
  prisma.auditLog
    .create({
      data: {
        userId: session.user.id,
        clinicId: clinic.id,
        action: "lead.approve",
        resourceType: "Lead",
        resourceId: lead.id,
        metadata: { clinicId: clinic.id, inviteId: invite.id },
      },
    })
    .catch(() => {});

  // 5. Envia email de convite
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const inviteUrl = `${baseUrl}/registrar?token=${encodeURIComponent(token)}`;
  const tpl = inviteTemplate({ clinicName: clinic.name, inviteUrl });
  sendEmail({ to: lead.email, ...tpl }).catch(() => {});

  return NextResponse.json({
    ok: true,
    clinicId: clinic.id,
    clinicSlug: clinic.slug,
    inviteUrl, // útil pra equipe Vela copiar manualmente se email falhar
  });
}
