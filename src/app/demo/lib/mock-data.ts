export type AppointmentStatus = "confirmado" | "pendente" | "atendido" | "cancelado";

export type Appointment = {
  id: string;
  time: string;
  patient: string;
  procedure: string;
  professional: string;
  durationMin: number;
  status: AppointmentStatus;
  value: number;
};

export type Patient = {
  id: string;
  name: string;
  age: number;
  phone: string;
  lastVisit: string;
  totalSpent: number;
  procedures: number;
  tag: "vip" | "ativo" | "inativo" | "novo";
};

export type ChatMessage = {
  id: string;
  from: "patient" | "julia";
  text: string;
  time: string;
};

export type Conversation = {
  id: string;
  patient: string;
  preview: string;
  time: string;
  unread: number;
  messages: ChatMessage[];
};

export type KPI = {
  label: string;
  value: string;
  delta: number;
  hint: string;
};

export const kpis: KPI[] = [
  { label: "Faturamento (mês)", value: "R$ 184.320", delta: 12.4, hint: "vs. mês anterior" },
  { label: "Agendamentos", value: "428", delta: 8.1, hint: "248 confirmados" },
  { label: "Taxa de ocupação", value: "87%", delta: 4.2, hint: "média da semana" },
  { label: "No-show", value: "6.2%", delta: -2.8, hint: "queda de 38% YoY" },
];

export const revenueLast7Days: { day: string; value: number }[] = [
  { day: "Qui", value: 18400 },
  { day: "Sex", value: 24200 },
  { day: "Sáb", value: 31800 },
  { day: "Dom", value: 9200 },
  { day: "Seg", value: 21600 },
  { day: "Ter", value: 27400 },
  { day: "Qua", value: 29800 },
];

export const todaysAppointments: Appointment[] = [
  { id: "ap-01", time: "08:30", patient: "Mariana Costa", procedure: "Limpeza de pele profunda", professional: "Dra. Helena", durationMin: 60, status: "confirmado", value: 280 },
  { id: "ap-02", time: "09:30", patient: "Júlia Bernardes", procedure: "Botox — terço superior", professional: "Dra. Helena", durationMin: 45, status: "atendido", value: 1450 },
  { id: "ap-03", time: "10:15", patient: "Renata Albuquerque", procedure: "Preenchimento labial", professional: "Dr. Bruno", durationMin: 60, status: "confirmado", value: 1890 },
  { id: "ap-04", time: "11:30", patient: "Camila Fontes", procedure: "Microagulhamento", professional: "Dra. Helena", durationMin: 90, status: "pendente", value: 620 },
  { id: "ap-05", time: "14:00", patient: "Patrícia Lemos", procedure: "Harmonização facial", professional: "Dr. Bruno", durationMin: 120, status: "confirmado", value: 3200 },
  { id: "ap-06", time: "15:00", patient: "Bianca Tavares", procedure: "Drenagem linfática", professional: "Sofia (estética)", durationMin: 60, status: "confirmado", value: 240 },
  { id: "ap-07", time: "16:30", patient: "Larissa Andrade", procedure: "Peeling químico", professional: "Dra. Helena", durationMin: 45, status: "pendente", value: 480 },
  { id: "ap-08", time: "18:00", patient: "Fernanda Brito", procedure: "Avaliação inicial", professional: "Dr. Bruno", durationMin: 30, status: "confirmado", value: 0 },
];

