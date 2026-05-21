import Link from "next/link";

import { prisma } from "@/lib/prisma";
import { LeadStatus } from "@/generated/prisma/client";

export default async function AdminDashboard() {
  const [totalLeads, newLeads, approvedLeads, totalClinics, totalUsers] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({ where: { status: LeadStatus.NEW } }),
    prisma.lead.count({ where: { status: LeadStatus.APPROVED } }),
    prisma.clinic.count(),
    prisma.user.count(),
  ]);

  const recent = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    select: {
      id: true,
      nome: true,
      sobrenome: true,
      clinica: true,
      cargo: true,
      status: true,
      createdAt: true,
    },
  });

  return (
    <div>
      <header className="admin-page__head">
        <span className="eyebrow">Visão geral</span>
        <h1 className="admin-page__title">
          Painel <span className="italic-accent">Vela</span>.
        </h1>
      </header>

      <section className="admin-stats">
        <Stat label="Leads total" value={totalLeads} />
        <Stat label="Novos hoje" value={newLeads} accent />
        <Stat label="Aprovados" value={approvedLeads} />
        <Stat label="Clínicas ativas" value={totalClinics} />
        <Stat label="Usuários" value={totalUsers} />
      </section>

      <section className="admin-card">
        <div className="admin-card__head">
          <h2>Leads recentes</h2>
          <Link href="/admin/leads" className="admin-card__link">Ver todos →</Link>
        </div>
        {recent.length === 0 ? (
          <p className="admin-empty">Nenhum lead ainda. Quando o formulário /contratar receber a primeira submissão, aparece aqui.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Quem</th>
                <th>Clínica</th>
                <th>Cargo</th>
                <th>Status</th>
                <th>Quando</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((l) => (
                <tr key={l.id}>
                  <td><strong>{l.nome} {l.sobrenome}</strong></td>
                  <td>{l.clinica}</td>
                  <td>{l.cargo}</td>
                  <td><StatusPill status={l.status} /></td>
                  <td>{l.createdAt.toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className={`admin-stat ${accent ? "is-accent" : ""}`}>
      <div className="admin-stat__label">{label}</div>
      <div className="admin-stat__value">{value}</div>
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
