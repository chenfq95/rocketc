import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { hostStyles } from '../../../internal/shared-styles';
import type { RdsAccordionItem } from './accordion-item';

/**
 * Accordion group. Set `multiple` to allow several items open.
 *
 * @element rds-accordion
 * @fires change - When open items change (`detail.value` string | string[])
 * @slot - `rds-accordion-item` children
 */
export class RdsAccordion extends LitElement {
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
        border: var(--rds-border-sm) solid var(--rds-color-border-subtle);
        border-radius: var(--rds-radius-lg);
        background: var(--rds-color-surface-panel);
        padding: 0 var(--rds-space-4);
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
    this.addEventListener('rds-accordion-toggle', this.#onToggle as EventListener);
  }

  override disconnectedCallback(): void {
    this.removeEventListener('rds-accordion-toggle', this.#onToggle as EventListener);
    super.disconnectedCallback();
  }

  override firstUpdated() {
    this.#sync();
  }

  override updated() {
    this.#sync();
  }

  #items(): RdsAccordionItem[] {
    return [...this.querySelectorAll<RdsAccordionItem>(':scope > rds-accordion-item')];
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
    'rds-accordion': RdsAccordion;
  }
}
