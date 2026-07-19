import { css, html } from 'lit';
import { RcStyledElement } from '../../../internal/styled-element';

/**
 * Surface container for grouped content.
 *
 * @element rc-card
 * @slot - Card body
 * @slot header - Optional header region
 * @slot footer - Optional footer region
 */
export class RcCard extends RcStyledElement {
  static override styles = [
    css`
      :host {
        display: block;
        height: 100%;
        box-sizing: border-box;
      }
      
      .root {
        display: grid;
        align-content: start;
        gap: var(--rc-space-3);
        box-sizing: border-box;
        height: 100%;
        border: var(--rc-border-sm) solid var(--rc-color-border-subtle);
        border-radius: var(--rc-radius-xl);
        background: var(--rc-color-surface-panel);
        padding: var(--rc-space-4, 1rem);
        box-shadow: var(--rc-shadow-surface);
        color: var(--rc-color-text-primary);
      }
      
      ::slotted([slot='header']) {
        display: grid;
        gap: var(--rc-space-1);
      }
      
      ::slotted([slot='footer']) {
        display: grid;
        gap: var(--rc-space-1);
        padding-top: var(--rc-space-1);
        border-top: var(--rc-border-sm) solid var(--rc-color-border-subtle);
      }
    `,
  ];

  override render() {
    return html`
      <div class="root" part="container root">
        <slot name="header"></slot>
        <slot></slot>
        <slot name="footer"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-card': RcCard;
  }
}
