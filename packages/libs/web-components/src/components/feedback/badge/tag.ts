import { LitElement, css, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';

import { hostStyles } from '../../../internal/shared-styles';
import type { RdsBadgeVariant } from './badge';

/**
 * Categorization chip with optional dismiss.
 *
 * @element rds-tag
 * @fires dismiss - When the close control is activated
 * @slot - Tag label
 */
export class RdsTag extends LitElement {
  static override styles = [
    hostStyles,
    css`
      :host {
        display: inline-flex;
        vertical-align: middle;
      }
      
      .root {
        display: inline-flex;
        align-items: center;
        gap: var(--rds-space-1);
        border: var(--rds-border-sm) solid transparent;
        border-radius: var(--rds-radius-full);
        padding: 2px var(--rds-space-2);
        font-size: var(--rds-typography-caption-font-size);
        font-weight: var(--rds-typography-weight-medium);
        line-height: var(--rds-typography-caption-line-height);
      }
      
      :host([variant='default']) .root,
      :host(:not([variant])) .root {
        background: var(--rds-color-control-secondary-bg-hover);
        color: var(--rds-color-control-secondary-fg);
      }
      
      :host([variant='outline']) .root {
        background: transparent;
        border-color: var(--rds-color-border-default);
        color: var(--rds-color-text-primary);
      }
      
      :host([variant='destructive']) .root {
        background: var(--rds-color-danger-subtle, var(--rds-color-danger-solid));
        color: var(--rds-color-danger-fg, var(--rds-color-danger-contrast));
      }
      
      :host([variant='success']) .root {
        background: var(--rds-color-success-subtle, var(--rds-color-success-solid));
        color: var(--rds-color-success-fg, var(--rds-color-success-contrast));
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
  accessor variant: RdsBadgeVariant = 'default';

  @property({ type: Boolean, reflect: true })
  accessor dismissible: boolean = false;

  override render() {
    return html`
      <span class="root">
        <slot></slot>
        ${
          this.dismissible
            ? html`
                <button
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
    'rds-tag': RdsTag;
  }
}
