import Link from "next/link";

/** Shared teal footer for all Vela-designed pages.
 *  Wordmark "Vela" in big white type at bottom-left, links in 4 columns. */
export function VelaFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer__statement">
          Software que devolve o <em>tempo</em> à sua clínica.
        </p>

        <div className="footer__row">
          <div className="footer__col">
            <h5>Produto</h5>
            <ul>
              <li><Link href="/plataforma">Plataforma</Link></li>
              <li><Link href="/agentes">Agentes</Link></li>
              <li><Link href="/#pricing">Preços</Link></li>
              <li><Link href="/demo">Demonstração</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
            </ul>
          </div>
          <div className="footer__col">
            <h5>Empresa</h5>
            <ul>
              <li><Link href="/sobre">Sobre</Link></li>
              <li><Link href="/contato">Contato</Link></li>
              <li><Link href="/carreiras">Carreiras</Link></li>
              <li><Link href="/imprensa">Imprensa</Link></li>
            </ul>
          </div>
          <div className="footer__col">
            <h5>Legal</h5>
            <ul>
              <li><Link href="/privacidade">Privacidade</Link></li>
              <li><Link href="/termos">Termos</Link></li>
              <li><Link href="/lgpd">LGPD</Link></li>
              <li><Link href="/seguranca">Segurança</Link></li>
            </ul>
          </div>
          <div className="footer__col">
            <h5>Conta</h5>
            <ul>
              <li><Link href="/entrar">Entrar</Link></li>
              <li><Link href="/contratar">Contratar plano</Link></li>
              <li><Link href="/demo">Pré-visualização</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer__legal">
          <span className="wordmark">Vela</span>
          <span>{year} © Vela · Hospedado em São Paulo · LGPD compliant</span>
        </div>
      </div>
    </footer>
  );
}
