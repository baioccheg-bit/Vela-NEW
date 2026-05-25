// Formatadores de display específicos do domínio Paciente.
// Não pode ser "server-only" — Client Components também consomem.

/**
 * E.164 BR → exibição com máscara.
 *   "+5511999999999" → "(11) 99999-9999"
 *   "+551199999999"  → "(11) 9999-9999"
 * Se input não bate o esperado, devolve o valor original (não quebra UI).
 */
export function formatPhoneDisplay(phoneE164: string): string {
  if (!phoneE164.startsWith("+55")) return phoneE164;
  const digits = phoneE164.slice(3);
  if (digits.length === 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  if (digits.length === 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }
  return phoneE164;
}

/**
 * Mascara E.164 BR para logs e audit trail (LGPD).
 *   "+5511999999999" → "+55 11 9****9999"
 *   "+551199999999"  → "+55 11 ****9999"
 * Preserva DDD e os 4 últimos dígitos. NUNCA usar para exibir na UI.
 */
export function maskPhoneForLogs(phoneE164: string): string {
  if (!phoneE164.startsWith("+55") || phoneE164.length < 13) {
    return "+55 ** ****";
  }
  const ddd = phoneE164.slice(3, 5);
  const rest = phoneE164.slice(5);
  if (rest.length === 9) {
    const head = rest[0];
    const last4 = rest.slice(-4);
    return `+55 ${ddd} ${head}****${last4}`;
  }
  if (rest.length === 8) {
    const last4 = rest.slice(-4);
    return `+55 ${ddd} ****${last4}`;
  }
  return `+55 ${ddd} ****`;
}

/**
 * 11 dígitos → "123.456.789-00".
 * Se não bater 11 dig, devolve o input original.
 */
export function formatCPFDisplay(cpf: string): string {
  const d = cpf.replace(/\D/g, "");
  if (d.length !== 11) return cpf;
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
}

/**
 * Date → "dd/mm/yyyy" pra inputs e display.
 */
export function formatBirthDateBR(d: Date): string {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

/**
 * Anos completos a partir do birthDate.
 */
export function ageFromBirthDate(d: Date): number {
  const today = new Date();
  let age = today.getFullYear() - d.getFullYear();
  const m = today.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < d.getDate())) age--;
  return age;
}

/**
 * ISO datetime → "dd/mm/yyyy HH:MM" pro histórico de agendamentos.
 */
export function formatDateTimeBR(iso: string): string {
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  const hh = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  return `${dd}/${mm}/${yyyy} ${hh}:${min}`;
}
