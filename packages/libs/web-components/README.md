# @rocketc/web-components

基于 [`@rocketc/design-system`](../design-system) 语义 Token（`--rc-*`）构建的 Web Components（Lit）组件库。

A Web Components library built with Lit on the [`@rocketc/design-system`](../design-system) semantic tokens (`--rc-*`).

响应式属性使用**标准装饰器**（`@property` + `accessor`）。此包通过 Vite 8 编译，并使用 Babel 降级装饰器，因此产物可以在现代浏览器中运行。

Reactive properties use **standard decorators** (`@property` + `accessor`). The package is compiled with Vite 8 and uses Babel to lower decorators, so its output runs in modern browsers.

## 安装 / Installation

```bash
bun add @rocketc/web-components @rocketc/design-system
```

```ts
import '@rocketc/design-system/css/default.light.css';
import { registerRocketcCustomElements } from '@rocketc/web-components';

// SSR-safe: no-ops on the server, defines custom elements in the browser.
registerRocketcCustomElements();
```

### CDN 直接引入 / Direct CDN Usage

无需安装或构建工具时，可以从 jsDelivr 直接加载设计系统主题和单文件 ESM 组件产物。生产环境应固定明确版本号。

When no package installation or build tooling is available, load the design-system theme and single-file ESM component build directly from jsDelivr. Pin an explicit version in production.

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@rocketc/design-system@0.0.1/dist/css/default.light.css"
/>
<script type="module">
  import { registerRocketcCustomElements } from 'https://cdn.jsdelivr.net/npm/@rocketc/web-components@0.0.1/dist/index.min.js';

  registerRocketcCustomElements();
</script>

<rc-button variant="primary">保存 / Save</rc-button>
```

## 压缩产物 / Minified Build

构建时会额外生成包含运行时依赖的单文件 ESM 产物 `dist/index.min.js`，也可以通过 `@rocketc/web-components/min` 导入。

The build also emits `dist/index.min.js`, a single-file ESM bundle containing its runtime dependencies. It is also available through `@rocketc/web-components/min`.

## 通用样式属性 / Common Style Properties

所有组件都支持通用宿主样式属性。属性值可以使用 Rocketc Token 别名、任意 CSS 变量或原始 CSS 值；最终样式通过 Shadow Root 中的 `:host` CSS 规则应用，不会写入宿主的内联 `style`。

Every component supports common host-style properties. Values may be Rocketc token aliases, any CSS variable, or raw CSS values; resolved styles are applied through a `:host` CSS rule in the Shadow Root without writing to the host's inline `style`.

| 分组 / Group                    | 属性 / Properties                                                                                      |
| ------------------------------- | ------------------------------------------------------------------------------------------------------ |
| 间距与布局 / Spacing and layout | `pd`, `px`, `py`, `mg`, `mx`, `my`, `display`, `gap`, `align-items`, `justify`, `position`, `overflow` |
| 尺寸 / Sizing                   | `width`, `height`, `min-width`, `max-width`, `min-height`, `max-height`                                |
| 边框与表面 / Border and surface | `border`, `border-width`, `border-style`, `border-color`, `border-radius`, `bg`                        |
| 排版 / Typography               | `color`, `font-size`, `font-weight`, `line-height`, `text-align`                                       |

```html
<rc-card
  px="lg"
  py="md"
  mx="auto"
  my="var(--rc-space-4)"
  display="grid"
  gap="md"
  border="sm"
  border-radius="xl"
  bg="panel"
  color="primary"
></rc-card>
```

间距别名包括 `none`、`xs`、`sm`、`md`、`lg`、`xl` 和 `2xl`；也可以直接使用设计 Token 的刻度值，例如 `pd="4"`。表面、文字、边框、圆角和排版字段同样支持对应的语义别名。无法识别的值会按原始 CSS 值保留。

Spacing aliases include `none`, `xs`, `sm`, `md`, `lg`, `xl`, and `2xl`; design-token scale values such as `pd="4"` are also accepted. Surface, text, border, radius, and typography fields support their corresponding semantic aliases. Unrecognized values are preserved as raw CSS values.

## CSS 部件 / CSS Parts

存在内部 DOM 的组件会暴露稳定的语义部件。常用名称包括主包装层 `container`、原生交互节点 `control`、重复项 `item`，以及 `label`、`title`、`body`、`header`、`footer`、`input`、`close` 等具体节点。各组件的完整列表可在组件站点的 API 参考中查看。

Components with internal DOM expose stable semantic parts. Common names include `container` for the primary wrapper, `control` for native interactive elements, `item` for repeated entries, and specific nodes such as `label`, `title`, `body`, `header`, `footer`, `input`, and `close`. The component site lists the complete API for each component.

```css
rc-dialog::part(panel) {
  max-width: 44rem;
}

rc-dialog::part(close) {
  color: var(--rc-color-text-muted);
}
```

## 结构 / Structure

```text
src/components/
  basic/button/
    button.ts
    icon-button.ts
    close-button.ts
    demo/                # HTML 用法片段 / HTML usage snippets
  navigation/tabs/
    tabs.ts
    tab.ts
    demo/
  …
