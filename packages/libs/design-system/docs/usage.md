# Usage / 用法

How to consume `@rocketc/design-system`: themes, package exports, adapters, and common recipes.

如何消费 `@rocketc/design-system`：主题、包导出、适配器与常用配方。

## Install & build / 安装与构建

From the monorepo workspace, the package is available as `@rocketc/design-system`.

在 monorepo workspace 中，包名为 `@rocketc/design-system`。

Compiled assets are produced by / 编译产物由以下命令生成：

```bash
cd packages/libs/design-system
bun run build:tokens
```

Consumers of the published package use `dist/` via package exports. Working from git, run the build before importing CSS/JS adapters if `dist/` is not committed.

发布包通过 exports 使用 `dist/`。若从 git 工作且未提交 `dist/`，导入 CSS/JS 适配器前请先构建。

---

## Themes / 主题

Two theme **families** × two **modes** = four compiled themes.

两个主题**族** × 两种**模式** = 四套编译主题。

| Theme / 主题    | Character / 性格                                            | CSS selector / CSS 选择器               |
| --------------- | ----------------------------------------------------------- | --------------------------------------- |
| `default.light` | Black brand, Next.js-like light / 黑品牌、偏 Next 亮色      | `:root`, `[data-theme='default.light']` |
| `default.dark`  | Light solid brand on dark chrome / 暗色壳层上的浅色实心品牌 | `[data-theme='default.dark']`           |
| `sun.light`     | Orange brand, light / 橙品牌亮色                            | `[data-theme='sun.light']`              |
| `sun.dark`      | Orange brand, dark / 橙品牌暗色                             | `[data-theme='sun.dark']`               |

`tokens/theme/default.light/` is intentionally empty because it uses the semantic baseline directly.

`tokens/theme/default.light/` 有意留空，因为它直接使用语义基线。

| Need / 需求                      | Family / 族 |
| -------------------------------- | ----------- |
| Neutral black brand / 中性黑品牌 | `default`   |
| Orange brand / 橙品牌            | `sun`       |

Apps consume the same semantic roles (`control.primary.*`, `brand.*`, …); only the resolved values change with family/mode.

应用消费同一套语义角色（`control.primary.*`、`brand.*` 等）；仅解析值随品牌族/模式变化。

### Switching themes / 切换主题

Set the attribute on the document element (preview does this):

在文档根元素设置属性（预览即如此）：

```ts
document.documentElement.dataset.theme = 'sun.dark';
```

Load the CSS files you need for runtime toggle:

加载运行时切换所需的 CSS：

```ts
import '@rocketc/design-system/css/default.light.css';
import '@rocketc/design-system/css/default.dark.css';
import '@rocketc/design-system/css/sun.light.css';
import '@rocketc/design-system/css/sun.dark.css';
```

`default.light` variables apply by default; explicit variants activate under their matching `data-theme` value.

`default.light` 变量默认生效；其他变体在匹配的 `data-theme` 下激活。

---

## Prefer semantic tokens / 优先语义 Token

```css
/* Good / 推荐 */
color: var(--rc-color-text-primary);
background: var(--rc-color-surface-panel);
box-shadow: var(--rc-shadow-surface);

/* Avoid when a role exists / 已有角色时避免 */
color: var(--rc-color-neutral-950);
```

```ts
// Good: theme roles through adapters / 推荐：经适配器使用主题角色
theme.palette.primary.main; // primary control recipe via MUI adapter

// Avoid: hardcoding brand hex in components / 避免：在组件写死品牌 hex
```

Role meaning → [Foundations](./foundations.md).

角色含义 → [基础](./foundations.md)。

---

## Output surfaces / 输出面

| Export / 导出                               | Purpose / 用途                                                     |
| ------------------------------------------- | ------------------------------------------------------------------ |
| `@rocketc/design-system/css/<theme>.css`    | CSS variables + normalize + baseline / CSS 变量 + normalize + 基线 |
| `@rocketc/design-system/js`                 | All token maps + types / 全部 Token 映射与类型                     |
| `@rocketc/design-system/js/<theme>`         | Per-theme map / 单主题映射                                         |
| `@rocketc/design-system/mui`                | All MUI `ThemeOptions` / 全部 MUI 主题选项                         |
| `@rocketc/design-system/mui/<theme>`        | Per-theme MUI options / 单主题 MUI                                 |
| `@rocketc/design-system/chakra/<theme>`     | Per-theme Chakra v3 system config / 单主题 Chakra 配置             |
| `@rocketc/design-system/tailwind/theme.css` | Tailwind v4 theme + shadcn aliases / Tailwind 主题与 shadcn 别名   |

