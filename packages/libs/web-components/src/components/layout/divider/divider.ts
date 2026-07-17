import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { hostStyles } from '../../../internal/shared-styles';

/**
 * Layout divider with optional inset spacing (companion to `rds-separator`).
 *
 * @element rds-divider
 */
export class RdsDivider extends LitElement {
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
      }
      
      :host([orientation='vertical']) {
        display: inline-flex;
        align-self: stretch;
        height: auto;
        min-height: var(--rds-space-4);
      }
      
      .root {
        display: flex;
        align-items: center;
        gap: var(--rds-space-3);
        width: 100%;
        color: var(--rds-color-text-muted);
        font-size: var(--rds-typography-caption-font-size);
      }
      
      :host([inset]) .root {
        margin-inline: var(--rds-space-4);
        width: auto;
      }
      
      .line {
        flex: 1;
        height: var(--rds-border-sm);
        background: var(--rds-color-border-subtle);
      }
      
      :host([orientation='vertical']) .root {
        flex-direction: column;
        width: auto;
        height: 100%;
      }
      
      :host([orientation='vertical']) .line {
        width: var(--rds-border-sm);
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
      <div
        class="root"
        role="separator"
        aria-orientation=${this.orientation}
      >
        <span class="line"></span>
        <span class="label">${this.label}<slot></slot></span>
        <span class="line"></span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rds-divider': RdsDivider;
  }
}
