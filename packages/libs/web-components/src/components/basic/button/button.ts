import { LitElement, css, html, nothing, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';

import {
  delegateAria,
  mixinDelegatesAria,
  type ARIAMixinStrict,
} from '../../../internal/mixin-delegates-aria';

export type RcButtonVariant = 'solid' | 'subtle' | 'outline' | 'ghost' | 'destructive';
export type RcButtonSize = 'sm' | 'md' | 'lg';

const buttonBase = mixinDelegatesAria(RcStyledElement);

/**
 * Primary action control. Visuals resolve through `color.control.*` /
 * `color.danger.*` semantic tokens.
 *
 * Host API props (`variant` / `size` / `loading` / `icon`) stay on the host.
 * ARIA on the host is delegated to the inner `<button>` via
 * `mixinDelegatesAria` (host stores `data-aria-*`, template binds inward).
 * Interactive events are composed and surface on the host (retargeted).
 *
 * Prefer decorative icons in `prefix` / `suffix` (mark them `aria-hidden`).
 * Use `icon` for square icon-only actions (prefer an explicit `aria-label`).
 * While `loading`, a spinner overlays the content; label / prefix / suffix stay in place.
 *
 * @element rc-button
 * @slot - Button label / icon content
 * @slot prefix - Leading icon or media before the label (ignored when `icon`)
 * @slot suffix - Trailing icon or media after the label (ignored when `icon`)
 * @csspart control - Inner native button
 * @csspart prefix - Leading affix wrapper
 * @csspart label - Default slot wrapper
 * @csspart suffix - Trailing affix wrapper
 * @csspart spinner - Loading indicator
 */
export class RcButton extends buttonBase {
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
      
      button {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--rc-space-2);
        width: 100%;
        margin: 0;
        border-style: solid;
        border-color: transparent;
        border-width: var(--rc-border-sm);
        border-inline-end-width: var(--rc-button-border-inline-end, var(--rc-border-sm));
        border-block-end-width: var(--rc-button-border-block-end, var(--rc-border-sm));
        border-start-start-radius: var(--rc-button-radius-ss, var(--rc-radius-md));
        border-start-end-radius: var(--rc-button-radius-se, var(--rc-radius-md));
        border-end-end-radius: var(--rc-button-radius-ee, var(--rc-radius-md));
        border-end-start-radius: var(--rc-button-radius-es, var(--rc-radius-md));
        font: inherit;
        font-weight: var(--rc-typography-weight-medium);
        letter-spacing: var(--rc-typography-label-letter-spacing);
        cursor: pointer;
        transition:
          background-color var(--rc-duration-fast) var(--rc-easing-standard),
          border-color var(--rc-duration-fast) var(--rc-easing-standard),
          color var(--rc-duration-fast) var(--rc-easing-standard),
          opacity var(--rc-duration-fast) var(--rc-easing-standard);
      }
      
      button:focus-visible {
        outline: none;
        box-shadow:
          0 0 0 2px var(--rc-color-surface-panel),
          0 0 0 4px var(--rc-color-border-focus);
      }
      
      .affix {
        display: inline-flex;
        flex-shrink: 0;
        align-items: center;
        justify-content: center;
        line-height: 1;
      }
      
      .spinner {
        position: absolute;
        inset: 0;
        z-index: 1;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
      }
      
      .spinner-circle {
        box-sizing: border-box;
        width: 1em;
        height: 1em;
        border: var(--rc-border-md, 2px) solid currentColor;
        border-right-color: transparent;
        border-radius: 50%;
        animation: rc-button-spin var(--rc-duration-slow, 0.7s) linear infinite;
      }
      
      @keyframes rc-button-spin {
        to {
          transform: rotate(360deg);
        }
      }
      
      :host([loading]) .prefix,
      :host([loading]) .label,
      :host([loading]) .suffix {
        opacity: var(--rc-opacity-disabled);
      }
      
      .label {
        display: inline-flex;
        align-items: center;
        min-width: 0;
      }
      
      :host(:not(:has([slot='prefix']))) .prefix,
      :host(:not(:has([slot='suffix']))) .suffix,
      :host([icon]) .prefix,
      :host([icon]) .suffix {
        display: none;
      }
      
      :host([size='sm']) button {
        min-height: var(--rc-space-7);
        padding: 0 var(--rc-space-2);
        font-size: var(--rc-typography-caption-font-size);
      }
      
      :host([size='md']) button,
      :host(:not([size])) button {
        min-height: var(--rc-space-8);
        padding: 0 var(--rc-space-3);
        font-size: var(--rc-typography-label-font-size);
      }
      
      :host([size='lg']) button {
        min-height: var(--rc-space-9);
        padding: 0 var(--rc-space-4);
        font-size: var(--rc-typography-body-font-size);
      }
      
      :host([icon]) button {
        width: var(--rc-space-8);
        height: var(--rc-space-8);
        min-height: 0;
        padding: 0;
        gap: 0;
        font-weight: inherit;
        letter-spacing: normal;
        line-height: 1;
      }
      
      :host([icon]) .label {
        justify-content: center;
        line-height: 1;
      }
      
      :host([icon][size='sm']) button {
        width: var(--rc-space-7);
        height: var(--rc-space-7);
      }
      
      :host([icon][size='md']) button,
      :host([icon]:not([size])) button {
        width: var(--rc-space-8);
        height: var(--rc-space-8);
      }
      
      :host([icon][size='lg']) button {
        width: var(--rc-space-9);
        height: var(--rc-space-9);
      }
      
      :host([size='sm']) .affix,
      :host([size='sm']) .spinner {
        font-size: var(--rc-typography-caption-font-size);
      }
      
      :host([size='md']) .affix,
      :host(:not([size])) .affix,
      :host([size='md']) .spinner,
      :host(:not([size])) .spinner {
        font-size: var(--rc-typography-label-font-size);
      }
      
      :host([size='lg']) .affix,
      :host([size='lg']) .spinner {
        font-size: var(--rc-typography-body-font-size);
      }
      
      ::slotted(svg[slot='prefix']),
      ::slotted(svg[slot='suffix']),
      ::slotted(img[slot='prefix']),
      ::slotted(img[slot='suffix']),
      :host([icon]) ::slotted(svg),
      :host([icon]) ::slotted(img) {
        display: block;
        width: 1em;
        height: 1em;
      }
      
      :host([variant='solid']) button,
      :host(:not([variant])) button {
        background: var(--rc-color-control-primary-bg);
        border-color: var(--rc-color-control-primary-border);
        color: var(--rc-color-control-primary-fg-contrast);
      }
      
      :host([variant='solid']) button:hover:not(:disabled),
      :host(:not([variant])) button:hover:not(:disabled) {
        background: var(--rc-color-control-primary-bg-hover);
        border-color: var(--rc-color-control-primary-border-hover);
      }
      
      :host([variant='solid']) button:active:not(:disabled),
      :host(:not([variant])) button:active:not(:disabled) {
        background: var(--rc-color-control-primary-bg-active);
      }
      
      :host([variant='subtle']) button {
        background: var(--rc-color-control-secondary-bg-hover);
        border-color: transparent;
        color: var(--rc-color-control-secondary-fg);
      }
      
      :host([variant='subtle']) button:hover:not(:disabled) {
        background: var(--rc-color-control-secondary-bg-active);
      }
      
      :host([variant='outline']) button {
        background: transparent;
        border-color: var(--rc-color-control-secondary-border);
        color: var(--rc-color-control-secondary-fg);
      }
      
      :host([variant='outline']) button:hover:not(:disabled) {
        background: var(--rc-color-action-bg-hover);
        border-color: var(--rc-color-control-secondary-border-hover);
      }
      
      :host([variant='ghost']) button {
        background: transparent;
        border-color: transparent;
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
      
      :host([variant='destructive']) button:hover:not(:disabled) {
        background: var(--rc-color-danger-solid-hover);
        border-color: var(--rc-color-danger-solid-hover);
      }
      
      button:disabled {
        cursor: not-allowed;
        opacity: var(--rc-opacity-disabled);
      }
    `,
  ];

  @property({ type: String, reflect: true })
  accessor variant: RcButtonVariant = 'solid';

  @property({ type: String, reflect: true })
  accessor size: RcButtonSize = 'md';

  @property({ type: String, reflect: true })
  accessor type: 'button' | 'submit' | 'reset' = 'button';

  @property({ type: String, reflect: true })
  accessor name: string = '';

  @property({ type: String, reflect: true })
  accessor value: string = '';

  @property({ type: String, reflect: true })
  accessor form: string = '';

  @property({ type: Boolean, reflect: true })
  accessor disabled: boolean = false;

  @property({ type: Boolean, reflect: true })
  accessor loading: boolean = false;

  /** Square icon-only control. Prefer an explicit `aria-label`. */
  @property({ type: Boolean, reflect: true })
  accessor icon: boolean = false;

  @property({ type: Boolean, reflect: true })
  accessor autofocus: boolean = false;

  /** Default `aria-label` when the host does not provide one. */
  protected get defaultAriaLabel(): string | undefined {
    return undefined;
  }

  protected renderSpinner() {
    return html`
      <span class="spinner" part="spinner" aria-hidden="true">
        <span class="spinner-circle"></span>
      </span>
    `;
  }

  protected renderContent(): TemplateResult {
    return html`
      ${this.loading ? this.renderSpinner() : nothing}
      ${
        this.icon
          ? html`
              <span class="label" part="label">
                <slot></slot>
              </span>
            `
          : html`
              <span class="affix prefix" part="prefix">
                <slot name="prefix"></slot>
              </span>
              <span class="label" part="label">
                <slot></slot>
              </span>
              <span class="affix suffix" part="suffix">
                <slot name="suffix"></slot>
              </span>
            `
      }
    `;
  }

  override render() {
    const host = this as ARIAMixinStrict;

    return html`
      <button
        part="control"
        ${delegateAria(host, {
          ariaBusy: this.loading ? 'true' : host.ariaBusy,
          ariaLabel: host.ariaLabel || this.defaultAriaLabel || null,
        })}
        ?autofocus=${this.autofocus}
        ?disabled=${this.disabled || this.loading}
        form=${this.form || nothing}
        name=${this.name || nothing}
        type=${this.type}
        value=${this.value || nothing}
      >
        ${this.renderContent()}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-button': RcButton;
  }
}
