/**
 * NextAuth v4 config.
 * Suporta 4 métodos de login, todos opcionais via env var:
 *   - Email + senha (CredentialsProvider, sempre ativo)
 *   - Magic link (EmailProvider, ativo se RESEND_API_KEY)
 *   - Google OAuth (ativo se GOOGLE_CLIENT_ID + SECRET)
 *   - Microsoft OAuth (ativo se AZURE_AD_CLIENT_ID + SECRET)
 *
 * O PrismaAdapter persiste contas/sessões. Strategy "database" pra
 * sessões de magic link/OAuth, JWT pra sessões de senha (NextAuth v4
 * suporta híbrido nativamente).
 */
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import type { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";
import AzureADProvider from "next-auth/providers/azure-ad";

import { prisma } from "@/lib/prisma";
import { magicLinkTemplate, sendEmail } from "@/lib/email";

const providers: NextAuthOptions["providers"] = [];

// ── Email + senha (sempre ativo, é o método base) ──
providers.push(
  CredentialsProvider({
    id: "credentials",
    name: "E-mail e senha",
    credentials: {
      email: { label: "E-mail", type: "email" },
      password: { label: "Senha", type: "password" },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) return null;
      const user = await prisma.user.findUnique({
        where: { email: credentials.email.toLowerCase() },
      });
      if (!user || !user.passwordHash) return null;
      const ok = await bcrypt.compare(credentials.password, user.passwordHash);
      if (!ok) return null;
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
      };
    },
  })
);

// ── Magic link (se Resend configurado) ──
if (process.env.RESEND_API_KEY) {
  providers.push(
    EmailProvider({
      // Usamos nossa wrapper sendEmail para entregar via Resend,
      // assim não precisamos configurar SMTP separado.
      sendVerificationRequest: async ({ identifier: email, url }) => {
        const tpl = magicLinkTemplate(url);
        const result = await sendEmail({ to: email, ...tpl });
        if (!result.ok) {
          throw new Error(`Falha ao enviar magic link: ${result.error}`);
        }
      },
      // Server/from não importam quando sendVerificationRequest é custom.
      server: { host: "unused", port: 25, auth: { user: "x", pass: "x" } },
      from: process.env.RESEND_FROM_EMAIL || "noreply@vela.com.br",
    })
  );
}

// ── Google OAuth (se configurado) ──
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    })
  );
}

// ── Microsoft OAuth (se configurado) ──
if (process.env.AZURE_AD_CLIENT_ID && process.env.AZURE_AD_CLIENT_SECRET) {
  providers.push(
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
      tenantId: process.env.AZURE_AD_TENANT_ID || "common",
      allowDangerousEmailAccountLinking: true,
    })
  );
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers,
  session: {
    /** Mix de strategies: Credentials sempre vira JWT; demais usam DB. */
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 dias
  },
  pages: {
    signIn: "/entrar",
    error: "/entrar",
    verifyRequest: "/entrar?verify=1",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        // Carrega role + memberships frescos do DB a cada sessão
        const user = await prisma.user.findUnique({
          where: { id: token.sub },
          select: {
            role: true,
            memberships: { select: { clinicId: true, role: true } },
          },
        });
        if (user) {
          session.user.role = user.role;
          session.user.memberships = user.memberships;
        }
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) token.sub = user.id;
      return token;
    },
  },
  events: {
    async signIn({ user }) {
      // Log de auditoria pra LGPD (best-effort, não bloqueia login)
      try {
        await prisma.auditLog.create({
          data: {
            userId: user.id,
            action: "user.login",
            resourceType: "User",
            resourceId: user.id,
          },
        });
      } catch {
        // silent
      }
    },
  },
};

/* ── Type augmentation pro session.user ── */
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email?: string | null;
      name?: string | null;
      image?: string | null;
      role?: "VELA_ADMIN" | "CUSTOMER";
      memberships?: { clinicId: string; role: string }[];
    };
  }
}
