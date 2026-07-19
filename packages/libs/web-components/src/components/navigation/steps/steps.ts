import { css, html, type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';

import type { RcStep } from './step';

/**
 * Multi-step progress indicator.
 *
 * @element rc-steps
 * @fires change - When index changes (`detail.index`)
 * @slot - `rc-step` children
 */
export class RcSteps extends RcStyledElement {
  static override styles = [
    css`
      :host {
        display: block;
      }
      
      .list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
        gap: var(--rc-space-3);
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

  #steps(): RcStep[] {
    return [...this.querySelectorAll<RcStep>('rc-step')];
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
      <div class="list" part="list" role="list"><slot></slot></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-steps': RcSteps;
  }
}
