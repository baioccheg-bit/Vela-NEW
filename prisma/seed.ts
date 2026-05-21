/**
 * Seed inicial — cria o primeiro usuário VELA_ADMIN baseado em
 * SEED_ADMIN_EMAIL, SEED_ADMIN_NAME e SEED_ADMIN_PASSWORD do .env.
 *
 * Rode com: npx prisma db seed
 */
import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, UserRole } from "../src/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL?.toLowerCase();
  const name = process.env.SEED_ADMIN_NAME || "Vela admin";
  const password = process.env.SEED_ADMIN_PASSWORD;

  if (!email) {
    console.error("Defina SEED_ADMIN_EMAIL no .env antes de rodar o seed.");
    process.exit(1);
  }
  if (!password || password.length < 8) {
    console.error("SEED_ADMIN_PASSWORD precisa ter ao menos 8 caracteres no .env.");
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const admin = await prisma.user.upsert({
    where: { email },
    update: {
      name,
      passwordHash,
      role: UserRole.VELA_ADMIN,
      emailVerified: new Date(),
    },
    create: {
      email,
      name,
      passwordHash,
      role: UserRole.VELA_ADMIN,
      emailVerified: new Date(),
    },
  });

  console.log(`✓ Admin pronto: ${admin.email} (id ${admin.id})`);
  console.log("  Acesse /entrar e use email + senha definidos no .env.");
  console.log("  TROQUE a senha pelo painel assim que entrar.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
