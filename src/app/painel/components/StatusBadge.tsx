import type { AppointmentStatus } from "@/generated/prisma/client";

const map: Record<AppointmentStatus, { label: string; classes: string }> = {
  CONFIRMADO: {
    label: "Confirmado",
    classes:
      "bg-[color-mix(in_oklch,var(--color-success)_14%,transparent)] text-[color:var(--color-success)]",
  },
  PENDENTE: {
    label: "Pendente",
    classes: "border border-paper-3 text-ink-2 bg-paper-0",
  },
  ATENDIDO: {
    label: "Atendido",
    classes: "bg-accent-tint text-accent",
  },
  CANCELADO: {
    label: "Cancelado",
    classes: "bg-paper-2 text-ink-3 line-through",
  },
  AUSENTE: {
    label: "Ausente",
    classes:
      "bg-[color-mix(in_oklch,var(--color-warning)_14%,transparent)] text-[color:var(--color-warning)]",
  },
};

export function StatusBadge({ status }: { status: AppointmentStatus }) {
  const config = map[status];
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.08em] font-medium ${config.classes}`}
    >
      {config.label}
    </span>
  );
}
