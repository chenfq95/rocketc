import {
  css,
  LitElement,
  type CSSResultGroup,
  type CSSResultOrNative,
  type ReactiveController,
  type ReactiveControllerHost,
} from 'lit';
import { property } from 'lit/decorators.js';

import {
  rcStyleProperties,
  type RcBorderWidthValue,
  type RcFontWeightValue,
  type RcJustifyValue,
  type RcRadiusValue,
  type RcSpaceValue,
  type RcStyleProps,
  type RcSurfaceValue,
  type RcTextColorValue,
  type RcTypographyValue,
} from './style-properties';
import { resolveRcStyleValue } from './style-value';

const hostStyles = css`
  :host {
    box-sizing: border-box;
    font-family: var(--rc-typography-body-font-family);
    font-size: var(--rc-typography-body-font-size);
    line-height: var(--rc-typography-body-line-height);
    color: var(--rc-color-text-primary);
  }
  
  :host *,
  :host *::before,
  :host *::after {
    box-sizing: border-box;
  }
`;

class RcStyleController implements ReactiveController {
  readonly #host: ReactiveControllerHost & HTMLElement & RcStyleProps;
  readonly #getRenderRoot: () => HTMLElement | DocumentFragment;
  #styleDeclaration: CSSStyleDeclaration | undefined;

  constructor(
    host: ReactiveControllerHost & HTMLElement & RcStyleProps,
    getRenderRoot: () => HTMLElement | DocumentFragment,
  ) {
    this.#host = host;
    this.#getRenderRoot = getRenderRoot;
    host.addController(this);
  }

  static attach(
    host: ReactiveControllerHost & HTMLElement & RcStyleProps,
    getRenderRoot: () => HTMLElement | DocumentFragment,
  ): RcStyleController {
    return new RcStyleController(host, getRenderRoot);
  }

  hostConnected(): void {
    this.#ensureStyleDeclaration();
  }

  hostUpdated(): void {
    const style = this.#ensureStyleDeclaration();
    if (!style) return;

    for (const definition of rcStyleProperties) {
      const value = this.#host[definition.property];
      if (!value) {
        style.removeProperty(definition.cssProperty);
        continue;
      }

      style.setProperty(definition.cssProperty, resolveRcStyleValue(definition.resolver, value));
    }
  }

  #ensureStyleDeclaration(): CSSStyleDeclaration | undefined {
    if (this.#styleDeclaration) return this.#styleDeclaration;

    const root = this.#getRenderRoot();
    if (!(root instanceof ShadowRoot)) return undefined;

    if (
      typeof CSSStyleSheet !== 'undefined' &&
      'replaceSync' in CSSStyleSheet.prototype &&
      'adoptedStyleSheets' in root
    ) {
      try {
        const sheet = new CSSStyleSheet();
        sheet.replaceSync(':host {}');
        root.adoptedStyleSheets = [...root.adoptedStyleSheets, sheet];
        this.#styleDeclaration = (sheet.cssRules[0] as CSSStyleRule | undefined)?.style;
      } catch {
        // 构造样式表不可用时回退到 Shadow Root 内的 style 元素。
        // Fall back to a style element when constructable stylesheets are unavailable.
      }
    }

    if (!this.#styleDeclaration) {
      const styleElement = this.#host.ownerDocument.createElement('style');
      styleElement.dataset.rcHostStyles = '';
      styleElement.textContent = ':host {}';
      root.append(styleElement);
      this.#styleDeclaration = (styleElement.sheet?.cssRules[0] as CSSStyleRule | undefined)?.style;
    }

    return this.#styleDeclaration;
  }
}

/**
 * Rocketc 组件的通用宿主样式基类。
 * Shared host-style base class for Rocketc components.
 */
export class RcStyledElement extends LitElement implements RcStyleProps {
  protected static override finalizeStyles(styles?: CSSResultGroup): CSSResultOrNative[] {
    return super.finalizeStyles(styles === undefined ? hostStyles : [hostStyles, styles]);
  }

  @property({ type: String, reflect: true, useDefault: true })
  accessor pd: RcSpaceValue = '';

  @property({ type: String, reflect: true, useDefault: true })
  accessor px: RcSpaceValue = '';

  @property({ type: String, reflect: true, useDefault: true })
  accessor py: RcSpaceValue = '';

  @property({ type: String, reflect: true, useDefault: true })
  accessor mg: RcSpaceValue = '';

  @property({ type: String, reflect: true, useDefault: true })
  accessor mx: RcSpaceValue = '';

  @property({ type: String, reflect: true, useDefault: true })
  accessor my: RcSpaceValue = '';

  @property({ type: String, reflect: true, useDefault: true })
  accessor display: string = '';

  @property({ type: String, reflect: true, useDefault: true })
  accessor gap: RcSpaceValue = '';

  @property({ type: String, attribute: 'align-items', reflect: true, useDefault: true })
  accessor alignItems: string = '';

  @property({ type: String, reflect: true, useDefault: true })
  accessor justify: RcJustifyValue = '';

  @property({ type: String, reflect: true, useDefault: true })
  accessor position: string = '';

  @property({ type: String, reflect: true, useDefault: true })
  accessor overflow: string = '';

  @property({ type: String, reflect: true, useDefault: true })
  accessor width: string = '';

  @property({ type: String, reflect: true, useDefault: true })
  accessor height: string = '';

  @property({ type: String, attribute: 'min-width', reflect: true, useDefault: true })
  accessor minWidth: string = '';

  @property({ type: String, attribute: 'max-width', reflect: true, useDefault: true })
  accessor maxWidth: string = '';

  @property({ type: String, attribute: 'min-height', reflect: true, useDefault: true })
  accessor minHeight: string = '';

  @property({ type: String, attribute: 'max-height', reflect: true, useDefault: true })
  accessor maxHeight: string = '';

  @property({ type: String, reflect: true, useDefault: true })
  accessor border: string = '';

  @property({ type: String, attribute: 'border-width', reflect: true, useDefault: true })
  accessor borderWidth: RcBorderWidthValue = '';

  @property({ type: String, attribute: 'border-style', reflect: true, useDefault: true })
  accessor borderStyle: string = '';

  @property({ type: String, attribute: 'border-color', reflect: true, useDefault: true })
  accessor borderColor: string = '';

  @property({ type: String, attribute: 'border-radius', reflect: true, useDefault: true })
  accessor borderRadius: RcRadiusValue = '';

  @property({ type: String, reflect: true, useDefault: true })
  accessor bg: RcSurfaceValue = '';

  @property({ type: String, reflect: true, useDefault: true })
  accessor color: RcTextColorValue = '';

  @property({ type: String, attribute: 'font-size', reflect: true, useDefault: true })
  accessor fontSize: RcTypographyValue = '';

  @property({ type: String, attribute: 'font-weight', reflect: true, useDefault: true })
  accessor fontWeight: RcFontWeightValue = '';

  @property({ type: String, attribute: 'line-height', reflect: true, useDefault: true })
  accessor lineHeight: RcTypographyValue = '';

  @property({ type: String, attribute: 'text-align', reflect: true, useDefault: true })
  accessor textAlign: string = '';

  constructor() {
    super();
    RcStyleController.attach(this, () => this.renderRoot);
  }
}
