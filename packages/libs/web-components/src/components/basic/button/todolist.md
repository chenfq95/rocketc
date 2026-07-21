# Button 待办事项 / Button Todo List

## 1. 建立行为基线 / Establish the behavioral baseline

- [x] 为点击、键盘激活、禁用和 loading 状态补充测试。 / Add tests for click, keyboard activation, disabled, and loading states.
- [x] 为表单内和通过 `form` 属性关联的按钮补充浏览器测试。 / Add browser tests for buttons inside forms and buttons associated through the `form` attribute.
- [x] 明确区分属性转发测试与实际浏览器行为测试。 / Clearly separate attribute-forwarding tests from real browser-behavior tests.

## 2. 实现表单关联 / Implement form association

- [ ] 使用 `mixinElementInternals` 和 `mixinFormAssociated` 让 host 成为 form-associated custom element。 / Use `mixinElementInternals` and `mixinFormAssociated` to make the host a form-associated custom element.
- [ ] 将 `form` API 调整为只读的 `HTMLFormElement | null`。 / Change the `form` API to a readonly `HTMLFormElement | null`.
- [ ] 支持 disabled fieldset 对按钮状态的影响。 / Support disabled fieldsets affecting the button state.
- [ ] 验证 `labels` 和外部 `<label>` 激活行为。 / Verify `labels` and activation from external `<label>` elements.

## 3. 实现 submitter 行为 / Implement submitter behavior

- [ ] 新增可复用的 form-submitter mixin。 / Add a reusable form-submitter mixin.
- [ ] 支持 `type="submit"`、`type="reset"` 和 `type="button"`。 / Support `type="submit"`, `type="reset"`, and `type="button"`.
- [ ] 提交时仅包含被激活按钮的 `name` 和 `value`。 / Include the activated button's `name` and `value` only during submission.
- [ ] 确保 `preventDefault()` 可以阻止提交或重置。 / Ensure that `preventDefault()` can cancel submission or reset.
- [ ] 确保 `SubmitEvent.submitter` 指向 `rc-button`。 / Ensure that `SubmitEvent.submitter` points to the `rc-button` element.

## 4. 对齐激活与焦点 / Align activation and focus

- [ ] 将 host 的程序化 `.click()` 转换为内部按钮激活，且不产生重复 click 事件。 / Convert programmatic host `.click()` calls into inner-button activation without duplicate click events.
- [ ] 显式代理 `focus()` 和 `blur()`。 / Explicitly delegate `focus()` and `blur()`.
- [ ] 覆盖鼠标、键盘、关联 label 和程序化点击场景。 / Cover mouse, keyboard, associated-label, and programmatic click scenarios.

## 5. 扩展原生能力 / Extend native capabilities

- [ ] 评估 `formAction`、`formEnctype`、`formMethod`、`formNoValidate` 和 `formTarget` 的可实现语义。 / Evaluate implementable semantics for `formAction`, `formEnctype`, `formMethod`, `formNoValidate`, and `formTarget`.
- [ ] 为链接按钮设计 `href`、`target` 和 `download` API。 / Design `href`, `target`, and `download` APIs for link buttons.
- [ ] 分别设计跨 Shadow DOM 的 command 和 popover target 行为。 / Design command and popover-target behavior across Shadow DOM separately.

## 6. 统一按钮家族 / Unify the button family

- [ ] 让 `rc-icon-button` 复用相同的原生按钮和表单 API。 / Make `rc-icon-button` share the same native-button and form APIs.
- [ ] 明确 `rc-close-button` 应暴露和固定的属性。 / Define which properties `rc-close-button` should expose or fix internally.
- [ ] 为 Button、IconButton 和 CloseButton 添加一致性测试。 / Add parity tests for Button, IconButton, and CloseButton.

## 7. 文档与发布 / Documentation and release

- [ ] 更新组件示例和公开 API 文档。 / Update component examples and public API documentation.
- [ ] 在真实浏览器中验证表单、焦点和 Shadow DOM 行为。 / Verify form, focus, and Shadow DOM behavior in real browsers.
- [ ] 根据最终公开 API 更新 changeset。 / Update the changeset for the final public API.
