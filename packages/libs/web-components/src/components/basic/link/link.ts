import { LitElement, css, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';

import { mixinDelegatesAria, type ARIAMixinStrict } from '../../../internal/mixin-delegates-aria';

export type RcLinkVariant = 'default' | 'muted' | 'underline';

const linkBase = mixinDelegatesAria(RcStyledElement);

/**
 * Text link backed by native `<a>`.
 *
 * @element rc-link
 * @slot - Link label / content
 */
export class RcLink extends linkBase {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  static override styles = [
    css`
      :host {
        display: inline;
      }
      
      a {
        color: var(--rc-color-control-primary-fg, var(--rc-color-brand-fg));
        font: inherit;
        text-decoration: none;
        text-underline-offset: 0.15em;
        cursor: pointer;
      }
      
      a:hover {
        text-decoration: underline;
      }
      
      a:focus-visible {
        outline: none;
        border-radius: var(--rc-radius-sm);
        box-shadow:
          0 0 0 2px var(--rc-color-surface-panel),
          0 0 0 4px var(--rc-color-border-focus);
      }
      
      :host([variant='muted']) a {
        color: var(--rc-color-text-secondary);
      }
      
      :host([variant='underline']) a {
        text-decoration: underline;
      }
      
      :host([disabled]) a {
        color: var(--rc-color-action-fg-disabled);
        cursor: not-allowed;
        pointer-events: none;
        text-decoration: none;
        opacity: var(--rc-opacity-disabled);
      }
    `,
  ];

  @property({ type: String, reflect: true })
  accessor href: string = '';

  @property({ type: String, reflect: true })
  accessor target: string = '';

  @property({ type: String, reflect: true })
  accessor rel: string = '';

  @property({ type: String, reflect: true })
  accessor download: string = '';

  @property({ type: String, reflect: true })
  accessor type: string = '';

  @property({ type: String, reflect: true })
  accessor hreflang: string = '';

  @property({ type: String, reflect: true })
  accessor ping: string = '';

  @property({ type: String, reflect: true })
  accessor referrerpolicy: string = '';

  @property({ type: String, reflect: true })
  accessor variant: RcLinkVariant = 'default';

  @property({ type: Boolean, reflect: true })
  accessor disabled: boolean = false;

  override render() {
    const { ariaLabel, ariaCurrent, ariaDisabled, role } = this as ARIAMixinStrict;
    const rel = this.rel || (this.target === '_blank' ? 'noopener noreferrer' : '');

    return html`
      <a part="control"
        aria-current=${ariaCurrent || nothing}
        aria-disabled=${this.disabled ? 'true' : ariaDisabled || nothing}
        aria-label=${ariaLabel || nothing}
        download=${this.download || nothing}
        href=${this.disabled ? nothing : this.href || nothing}
        hreflang=${this.hreflang || nothing}
        ping=${this.ping || nothing}
        referrerpolicy=${this.referrerpolicy || nothing}
        rel=${rel || nothing}
        role=${role || nothing}
        tabindex=${this.disabled ? -1 : nothing}
        target=${this.target || nothing}
        type=${this.type || nothing}
      >
        <slot></slot>
      </a>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-link': RcLink;
  }
}
