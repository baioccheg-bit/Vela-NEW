import { VelaNav } from "@/components/VelaNav";
import { VelaFooter } from "@/components/VelaFooter";
import "../home.css";

export const metadata = {
  title: "Imprensa — Vela",
  description:
    "Material institucional, fatos rápidos sobre a Vela, contato para jornalistas e parcerias de conteúdo.",
};

export default function ImprensaPage() {
  return (
    <>
      <VelaNav />
      <main>
        <section className="doc-page">
          <div className="container">
            <span className="eyebrow">Imprensa</span>
            <h1 className="page-hero__title">
              Material e <span className="italic-accent">contato</span> pra imprensa.
            </h1>
            <p className="doc-page__lede">
              Cobertura sobre Vela, entrevistas com fundadores, parceria de
              conteúdo. Use os recursos abaixo livremente — pedimos só que
              cite a fonte.
            </p>

            <div className="doc-page__body">
              <h2>Fatos rápidos</h2>
              <ul>
                <li><strong>Nome:</strong> Vela Software Ltda.</li>
                <li><strong>Categoria:</strong> SaaS de gestão para clínicas brasileiras com agentes de IA embutidos</li>
                <li><strong>Fundação:</strong> 2024</li>
                <li><strong>Sede:</strong> São Paulo, Brasil</li>
                <li><strong>Hospedagem:</strong> AWS São Paulo (sa-east-1)</li>
                <li><strong>Conformidade:</strong> LGPD (Lei 13.709/2018)</li>
                <li><strong>Clientes:</strong> Clínicas de estética, dermatologia, odontologia, fisioterapia, psicologia</li>
                <li><strong>Agentes:</strong> Júlia (agenda/WhatsApp), Sofia (cobrança), Max (atendimento), Atlas (análise)</li>
              </ul>

              <h2>Posicionamento</h2>
              <p>
                Vela existe pra absorver a rotina operacional de clínicas
                brasileiras e devolver tempo pra quem atende pessoa. A
                plataforma cobre agenda, cobrança, prontuário, WhatsApp
                Business e múltiplas unidades — com agentes de IA executando
                o trabalho repetitivo que consome o dia da equipe.
              </p>

              <h2>Recursos visuais</h2>
              <ul>
                <li>Logo principal (Vela em Geist 600 sobre teal #1A6B73) — <a href="/vela-logo.png">vela-logo.png</a></li>
                <li>Screenshots da plataforma e do site de venda — mediante solicitação</li>
                <li>Headshots de fundadores e fotos institucionais — mediante solicitação</li>
              </ul>

              <h2>Tópicos sobre os quais falamos</h2>
              <ul>
                <li>Aplicação prática de IA em gestão de clínicas</li>
                <li>LGPD e dados de saúde no contexto SaaS</li>
                <li>Mercado de saúde privada brasileiro e automação</li>
                <li>Design de produto pra usuários não-técnicos</li>
                <li>Estado da arte de agentes conversacionais em pt-BR</li>
              </ul>

              <h2>Não falamos sobre</h2>
              <p>
                Faturamento detalhado de clientes, dados clínicos de
                pacientes, comparações nominais com concorrentes específicos,
                projeções financeiras não auditadas.
              </p>

              <div className="doc-page__contact">
                <strong>Contato para imprensa:</strong>{" "}
                <a href="mailto:imprensa@vela.com.br">imprensa@vela.com.br</a><br />
                Respondemos em até 24h. Para deadlines apertados, marque{" "}
                <em>urgente</em> no assunto.
              </div>
            </div>
          </div>
        </section>
      </main>
      <VelaFooter />
    </>
  );
}
