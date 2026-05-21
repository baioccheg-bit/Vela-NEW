import { VelaNav } from "@/components/VelaNav";
import { VelaFooter } from "@/components/VelaFooter";
import "../home.css";

export const metadata = {
  title: "Política de privacidade — Vela",
  description:
    "Como a Vela trata os dados das clínicas e dos pacientes. Conforme LGPD (Lei 13.709/2018).",
};

export default function PrivacidadePage() {
  return (
    <>
      <VelaNav />
      <main>
        <section className="doc-page">
          <div className="container">
            <span className="eyebrow">Legal</span>
            <h1 className="page-hero__title">
              Política de <span className="italic-accent">privacidade</span>.
            </h1>
            <p className="doc-page__lede">
              A Vela é uma plataforma de gestão para clínicas. Tratamos dados de
              clientes (clínicas) e dados de titulares (pacientes) que essas
              clínicas decidem gerenciar pela plataforma. Este documento explica
              como esses dados são coletados, usados, armazenados e protegidos.
            </p>
            <p className="doc-page__meta">
              Última atualização: 21 de maio de 2026 · Conforme LGPD (Lei 13.709/2018)
            </p>

            <div className="doc-page__body">
              <h2>1. Quem é o controlador</h2>
              <p>
                Vela Software Ltda., CNPJ a ser informado, com sede em São
                Paulo/SP. Contato do encarregado de dados (DPO):{" "}
                <a href="mailto:privacidade@vela.com.br">privacidade@vela.com.br</a>.
              </p>

              <h2>2. Dados que tratamos</h2>
              <h3>Dados da clínica (cliente da Vela)</h3>
              <ul>
                <li>Razão social, CNPJ, endereço, telefone, e-mail</li>
                <li>Dados dos profissionais (nome, CRM/CRO/CRP, e-mail, telefone)</li>
                <li>Dados de cobrança (forma de pagamento, histórico de assinaturas)</li>
                <li>Logs de uso da plataforma (acessos, ações, IP)</li>
              </ul>
              <h3>Dados dos pacientes (gerenciados pela clínica)</h3>
              <ul>
                <li>Identificação: nome, CPF, data de nascimento, contato</li>
                <li>Histórico de atendimentos, agendamentos e cobranças</li>
                <li>Anotações clínicas básicas (a critério da clínica)</li>
                <li>Conversas pelo WhatsApp Business operadas pelos agentes Vela</li>
              </ul>
              <p>
                <strong>Importante:</strong> dados sensíveis de saúde (diagnósticos,
                prescrições especializadas, exames) são responsabilidade da clínica
                como controladora. A Vela atua como <em>operadora</em> nesse caso,
                conforme art. 5º, VII da LGPD.
              </p>

              <h2>3. Para que usamos esses dados</h2>
              <ul>
                <li><strong>Operação da plataforma:</strong> agenda, cobrança, prontuário, WhatsApp.</li>
                <li><strong>Agentes de IA:</strong> Júlia, Sofia, Max e Atlas usam o histórico da clínica para personalizar respostas — sem compartilhar com outras clínicas.</li>
                <li><strong>Suporte:</strong> resolver dúvidas e problemas técnicos.</li>
                <li><strong>Faturamento:</strong> cobrar a mensalidade da clínica.</li>
                <li><strong>Melhoria do produto:</strong> métricas agregadas e anonimizadas (nunca dados identificáveis).</li>
                <li><strong>Cumprimento legal:</strong> obrigações fiscais, regulatórias e judiciais.</li>
              </ul>

              <h2>4. Base legal</h2>
              <p>
                Tratamos dados com base em: (a) execução de contrato com a clínica,
                (b) consentimento do titular quando aplicável, (c) cumprimento de
                obrigação legal, (d) interesse legítimo para segurança e melhoria
                do produto, conforme art. 7º da LGPD.
              </p>

              <h2>5. Compartilhamento</h2>
              <p>
                A Vela <strong>não vende</strong> dados. Compartilhamos apenas
                quando necessário para operar:
              </p>
              <ul>
                <li><strong>Subprocessadores:</strong> AWS São Paulo (hospedagem), Stripe e Mercado Pago (pagamentos), Meta (WhatsApp Business API), OpenAI (modelos de linguagem para os agentes — com dados pseudonimizados).</li>
                <li><strong>Autoridades:</strong> apenas mediante ordem judicial ou requisição legal válida.</li>
                <li><strong>Terceiros que a clínica autorize:</strong> integrações ativadas pela clínica (Google Calendar, contadora, ERP).</li>
              </ul>

              <h2>6. Armazenamento e segurança</h2>
              <ul>
                <li>Hospedagem em data centers da AWS na região <strong>sa-east-1 (São Paulo)</strong></li>
                <li>Dados em repouso criptografados com AES-256</li>
                <li>Dados em trânsito por TLS 1.3</li>
                <li>Backups diários redundantes com retenção de 30 dias</li>
                <li>Acesso por papel (RBAC) e log de auditoria por usuário</li>
                <li>Autenticação multifator obrigatória para administradores</li>
              </ul>

              <h2>7. Direitos do titular</h2>
              <p>
                Pacientes (titulares) podem exercer os direitos previstos no
                art. 18 da LGPD: confirmação, acesso, correção, anonimização,
                portabilidade, eliminação e revogação de consentimento. Os
                pedidos devem ser feitos preferencialmente à clínica
                controladora. Quando direcionados à Vela, encaminhamos para a
                clínica responsável em até 5 dias úteis.
              </p>

              <h2>8. Retenção</h2>
              <p>
                Mantemos os dados enquanto a clínica for cliente Vela. Após
                cancelamento, fornecemos exportação completa em até 7 dias e
                eliminamos os dados dos nossos sistemas em até 30 dias —
                exceto registros que precisamos manter por obrigação legal
                (faturas, logs de auditoria) pelos prazos exigidos por lei.
              </p>

              <h2>9. Crianças e adolescentes</h2>
              <p>
                A plataforma não é direcionada ao tratamento autônomo de dados
                de menores. Quando uma clínica atende menores, a responsabilidade
                pelo consentimento dos pais ou responsáveis é da clínica
                controladora.
              </p>

              <h2>10. Alterações desta política</h2>
              <p>
                Atualizamos esta política sempre que houver mudança material no
                tratamento de dados. Avisamos todos os clientes por e-mail e
                publicamos a versão nova com 30 dias de antecedência. Versões
                anteriores ficam acessíveis no nosso repositório público.
              </p>

              <div className="doc-page__contact">
                <strong>Encarregado de dados (DPO):</strong>{" "}
                <a href="mailto:privacidade@vela.com.br">privacidade@vela.com.br</a><br />
                Para denúncias à ANPD: <a href="https://www.gov.br/anpd" target="_blank" rel="noopener">gov.br/anpd</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <VelaFooter />
    </>
  );
}
