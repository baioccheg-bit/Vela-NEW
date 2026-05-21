import type { AppointmentStatus } from "../lib/mock-data";

const map: Record<AppointmentStatus, { label: string; classes: string }> = {
  confirmado: {
    label: "Confirmado",
    classes: "bg-[color-mix(in_oklch,var(--color-success)_14%,transparent)] text-[color:var(--color-success)]",
  },
  pendente: {
    label: "Pendente",
    classes: "border border-paper-3 text-ink-2 bg-paper-0",
  },
  atendido: {
    label: "Atendido",
    classes: "bg-accent-tint text-accent",
  },
  cancelado: {
    label: "Cancelado",
    classes: "bg-paper-2 text-ink-3 line-through",
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
