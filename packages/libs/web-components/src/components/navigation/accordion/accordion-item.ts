import { ContextConsumer } from '@lit/context';
import { css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';
import { rcAccordionContext } from './accordion-context';

/**
 * Item used inside `rc-accordion`.
 *
 * @element rc-accordion-item
 * @slot - Panel content
 * @slot trigger - Trigger label
 */
export class RcAccordionItem extends RcStyledElement {
  static override styles = [
    css`
      :host {
        display: block;
        border-bottom: var(--rc-border-sm) solid var(--rc-color-border-subtle);
      }
      
      :host(:last-child) {
        border-bottom: 0;
      }
      
      button {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--rc-space-3);
        width: 100%;
        margin: 0;
        border: 0;
        background: transparent;
        padding: var(--rc-space-3) 0;
        color: var(--rc-color-text-primary);
        font: inherit;
        font-size: var(--rc-typography-label-font-size);
        font-weight: var(--rc-typography-weight-medium);
        text-align: left;
        cursor: pointer;
      }
      
      button::after {
        content: '';
        width: 0.4rem;
        height: 0.4rem;
        border-right: var(--rc-border-sm) solid currentColor;
        border-bottom: var(--rc-border-sm) solid currentColor;
        rotate: -45deg;
        transition: rotate var(--rc-duration-fast) var(--rc-easing-standard);
      }
      
      button[aria-expanded='true']::after {
        rotate: 45deg;
      }
      
      button:focus-visible {
        outline: none;
        box-shadow:
          0 0 0 2px var(--rc-color-surface-panel),
          0 0 0 4px var(--rc-color-border-focus);
        border-radius: var(--rc-radius-sm);
      }
      
      button:disabled {
        cursor: not-allowed;
        opacity: var(--rc-opacity-disabled);
      }
      
      .panel {
        display: none;
        padding: 0 0 var(--rc-space-3);
        color: var(--rc-color-text-secondary);
        font-size: var(--rc-typography-body-font-size);
      }
      
      .panel:not([hidden]) {
        display: block;
      }
    `,
  ];

  @property({ type: String, reflect: true })
  accessor value: string = '';

  @property({ type: Boolean, reflect: true })
  accessor open: boolean = false;

  @property({ type: Boolean, reflect: true })
  accessor disabled: boolean = false;

  #accordionContext = new ContextConsumer(this, {
    context: rcAccordionContext,
    subscribe: true,
  });

  #toggle() {
    if (this.disabled) return;
    const context = this.#accordionContext.value;
    if (context) context.toggle(this.value, !context.openValues.includes(this.value));
    else this.open = !this.open;
  }

  override render() {
    const context = this.#accordionContext.value;
    const open = context ? context.openValues.includes(this.value) : this.open;

    return html`
      <button part="control"
        type="button"
        aria-expanded=${open ? 'true' : 'false'}
        ?disabled=${this.disabled}
        @click=${this.#toggle}
      >
        <slot name="trigger">Item</slot>
      </button>
      <div class="panel" part="panel" role="region" ?hidden=${!open}>
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-accordion-item': RcAccordionItem;
  }
}
