import { css, html, LitElement } from "lit"
import { customElement } from "lit/decorators.js"

@customElement("se-header")
export class Header extends LitElement {
  static styles = css``;

  protected render() {
    return html`Header works!`;
  }
}
