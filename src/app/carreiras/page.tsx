import { VelaNav } from "@/components/VelaNav";
import { VelaFooter } from "@/components/VelaFooter";
import Link from "next/link";
import "../home.css";

export const metadata = {
  title: "Carreiras — Vela",
  description:
    "Como é trabalhar na Vela. Como nos candidatamos a vagas. Quando estamos contratando.",
};

export default function CarreirasPage() {
  return (
    <>
      <VelaNav />
      <main>
        <section className="doc-page">
          <div className="container">
            <span className="eyebrow">Carreiras</span>
            <h1 className="page-hero__title">
              Time pequeno. Impacto <span className="italic-accent">grande</span>.
            </h1>
            <p className="doc-page__lede">
              A Vela é construída por pouca gente fazendo trabalho denso.
              Atendemos clínicas brasileiras que confiam em nós com seus
              dados, seu caixa e o relacionamento com o paciente. Essa
              responsabilidade molda quem chega.
            </p>

            <div className="doc-page__body">
              <h2>Como trabalhamos</h2>
              <ul>
                <li>
                  <strong>Remoto-primeiro</strong>, com encontros mensais
                  presenciais em São Paulo
                </li>
                <li>
                  <strong>Foco profundo</strong> sobre reuniões — calendário
                  protegido por padrão
                </li>
                <li>
                  <strong>Documentação como hábito</strong> — decisão escrita
                  vive mais que conversa
                </li>
                <li>
                  <strong>Ship rápido, recue rápido</strong> — feature flag,
                  rollout gradual, reverter sem ego
                </li>
                <li>
                  <strong>Atendemos clientes diretamente</strong> — engenheiro
                  vai pra suporte uma vez por mês, sem exceção
                </li>
              </ul>

              <h2>Vagas abertas</h2>
              <p>
                No momento <strong>não temos posições publicadas</strong>.
                Estamos focados em consolidar produto e operação antes da
                próxima rodada de contratação (prevista para o segundo
                semestre de 2026).
              </p>

              <h2>Quer ser avisado?</h2>
              <p>
                Mande um e-mail com seu currículo e uma linha sobre por que a
                Vela te interessa. Não respondemos com "agradecemos seu
                interesse" automático — se você escrever, alguém lê.
              </p>
              <p>
                <strong>E-mail:</strong>{" "}
                <a href="mailto:carreiras@vela.com.br">carreiras@vela.com.br</a>
              </p>

              <h2>O que valorizamos</h2>
              <ul>
                <li>
                  <strong>Curiosidade pelo problema do cliente</strong> —
                  você quer entender por que a recepcionista fica frustrada às
                  16h da terça-feira, não só implementar o ticket
                </li>
                <li>
                  <strong>Honestidade técnica</strong> — sabe dizer "não sei",
                  "tá errado", "isso vai dar dor de cabeça em 6 meses"
                </li>
                <li>
                  <strong>Capacidade de explicar simples</strong> — pra cliente,
                  pra colega, pro juniorzinho, pro próprio você daqui 1 ano
                </li>
                <li>
                  <strong>Cuidado com o invisível</strong> — segurança, LGPD,
                  acessibilidade, performance — coisas que ninguém elogia
                  quando tá certo
                </li>
              </ul>

              <div className="doc-page__contact">
                Não estamos contratando agora, mas conversas boas a gente
                sempre quer.{" "}
                <a href="mailto:carreiras@vela.com.br">carreiras@vela.com.br</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <VelaFooter />
    </>
  );
}
