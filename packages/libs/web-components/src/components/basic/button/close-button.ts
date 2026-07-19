import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';

import { mixinDelegatesAria, type ARIAMixinStrict } from '../../../internal/mixin-delegates-aria';
import type { RcButtonSize } from './button';

const base = mixinDelegatesAria(RcStyledElement);

/**
 * Dismiss / close control (×). Defaults `aria-label` to "Close".
 *
 * @element rc-close-button
 */
export class RcCloseButton extends base {
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
        border: 0;
        border-radius: var(--rc-radius-md);
        background: transparent;
        color: var(--rc-color-text-secondary);
        font: inherit;
        line-height: 1;
        cursor: pointer;
      }
      
      :host([size='sm']) button {
        width: var(--rc-space-7);
        height: var(--rc-space-7);
        font-size: 1rem;
      }
      
      :host([size='md']) button,
      :host(:not([size])) button {
        width: var(--rc-space-8);
        height: var(--rc-space-8);
        font-size: 1.125rem;
      }
      
      :host([size='lg']) button {
        width: var(--rc-space-9);
        height: var(--rc-space-9);
        font-size: 1.25rem;
      }
      
      button:hover:not(:disabled) {
        background: var(--rc-color-action-bg-hover);
        color: var(--rc-color-text-primary);
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
  accessor size: RcButtonSize = 'md';

  @property({ type: Boolean, reflect: true })
  accessor disabled: boolean = false;

  override render() {
    const { ariaLabel } = this as ARIAMixinStrict;
    return html`
      <button part="control" type="button" aria-label=${ariaLabel || 'Close'} ?disabled=${this.disabled}>
        <span part="icon" aria-hidden="true">×</span>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-close-button': RcCloseButton;
  }
}
