import { LitElement, css, html } from 'lit';

import { ControlRelayController } from '../internal/control-relay';
import { hostStyles } from '../internal/shared-styles';

/**
 * Binary toggle control.
 *
 * Host API props (`checked` / `disabled` / `name`) stay on the host.
 * `aria-*` / `data-*` / `title` are forwarded to the inner `<button>`;
 * inner control events are re-dispatched from the host.
 *
 * @element rds-switch
 * @fires change - Fired when checked state changes (`detail.checked`)
 */
export class RdsSwitch extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  static override properties = {
    checked: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true },
    name: { type: String, reflect: true },
  };

  static formAssociated = true;

  static override styles = [
    hostStyles,
    css`
      :host {
        display: inline-flex;
        align-items: center;
        vertical-align: middle;
      }
      
      button {
        position: relative;
        width: var(--rds-space-9);
        height: var(--rds-space-5);
        margin: 0;
        border: 0;
        border-radius: var(--rds-radius-full);
        background: var(--rds-color-border-default);
        padding: 0;
        cursor: pointer;
        transition: background-color var(--rds-duration-fast) var(--rds-easing-standard);
      }
      
      button:focus-visible {
        outline: none;
        box-shadow:
          0 0 0 2px var(--rds-color-surface-panel),
          0 0 0 4px var(--rds-color-border-focus);
      }
      
      :host([checked]) button {
        background: var(--rds-color-control-primary-bg);
      }
      
      .thumb {
        position: absolute;
        top: 2px;
        left: 2px;
        width: calc(var(--rds-space-5) - 4px);
        height: calc(var(--rds-space-5) - 4px);
        border-radius: var(--rds-radius-full);
        background: var(--rds-color-common-white, #fff);
        box-shadow: var(--rds-shadow-xs);
        transition: translate var(--rds-duration-fast) var(--rds-easing-standard);
      }
      
      :host([checked]) .thumb {
        translate: var(--rds-space-4) 0;
      }
      
      button:disabled {
        cursor: not-allowed;
        opacity: var(--rds-opacity-disabled);
      }
    `,
  ];

  declare checked: boolean;
  declare disabled: boolean;
  declare name: string;

  #internals = this.attachInternals();
  #button: HTMLButtonElement | null = null;

  constructor() {
    super();
    this.checked = false;
    this.disabled = false;
    this.name = '';

    this.addController(
      new ControlRelayController(this, {
        target: () => this.#button ?? this.renderRoot.querySelector('button'),
        attrs: { hostOnly: ['checked', 'disabled', 'name', 'aria-checked'] },
      }),
    );
  }

  protected override firstUpdated(): void {
    this.#button = this.renderRoot.querySelector('button');
  }

  #toggle() {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.#internals.setFormValue(this.checked ? 'on' : null);
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { checked: this.checked },
        bubbles: true,
        composed: true,
      }),
    );
  }

  override render() {
    return html`
      <button
        aria-checked=${this.checked ? 'true' : 'false'}
        ?disabled=${this.disabled}
        role="switch"
        type="button"
        @click=${this.#toggle}
      >
        <span class="thumb"></span>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rds-switch': RdsSwitch;
  }
}
