import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("se-button")
export class SeButton extends LitElement {
  static styles = css`
    button {
      background-color: var(--board-primary, "#000");
      font-weight: 600;
      color: white;
      padding: 10px 20px;
      border-radius: 10px;
      height: 50px;
      cursor: pointer;
      border: none;
      transition: 0.3s;
    }

    button:hover {
      background-color: var(--board-dark, "#000");
    }
  `;

  @property({ type: Boolean })
  clicked = false;

  @property({ type: String })
  text = "Hello World";

  render() {
    return html`<button>${this.text}</button>`;
  }
}
