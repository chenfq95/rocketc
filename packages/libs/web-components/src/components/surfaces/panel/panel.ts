import { css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';

/**
 * Quiet surface panel (no elevation by default).
 *
 * Chrome lives on an inner `.root` so page/preflight resets cannot strip
 * border and padding from the host.
 *
 * @element rc-panel
 * @slot - Panel body
 * @slot header - Optional header
 * @slot footer - Optional footer
 */
export class RcPanel extends RcStyledElement {
  static override styles = [
    css`
      :host {
        display: block;
        color: var(--rc-color-text-primary);
      }
      
      .root {
        display: grid;
        gap: var(--rc-space-3);
        border-radius: var(--rc-radius-lg);
        background: var(--rc-color-surface-panel);
      }
      
      :host([bordered]) .root {
        border: var(--rc-border-sm) solid var(--rc-color-border-subtle);
      }
      
      :host([padded]) .root {
        padding: var(--rc-space-4);
      }
      
      ::slotted([slot='footer']) {
        padding-top: var(--rc-space-2);
        border-top: var(--rc-border-sm) solid var(--rc-color-border-subtle);
      }
    `,
  ];

  @property({ type: Boolean, reflect: true })
  accessor bordered: boolean = true;

  @property({ type: Boolean, reflect: true })
  accessor padded: boolean = true;

  override render() {
    return html`
      <div class="root" part="container root">
        <slot name="header"></slot>
        <slot></slot>
        <slot name="footer"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-panel': RcPanel;
  }
}
