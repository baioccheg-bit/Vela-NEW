"use client";

// "use client" — motivo: useState/useTransition pra ações de desativar/reativar
// fora do <form> (botões diretos), router.refresh após mutation, e o form
// de edição usa useActionState.

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { Button } from "@/components/Button";
import {
  deactivateProcedure,
  reactivateProcedure,
  updateProcedure,
} from "../actions";
import { ProcedureForm } from "../ProcedureForm";
import type { SerializedProcedure } from "../ProcedimentosClient";

export function EditClient({
  procedure,
}: {
  procedure: SerializedProcedure;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [statusError, setStatusError] = useState<string | null>(null);

  const boundUpdate = updateProcedure.bind(null, procedure.id);

  function handleToggleActive() {
    setStatusError(null);
    const op = procedure.active ? deactivateProcedure : reactivateProcedure;
    startTransition(async () => {
      const result = await op(procedure.id);
      if (!result.ok) {
        setStatusError(result.error);
        return;
      }
      router.refresh();
    });
  }

  return (
    <div className="max-w-2xl">
      <div className="rounded-xl bg-paper-0 border border-paper-3 p-6">
        <ProcedureForm
          action={boundUpdate}
          submitLabel="Salvar alterações"
          initial={procedure}
          onSuccess={() => router.refresh()}
        />
      </div>

      <div className="mt-6 rounded-xl bg-paper-0 border border-paper-3 p-6 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="text-[10px] uppercase tracking-[0.12em] font-mono text-ink-2 mb-1.5">
            {procedure.active ? "Desativar" : "Reativar"}
          </div>
          <p className="text-sm text-ink-1">
            {procedure.active
              ? "Procedimento some dos seletores de agenda, mas o histórico de atendimentos permanece."
              : "Procedimento volta a aparecer nos seletores de agenda."}
          </p>
          {statusError && (
            <p
              role="alert"
              className="text-[12px] font-mono text-ink-2 mt-2"
            >
              {statusError}
            </p>
          )}
        </div>
        <Button
          variant={procedure.active ? "outline" : "primary"}
          size="sm"
          type="button"
          onClick={handleToggleActive}
          disabled={pending}
        >
          {pending
            ? "Salvando…"
            : procedure.active
              ? "Desativar"
              : "Reativar"}
        </Button>
      </div>
    </div>
  );
}
