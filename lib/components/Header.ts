import { css, html, LitElement } from "lit"
import { customElement, property } from "lit/decorators.js"
import { Slide } from "./Carousel.js";

@customElement("se-header")
export class Header extends LitElement {
  static styles = css`
    :host {
      position: relative;
    }

    se-carousel {
      width: 100%;
      height: 100%;
      border-radius: 1rem;
      overflow: hidden;
    }

    .header-background {
      background: var(--board-colour);
      position: absolute;
      width: 100%;
      top: 0;
      left: 0;
    }

    .background-top {
      height: 60%;
    }

    .background-bottom {
      top: 50%;
      height: 20%;
      clip-path: ellipse(70% 50%);
    }

    .hero {
      height: 90%;
      width: 80%;
      margin: auto;
      position: relative;
    }

    .hero-content {
      padding: 1rem;
      position: absolute;
      top: 0;
      left: 0;
      width: calc(100% - 2rem);
    }
  `;

  @property({ type: Array })
  public slides: Slide[] = []

  protected render() {
    return html`
      <div class="header-background background-top"></div>
      <div class="header-background background-bottom"></div>
      <div class="hero">
        <se-carousel slides=${JSON.stringify(this.slides)}></se-carousel>
        <div class="hero-content"><slot /></div>
      </div>
    `;
  }
}
