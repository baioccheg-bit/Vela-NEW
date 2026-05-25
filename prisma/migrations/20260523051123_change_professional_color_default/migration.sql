-- AlterTable: alinha o default de Professional.color com a paleta restrita
-- do design system (PROFESSIONAL_PALETTE em src/app/painel/configuracoes/profissionais/lib/schema.ts).
-- C9A96E (champagne) era resquício da era antiga do CLAUDE.md e violava design.md (single hue, no companion).
ALTER TABLE "Professional" ALTER COLUMN "color" SET DEFAULT '2A6062';
