import { LitElement, css, html, type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

import { hostStyles } from '../../../internal/shared-styles';
import type { RdsStep } from './step';

/**
 * Multi-step progress indicator.
 *
 * @element rds-steps
 * @fires change - When index changes (`detail.index`)
 * @slot - `rds-step` children
 */
export class RdsSteps extends LitElement {
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
      }
      
      .list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
        gap: var(--rds-space-3);
      }
    `,
  ];

  @property({ type: Number, reflect: true })
  accessor index: number = 0;

  override updated(changed: PropertyValues<this>) {
    if (changed.has('index')) this.#sync();
  }

  override firstUpdated() {
    this.#sync();
  }

  #steps(): RdsStep[] {
    return [...this.querySelectorAll<RdsStep>('rds-step')];
  }

  #sync() {
    this.#steps().forEach((step, i) => {
      step.index = i;
      step.state = i < this.index ? 'complete' : i === this.index ? 'active' : 'incomplete';
    });
  }

  next() {
    const max = Math.max(0, this.#steps().length - 1);
    if (this.index >= max) return;
    this.index += 1;
    this.dispatchEvent(new CustomEvent('change', { detail: { index: this.index }, bubbles: true }));
  }

  prev() {
    if (this.index <= 0) return;
    this.index -= 1;
    this.dispatchEvent(new CustomEvent('change', { detail: { index: this.index }, bubbles: true }));
  }

  override render() {
    return html`
      <div class="list" role="list"><slot></slot></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rds-steps': RdsSteps;
  }
}
