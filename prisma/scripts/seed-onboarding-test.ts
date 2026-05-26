/**
 * Cria uma 2ª clínica COMPLETAMENTE VAZIA (sem patients/appointments) pra
 * testar o onboarding partindo do zero — apenas com os defaults injetados
 * (Procedures genéricos + Professional inicial do user admin).
 *
 * Cada execução cria slug/email com timestamp pra evitar colisão e
 * permitir várias clínicas de teste convivendo.
 *
 * Rode com: npm run db:seed:onboarding-test
 */
import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import {
  PrismaClient,
  MembershipRole,
  UserRole,
} from "../../src/generated/prisma/client";
import {
  seedClinicDefaults,
  seedClinicBusinessHours,
  createInitialProfessionalForAdmin,
} from "../../src/lib/clinics/seed-defaults";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const TEST_USER_NAME = "Clínica de Teste";
const TEST_USER_PASSWORD = "teste123";

async function main() {
  const stamp = Date.now().toString(36);
  const slug = `onboarding-${stamp}`;
  const email = `onboarding-${stamp}@vela.com.br`;
  const name = `Onboarding ${stamp}`;

  const clinic = await prisma.clinic.create({
    data: { name, slug },
  });

  await seedClinicDefaults(clinic.id);
  await seedClinicBusinessHours(clinic.id);

  const passwordHash = await bcrypt.hash(TEST_USER_PASSWORD, 12);
  const user = await prisma.user.create({
    data: {
      email,
      name: TEST_USER_NAME,
      passwordHash,
      role: UserRole.CUSTOMER,
      emailVerified: new Date(),
    },
  });

  await prisma.membership.create({
    data: { userId: user.id, clinicId: clinic.id, role: MembershipRole.ADMIN },
  });

  await createInitialProfessionalForAdmin(user.id, clinic.id, TEST_USER_NAME);

  console.log("✓ Clínica de teste criada.");
  console.log("");
  console.log(`Logue como ${email} com senha ${TEST_USER_PASSWORD} pra testar onboarding partindo de clínica recém-criada.`);
  console.log("");
  console.log(`  Slug:   ${slug}`);
  console.log(`  Nome:   ${name}`);
  console.log("");
  console.log("Conteúdo da clínica:");
  console.log("  - 3 procedimentos genéricos (Consulta, Retorno, Avaliação)");
  console.log(`  - 1 profissional Administradora (${TEST_USER_NAME})`);
  console.log("  - 7 horários default (seg-sex 8-18, sáb 8-12, dom fechado)");
  console.log("  - 0 pacientes");
  console.log("  - 0 agendamentos");
  console.log("");
  console.log("Ao logar, /painel deve mostrar:");
  console.log("  - Modal de boas-vindas (welcomedAt = null)");
  console.log("  - Checklist no canto: item 'Importar pacientes' pendente");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
