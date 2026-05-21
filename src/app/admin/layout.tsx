import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Link from "next/link";

import { authOptions } from "@/lib/auth";
import "../home.css";

export const metadata = {
  title: "Admin — Vela",
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/entrar?callbackUrl=/admin");
  if (session.user.role !== "VELA_ADMIN") redirect("/");

  return (
    <div className="admin-shell">
      <aside className="admin-shell__rail">
        <div className="admin-shell__brand">Vela <span>admin</span></div>
        <nav className="admin-shell__nav">
          <Link href="/admin">Visão geral</Link>
          <Link href="/admin/leads">Leads</Link>
          <Link href="/admin/clinicas">Clínicas</Link>
          <Link href="/admin/auditoria">Auditoria</Link>
        </nav>
        <div className="admin-shell__profile">
          <span className="admin-shell__avatar">{session.user.name?.[0] || "V"}</span>
          <div>
            <div className="admin-shell__name">{session.user.name || "Vela admin"}</div>
            <div className="admin-shell__email">{session.user.email}</div>
          </div>
        </div>
      </aside>
      <main className="admin-shell__main">{children}</main>
    </div>
  );
}
