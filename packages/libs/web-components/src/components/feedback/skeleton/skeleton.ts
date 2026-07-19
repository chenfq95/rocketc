import { css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';

export type RcSkeletonVariant = 'text' | 'circular' | 'rectangular';

/**
 * Loading placeholder shimmer.
 *
 * @element rc-skeleton
 */
export class RcSkeleton extends RcStyledElement {
  static override styles = [
    css`
      :host {
        display: block;
      }
      
      .block,
      .line {
        display: block;
        background: linear-gradient(
          90deg,
          var(--rc-color-border-subtle) 0%,
          color-mix(in oklab, var(--rc-color-border-subtle) 40%, var(--rc-color-surface-panel)) 50%,
          var(--rc-color-border-subtle) 100%
        );
        background-size: 200% 100%;
        animation: shimmer 1.4s var(--rc-easing-standard, ease) infinite;
      }
      
      .block {
        width: var(--_width, 100%);
        height: var(--_height, var(--rc-space-9));
        border-radius: var(--rc-radius-md);
      }
      
      :host([variant='circular']) .block {
        width: var(--_width, var(--rc-space-10, 2.5rem));
        height: var(--_height, var(--rc-space-10, 2.5rem));
        border-radius: var(--rc-radius-full);
      }
      
      :host([variant='text']) .lines {
        display: grid;
        gap: var(--rc-space-2);
      }
      
      :host([variant='text']) .line {
        height: 0.75em;
        border-radius: var(--rc-radius-sm);
      }
      
      :host([variant='text']) .line:last-child {
        width: 72%;
      }
      
      @keyframes shimmer {
        0% {
          background-position: 100% 0;
        }
        100% {
          background-position: -100% 0;
        }
      }
    `,
  ];

  @property({ type: String, reflect: true })
  accessor variant: RcSkeletonVariant = 'text';

  @property({ type: String, reflect: true })
  accessor width: string = '';

  @property({ type: String, reflect: true })
  accessor height: string = '';

  @property({ type: Number, reflect: true })
  accessor lines: number = 3;

  override render() {
    const style = [
      this.width ? `--_width:${this.width}` : '',
      this.height ? `--_height:${this.height}` : '',
    ]
      .filter(Boolean)
      .join(';');

    if (this.variant === 'text') {
      const count = Math.max(1, this.lines);
      return html`
        <div class="lines" part="lines" aria-hidden="true">
          ${Array.from(
            { length: count },
            () => html`
              <span class="line" part="line"></span>
            `,
          )}
        </div>
      `;
    }

    return html`
      <div class="block" part="block" style=${style || undefined} aria-hidden="true"></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-skeleton': RcSkeleton;
  }
}
