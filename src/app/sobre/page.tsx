import { VelaNav } from "@/components/VelaNav";
import { VelaFooter } from "@/components/VelaFooter";
import Link from "next/link";
import "../home.css";

export const metadata = {
  title: "Sobre — Vela",
  description:
    "Por que a Vela existe, pra quem trabalhamos, como pensamos software para clínicas brasileiras.",
};

export default function SobrePage() {
  return (
    <>
      <VelaNav />
      <main>
        <section className="doc-page">
          <div className="container">
            <span className="eyebrow">Sobre</span>
            <h1 className="page-hero__title">
              Software que devolve <span className="italic-accent">tempo</span> a quem cuida.
            </h1>
            <p className="doc-page__lede">
              Vela existe porque clínica boa não precisa virar planilha. A
              equipe que escolheu cuidar de gente não devia estar lembrando
              paciente da consulta, perseguindo pagamento atrasado, ou
              copiando dado de uma aba pra outra.
            </p>

            <div className="doc-page__body">
              <h2>Por que existimos</h2>
              <p>
                Em 2024 visitamos 40 clínicas brasileiras pra entender o que
                consumia o tempo da equipe. A resposta foi sempre a mesma:{" "}
                <em>rotina</em>. Confirmar consulta. Cobrar paciente. Responder
                a mesma pergunta no WhatsApp. Conferir se o caixa fecha. A
                equipe que escolheu cuidar de gente passa boa parte do dia
                cuidando de processo.
              </p>
              <p>
                A Vela foi desenhada pra absorver essa rotina e devolver as
                horas pra quem importa: o profissional, o paciente, o resultado
                do atendimento.
              </p>

              <h2>O que acreditamos</h2>
              <ul>
                <li>
                  <strong>Software bom é invisível.</strong> A clínica deveria
                  esquecer que a Vela está lá. Quando lembra, é porque deu certo.
                </li>
                <li>
                  <strong>IA serve à pessoa, não substitui ela.</strong> Júlia,
                  Sofia, Max e Atlas são empregadas, não chefes. Quando o
                  assunto exige humano, eles puxam você pra conversa.
                </li>
                <li>
                  <strong>Dado de saúde é sagrado.</strong> Não vendemos, não
                  cruzamos, não treinamos modelo público com base na sua
                  clínica.
                </li>
                <li>
                  <strong>Preço justo, sem letra miúda.</strong> Sem fidelidade.
                  Sem markup escondido. Sem upsell empurrado.
                </li>
              </ul>

              <h2>Pra quem trabalhamos</h2>
              <p>
                Clínicas de estética, dermatologia, odontologia, fisioterapia,
                psicologia, e qualquer operação ambulatorial brasileira que
                queira parar de operar via planilha + WhatsApp pessoal +
                cadernos. De 1 profissional a 50 — se rola agenda + cobrança
                + paciente, a Vela serve.
              </p>

              <h2>Onde estamos</h2>
              <p>
                Time pequeno em São Paulo. Infraestrutura toda no Brasil
                (AWS sa-east-1). Suporte por gente real, em português, no
                horário comercial.
              </p>

              <div className="doc-page__contact">
                Quer conversar?{" "}
                <Link href="/contato">Veja como falar com a gente →</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <VelaFooter />
    </>
  );
}