CSS variable prefix / CSS 变量前缀： **`rc`** (`--rc-*`).

---

## CSS adapter / CSS 适配器

Best for plain HTML, custom components, and any stack that reads custom properties.

适合纯 HTML、自定义组件，以及任何读取自定义属性的技术栈。

- Prefer semantic variables / 优先语义变量：`--rc-color-text-primary`, `--rc-shadow-raised`
- Typography roles expand to multiple properties / 字体角色展开为多属性
- Baseline normalize is inlined in the generated CSS / 生成 CSS 已内联 normalize

```ts
import '@rocketc/design-system/css/default.light.css';
import '@rocketc/design-system/css/default.dark.css';
import '@rocketc/design-system/css/sun.light.css';
import '@rocketc/design-system/css/sun.dark.css';

document.documentElement.dataset.theme = `${preferredFamily}.${preferredMode}`;
// e.g. 'default.light' | 'default.dark' | 'sun.light' | 'sun.dark'
```

```css
.card {
  border: var(--rc-border-sm) solid var(--rc-color-border-subtle);
  border-radius: var(--rc-radius-md);
  background: var(--rc-color-surface-panel);
  box-shadow: var(--rc-shadow-surface);
  color: var(--rc-color-text-primary);
  font: var(--rc-typography-body-font-weight) var(--rc-typography-body-font-size) /
    var(--rc-typography-body-line-height) var(--rc-typography-body-font-family);
}

.card.floating {
  border-color: transparent;
  background: var(--rc-color-surface-elevated);
  box-shadow: var(--rc-shadow-raised);
}
```

---

## JS adapter / JS 适配器

Use when you need token values in TypeScript (runtime theme builders, non-CSS targets):

需要在 TypeScript 中直接读取 Token 值时使用：

```ts
import { defaultLightTokens, sunDarkTokens, type TokenTheme } from '@rocketc/design-system/js';

defaultLightTokens['color.brand.solid'];
```

Maps are flat DTCG-shaped entries (`$type` / `$value`).

映射为扁平 DTCG 形态条目（`$type` / `$value`）。

---

## MUI adapter / MUI 适配器

```tsx
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import {
  defaultDarkMuiTheme,
  defaultLightMuiTheme,
  sunDarkMuiTheme,
  sunLightMuiTheme,
} from '@rocketc/design-system/mui';

const themes = {
  'default.light': defaultLightMuiTheme,
  'default.dark': defaultDarkMuiTheme,
  'sun.light': sunLightMuiTheme,
  'sun.dark': sunDarkMuiTheme,
} as const;

const theme = createTheme(themes[activeThemeName]);

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
```

Notes / 说明：

- `palette.primary` ← brand; secondary ← neutral surface/action roles; error ← danger  
  主色 ← 品牌；次色 ← 中性表面/操作；错误 ← danger
- Typography maps display → h1, title → h2, etc. / 字阶映射到 h1/h2 等
- Spacing unit follows `space.1` (4px) / 间距单位跟随 `space.1`
- Shape radius uses `radius.md` (6px) / 形状圆角使用 `radius.md`
- Normalize/baseline ships via `MuiCssBaseline`—render `<CssBaseline />` when using MUI alone  
  基线通过 `MuiCssBaseline` 提供——单独用 MUI 时请渲染 `<CssBaseline />`

You may still import CSS variables alongside MUI if custom islands need `--rc-*`. MUI peer dependency is optional.

若自定义区块需要 `--rc-*`，仍可与 MUI 并行导入 CSS 变量。MUI peer 依赖可选。

---

## Chakra adapter / Chakra 适配器

