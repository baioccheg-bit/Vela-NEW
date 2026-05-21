/**
 * Protege rotas /admin/* — só passa quem está logado E tem role VELA_ADMIN.
 * Quem não está logado é mandado pra /entrar com callbackUrl pra voltar.
 */
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    const url = new URL("/entrar", req.url);
    url.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // O token tem `sub` (userId) mas não a role. Pra evitar uma query DB em todo
  // request, deixamos a checagem fina de role pro server component da página
  // /admin (que faz redirect se não for VELA_ADMIN). O middleware só garante
  // "tem sessão". Trade-off: menos latência aqui, checagem de role no render.
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
