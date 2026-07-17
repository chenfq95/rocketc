import { LitElement, css, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';

import { nextId } from '../../../internal/a11y';
import { hostStyles } from '../../../internal/shared-styles';
import type { RdsRadio } from './radio';

/**
 * Groups `rds-radio` options with `role="radiogroup"` and arrow-key navigation.
 *
 * @element rds-radio-group
 * @fires change - Bubbles from selected `rds-radio` (`detail.value`)
 * @slot - Radio options
 * @slot label - Optional group label
 */
export class RdsRadioGroup extends LitElement {
  static override styles = [
    hostStyles,
    css`
      :host {
        display: grid;
        gap: var(--rds-space-2);
      }
      
      .label {
        color: var(--rds-color-text-primary);
        font-size: var(--rds-typography-label-font-size);
        font-weight: var(--rds-typography-weight-medium);
        letter-spacing: var(--rds-typography-label-letter-spacing);
      }
      
      .options {
        display: flex;
        flex-wrap: wrap;
        gap: var(--rds-space-3);
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

  override connectedCallback(): void {
    super.connectedCallback();
    if (!this.#labelId) this.#labelId = nextId('rds-radio-group-label');
    this.addEventListener('change', this.#onRadioChange);
    this.addEventListener('keydown', this.#onKeyDown);
  }

  override disconnectedCallback(): void {
    this.removeEventListener('change', this.#onRadioChange);
    this.removeEventListener('keydown', this.#onKeyDown);
    super.disconnectedCallback();
  }

  override updated(): void {
    this.#syncRadios();
  }

  #radios(): RdsRadio[] {
    return [...this.querySelectorAll<RdsRadio>('rds-radio')];
  }

  #syncRadios() {
    for (const radio of this.#radios()) {
      if (this.name && radio.name !== this.name) radio.name = this.name;
      if (this.disabled) radio.disabled = true;
      if (this.value) {
        const shouldCheck = radio.value === this.value;
        if (radio.checked !== shouldCheck) radio.checked = shouldCheck;
      }
    }
  }

  #onRadioChange = (event: Event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement) || target.localName !== 'rds-radio') return;
    const radio = target as RdsRadio;
    this.value = radio.value;
  };

  #onKeyDown = (event: KeyboardEvent) => {
    const keys = ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown', 'Home', 'End'];
    if (!keys.includes(event.key)) return;

    const radios = this.#radios().filter((r) => !r.disabled);
    if (!radios.length) return;

    const current = radios.findIndex((r) => r.checked);
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
    radio.checked = true;
    this.value = radio.value;
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
      <div
        class="root"
        role="radiogroup"
        aria-labelledby=${this.#labelId}
        aria-orientation=${this.orientation}
        aria-required=${this.required ? 'true' : nothing}
        aria-disabled=${this.disabled ? 'true' : nothing}
      >
        <div class="label" id=${this.#labelId}><slot name="label"></slot></div>
        <div class="options"><slot></slot></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rds-radio-group': RdsRadioGroup;
  }
}
