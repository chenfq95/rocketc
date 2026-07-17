import { LitElement, css, html } from 'lit';

import { hostStyles } from '../../../internal/shared-styles';

/**
 * Vertical menu list. Compose with `rds-menu-item`.
 *
 * @element rds-menu
 * @fires change - When an item is selected (`detail.value`)
 * @slot - Menu items
 * @slot label - Optional menu label
 */
export class RdsMenu extends LitElement {
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
        min-width: 10rem;
      }
      
      .root {
        display: grid;
        gap: var(--rds-space-1);
        border: var(--rds-border-sm) solid var(--rds-color-border-subtle);
        border-radius: var(--rds-radius-lg);
        background: var(--rds-color-surface-elevated, var(--rds-color-surface-panel));
        padding: var(--rds-space-1);
        box-shadow: var(--rds-shadow-raised, var(--rds-shadow-surface));
      }
      
      .label {
        padding: var(--rds-space-2) var(--rds-space-3) var(--rds-space-1);
        color: var(--rds-color-text-muted);
        font-size: var(--rds-typography-caption-font-size);
        font-weight: var(--rds-typography-weight-medium);
      }
    `,
  ];

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('rds-menu-select', this.#onSelect as EventListener);
  }

  override disconnectedCallback(): void {
    this.removeEventListener('rds-menu-select', this.#onSelect as EventListener);
    super.disconnectedCallback();
  }

  #onSelect = (event: Event) => {
    if (!(event.target instanceof HTMLElement) || event.target.parentElement !== this) return;
    event.stopPropagation();
    const custom = event as CustomEvent<{ value: string }>;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { value: custom.detail?.value ?? '' },
        bubbles: true,
      }),
    );
  };

  override render() {
    return html`
      <div class="root" role="menu">
        <div class="label"><slot name="label"></slot></div>
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rds-menu': RdsMenu;
  }
}
