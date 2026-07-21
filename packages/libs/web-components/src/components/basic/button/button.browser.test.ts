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

  it('将 host click 转换为一次内部激活 / converts a host click into one inner activation', async () => {
    const element = await renderButton();
    const innerButton = element.shadowRoot?.querySelector('button');
    const onHostClick = vi.fn();
    const onInnerClick = vi.fn();
    element.addEventListener('click', onHostClick);
    innerButton?.addEventListener('click', onInnerClick);

    element.click();

    expect(onHostClick).toHaveBeenCalledOnce();
    expect(onInnerClick).toHaveBeenCalledOnce();
    expect(element.shadowRoot?.activeElement).toBe(innerButton);
  });

  it('代理 focus 和 blur 到内部控件 / delegates focus and blur to the inner control', async () => {
    const element = await renderButton();
    const innerButton = element.shadowRoot?.querySelector('button');

    element.focus();
    expect(document.activeElement).toBe(element);
    expect(element.shadowRoot?.activeElement).toBe(innerButton);

    element.blur();
    expect(element.shadowRoot?.activeElement).toBeNull();
  });

  it('禁用和 loading 状态不会激活按钮 / does not activate disabled or loading buttons', async () => {
    const element = await renderButton();
    const onClick = vi.fn();
    element.addEventListener('click', onClick);
    const innerButton = element.shadowRoot?.querySelector('button');

    element.disabled = true;
    await element.updateComplete;
    innerButton?.click();
    element.click();

    element.disabled = false;
    element.loading = true;
    await element.updateComplete;
    innerButton?.click();
    element.click();

    expect(onClick).not.toHaveBeenCalled();
    expect(innerButton?.disabled).toBe(true);
    expect(innerButton?.getAttribute('aria-busy')).toBe('true');
  });

  it('提交所在表单并将 host 作为 submitter / submits the containing form with the host as submitter', async () => {
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

    expect(onSubmit).toHaveBeenCalledOnce();
    expect(onSubmit.mock.calls[0]?.[0].submitter).toBe(element);
  });

  it('提交通过 form 属性关联的表单 / submits a form associated through the form attribute', async () => {
    const form = document.createElement('form');
    const element = document.createElement('rc-button') as RcButton;
    const onSubmit = vi.fn((event: SubmitEvent) => event.preventDefault());
    form.id = 'profile';
    form.addEventListener('submit', onSubmit);
    element.setAttribute('form', form.id);
    element.type = 'submit';
    element.textContent = 'Submit';
    document.body.append(form, element);
    await element.updateComplete;

    await page.getByRole('button', { name: 'Submit' }).click();

    expect(onSubmit).toHaveBeenCalledOnce();
    expect(onSubmit.mock.calls[0]?.[0].submitter).toBe(element);
  });

  it('在提交期间应用 form override 并在之后恢复 / applies form overrides during submission and restores them afterward', async () => {
    const form = document.createElement('form');
    const input = document.createElement('input');
    const element = document.createElement('rc-button') as RcButton;
    const submissions: Array<Record<string, string | boolean | null>> = [];
    form.setAttribute('action', '/original');
    form.setAttribute('method', 'get');
    form.setAttribute('enctype', 'application/x-www-form-urlencoded');
    form.setAttribute('target', '_self');
    input.required = true;
    element.type = 'submit';
    element.textContent = 'Submit';
    element.formAction = '/override';
    element.formMethod = 'post';
    element.formEnctype = 'multipart/form-data';
    element.formTarget = '_blank';
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      submissions.push({
        action: form.getAttribute('action'),
        enctype: form.getAttribute('enctype'),
        method: form.getAttribute('method'),
        noValidate: form.noValidate,
        target: form.getAttribute('target'),
      });
    });
    form.append(input, element);
    document.body.append(form);
    await element.updateComplete;

    await page.getByRole('button', { name: 'Submit' }).click();
    expect(submissions).toEqual([]);

    element.formNoValidate = true;
    await element.updateComplete;
    await page.getByRole('button', { name: 'Submit' }).click();

    expect(submissions).toEqual([
      {
        action: '/override',
        enctype: 'multipart/form-data',
        method: 'post',
        noValidate: true,
        target: '_blank',
      },
    ]);
    expect(form.getAttribute('action')).toBe('/original');
    expect(form.getAttribute('enctype')).toBe('application/x-www-form-urlencoded');
    expect(form.getAttribute('method')).toBe('get');
    expect(form.noValidate).toBe(false);
    expect(form.getAttribute('target')).toBe('_self');
  });

  it('仅在激活时提交当前按钮的 name 和 value / submits only the activated button name and value during submission', async () => {
    const form = document.createElement('form');
    const title = document.createElement('input');
    const save = document.createElement('rc-button') as RcButton;
    const remove = document.createElement('rc-button') as RcButton;
    let submittedData: Array<[string, FormDataEntryValue]> = [];
    title.name = 'title';
    title.value = 'Draft';
    save.type = 'submit';
    save.name = 'intent';
    save.value = 'save';
    save.textContent = 'Save';
    remove.type = 'submit';
    remove.name = 'intent';
    remove.value = 'remove';
    remove.textContent = 'Remove';
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      submittedData = [...new FormData(form).entries()];
    });
    form.append(title, save, remove);
    document.body.append(form);
    await Promise.all([save.updateComplete, remove.updateComplete]);

    await page.getByRole('button', { name: 'Save' }).click();

    expect(submittedData).toEqual([
      ['title', 'Draft'],
      ['intent', 'save'],
    ]);
    expect([...new FormData(form).entries()]).toEqual([['title', 'Draft']]);
  });

  it('允许 click preventDefault 取消提交 / allows click preventDefault to cancel submission', async () => {
    const form = document.createElement('form');
    const element = document.createElement('rc-button') as RcButton;
    const onSubmit = vi.fn((event: SubmitEvent) => event.preventDefault());
    element.type = 'submit';
    element.textContent = 'Submit';
    element.addEventListener('click', (event) => event.preventDefault(), { once: true });
    form.addEventListener('submit', onSubmit);
    form.append(element);
    document.body.append(form);
    await element.updateComplete;

    await page.getByRole('button', { name: 'Submit' }).click();

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('button 类型在表单中没有默认动作 / has no default form action for the button type', async () => {
    const form = document.createElement('form');
    const element = document.createElement('rc-button') as RcButton;
    const onSubmit = vi.fn((event: SubmitEvent) => event.preventDefault());
    const onReset = vi.fn();
    element.type = 'button';
    element.textContent = 'Action';
    form.addEventListener('submit', onSubmit);
    form.addEventListener('reset', onReset);
    form.append(element);
    document.body.append(form);
    await element.updateComplete;

    await page.getByRole('button', { name: 'Action' }).click();

    expect(onSubmit).not.toHaveBeenCalled();
    expect(onReset).not.toHaveBeenCalled();
  });

  it('使用真实链接控件并退出表单提交 / uses a real link control and opts out of form submission', async () => {
    const form = document.createElement('form');
    const element = document.createElement('rc-button') as RcButton;
    const onSubmit = vi.fn((event: SubmitEvent) => event.preventDefault());
    element.type = 'submit';
    element.href = '#profile';
    element.target = '_self';
    element.download = 'profile.txt';
    element.textContent = 'Profile';
    form.addEventListener('submit', onSubmit);
    form.append(element);
    document.body.append(form);
    await element.updateComplete;

    const anchor = element.shadowRoot?.querySelector('a');
    const onAnchorClick = vi.fn((event: MouseEvent) => event.preventDefault());
    anchor?.addEventListener('click', onAnchorClick);
    element.click();

    expect(element.shadowRoot?.querySelector('button')).toBeNull();
    expect(anchor?.getAttribute('href')).toBe('#profile');
    expect(anchor?.getAttribute('target')).toBe('_self');
    expect(anchor?.getAttribute('download')).toBe('profile.txt');
    expect(onAnchorClick).toHaveBeenCalledOnce();
    expect(onSubmit).not.toHaveBeenCalled();
    expect(element.willValidate).toBe(false);
    expect(element.shadowRoot?.activeElement).toBe(anchor);

    element.disabled = true;
    await element.updateComplete;
    const disabledAnchor = element.shadowRoot?.querySelector('a');
    expect(disabledAnchor?.hasAttribute('href')).toBe(false);
    expect(disabledAnchor?.getAttribute('aria-disabled')).toBe('true');
    expect(disabledAnchor?.tabIndex).toBe(-1);
  });

  it('重置表单并允许 click preventDefault 取消 / resets the form and allows click preventDefault to cancel', async () => {
    const form = document.createElement('form');
    const input = document.createElement('input');
    const element = document.createElement('rc-button') as RcButton;
    input.defaultValue = 'Initial';
    input.value = 'Changed';
    element.type = 'reset';
    element.textContent = 'Reset';
    element.addEventListener('click', (event) => event.preventDefault(), { once: true });
    form.append(input, element);
    document.body.append(form);
    await element.updateComplete;

    await page.getByRole('button', { name: 'Reset' }).click();
    expect(input.value).toBe('Changed');

    await page.getByRole('button', { name: 'Reset' }).click();
    expect(input.value).toBe('Initial');
  });

  it('公开浏览器计算的表单所有者 / exposes the browser-computed form owner', async () => {
    const form = document.createElement('form');
    const element = document.createElement('rc-button') as RcButton;
    form.id = 'profile';
    form.append(element);
    document.body.append(form);
    await element.updateComplete;

    expect(element.form).toBe(form);

    element.remove();
    element.setAttribute('form', form.id);
    document.body.append(element);

    expect(element.form).toBe(form);
  });

  it('响应 disabled fieldset 状态 / responds to disabled fieldset state', async () => {
    const fieldset = document.createElement('fieldset');
    const element = document.createElement('rc-button') as RcButton;
    fieldset.disabled = true;
    fieldset.append(element);
    document.body.append(fieldset);
    await element.updateComplete;

    expect(element.disabled).toBe(false);
    expect(element.shadowRoot?.querySelector('button')?.disabled).toBe(true);

    fieldset.disabled = false;
    await element.updateComplete;

    expect(element.disabled).toBe(false);
    expect(element.shadowRoot?.querySelector('button')?.disabled).toBe(false);

    element.disabled = true;
    fieldset.disabled = true;
    fieldset.disabled = false;
    await element.updateComplete;

    expect(element.disabled).toBe(true);
    expect(element.shadowRoot?.querySelector('button')?.disabled).toBe(true);
  });

  it('暴露原生约束校验 API 并参与表单校验 / exposes native constraint-validation APIs and participates in form validation', async () => {
    const form = document.createElement('form');
    const element = document.createElement('rc-button') as RcButton;
    const onInvalid = vi.fn();
    element.type = 'submit';
    element.textContent = 'Submit';
    element.addEventListener('invalid', onInvalid);
    form.append(element);
    document.body.append(form);
    await element.updateComplete;

    expect(element.willValidate).toBe(true);
    expect(element.validity.valid).toBe(true);
    expect(element.validationMessage).toBe('');
    expect(element.checkValidity()).toBe(true);

    element.setCustomValidity('Confirm the action');

    expect(element.validity.customError).toBe(true);
    expect(element.validity.valid).toBe(false);
    expect(element.validationMessage).toBe('Confirm the action');
    expect(element.checkValidity()).toBe(false);
    expect(form.checkValidity()).toBe(false);
    expect(onInvalid).toHaveBeenCalledTimes(2);

    element.setCustomValidity('');

    expect(element.validity.valid).toBe(true);
    expect(element.checkValidity()).toBe(true);
    expect(form.checkValidity()).toBe(true);
  });

  it('仅在 submit 类型下参与约束校验 / participates in constraint validation only for the submit type', async () => {
    const form = document.createElement('form');
    const element = document.createElement('rc-button') as RcButton;
    element.type = 'button';
    form.append(element);
    document.body.append(form);
    await element.updateComplete;

    element.setCustomValidity('Blocked');

    expect(element.willValidate).toBe(false);
    expect(element.validity.customError).toBe(true);
    expect(element.validationMessage).toBe('');
    expect(element.checkValidity()).toBe(true);
    expect(element.reportValidity()).toBe(true);
    expect(form.checkValidity()).toBe(true);

    element.type = 'submit';
    await element.updateComplete;

    expect(element.willValidate).toBe(true);
    expect(element.validationMessage).toBe('Blocked');
    expect(element.checkValidity()).toBe(false);
    expect(form.checkValidity()).toBe(false);

    element.type = 'reset';
    await element.updateComplete;

    expect(element.willValidate).toBe(false);
    expect(element.validationMessage).toBe('');
    expect(element.checkValidity()).toBe(true);
    expect(form.checkValidity()).toBe(true);
  });

  it('公开关联 labels 并响应 label 激活 / exposes associated labels and responds to label activation', async () => {
    const label = document.createElement('label');
    const element = document.createElement('rc-button') as RcButton;
    const onClick = vi.fn();
    const onInnerClick = vi.fn();
    label.htmlFor = 'save-button';
    label.textContent = 'Save profile';
    element.id = 'save-button';
    element.textContent = 'Save';
    element.addEventListener('click', onClick);
    document.body.append(label, element);
    await element.updateComplete;
    element.shadowRoot?.querySelector('button')?.addEventListener('click', onInnerClick);

    expect([...element.labels]).toEqual([label]);

    await page.getByText('Save profile').click();

    expect(onClick).toHaveBeenCalledOnce();
    expect(onInnerClick).toHaveBeenCalledOnce();
    expect(element.shadowRoot?.activeElement).toBe(element.shadowRoot?.querySelector('button'));
  });

  it('从 host 所在 tree root 解析并执行 dialog command / resolves and performs dialog commands from the host tree root', async () => {
    const dialog = document.createElement('dialog');
    const element = document.createElement('rc-button') as RcButton;
    let receivedCommand = '';
    let receivedSource: Element | null = null;
    dialog.id = 'settings';
    element.command = 'show-modal';
    element.commandFor = dialog.id;
    element.textContent = 'Open settings';
    dialog.addEventListener('command', (event) => {
      receivedCommand = Reflect.get(event, 'command');
      receivedSource = Reflect.get(event, 'source');
    });
    document.body.append(element, dialog);
    await element.updateComplete;

    await page.getByRole('button', { name: 'Open settings' }).click();

    expect(dialog.open).toBe(true);
    expect(receivedCommand).toBe('show-modal');
    expect(receivedSource).toBe(element);

    element.command = 'close';
    await element.updateComplete;
    element.shadowRoot?.querySelector('button')?.click();
    expect(dialog.open).toBe(false);

    dialog.addEventListener('command', (event) => event.preventDefault(), { once: true });
    element.command = 'show-modal';
    await element.updateComplete;
    element.shadowRoot?.querySelector('button')?.click();
    expect(dialog.open).toBe(false);

    const form = document.createElement('form');
    const onSubmit = vi.fn((event: SubmitEvent) => event.preventDefault());
    form.addEventListener('submit', onSubmit);
    form.append(element);
    document.body.append(form);
    element.type = 'submit';
    await element.updateComplete;
    element.shadowRoot?.querySelector('button')?.click();
    expect(onSubmit).toHaveBeenCalledOnce();
    expect(dialog.open).toBe(false);
  });

  it('跨越按钮内部 Shadow DOM 控制 host tree root 中的 popover / controls a popover in the host tree root across the button shadow boundary', async () => {
    const container = document.createElement('div');
    const root = container.attachShadow({ mode: 'open' });
    const popover = document.createElement('div');
    const element = document.createElement('rc-button') as RcButton;
    popover.id = 'actions';
    popover.setAttribute('popover', 'manual');
    element.popoverTarget = popover.id;
    element.popoverTargetAction = 'show';
    element.textContent = 'Actions';
    root.append(element, popover);
    document.body.append(container);
    await element.updateComplete;

    element.shadowRoot?.querySelector('button')?.click();
    expect(popover.matches(':popover-open')).toBe(true);

    element.popoverTargetAction = 'hide';
    await element.updateComplete;
    element.shadowRoot?.querySelector('button')?.click();
    expect(popover.matches(':popover-open')).toBe(false);

    element.popoverTargetAction = 'toggle';
    await element.updateComplete;
    element.shadowRoot?.querySelector('button')?.click();
    expect(popover.matches(':popover-open')).toBe(true);
  });
});
