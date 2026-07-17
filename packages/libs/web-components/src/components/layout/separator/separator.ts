import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { hostStyles } from '../../../internal/shared-styles';

/**
 * Visual divider (`<hr>` / separator).
 *
 * @element rds-separator
 */
export class RdsSeparator extends LitElement {
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
      }
      
      :host([orientation='vertical']) {
        display: inline-block;
        height: 100%;
        min-height: var(--rds-space-4);
      }
      
      hr {
        margin: 0;
        border: 0;
        background: var(--rds-color-border-subtle);
      }
      
      :host(:not([orientation='vertical'])) hr {
        width: 100%;
        height: var(--rds-border-sm);
      }
      
      :host([orientation='vertical']) hr {
        width: var(--rds-border-sm);
        height: 100%;
        min-height: inherit;
      }
    `,
  ];

  @property({ type: String, reflect: true })
  accessor orientation: 'horizontal' | 'vertical' = 'horizontal';

  @property({ type: Boolean, reflect: true })
  accessor decorative: boolean = true;

  override render() {
    return html`
      <hr
        role=${this.decorative ? 'none' : 'separator'}
        aria-orientation=${this.orientation}
      />
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rds-separator': RdsSeparator;
  }
}
