import { ContextProvider } from '@lit/context';
import { css, html, type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';

import { rcAccordionContext, type RcAccordionContextValue } from './accordion-context';

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

  #toggle = (value: string, open: boolean) => {
    let next = this.#openValues();
    if (this.multiple) {
      next = open ? [...new Set([...next, value])] : next.filter((entry) => entry !== value);
    } else {
      next = open ? [value] : [];
    }
    this.value = next.join(',');
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { value: this.multiple ? next : (next[0] ?? '') },
        bubbles: true,
      }),
    );
  };

  #contextProvider = new ContextProvider(this, {
    context: rcAccordionContext,
    initialValue: this.#contextValue(),
  });

  override updated(changed: PropertyValues<this>): void {
    if (!changed.has('value')) return;
    this.#contextProvider.setValue(this.#contextValue());
  }

  #openValues(): string[] {
    return this.value
      .split(',')
      .map((v) => v.trim())
      .filter(Boolean);
  }

  #contextValue(): RcAccordionContextValue {
    return { openValues: this.#openValues(), toggle: this.#toggle };
  }

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
