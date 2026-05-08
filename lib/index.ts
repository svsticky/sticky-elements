import { SeButton } from "./components/SeButton.js";
import { SeFooter } from "./components/Footer.js";
import { SeNav } from "./components/Nav.js";
export { SeButton, SeFooter, SeNav };

// https://lit.dev/docs/components/defining/#typescript-typings
declare global {
  interface HTMLElementTagNameMap {
    "se-button": SeButton;
    "se-footer": SeFooter;
    "se-nav": SeNav;
  }
}
