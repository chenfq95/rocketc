import { ContextProvider } from '@lit/context';
import { css, html } from 'lit';
import { RcStyledElement } from '../../../internal/styled-element';

import { rcMenuContext } from './menu-context';

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

  #select = (value: string) => {
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { value },
        bubbles: true,
      }),
    );
  };

  #contextProvider = new ContextProvider(this, {
    context: rcMenuContext,
    initialValue: { select: this.#select },
  });

  override connectedCallback(): void {
    super.connectedCallback();
    this.#contextProvider.setValue({ select: this.#select });
  }

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
