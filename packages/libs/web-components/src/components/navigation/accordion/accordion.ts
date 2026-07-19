import { css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';

import type { RcAccordionItem } from './accordion-item';

/**
 * Accordion group. Set `multiple` to allow several items open.
 *
 * @element rc-accordion
 * @fires change - When open items change (`detail.value` string | string[])
 * @slot - `rc-accordion-item` children
 */
export class RcAccordion extends RcStyledElement {
  static override styles = [
    css`
      :host {
        display: block;
        border: var(--rc-border-sm) solid var(--rc-color-border-subtle);
        border-radius: var(--rc-radius-lg);
        background: var(--rc-color-surface-panel);
        padding: 0 var(--rc-space-4);
      }
    `,
  ];

  @property({ type: Boolean, reflect: true })
  accessor multiple: boolean = false;

  @property({ type: String })
  accessor value: string = '';
  /** Comma-separated open item values when `multiple`. */

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('rc-accordion-toggle', this.#onToggle as EventListener);
  }

  override disconnectedCallback(): void {
    this.removeEventListener('rc-accordion-toggle', this.#onToggle as EventListener);
    super.disconnectedCallback();
  }

  override firstUpdated() {
    this.#sync();
  }

  override updated() {
    this.#sync();
  }

  #items(): RcAccordionItem[] {
    return [...this.querySelectorAll<RcAccordionItem>(':scope > rc-accordion-item')];
  }

  #openValues(): string[] {
    return this.value
      .split(',')
      .map((v) => v.trim())
      .filter(Boolean);
  }

  #sync() {
    const open = new Set(this.#openValues());
    for (const item of this.#items()) {
      item.open = open.has(item.value);
    }
  }

  #onToggle = (event: Event) => {
    if (!(event.target instanceof HTMLElement) || event.target.parentElement !== this) return;
    event.stopPropagation();
    const { value, open } = (event as CustomEvent<{ value: string; open: boolean }>).detail;
    let next = this.#openValues();
    if (this.multiple) {
      next = open ? [...new Set([...next, value])] : next.filter((v) => v !== value);
    } else {
      next = open ? [value] : [];
    }
    this.value = next.join(',');
    this.#sync();
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { value: this.multiple ? next : (next[0] ?? '') },
        bubbles: true,
      }),
    );
  };

  override render() {
    return html`
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-accordion': RcAccordion;
  }
}
