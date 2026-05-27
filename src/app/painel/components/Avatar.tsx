import type { ReactNode } from "react";

/**
 * Avatar circular do paciente.
 *
 * Estratégia faseada pra foto do paciente:
 *   1) Hoje: iniciais sobre um dos 4 tons de teal (variação determinística
 *      por hash do `id`). Cada paciente fica visualmente identificável sem
 *      sair do accent único do design.md.
 *   2) Futuro (1 migration, Patient.image): admin sobe foto manual.
 *   3) Fase 4 (Júlia + WhatsApp): profile_picture_url do webhook cai
 *      automaticamente em Patient.image. Recepção zero trabalho.
 *
 * A prop `imageUrl` já existe no contrato pra que (2) e (3) só precisem
 * passar o valor — chamadas atuais (sem foto) continuam funcionando.
 *
 * Sem framer-motion, sem hover:scale, sem gradiente. Cores apenas das 4
 * tonalidades de teal já definidas em tokens.css.
 */

type Size = "sm" | "md" | "lg";
type Variant = "auto" | "neutral" | "primary";

type Props = {
  name: string;
  /** id usado pra escolher 1 dos 4 tons de teal quando variant="auto" */
  id?: string;
  size?: Size;
  variant?: Variant;
  /** quando definido, renderiza <img> no lugar das iniciais (Fase 4) */
  imageUrl?: string | null;
  /** decorativo (`aria-hidden`) — quando o nome do paciente já aparece ao lado */
  decorative?: boolean;
};

const sizeClasses: Record<Size, string> = {
  sm: "w-7 h-7 text-[10px]",
  md: "w-9 h-9 text-xs",
  lg: "w-14 h-14 text-base",
};

/**
 * Hash determinístico simples (Java string hash). Cuid sempre dá o mesmo
 * bucket pro mesmo paciente — estável entre reloads.
 */
function hashBucket(id: string, buckets: number): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) {
    h = ((h * 31) + id.charCodeAt(i)) >>> 0;
  }
  return h % buckets;
}

/** As 4 tonalidades de teal disponíveis quando variant="auto". */
const TEAL_BUCKETS: ReadonlyArray<string> = [
  "bg-accent-tint text-accent",
  "bg-accent-soft text-paper-0",
  "bg-accent text-paper-0",
  "bg-accent-deep text-paper-0",
];

function getColorClasses(variant: Variant, id?: string): string {
  if (variant === "neutral") return "bg-paper-2 text-ink-1";
  if (variant === "primary") return "bg-accent text-paper-0";
  // auto
  if (!id) return TEAL_BUCKETS[0];
  return TEAL_BUCKETS[hashBucket(id, TEAL_BUCKETS.length)];
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function Avatar({
  name,
  id,
  size = "md",
  variant = "auto",
  imageUrl,
  decorative = false,
}: Props): ReactNode {
  const ariaProps = decorative
    ? { "aria-hidden": true as const }
    : { "aria-label": name };

  if (imageUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={imageUrl}
        alt={decorative ? "" : name}
        className={`${sizeClasses[size]} rounded-full object-cover shrink-0`}
        {...ariaProps}
      />
    );
  }

  return (
    <span
      className={`${sizeClasses[size]} ${getColorClasses(variant, id)} rounded-full inline-flex items-center justify-center font-display font-semibold shrink-0`}
      {...ariaProps}
    >
      {getInitials(name)}
    </span>
  );
}
