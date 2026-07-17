import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { hostStyles } from '../../../internal/shared-styles';

/**
 * Quiet surface panel (no elevation by default).
 *
 * Chrome lives on an inner `.root` so page/preflight resets cannot strip
 * border and padding from the host.
 *
 * @element rds-panel
 * @slot - Panel body
 * @slot header - Optional header
 * @slot footer - Optional footer
 */
export class RdsPanel extends LitElement {
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
        color: var(--rds-color-text-primary);
      }
      
      .root {
        display: grid;
        gap: var(--rds-space-3);
        border-radius: var(--rds-radius-lg);
        background: var(--rds-color-surface-panel);
      }
      
      :host([bordered]) .root {
        border: var(--rds-border-sm) solid var(--rds-color-border-subtle);
      }
      
      :host([padded]) .root {
        padding: var(--rds-space-4);
      }
      
      ::slotted([slot='footer']) {
        padding-top: var(--rds-space-2);
        border-top: var(--rds-border-sm) solid var(--rds-color-border-subtle);
      }
    `,
  ];

  @property({ type: Boolean, reflect: true })
  accessor bordered: boolean = true;

  @property({ type: Boolean, reflect: true })
  accessor padded: boolean = true;

  override render() {
    return html`
      <div class="root">
        <slot name="header"></slot>
        <slot></slot>
        <slot name="footer"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rds-panel': RdsPanel;
  }
}
