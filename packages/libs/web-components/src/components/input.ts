import { LitElement, css, html } from 'lit';

import { ControlRelayController } from '../internal/control-relay';
import { hostStyles } from '../internal/shared-styles';

/**
 * Single-line text field bound to design-system form chrome tokens.
 *
 * Pair with `rds-label` via matching light-DOM `id` / `for`.
 * Host API props stay on the host; `aria-*` / `data-*` / `title` relay to
 * the inner `<input>`. Interactive events relay on demand.
 *
 * @element rds-input
 * @fires input - Native input event (composed / relayed)
 * @fires change - Native change event (composed / relayed)
 */
export class RdsInput extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  static override properties = {
    type: { type: String, reflect: true },
    name: { type: String, reflect: true },
    value: { type: String },
    placeholder: { type: String, reflect: true },
    disabled: { type: Boolean, reflect: true },
    readonly: { type: Boolean, reflect: true },
    required: { type: Boolean, reflect: true },
  };

  static formAssociated = true;

  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
      }
      
      input {
        display: block;
        width: 100%;
        min-height: var(--rds-space-9);
        margin: 0;
        border: var(--rds-border-sm) solid var(--rds-color-border-default);
        border-radius: var(--rds-radius-md);
        background: var(--rds-color-surface-panel);
        padding: 0 var(--rds-space-3);
        color: var(--rds-color-text-primary);
        font: inherit;
        font-size: var(--rds-typography-body-font-size);
      }
      
      input::placeholder {
        color: var(--rds-color-text-muted);
      }
      
      input:focus-visible {
        outline: none;
        border-color: var(--rds-color-border-focus);
        box-shadow: 0 0 0 3px color-mix(in oklab, var(--rds-color-border-focus) 30%, transparent);
      }
      
      input:disabled {
        cursor: not-allowed;
        background: var(--rds-color-action-bg-disabled);
        color: var(--rds-color-action-fg-disabled);
        opacity: var(--rds-opacity-disabled);
      }
    `,
  ];

  declare type: string;
  declare name: string;
  declare value: string;
  declare placeholder: string;
  declare disabled: boolean;
  declare readonly: boolean;
  declare required: boolean;

  #internals = this.attachInternals();
  #input: HTMLInputElement | null = null;

  constructor() {
    super();
    this.type = 'text';
    this.name = '';
    this.value = '';
    this.placeholder = '';
    this.disabled = false;
    this.readonly = false;
    this.required = false;

    this.addController(
      new ControlRelayController(this, {
        target: () => this.#input ?? this.renderRoot.querySelector('input'),
        attrs: {
          hostOnly: ['type', 'name', 'value', 'placeholder', 'disabled', 'readonly', 'required'],
        },
      }),
    );
  }

  protected override firstUpdated(): void {
    this.#input = this.renderRoot.querySelector('input');
  }

  #onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.#internals.setFormValue(this.value);
  }

  override render() {
    return html`
      <input
        .value=${this.value}
        ?disabled=${this.disabled}
        ?readonly=${this.readonly}
        ?required=${this.required}
        name=${this.name}
        placeholder=${this.placeholder}
        type=${this.type}
        @input=${this.#onInput}
      />
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rds-input': RdsInput;
  }
}
