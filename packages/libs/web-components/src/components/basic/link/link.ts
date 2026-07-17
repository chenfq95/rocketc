import { LitElement, css, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';

import { mixinDelegatesAria, type ARIAMixinStrict } from '../../../internal/delegate-aria';
import { hostStyles } from '../../../internal/shared-styles';

export type RdsLinkVariant = 'default' | 'muted' | 'underline';

const linkBase = mixinDelegatesAria(LitElement);

/**
 * Text link backed by native `<a>`.
 *
 * @element rds-link
 * @slot - Link label / content
 */
export class RdsLink extends linkBase {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  static override styles = [
    hostStyles,
    css`
      :host {
        display: inline;
      }
      
      a {
        color: var(--rds-color-control-primary-fg, var(--rds-color-brand-fg));
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
        border-radius: var(--rds-radius-sm);
        box-shadow:
          0 0 0 2px var(--rds-color-surface-panel),
          0 0 0 4px var(--rds-color-border-focus);
      }
      
      :host([variant='muted']) a {
        color: var(--rds-color-text-secondary);
      }
      
      :host([variant='underline']) a {
        text-decoration: underline;
      }
      
      :host([disabled]) a {
        color: var(--rds-color-action-fg-disabled);
        cursor: not-allowed;
        pointer-events: none;
        text-decoration: none;
        opacity: var(--rds-opacity-disabled);
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
  accessor variant: RdsLinkVariant = 'default';

  @property({ type: Boolean, reflect: true })
  accessor disabled: boolean = false;

  override render() {
    const { ariaLabel, ariaCurrent, ariaDisabled, role } = this as ARIAMixinStrict;
    const rel = this.rel || (this.target === '_blank' ? 'noopener noreferrer' : '');

    return html`
      <a
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
    'rds-link': RdsLink;
  }
}
