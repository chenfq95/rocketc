import { afterEach, describe, expect, it, vi } from 'vitest';

import { getFormValue } from '../../internal/mixin-form-associated';
import { RcCombobox } from './combobox/combobox';
import { RcComboboxOption } from './combobox/combobox-option';
import { RcRadio } from './radio/radio';
import { RcRadioGroup } from './radio/radio-group';

if (!HTMLElement.prototype.attachInternals) {
  Object.defineProperty(HTMLElement.prototype, 'attachInternals', {
    configurable: true,
    value() {
      return {
        form: null,
        labels: document.querySelectorAll(':not(*)'),
        setFormValue: vi.fn(),
      } as unknown as ElementInternals;
    },
  });
}

const definitions = [
  ['rc-combobox', RcCombobox],
  ['rc-combobox-option', RcComboboxOption],
  ['rc-radio', RcRadio],
  ['rc-radio-group', RcRadioGroup],
] as const;

for (const [name, definition] of definitions) {
  if (!customElements.get(name)) customElements.define(name, definition);
}

afterEach(() => {
  document.body.replaceChildren();
});

async function renderRadioGroup() {
  const group = document.createElement('rc-radio-group') as RcRadioGroup;
  group.name = 'choice';
  group.innerHTML = `
    <rc-radio value="first">First</rc-radio>
    <rc-radio value="second">Second</rc-radio>
  `;
  document.body.append(group);
  await group.updateComplete;
  const radios = [...group.querySelectorAll<RcRadio>('rc-radio')];
  await Promise.all(radios.map((radio) => radio.updateComplete));
  return { group, radios };
}

describe('form compound contexts', () => {
  it('通过 Context 管理单选组状态和表单名称 / manages radio state and form name through context', async () => {
    const { group, radios } = await renderRadioGroup();
    const onChange = vi.fn();
    group.addEventListener('change', onChange);

    radios[1]?.shadowRoot?.querySelector('button')?.click();
    await group.updateComplete;
    await Promise.all(radios.map((radio) => radio.updateComplete));

    expect(group.value).toBe('second');
    expect(onChange).toHaveBeenCalledOnce();
    expect(radios[1]?.checked).toBe(false);
    expect(radios[1]?.name).toBe('');
    expect(radios[1]?.shadowRoot?.querySelector('button')?.getAttribute('aria-checked')).toBe(
      'true',
    );

    const formValue = radios[1]?.[getFormValue]();
    expect(formValue).toBeInstanceOf(FormData);
    expect([...(formValue as FormData).entries()]).toEqual([['choice', 'second']]);
  });

  it('恢复单选组可用状态时不会修改子项 disabled / does not mutate radio disabled when the group is re-enabled', async () => {
    const { group, radios } = await renderRadioGroup();
    const button = radios[0]?.shadowRoot?.querySelector('button');

    group.disabled = true;
    await group.updateComplete;
    await radios[0]?.updateComplete;
    expect(button?.disabled).toBe(true);
    expect(radios[0]?.disabled).toBe(false);

    group.disabled = false;
    await group.updateComplete;
    await radios[0]?.updateComplete;
    expect(button?.disabled).toBe(false);
    expect(radios[0]?.disabled).toBe(false);
  });

  it('通过 Context 选择和筛选组合框选项 / selects and filters combobox options through context', async () => {
    const combobox = document.createElement('rc-combobox') as RcCombobox;
    combobox.innerHTML = `
      <rc-combobox-option value="alpha">Alpha</rc-combobox-option>
      <rc-combobox-option value="beta">Beta</rc-combobox-option>
    `;
    const onChange = vi.fn();
    combobox.addEventListener('change', onChange);
    document.body.append(combobox);

    await combobox.updateComplete;
    const options = [...combobox.querySelectorAll<RcComboboxOption>('rc-combobox-option')];
    await Promise.all(options.map((option) => option.updateComplete));

    options[1]?.shadowRoot?.querySelector<HTMLElement>('.item')?.click();
    await combobox.updateComplete;
    await Promise.all(options.map((option) => option.updateComplete));

    expect(combobox.value).toBe('beta');
    expect(combobox.label).toBe('Beta');
    expect(onChange).toHaveBeenCalledOnce();
    expect(options[1]?.selected).toBe(false);
    expect(options[1]?.shadowRoot?.querySelector('.item')?.getAttribute('aria-selected')).toBe(
      'true',
    );

    const input = combobox.shadowRoot?.querySelector('input');
    if (!input) throw new Error('Combobox input was not rendered');
    input.value = 'alp';
    input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    await combobox.updateComplete;
    await Promise.all(options.map((option) => option.updateComplete));

    expect(options[0]?.hidden).toBe(false);
    expect(options[1]?.hidden).toBe(true);
  });
});
