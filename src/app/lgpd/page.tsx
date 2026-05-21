import { VelaNav } from "@/components/VelaNav";
import { VelaFooter } from "@/components/VelaFooter";
import Link from "next/link";
import "../home.css";

export const metadata = {
  title: "LGPD — Vela",
  description:
    "Como a Vela aplica a Lei Geral de Proteção de Dados (Lei 13.709/2018) no dia-a-dia da operação.",
};

export default function LGPDPage() {
  return (
    <>
      <VelaNav />
      <main>
        <section className="doc-page">
          <div className="container">
            <span className="eyebrow">Legal</span>
            <h1 className="page-hero__title">
              LGPD em <span className="italic-accent">linguagem</span> simples.
            </h1>
            <p className="doc-page__lede">
              A Lei Geral de Proteção de Dados (Lei 13.709/2018) define como
              empresas brasileiras devem tratar dados pessoais. A Vela trabalha
              em conformidade desde o primeiro dia. Esta página explica o que
              isso significa na prática para sua clínica.
            </p>
            <p className="doc-page__meta">Última atualização: 21 de maio de 2026</p>

            <div className="doc-page__body">
              <h2>Quem é controlador e quem é operador</h2>
              <p>
                Sua clínica é a <strong>controladora</strong> dos dados dos
                pacientes — ou seja, decide o que coleta, como usa e por
                quanto tempo guarda. A Vela é a <strong>operadora</strong>:
                executa o tratamento sob sua orientação, dentro dos limites do
                que você configurou na plataforma.
              </p>

              <h2>O que isso significa pra sua clínica</h2>
              <ul>
                <li>
                  <strong>Você precisa de uma política de privacidade própria</strong>{" "}
                  comunicando aos pacientes como você usa os dados deles.
                  Modelo disponível mediante solicitação ao nosso DPO.
                </li>
                <li>
                  <strong>Você deve coletar consentimento</strong> quando exigido
                  (por exemplo, antes de mandar comunicação de marketing). A
                  plataforma oferece campos pra registrar o consentimento.
                </li>
                <li>
                  <strong>Você precisa atender pedidos de titulares</strong> em
                  até 15 dias (art. 19 da LGPD). A Vela facilita isso com
                  exportação de dados por paciente e exclusão automática.
                </li>
              </ul>

              <h2>O que a Vela faz por você</h2>
              <ul>
                <li>
                  <strong>Hospedagem no Brasil</strong> — AWS São Paulo (sa-east-1)
                </li>
                <li>
                  <strong>Criptografia AES-256</strong> em repouso, TLS 1.3 em trânsito
                </li>
                <li>
                  <strong>Logs de auditoria</strong> mostram quem acessou o quê e quando
                </li>
                <li>
                  <strong>Exportação a um clique</strong> em formato CSV + JSON
                </li>
                <li>
                  <strong>Exclusão definitiva</strong> em até 30 dias após cancelamento
                </li>
                <li>
                  <strong>Notificação de incidentes</strong> em até 72h, sempre
                </li>
              </ul>

              <h2>Direitos do titular (art. 18)</h2>
              <p>
                Pacientes podem solicitar à clínica:
              </p>
              <ul>
                <li>Confirmação de tratamento dos dados</li>
                <li>Acesso aos dados</li>
                <li>Correção de dados incompletos ou desatualizados</li>
                <li>Anonimização, bloqueio ou eliminação de dados</li>
                <li>Portabilidade dos dados para outro fornecedor</li>
                <li>Eliminação dos dados tratados com base em consentimento</li>
                <li>Informação sobre com quem foram compartilhados</li>
                <li>Revogação do consentimento</li>
              </ul>

              <h2>Subprocessadores</h2>
              <p>
                A Vela usa parceiros para entregar o serviço. Cada um tem
                contrato de processamento de dados (DPA) e atende padrões de
                segurança equivalentes:
              </p>
              <ul>
                <li><strong>AWS Brasil</strong> — infraestrutura (sa-east-1)</li>
                <li><strong>Stripe + Mercado Pago</strong> — processamento de pagamentos</li>
                <li><strong>Meta (WhatsApp Business)</strong> — comunicação com pacientes</li>
                <li><strong>OpenAI</strong> — modelo de linguagem dos agentes (com dados pseudonimizados)</li>
              </ul>

              <h2>Encarregado de dados (DPO)</h2>
              <p>
                Toda demanda relacionada à LGPD pode ser direcionada para o
                nosso encarregado:{" "}
                <a href="mailto:privacidade@vela.com.br">privacidade@vela.com.br</a>.
                Respondemos em até 5 dias úteis. Em caso de descontentamento,
                você também pode acionar a{" "}
                <a href="https://www.gov.br/anpd" target="_blank" rel="noopener">ANPD</a>.
              </p>

              <div className="doc-page__contact">
                Quer aprofundar?{" "}
                <Link href="/privacidade">Política de privacidade completa →</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <VelaFooter />
    </>
  );
}
