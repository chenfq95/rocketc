import { css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';

/**
 * Visual divider (`<hr>` / separator).
 *
 * @element rc-separator
 */
export class RcSeparator extends RcStyledElement {
  static override styles = [
    css`
      :host {
        display: block;
      }
      
      :host([orientation='vertical']) {
        display: inline-block;
        height: 100%;
        min-height: var(--rc-space-4);
      }
      
      hr {
        margin: 0;
        border: 0;
        background: var(--rc-color-border-subtle);
      }
      
      :host(:not([orientation='vertical'])) hr {
        width: 100%;
        height: var(--rc-border-sm);
      }
      
      :host([orientation='vertical']) hr {
        width: var(--rc-border-sm);
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
        part="control separator"
        role=${this.decorative ? 'none' : 'separator'}
        aria-orientation=${this.orientation}
      />
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-separator': RcSeparator;
  }
}
