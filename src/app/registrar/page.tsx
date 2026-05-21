import { VelaNav } from "@/components/VelaNav";
import { VelaFooter } from "@/components/VelaFooter";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { RegistrarForm } from "./RegistrarForm";
import "../home.css";

export const metadata = {
  title: "Definir senha — Vela",
  description: "Defina sua senha pra acessar a Vela.",
};

type SearchParams = Promise<{ token?: string }>;

export default async function RegistrarPage({ searchParams }: { searchParams: SearchParams }) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <Shell>
        <InviteError
          title="Link inválido"
          body="Esse link de convite não tem token. Verifique o email que você recebeu."
        />
      </Shell>
    );
  }

  const invite = await prisma.invite.findUnique({
    where: { token },
    include: { clinic: { select: { name: true } } },
  });

  if (!invite) {
    return (
      <Shell>
        <InviteError
          title="Convite não encontrado"
          body="Esse link de convite não existe mais. Se você acabou de receber, tenta de novo. Se não, peça um novo convite pra equipe Vela."
        />
      </Shell>
    );
  }

  if (invite.usedAt) {
    return (
      <Shell>
        <InviteError
          title="Convite já usado"
          body="Esse link já foi usado pra criar uma conta. Entre pela página de login com a senha que você definiu."
          showLogin
        />
      </Shell>
    );
  }

  if (invite.expiresAt.getTime() < Date.now()) {
    return (
      <Shell>
        <InviteError
          title="Convite expirado"
          body="Esse link já passou da validade (7 dias). Peça um novo convite pra equipe Vela."
        />
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="login-card">
        <span className="eyebrow">Definir senha</span>
        <h1 className="login-card__title">
          Bem-vinda à <span className="italic-accent">Vela</span>.
        </h1>
        <p className="login-card__sub">
          Sua conta na clínica <strong>{invite.clinic.name}</strong> está pronta.
          Defina seu nome e uma senha pra começar.
        </p>

        <RegistrarForm token={token} email={invite.email} />

        <p className="login-card__alt" style={{ marginTop: "var(--space-xl)" }}>
          Já tem uma conta?{" "}
          <Link href="/entrar">Entrar →</Link>
        </p>
      </div>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <VelaNav />
      <main className="login-page">{children}</main>
      <VelaFooter />
    </>
  );
}

function InviteError({
  title,
  body,
  showLogin,
}: {
  title: string;
  body: string;
  showLogin?: boolean;
}) {
  return (
    <div className="login-card">
      <span className="eyebrow">Convite</span>
      <h1 className="login-card__title">{title}</h1>
      <p className="login-card__sub" style={{ marginBottom: "var(--space-lg)" }}>{body}</p>
      <Link href={showLogin ? "/entrar" : "/contato"} className="btn btn--primary" style={{ width: "100%", justifyContent: "center" }}>
        {showLogin ? "Ir para login" : "Falar com a Vela"} <span aria-hidden>→</span>
      </Link>
    </div>
  );
}
