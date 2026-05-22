"use client";

import { VelaNav } from "@/components/VelaNav";
import { VelaFooter } from "@/components/VelaFooter";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Suspense, useState } from "react";
import "../home.css";

export default function EntrarPage() {
  return (
    <Suspense fallback={<EntrarFallback />}>
      <EntrarContent />
    </Suspense>
  );
}

function EntrarFallback() {
  return (
    <>
      <VelaNav />
      <main className="login-page">
        <div className="login-card">
          <span className="eyebrow">Entrar</span>
          <h1 className="login-card__title">
            Bem-vinda <span className="italic-accent">de volta</span>.
          </h1>
          <p className="login-card__sub">Carregando…</p>
        </div>
      </main>
      <VelaFooter />
    </>
  );
}

function EntrarContent() {
  const router = useRouter();
  const params = useSearchParams();
  // Default depende de quem entra: VELA_ADMIN tem /admin como destino natural,
  // mas a sessão só conhece a role após login. Mandamos todo mundo pra
  // /minha-conta primeiro — de lá o user navega pro painel da clínica
  // (ou /admin se for VELA_ADMIN, mostrado por link).
  const callbackUrl = params?.get("callbackUrl") ?? "/minha-conta";
  const verifyState = params?.get("verify");
  const errorState = params?.get("error");

  const [mode, setMode] = useState<"password" | "magic">("password");
  const [form, setForm] = useState({ email: "", senha: "" });
  const [loading, setLoading] = useState<null | "password" | "magic" | "google" | "azure">(null);
  const [error, setError] = useState<string | null>(errorMessage(errorState));
  const [magicSent, setMagicSent] = useState(false);

  const onPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading("password");
    const res = await signIn("credentials", {
      email: form.email.trim().toLowerCase(),
      password: form.senha,
      redirect: false,
      callbackUrl,
    });
    setLoading(null);
    if (res?.error) {
      setError("E-mail ou senha incorretos.");
      return;
    }
    if (res?.url) router.push(res.url);
  };

  const onMagicSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading("magic");
    const res = await signIn("email", {
      email: form.email.trim().toLowerCase(),
      redirect: false,
      callbackUrl,
    });
    setLoading(null);
    if (res?.error) {
      setError("Não conseguimos enviar o link agora. Tenta de novo em alguns minutos.");
      return;
    }
    setMagicSent(true);
  };

  return (
    <>
      <VelaNav />
      <main className="login-page">
        <div className="login-card">
          <span className="eyebrow">Entrar</span>
          <h1 className="login-card__title">
            Bem-vinda <span className="italic-accent">de volta</span>.
          </h1>
          <p className="login-card__sub">Acesse o painel da sua clínica.</p>

          {verifyState && !magicSent && (
            <InfoMsg tone="info">
              Verifique seu email — enviamos um link de acesso. O link funciona uma única vez e expira em 10 minutos.
            </InfoMsg>
          )}

          {magicSent && (
            <InfoMsg tone="success">
              Link enviado pra <strong>{form.email}</strong>. Chega em até 1 minuto, confere também o spam.
            </InfoMsg>
          )}

          {error && <InfoMsg tone="warn">{error}</InfoMsg>}

          {!magicSent && (
            <>
              {/* Toggle entre senha e magic link */}
              <div className="login-mode">
                <button
                  type="button"
                  className={mode === "password" ? "is-active" : ""}
                  onClick={() => setMode("password")}
                >
                  E-mail + senha
                </button>
                <button
                  type="button"
                  className={mode === "magic" ? "is-active" : ""}
                  onClick={() => setMode("magic")}
                >
                  Link mágico
                </button>
              </div>

              {mode === "password" ? (
                <form onSubmit={onPasswordSubmit}>
                  <label className="contratar__field">
                    <span>E-mail</span>
                    <input
                      type="email"
                      required
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="helena@clinicalumen.com.br"
                    />
                  </label>
                  <label className="contratar__field">
                    <span>Senha</span>
                    <input
                      type="password"
                      required
                      autoComplete="current-password"
                      value={form.senha}
                      onChange={(e) => setForm({ ...form, senha: e.target.value })}
                      placeholder="••••••••"
                    />
                  </label>
                  <button type="submit" className="btn btn--primary" disabled={loading !== null}>
                    {loading === "password" ? "Entrando…" : "Entrar"}
                    {loading !== "password" && <span aria-hidden>→</span>}
                  </button>
                </form>
              ) : (
                <form onSubmit={onMagicSubmit}>
                  <label className="contratar__field">
                    <span>E-mail</span>
                    <input
                      type="email"
                      required
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="helena@clinicalumen.com.br"
                    />
                  </label>
                  <button type="submit" className="btn btn--primary" disabled={loading !== null}>
                    {loading === "magic" ? "Enviando link…" : "Receber link de acesso"}
                    {loading !== "magic" && <span aria-hidden>→</span>}
                  </button>
                </form>
              )}

              <div className="login-card__divider">ou</div>

              <div className="login-oauth">
                <button
                  type="button"
                  className="oauth-btn"
                  disabled={loading !== null}
                  onClick={async () => {
                    setLoading("google");
                    await signIn("google", { callbackUrl });
                  }}
                >
                  <GoogleIcon /> Continuar com Google
                </button>
                <button
                  type="button"
                  className="oauth-btn"
                  disabled={loading !== null}
                  onClick={async () => {
                    setLoading("azure");
                    await signIn("azure-ad", { callbackUrl });
                  }}
                >
                  <MicrosoftIcon /> Continuar com Microsoft
                </button>
              </div>
            </>
          )}

          <p className="login-card__alt" style={{ marginTop: "var(--space-xl)" }}>
            Ainda não tem conta?{" "}
            <Link href="/contratar">Contrate um plano →</Link>
          </p>
        </div>
      </main>
      <VelaFooter />
    </>
  );
}

