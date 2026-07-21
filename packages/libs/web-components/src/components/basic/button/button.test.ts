import { afterEach, describe, expect, it, vi } from 'vitest';

import { RcButton } from './button';

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

if (!customElements.get('rc-button')) customElements.define('rc-button', RcButton);

afterEach(() => {
  document.body.replaceChildren();
});

describe('rc-button', () => {
  it('将内部按钮点击作为组合事件暴露给 host / exposes inner button clicks as composed host events', async () => {
    const element = document.createElement('rc-button') as RcButton;
    const onClick = vi.fn();
    element.addEventListener('click', onClick);
    document.body.append(element);

    await element.updateComplete;
    element.shadowRoot?.querySelector('button')?.click();

    expect(onClick).toHaveBeenCalledOnce();
    expect(onClick.mock.calls[0]?.[0]).toMatchObject({
      bubbles: true,
      composed: true,
    });
  });

  it('禁用时阻止内部按钮点击 / prevents inner button clicks when disabled', async () => {
    const element = document.createElement('rc-button') as RcButton;
    const onClick = vi.fn();
    element.disabled = true;
    element.addEventListener('click', onClick);
    document.body.append(element);

    await element.updateComplete;
    const button = element.shadowRoot?.querySelector('button');
    button?.click();

    expect(button?.disabled).toBe(true);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('使用表单关联的有效禁用状态且不改写 disabled / uses form-associated effective disabled state without mutating disabled', async () => {
    const element = document.createElement('rc-button') as RcButton;
    document.body.append(element);

    element.formDisabledCallback(true);
    await element.updateComplete;

    expect(element.disabled).toBe(false);
    expect(element.shadowRoot?.querySelector('button')?.disabled).toBe(true);

    element.formDisabledCallback(false);
    await element.updateComplete;

    expect(element.disabled).toBe(false);
    expect(element.shadowRoot?.querySelector('button')?.disabled).toBe(false);
  });

  it('loading 时禁用按钮并保留内容 / disables the button and preserves content while loading', async () => {
    const element = document.createElement('rc-button') as RcButton;
    element.loading = true;
    element.textContent = 'Save';
    document.body.append(element);

    await element.updateComplete;
    const button = element.shadowRoot?.querySelector('button');

    expect(button?.disabled).toBe(true);
    expect(button?.getAttribute('aria-busy')).toBe('true');
    expect(button?.querySelector('[part="spinner"]')).not.toBeNull();
    expect(element.textContent).toBe('Save');
  });

  it('将原生按钮属性转发给内部按钮 / forwards native button attributes to the inner button', async () => {
    const element = document.createElement('rc-button') as RcButton;
    element.type = 'submit';
    element.name = 'intent';
    element.value = 'save';
    element.setAttribute('form', 'profile');
    element.formAction = '/profiles';
    element.formEnctype = 'multipart/form-data';
    element.formMethod = 'post';
    element.formNoValidate = true;
    element.formTarget = '_blank';
    element.autofocus = true;
    element.disabled = true;
    document.body.append(element);

    await element.updateComplete;

    const button = element.shadowRoot?.querySelector('button');
    expect(button).toBeInstanceOf(HTMLButtonElement);
    expect(button?.getAttributeNames().sort()).toEqual([
      'autofocus',
      'disabled',
      'formaction',
      'formenctype',
      'formmethod',
      'formnovalidate',
      'formtarget',
      'name',
      'part',
      'type',
      'value',
    ]);
    expect(button?.getAttribute('type')).toBe('submit');
    expect(button?.getAttribute('name')).toBe('intent');
    expect(button?.getAttribute('value')).toBe('save');
    expect(element.getAttribute('form')).toBe('profile');
    expect(button?.hasAttribute('form')).toBe(false);
    expect(button?.getAttribute('formaction')).toBe('/profiles');
    expect(button?.getAttribute('formenctype')).toBe('multipart/form-data');
    expect(button?.getAttribute('formmethod')).toBe('post');
    expect(button?.getAttribute('formtarget')).toBe('_blank');
  });

  it('转发现代按钮命令与弹出框属性 / forwards modern command and popover attributes', async () => {
    const element = document.createElement('rc-button') as RcButton;
    element.command = 'show-modal';
    element.commandFor = 'settings-dialog';
    element.popoverTarget = 'actions';
    element.popoverTargetAction = 'show';
    document.body.append(element);

    await element.updateComplete;

    const button = element.shadowRoot?.querySelector('button');
    expect(button?.getAttribute('command')).toBe('show-modal');
    expect(button?.getAttribute('commandfor')).toBe('settings-dialog');
    expect(button?.getAttribute('popovertarget')).toBe('actions');
    expect(button?.getAttribute('popovertargetaction')).toBe('show');
  });

  it('未设置可选属性时不渲染空属性 / omits unset optional attributes', async () => {
    const element = document.createElement('rc-button') as RcButton;
    document.body.append(element);

    await element.updateComplete;

    const button = element.shadowRoot?.querySelector('button');
    for (const attribute of [
      'command',
      'commandfor',
      'formaction',
      'formenctype',
      'formmethod',
      'formnovalidate',
      'formtarget',
      'name',
      'popovertarget',
      'popovertargetaction',
      'value',
    ]) {
      expect(button?.hasAttribute(attribute), attribute).toBe(false);
    }
  });
});
