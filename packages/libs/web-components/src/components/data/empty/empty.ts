import { css, html } from 'lit';
import { RcStyledElement } from '../../../internal/styled-element';

/**
 * Empty-state placeholder for lists / pages with no data.
 *
 * @element rc-empty
 * @slot - Description
 * @slot title - Title text
 * @slot action - Optional CTA
 * @slot icon - Optional illustration / icon
 */
export class RcEmpty extends RcStyledElement {
  static override styles = [
    css`
      :host {
        display: grid;
        place-items: center;
        text-align: center;
      }
      
      .root {
        display: grid;
        gap: var(--rc-space-3);
        justify-items: center;
        max-width: 24rem;
        padding: var(--rc-space-8) var(--rc-space-4);
        color: var(--rc-color-text-secondary);
      }
      
      .icon {
        display: grid;
        place-items: center;
        width: var(--rc-space-12, 3rem);
        height: var(--rc-space-12, 3rem);
        border-radius: var(--rc-radius-full);
        background: var(--rc-color-action-bg-hover);
        color: var(--rc-color-text-muted);
        font-size: var(--rc-typography-title-font-size, 1.25rem);
      }
      
      .title {
        margin: 0;
        color: var(--rc-color-text-primary);
        font-size: var(--rc-typography-heading-font-size, var(--rc-typography-body-font-size));
        font-weight: var(--rc-typography-weight-semibold);
      }
      
      .body {
        font-size: var(--rc-typography-body-small-font-size);
      }
    `,
  ];

  override render() {
    return html`
      <div class="root" part="container root">
        <div class="icon" part="icon"><slot name="icon">∅</slot></div>
        <h3 class="title" part="title"><slot name="title">Nothing here</slot></h3>
        <div class="body" part="body"><slot></slot></div>
        <slot name="action"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-empty': RcEmpty;
  }
}
