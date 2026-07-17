import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { hostStyles } from '../../../internal/shared-styles';

export type RdsSpinnerSize = 'sm' | 'md' | 'lg';

/**
 * Indeterminate loading spinner.
 *
 * @element rds-spinner
 */
export class RdsSpinner extends LitElement {
  static override styles = [
    hostStyles,
    css`
      :host {
        display: inline-flex;
        vertical-align: middle;
      }
      
      .spinner {
        display: block;
        border: var(--rds-border-md, 2px) solid var(--rds-color-border-subtle);
        border-top-color: var(--rds-color-control-primary-bg);
        border-radius: 50%;
        animation: spin var(--rds-duration-slow, 0.7s) linear infinite;
      }
      
      :host([size='sm']) .spinner {
        width: var(--rds-space-4);
        height: var(--rds-space-4);
      }
      
      :host([size='md']) .spinner,
      :host(:not([size])) .spinner {
        width: var(--rds-space-6);
        height: var(--rds-space-6);
      }
      
      :host([size='lg']) .spinner {
        width: var(--rds-space-8);
        height: var(--rds-space-8);
      }
      
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `,
  ];

  @property({ type: String, reflect: true })
  accessor size: RdsSpinnerSize = 'md';

  @property({ type: String, reflect: true })
  accessor label: string = 'Loading';

  override render() {
    return html`<span class="spinner" role="status" aria-label=${this.label}></span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rds-spinner': RdsSpinner;
  }
}
