import { LitElement, css, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';

import { hostStyles } from '../../../internal/shared-styles';

/**
 * Progress indicator backed by native `<progress>`.
 * Omit `value` (or set `indeterminate`) for an indeterminate bar.
 *
 * @element rds-progress
 */
export class RdsProgress extends LitElement {
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
      }
      
      progress {
        display: block;
        width: 100%;
        height: var(--rds-space-2);
        border: 0;
        border-radius: var(--rds-radius-full);
        overflow: hidden;
        accent-color: var(--rds-color-control-primary-bg);
        background: var(--rds-color-border-subtle);
      }
      
      progress::-webkit-progress-bar {
        background: var(--rds-color-border-subtle);
        border-radius: var(--rds-radius-full);
      }
      
      progress::-webkit-progress-value {
        background: var(--rds-color-control-primary-bg);
        border-radius: var(--rds-radius-full);
      }
      
      progress::-moz-progress-bar {
        background: var(--rds-color-control-primary-bg);
        border-radius: var(--rds-radius-full);
      }
    `,
  ];

  @property({ type: Number })
  accessor value: number = 0;

  @property({ type: Number, reflect: true })
  accessor max: number = 100;

  @property({ type: Boolean, reflect: true })
  accessor indeterminate: boolean = false;

  override render() {
    const hasValue = !this.indeterminate && !Number.isNaN(this.value);

    return html`
      <progress
        max=${this.max}
        value=${hasValue ? this.value : nothing}
        aria-valuemax=${this.max}
        aria-valuemin=${0}
        aria-valuenow=${hasValue ? this.value : nothing}
      ></progress>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rds-progress': RdsProgress;
  }
}
