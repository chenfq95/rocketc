import { css, html } from 'lit';
import { afterEach, describe, expect, it } from 'vitest';

import { RcBox } from '../components/layout/box/box';
import { RcPagination } from '../components/navigation/pagination/pagination';
import { RcStyledElement } from './styled-element';
import { resolveRcStyleValue } from './style-value';

const componentSources = import.meta.glob('../components/**/*.ts', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

class RcStyleTestElement extends RcStyledElement {
  static override styles = css`
    :host {
      display: block;
    }
  `;

  override render() {
    return html`
      <slot></slot>
    `;
  }
}

customElements.define('rc-style-test', RcStyleTestElement);
customElements.define('rc-box-test', RcBox);
customElements.define('rc-pagination-test', RcPagination);

afterEach(() => {
  document.body.replaceChildren();
});

function getInjectedHostStyle(element: HTMLElement): CSSStyleDeclaration {
  const root = element.shadowRoot;
  if (!root) throw new Error('Expected an open shadow root');

  const fallbackRule = root.querySelector<HTMLStyleElement>('style[data-rc-host-styles]')?.sheet
    ?.cssRules[0] as CSSStyleRule | undefined;
  if (fallbackRule) return fallbackRule.style;

  const sheet = root.adoptedStyleSheets.at(-1);
  const rule = sheet?.cssRules[0] as CSSStyleRule | undefined;
  if (!rule) throw new Error('Expected an injected host style rule');
  return rule.style;
}

describe('RcStyledElement', () => {
  it('自动合并基础样式和组件样式 / automatically merges base and component styles', () => {
    const styles = (
      RcStyleTestElement as unknown as {
        elementStyles: Array<{ cssText?: string }>;
      }
    ).elementStyles;
    const cssText = styles.map((style) => style.cssText ?? '').join('\n');

    expect(cssText.match(/box-sizing: border-box/g)).toHaveLength(2);
    expect(cssText).toContain('display: block');
  });

  it('覆盖全部已发布组件 / covers every published component', () => {
    const elements = Object.entries(componentSources).filter(([, source]) =>
      source.includes('@element rc-'),
    );

    expect(elements).toHaveLength(77);
    expect(elements.filter(([, source]) => !source.includes('RcStyledElement'))).toEqual([]);
  });

  it('将 Token 别名和原始 CSS 值应用到宿主 / applies token aliases and raw CSS values to the host', async () => {
    const element = document.createElement('rc-style-test') as RcStyleTestElement;
    element.pd = 'md';
    element.px = 'lg';
    element.py = 'var(--business-padding)';
    element.mg = '0 8px';
    element.mx = 'auto';
    element.my = 'sm';
    element.gap = 'var(--business-gap)';
    element.justify = 'between';
    element.bg = 'panel';
    element.color = 'primary';
    element.borderRadius = 'xl';
    element.fontSize = 'body';
    document.body.append(element);

    await element.updateComplete;

    const style = getInjectedHostStyle(element);
    expect(style.padding).toBe('var(--rc-space-3)');
    expect(style.getPropertyValue('padding-inline')).toBe('var(--rc-space-4)');
    expect(style.getPropertyValue('padding-block')).toBe('var(--business-padding)');
    expect(style.margin).toBe('var(--rc-space-0) 8px');
    expect(style.getPropertyValue('margin-inline')).toBe('auto');
    expect(style.getPropertyValue('margin-block')).toBe('var(--rc-space-2)');
    expect(style.gap).toBe('var(--business-gap)');
    expect(style.justifyContent).toBe('space-between');
    expect(style.background).toBe('var(--rc-color-surface-panel)');
    expect(style.color).toBe('var(--rc-color-text-primary)');
    expect(style.borderRadius).toBe('var(--rc-radius-xl)');
    expect(style.fontSize).toBe('var(--rc-typography-body-font-size)');
    expect(element.getAttribute('style')).toBeNull();
    expect(element.getAttribute('align-items')).toBeNull();
  });

  it('仅移除自身管理的样式 / removes only styles managed by common properties', async () => {
    const element = document.createElement('rc-style-test') as RcStyleTestElement;
    element.style.margin = '7px';
    document.body.append(element);
    await element.updateComplete;
    expect(element.style.margin).toBe('7px');
    const style = getInjectedHostStyle(element);
    expect(style.margin).toBe('');

    element.mg = 'lg';
    await element.updateComplete;
    expect(element.style.margin).toBe('7px');
    expect(style.margin).toBe('var(--rc-space-4)');

    element.mg = '';
    await element.updateComplete;
    expect(element.style.margin).toBe('7px');
    expect(style.margin).toBe('');
  });

  it('兼容组件原有的同名属性 / supports raw values on existing same-name properties', async () => {
    const box = document.createElement('rc-box-test') as RcBox;
    box.display = 'flow-root';
    box.bg = 'rebeccapurple';
    document.body.append(box);
    await box.updateComplete;

    const style = getInjectedHostStyle(box);
    expect(style.display).toBe('flow-root');
    expect(style.background).toBe('rebeccapurple');
    expect(box.getAttribute('style')).toBeNull();
  });

  it('Box 默认不附加表面样式 / does not add surface styles to Box by default', () => {
    const styles = (
      RcBox as unknown as {
        elementStyles: Array<{ cssText?: string }>;
      }
    ).elementStyles;
    const cssText = styles.map((style) => style.cssText ?? '').join('\n');

    expect(cssText).not.toContain('padding: var(--rc-space-3)');
    expect(cssText).not.toContain(
      'border: var(--rc-border-sm) solid var(--rc-color-border-subtle)',
    );
    expect(cssText).not.toContain('border-radius: var(--rc-radius-md)');
    expect(cssText).not.toContain('background: var(--rc-color-surface-panel)');
  });

  it('布局容器默认不附加表面样式 / does not add surface styles to layout containers by default', () => {
    const containers = [
      'box/box.ts',
      'flex/flex.ts',
      'grid/grid.ts',
      'stack/stack.ts',
      'center/center.ts',
    ];

    for (const file of containers) {
      const source = Object.entries(componentSources).find(([path]) => path.endsWith(file))?.[1];
      expect(source, file).not.toContain('padding: var(--rc-space-3)');
      expect(source, file).not.toContain(
        'border: var(--rc-border-sm) solid var(--rc-color-border-subtle)',
      );
      expect(source, file).not.toContain('border-radius: var(--rc-radius-md)');
      expect(source, file).not.toContain('background: var(--rc-color-surface-panel)');
      expect(source, file).not.toContain('color: var(--rc-color-text-primary)');
    }
  });

  it('Stack 默认不附加间距或颜色 / does not add spacing or color to Stack by default', () => {
    const source = Object.entries(componentSources).find(([path]) =>
      path.endsWith('stack/stack.ts'),
    )?.[1];

    expect(source).not.toContain('gap: var(--rc-space-3)');
    expect(source).not.toContain('padding:');
    expect(source).not.toContain('margin:');
    expect(source).toContain('color: inherit');
  });
});

describe('semantic parts', () => {
  it('暴露容器、控件和重复项 / exposes container, control, and repeated-item parts', async () => {
    const pagination = document.createElement('rc-pagination-test') as RcPagination;
    pagination.count = 3;
    document.body.append(pagination);
    await pagination.updateComplete;

    expect(pagination.shadowRoot?.querySelector('[part~="container"]')).not.toBeNull();
    expect(pagination.shadowRoot?.querySelector('[part~="control"]')).not.toBeNull();
    expect(pagination.shadowRoot?.querySelector('[part~="item"]')).not.toBeNull();
  });
});

describe('resolveRcStyleValue', () => {
  it('保留 CSS 变量并解析常用别名 / preserves CSS variables and resolves common aliases', () => {
    expect(resolveRcStyleValue('space', 'var(--space)')).toBe('var(--space)');
    expect(resolveRcStyleValue('size', 'full')).toBe('100%');
    expect(resolveRcStyleValue('border-color', 'strong')).toBe('var(--rc-color-border-strong)');
    expect(resolveRcStyleValue('font-weight', 'semibold')).toBe(
      'var(--rc-typography-weight-semibold)',
    );
  });
});

declare global {
  interface HTMLElementTagNameMap {
    'rc-style-test': RcStyleTestElement;
    'rc-box-test': RcBox;
    'rc-pagination-test': RcPagination;
  }
}