export const patients: Patient[] = [
  { id: "pt-001", name: "Mariana Costa", age: 34, phone: "(11) 98421-3092", lastVisit: "2026-05-19", totalSpent: 8420, procedures: 12, tag: "vip" },
  { id: "pt-002", name: "Júlia Bernardes", age: 41, phone: "(11) 99113-8721", lastVisit: "2026-05-20", totalSpent: 14820, procedures: 18, tag: "vip" },
  { id: "pt-003", name: "Renata Albuquerque", age: 29, phone: "(11) 97208-4451", lastVisit: "2026-05-20", totalSpent: 5890, procedures: 7, tag: "ativo" },
  { id: "pt-004", name: "Camila Fontes", age: 38, phone: "(11) 99821-7733", lastVisit: "2026-05-12", totalSpent: 3240, procedures: 4, tag: "ativo" },
  { id: "pt-005", name: "Patrícia Lemos", age: 47, phone: "(11) 98742-1180", lastVisit: "2026-05-20", totalSpent: 22300, procedures: 24, tag: "vip" },
  { id: "pt-006", name: "Bianca Tavares", age: 26, phone: "(11) 99003-2287", lastVisit: "2026-05-20", totalSpent: 1240, procedures: 3, tag: "novo" },
  { id: "pt-007", name: "Larissa Andrade", age: 32, phone: "(11) 98114-6620", lastVisit: "2026-05-18", totalSpent: 4810, procedures: 6, tag: "ativo" },
  { id: "pt-008", name: "Fernanda Brito", age: 39, phone: "(11) 99577-1043", lastVisit: "2026-05-20", totalSpent: 0, procedures: 0, tag: "novo" },
  { id: "pt-009", name: "Helena Vasconcelos", age: 52, phone: "(11) 98220-7791", lastVisit: "2026-02-08", totalSpent: 18900, procedures: 21, tag: "inativo" },
  { id: "pt-010", name: "Sofia Caldeira", age: 28, phone: "(11) 99410-5582", lastVisit: "2026-05-15", totalSpent: 6230, procedures: 9, tag: "ativo" },
  { id: "pt-011", name: "Isabela Moreno", age: 44, phone: "(11) 98033-1147", lastVisit: "2026-04-22", totalSpent: 11600, procedures: 14, tag: "ativo" },
  { id: "pt-012", name: "Beatriz Carvalho", age: 36, phone: "(11) 99820-3344", lastVisit: "2026-01-30", totalSpent: 7400, procedures: 8, tag: "inativo" },
];

export const conversations: Conversation[] = [
  {
    id: "cv-1",
    patient: "Mariana Costa",
    preview: "Perfeito, confirmado para amanhã às 09:30.",
    time: "há 2 min",
    unread: 0,
    messages: [
      { id: "m1", from: "patient", text: "Oi, posso remarcar minha consulta de quinta?", time: "14:02" },
      { id: "m2", from: "julia", text: "Claro, Mariana. Tenho horários disponíveis na sexta às 10:30 e no sábado às 09:30. Qual prefere?", time: "14:02" },
      { id: "m3", from: "patient", text: "Sábado às 09:30 está ótimo.", time: "14:05" },
      { id: "m4", from: "julia", text: "Perfeito, confirmado para amanhã às 09:30. Você receberá um lembrete na sexta à noite. Algo mais?", time: "14:05" },
    ],
  },
  {
    id: "cv-2",
    patient: "Renata Albuquerque",
    preview: "Sua próxima sessão está agendada para...",
    time: "há 14 min",
    unread: 2,
    messages: [
      { id: "m1", from: "patient", text: "Boa tarde, quanto custa o preenchimento labial?", time: "13:48" },
      { id: "m2", from: "julia", text: "Olá Renata. O preenchimento labial com a Dra. Helena é R$ 1.890, incluindo retorno de avaliação em 15 dias.", time: "13:48" },
      { id: "m3", from: "patient", text: "Gostaria de agendar uma avaliação", time: "13:51" },
    ],
  },
  {
    id: "cv-3",
    patient: "Patrícia Lemos",
    preview: "Obrigada! Até amanhã.",
    time: "há 1 h",
    unread: 0,
    messages: [
      { id: "m1", from: "julia", text: "Patrícia, sua sessão de harmonização facial está confirmada para amanhã às 14:00. Lembre-se de não consumir álcool nas próximas 24h.", time: "12:30" },
      { id: "m2", from: "patient", text: "Obrigada! Até amanhã.", time: "12:48" },
    ],
  },
  {
    id: "cv-4",
    patient: "Bianca Tavares",
    preview: "Confirmando sua presença para hoje às 15:00.",
    time: "há 3 h",
    unread: 0,
    messages: [
      { id: "m1", from: "julia", text: "Bianca, confirmando sua drenagem linfática hoje às 15:00 com Sofia. Confirma?", time: "10:00" },
      { id: "m2", from: "patient", text: "Confirmo!", time: "10:11" },
    ],
  },
];

