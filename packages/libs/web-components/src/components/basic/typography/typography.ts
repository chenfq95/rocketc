import { css } from 'lit';
import { property } from 'lit/decorators.js';

import { RcStyledElement } from '../../../internal/styled-element';
import type { RcOpenString } from '../../../internal/style-properties';
import { html, unsafeStatic } from 'lit/static-html.js';

export type RcTypographyVariant =
  | 'display'
  | 'title'
  | 'heading'
  | 'subheading'
  | 'body'
  | 'body-small'
  | 'label'
  | 'caption'
  | 'code';

export type RcTypographyColor = RcOpenString<'primary' | 'secondary' | 'muted' | 'inherit'>;

const ALLOWED_TAGS = new Set([
  'p',
  'span',
  'div',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'label',
  'code',
  'pre',
  'strong',
  'em',
  'small',
  'blockquote',
  'li',
  'dt',
  'dd',
]);

const DEFAULT_TAG: Record<RcTypographyVariant, string> = {
  display: 'h1',
  title: 'h2',
  heading: 'h3',
  subheading: 'h4',
  body: 'p',
  'body-small': 'p',
  label: 'span',
  caption: 'span',
  code: 'code',
};

/**
 * Token-backed text. Maps `variant` to semantic typography roles
 * (`typography.display` … `typography.code`).
 *
 * Use `as` to choose the rendered element (`p`, `h1`–`h6`, `span`, `code`, …).
 *
 * @element rc-typography
 * @slot - Text content
 */
export class RcTypography extends RcStyledElement {
  static override styles = [
    css`
      :host {
        display: contents;
      }
      
      .root {
        margin: 0;
        font-family: var(--_font-family);
        font-size: var(--_font-size);
        font-weight: var(--_font-weight);
        line-height: var(--_line-height);
        letter-spacing: var(--_letter-spacing);
        color: var(--_color);
        text-align: var(--_align, inherit);
      }
      
      :host([truncate]) .root {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      
      :host([variant='display']) {
        --_font-family: var(--rc-typography-display-font-family);
        --_font-size: var(--rc-typography-display-font-size);
        --_font-weight: var(--rc-typography-display-font-weight);
        --_line-height: var(--rc-typography-display-line-height);
        --_letter-spacing: var(--rc-typography-display-letter-spacing);
      }
      
      :host([variant='title']) {
        --_font-family: var(--rc-typography-title-font-family);
        --_font-size: var(--rc-typography-title-font-size);
        --_font-weight: var(--rc-typography-title-font-weight);
        --_line-height: var(--rc-typography-title-line-height);
        --_letter-spacing: var(--rc-typography-title-letter-spacing);
      }
      
      :host([variant='heading']) {
        --_font-family: var(--rc-typography-heading-font-family);
        --_font-size: var(--rc-typography-heading-font-size);
        --_font-weight: var(--rc-typography-heading-font-weight);
        --_line-height: var(--rc-typography-heading-line-height);
        --_letter-spacing: var(--rc-typography-heading-letter-spacing);
      }
      
      :host([variant='subheading']) {
        --_font-family: var(--rc-typography-subheading-font-family);
        --_font-size: var(--rc-typography-subheading-font-size);
        --_font-weight: var(--rc-typography-subheading-font-weight);
        --_line-height: var(--rc-typography-subheading-line-height);
        --_letter-spacing: var(--rc-typography-subheading-letter-spacing);
      }
      
      :host([variant='body']),
      :host(:not([variant])) {
        --_font-family: var(--rc-typography-body-font-family);
        --_font-size: var(--rc-typography-body-font-size);
        --_font-weight: var(--rc-typography-body-font-weight);
        --_line-height: var(--rc-typography-body-line-height);
        --_letter-spacing: var(--rc-typography-body-letter-spacing);
      }
      
      :host([variant='body-small']) {
        --_font-family: var(--rc-typography-body-small-font-family);
        --_font-size: var(--rc-typography-body-small-font-size);
        --_font-weight: var(--rc-typography-body-small-font-weight);
        --_line-height: var(--rc-typography-body-small-line-height);
        --_letter-spacing: var(--rc-typography-body-small-letter-spacing);
      }
      
      :host([variant='label']) {
        --_font-family: var(--rc-typography-label-font-family);
        --_font-size: var(--rc-typography-label-font-size);
        --_font-weight: var(--rc-typography-label-font-weight);
        --_line-height: var(--rc-typography-label-line-height);
        --_letter-spacing: var(--rc-typography-label-letter-spacing);
      }
      
      :host([variant='caption']) {
        --_font-family: var(--rc-typography-caption-font-family);
        --_font-size: var(--rc-typography-caption-font-size);
        --_font-weight: var(--rc-typography-caption-font-weight);
        --_line-height: var(--rc-typography-caption-line-height);
        --_letter-spacing: var(--rc-typography-caption-letter-spacing);
      }
      
      :host([variant='code']) {
        --_font-family: var(--rc-typography-code-font-family);
        --_font-size: var(--rc-typography-code-font-size);
        --_font-weight: var(--rc-typography-code-font-weight);
        --_line-height: var(--rc-typography-code-line-height);
        --_letter-spacing: var(--rc-typography-code-letter-spacing);
      }
      
      :host([color='primary']),
      :host(:not([color])) {
        --_color: var(--rc-color-text-primary);
      }
      
      :host([color='secondary']) {
        --_color: var(--rc-color-text-secondary);
      }
      
      :host([color='muted']) {
        --_color: var(--rc-color-text-muted);
      }
      
      :host([color='inherit']) {
        --_color: inherit;
      }
      
      :host([align='left']) {
        --_align: left;
      }
      
      :host([align='center']) {
        --_align: center;
      }
      
      :host([align='right']) {
        --_align: right;
      }
      
      :host([align='justify']) {
        --_align: justify;
      }
    `,
  ];

  @property({ type: String, reflect: true })
  accessor variant: RcTypographyVariant = 'body';

  @property({ type: String, reflect: true })
  accessor as: string = '';

  @property({ type: String, reflect: true })
  accessor color: RcTypographyColor = 'primary';

  @property({ type: String, reflect: true })
  accessor align: '' | 'left' | 'center' | 'right' | 'justify' = '';

  @property({ type: Boolean, reflect: true })
  accessor truncate: boolean = false;

  #resolveTag(): string {
    const requested = (this.as || DEFAULT_TAG[this.variant] || 'p').toLowerCase();
    return ALLOWED_TAGS.has(requested) ? requested : 'p';
  }

  override render() {
    const tag = unsafeStatic(this.#resolveTag());

    // `display: contents` 宿主的排版样式由内部语义元素承载。
    // The inner semantic element carries typography for the `display: contents` host.
    return html`
      <${tag} class="root" part="container root"><slot></slot></${tag}>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-typography': RcTypography;
  }
}
