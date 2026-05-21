import { VelaNav } from "@/components/VelaNav";
import { VelaFooter } from "@/components/VelaFooter";
import "../home.css";

export const metadata = {
  title: "Termos de uso — Vela",
  description: "Termos que regem a contratação e uso da plataforma Vela.",
};

export default function TermosPage() {
  return (
    <>
      <VelaNav />
      <main>
        <section className="doc-page">
          <div className="container">
            <span className="eyebrow">Legal</span>
            <h1 className="page-hero__title">
              Termos de <span className="italic-accent">uso</span>.
            </h1>
            <p className="doc-page__lede">
              Estes termos regulam a relação entre a Vela Software Ltda. e as
              clínicas que contratam a plataforma. Ao contratar, você concorda
              com tudo abaixo. Leia com atenção antes de aceitar.
            </p>
            <p className="doc-page__meta">Última atualização: 21 de maio de 2026</p>

            <div className="doc-page__body">
              <h2>1. Objeto</h2>
              <p>
                A Vela fornece uma plataforma SaaS de gestão para clínicas,
                incluindo agenda, cobrança, prontuário básico, integração com
                WhatsApp Business e agentes de inteligência artificial
                especializados em rotinas operacionais.
              </p>

              <h2>2. Contratação</h2>
              <p>
                A contratação se dá pela escolha de um plano (Essencial, Clínica
                ou Rede) e assinatura digital do contrato. A primeira cobrança
                ocorre 14 dias após a ativação (período de avaliação gratuita).
                Após esse prazo, as renovações são mensais e automáticas.
              </p>

              <h2>3. Responsabilidades da Vela</h2>
              <ul>
                <li>Manter a plataforma disponível com SLA conforme plano contratado</li>
                <li>Proteger os dados conforme a <a href="/privacidade">política de privacidade</a></li>
                <li>Notificar a clínica em até 72h sobre qualquer incidente de segurança</li>
                <li>Fornecer suporte técnico no canal e prazo previstos no plano</li>
                <li>Aplicar atualizações sem interrupção do serviço sempre que possível</li>
              </ul>

              <h2>4. Responsabilidades da clínica</h2>
              <ul>
                <li>Manter credenciais de acesso em sigilo</li>
                <li>Garantir veracidade dos dados cadastrados</li>
                <li>Obter consentimento dos pacientes para tratamento de dados quando exigido pela LGPD</li>
                <li>Atuar como controladora dos dados clínicos dos pacientes</li>
                <li>Manter os pagamentos em dia</li>
                <li>Não utilizar a plataforma para finalidades ilícitas, abusivas ou em desacordo com a regulamentação sanitária aplicável</li>
              </ul>

              <h2>5. Pagamento e inadimplência</h2>
              <p>
                Cobranças mensais via Pix, cartão de crédito ou boleto.
                Inadimplência por mais de 15 dias suspende o acesso à
                plataforma, mantendo apenas a exportação de dados. Após 60 dias,
                a conta pode ser encerrada conforme cláusula 9.
              </p>

              <h2>6. Limitações</h2>
              <p>
                A Vela é uma ferramenta de gestão. <strong>Não substitui</strong>{" "}
                avaliação médica, decisão clínica ou responsabilidade
                profissional. Os agentes de IA são auxiliares: a clínica é
                responsável pela revisão e supervisão das interações com
                pacientes.
              </p>

              <h2>7. Propriedade intelectual</h2>
              <p>
                Todo o software, design, marca e conteúdo da Vela são de
                propriedade exclusiva da Vela Software Ltda. Os dados cadastrados
                pela clínica permanecem de propriedade da clínica.
              </p>

              <h2>8. Disponibilidade e SLA</h2>
              <ul>
                <li><strong>Essencial:</strong> 99,5% de uptime, suporte por e-mail em 24h úteis</li>
                <li><strong>Clínica:</strong> 99,8% de uptime, suporte em até 4h úteis</li>
                <li><strong>Rede:</strong> 99,9% de uptime, gerente de conta dedicado, SLA contratado</li>
              </ul>

              <h2>9. Encerramento</h2>
              <p>
                Qualquer parte pode encerrar a relação a qualquer tempo, com
                aviso prévio de 7 dias. Não há multa de fidelidade. Após o
                encerramento, a clínica tem 30 dias para baixar a exportação
                completa antes da eliminação definitiva dos dados.
              </p>

              <h2>10. Limitação de responsabilidade</h2>
              <p>
                A responsabilidade da Vela limita-se ao valor pago pela clínica
                nos 12 meses anteriores ao evento que gerou o pedido. Excluem-se
                lucros cessantes e danos indiretos, salvo nos casos previstos
                pelo Código Civil e CDC.
              </p>

              <h2>11. Foro</h2>
              <p>
                Foro da Comarca de São Paulo/SP, com renúncia expressa a
                qualquer outro, por mais privilegiado que seja.
              </p>

              <div className="doc-page__contact">
                Dúvidas sobre estes termos:{" "}
                <a href="mailto:juridico@vela.com.br">juridico@vela.com.br</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <VelaFooter />
    </>
  );
}
