import { LitElement, css, html, type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

import { hostStyles } from '../../../internal/shared-styles';

/**
 * Disclosure widget backed by native `<details>` / `<summary>`.
 *
 * @element rds-details
 * @fires toggle - Fired when open state changes (`detail.open`)
 * @slot - Disclosure content
 * @slot summary - Summary / trigger label
 */
export class RdsDetails extends LitElement {
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
      }
      
      details {
        border: var(--rds-border-sm) solid var(--rds-color-border-subtle);
        border-radius: var(--rds-radius-lg);
        background: var(--rds-color-surface-panel);
        padding: 0 var(--rds-space-4);
      }
      
      summary {
        display: flex;
        align-items: center;
        gap: var(--rds-space-2);
        min-height: var(--rds-space-9);
        list-style: none;
        cursor: pointer;
        color: var(--rds-color-text-primary);
        font-size: var(--rds-typography-label-font-size);
        font-weight: var(--rds-typography-weight-medium);
      }
      
      summary::-webkit-details-marker {
        display: none;
      }
      
      summary::before {
        content: '';
        width: 0.4rem;
        height: 0.4rem;
        border-right: var(--rds-border-sm) solid currentColor;
        border-bottom: var(--rds-border-sm) solid currentColor;
        rotate: -45deg;
        transition: rotate var(--rds-duration-fast) var(--rds-easing-standard);
      }
      
      details[open] summary::before {
        rotate: 45deg;
      }
      
      summary:focus-visible {
        outline: none;
        box-shadow:
          0 0 0 2px var(--rds-color-surface-panel),
          0 0 0 4px var(--rds-color-border-focus);
        border-radius: var(--rds-radius-sm);
      }
      
      .content {
        padding: 0 0 var(--rds-space-4);
        color: var(--rds-color-text-secondary);
        font-size: var(--rds-typography-body-font-size);
      }
    `,
  ];

  @property({ type: Boolean, reflect: true })
  accessor open: boolean = false;

  #ignoreOpenSync = false;

  protected override updated(changed: PropertyValues<this>): void {
    if (!changed.has('open') || this.#ignoreOpenSync) return;
    const details = this.renderRoot.querySelector('details');
    if (details && details.open !== this.open) details.open = this.open;
  }

  #onToggle(event: Event) {
    const details = event.target as HTMLDetailsElement;
    this.#ignoreOpenSync = true;
    this.open = details.open;
    void this.updateComplete.then(() => {
      this.#ignoreOpenSync = false;
    });
    this.dispatchEvent(
      new CustomEvent('toggle', {
        detail: { open: this.open },
        bubbles: true,
      }),
    );
  }

  override render() {
    return html`
      <details ?open=${this.open} @toggle=${this.#onToggle}>
        <summary><slot name="summary">Details</slot></summary>
        <div class="content"><slot></slot></div>
      </details>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rds-details': RdsDetails;
  }
}
