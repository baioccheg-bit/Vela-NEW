import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const p = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

async function main() {
  const u = await p.user.findUnique({
    where: { email: "demo@vela.com.br" },
    include: { memberships: { include: { clinic: true } } },
  });

  if (!u) {
    console.log("✗ Usuário demo NÃO existe no banco");
    return;
  }

  console.log("✓ Usuário existe:");
  console.log("   id:", u.id);
  console.log("   email:", u.email);
  console.log("   role:", u.role);
  console.log("   passwordHash:", u.passwordHash ? `${u.passwordHash.slice(0, 12)}…` : "NULL");
  console.log("   emailVerified:", u.emailVerified);
  console.log("   memberships:", u.memberships.map((m) => `${m.role} @ ${m.clinic.slug}`));

  if (u.passwordHash) {
    const ok = await bcrypt.compare("demo123", u.passwordHash);
    console.log(`\n✓ bcrypt compare('demo123', hash): ${ok ? "MATCH ✓" : "FAIL ✗"}`);
  }
}

main().finally(() => p.$disconnect());
