import { afterEach, describe, expect, it, vi } from 'vitest';

import { RcSegment } from './segment';
import { RcSegmentItem } from './segment-item';

if (!customElements.get('rc-segment')) customElements.define('rc-segment', RcSegment);
if (!customElements.get('rc-segment-item')) {
  customElements.define('rc-segment-item', RcSegmentItem);
}

afterEach(() => {
  document.body.replaceChildren();
});

async function renderSegment() {
  const segment = document.createElement('rc-segment') as RcSegment;
  segment.innerHTML = `
    <rc-segment-item value="first">First</rc-segment-item>
    <rc-segment-item value="second">Second</rc-segment-item>
  `;
  document.body.append(segment);
  await segment.updateComplete;

  const items = [...segment.querySelectorAll<RcSegmentItem>('rc-segment-item')];
  await Promise.all(items.map((item) => item.updateComplete));
  return { segment, items };
}

describe('RcSegment context', () => {
  it('向子项提供选中值和尺寸 / provides selection and size to child items', async () => {
    const { segment, items } = await renderSegment();
    const [first, second] = items;

    expect(segment.value).toBe('first');
    expect(first?.shadowRoot?.querySelector('button')?.getAttribute('aria-checked')).toBe('true');
    expect(second?.shadowRoot?.querySelector('button')?.getAttribute('aria-checked')).toBe('false');

    segment.size = 'lg';
    await segment.updateComplete;
    await Promise.all(items.map((item) => item.updateComplete));

    expect(first?.shadowRoot?.querySelector('button')?.dataset.size).toBe('lg');
    expect(first?.size).toBe('md');
  });

  it('通过 Context 选择子项并保留公开 change 事件 / selects through context and keeps the public change event', async () => {
    const { segment, items } = await renderSegment();
    const onChange = vi.fn();
    segment.addEventListener('change', onChange);

    items[1]?.shadowRoot?.querySelector('button')?.click();
    await segment.updateComplete;
    await Promise.all(items.map((item) => item.updateComplete));

    expect(segment.value).toBe('second');
    expect(onChange).toHaveBeenCalledOnce();
    expect(items[1]?.shadowRoot?.querySelector('button')?.getAttribute('aria-checked')).toBe(
      'true',
    );
  });

  it('恢复组可用状态时不会永久修改子项 disabled / does not permanently mutate item disabled when the group is re-enabled', async () => {
    const { segment, items } = await renderSegment();
    const button = items[0]?.shadowRoot?.querySelector('button');

    segment.disabled = true;
    await segment.updateComplete;
    await items[0]?.updateComplete;
    expect(button?.disabled).toBe(true);
    expect(items[0]?.disabled).toBe(false);

    segment.disabled = false;
    await segment.updateComplete;
    await items[0]?.updateComplete;
    expect(button?.disabled).toBe(false);
    expect(items[0]?.disabled).toBe(false);
  });
});
