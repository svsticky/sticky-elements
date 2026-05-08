import { SeButton } from "./components/SeButton.js";
import { SeFooter } from "./components/Footer.js";
export { SeButton, SeFooter };

// https://lit.dev/docs/components/defining/#typescript-typings
declare global {
  interface HTMLElementTagNameMap {
    "se-button": SeButton;
    "se-footer": SeFooter;
  }
}
