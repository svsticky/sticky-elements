import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";

type NavLink = { title: string, to: string, type?: "button" };
// Not recursive, since the SeNav element only supports menus one layer deep.
type Menu = { title: string, submenu: { title: string, to: string }[] };
type NavItem = NavLink | Menu;

function is_nav_link(item: NavItem): item is NavLink {
  return "to" in item;
}

@customElement("se-nav")
export class SeNav extends LitElement {
  static styles = css`
    :host { width: 100%; }

    nav {
      height: 4rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 0.5rem 1.5rem;
    }

    .logo {
      height: 100%;
    }

    .bars {
      color: white;
      font-size: 2rem;
      margin: auto 0;
      cursor: pointer;
    }

    .icon { margin-left: 0.25rem; }

    ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
    }

    @media (width < 54rem) {
      .nav-items {
        display: flex;
        position: absolute;
        top: 5rem;
        left: 0;
        height: calc(100vh - 9rem);
        overflow-y: auto;
        width: calc(100vw - 3rem);
        background: var(--board-colour);
        z-index: 10;
        flex-direction: column;
        gap: 1rem;
        padding: 2rem 1.5rem;
      }

      .nav-hidden { display: none!important; }

      .se-menu-item {
        font-size: 2rem;
        color: white;
      }

      .submenu {
        position: relative;
        display: none;
        flex-direction: column;
        gap: 1.5rem;
        padding: 1.5rem 0 1.5rem 2rem;
      }

      .submenu::before {
        content: "";
        height: 90%;
        width: 4px;
        background: white;
        border-radius: 2px;
        position: absolute;
        left: .5rem;
        top: 5%;
      }
    }

    .se-menu-item a {
      color: inherit;
      text-decoration: none;
    }
    .se-menu-item a:hover {
      text-decoration: underline;
    }

    .se-menu-opener {
      cursor: pointer;
      -webkit-user-select: none;
      user-select: none;
    }


    .opened-menu {
      display: flex!important;
    }

    .submenu-item:hover {
      text-decoration: underline;
    }
    .submenu-item:last-of-type {
      border: none;
    }

    @media (width >= 54rem) {
      .bars { display: none; }

      .nav-items {
        display: flex;
        flex-direction: row;
        gap: 2rem;
        height: 100%;
        padding: 0;
        margin: 0;
      }

      .nav-hidden { display: flex!important; }

      .se-menu-item {
        color: white;
        margin: auto 0;
        position: relative;
        font-size: 1rem;
      }

      .se-menu-button {
        background: white;
        border-radius: 0.5rem;
        padding: 0.5rem 1rem;
        color: var(--board-colour, black)!important;
      }
      .se-menu-button:hover {
        background: #f1f1f1;
      }

      .se-menu-item:not(*:has(.se-menu-button)) a:hover {
        text-decoration: underline;
      }

      .icon { font-size: 0.875rem; }

      .submenu {
        display: none;
        position: absolute;
        top: 1.5rem;
        left: 50%;
        transform: translateX(-50%);
        flex-direction: column;
        background: white;
        border: 1px solid #999;
        border-radius: 0.25rem;
        text-align: center;
        z-index: 10;
        padding: 0 1rem;
        color: black;
      }

      .submenu-item {
        padding: 0.5rem 0;
        border-bottom: 1px solid #999;
      }
    }
  `;

  @property({ type: Array })
  menus: NavItem[] = [];

  @state()
  private opened_menu = -1;

  @state()
  private mobile_opened = false;

  private handle_click = (e: Event) => {
    if (this.opened_menu !== -1) {
      const target = e.target as HTMLElement;
      if (target === this)
        return;

      const current_item = this.renderRoot.querySelector(`li[data-nav-index="${this.opened_menu}"]`)!;
      if (!current_item.contains(target))
        this.opened_menu = -1;
    }
  }

  public override connectedCallback() {
    super.connectedCallback();
    document.addEventListener("click", this.handle_click);
    this.renderRoot.addEventListener("click", this.handle_click);
  }

  public override disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("click", this.handle_click);
    this.renderRoot.removeEventListener("click", this.handle_click);
  }

  private render_menu_item(item: NavItem, index: number) {
    if (is_nav_link(item)) {
      return html`
        <li class="se-menu-item">
          <a href=${item.to} class=${item.type === "button" ? "se-menu-button" : ""}>
            ${item.title}
            ${item.to.startsWith("http")
              ? html`<i class="icon fa-solid fa-arrow-up-right-from-square"></i>`
              : ""}
          </a>
        </li>
      `;
    } else {
      return html`
        <li data-nav-index=${index} class="se-menu-item">
          <a @click=${() => this.opened_menu = this.opened_menu === index ? -1 : index} class="se-menu-item se-menu-opener">
            ${item.title}
            <i class=${classMap({ 'icon fa-solid': true, 'fa-caret-down': this.opened_menu !== index, 'fa-caret-up': this.opened_menu === index })}></i>
          </a>
          <ul class=${classMap({ 'submenu': true, 'opened-menu': this.opened_menu === index })}>
            ${item.submenu.map(sub_item => html`
              <li class="submenu-item">
                <a href=${sub_item.to} class="submenu-item-link">
                  ${sub_item.title}
                  ${sub_item.to.startsWith("http")
                    ? html`<i class="icon fa-solid fa-arrow-up-right-from-square"></i>`
                    : ""}
                </a>
              </li>
            `)}
          </ul>
        </li>
      `;
    }
  }

  render() {
    return html`
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      <nav>
        <img
          src="https://public.svsticky.nl/logos/logo_compact_outline_wit.svg"
          alt="SV Sticky's logo"
          class="logo"
        />
        <i @click=${() => this.mobile_opened = !this.mobile_opened} class="bars fa-solid fa-bars"></i>
        <ul class=${classMap({ 'nav-items': true, 'nav-hidden': !this.mobile_opened })}>${this.menus.map(this.render_menu_item.bind(this))}</ul>
      </nav>
    `;
  }
}
