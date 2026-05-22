import { requireMembership } from "@/lib/auth/session";
import { getJuliaConversations } from "../lib/queries";
import { JuliaClient, type ConversationView } from "./JuliaClient";

const timeFmt = new Intl.DateTimeFormat("pt-BR", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

export default async function JuliaPage() {
  const { clinicId } = await requireMembership("/painel/julia");
  const rows = await getJuliaConversations(clinicId);

  const conversations: ConversationView[] = rows.map((c) => ({
    id: c.id,
    patient: c.patient.name,
    preview: c.lastPreview,
    time: timeFmt.format(c.lastMessageAt),
    unread: c.unread,
    messages: c.messages.map((m) => ({
      id: m.id,
      sender: m.sender,
      text: m.text,
      time: timeFmt.format(m.sentAt),
    })),
  }));

  return <JuliaClient conversations={conversations} />;
}
