import { afterEach, describe, expect, it, vi } from 'vitest';

import { RcAccordion } from './accordion/accordion';
import { RcAccordionItem } from './accordion/accordion-item';
import { RcMenu } from './menu/menu';
import { RcMenuItem } from './menu/menu-item';
import { RcStep } from './steps/step';
import { RcSteps } from './steps/steps';
import { RcTab } from './tabs/tab';
import { RcTabs } from './tabs/tabs';

const definitions = [
  ['rc-accordion', RcAccordion],
  ['rc-accordion-item', RcAccordionItem],
  ['rc-menu', RcMenu],
  ['rc-menu-item', RcMenuItem],
  ['rc-step', RcStep],
  ['rc-steps', RcSteps],
  ['rc-tab', RcTab],
  ['rc-tabs', RcTabs],
] as const;

for (const [name, definition] of definitions) {
  if (!customElements.get(name)) customElements.define(name, definition);
}

afterEach(() => {
  document.body.replaceChildren();
});

describe('navigation compound contexts', () => {
  it('通过 Context 切换标签页并保留公开事件 / switches tabs through context and keeps the public event', async () => {
    const tabs = document.createElement('rc-tabs') as RcTabs;
    tabs.innerHTML = `
      <rc-tab value="first">First</rc-tab>
      <rc-tab value="second">Second</rc-tab>
      <section slot="panel" data-value="first">First panel</section>
      <section slot="panel" data-value="second">Second panel</section>
    `;
    const onChange = vi.fn();
    tabs.addEventListener('change', onChange);
    document.body.append(tabs);

    await tabs.updateComplete;
    const items = [...tabs.querySelectorAll<RcTab>('rc-tab')];
    await Promise.all(items.map((item) => item.updateComplete));

    expect(tabs.value).toBe('first');
    expect(items[0]?.shadowRoot?.querySelector('button')?.getAttribute('aria-selected')).toBe(
      'true',
    );

    items[1]?.shadowRoot?.querySelector('button')?.click();
    await tabs.updateComplete;
    await Promise.all(items.map((item) => item.updateComplete));

    expect(tabs.value).toBe('second');
    expect(onChange).toHaveBeenCalledOnce();
    expect(items[1]?.selected).toBe(false);
    expect(items[1]?.shadowRoot?.querySelector('button')?.getAttribute('aria-selected')).toBe(
      'true',
    );
    expect(tabs.querySelector<HTMLElement>('[data-value="first"]')?.hidden).toBe(true);
    expect(tabs.querySelector<HTMLElement>('[data-value="second"]')?.hidden).toBe(false);
  });

  it('通过 Context 管理手风琴展开状态 / manages accordion expansion through context', async () => {
    const accordion = document.createElement('rc-accordion') as RcAccordion;
    accordion.innerHTML = `
      <rc-accordion-item value="first"><span slot="trigger">First</span>Content</rc-accordion-item>
      <rc-accordion-item value="second"><span slot="trigger">Second</span>Content</rc-accordion-item>
    `;
    const onChange = vi.fn();
    accordion.addEventListener('change', onChange);
    document.body.append(accordion);

    await accordion.updateComplete;
    const items = [...accordion.querySelectorAll<RcAccordionItem>('rc-accordion-item')];
    await Promise.all(items.map((item) => item.updateComplete));
    items[0]?.shadowRoot?.querySelector('button')?.click();
    await accordion.updateComplete;
    await Promise.all(items.map((item) => item.updateComplete));

    expect(accordion.value).toBe('first');
    expect(onChange).toHaveBeenCalledOnce();
    expect(items[0]?.open).toBe(false);
    expect(items[0]?.shadowRoot?.querySelector('button')?.getAttribute('aria-expanded')).toBe(
      'true',
    );
    expect(items[0]?.shadowRoot?.querySelector<HTMLElement>('.panel')?.hidden).toBe(false);
  });

  it('通过 Context 派生步骤索引和状态 / derives step indexes and states through context', async () => {
    const steps = document.createElement('rc-steps') as RcSteps;
    steps.index = 1;
    steps.innerHTML = '<rc-step>First</rc-step><rc-step>Second</rc-step><rc-step>Third</rc-step>';
    document.body.append(steps);

    await steps.updateComplete;
    const items = [...steps.querySelectorAll<RcStep>('rc-step')];
    await Promise.all(items.map((item) => item.updateComplete));

    expect(items[0]?.index).toBe(0);
    expect(items[0]?.state).toBe('incomplete');
    expect(items[0]?.shadowRoot?.querySelector('.indicator')?.getAttribute('data-state')).toBe(
      'complete',
    );
    expect(items[1]?.shadowRoot?.querySelector('.indicator')?.getAttribute('data-state')).toBe(
      'active',
    );

    steps.index = 2;
    await steps.updateComplete;
    await Promise.all(items.map((item) => item.updateComplete));
    expect(items[1]?.shadowRoot?.querySelector('.indicator')?.textContent?.trim()).toBe('✓');
    expect(items[2]?.shadowRoot?.querySelector('.indicator')?.getAttribute('data-state')).toBe(
      'active',
    );
  });

  it('通过 Context 上报菜单选择 / reports menu selection through context', async () => {
    const menu = document.createElement('rc-menu') as RcMenu;
    menu.innerHTML = '<rc-menu-item value="settings">Settings</rc-menu-item>';
    const onChange = vi.fn();
    menu.addEventListener('change', onChange);
    document.body.append(menu);

    await menu.updateComplete;
    const item = menu.querySelector<RcMenuItem>('rc-menu-item');
    await item?.updateComplete;
    item?.shadowRoot?.querySelector('button')?.click();

    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange.mock.calls[0]?.[0]).toMatchObject({ detail: { value: 'settings' } });
  });
});