type AgendaSlot = { time: string; days: ({ patient: string; procedure: string; status: AppointmentStatus } | null)[] };

export const weekAgenda: AgendaSlot[] = [
  { time: "08:00", days: [null, { patient: "M. Costa", procedure: "Limpeza", status: "confirmado" }, null, { patient: "L. Andrade", procedure: "Peeling", status: "atendido" }, null, { patient: "C. Fontes", procedure: "Microagulhamento", status: "confirmado" }, null] },
  { time: "09:00", days: [{ patient: "S. Caldeira", procedure: "Botox", status: "atendido" }, { patient: "J. Bernardes", procedure: "Botox", status: "atendido" }, { patient: "R. Albuquerque", procedure: "Avaliação", status: "atendido" }, null, { patient: "I. Moreno", procedure: "Limpeza", status: "confirmado" }, null, null] },
  { time: "10:00", days: [null, { patient: "R. Albuquerque", procedure: "Preench. labial", status: "confirmado" }, { patient: "P. Lemos", procedure: "Harmonização", status: "atendido" }, { patient: "F. Brito", procedure: "Avaliação", status: "confirmado" }, null, { patient: "B. Tavares", procedure: "Drenagem", status: "atendido" }, null] },
  { time: "11:00", days: [{ patient: "B. Carvalho", procedure: "Limpeza", status: "cancelado" }, { patient: "C. Fontes", procedure: "Microagulh.", status: "pendente" }, null, null, { patient: "L. Andrade", procedure: "Botox", status: "confirmado" }, null, null] },
  { time: "14:00", days: [{ patient: "I. Moreno", procedure: "Preench.", status: "atendido" }, { patient: "P. Lemos", procedure: "Harmonização", status: "confirmado" }, { patient: "M. Costa", procedure: "Peeling", status: "atendido" }, { patient: "S. Caldeira", procedure: "Limpeza", status: "confirmado" }, null, null, null] },
  { time: "15:00", days: [null, { patient: "B. Tavares", procedure: "Drenagem", status: "confirmado" }, { patient: "J. Bernardes", procedure: "Retorno", status: "atendido" }, null, { patient: "F. Brito", procedure: "Botox", status: "pendente" }, null, null] },
  { time: "16:00", days: [{ patient: "R. Albuquerque", procedure: "Microagulh.", status: "atendido" }, { patient: "L. Andrade", procedure: "Peeling", status: "pendente" }, null, { patient: "H. Vasconcelos", procedure: "Avaliação", status: "confirmado" }, { patient: "C. Fontes", procedure: "Retorno", status: "confirmado" }, null, null] },
  { time: "17:00", days: [null, null, { patient: "I. Moreno", procedure: "Botox", status: "confirmado" }, null, { patient: "B. Carvalho", procedure: "Limpeza", status: "confirmado" }, null, null] },
  { time: "18:00", days: [{ patient: "P. Lemos", procedure: "Retorno", status: "confirmado" }, null, { patient: "F. Brito", procedure: "Avaliação", status: "confirmado" }, { patient: "S. Caldeira", procedure: "Botox", status: "confirmado" }, null, null, null] },
];

export const weekDays = ["Seg 18", "Ter 19", "Qua 20", "Qui 21", "Sex 22", "Sáb 23", "Dom 24"];

export const formatBRL = (value: number): string =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);

export const formatDate = (iso: string): string => {
  const d = new Date(iso);
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
};
