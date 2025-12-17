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

    ::slotted(*) {
      margin-left: 10px;
      height: 35px;
    }
  `;

  @property({ type: String})
  buttonType: ButtonType = 'primary';

  @property({ attribute: false })
  onClick: (() => void) | null = null;

  @property({ type: String })
  text = "Hello World";

  private handleClick() {
    // Only executes this function if onClick exists.
    if (this.onClick) {
      this.onClick();
    }
  }

  render() {
    const classes = { 
      primary: this.buttonType === 'primary', 
      secondary: this.buttonType === 'secondary' 
    };
    
    return html`
      <button @click=${() => this.handleClick()} class=${classMap(classes)}>
        ${this.text}
        <slot class="slot" name="icon"></slot>
      </button>`;
  }
}