```tsx
import { ChakraProvider } from '@chakra-ui/react';
import defaultLightChakraTheme from '@rocketc/design-system/chakra/default.light';
import sunDarkChakraTheme from '@rocketc/design-system/chakra/sun.dark';

export function AppShell({ children }: { children: React.ReactNode }) {
  return <ChakraProvider value={defaultLightChakraTheme}>{children}</ChakraProvider>;
}
```

Notes / 说明：

- Semantic color roles become Chakra semantic tokens / palettes / 语义色成为 Chakra 语义 Token / 色板
- Controls: `colorPalette="primary|secondary"` ← `control.primary|secondary` / 控件用 primary/secondary
- Identity accents: `colorPalette="brand"` ← `brand.*` / 身份强调用 brand
- Text styles map to typography roles / 文本样式映射字阶角色
- Baseline styles apply through generated `globalCss` / 基线经生成的 `globalCss` 生效
- Prefer semantic token names in product code over library color aliases / 产品代码优先语义名，而非库色别名

Switch themes by selecting the matching generated Chakra config, and keep `data-theme` in sync if CSS variables are also loaded. Chakra peer dependency is optional.

切换主题时选择匹配的 Chakra 配置；若同时加载 CSS 变量，请保持 `data-theme` 同步。Chakra peer 依赖可选。

---

## Tailwind adapter / Tailwind 适配器

CSS-variable bridge for Tailwind v4 utilities and shadcn/ui. It does **not** ship components—only the theme contract those stacks read.

面向 Tailwind v4 工具类与 shadcn/ui 的 CSS 变量桥。不提供组件，只提供这些栈读取的主题契约。

Load base `--rc-*` CSS (the themes you need), then the Tailwind theme contract:

先加载基础 `--rc-*` CSS（按需主题），再加载 Tailwind 主题契约：

```css
@import 'tailwindcss';
@import '@rocketc/design-system/css/default.light.css';
@import '@rocketc/design-system/css/default.dark.css';
@import '@rocketc/design-system/tailwind/theme.css';
```

```ts
document.documentElement.dataset.theme = 'default.dark';
// Keep using data-theme — do not maintain a separate .dark color sheet.
// 继续用 data-theme，不要另维护一份 .dark 色板。
```

Notes / 说明：

**Two tracks / 双轨**

1. **shadcn short names** — full official scaffold (`background`…`ring`, `chart-1`…`5`, `sidebar-*`)  
   plus status (`success` / `warning` / `info`).  
   `:root` aliases → `--rc-*`; `@theme` maps utilities to those aliases.
   覆盖官方脚手架全量短名，并额外提供 status；`:root` → `--rc-*`，`@theme` 再接短名。
2. **Full DS semantic utilities** — path → kebab, e.g.  
   `color.control.primary.bg` → `bg-control-primary-bg`  
   `color.text.secondary` → `text-text-secondary`  
   `shadow.raised` → `shadow-raised`  
   `space.4` → `p-4` / `gap-4` (via `--spacing-4`)  
   完整语义与常用刻度都进了 `@theme inline`。

| Theme key family / 主题键族    | Source / 来源                | Example utility / 示例               |
| ------------------------------ | ---------------------------- | ------------------------------------ |
| `--color-{role…}`              | semantic `color.*` roles     | `bg-surface-canvas`, `text-brand-fg` |
| `--color-{shadcn}`             | shadcn aliases               | `bg-primary`, `border-border`        |
| `--text-*`                     | type scale + roles           | `text-body`, `text-md`               |
| `--font-*` / `--font-weight-*` | families / weights           | `font-sans`, `font-weight-semibold`  |
| `--leading-*` / `--tracking-*` | line height / letter spacing | `leading-relaxed`                    |
| `--spacing-*`                  | `space.*` + layout dims      | `p-4`, `gap-layout-page-gutter`      |
| `--size-*`                     | `size.*`                     | `size-8`                             |
| `--radius-*`                   | `radius.*`                   | `rounded-md`                         |
| `--border-width-*`             | `border.*` widths            | `border-sm` (width token)            |
| `--shadow-*`                   | `shadow.*`                   | `shadow-raised`                      |
| `--blur-*`                     | `blur.*`                     | `blur-md`                            |
| `--opacity-*`                  | `opacity.*`                  | `opacity-muted`                      |
| `--z-index-*`                  | `zIndex.*`                   | `z-modal`                            |
| `--duration-*` / `--ease-*`    | motion                       | `duration-fast`, `ease-emphasized`   |
| `--max-width-*`                | layout `*.maxWidth`          | `max-w-page`                         |

