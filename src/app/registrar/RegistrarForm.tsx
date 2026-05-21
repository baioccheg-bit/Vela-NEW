"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function RegistrarForm({ token, email }: { token: string; email: string }) {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [confirma, setConfirma] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (senha.length < 8) {
      setError("Senha precisa de pelo menos 8 caracteres.");
      return;
    }
    if (senha !== confirma) {
      setError("As senhas não conferem.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/registrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, nome, senha }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || "Não conseguimos criar sua conta agora.");
      }
      // Faz login automático após criação
      const signed = await signIn("credentials", {
        email,
        password: senha,
        redirect: false,
        callbackUrl: "/admin",
      });
      if (signed?.url) router.push(signed.url);
      else router.push("/entrar");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <label className="contratar__field">
        <span>E-mail</span>
        <input type="email" value={email} disabled readOnly />
      </label>

      <label className="contratar__field">
        <span>Seu nome</span>
        <input
          type="text"
          required
          autoComplete="name"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Helena Vasconcelos"
        />
      </label>

      <label className="contratar__field">
        <span>Senha</span>
        <input
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Mínimo 8 caracteres"
        />
      </label>

      <label className="contratar__field">
        <span>Confirme a senha</span>
        <input
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          value={confirma}
          onChange={(e) => setConfirma(e.target.value)}
        />
      </label>

      {error && (
        <p
          role="alert"
          style={{
            margin: "0 0 var(--space-sm)",
            padding: "10px 14px",
            background: "color-mix(in oklch, var(--color-warning) 14%, transparent)",
            color: "var(--color-warning)",
            borderRadius: "var(--radius-md)",
            fontSize: "var(--text-sm)",
          }}
        >
          {error}
        </p>
      )}

      <button type="submit" className="btn btn--primary" disabled={loading}>
        {loading ? "Criando sua conta…" : "Criar conta e entrar"}
        {!loading && <span aria-hidden>→</span>}
      </button>
    </form>
  );
}
