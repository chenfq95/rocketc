import { css, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';

import type { RcBadgeVariant } from './badge';

/**
 * Categorization chip with optional dismiss.
 *
 * @element rc-tag
 * @fires dismiss - When the close control is activated
 * @slot - Tag label
 */
export class RcTag extends RcStyledElement {
  static override styles = [
    css`
      :host {
        display: inline-flex;
        vertical-align: middle;
      }
      
      .root {
        display: inline-flex;
        align-items: center;
        gap: var(--rc-space-1);
        border: var(--rc-border-sm) solid transparent;
        border-radius: var(--rc-radius-full);
        padding: 2px var(--rc-space-2);
        font-size: var(--rc-typography-caption-font-size);
        font-weight: var(--rc-typography-weight-medium);
        line-height: var(--rc-typography-caption-line-height);
      }
      
      :host([variant='default']) .root,
      :host(:not([variant])) .root {
        background: var(--rc-color-control-secondary-bg-hover);
        color: var(--rc-color-control-secondary-fg);
      }
      
      :host([variant='outline']) .root {
        background: transparent;
        border-color: var(--rc-color-border-default);
        color: var(--rc-color-text-primary);
      }
      
      :host([variant='destructive']) .root {
        background: var(--rc-color-danger-subtle, var(--rc-color-danger-solid));
        color: var(--rc-color-danger-fg, var(--rc-color-danger-contrast));
      }
      
      :host([variant='success']) .root {
        background: var(--rc-color-success-subtle, var(--rc-color-success-solid));
        color: var(--rc-color-success-fg, var(--rc-color-success-contrast));
      }
      
      button {
        margin: 0;
        border: 0;
        background: transparent;
        color: inherit;
        cursor: pointer;
        font: inherit;
        line-height: 1;
        padding: 0;
      }
    `,
  ];

  @property({ type: String, reflect: true })
  accessor variant: RcBadgeVariant = 'default';

  @property({ type: Boolean, reflect: true })
  accessor dismissible: boolean = false;

  override render() {
    return html`
      <span class="root" part="container root">
        <slot></slot>
        ${
          this.dismissible
            ? html`
                <button part="control"
                  type="button"
                  aria-label="Remove"
                  @click=${() =>
                    this.dispatchEvent(
                      new CustomEvent('dismiss', { bubbles: true, composed: true }),
                    )}
                >
                  ×
                </button>
              `
            : nothing
        }
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-tag': RcTag;
  }
}
