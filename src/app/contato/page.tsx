import { VelaNav } from "@/components/VelaNav";
import { VelaFooter } from "@/components/VelaFooter";
import Link from "next/link";
import "../home.css";

export const metadata = {
  title: "Contato — Vela",
  description:
    "Como falar com a Vela: comercial, suporte técnico, imprensa, segurança, jurídico.",
};

export default function ContatoPage() {
  return (
    <>
      <VelaNav />
      <main>
        <section className="doc-page">
          <div className="container">
            <span className="eyebrow">Contato</span>
            <h1 className="page-hero__title">
              Fala com <span className="italic-accent">gente</span> de verdade.
            </h1>
            <p className="doc-page__lede">
              Sem chatbot na primeira linha. Sem fila de espera. Cada canal
              abaixo cai num humano do time Vela em horário comercial.
            </p>

            <div className="doc-page__body">
              <h2>Comercial</h2>
              <p>
                Pra contratar plano, tirar dúvidas sobre funcionalidade ou
                pedir uma demonstração ao vivo.
              </p>
              <p>
                <strong>WhatsApp:</strong> +55 11 99999-0000<br />
                <strong>E-mail:</strong>{" "}
                <a href="mailto:vendas@vela.com.br">vendas@vela.com.br</a><br />
                <strong>Formulário:</strong>{" "}
                <Link href="/contratar">/contratar</Link>
              </p>

              <h2>Suporte técnico</h2>
              <p>
                Pra problemas na plataforma, dúvidas de uso, configuração.
              </p>
              <p>
                <strong>E-mail:</strong>{" "}
                <a href="mailto:suporte@vela.com.br">suporte@vela.com.br</a><br />
                <strong>Tempo de resposta:</strong> 4h úteis (plano Clínica) ·
                imediato (plano Rede)<br />
                <strong>Status da plataforma:</strong>{" "}
                <a href="https://status.vela.com.br">status.vela.com.br</a>
              </p>

              <h2>Encarregado de dados (DPO)</h2>
              <p>
                Pra exercer direitos LGPD, pedir exportação de dados, fazer
                denúncia ou esclarecer dúvida de privacidade.
              </p>
              <p>
                <strong>E-mail:</strong>{" "}
                <a href="mailto:privacidade@vela.com.br">privacidade@vela.com.br</a><br />
                <strong>Resposta:</strong> em até 5 dias úteis
              </p>

              <h2>Segurança</h2>
              <p>
                Pra reportar vulnerabilidade ou suspeita de incidente.
              </p>
              <p>
                <strong>E-mail:</strong>{" "}
                <a href="mailto:security@vela.com.br">security@vela.com.br</a><br />
                <strong>PGP key:</strong> disponível mediante solicitação
              </p>

              <h2>Imprensa</h2>
              <p>
                Material institucional, entrevistas, parceria de conteúdo.
              </p>
              <p>
                <strong>E-mail:</strong>{" "}
                <a href="mailto:imprensa@vela.com.br">imprensa@vela.com.br</a><br />
                <strong>Press kit:</strong> <Link href="/imprensa">/imprensa</Link>
              </p>

              <h2>Jurídico</h2>
              <p>
                Dúvidas contratuais, ordem judicial, notificação extrajudicial.
              </p>
              <p>
                <strong>E-mail:</strong>{" "}
                <a href="mailto:juridico@vela.com.br">juridico@vela.com.br</a>
              </p>

              <h2>Endereço</h2>
              <p>
                Vela Software Ltda.<br />
                São Paulo · SP · Brasil<br />
                CNPJ a ser informado
              </p>

              <div className="doc-page__contact">
                Atendimento: segunda a sexta, 9h às 18h (BRT). Fora desse
                horário, registramos sua mensagem e respondemos no próximo
                dia útil.
              </div>
            </div>
          </div>
        </section>
      </main>
      <VelaFooter />
    </>
  );
}
