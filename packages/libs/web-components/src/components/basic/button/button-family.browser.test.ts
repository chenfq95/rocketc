import { afterEach, describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';

import { RcButton } from './button';
import { RcCloseButton } from './close-button';
import { RcIconButton } from './icon-button';

if (!customElements.get('rc-button')) customElements.define('rc-button', RcButton);
if (!customElements.get('rc-icon-button')) customElements.define('rc-icon-button', RcIconButton);
if (!customElements.get('rc-close-button')) customElements.define('rc-close-button', RcCloseButton);

afterEach(() => {
  document.body.replaceChildren();
});

describe('button family browser behavior', () => {
  it('IconButton 共享 Button 的原生和表单 API / shares Button native and form APIs on IconButton', async () => {
    const form = document.createElement('form');
    const element = document.createElement('rc-icon-button') as RcIconButton;
    const onSubmit = vi.fn((event: SubmitEvent) => event.preventDefault());
    let submittedData: Array<[string, FormDataEntryValue]> = [];
    element.type = 'submit';
    element.name = 'intent';
    element.value = 'save';
    element.setAttribute('aria-label', 'Save icon');
    element.innerHTML = '<span aria-hidden="true">S</span>';
    form.addEventListener('submit', (event) => {
      onSubmit(event);
      submittedData = [...new FormData(form).entries()];
    });
    form.append(element);
    document.body.append(form);
    await element.updateComplete;

    await page.getByRole('button', { name: 'Save icon' }).click();

    expect(element).toBeInstanceOf(RcButton);
    expect(element.icon).toBe(true);
    expect(element.variant).toBe('ghost');
    expect(element.form).toBe(form);
    expect(onSubmit).toHaveBeenCalledOnce();
    expect(onSubmit.mock.calls[0]?.[0].submitter).toBe(element);
    expect(submittedData).toEqual([['intent', 'save']]);
  });

  it('IconButton 共享链接模式 / shares link mode on IconButton', async () => {
    const element = document.createElement('rc-icon-button') as RcIconButton;
    element.href = '#settings';
    element.target = '_self';
    element.download = 'settings.json';
    element.setAttribute('aria-label', 'Settings link');
    document.body.append(element);
    await element.updateComplete;

    const anchor = element.shadowRoot?.querySelector('a');
    expect(anchor?.getAttribute('href')).toBe('#settings');
    expect(anchor?.getAttribute('target')).toBe('_self');
    expect(anchor?.getAttribute('download')).toBe('settings.json');
  });

  it('CloseButton 固定为无表单默认动作的 button / keeps CloseButton fixed to a button with no form default action', async () => {
    const form = document.createElement('form');
    const element = document.createElement('rc-close-button') as RcCloseButton;
    const onSubmit = vi.fn((event: SubmitEvent) => event.preventDefault());
    const onReset = vi.fn();
    element.setAttribute('type', 'submit');
    form.addEventListener('submit', onSubmit);
    form.addEventListener('reset', onReset);
    form.append(element);
    document.body.append(form);
    await element.updateComplete;

    const iconButton = element.shadowRoot?.querySelector('rc-icon-button');
    await iconButton?.updateComplete;
    expect(iconButton?.type).toBe('button');
    expect('form' in element).toBe(false);
    expect('href' in element).toBe(false);

    await page.getByRole('button', { name: 'Close' }).click();

    expect(onSubmit).not.toHaveBeenCalled();
    expect(onReset).not.toHaveBeenCalled();
  });
});
