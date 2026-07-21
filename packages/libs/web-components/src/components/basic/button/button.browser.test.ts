import { afterEach, describe, expect, it, vi } from 'vitest';
import { page, userEvent } from 'vitest/browser';

import { RcButton } from './button';

if (!customElements.get('rc-button')) customElements.define('rc-button', RcButton);

afterEach(() => {
  document.body.replaceChildren();
});

async function renderButton(label = 'Save') {
  const element = document.createElement('rc-button') as RcButton;
  element.textContent = label;
  document.body.append(element);
  await element.updateComplete;
  return element;
}

describe('rc-button browser behavior', () => {
  it('通过鼠标和键盘激活内部按钮 / activates the inner button with pointer and keyboard input', async () => {
    const element = await renderButton();
    const onClick = vi.fn();
    element.addEventListener('click', onClick);
    const button = page.getByRole('button', { name: 'Save' });

    await button.click();
    element.shadowRoot?.querySelector('button')?.focus();
    await userEvent.keyboard('{Enter}');
    await userEvent.keyboard(' ');

    expect(onClick).toHaveBeenCalledTimes(3);
  });

  it('禁用和 loading 状态不会激活按钮 / does not activate disabled or loading buttons', async () => {
    const element = await renderButton();
    const onClick = vi.fn();
    element.addEventListener('click', onClick);
    const innerButton = element.shadowRoot?.querySelector('button');

    element.disabled = true;
    await element.updateComplete;
    innerButton?.click();

    element.disabled = false;
    element.loading = true;
    await element.updateComplete;
    innerButton?.click();

    expect(onClick).not.toHaveBeenCalled();
    expect(innerButton?.disabled).toBe(true);
    expect(innerButton?.getAttribute('aria-busy')).toBe('true');
  });

  it('记录表单内 submit 按钮当前不会提交 / records that an in-form submit button does not currently submit', async () => {
    const form = document.createElement('form');
    const element = document.createElement('rc-button') as RcButton;
    const onSubmit = vi.fn((event: SubmitEvent) => event.preventDefault());
    element.type = 'submit';
    element.textContent = 'Submit';
    form.addEventListener('submit', onSubmit);
    form.append(element);
    document.body.append(form);
    await element.updateComplete;

    await page.getByRole('button', { name: 'Submit' }).click();

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('记录通过 form 属性关联的按钮当前不会提交 / records that a button associated by form attribute does not currently submit', async () => {
    const form = document.createElement('form');
    const element = document.createElement('rc-button') as RcButton;
    const onSubmit = vi.fn((event: SubmitEvent) => event.preventDefault());
    form.id = 'profile';
    form.addEventListener('submit', onSubmit);
    element.form = form.id;
    element.type = 'submit';
    element.textContent = 'Submit';
    document.body.append(form, element);
    await element.updateComplete;

    await page.getByRole('button', { name: 'Submit' }).click();

    expect(onSubmit).not.toHaveBeenCalled();
  });
});
