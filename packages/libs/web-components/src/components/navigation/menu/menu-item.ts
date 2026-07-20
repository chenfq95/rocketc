import { ContextConsumer } from '@lit/context';
import { css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';

import { rcMenuContext } from './menu-context';

/**
 * Menu row used inside `rc-menu`.
 *
 * @element rc-menu-item
 * @slot - Item label
 */
export class RcMenuItem extends RcStyledElement {
  static override styles = [
    css`
      :host {
        display: block;
      }
      
      button {
        display: flex;
        align-items: center;
        width: 100%;
        margin: 0;
        border: 0;
        border-radius: var(--rc-radius-sm);
        background: transparent;
        padding: var(--rc-space-2) var(--rc-space-3);
        color: var(--rc-color-text-primary);
        font: inherit;
        font-size: var(--rc-typography-body-small-font-size);
        text-align: start;
        cursor: pointer;
      }
      
      button:hover:not(:disabled) {
        background: var(--rc-color-action-bg-hover);
      }
      
      button:focus-visible {
        outline: none;
        box-shadow: 0 0 0 2px var(--rc-color-border-focus);
      }
      
      :host([destructive]) button {
        color: var(--rc-color-danger-fg);
      }
      
      button:disabled {
        cursor: not-allowed;
        opacity: var(--rc-opacity-disabled);
      }
    `,
  ];

  @property({ type: String, reflect: true })
  accessor value: string = '';

  @property({ type: Boolean, reflect: true })
  accessor disabled: boolean = false;

  @property({ type: Boolean, reflect: true })
  accessor destructive: boolean = false;

  #menuContext = new ContextConsumer(this, {
    context: rcMenuContext,
  });

  #activate() {
    if (this.disabled) return;
    this.#menuContext.value?.select(this.value);
  }

  override render() {
    return html`
      <button part="control"
        role="menuitem"
        type="button"
        ?disabled=${this.disabled}
        @click=${this.#activate}
      >
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-menu-item': RcMenuItem;
  }
}
