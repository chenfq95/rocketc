import { css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';

/**
 * Layout divider with optional inset spacing (companion to `rc-separator`).
 *
 * @element rc-divider
 */
export class RcDivider extends RcStyledElement {
  static override styles = [
    css`
      :host {
        display: block;
      }
      
      :host([orientation='vertical']) {
        display: inline-flex;
        align-self: stretch;
        height: auto;
        min-height: var(--rc-space-4);
      }
      
      .root {
        display: flex;
        align-items: center;
        gap: var(--rc-space-3);
        width: 100%;
        color: var(--rc-color-text-muted);
        font-size: var(--rc-typography-caption-font-size);
      }
      
      :host([inset]) .root {
        margin-inline: var(--rc-space-4);
        width: auto;
      }
      
      .line {
        flex: 1;
        height: var(--rc-border-sm);
        background: var(--rc-color-border-subtle);
      }
      
      :host([orientation='vertical']) .root {
        flex-direction: column;
        width: auto;
        height: 100%;
      }
      
      :host([orientation='vertical']) .line {
        width: var(--rc-border-sm);
        height: auto;
        flex: 1;
      }
      
      .label:empty {
        display: none;
      }
    `,
  ];

  @property({ type: String, reflect: true })
  accessor orientation: 'horizontal' | 'vertical' = 'horizontal';

  @property({ type: Boolean, reflect: true })
  accessor inset: boolean = false;

  @property({ type: String, reflect: true })
  accessor label: string = '';

  override render() {
    return html`
      <div class="root" part="container root"
        role="separator"
        aria-orientation=${this.orientation}
      >
        <span class="line" part="line"></span>
        <span class="label" part="label">${this.label}<slot></slot></span>
        <span class="line" part="line"></span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-divider': RcDivider;
  }
}
