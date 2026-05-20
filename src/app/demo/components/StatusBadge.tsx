import type { AppointmentStatus } from "../lib/mock-data";

const map: Record<AppointmentStatus, { label: string; classes: string }> = {
  confirmado: { label: "Confirmado", classes: "bg-champagne/10 text-champagne border-champagne/20" },
  pendente: { label: "Pendente", classes: "bg-ivory/5 text-ivory/60 border-ivory/10" },
  atendido: { label: "Atendido", classes: "bg-deep-teal/40 text-ivory/80 border-deep-teal/50" },
  cancelado: { label: "Cancelado", classes: "bg-ivory/5 text-ivory/30 border-ivory/10 line-through" },
};

export function StatusBadge({ status }: { status: AppointmentStatus }) {
  const config = map[status];
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium border ${config.classes}`}>
      {config.label}
    </span>
  );
}
