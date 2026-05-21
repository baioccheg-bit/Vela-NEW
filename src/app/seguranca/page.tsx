import { VelaNav } from "@/components/VelaNav";
import { VelaFooter } from "@/components/VelaFooter";
import "../home.css";

export const metadata = {
  title: "Segurança — Vela",
  description:
    "Práticas de segurança técnica e organizacional aplicadas pela Vela: criptografia, controle de acesso, auditoria, resposta a incidentes.",
};

export default function SegurancaPage() {
  return (
    <>
      <VelaNav />
      <main>
        <section className="doc-page">
          <div className="container">
            <span className="eyebrow">Segurança</span>
            <h1 className="page-hero__title">
              Segurança não é <span className="italic-accent">feature</span>. É fundação.
            </h1>
            <p className="doc-page__lede">
              Sua clínica gerencia dados sensíveis: identificação, contato,
              histórico de atendimentos, fluxo financeiro. A Vela trata esses
              dados com a mesma seriedade que um banco trata extratos. Aqui
              está como.
            </p>
            <p className="doc-page__meta">Última atualização: 21 de maio de 2026</p>

            <div className="doc-page__body">
              <h2>Infraestrutura</h2>
              <ul>
                <li><strong>Hospedagem AWS Brasil</strong> — região sa-east-1 (São Paulo), zonas de disponibilidade múltiplas</li>
                <li><strong>Banco de dados PostgreSQL</strong> em RDS Multi-AZ com failover automático</li>
                <li><strong>Backups diários</strong> com retenção de 30 dias e teste mensal de restauração</li>
                <li><strong>Recuperação de desastre</strong> com RPO &lt; 15 minutos e RTO &lt; 4 horas</li>
              </ul>

              <h2>Criptografia</h2>
              <ul>
                <li><strong>Em repouso:</strong> AES-256 em todos os bancos, backups e armazenamento de objetos</li>
                <li><strong>Em trânsito:</strong> TLS 1.3 obrigatório, certificados gerenciados via ACM</li>
                <li><strong>Senhas:</strong> bcrypt com cost factor 12, jamais armazenadas em texto puro</li>
                <li><strong>Chaves gerenciadas</strong> via AWS KMS com rotação automática</li>
              </ul>

              <h2>Controle de acesso</h2>
              <ul>
                <li><strong>Autenticação multifator</strong> obrigatória para administradores da clínica</li>
                <li><strong>Controle por papel (RBAC)</strong> — recepcionista vê o que precisa, financeiro vê o que precisa, proprietário vê tudo</li>
                <li><strong>Sessões com expiração</strong> automática após inatividade</li>
                <li><strong>SSO via Google / Microsoft</strong> disponível no plano Rede</li>
              </ul>

              <h2>Auditoria</h2>
              <p>
                Todo acesso ao painel é logado: quem entrou, quando, de qual IP,
                que ações fez. Logs são imutáveis (write-only para a aplicação,
                read-only para auditoria) e retidos por 12 meses. Disponíveis
                para download no painel a qualquer momento.
              </p>

              <h2>Desenvolvimento seguro</h2>
              <ul>
                <li>Revisão de código obrigatória (2 aprovadores) antes de qualquer merge em produção</li>
                <li>Análise estática automatizada (SAST) no pipeline de CI</li>
                <li>Varredura de dependências contra CVEs conhecidos</li>
                <li>Testes de penetração anuais por empresa externa</li>
                <li>Programa de divulgação responsável de vulnerabilidades (veja contato abaixo)</li>
              </ul>

              <h2>Resposta a incidentes</h2>
              <p>
                Nosso processo de resposta segue a norma ISO 27035: detecção,
                contenção, erradicação, recuperação e análise pós-incidente.
                Comprometemos notificar todos os clientes afetados em até{" "}
                <strong>72 horas</strong> da detecção, conforme exigido pela
                LGPD (art. 48).
              </p>

              <h2>Disponibilidade</h2>
              <ul>
                <li><strong>Plano Essencial:</strong> 99,5% de uptime</li>
                <li><strong>Plano Clínica:</strong> 99,8% de uptime</li>
                <li><strong>Plano Rede:</strong> 99,9% de uptime com SLA contratado</li>
              </ul>
              <p>
                Status em tempo real:{" "}
                <a href="https://status.vela.com.br">status.vela.com.br</a>{" "}
                (página pública, sem cadastro).
              </p>

              <h2>Certificações em andamento</h2>
              <p>
                Trabalhando para conquistar SOC 2 Type II em 2026 e ISO 27001
                em 2027. Os controles equivalentes já estão implementados — as
                certificações formais virão.
              </p>

              <div className="doc-page__contact">
                <strong>Divulgação responsável de vulnerabilidades:</strong>{" "}
                <a href="mailto:security@vela.com.br">security@vela.com.br</a><br />
                PGP key disponível mediante solicitação.
              </div>
            </div>
          </div>
        </section>
      </main>
      <VelaFooter />
    </>
  );
}
