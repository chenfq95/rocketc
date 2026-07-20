import { ContextProvider } from '@lit/context';
import { css, html, nothing, type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';

import { nextId } from '../../../internal/a11y';
import type { RcRadio } from './radio';
import { rcRadioGroupContext, type RcRadioGroupContextValue } from './radio-group-context';

/**
 * Groups `rc-radio` options with `role="radiogroup"` and arrow-key navigation.
 *
 * @element rc-radio-group
 * @fires change - Bubbles from selected `rc-radio` (`detail.value`)
 * @slot - Radio options
 * @slot label - Optional group label
 */
export class RcRadioGroup extends RcStyledElement {
  static override styles = [
    css`
      :host {
        display: grid;
        gap: var(--rc-space-2);
      }
      
      .label {
        color: var(--rc-color-text-primary);
        font-size: var(--rc-typography-label-font-size);
        font-weight: var(--rc-typography-weight-medium);
        letter-spacing: var(--rc-typography-label-letter-spacing);
      }
      
      .options {
        display: flex;
        flex-wrap: wrap;
        gap: var(--rc-space-3);
      }
      
      :host([orientation='vertical']) .options {
        flex-direction: column;
        align-items: flex-start;
      }
    `,
  ];

  @property({ type: String, reflect: true })
  accessor name: string = '';

  @property({ type: String })
  accessor value: string = '';

  @property({ type: Boolean, reflect: true })
  accessor disabled: boolean = false;

  @property({ type: Boolean, reflect: true })
  accessor required: boolean = false;

  @property({ type: String, reflect: true })
  accessor orientation: 'horizontal' | 'vertical' = 'horizontal';

  #labelId = '';

  #select = (value: string) => {
    if (this.disabled || !value || value === this.value) return;
    this.value = value;
  };

  #contextProvider = new ContextProvider(this, {
    context: rcRadioGroupContext,
    initialValue: this.#contextValue(),
  });

  override connectedCallback(): void {
    super.connectedCallback();
    if (!this.#labelId) this.#labelId = nextId('rc-radio-group-label');
    this.addEventListener('keydown', this.#onKeyDown);
  }

  override disconnectedCallback(): void {
    this.removeEventListener('keydown', this.#onKeyDown);
    super.disconnectedCallback();
  }

  override updated(changed: PropertyValues<this>): void {
    if (!changed.has('name') && !changed.has('value') && !changed.has('disabled')) return;
    this.#contextProvider.setValue(this.#contextValue());
  }

  #radios(): RcRadio[] {
    return [...this.querySelectorAll<RcRadio>(':scope > rc-radio')];
  }

  #contextValue(): RcRadioGroupContextValue {
    return {
      name: this.name,
      value: this.value,
      disabled: this.disabled,
      select: this.#select,
    };
  }

  #onKeyDown = (event: KeyboardEvent) => {
    const keys = ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown', 'Home', 'End'];
    if (!keys.includes(event.key)) return;
    if (this.disabled) return;

    const radios = this.#radios().filter((r) => !r.disabled);
    if (!radios.length) return;

    const current = radios.findIndex((r) => (this.value ? r.value === this.value : r.checked));
    let next = current;

    if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = radios.length - 1;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      next = current <= 0 ? radios.length - 1 : current - 1;
    } else {
      next = current >= radios.length - 1 ? 0 : current + 1;
    }

    event.preventDefault();
    const radio = radios[next];
    if (!radio) return;
    this.#select(radio.value);
    radio.focus();
    radio.dispatchEvent(
      new CustomEvent('change', {
        detail: { value: radio.value, checked: true },
        bubbles: true,
      }),
    );
  };

  override render() {
    return html`
      <div class="root" part="container root"
        role="radiogroup"
        aria-labelledby=${this.#labelId}
        aria-orientation=${this.orientation}
        aria-required=${this.required ? 'true' : nothing}
        aria-disabled=${this.disabled ? 'true' : nothing}
      >
        <div class="label" part="label" id=${this.#labelId}><slot name="label"></slot></div>
        <div class="options" part="options"><slot></slot></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-radio-group': RcRadioGroup;
  }
}
