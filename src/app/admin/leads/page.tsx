import { prisma } from "@/lib/prisma";
import { LeadActions } from "./LeadActions";
import type { LeadStatus } from "@/generated/prisma/client";

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      approver: { select: { name: true, email: true } },
    },
  });

  return (
    <div>
      <header className="admin-page__head">
        <span className="eyebrow">Leads</span>
        <h1 className="admin-page__title">
          Quem está pedindo <span className="italic-accent">contato</span>.
        </h1>
        <p className="admin-page__sub">
          Aprovar cria a clínica + dispara email de convite pro lead definir senha.
        </p>
      </header>

      {leads.length === 0 ? (
        <p className="admin-empty">Nenhum lead ainda.</p>
      ) : (
        <div className="admin-leads">
          {leads.map((l) => (
            <article key={l.id} className="admin-lead">
              <div className="admin-lead__head">
                <div>
                  <h3 className="admin-lead__name">{l.nome} {l.sobrenome}</h3>
                  <div className="admin-lead__meta">
                    <strong>{l.clinica}</strong> · {l.cargo} · plano {l.plano.toLowerCase()}
                  </div>
                </div>
                <StatusPill status={l.status} />
              </div>

              <dl className="admin-lead__contact">
                <div><dt>WhatsApp</dt><dd><a href={`https://wa.me/${l.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener">{l.whatsapp}</a></dd></div>
                <div><dt>E-mail</dt><dd><a href={`mailto:${l.email}`}>{l.email}</a></dd></div>
                <div><dt>Recebido</dt><dd>{l.createdAt.toLocaleString("pt-BR")}</dd></div>
                {l.approver && (
                  <div><dt>Aprovado por</dt><dd>{l.approver.name || l.approver.email} · {l.approvedAt?.toLocaleString("pt-BR")}</dd></div>
                )}
              </dl>

              <LeadActions leadId={l.id} status={l.status} />
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function StatusPill({ status }: { status: LeadStatus }) {
  const map: Record<LeadStatus, { label: string; cls: string }> = {
    NEW: { label: "Novo", cls: "is-new" },
    CONTACTED: { label: "Em contato", cls: "is-wait" },
    APPROVED: { label: "Aprovado", cls: "is-ok" },
    REJECTED: { label: "Rejeitado", cls: "is-muted" },
  };
  const m = map[status];
  return <span className={`admin-pill ${m.cls}`}>{m.label}</span>;
}
