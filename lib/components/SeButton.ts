import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import {classMap} from 'lit/directives/class-map.js';

type ButtonType = 'primary' | 'secondary'

@customElement("se-button")
export class SeButton extends LitElement {
  static styles = css`
    button {
      display: flex;
      flex-direction: row;
      align-items: center;
      box-sizing: border-box;
      height: 50px;
      padding: 10px 20px;
      font-weight: bold;
      font-size: 20px;
      border-radius: var(--border-radius);
      border: none;
      cursor: pointer;
      transition: 0.3s;
    }

    .primary {
      background-color: var(--button-primary-bg);
      color: var(--button-primary-text);
    }

    .primary:hover {
      background-color: var(--button-primary-hover);
    }

    .secondary {
      background-color: var(--button-secondary-bg);
      color: var(--button-secondary-text);
      border: var(--button-border);
    }

    .secondary:hover {
      background-color: var(--button-secondary-hover);
    }

    .icon {
      margin-left: 10px;
      height: 35px;
    }
  `;

  @property({ type: String})
  buttonType: ButtonType = 'primary';

  @property({ type: String})
  icon: string = '';

  @property({ type: Boolean })
  clicked = false;

  @property({ type: String })
  text = "Hello World";

  render() {
    const classes = { 
      primary: this.buttonType === 'primary', 
      secondary: this.buttonType === 'secondary' 
    };

    return html`
      <button class=${classMap(classes)}>
        ${this.text}
        ${this.icon && html`<img class="icon" src=${this.icon} />`}
      </button>`;
  }
}
