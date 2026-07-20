import { css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';

export type RcButtonGroupOrientation = 'horizontal' | 'vertical';

/**
 * Groups related action buttons. Prefer an accessible name (`aria-label`).
 *
 * Compose with `rc-button`, `rc-icon-button`, and/or `rc-close-button`.
 * By default adjacent borders collapse into one segmented control; set
 * `separated` to keep spacing between buttons.
 *
 * @element rc-button-group
 * @slot - Grouped buttons
 * @csspart root - Flex layout container
 */
export class RcButtonGroup extends RcStyledElement {
  static override styles = [
    css`
      :host {
        display: inline-flex;
        max-width: 100%;
        vertical-align: middle;
      }
      
      :host([full-width]) {
        display: flex;
        width: 100%;
      }
      
      .root {
        display: flex;
        flex-direction: row;
        align-items: stretch;
        width: 100%;
        gap: 0;
      }
      
      :host([orientation='vertical']) .root {
        flex-direction: column;
      }
      
      :host([separated]) .root {
        gap: var(--rc-space-2);
      }
      
      ::slotted(rc-button),
      ::slotted(rc-icon-button),
      ::slotted(rc-close-button) {
        position: relative;
        z-index: 0;
      }
      
      /* Raise the active item so its full border paints above the neighbor. */
      :host(:not([separated])) ::slotted(rc-button:hover),
      :host(:not([separated])) ::slotted(rc-button:focus-within),
      :host(:not([separated])) ::slotted(rc-icon-button:hover),
      :host(:not([separated])) ::slotted(rc-icon-button:focus-within),
      :host(:not([separated])) ::slotted(rc-close-button:hover),
      :host(:not([separated])) ::slotted(rc-close-button:focus-within) {
        z-index: 1;
      }
      
      /* Horizontal attached */
      :host(:not([separated]):not([orientation='vertical']))
        ::slotted(
          :is(rc-button, rc-icon-button, rc-close-button):not(
            :nth-child(1 of rc-button, rc-icon-button, rc-close-button)
          )
        ) {
        margin-inline-start: calc(-1 * var(--rc-border-sm));
        --rc-button-radius-ss: 0;
        --rc-button-radius-es: 0;
      }
      
      :host(:not([separated]):not([orientation='vertical']))
        ::slotted(
          :is(rc-button, rc-icon-button, rc-close-button):not(
            :nth-last-child(1 of rc-button, rc-icon-button, rc-close-button)
          )
        ) {
        --rc-button-radius-se: 0;
        --rc-button-radius-ee: 0;
      }
      
      /* Vertical attached */
      :host(:not([separated])[orientation='vertical'])
        ::slotted(
          :is(rc-button, rc-icon-button, rc-close-button):not(
            :nth-child(1 of rc-button, rc-icon-button, rc-close-button)
          )
        ) {
        margin-block-start: calc(-1 * var(--rc-border-sm));
        --rc-button-radius-ss: 0;
        --rc-button-radius-se: 0;
      }
      
      :host(:not([separated])[orientation='vertical'])
        ::slotted(
          :is(rc-button, rc-icon-button, rc-close-button):not(
            :nth-last-child(1 of rc-button, rc-icon-button, rc-close-button)
          )
        ) {
        --rc-button-radius-es: 0;
        --rc-button-radius-ee: 0;
      }
    `,
  ];

  /** Lay out children in a row or column. */
  @property({ type: String, reflect: true })
  accessor orientation: RcButtonGroupOrientation = 'horizontal';

  /** Keep spacing between buttons instead of attaching their edges. */
  @property({ type: Boolean, reflect: true })
  accessor separated: boolean = false;

  @property({ type: Boolean, attribute: 'full-width', reflect: true })
  accessor fullWidth: boolean = false;

  override connectedCallback(): void {
    super.connectedCallback();
    if (!this.role) this.role = 'group';
  }

  override render() {
    return html`
      <div class="root" part="root">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-button-group': RcButtonGroup;
  }
}
