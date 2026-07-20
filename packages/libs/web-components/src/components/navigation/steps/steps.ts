import { ContextProvider } from '@lit/context';
import { css, html, type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';

import type { RcStep } from './step';
import { rcStepsContext, type RcStepsContextValue } from './steps-context';

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

  #indexOf = (step: Element) => this.#steps().indexOf(step as RcStep);

  #contextProvider = new ContextProvider(this, {
    context: rcStepsContext,
    initialValue: this.#contextValue(),
  });

  override updated(changed: PropertyValues<this>) {
    if (changed.has('index')) this.#contextProvider.setValue(this.#contextValue());
  }

  #steps(): RcStep[] {
    return [...this.querySelectorAll<RcStep>(':scope > rc-step')];
  }

  #contextValue(): RcStepsContextValue {
    return { activeIndex: this.index, indexOf: this.#indexOf };
  }

  #onSlotChange() {
    this.#contextProvider.setValue(this.#contextValue(), true);
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
      <div class="list" part="list" role="list"><slot @slotchange=${this.#onSlotChange}></slot></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-steps': RcSteps;
  }
}
