-- Adiciona welcomedAt ao User pra controlar exibição do modal de boas-vindas.
-- Null = nunca viu, modal aparece. Não-null = já fechou (tour ou pular).
ALTER TABLE "User" ADD COLUMN "welcomedAt" TIMESTAMP(3);

-- Adiciona onboardingDismissedAt ao Clinic pra controlar exibição do checklist.
-- Null = checklist visível (se houver pendências). Não-null = user fechou explicitamente.
-- O checklist também some sozinho quando todos os itens ATIVOS estão concluídos (lógica no componente).
ALTER TABLE "Clinic" ADD COLUMN "onboardingDismissedAt" TIMESTAMP(3);
