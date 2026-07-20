import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';

import {
  delegateAria,
  mixinDelegatesAria,
  type ARIAMixinStrict,
} from '../../../internal/mixin-delegates-aria';
import type { RcButtonSize, RcButtonVariant } from './button';
import './icon-button.js';

const closeBase = mixinDelegatesAria(RcStyledElement);

/**
 * Dismiss / close control (×). Defaults `aria-label` to "Close".
 *
 * Composes `rc-icon-button` (which composes `rc-button`) and forwards ARIA onto it.
 * Slotted content replaces the default glyph.
 * Button CSS parts are forwarded; `icon` styles the default × glyph.
 *
 * @element rc-close-button
 * @slot - Optional custom icon content
 * @csspart control - Inner native button (from `rc-button`)
 * @csspart label - Icon slot wrapper (from `rc-button`)
 * @csspart spinner - Loading indicator (from `rc-button`)
 * @csspart icon - Default close glyph
 */
export class RcCloseButton extends closeBase {
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
    `,
  ];

  @property({ type: String, reflect: true })
  accessor size: RcButtonSize = 'md';

  @property({ type: String, reflect: true })
  accessor variant: RcButtonVariant = 'ghost';

  @property({ type: Boolean, reflect: true })
  accessor disabled: boolean = false;

  @property({ type: Boolean, reflect: true })
  accessor loading: boolean = false;

  override render() {
    const host = this as ARIAMixinStrict;

    return html`
      <rc-icon-button
        exportparts="control, label, spinner"
        ${delegateAria(host, {
          ariaLabel: host.ariaLabel || 'Close',
        })}
        size=${this.size}
        type="button"
        variant=${this.variant}
        ?disabled=${this.disabled}
        ?loading=${this.loading}
      >
        <slot>
          <span part="icon" aria-hidden="true">×</span>
        </slot>
      </rc-icon-button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-close-button': RcCloseButton;
  }
}
