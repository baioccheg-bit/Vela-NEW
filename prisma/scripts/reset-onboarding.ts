/**
 * Reseta o estado de onboarding da clínica/usuário do seed-demo.
 *
 * Útil pra testar manualmente o WelcomeModal e o OnboardingChecklist
 * partindo de uma clínica que já tem dados (profissionais, procedimentos,
 * pacientes do seed) mas precisa "esquecer" que o user já fechou o
 * onboarding.
 *
 * Rode com: npm run db:reset-onboarding
 */
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../src/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const CLINIC_SLUG = "demo";
const DEMO_USER_EMAIL = "demo@vela.com.br";

async function main() {
  const clinic = await prisma.clinic.findUnique({ where: { slug: CLINIC_SLUG } });
  const user = await prisma.user.findUnique({ where: { email: DEMO_USER_EMAIL } });

  if (!clinic) {
    console.error(`✗ Clínica com slug "${CLINIC_SLUG}" não encontrada. Rode npm run db:seed:demo primeiro.`);
    process.exit(1);
  }
  if (!user) {
    console.error(`✗ Usuário ${DEMO_USER_EMAIL} não encontrado. Rode npm run db:seed:demo primeiro.`);
    process.exit(1);
  }

  await prisma.$transaction([
    prisma.user.update({ where: { id: user.id }, data: { welcomedAt: null } }),
    prisma.clinic.update({ where: { id: clinic.id }, data: { onboardingDismissedAt: null } }),
  ]);

  console.log("✓ Onboarding resetado.");
  console.log(`  Clínica: ${clinic.name} (${CLINIC_SLUG})`);
  console.log(`  Usuário: ${DEMO_USER_EMAIL}`);
  console.log("");
  console.log("Próximo login em /painel mostrará modal de boas-vindas e checklist.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
