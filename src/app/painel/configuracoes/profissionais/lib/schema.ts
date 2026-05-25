// Compartilhado entre Server Action (validação) e Client (paleta visual).
// Não pode ser "server-only".
import { z } from "zod";

/**
 * Resultado padronizado de Server Actions desta feature.
 * - `data` quando `ok: true`.
 * - `error` (mensagem pt-BR direta) e `fieldErrors` opcional quando `ok: false`.
 */
export type ActionResult<T = null> =
  | { ok: true; data: T }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

/**
 * Paleta restrita pra cor de identificação do profissional.
 * Apenas variações dos hues do design system (195° teal / 220° ink) —
 * design.md proíbe companion e CLAUDE.md proíbe cores fora dos tokens.
 *
 * Armazenadas como hex sem `#` (compat com Professional.color do schema).
 */
export const PROFESSIONAL_PALETTE = [
  { hex: "2A6062", label: "Teal" },
  { hex: "1A3F40", label: "Teal profundo" },
  { hex: "5A969A", label: "Teal suave" },
  { hex: "1F2733", label: "Grafite" },
  { hex: "50596A", label: "Ardósia" },
  { hex: "7A8290", label: "Pedra" },
] as const;

export type PaletteEntry = (typeof PROFESSIONAL_PALETTE)[number];

const allowedColors = PROFESSIONAL_PALETTE.map((p) => p.hex) as [string, ...string[]];

export const professionalInputSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Nome precisa ter ao menos 2 caracteres")
    .max(120, "Nome longo demais"),
  role: z
    .string()
    .trim()
    .min(2, "Função obrigatória")
    .max(80, "Função longa demais"),
  color: z.enum(allowedColors, {
    message: "Selecione uma das cores disponíveis",
  }),
  active: z.boolean(),
});

export type ProfessionalInput = z.infer<typeof professionalInputSchema>;
