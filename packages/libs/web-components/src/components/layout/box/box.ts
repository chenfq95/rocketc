import { LitElement, css, html, type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

import { hostStyles } from '../../../internal/shared-styles';

export type RdsBoxSpace = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type RdsBoxDisplay = 'block' | 'inline-block' | 'flex' | 'inline-flex' | 'grid' | 'contents';
export type RdsBoxBg = 'transparent' | 'canvas' | 'panel' | 'elevated';
export type RdsBoxRounded = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

const spaceMap: Record<RdsBoxSpace, string> = {
  none: '0',
  xs: 'var(--rds-space-1)',
  sm: 'var(--rds-space-2)',
  md: 'var(--rds-space-3)',
  lg: 'var(--rds-space-4)',
  xl: 'var(--rds-space-6)',
  '2xl': 'var(--rds-space-8)',
};

/**
 * Generic layout/surface box (Chakra-style `Box`).
 *
 * @element rds-box
 * @slot - Box content
 */
export class RdsBox extends LitElement {
  static override styles = [
    hostStyles,
    css`
      :host {
        display: var(--_display, block);
        box-sizing: border-box;
        min-width: 0;
        padding: var(--_py, var(--_p, 0)) var(--_px, var(--_p, 0));
        margin: var(--_my, var(--_m, 0)) var(--_mx, var(--_m, 0));
        background: var(--_bg, transparent);
        border-radius: var(--_radius, 0);
      }
      
      :host([bordered]) {
        border: var(--rds-border-sm) solid var(--rds-color-border-subtle);
      }
    `,
  ];

  @property({ type: String, reflect: true })
  accessor display: RdsBoxDisplay = 'block';

  @property({ type: String, reflect: true })
  accessor p: RdsBoxSpace | '' = '';

  @property({ type: String, reflect: true })
  accessor px: RdsBoxSpace | '' = '';

  @property({ type: String, reflect: true })
  accessor py: RdsBoxSpace | '' = '';

  @property({ type: String, reflect: true })
  accessor m: RdsBoxSpace | '' = '';

  @property({ type: String, reflect: true })
  accessor mx: RdsBoxSpace | '' = '';

  @property({ type: String, reflect: true })
  accessor my: RdsBoxSpace | '' = '';

  @property({ type: String, reflect: true })
  accessor bg: RdsBoxBg = 'transparent';

  @property({ type: String, reflect: true })
  accessor rounded: RdsBoxRounded | '' = '';

  @property({ type: Boolean, reflect: true })
  accessor bordered: boolean = false;

  protected override updated(_changed: PropertyValues<this>): void {
    this.style.setProperty('--_display', this.display || 'block');
    this.#setSpace('--_p', this.p);
    this.#setSpace('--_px', this.px);
    this.#setSpace('--_py', this.py);
    this.#setSpace('--_m', this.m);
    this.#setSpace('--_mx', this.mx);
    this.#setSpace('--_my', this.my);

    const bg =
      this.bg === 'canvas'
        ? 'var(--rds-color-surface-canvas)'
        : this.bg === 'panel'
          ? 'var(--rds-color-surface-panel)'
          : this.bg === 'elevated'
            ? 'var(--rds-color-surface-elevated)'
            : 'transparent';
    this.style.setProperty('--_bg', bg);

    const radius =
      this.rounded === 'sm'
        ? 'var(--rds-radius-sm)'
        : this.rounded === 'md'
          ? 'var(--rds-radius-md)'
          : this.rounded === 'lg'
            ? 'var(--rds-radius-lg)'
            : this.rounded === 'xl'
              ? 'var(--rds-radius-xl)'
              : this.rounded === 'full'
                ? 'var(--rds-radius-full)'
                : '0';
    this.style.setProperty('--_radius', radius);
  }

  #setSpace(name: string, value: string) {
    if (value && value in spaceMap) {
      this.style.setProperty(name, spaceMap[value as RdsBoxSpace]);
    } else {
      this.style.removeProperty(name);
    }
  }

  override render() {
    return html`
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rds-box': RdsBox;
  }
}
