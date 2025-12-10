import './styles/styles.scss';
import { SeButton } from "./components/SeButton.js";
export { SeButton };


// https://lit.dev/docs/components/defining/#typescript-typings
declare global {
  interface HTMLElementTagNameMap {
    "se-button": SeButton;
  }
}
