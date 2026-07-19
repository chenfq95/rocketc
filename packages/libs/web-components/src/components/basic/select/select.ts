import { LitElement, css, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';

import { mixinDelegatesAria, type ARIAMixinStrict } from '../../../internal/mixin-delegates-aria';
import { mixinElementInternals } from '../../../internal/mixin-element-internals';
import {
  getFormValue,
  mixinFormAssociated,
  type FormRestoreReason,
  type FormRestoreState,
} from '../../../internal/mixin-form-associated';

const selectBase = mixinDelegatesAria(mixinFormAssociated(mixinElementInternals(RcStyledElement)));

/**
 * Native-backed select. Place `<option>` / `<optgroup>` as light-DOM children;
 * they are synced into the internal `<select>`.
 *
 * @element rc-select
 * @fires input - Native input event (composed; retargeted to the host)
 * @fires change - Composed CustomEvent when the value changes (`detail.value`)
 * @slot - Options / optgroups
 */
export class RcSelect extends selectBase {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  static override styles = [
    css`
      :host {
        display: block;
      }
      
      .options {
        display: none;
      }
      
      select {
        display: block;
        width: 100%;
        min-height: var(--rc-space-9);
        margin: 0;
        border: var(--rc-border-sm) solid var(--rc-color-border-default);
        border-radius: var(--rc-radius-md);
        background: var(--rc-color-surface-panel);
        padding: 0 var(--rc-space-3);
        color: var(--rc-color-text-primary);
        font: inherit;
        font-size: var(--rc-typography-body-font-size);
      }
      
      select:focus-visible {
        outline: none;
        border-color: var(--rc-color-border-focus);
        box-shadow: 0 0 0 3px color-mix(in oklab, var(--rc-color-border-focus) 30%, transparent);
      }
      
      select:disabled {
        cursor: not-allowed;
        background: var(--rc-color-action-bg-disabled);
        color: var(--rc-color-action-fg-disabled);
        opacity: var(--rc-opacity-disabled);
      }
    `,
  ];

  @property({ type: String })
  accessor value: string = '';

  @property({ type: Boolean, reflect: true })
  accessor required: boolean = false;

  @property({ type: Boolean, reflect: true })
  accessor multiple: boolean = false;

  @property({ type: Number, reflect: true })
  accessor size: number = 0;

  #select: HTMLSelectElement | null = null;

  override firstUpdated(): void {
    this.#select = this.renderRoot.querySelector('select');
    this.#syncOptions();
    if (this.value && this.#select) this.#select.value = this.value;
  }

  override [getFormValue]() {
    if (this.multiple && this.#select) {
      const data = new FormData();
      for (const option of this.#select.selectedOptions) {
        data.append(this.name || 'select', option.value);
      }
      return data;
    }
    return this.value;
  }

  override formResetCallback(): void {
    this.value = this.getAttribute('value') ?? '';
    if (this.#select) this.#select.value = this.value;
  }

  override formStateRestoreCallback(
    state: FormRestoreState | null,
    _reason: FormRestoreReason,
  ): void {
    this.value = typeof state === 'string' ? state : '';
    if (this.#select) this.#select.value = this.value;
  }

  #syncOptions() {
    if (!this.#select) return;
    const slot = this.renderRoot.querySelector('slot');
    const assigned = slot?.assignedElements({ flatten: true }) ?? [];
    const nodes = assigned.filter(
      (el) => el instanceof HTMLOptionElement || el instanceof HTMLOptGroupElement,
    );
    this.#select.replaceChildren(...nodes.map((node) => node.cloneNode(true)));
    if (this.value) this.#select.value = this.value;
    else this.value = this.#select.value;
  }

  #onSlotChange() {
    this.#syncOptions();
  }

  #onInput(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.value = select.value;
  }

  #onChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.value = select.value;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { value: this.value },
        bubbles: true,
      }),
    );
    event.stopPropagation();
  }

  override render() {
    const { ariaLabel, ariaInvalid, ariaRequired, role } = this as ARIAMixinStrict;

    return html`
      <div class="options" part="options">
        <slot @slotchange=${this.#onSlotChange}></slot>
      </div>
      <select part="control"
        aria-invalid=${ariaInvalid || nothing}
        aria-label=${ariaLabel || nothing}
        aria-required=${ariaRequired || nothing}
        ?disabled=${this.disabled}
        ?multiple=${this.multiple}
        ?required=${this.required}
        name=${this.name}
        role=${role || nothing}
        size=${this.size > 0 ? this.size : nothing}
        @change=${this.#onChange}
        @input=${this.#onInput}
      ></select>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-select': RcSelect;
  }
}
