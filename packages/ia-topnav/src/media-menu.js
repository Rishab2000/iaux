import { LitElement, html } from 'lit-element';

import './media-button';
import mediaMenuCSS from './styles/media-menu';

const menuSelection = [
  {
    icon: 'web',
    menu: 'web',
    href: '/web/',
    label: 'Wayback Machine',
  },
  {
    icon: 'texts',
    menu: 'texts',
    href: '/details/texts',
    label: 'Books',
  },
  {
    icon: 'video',
    menu: 'video',
    href: '/details/movies',
    label: 'Video',
  },
  {
    icon: 'audio',
    menu: 'audio',
    href: '/details/audio',
    label: 'Audio',
  },
  {
    icon: 'software',
    menu: 'software',
    href: '/details/sofware',
    label: 'Software',
  },
  {
    icon: 'images',
    menu: 'images',
    href: '/details/image',
    label: 'Images',
  },
  {
    icon: 'donate',
    menu: 'donate',
    href: '/donate/',
    label: 'Donate',
  },
  {
    icon: 'ellipses',
    menu: 'more',
    href: '/about/',
    label: 'More',
    followable: true,
  },
];

class MediaMenu extends LitElement {
  static get styles() {
    return mediaMenuCSS;
  }

  static get properties() {
    return {
      config: { type: Object },
      mediaMenuAnimate: { type: Boolean },
      mediaMenuOpen: { type: Boolean },
      selectedMenuOption: { type: String },
    };
  }

  constructor() {
    super();
    this.config = {};
    this.mediaMenuAnimate = false;
    this.mediaMenuOpen = false;
    this.selectedMenuOption = '';
  }

  get mediaMenuOptionsTemplate() {
    const buttons = menuSelection.map(({
      icon,
      menu,
      label,
      href,
      followable,
    }) => {
      const selected = this.selectedMenuOption === menu;
      return html`
        <media-button
          .config=${this.config}
          .icon=${icon}
          .href=${href}
          .followable=${followable}
          .label=${label}
          mediatype=${menu}
          .selected=${selected}
        ></media-button>
      `;
    });
    return buttons;
  }

  render() {
    let mediaMenuClass = 'initial';
    if (this.mediaMenuOpen) {
      mediaMenuClass = 'open';
    }
    if (!this.mediaMenuOpen && this.mediaMenuAnimate) {
      mediaMenuClass = 'closed';
    }

    return html`
      <nav
        class="media-menu tx-slide ${mediaMenuClass}"
        aria-hidden="${!this.mediaMenuOpen}"
        aria-expanded="${this.mediaMenuOpen}"
      >
        <div class="menu-group">
          ${this.mediaMenuOptionsTemplate}
        </div>
      </nav>
    `;
  }
}

customElements.define('media-menu', MediaMenu);
