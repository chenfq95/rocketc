import { LitElement, css, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';

import { mixinDelegatesAria, type ARIAMixinStrict } from '../../../internal/mixin-delegates-aria';
import type { RcButtonSize, RcButtonVariant } from './button';

const base = mixinDelegatesAria(RcStyledElement);

/**
 * Icon-only action button. Prefer an explicit `aria-label`.
 *
 * @element rc-icon-button
 * @slot - Icon content
 */
export class RcIconButton extends base {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  static override styles = [
    css`
      :host {
        display: inline-flex;
        vertical-align: middle;
      }
      
      button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin: 0;
        border: var(--rc-border-sm) solid transparent;
        border-radius: var(--rc-radius-md);
        font: inherit;
        cursor: pointer;
        transition:
          background-color var(--rc-duration-fast) var(--rc-easing-standard),
          border-color var(--rc-duration-fast) var(--rc-easing-standard),
          color var(--rc-duration-fast) var(--rc-easing-standard);
      }
      
      :host([size='sm']) button {
        width: var(--rc-space-7);
        height: var(--rc-space-7);
        font-size: var(--rc-typography-caption-font-size);
      }
      
      :host([size='md']) button,
      :host(:not([size])) button {
        width: var(--rc-space-8);
        height: var(--rc-space-8);
        font-size: var(--rc-typography-label-font-size);
      }
      
      :host([size='lg']) button {
        width: var(--rc-space-9);
        height: var(--rc-space-9);
        font-size: var(--rc-typography-body-font-size);
      }
      
      :host([variant='solid']) button,
      :host(:not([variant])) button {
        background: var(--rc-color-control-primary-bg);
        border-color: var(--rc-color-control-primary-border);
        color: var(--rc-color-control-primary-fg-contrast);
      }
      
      :host([variant='subtle']) button {
        background: var(--rc-color-control-secondary-bg-hover);
        color: var(--rc-color-control-secondary-fg);
      }
      
      :host([variant='outline']) button {
        background: transparent;
        border-color: var(--rc-color-control-secondary-border);
        color: var(--rc-color-control-secondary-fg);
      }
      
      :host([variant='ghost']) button {
        background: transparent;
        color: var(--rc-color-text-primary);
      }
      
      :host([variant='ghost']) button:hover:not(:disabled) {
        background: var(--rc-color-action-bg-hover);
      }
      
      :host([variant='destructive']) button {
        background: var(--rc-color-danger-solid);
        border-color: var(--rc-color-danger-solid);
        color: var(--rc-color-danger-contrast);
      }
      
      button:focus-visible {
        outline: none;
        box-shadow:
          0 0 0 2px var(--rc-color-surface-panel),
          0 0 0 4px var(--rc-color-border-focus);
      }
      
      button:disabled {
        cursor: not-allowed;
        opacity: var(--rc-opacity-disabled);
      }
    `,
  ];

  @property({ type: String, reflect: true })
  accessor variant: RcButtonVariant = 'ghost';

  @property({ type: String, reflect: true })
  accessor size: RcButtonSize = 'md';

  @property({ type: String, reflect: true })
  accessor type: 'button' | 'submit' | 'reset' = 'button';

  @property({ type: Boolean, reflect: true })
  accessor disabled: boolean = false;

  @property({ type: Boolean, reflect: true })
  accessor loading: boolean = false;

  override render() {
    const { ariaLabel } = this as ARIAMixinStrict;
    return html`
      <button part="control"
        type=${this.type}
        aria-label=${ariaLabel || nothing}
        aria-busy=${this.loading ? 'true' : nothing}
        ?disabled=${this.disabled || this.loading}
      >
        ${
          this.loading
            ? html`
                <span part="spinner" aria-hidden="true">…</span>
              `
            : html`
                <slot></slot>
              `
        }
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-icon-button': RcIconButton;
  }
}
