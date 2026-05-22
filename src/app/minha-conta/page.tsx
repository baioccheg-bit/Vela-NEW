import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { VelaNav } from "@/components/VelaNav";
import { VelaFooter } from "@/components/VelaFooter";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { LogoutButton } from "./LogoutButton";
import "../home.css";

const ROLE_LABEL: Record<string, string> = {
  ADMIN: "Administradora",
  MANAGER: "Gerente",
  RECEPTIONIST: "Recepção",
  FINANCE: "Financeiro",
  PROFESSIONAL: "Profissional",
};

export default async function MinhaContaPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect(`/entrar?callbackUrl=${encodeURIComponent("/minha-conta")}`);
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      memberships: {
        include: { clinic: { select: { name: true, slug: true } } },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!user) redirect(`/entrar?callbackUrl=${encodeURIComponent("/minha-conta")}`);

  const primaryMembership = user.memberships[0];
  const firstName = (user.name ?? user.email).split(" ")[0];
  const isVelaAdmin = user.role === "VELA_ADMIN";

  return (
    <>
      <VelaNav />
      <main className="account">
        <div className="container account__container">
          <header className="account__header">
            <span className="eyebrow">Minha conta</span>
            <h1 className="account__title">
              Olá, <span className="italic-accent">{firstName}</span>.
            </h1>
            <p className="account__sub">
              Tudo da sua clínica em um lugar. Abra o painel pela web ou baixe a Vela pro seu computador.
            </p>
          </header>

          <div className="account__grid">
            {/* Card primário — abrir o painel */}
            <article className="account-card account-card--primary">
              <span className="eyebrow">Web</span>
              <h2 className="account-card__title">Abrir Vela no navegador</h2>
              <p className="account-card__sub">
                {primaryMembership
                  ? `Painel da ${primaryMembership.clinic.name}. Acesso imediato, sem instalação.`
                  : "Você ainda não está vinculada a uma clínica. Fale com o time pra liberar acesso."}
              </p>
              {primaryMembership ? (
                <Link href="/painel" className="btn btn--primary account-card__cta">
                  Abrir painel <span aria-hidden>→</span>
                </Link>
              ) : (
                <Link href="/contato" className="btn btn--primary account-card__cta">
                  Falar com a Vela <span aria-hidden>→</span>
                </Link>
              )}
            </article>

            {/* Card desktop — em breve */}
            <article className="account-card">
              <span className="eyebrow">Desktop</span>
              <h2 className="account-card__title">Baixar Vela Desktop</h2>
              <p className="account-card__sub">
                App nativo pra Windows e macOS. Mesmo login, mais rápido, funciona em janela própria. Lançamento previsto pro 3º trimestre.
              </p>
              <div className="account-card__downloads">
                <button
                  type="button"
                  className="btn btn--ghost account-card__download"
                  disabled
                  aria-label="Baixar para Windows — em breve"
                >
                  <WindowsIcon />
                  Windows
                  <span className="account-card__tag">em breve</span>
                </button>
                <button
                  type="button"
                  className="btn btn--ghost account-card__download"
                  disabled
                  aria-label="Baixar para macOS — em breve"
                >
                  <AppleIcon />
                  macOS
                  <span className="account-card__tag">em breve</span>
                </button>
              </div>
            </article>
          </div>

          <section className="account__details">
            <h3 className="account__details__title">Dados da conta</h3>
            <dl className="account-data">
              <div>
                <dt>Nome</dt>
                <dd>{user.name ?? "—"}</dd>
              </div>
              <div>
                <dt>E-mail</dt>
                <dd>{user.email}</dd>
              </div>
              <div>
                <dt>Clínica</dt>
                <dd>{primaryMembership?.clinic.name ?? <span className="account-data__muted">Sem vínculo</span>}</dd>
              </div>
              <div>
                <dt>Função</dt>
                <dd>
                  {primaryMembership
                    ? ROLE_LABEL[primaryMembership.role] ?? primaryMembership.role
                    : <span className="account-data__muted">—</span>}
                </dd>
              </div>
            </dl>

            <div className="account__actions">
              <button type="button" className="btn btn--ghost" disabled>
                Editar perfil <span className="account-card__tag">em breve</span>
              </button>
              <button type="button" className="btn btn--ghost" disabled>
                Trocar senha <span className="account-card__tag">em breve</span>
              </button>
              {isVelaAdmin && (
                <Link href="/admin" className="btn btn--ghost">
                  Painel Vela (admin) <span aria-hidden>→</span>
                </Link>
              )}
              <LogoutButton />
            </div>
          </section>
        </div>
      </main>
      <VelaFooter />
    </>
  );
}

function WindowsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M2 4.5L10.5 3v8.5H2V4.5zm0 15L10.5 21v-8.5H2v7zm9.5 1.5L22 22.5V12.5H11.5V21zm0-18l10.5-1.5V11.5H11.5V3z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.05 12.04c-.02-2.47 2.02-3.67 2.11-3.72-1.15-1.68-2.94-1.91-3.58-1.94-1.52-.15-2.97.9-3.74.9-.78 0-1.96-.88-3.22-.86-1.66.03-3.19.97-4.04 2.45-1.72 2.99-.44 7.42 1.23 9.85.82 1.19 1.78 2.52 3.04 2.47 1.22-.05 1.68-.79 3.16-.79 1.47 0 1.89.79 3.18.77 1.31-.02 2.14-1.21 2.94-2.4.93-1.38 1.32-2.71 1.34-2.78-.03-.01-2.57-.99-2.6-3.92zM14.6 4.62c.67-.81 1.12-1.94.99-3.07-.97.04-2.14.65-2.83 1.46-.62.71-1.16 1.86-1.02 2.97 1.08.08 2.18-.55 2.86-1.36z" />
    </svg>
  );
}