Primitive color ramps (`neutral.500`, `orange.400`, …) stay on `--rc-*` only—prefer semantic roles in product UI.

原始色阶仍只在 `--rc-*`；产品 UI 优先语义角色。

Works with shadcn when `cssVariables: true`; keep switching via `data-theme` (do not maintain a separate `.dark` palette).

在 `cssVariables: true` 下可直接驱动 shadcn；主题切换仍走 `data-theme`（不要另维护 `.dark` 色板）。

Tailwind is a peer of the consuming app (not of this package). No Tailwind dependency is required to build tokens.

Tailwind 是消费方应用的依赖（不是本包 peer）。构建 Token 不需要安装 Tailwind。

---

## Parity expectations / 对齐预期

Adapters remap the **same semantic roles**. They do not restyle every default MUI/Chakra/shadcn component recipe. For strict visual parity:

适配器映射的是**同一套语义角色**。它们不会重绘每个默认 MUI/Chakra/shadcn 组件配方。若要严格视觉对齐：

1. Prefer semantic tokens / text styles from the generated theme  
   优先使用生成主题中的语义 Token / 文本样式
2. Override component recipes in the app when library defaults leak  
   库默认样式泄露时，在应用层覆盖组件配方
3. Check the preview’s MUI, Chakra, and shadcn tabs across all four themes after token changes  
   Token 变更后，在预览的 MUI / Chakra / shadcn 页核对全部四套主题

## Not shipped yet / 尚未提供

- Native iOS/Android token exports / 原生 iOS/Android Token 导出
- Figma Tokens sync / Figma Tokens 同步

Portable-by-design still applies: add adapters without forking the semantic model.

「以可移植为设计前提」仍然适用：增加适配器时不要分叉语义模型。

---

## Common recipes / 常用配方

### Elevation / 纵深

| UI / 界面                                 | Surface / 表面     | Shadow / 阴影    |
| ----------------------------------------- | ------------------ | ---------------- |
| Page background / 页面背景                | `surface.canvas`   | none             |
| Section / card at rest / 贴地卡片         | `surface.panel`    | `shadow.surface` |
| Popover, sticky, floating card / 浮起卡片 | `surface.elevated` | `shadow.raised`  |
| Dialog / menu / 对话框、菜单              | `surface.elevated` | `shadow.overlay` |

### Color / 色彩

| Need / 需求                       | Use / 使用                                               |
| --------------------------------- | -------------------------------------------------------- |
| Primary control / 主控件          | `control.primary.*`                                      |
| Secondary control / 次控件        | `control.secondary.*`                                    |
| Brand identity slots / 品牌身份槽 | `brand.*` (resolved by active family) / 由当前品牌族解析 |
| Destructive / 破坏性              | `danger.*` only                                          |
| Success feedback / 成功反馈       | `success.*` only                                         |
| Informational callout / 信息提示  | `info.*`                                                 |

### Typography / 字体

| Need / 需求                                           | Role / 角色               |
| ----------------------------------------------------- | ------------------------- |
| Marketing/hero line in product shell / 产品壳层主标题 | `display`                 |
| Page title / 页面标题                                 | `title`                   |
| Card / section title / 卡片或章节标题                 | `heading` or `subheading` |
| Body copy / 正文                                      | `body`                    |
| Field label / 字段标签                                | `label`                   |
| Helper / meta / 辅助与元信息                          | `caption`                 |
| Code / token names / 代码与 Token 名                  | `code`                    |

---

## Preview / 预览

From the package root / 在包根目录：

```bash
bun run dev
```

Tabs / 页签：

1. **Design System** — Principles / Primitive / Semantic / Component
2. **MUI** — adapter stress surface / 适配器压测面
3. **Chakra** — adapter stress surface / 适配器压测面
4. **shadcn** — Tailwind adapter stress surface / Tailwind 适配器压测面

Use the family control and theme switch to verify all four variants (`default|sun` × `light|dark`).

使用品牌族控件与主题开关核对全部四套变体（`default|sun` × `light|dark`）。
