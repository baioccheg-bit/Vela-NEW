"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import type { LeadStatus } from "@/generated/prisma/client";

export function LeadActions({ leadId, status }: { leadId: string; status: LeadStatus }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | { type: "ok" | "err"; msg: string; inviteUrl?: string }>(null);

  if (status === "APPROVED") {
    return (
      <div className="admin-lead__actions">
        <span className="admin-lead__hint">Conta criada — convite enviado por email.</span>
      </div>
    );
  }
  if (status === "REJECTED") {
    return (
      <div className="admin-lead__actions">
        <span className="admin-lead__hint">Lead rejeitado.</span>
      </div>
    );
  }

  const approve = async () => {
    if (loading) return;
    if (!confirm("Aprovar esse lead? Vai criar a clínica e mandar email de convite.")) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`/api/leads/${leadId}/approve`, { method: "POST" });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        setResult({ type: "err", msg: body?.error || "Não foi possível aprovar." });
        return;
      }
      setResult({
        type: "ok",
        msg: "Aprovado. Email de convite enviado.",
        inviteUrl: body?.inviteUrl,
      });
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-lead__actions">
      <button type="button" className="btn btn--primary" onClick={approve} disabled={loading}>
        {loading ? "Aprovando…" : "Aprovar e criar clínica"}
        {!loading && <span aria-hidden>→</span>}
      </button>
      {result?.type === "ok" && (
        <div className="admin-lead__result is-ok">
          {result.msg}
          {result.inviteUrl && (
            <>
              <br />
              <small>
                Link de convite (caso queira copiar e enviar manualmente):{" "}
                <code style={{ wordBreak: "break-all" }}>{result.inviteUrl}</code>
              </small>
            </>
          )}
        </div>
      )}
      {result?.type === "err" && <div className="admin-lead__result is-err">{result.msg}</div>}
    </div>
  );
}
