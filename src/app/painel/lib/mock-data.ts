/**
 * Utilitários compartilhados pelas pages do /painel.
 *
 * Tipos e dados de domínio migraram pro Prisma + ./queries.ts.
 * Este arquivo só guarda os formatters pra evitar duplicação.
 */

export function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
