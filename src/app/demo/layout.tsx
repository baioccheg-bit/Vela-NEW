import type { Metadata } from "next";
import { Sidebar } from "./components/Sidebar";
import { Topbar } from "./components/Topbar";

export const metadata: Metadata = {
  title: "Vela — Demo da plataforma",
  description: "Demonstração interativa da plataforma Vela. Dados simulados para fins de apresentação.",
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-paper-0 text-ink-0 flex font-body">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 p-6 md:p-8">
          <div className="mx-auto max-w-[1400px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
