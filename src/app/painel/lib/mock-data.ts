/**
 * Utilitários compartilhados pelas pages do /painel.
 *
 * Tipos e dados de domínio migraram pro Prisma + ./queries.ts.
 * Este arquivo só guarda os formatters pra evitar duplicação.
 */

export function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

/**
 * Mesmo padrão BR de milhar/decimal do `formatBRL`, mas sem prefixo "R$".
 * Pra usar dentro de inputs editáveis de preço, onde o "R$" já vive como
 * adorno separado e a string final precisa ser parseável de volta sem
 * depender de NBSP / narrow NBSP variar entre runtimes.
 */
export function formatBRLPlain(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Duração legível a partir de minutos. Ex: 30→"30min", 60→"1h", 90→"1h30min".
 */
export function formatDuration(min: number): string {
  if (!Number.isFinite(min) || min <= 0) return "0min";
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (h === 0) return `${m}min`;
  if (m === 0) return `${h}h`;
  return `${h}h${m}min`;
}

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
