import { css, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';

/**
 * Scalar gauge backed by native `<meter>`.
 *
 * @element rc-meter
 */
export class RcMeter extends RcStyledElement {
  static override styles = [
    css`
      :host {
        display: block;
      }
      
      meter {
        display: block;
        width: 100%;
        height: var(--rc-space-2);
        border: 0;
        border-radius: var(--rc-radius-full);
        overflow: hidden;
        background: var(--rc-color-border-subtle);
      }
      
      meter::-webkit-meter-bar {
        background: var(--rc-color-border-subtle);
        border: 0;
        border-radius: var(--rc-radius-full);
      }
      
      meter::-webkit-meter-optimum-value {
        background: var(--rc-color-success-solid);
        border-radius: var(--rc-radius-full);
      }
      
      meter::-webkit-meter-suboptimum-value {
        background: var(--rc-color-warning-solid);
        border-radius: var(--rc-radius-full);
      }
      
      meter::-webkit-meter-even-less-good-value {
        background: var(--rc-color-danger-solid);
        border-radius: var(--rc-radius-full);
      }
      
      meter::-moz-meter-bar {
        background: var(--rc-color-control-primary-bg);
        border-radius: var(--rc-radius-full);
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
      <meter part="control"
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
    'rc-meter': RcMeter;
  }
}