function InfoMsg({ tone, children }: { tone: "info" | "warn" | "success"; children: React.ReactNode }) {
  const bg =
    tone === "warn"
      ? "color-mix(in oklch, var(--color-warning) 14%, transparent)"
      : tone === "success"
      ? "color-mix(in oklch, var(--color-success) 14%, transparent)"
      : "color-mix(in oklch, var(--color-accent) 12%, transparent)";
  const color =
    tone === "warn" ? "var(--color-warning)" : tone === "success" ? "var(--color-success)" : "var(--color-accent)";
  return (
    <p
      role="status"
      style={{
        padding: "12px 14px",
        background: bg,
        color,
        borderRadius: "var(--radius-md)",
        fontSize: "var(--text-sm)",
        lineHeight: 1.5,
        margin: "0 0 var(--space-md)",
      }}
    >
      {children}
    </p>
  );
}

function errorMessage(code: string | null | undefined): string | null {
  if (!code) return null;
  switch (code) {
    case "CredentialsSignin": return "E-mail ou senha incorretos.";
    case "OAuthAccountNotLinked": return "Esse email já está cadastrado com outro método. Entre por aquele método e adicione o novo nas configurações.";
    case "EmailSignin": return "Não conseguimos enviar o link. Verifique o e-mail e tente novamente.";
    default: return "Não conseguimos te autenticar. Tenta de novo.";
  }
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
      <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84c-.21 1.13-.84 2.08-1.79 2.72v2.26h2.9c1.7-1.56 2.69-3.87 2.69-6.62z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.47-.81 5.96-2.18l-2.9-2.26c-.81.54-1.83.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.93v2.34A9 9 0 0 0 9 18z" />
      <path fill="#FBBC05" d="M3.95 10.71A5.4 5.4 0 0 1 3.66 9c0-.6.1-1.17.29-1.71V4.95H.93A8.97 8.97 0 0 0 0 9c0 1.45.35 2.82.93 4.05l3.02-2.34z" />
      <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.58-2.58A9 9 0 0 0 9 0 9 9 0 0 0 .93 4.95L3.95 7.3C4.66 5.17 6.65 3.58 9 3.58z" />
    </svg>
  );
}

function MicrosoftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
      <path fill="#f25022" d="M0 0h8.55v8.55H0z" />
      <path fill="#7fba00" d="M9.45 0H18v8.55H9.45z" />
      <path fill="#00a4ef" d="M0 9.45h8.55V18H0z" />
      <path fill="#ffb900" d="M9.45 9.45H18V18H9.45z" />
    </svg>
  );
}
