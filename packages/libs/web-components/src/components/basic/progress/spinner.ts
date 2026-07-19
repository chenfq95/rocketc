import { css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';

export type RcSpinnerSize = 'sm' | 'md' | 'lg';

/**
 * Indeterminate loading spinner.
 *
 * @element rc-spinner
 */
export class RcSpinner extends RcStyledElement {
  static override styles = [
    css`
      :host {
        display: inline-flex;
        vertical-align: middle;
      }
      
      .spinner {
        display: block;
        border: var(--rc-border-md, 2px) solid var(--rc-color-border-subtle);
        border-top-color: var(--rc-color-control-primary-bg);
        border-radius: 50%;
        animation: spin var(--rc-duration-slow, 0.7s) linear infinite;
      }
      
      :host([size='sm']) .spinner {
        width: var(--rc-space-4);
        height: var(--rc-space-4);
      }
      
      :host([size='md']) .spinner,
      :host(:not([size])) .spinner {
        width: var(--rc-space-6);
        height: var(--rc-space-6);
      }
      
      :host([size='lg']) .spinner {
        width: var(--rc-space-8);
        height: var(--rc-space-8);
      }
      
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `,
  ];

  @property({ type: String, reflect: true })
  accessor size: RcSpinnerSize = 'md';

  @property({ type: String, reflect: true })
  accessor label: string = 'Loading';

  override render() {
    return html`<span class="spinner" part="spinner" role="status" aria-label=${this.label}></span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-spinner': RcSpinner;
  }
}
