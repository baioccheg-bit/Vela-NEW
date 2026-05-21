/**
 * Wrapper de email transacional.
 * Usa Resend se RESEND_API_KEY estiver setado, senão cai em
 * console.log (útil pra dev sem conta criada).
 */
import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.RESEND_FROM_EMAIL || "Vela <onboarding@vela.com.br>";

const resend = apiKey ? new Resend(apiKey) : null;

export type SendEmailArgs = {
  to: string | string[];
  subject: string;
  html: string;
  /** Opcional, fallback pro `subject` se omitido em clients que pedem text */
  text?: string;
};

export async function sendEmail({ to, subject, html, text }: SendEmailArgs): Promise<{ ok: boolean; error?: string }> {
  if (!resend) {
    // eslint-disable-next-line no-console
    console.log("\n[email · sem RESEND_API_KEY, log only]");
    console.log("To:", to);
    console.log("Subject:", subject);
    console.log("Body:", text ?? html);
    console.log("");
    return { ok: true };
  }

  try {
    const result = await resend.emails.send({
      from: fromEmail,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      text: text ?? stripHtml(html),
    });
    if (result.error) return { ok: false, error: result.error.message };
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

/* ── Templates ── */

export function leadNotificationTemplate(lead: {
  nome: string;
  sobrenome: string;
  whatsapp: string;
  email: string;
  cargo: string;
  clinica: string;
  plano: string;
}): { subject: string; html: string } {
  return {
    subject: `Novo lead: ${lead.nome} ${lead.sobrenome} (${lead.clinica})`,
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px;">
        <h2 style="margin: 0 0 16px; color: #1a3a3a;">Novo lead na Vela</h2>
        <p style="margin: 0 0 24px; color: #4a5a5a;">Recebido agora pelo formulário /contratar.</p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #6a7a7a; width: 140px;">Nome</td><td><strong>${lead.nome} ${lead.sobrenome}</strong></td></tr>
          <tr><td style="padding: 8px 0; color: #6a7a7a;">Clínica</td><td>${lead.clinica}</td></tr>
          <tr><td style="padding: 8px 0; color: #6a7a7a;">Cargo</td><td>${lead.cargo}</td></tr>
          <tr><td style="padding: 8px 0; color: #6a7a7a;">WhatsApp</td><td>${lead.whatsapp}</td></tr>
          <tr><td style="padding: 8px 0; color: #6a7a7a;">E-mail</td><td>${lead.email}</td></tr>
          <tr><td style="padding: 8px 0; color: #6a7a7a;">Plano</td><td>${lead.plano}</td></tr>
        </table>
        <p style="margin: 32px 0 0;">
          <a href="${process.env.NEXTAUTH_URL || "http://localhost:3000"}/admin/leads"
             style="background: #1a6b73; color: white; padding: 12px 20px; border-radius: 999px; text-decoration: none; font-weight: 500;">
            Ver no painel admin
          </a>
        </p>
      </div>
    `,
  };
}

export function inviteTemplate(args: {
  clinicName: string;
  inviteUrl: string;
}): { subject: string; html: string } {
  return {
    subject: `Sua conta na Vela está pronta — ${args.clinicName}`,
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px;">
        <h2 style="margin: 0 0 16px; color: #1a3a3a;">Bem-vinda à Vela</h2>
        <p style="margin: 0 0 16px; color: #4a5a5a; line-height: 1.5;">
          Sua clínica <strong>${args.clinicName}</strong> foi cadastrada na Vela.
          Pra começar a operar, defina sua senha clicando no botão abaixo.
        </p>
        <p style="margin: 32px 0;">
          <a href="${args.inviteUrl}"
             style="background: #1a6b73; color: white; padding: 14px 24px; border-radius: 999px; text-decoration: none; font-weight: 500;">
            Definir senha e entrar
          </a>
        </p>
        <p style="margin: 24px 0 0; color: #8a9a9a; font-size: 13px;">
          Este link expira em 7 dias. Se não foi você, ignore este email.
        </p>
      </div>
    `,
  };
}

export function magicLinkTemplate(url: string): { subject: string; html: string } {
  return {
    subject: "Seu link de acesso à Vela",
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px;">
        <h2 style="margin: 0 0 16px; color: #1a3a3a;">Entrar na Vela</h2>
        <p style="margin: 0 0 24px; color: #4a5a5a;">Clique no botão abaixo pra entrar. O link funciona uma única vez e expira em 10 minutos.</p>
        <p style="margin: 24px 0;">
          <a href="${url}"
             style="background: #1a6b73; color: white; padding: 14px 24px; border-radius: 999px; text-decoration: none; font-weight: 500;">
            Entrar na Vela
          </a>
        </p>
        <p style="margin: 24px 0 0; color: #8a9a9a; font-size: 13px;">
          Se não foi você, ignore. Ninguém consegue entrar sem clicar.
        </p>
      </div>
    `,
  };
}
