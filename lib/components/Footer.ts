import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("se-footer")
export class SeFooter extends LitElement {
  static styles = css`
    footer {
      background-color: #404040;
      width: calc(100% - 4rem);
      margin-top: 3rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
    }

    footer img {
      height: 4rem;
    }

    footer .footer-icons {
      display: flex;
      gap: 2rem;

    footer .footer-icons a {
      color: white;
      font-size: 2rem;
      transition: opacity 0.3s;
    }

    footer .footer-icons a:hover {
      opacity: 0.7;
    }
  `;

  render() {
    return html`
      <footer>
        <img
          src="https://public.svsticky.nl/logos/hoofd_outline_wit.svg"
          alt="Sticky Logo"
        />

        <div class="footer-icons">
          <a
            href="https://svsticky.nl/instagram"
            target="_blank"
            aria-label="Instagram"
          >
            <i class="fa-brands fa-instagram"></i>
          </a>
          <a
            href="https://svsticky.nl/linkedin"
            target="_blank"
            aria-label="LinkedIn"
          >
            <i class="fa-brands fa-linkedin"></i>
          </a>
          <a
            href="https://svsticky.nl/github"
            target="_blank"
            aria-label="GitHub"
          >
            <i class="fa-brands fa-github"></i>
          </a>
        </div>
      </footer>
    `;
  }
}
