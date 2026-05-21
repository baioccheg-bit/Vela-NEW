/**
 * POST /api/leads — recebe submissão do formulário /contratar.
 * Salva o lead, dispara email pra equipe Vela, retorna 201.
 */
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { leadNotificationTemplate, sendEmail } from "@/lib/email";
import { LeadPlan, LeadStatus } from "@/generated/prisma/client";

type LeadPayload = {
  nome?: string;
  sobrenome?: string;
  whatsapp?: string;
  email?: string;
  cargo?: string;
  clinica?: string;
  plano?: string;
};

function parsePlano(raw?: string): LeadPlan {
  switch ((raw ?? "").toLowerCase()) {
    case "essencial": return LeadPlan.ESSENCIAL;
    case "clinica":   return LeadPlan.CLINICA;
    case "rede":      return LeadPlan.REDE;
    default:          return LeadPlan.UNDECIDED;
  }
}

function isString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

export async function POST(req: NextRequest) {
  let body: LeadPayload;
  try {
    body = (await req.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ error: "Body JSON inválido" }, { status: 400 });
  }

  // Validação básica server-side
  const required = ["nome", "sobrenome", "whatsapp", "email", "cargo", "clinica"] as const;
  const missing = required.filter((k) => !isString(body[k]));
  if (missing.length) {
    return NextResponse.json(
      { error: "Campos obrigatórios ausentes", fields: missing },
      { status: 422 },
    );
  }

  const email = body.email!.trim().toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "E-mail inválido" }, { status: 422 });
  }

  const lead = await prisma.lead.create({
    data: {
      nome: body.nome!.trim(),
      sobrenome: body.sobrenome!.trim(),
      whatsapp: body.whatsapp!.trim(),
      email,
      cargo: body.cargo!.trim(),
      clinica: body.clinica!.trim(),
      plano: parsePlano(body.plano),
      status: LeadStatus.NEW,
    },
  });

  // Log de auditoria (best-effort)
  prisma.auditLog
    .create({
      data: {
        action: "lead.create",
        resourceType: "Lead",
        resourceId: lead.id,
        metadata: { email: lead.email, clinica: lead.clinica },
        ipAddress: req.headers.get("x-forwarded-for") ?? null,
        userAgent: req.headers.get("user-agent") ?? null,
      },
    })
    .catch(() => {});

  // Notifica equipe Vela (best-effort, não bloqueia resposta)
  const toEmail = process.env.LEAD_NOTIFICATION_EMAIL;
  if (toEmail) {
    const tpl = leadNotificationTemplate({
      nome: lead.nome,
      sobrenome: lead.sobrenome,
      whatsapp: lead.whatsapp,
      email: lead.email,
      cargo: lead.cargo,
      clinica: lead.clinica,
      plano: lead.plano,
    });
    sendEmail({ to: toEmail, ...tpl }).catch(() => {});
  }

  return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
}
