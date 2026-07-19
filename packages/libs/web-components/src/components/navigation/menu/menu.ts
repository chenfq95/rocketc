import { css, html } from 'lit';
import { RcStyledElement } from '../../../internal/styled-element';

/**
 * Vertical menu list. Compose with `rc-menu-item`.
 *
 * @element rc-menu
 * @fires change - When an item is selected (`detail.value`)
 * @slot - Menu items
 * @slot label - Optional menu label
 */
export class RcMenu extends RcStyledElement {
  static override styles = [
    css`
      :host {
        display: block;
        min-width: 10rem;
      }
      
      .root {
        display: grid;
        gap: var(--rc-space-1);
        border: var(--rc-border-sm) solid var(--rc-color-border-subtle);
        border-radius: var(--rc-radius-lg);
        background: var(--rc-color-surface-elevated, var(--rc-color-surface-panel));
        padding: var(--rc-space-1);
        box-shadow: var(--rc-shadow-raised, var(--rc-shadow-surface));
      }
      
      .label {
        padding: var(--rc-space-2) var(--rc-space-3) var(--rc-space-1);
        color: var(--rc-color-text-muted);
        font-size: var(--rc-typography-caption-font-size);
        font-weight: var(--rc-typography-weight-medium);
      }
    `,
  ];

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('rc-menu-select', this.#onSelect as EventListener);
  }

  override disconnectedCallback(): void {
    this.removeEventListener('rc-menu-select', this.#onSelect as EventListener);
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
      <div class="root" part="container root" role="menu">
        <div class="label" part="label"><slot name="label"></slot></div>
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-menu': RcMenu;
  }
}
