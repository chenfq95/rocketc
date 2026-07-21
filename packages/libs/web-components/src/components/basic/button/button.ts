import { isServer, LitElement, css, html, nothing, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';

import { dispatchActivationClick, isActivationClick } from '../../../internal/activation-click';
import { afterDispatch } from '../../../internal/dispatch-hooks';
import { RcStyledElement } from '../../../internal/styled-element';
import { mixinElementInternals } from '../../../internal/mixin-element-internals';
import {
  formDisabled,
  formValidationCandidate,
  mixinFormAssociated,
} from '../../../internal/mixin-form-associated';
import { formSubmitterCandidate, mixinFormSubmitter } from '../../../internal/mixin-form-submitter';

import {
  delegateAria,
  mixinDelegatesAria,
  type ARIAMixinStrict,
} from '../../../internal/mixin-delegates-aria';

export type RcButtonVariant = 'solid' | 'subtle' | 'outline' | 'ghost' | 'destructive';
export type RcButtonSize = 'sm' | 'md' | 'lg';

type ButtonActionTarget = Element & {
  open?: boolean;
  showModal?: () => void;
  close?: () => void;
  requestClose?: () => void;
  showPopover?: () => void;
  hidePopover?: () => void;
  togglePopover?: () => void;
  show?: () => void;
  hide?: () => void;
  toggle?: () => void;
};

interface CommandEventConstructor {
  new (type: string, init: EventInit & { command: string; source: Element }): Event;
}

const commandEventConstructor: CommandEventConstructor | undefined = Reflect.get(
  globalThis,
  'CommandEvent',
);

const builtInCommands = new Set([
  'show-modal',
  'close',
  'request-close',
  'show-popover',
  'hide-popover',
  'toggle-popover',
]);

const buttonBase = mixinDelegatesAria(
  mixinFormSubmitter(mixinFormAssociated(mixinElementInternals(RcStyledElement))),
);

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
      
      .control {
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
        text-decoration: none;
        cursor: pointer;
        transition:
          background-color var(--rc-duration-fast) var(--rc-easing-standard),
          border-color var(--rc-duration-fast) var(--rc-easing-standard),
          color var(--rc-duration-fast) var(--rc-easing-standard),
          opacity var(--rc-duration-fast) var(--rc-easing-standard);
      }
      
      .control:focus-visible {
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
      
      :host([size='sm']) .control {
        min-height: var(--rc-space-7);
        padding: 0 var(--rc-space-2);
        font-size: var(--rc-typography-caption-font-size);
      }
      
      :host([size='md']) .control,
      :host(:not([size])) .control {
        min-height: var(--rc-space-8);
        padding: 0 var(--rc-space-3);
        font-size: var(--rc-typography-label-font-size);
      }
      
      :host([size='lg']) .control {
        min-height: var(--rc-space-9);
        padding: 0 var(--rc-space-4);
        font-size: var(--rc-typography-body-font-size);
      }
      
      :host([icon]) .control {
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
      
      :host([icon][size='sm']) .control {
        width: var(--rc-space-7);
        height: var(--rc-space-7);
      }
      
      :host([icon][size='md']) .control,
      :host([icon]:not([size])) .control {
        width: var(--rc-space-8);
        height: var(--rc-space-8);
      }
      
      :host([icon][size='lg']) .control {
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
      
      :host([variant='solid']) .control,
      :host(:not([variant])) .control {
        background: var(--rc-color-control-primary-bg);
        border-color: var(--rc-color-control-primary-border);
        color: var(--rc-color-control-primary-fg-contrast);
      }
      
      :host([variant='solid']) .control:hover:not(:disabled):not([aria-disabled='true']),
      :host(:not([variant])) .control:hover:not(:disabled):not([aria-disabled='true']) {
        background: var(--rc-color-control-primary-bg-hover);
        border-color: var(--rc-color-control-primary-border-hover);
      }
      
      :host([variant='solid']) .control:active:not(:disabled):not([aria-disabled='true']),
      :host(:not([variant])) .control:active:not(:disabled):not([aria-disabled='true']) {
        background: var(--rc-color-control-primary-bg-active);
      }
      
      :host([variant='subtle']) .control {
        background: var(--rc-color-control-secondary-bg-hover);
        border-color: transparent;
        color: var(--rc-color-control-secondary-fg);
      }
      
      :host([variant='subtle']) .control:hover:not(:disabled):not([aria-disabled='true']) {
        background: var(--rc-color-control-secondary-bg-active);
      }
      
      :host([variant='outline']) .control {
        background: transparent;
        border-color: var(--rc-color-control-secondary-border);
        color: var(--rc-color-control-secondary-fg);
      }
      
      :host([variant='outline']) .control:hover:not(:disabled):not([aria-disabled='true']) {
        background: var(--rc-color-action-bg-hover);
        border-color: var(--rc-color-control-secondary-border-hover);
      }
      
      :host([variant='ghost']) .control {
        background: transparent;
        border-color: transparent;
        color: var(--rc-color-text-primary);
      }
      
      :host([variant='ghost']) .control:hover:not(:disabled):not([aria-disabled='true']) {
        background: var(--rc-color-action-bg-hover);
      }
      
      :host([variant='destructive']) .control {
        background: var(--rc-color-danger-solid);
        border-color: var(--rc-color-danger-solid);
        color: var(--rc-color-danger-contrast);
      }
      
      :host([variant='destructive']) .control:hover:not(:disabled):not([aria-disabled='true']) {
        background: var(--rc-color-danger-solid-hover);
        border-color: var(--rc-color-danger-solid-hover);
      }
      
      .control:disabled,
      .control[aria-disabled='true'] {
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
  accessor href: string = '';

  @property({ type: String, reflect: true })
  accessor target: string = '';

  @property({ type: String, reflect: true })
  accessor download: string = '';

  @property({ type: String, reflect: true })
  accessor command: string = '';

  @property({ type: String, attribute: 'commandfor', reflect: true })
  accessor commandFor: string = '';

  @property({ type: String, attribute: 'popovertarget', reflect: true })
  accessor popoverTarget: string = '';

  @property({ type: String, attribute: 'popovertargetaction', reflect: true })
  accessor popoverTargetAction: string = '';

  @property({ type: Boolean, reflect: true })
  accessor loading: boolean = false;

  /** Square icon-only control. Prefer an explicit `aria-label`. */
  @property({ type: Boolean, reflect: true })
  accessor icon: boolean = false;

  @property({ type: Boolean, reflect: true })
  accessor autofocus: boolean = false;

  constructor() {
    super();
    if (isServer) return;
    this.addEventListener('click', this.#handleClick);
  }

  override click(): void {
    if (this[formDisabled] || this.loading) return;
    super.click();
  }

  override focus(options?: FocusOptions): void {
    if (this[formDisabled] || this.loading) return;
    this.#control?.focus(options);
  }

  override blur(): void {
    this.#control?.blur();
  }

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

  [formValidationCandidate](): boolean {
    return !this.href && this.type === 'submit';
  }

  [formSubmitterCandidate](): boolean {
    return !this.href;
  }

  get #control(): HTMLElement | null {
    return this.renderRoot.querySelector<HTMLElement>('[part="control"]');
  }

  #handleClick = (event: MouseEvent): void => {
    const activateControl = isActivationClick(event);

    afterDispatch(event, () => {
      if (event.defaultPrevented || this[formDisabled] || this.loading) return;
      if (activateControl) {
        this.focus();
        if (this.#control) dispatchActivationClick(this.#control);
      }
      if (!this.href) this.#performTargetAction();
    });
  };

  #performTargetAction(): void {
    if (this.type !== 'button') return;
    if (this.command && this.commandFor) {
      this.#performCommand();
      return;
    }
    if (this.popoverTarget) this.#performPopoverAction();
  }

  #performCommand(): void {
    const command = this.command;
    if (!builtInCommands.has(command) && !command.startsWith('--')) return;

    const target = this.#resolveTarget(this.commandFor);
    if (!target) return;

    const event = this.#createCommandEvent(command);
    if (!target.dispatchEvent(event) || command.startsWith('--')) return;

    const actionTarget = target as ButtonActionTarget;
    switch (command) {
      case 'show-modal':
        if (!actionTarget.open) actionTarget.showModal?.();
        break;
      case 'close':
        actionTarget.close?.();
        break;
      case 'request-close':
        if (actionTarget.requestClose) actionTarget.requestClose();
        else actionTarget.close?.();
        break;
      case 'show-popover':
        this.#showPopover(actionTarget);
        break;
      case 'hide-popover':
        this.#hidePopover(actionTarget);
        break;
      case 'toggle-popover':
        this.#togglePopover(actionTarget);
        break;
    }
  }

  #performPopoverAction(): void {
    const target = this.#resolveTarget(this.popoverTarget) as ButtonActionTarget | null;
    if (!target) return;

    switch (this.popoverTargetAction) {
      case 'show':
        this.#showPopover(target);
        break;
      case 'hide':
        this.#hidePopover(target);
        break;
      default:
        this.#togglePopover(target);
    }
  }

  #showPopover(target: ButtonActionTarget): void {
    if (target.showPopover) target.showPopover();
    else target.show?.();
  }

  #hidePopover(target: ButtonActionTarget): void {
    if (target.hidePopover) target.hidePopover();
    else target.hide?.();
  }

  #togglePopover(target: ButtonActionTarget): void {
    if (target.togglePopover) target.togglePopover();
    else target.toggle?.();
  }

  #resolveTarget(id: string): Element | null {
    const root = this.getRootNode();
    if ('getElementById' in root && typeof root.getElementById === 'function') {
      return root.getElementById(id);
    }
    return null;
  }

  #createCommandEvent(command: string): Event {
    if (commandEventConstructor) {
      return new commandEventConstructor('command', {
        cancelable: true,
        command,
        source: this,
      });
    }

    const event = new Event('command', { cancelable: true });
    Object.defineProperties(event, {
      command: { configurable: true, enumerable: true, value: command },
      source: { configurable: true, enumerable: true, value: this },
    });
    return event;
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
    const disabled = this[formDisabled] || this.loading;

    if (this.href) {
      return html`
        <a
          class="control"
          part="control"
          ${delegateAria(host, {
            ariaBusy: this.loading ? 'true' : host.ariaBusy,
            ariaDisabled: disabled ? 'true' : host.ariaDisabled,
            ariaLabel: host.ariaLabel || this.defaultAriaLabel || null,
          })}
          download=${this.download || nothing}
          href=${disabled ? nothing : this.href}
          target=${this.target || nothing}
          tabindex=${disabled ? -1 : nothing}
        >
          ${this.renderContent()}
        </a>
      `;
    }

    return html`
      <button
        class="control"
        part="control"
        ${delegateAria(host, {
          ariaBusy: this.loading ? 'true' : host.ariaBusy,
          ariaLabel: host.ariaLabel || this.defaultAriaLabel || null,
        })}
        ?autofocus=${this.autofocus}
        ?disabled=${this[formDisabled] || this.loading}
        formaction=${this.formAction || nothing}
        formenctype=${this.formEnctype || nothing}
        formmethod=${this.formMethod || nothing}
        ?formnovalidate=${this.formNoValidate}
        formtarget=${this.formTarget || nothing}
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
