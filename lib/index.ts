import { SeButton } from "./components/SeButton.js";
import { SeFooter } from "./components/Footer.js";
import { SeNav } from "./components/Nav.js";
import { Carousel } from "./components/Carousel.js";
import { Header } from "./components/Header.js";
export { SeButton, SeFooter, SeNav, Carousel, Header };

// https://lit.dev/docs/components/defining/#typescript-typings
declare global {
  interface HTMLElementTagNameMap {
    "se-button": SeButton;
    "se-footer": SeFooter;
    "se-nav": SeNav;
    "se-carousel": Carousel;
    "se-header": Header;
  }
}
