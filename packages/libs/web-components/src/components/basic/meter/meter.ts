import { LitElement, css, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';

import { hostStyles } from '../../../internal/shared-styles';

/**
 * Scalar gauge backed by native `<meter>`.
 *
 * @element rds-meter
 */
export class RdsMeter extends LitElement {
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
      }
      
      meter {
        display: block;
        width: 100%;
        height: var(--rds-space-2);
        border: 0;
        border-radius: var(--rds-radius-full);
        overflow: hidden;
        background: var(--rds-color-border-subtle);
      }
      
      meter::-webkit-meter-bar {
        background: var(--rds-color-border-subtle);
        border: 0;
        border-radius: var(--rds-radius-full);
      }
      
      meter::-webkit-meter-optimum-value {
        background: var(--rds-color-success-solid);
        border-radius: var(--rds-radius-full);
      }
      
      meter::-webkit-meter-suboptimum-value {
        background: var(--rds-color-warning-solid);
        border-radius: var(--rds-radius-full);
      }
      
      meter::-webkit-meter-even-less-good-value {
        background: var(--rds-color-danger-solid);
        border-radius: var(--rds-radius-full);
      }
      
      meter::-moz-meter-bar {
        background: var(--rds-color-control-primary-bg);
        border-radius: var(--rds-radius-full);
      }
    `,
  ];

  @property({ type: Number, reflect: true })
  accessor value: number = 0;

  @property({ type: Number, reflect: true })
  accessor min: number = 0;

  @property({ type: Number, reflect: true })
  accessor max: number = 1;

  @property({ type: Number, reflect: true })
  accessor low: number = Number.NaN;

  @property({ type: Number, reflect: true })
  accessor high: number = Number.NaN;

  @property({ type: Number, reflect: true })
  accessor optimum: number = Number.NaN;

  override render() {
    return html`
      <meter
        value=${this.value}
        min=${this.min}
        max=${this.max}
        low=${Number.isFinite(this.low) ? this.low : nothing}
        high=${Number.isFinite(this.high) ? this.high : nothing}
        optimum=${Number.isFinite(this.optimum) ? this.optimum : nothing}
      ></meter>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rds-meter': RdsMeter;
  }
}
