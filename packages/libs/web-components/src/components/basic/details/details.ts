import { css, html, type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';

/**
 * Disclosure widget backed by native `<details>` / `<summary>`.
 *
 * @element rc-details
 * @fires toggle - Fired when open state changes (`detail.open`)
 * @slot - Disclosure content
 * @slot summary - Summary / trigger label
 */
export class RcDetails extends RcStyledElement {
  static override styles = [
    css`
      :host {
        display: block;
      }
      
      details {
        border: var(--rc-border-sm) solid var(--rc-color-border-subtle);
        border-radius: var(--rc-radius-lg);
        background: var(--rc-color-surface-panel);
        padding: 0 var(--rc-space-4);
      }
      
      summary {
        display: flex;
        align-items: center;
        gap: var(--rc-space-2);
        min-height: var(--rc-space-9);
        list-style: none;
        cursor: pointer;
        color: var(--rc-color-text-primary);
        font-size: var(--rc-typography-label-font-size);
        font-weight: var(--rc-typography-weight-medium);
      }
      
      summary::-webkit-details-marker {
        display: none;
      }
      
      summary::before {
        content: '';
        width: 0.4rem;
        height: 0.4rem;
        border-right: var(--rc-border-sm) solid currentColor;
        border-bottom: var(--rc-border-sm) solid currentColor;
        rotate: -45deg;
        transition: rotate var(--rc-duration-fast) var(--rc-easing-standard);
      }
      
      details[open] summary::before {
        rotate: 45deg;
      }
      
      summary:focus-visible {
        outline: none;
        box-shadow:
          0 0 0 2px var(--rc-color-surface-panel),
          0 0 0 4px var(--rc-color-border-focus);
        border-radius: var(--rc-radius-sm);
      }
      
      .content {
        padding: 0 0 var(--rc-space-4);
        color: var(--rc-color-text-secondary);
        font-size: var(--rc-typography-body-font-size);
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
      <details part="container details" ?open=${this.open} @toggle=${this.#onToggle}>
        <summary part="control"><slot name="summary">Details</slot></summary>
        <div class="content" part="content"><slot></slot></div>
      </details>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-details': RcDetails;
  }
}
