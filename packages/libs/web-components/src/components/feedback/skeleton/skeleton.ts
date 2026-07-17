import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { hostStyles } from '../../../internal/shared-styles';

export type RdsSkeletonVariant = 'text' | 'circular' | 'rectangular';

/**
 * Loading placeholder shimmer.
 *
 * @element rds-skeleton
 */
export class RdsSkeleton extends LitElement {
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
      }
      
      .block,
      .line {
        display: block;
        background: linear-gradient(
          90deg,
          var(--rds-color-border-subtle) 0%,
          color-mix(in oklab, var(--rds-color-border-subtle) 40%, var(--rds-color-surface-panel)) 50%,
          var(--rds-color-border-subtle) 100%
        );
        background-size: 200% 100%;
        animation: shimmer 1.4s var(--rds-easing-standard, ease) infinite;
      }
      
      .block {
        width: var(--_width, 100%);
        height: var(--_height, var(--rds-space-9));
        border-radius: var(--rds-radius-md);
      }
      
      :host([variant='circular']) .block {
        width: var(--_width, var(--rds-space-10, 2.5rem));
        height: var(--_height, var(--rds-space-10, 2.5rem));
        border-radius: var(--rds-radius-full);
      }
      
      :host([variant='text']) .lines {
        display: grid;
        gap: var(--rds-space-2);
      }
      
      :host([variant='text']) .line {
        height: 0.75em;
        border-radius: var(--rds-radius-sm);
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
  accessor variant: RdsSkeletonVariant = 'text';

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
        <div class="lines" aria-hidden="true">
          ${Array.from(
            { length: count },
            () => html`
              <span class="line"></span>
            `,
          )}
        </div>
      `;
    }

    return html`
      <div class="block" style=${style || undefined} aria-hidden="true"></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rds-skeleton': RdsSkeleton;
  }
}
