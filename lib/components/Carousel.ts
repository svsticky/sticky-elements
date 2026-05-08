import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

export type Slide = { link: string, title: string, alt: string };

function mod(n: number, m: number) {
  return n < 0 ? m + n : n % m;
}

@customElement("se-carousel")
export class Carousel extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    ul {
      width: 100%;
      height: 100%;
      list-style-type: none;
      position: relative;
      margin: 0;
      padding: 0;
      overflow: hidden;
    }

    li {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      transition: transform 1s ease-in-out;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: brightness(75%);
    }

    p {
      bottom: 1rem;
      right: 1rem;
      position: absolute;
      color: white;
      margin: 0;
    }

    .current {
      display: block;
      transform: translateX(0);
    }
    .left { transform: translateX(-100%); }
    .right { transform: translateX(100%); }
    .no-transition { display: none; }
  `;

  @property({ type: Array })
  public slides: Slide[] = [];

  @property({ type: Number })
  public interval = 5000;

  @state()
  private current_slide: number = 0;

  private interval_id?: number;

  public override connectedCallback() {
    super.connectedCallback();

    setInterval(() => {
      this.current_slide = (this.current_slide + 1) % this.slides.length;
    }, this.interval);
  }

  public override disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this.interval_id);
  }

  protected render() {
    const is_left = (index: number) => (!(this.current_slide === this.slides.length - 1 && index === 0) && (index < this.current_slide)) || (index === this.slides.length - 1 && this.current_slide === 0);
    const is_current = (index: number) => index === this.current_slide;

    return html`
      <ul>${this.slides.map((slide, index) => html`
        <li class=${classMap({
          'left': is_left(index),
          'right': !is_left(index) && !is_current(index),
          'current': is_current(index),
          'no-transition': !(index === this.current_slide || index === mod(this.current_slide - 1, this.slides.length) || index === mod(this.current_slide + 1, this.slides.length))
        })}>
          <img src=${slide.link} alt=${slide.alt} />
          <p>${slide.title}</p>
        </li>
      `)}</ul>
    `;
  }
}
