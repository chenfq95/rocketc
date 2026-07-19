import { css, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';

export type RcAvatarSize = 'sm' | 'md' | 'lg';

/**
 * User / entity avatar with image or initials fallback.
 *
 * @element rc-avatar
 * @slot - Fallback content (e.g. initials) when `src` is empty / fails
 */
export class RcAvatar extends RcStyledElement {
  static override styles = [
    css`
      :host {
        display: inline-flex;
        vertical-align: middle;
      }
      
      .root {
        display: inline-grid;
        place-items: center;
        overflow: hidden;
        border-radius: var(--rc-radius-full);
        background: var(--rc-color-control-secondary-bg-hover);
        color: var(--rc-color-control-secondary-fg);
        font-size: var(--rc-typography-label-font-size);
        font-weight: var(--rc-typography-weight-semibold);
        text-transform: uppercase;
      }
      
      :host([size='sm']) .root {
        width: var(--rc-space-7);
        height: var(--rc-space-7);
        font-size: var(--rc-typography-caption-font-size);
      }
      
      :host([size='md']) .root,
      :host(:not([size])) .root {
        width: var(--rc-space-9);
        height: var(--rc-space-9);
      }
      
      :host([size='lg']) .root {
        width: var(--rc-space-11, 2.75rem);
        height: var(--rc-space-11, 2.75rem);
        font-size: var(--rc-typography-body-font-size);
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
  accessor size: RcAvatarSize = 'md';

  #failed = false;

  protected override willUpdate(changed: Map<PropertyKey, unknown>): void {
    if (changed.has('src')) this.#failed = false;
  }

  override render() {
    const showImage = Boolean(this.src) && !this.#failed;
    return html`
      <span class="root" part="container root" role=${showImage ? nothing : 'img'} aria-label=${this.alt || nothing}>
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
    'rc-avatar': RcAvatar;
  }
}
