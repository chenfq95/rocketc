import { LitElement, css, html, nothing, type PropertyValues } from 'lit';

import { ControlRelayController } from '../internal/control-relay';
import { hostStyles } from '../internal/shared-styles';

export type RdsButtonVariant = 'solid' | 'subtle' | 'outline' | 'ghost' | 'destructive';
export type RdsButtonSize = 'sm' | 'md' | 'lg';

/**
 * Primary action control. Visuals resolve through `color.control.*` /
 * `color.danger.*` semantic tokens.
 *
 * Host API props (`variant` / `size` / `loading`) stay on the host.
 * Native button props + `aria-*` / `data-*` / `title` are forwarded to the
 * inner `<button>`; inner control events are re-dispatched from the host.
 *
 * @element rds-button
 * @slot - Button label / content
 */
export class RdsButton extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  static override properties = {
    variant: { type: String, reflect: true },
    size: { type: String, reflect: true },
    type: { type: String, reflect: true },
    name: { type: String, reflect: true },
    value: { type: String, reflect: true },
    form: { type: String, reflect: true },
    disabled: { type: Boolean, reflect: true },
    loading: { type: Boolean, reflect: true },
    autofocus: { type: Boolean, reflect: true },
  };

  static override styles = [
    hostStyles,
    css`
      :host {
        display: inline-flex;
        vertical-align: middle;
      }
      
      button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--rds-space-2);
        width: 100%;
        margin: 0;
        border: var(--rds-border-sm) solid transparent;
        border-radius: var(--rds-radius-md);
        font: inherit;
        font-weight: var(--rds-typography-weight-medium);
        letter-spacing: var(--rds-typography-label-letter-spacing);
        cursor: pointer;
        transition:
          background-color var(--rds-duration-fast) var(--rds-easing-standard),
          border-color var(--rds-duration-fast) var(--rds-easing-standard),
          color var(--rds-duration-fast) var(--rds-easing-standard),
          opacity var(--rds-duration-fast) var(--rds-easing-standard);
      }
      
      button:focus-visible {
        outline: none;
        box-shadow:
          0 0 0 2px var(--rds-color-surface-panel),
          0 0 0 4px var(--rds-color-border-focus);
      }
      
      :host([size='sm']) button {
        min-height: var(--rds-space-7);
        padding: 0 var(--rds-space-2);
        font-size: var(--rds-typography-caption-font-size);
      }
      
      :host([size='md']) button,
      :host(:not([size])) button {
        min-height: var(--rds-space-8);
        padding: 0 var(--rds-space-3);
        font-size: var(--rds-typography-label-font-size);
      }
      
      :host([size='lg']) button {
        min-height: var(--rds-space-9);
        padding: 0 var(--rds-space-4);
        font-size: var(--rds-typography-body-font-size);
      }
      
      :host([variant='solid']) button,
      :host(:not([variant])) button {
        background: var(--rds-color-control-primary-bg);
        border-color: var(--rds-color-control-primary-border);
        color: var(--rds-color-control-primary-fg-contrast);
      }
      
      :host([variant='solid']) button:hover:not(:disabled),
      :host(:not([variant])) button:hover:not(:disabled) {
        background: var(--rds-color-control-primary-bg-hover);
        border-color: var(--rds-color-control-primary-border-hover);
      }
      
      :host([variant='solid']) button:active:not(:disabled),
      :host(:not([variant])) button:active:not(:disabled) {
        background: var(--rds-color-control-primary-bg-active);
      }
      
      :host([variant='subtle']) button {
        background: var(--rds-color-control-secondary-bg-hover);
        border-color: transparent;
        color: var(--rds-color-control-secondary-fg);
      }
      
      :host([variant='subtle']) button:hover:not(:disabled) {
        background: var(--rds-color-control-secondary-bg-active);
      }
      
      :host([variant='outline']) button {
        background: transparent;
        border-color: var(--rds-color-control-secondary-border);
        color: var(--rds-color-control-secondary-fg);
      }
      
      :host([variant='outline']) button:hover:not(:disabled) {
        background: var(--rds-color-action-bg-hover);
        border-color: var(--rds-color-control-secondary-border-hover);
      }
      
      :host([variant='ghost']) button {
        background: transparent;
        border-color: transparent;
        color: var(--rds-color-text-primary);
      }
      
      :host([variant='ghost']) button:hover:not(:disabled) {
        background: var(--rds-color-action-bg-hover);
      }
      
      :host([variant='destructive']) button {
        background: var(--rds-color-danger-solid);
        border-color: var(--rds-color-danger-solid);
        color: var(--rds-color-danger-contrast);
      }
      
      :host([variant='destructive']) button:hover:not(:disabled) {
        background: var(--rds-color-danger-solid-hover);
        border-color: var(--rds-color-danger-solid-hover);
      }
      
      button:disabled {
        cursor: not-allowed;
        opacity: var(--rds-opacity-disabled);
      }
    `,
  ];

  declare variant: RdsButtonVariant;
  declare size: RdsButtonSize;
  declare type: 'button' | 'submit' | 'reset';
  declare name: string;
  declare value: string;
  declare form: string;
  declare disabled: boolean;
  declare loading: boolean;
  declare autofocus: boolean;

  #button: HTMLButtonElement | null = null;

  constructor() {
    super();
    this.variant = 'solid';
    this.size = 'md';
    this.type = 'button';
    this.name = '';
    this.value = '';
    this.form = '';
    this.disabled = false;
    this.loading = false;
    this.autofocus = false;

    this.addController(
      new ControlRelayController(this, {
        target: () => this.#button ?? this.renderRoot.querySelector('button'),
        attrs: { include: ['name', 'value', 'form', 'type'] },
      }),
    );
  }

  protected override firstUpdated(): void {
    this.#button = this.renderRoot.querySelector('button');
  }

  protected override updated(changed: PropertyValues<this>): void {
    if (changed.has('disabled') || changed.has('loading')) {
      this.setAttribute('aria-busy', this.loading ? 'true' : 'false');
    }
  }

  override render() {
    return html`
      <button
        ?autofocus=${this.autofocus}
        ?disabled=${this.disabled || this.loading}
        form=${this.form || nothing}
        name=${this.name || nothing}
        type=${this.type}
        value=${this.value || nothing}
      >
        ${
          this.loading
            ? html`
                <span aria-hidden="true">…</span>
              `
            : nothing
        }
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rds-button': RdsButton;
  }
}
