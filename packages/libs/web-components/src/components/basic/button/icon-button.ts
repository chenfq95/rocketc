import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';

import {
  delegateAria,
  mixinDelegatesAria,
  type ARIAMixinStrict,
} from '../../../internal/mixin-delegates-aria';
import type { RcButtonSize, RcButtonVariant } from './button';
import './button.js';

const iconButtonBase = mixinDelegatesAria(RcStyledElement);

/**
 * Icon-only action button. Prefer an explicit `aria-label`.
 *
 * Composes `rc-button` with `icon` enabled and `variant="ghost"` by default.
 * Pass icon content through the default slot (SVG, img, or other markup).
 * CSS parts are forwarded from the inner `rc-button`.
 *
 * @element rc-icon-button
 * @slot - Icon content
 * @csspart control - Inner native button (from `rc-button`)
 * @csspart label - Icon slot wrapper (from `rc-button`)
 * @csspart spinner - Loading indicator (from `rc-button`)
 */
export class RcIconButton extends iconButtonBase {
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
      
      :host(:focus-within) {
        z-index: 1;
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

  @property({ type: Boolean, reflect: true })
  accessor autofocus: boolean = false;

  override render() {
    const host = this as ARIAMixinStrict;

    return html`
      <rc-button
        exportparts="control, label, spinner"
        ${delegateAria(host)}
        icon
        size=${this.size}
        type=${this.type}
        variant=${this.variant}
        ?autofocus=${this.autofocus}
        ?disabled=${this.disabled}
        ?loading=${this.loading}
      >
        <slot></slot>
      </rc-button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-icon-button': RcIconButton;
  }
}