```

每个组件或复合组件族都位于独立目录中，并通过 `index.ts` 统一导出。相关部件共享同一个目录，例如 `tabs/` 同时包含 `tabs.ts` 和 `tab.ts`。

Each component or compound family lives in its own directory and is exported through an `index.ts` barrel. Related parts share a directory; for example, `tabs/` contains both `tabs.ts` and `tab.ts`.

每个目录都包含带有 HTML 用法片段的 `demo/`。Astro **用法站点**为每个组件提供一个页面，其中包含预览和从源码提取的 API：

Every directory contains a `demo/` with HTML usage snippets. The Astro **usage site** provides one page per component, including a preview and API information extracted from source:

```bash
bun run build
bun run site:dev
```

设计系统的 Vite 预览仅展示 Token 和主题；组件用法位于此包的 `site/` 中。

The design-system Vite preview covers only tokens and themes; component usage lives in this package's `site/`.

## 组件 / Components

### `basic/`

| 元素 / Element                                                   | 用途 / Role                                           |
| ---------------------------------------------------------------- | ----------------------------------------------------- |
| `rc-button` / `rc-icon-button` / `rc-close-button`               | 操作 / Actions                                        |
| `rc-link`                                                        | 链接 / Link                                           |
| `rc-typography`                                                  | 文本与标题 / Text and headings                        |
| `rc-field`                                                       | 标签、帮助和错误容器 / Label, helper, and error shell |
| `rc-input` / `rc-textarea` / `rc-select`                         | 原生表单字段 / Native fields                          |
| `rc-number-input` / `rc-password-input` / `rc-pin-input`         | 专用输入框 / Specialized inputs                       |
| `rc-tags-input` / `rc-combobox` / `rc-combobox-option`           | 多选和搜索选择 / Multi-select and search-select       |
| `rc-color-picker` / `rc-file-upload`                             | 选择器 / Pickers                                      |
| `rc-checkbox` / `rc-radio` / `rc-radio-group`                    | 选项选择 / Selection                                  |
| `rc-segment` / `rc-segment-item`                                 | 分段控件 / Segmented control                          |
| `rc-switch` / `rc-slider` / `rc-rating`                          | 开关与范围 / Toggles and ranges                       |
| `rc-label` / `rc-fieldset`                                       | 表单外观 / Form chrome                                |
| `rc-dialog` / `rc-details`                                       | 展开与披露 / Disclosure                               |
| `rc-progress` / `rc-progress-circle` / `rc-spinner` / `rc-meter` | 进度 / Progress                                       |

### `feedback/`

反馈组件 / Feedback components：`rc-alert` · `rc-badge` · `rc-tag` · `rc-banner` · `rc-toast` · `rc-snackbar` · `rc-skeleton`

### `surfaces/`

表面组件 / Surface components：`rc-card` · `rc-panel` · `rc-sheet` · `rc-popover`

### `navigation/`

导航组件 / Navigation components：`rc-tabs` / `rc-tab` · `rc-breadcrumb` · `rc-menu` / `rc-menu-item` · `rc-pagination` · `rc-sidebar` · `rc-accordion` / `rc-accordion-item` · `rc-steps` / `rc-step` · `rc-timeline` / `rc-timeline-item`

### `overlay/`

浮层组件 / Overlay components：`rc-drawer` · `rc-dropdown` · `rc-tooltip` · `rc-hover-card` · `rc-toggle-tip`

### `data/`

数据展示组件 / Data-display components：`rc-table` · `rc-list` / `rc-list-item` · `rc-avatar` · `rc-empty` · `rc-stat`

### `layout/`

布局组件 / Layout components：`rc-box` · `rc-flex` · `rc-center` · `rc-stack` · `rc-grid` · `rc-separator` · `rc-divider` · `rc-scroll-area`

`rc-box`、`rc-flex`、`rc-center`、`rc-stack` 和 `rc-grid` 默认不附加背景、边框、内边距或圆角。需要这些外观样式时，可以显式使用 `bg`、`border`、`pd`、`px`、`py` 和 `border-radius`。

`rc-box`, `rc-flex`, `rc-center`, `rc-stack`, and `rc-grid` do not add a background, border, padding, or radius by default. Apply these appearance styles explicitly with `bg`, `border`, `pd`, `px`, `py`, and `border-radius`.

`rc-stack` 默认继承父级颜色且不附加间距；需要子项间距时请显式设置 `gap`。

`rc-stack` inherits its parent color and adds no spacing by default; set `gap` explicitly when its children need spacing.

## 表单 / Forms

以下组件通过 `mixinElementInternals` 和 `mixinFormAssociated` 与表单关联：`rc-input`、`rc-textarea`、`rc-select`、`rc-checkbox`、`rc-radio`、`rc-switch`、`rc-slider`、`rc-number-input`、`rc-password-input`、`rc-pin-input`、`rc-tags-input`、`rc-combobox`、`rc-rating`、`rc-color-picker`、`rc-file-upload`。

The following components are form-associated through `mixinElementInternals` and `mixinFormAssociated`: `rc-input`, `rc-textarea`, `rc-select`, `rc-checkbox`, `rc-radio`, `rc-switch`, `rc-slider`, `rc-number-input`, `rc-password-input`, `rc-pin-input`, `rc-tags-input`, `rc-combobox`, `rc-rating`, `rc-color-picker`, and `rc-file-upload`.

## 无障碍 / Accessibility

交互控件使用 ARIA 委托（`mixinDelegatesAria`）。`aria-labelledby` 等 IDREF 属性会保留在宿主元素上。

Interactive controls use ARIA delegation (`mixinDelegatesAria`). IDREF attributes such as `aria-labelledby` remain on the host element.

## 预览 / Preview

```bash
cd packages/libs/design-system
bun run build:tokens
bun run dev
```

## 构建 / Build

```bash
bun run build
bun run build:watch
```
