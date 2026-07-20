import { ContextConsumer } from '@lit/context';
import { css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';

import { rcStepsContext, type RcStepsContextValue } from './steps-context';

/**
 * Step used inside `rc-steps`.
 *
 * @element rc-step
 * @slot - Step title
 * @slot description - Optional description
 */
export class RcStep extends RcStyledElement {
  static override styles = [
    css`
      :host {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: var(--rc-space-2);
        align-items: start;
        min-width: 0;
      }
      
      .indicator {
        display: grid;
        place-items: center;
        width: var(--rc-space-7);
        height: var(--rc-space-7);
        border-radius: var(--rc-radius-full);
        border: var(--rc-border-sm) solid var(--rc-color-border-default);
        background: var(--rc-color-surface-panel);
        color: var(--rc-color-text-secondary);
        font-size: var(--rc-typography-caption-font-size);
        font-weight: var(--rc-typography-weight-semibold);
      }
      
      .indicator[data-state='active'] {
        border-color: var(--rc-color-control-primary-border);
        background: var(--rc-color-control-primary-bg);
        color: var(--rc-color-control-primary-fg-contrast);
      }
      
      .indicator[data-state='complete'] {
        border-color: var(--rc-color-success-solid, var(--rc-color-control-primary-border));
        background: var(--rc-color-success-solid, var(--rc-color-control-primary-bg));
        color: var(--rc-color-success-contrast, var(--rc-color-control-primary-fg-contrast));
      }
      
      .title {
        font-size: var(--rc-typography-label-font-size);
        font-weight: var(--rc-typography-weight-medium);
      }
      
      .description {
        color: var(--rc-color-text-muted);
        font-size: var(--rc-typography-caption-font-size);
      }
    `,
  ];

  @property({ type: String, reflect: true })
  accessor value: string = '';

  @property({ type: Number, reflect: true })
  accessor index: number = 0;

  @property({ type: String, reflect: true })
  accessor state: 'incomplete' | 'active' | 'complete' = 'incomplete';

  #stepsContext = new ContextConsumer(this, {
    context: rcStepsContext,
    subscribe: true,
  });

  override render() {
    const context = this.#stepsContext.value as RcStepsContextValue | undefined;
    const contextualIndex = context?.indexOf(this) ?? -1;
    const index = contextualIndex >= 0 ? contextualIndex : this.index;
    const state =
      context && contextualIndex >= 0
        ? index < context.activeIndex
          ? 'complete'
          : index === context.activeIndex
            ? 'active'
            : 'incomplete'
        : this.state;
    const mark = state === 'complete' ? '✓' : String(index + 1);
    return html`
      <div class="indicator" part="indicator" data-state=${state} aria-hidden="true">${mark}</div>
      <div part="content">
        <div class="title" part="title"><slot></slot></div>
        <div class="description" part="description"><slot name="description"></slot></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-step': RcStep;
  }
}
