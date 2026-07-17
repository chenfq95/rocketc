import { LitElement, css, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';

import { hostStyles } from '../../../internal/shared-styles';

export type RdsAvatarSize = 'sm' | 'md' | 'lg';

/**
 * User / entity avatar with image or initials fallback.
 *
 * @element rds-avatar
 * @slot - Fallback content (e.g. initials) when `src` is empty / fails
 */
export class RdsAvatar extends LitElement {
  static override styles = [
    hostStyles,
    css`
      :host {
        display: inline-flex;
        vertical-align: middle;
      }
      
      .root {
        display: inline-grid;
        place-items: center;
        overflow: hidden;
        border-radius: var(--rds-radius-full);
        background: var(--rds-color-control-secondary-bg-hover);
        color: var(--rds-color-control-secondary-fg);
        font-size: var(--rds-typography-label-font-size);
        font-weight: var(--rds-typography-weight-semibold);
        text-transform: uppercase;
      }
      
      :host([size='sm']) .root {
        width: var(--rds-space-7);
        height: var(--rds-space-7);
        font-size: var(--rds-typography-caption-font-size);
      }
      
      :host([size='md']) .root,
      :host(:not([size])) .root {
        width: var(--rds-space-9);
        height: var(--rds-space-9);
      }
      
      :host([size='lg']) .root {
        width: var(--rds-space-11, 2.75rem);
        height: var(--rds-space-11, 2.75rem);
        font-size: var(--rds-typography-body-font-size);
      }
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    `,
  ];

  @property({ type: String, reflect: true })
  accessor src: string = '';

  @property({ type: String, reflect: true })
  accessor alt: string = '';

  @property({ type: String, reflect: true })
  accessor size: RdsAvatarSize = 'md';

  #failed = false;

  protected override willUpdate(changed: Map<PropertyKey, unknown>): void {
    if (changed.has('src')) this.#failed = false;
  }

  override render() {
    const showImage = Boolean(this.src) && !this.#failed;
    return html`
      <span class="root" role=${showImage ? nothing : 'img'} aria-label=${this.alt || nothing}>
        ${
          showImage
            ? html`
                <img
                  src=${this.src}
                  alt=${this.alt}
                  @error=${() => {
                    this.#failed = true;
                    this.requestUpdate();
                  }}
                />
              `
            : html`
                <slot></slot>
              `
        }
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rds-avatar': RdsAvatar;
  }
}
