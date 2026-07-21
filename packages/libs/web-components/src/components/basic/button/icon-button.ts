import { property } from 'lit/decorators.js';

import { RcButton, type RcButtonVariant } from './button';

/**
 * 基于 `rc-button` 的纯图标操作，共享相同的原生按钮、表单、链接和目标动作 API。
 * Icon-only action based on `rc-button`, sharing its native button, form, link, and target-action APIs.
 *
 * 图标通过默认 slot 提供，并应设置明确的无障碍名称。
 * Provide the icon through the default slot and set an explicit accessible name.
 *
 * @element rc-icon-button
 * @slot - 图标内容。 / Icon content.
 * @csspart control - 内部原生按钮或链接。 / Inner native button or link.
 * @csspart label - 图标 slot 容器。 / Icon slot container.
 * @csspart spinner - 加载指示器。 / Loading indicator.
 */
export class RcIconButton extends RcButton {
  @property({ type: String, reflect: true })
  override accessor variant: RcButtonVariant = 'ghost';

  constructor() {
    super();
    this.icon = true;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rc-icon-button': RcIconButton;
  }
}
