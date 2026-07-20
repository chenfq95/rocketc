import { ContextConsumer } from '@lit/context';
import { css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';
import { rcTabsContext } from './tabs-context';

/**
 * Tab trigger used inside `rc-tabs`.
 *
 * @element rc-tab
 * @slot - Tab label
 */
export class RcTab extends RcStyledElement {
  static override styles = [
    css`
      :host {
        display: inline-flex;
      }
      
      button {
        margin: 0;
        border: 0;
        border-bottom: 2px solid transparent;
        background: transparent;
        padding: var(--rc-space-2) var(--rc-space-3);
        color: var(--rc-color-text-secondary);
        font: inherit;
        font-size: var(--rc-typography-label-font-size);
        font-weight: var(--rc-typography-weight-medium);
        cursor: pointer;
      }
      
      button:hover:not(:disabled) {
        color: var(--rc-color-text-primary);
        background: var(--rc-color-action-bg-hover);
      }
      
      button[aria-selected='true'] {
        color: var(--rc-color-control-primary-fg, var(--rc-color-brand-fg));
        border-bottom-color: var(--rc-color-control-primary-border);
      }
      
      button:focus-visible {
        outline: none;
        box-shadow:
          0 0 0 2px var(--rc-color-surface-panel),
          0 0 0 4px var(--rc-color-border-focus);
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
  accessor selected: boolean = false;

  #tabsContext = new ContextConsumer(this, {
    context: rcTabsContext,
    subscribe: true,
  });

  #onClick() {
    if (this.disabled) return;
    this.#tabsContext.value?.select(this.value);
  }

  override render() {
    const context = this.#tabsContext.value;
    const selected = context ? context.value === this.value : this.selected;

    return html`
      <button part="control"
        role="tab"
        type="button"
        ?disabled=${this.disabled}
        aria-selected=${selected ? 'true' : 'false'}
        tabindex=${selected ? 0 : -1}
        @click=${this.#onClick}
      >
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-tab': RcTab;
  }
}
