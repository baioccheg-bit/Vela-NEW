"use client";

import { VelaNav } from "@/components/VelaNav";
import { VelaFooter } from "@/components/VelaFooter";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import "../home.css";

const CARGOS = [
  "Proprietária / Proprietário",
  "Sócia / Sócio",
  "Diretora / Diretor clínica",
  "Gerente",
  "Administradora / Administrador",
  "Coordenadora / Coordenador",
  "Recepcionista",
  "Profissional de saúde",
  "Financeiro",
  "Marketing",
  "Outro",
];

export default function ContratarPage() {
  return (
    <Suspense fallback={null}>
      <ContratarContent />
    </Suspense>
  );
}

function ContratarContent() {
  const params = useSearchParams();
  const plano = params?.get("plano") ?? "";

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    nome: "",
    sobrenome: "",
    whatsapp: "",
    email: "",
    cargo: "",
    clinica: "",
  });

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, plano }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || "Não conseguimos registrar agora. Tenta de novo em alguns minutos.");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <VelaNav />
      <main className="contratar">
        <div className="container">
          {!submitted ? (
            <div className="contratar__grid">
              {/* Left — pitch + eyebrow + heading */}
              <aside className="contratar__pitch">
                <span className="eyebrow">Comece com a Vela</span>
                <h1 className="contratar__title">
                  Sua clínica operando <span className="italic-accent">em 24h</span>.
                </h1>
                <p className="contratar__sub">
                  Preencha os dados ao lado e nosso time entra em contato pelo WhatsApp
                  ainda hoje. Sem cartão de crédito agora — primeiro a gente entende
                  sua operação, depois você escolhe o plano que faz sentido.
                </p>

                <ul className="contratar__points">
                  <li>
                    <strong>1 · Conversa de 15min</strong>
                    <span>Pra entender sua agenda, sua cobrança e qual agente prioriza.</span>
                  </li>
                  <li>
                    <strong>2 · Setup guiado</strong>
                    <span>Importamos sua agenda, configuramos os agentes, testamos juntos.</span>
                  </li>
                  <li>
                    <strong>3 · Primeiro paciente em produção</strong>
                    <span>Até 24h depois do setup — sem fricção, sem fidelidade, sem sortinha.</span>
                  </li>
                </ul>

                <p className="contratar__assurance">
                  Seus dados ficam protegidos por padrão LGPD. Não vendemos,
                  não compartilhamos, não enviamos para marketing fora da Vela.
                  Veja a <a href="/privacidade">política de privacidade</a>.
                </p>
              </aside>

              {/* Right — form */}
              <form className="contratar__form" onSubmit={onSubmit} noValidate>
                <div className="contratar__form__row contratar__form__row--two">
                  <label className="contratar__field">
                    <span>Nome</span>
                    <input
                      type="text"
                      required
                      autoComplete="given-name"
                      value={form.nome}
                      onChange={update("nome")}
                      placeholder="Helena"
                    />
                  </label>
                  <label className="contratar__field">
                    <span>Sobrenome</span>
                    <input
                      type="text"
                      required
                      autoComplete="family-name"
                      value={form.sobrenome}
                      onChange={update("sobrenome")}
                      placeholder="Vasconcelos"
                    />
                  </label>
                </div>

                <label className="contratar__field">
                  <span>WhatsApp</span>
                  <input
                    type="tel"
                    required
                    autoComplete="tel"
                    value={form.whatsapp}
                    onChange={update("whatsapp")}
                    placeholder="(11) 99999-9999"
                    inputMode="tel"
                  />
                </label>

                <label className="contratar__field">
                  <span>E-mail</span>
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={update("email")}
                    placeholder="helena@clinicalumen.com.br"
                  />
                </label>

                <label className="contratar__field">
                  <span>Cargo</span>
                  <select required value={form.cargo} onChange={update("cargo")}>
                    <option value="" disabled>Selecione o seu cargo</option>
                    {CARGOS.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </label>

                <label className="contratar__field">
                  <span>Nome da clínica / instituição</span>
                  <input
                    type="text"
                    required
                    autoComplete="organization"
                    value={form.clinica}
                    onChange={update("clinica")}
                    placeholder="Clínica Lumen"
                  />
                </label>

                {error && (
                  <p
                    role="alert"
                    style={{
                      margin: 0,
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

                <button
                  type="submit"
                  className="btn btn--primary contratar__submit"
                  disabled={submitting}
                >
                  {submitting ? "Enviando…" : "Solicitar contato"}
                  {!submitting && <span aria-hidden>→</span>}
                </button>

                <p className="contratar__legal">
                  Ao enviar, você concorda com os{" "}
                  <a href="/termos">termos de uso</a> e a{" "}
                  <a href="/privacidade">política de privacidade</a>.
                </p>
              </form>
            </div>
          ) : (
            <div className="contratar__success">
              <span className="eyebrow">Recebemos seu pedido</span>
              <h1 className="contratar__title">
                Em breve a gente <span className="italic-accent">conversa</span>.
              </h1>
              <p className="contratar__sub">
                Você vai receber uma mensagem no WhatsApp em até 4 horas úteis.
                Se preferir adiantar, manda um oi pra <strong>+55 11 99999-0000</strong>{" "}
                falando que veio do site.
              </p>
              <p className="contratar__sub" style={{ marginTop: "0.75rem" }}>
                Enquanto isso, dá uma olhada na{" "}
                <a href="/demo">pré-visualização da plataforma</a> pra ver como
                a Vela vai aparecer pra sua equipe.
              </p>
              <div style={{ marginTop: "2.5rem" }}>
                <a href="/" className="btn btn--ghost">Voltar pro site</a>
              </div>
            </div>
          )}
        </div>
      </main>
      <VelaFooter />
    </>
  );
}
