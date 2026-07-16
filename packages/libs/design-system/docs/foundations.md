# Foundations / 基础

Visual building blocks compiled from tokens: the **underlying design concepts** shared by every theme. Concrete brand families, theme switching, and adapters live in [`usage.md`](./usage.md). If docs and source diverge, treat `tokens/` as authoritative.

由 Token 编译出的视觉积木：各主题共用的**底层设计概念**。具体品牌族、主题切换与适配器见 [`usage.md`](./usage.md)。若文档与源码不一致，以 `tokens/` 为准。

Related / 相关：[`introduction.md`](./introduction.md) · [`usage.md`](./usage.md) · [`contributing.md`](./contributing.md)

---

## Concepts / 概念

This system targets **personal tool UI**: quiet neutral chrome, brand on focus and primary action, dense when the task needs it.

面向**个人工具 UI**：中性壳层保持安静，品牌出现在聚焦与主操作，任务需要时保持密度。

| Pillar / 支柱      | Contract / 契约                                                                                           |
| ------------------ | --------------------------------------------------------------------------------------------------------- |
| Chrome / 壳层      | Neutrals by default; brand for emphasis / 默认中性，强调时用品牌                                          |
| Type / 字阶        | One sans family; hierarchy via size, weight, leading, tracking / 一套无衬线；靠字号、字重、行高、字距分层 |
| Depth / 纵深       | Three semantic steps: resting / raised / top chrome / 三级：贴地 / 浮起 / 顶层                            |
| Density / 密度     | 4px space grid; compact shell layout roles / 4px 栅格；紧凑壳层布局角色                                   |
| Consumption / 消费 | Prefer **semantic roles** over primitives / 优先**语义角色**，少用原始量                                  |

Apps should consume roles such as `color.control.primary.bg`, `typography.body`, `shadow.raised`. Primitives (`neutral.500`, `space.2`, `shadow.md`) exist to build those roles.

应用应消费语义角色。原始量用于搭建角色，而不是直接铺进产品 UI。

### Token layers / Token 分层

```
primitive  →  semantic  →  theme overrides
原始量     →  语义      →  主题覆盖
```

| Layer / 层 | Location / 位置     | Role / 职责                                                                       |
| ---------- | ------------------- | --------------------------------------------------------------------------------- |
| Primitive  | `tokens/primitive/` | Scales: hues, space, type sizes, raw shadows / 色阶、间距、字号、原始阴影等刻度   |
| Semantic   | `tokens/semantic/`  | Product-facing roles (the foundation contract) / 面向产品的角色（基础契约）       |
| Theme      | `tokens/theme/…`    | Remaps semantic roles per theme—see themes doc / 按主题重映射语义角色——见主题文档 |

---

## Color / 色彩

### Primitive scales / 原始色阶

Available ramps: `neutral`, `orange`, `amber`, `red`, `green`, `teal`, `blue`, `purple`, plus `black` / `white`.

可用色阶：`neutral`、`orange`、`amber`、`red`、`green`、`teal`、`blue`、`purple`，以及 `black` / `white`。

Semantic roles intentionally use only a subset. Extra hues are reserved for future recipes—do not invent ad-hoc product colors when a semantic role already fits.

语义角色有意只使用其中一部分。多余色相留给未来配方——已有语义角色时，不要在产品里临时发明颜色。

### Semantic color groups / 语义色彩组

| Group / 组                              | Roles / 角色                                                             | Purpose / 用途                                               |
| --------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------ |
| `surface`                               | `canvas`, `panel`, `elevated`, `inverse`                                 | Page stage and container fills / 页面舞台与容器填充          |
| `text`                                  | `primary`, `secondary`, `muted`, `inverse`                               | Content hierarchy / 内容层级                                 |
| `border`                                | `subtle`, `default`, `strong`, `focus`                                   | Structure + focus outline color / 结构 + 聚焦描边色          |
| `action`                                | `active`, `hover`, `selected`, `disabled`, `disabledBackground`, `focus` | Shared list/row/chrome interaction / 列表行等共享交互        |
| `control.primary` / `control.secondary` | `bg`, `bgHover`, `bgActive`, `fg`, `fgContrast`, `border`, `borderHover` | Complete control recipes / 完整控件配方                      |
| `brand`                                 | palette slots (below)                                                    | Active identity color family / 当前身份色族                  |
| `success` / `warning` / `danger`        | palette slots                                                            | Status only—never decoration / 仅状态，不作装饰              |
| `info`                                  | palette slots                                                            | Informational chrome / 信息性 chrome                         |
| `common`                                | `black`, `white`                                                         | Absolute anchors for contrast recipes / 对比度配方的绝对锚点 |

### Surfaces / 表面

Surfaces encode **stage vs content**, not Material elevation numbers.

表面表达的是**舞台 vs 内容**，不是 Material 式 elevation 编号。

| Role / 角色        | Intent / 意图                                                                |
| ------------------ | ---------------------------------------------------------------------------- |
| `surface.canvas`   | Page stage behind content / 内容背后的页面舞台                               |
| `surface.panel`    | Resting content fill / 贴地内容填充                                          |
| `surface.elevated` | Lifted fill; pair with raised/overlay shadow / 抬起填充；需配对浮起/顶层阴影 |
| `surface.inverse`  | Inverted band (flipped stage) / 反转带（翻转舞台）                           |

In light modes, panel and elevated may be close in fill—depth then relies more on border + shadow. In dark modes, canvas is typically darkest, with panel and elevated stepping up so floating chrome can use color **and** shadow.

亮色下 panel 与 elevated 的填充可能接近，分层更靠边框与阴影；暗色下 canvas 通常最深，panel / elevated 逐级抬高，浮层同时依赖色阶与阴影。

### Text & border / 文字与边框

| Role / 角色      | Intent / 意图                                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------------------------------- |
| `text.primary`   | Default readable copy / 默认可读正文                                                                          |
| `text.secondary` | Supporting copy / 次要说明                                                                                    |
| `text.muted`     | Meta, placeholders, disabled-adjacent / 元信息、占位                                                          |
| `text.inverse`   | On inverse / solid bands / 反转带上文字                                                                       |
| `border.subtle`  | Hairline structure / 细结构线                                                                                 |
| `border.default` | Standard control and card edges / 常规控件与卡片边                                                            |
| `border.strong`  | Strong separation / hover borders / 强分隔、悬停边                                                            |
| `border.focus`   | Focus outline **color** (pair with `shadow.focus` for the ring) / 聚焦描边**色**（环形状配合 `shadow.focus`） |

### Palette recipe (brand / status / info) / 色板槽位

`brand`, `success`, `warning`, `danger`, and `info` share the same slot set:

`brand`、`success`、`warning`、`danger`、`info` 共用同一套槽位：

| Slot / 槽位                            | Use / 用途                                                                              |
| -------------------------------------- | --------------------------------------------------------------------------------------- |
| `soft` / `softHover` / `softActive`    | Low-emphasis fills (chips, selected rows, soft badges) / 低强调填充                     |
| `solid` / `solidHover` / `solidActive` | Filled controls and strong emphasis / 实心控件与强强调                                  |
| `fg`                                   | Foreground on soft or canvas / soft 或画布上的前景                                      |
| `contrast`                             | Foreground on solid / solid 上的前景                                                    |
| `border`                               | Outline / accent border / 描边                                                          |
| `focusRing`                            | Keyboard focus indicator color (often aliases `border`) / 键盘焦点色（常映射 `border`） |

**Do not** mix slots across families (e.g. `success.solid` + `brand.fg`). Pick one family and stay inside its recipe.

**不要**跨族混用槽位。选定一族后停留在该配方内。

Status hues stay in the status lane: success / warning / danger for validation and alerts only. Soft and solid steps may retarget across light/dark for contrast; consumers still use the same slot names.

状态色只走状态车道：success / warning / danger 仅用于校验与告警。明暗下 soft/solid 可能重映射以保证对比，消费方仍使用同一套槽位名。

### Action recipe / Action 配方

`color.action.*` is shared **ambient interaction chrome**—list rows, menu items, icon buttons, table selection, nav items. It is not a full button recipe; use `control.*` for bounded controls with their own fill/border/label stack.

`color.action.*` 是共享的**环境交互 chrome**——列表行、菜单项、图标按钮、表格选中、导航项。它不是完整按钮配方；有独立填充/描边/标签栈的边界控件用 `control.*`。

| Token                             | Meaning / 含义                                                                                                                                                                                                                                                                                                                                              |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `color.action.active`             | Default **foreground** for interactive affordances (icons, action glyphs) in the resting/armed state—readable on panel, not a fill. / 交互示能（图标、操作字形）在静止/待用态的默认**前景**——画在 panel 上可读，不是填充色。                                                                                                                                |
| `color.action.hover`              | **Background wash** while the pointer hovers an interactive row or soft control. / 指针悬停交互行或轻量控件时的**背景叠色**。                                                                                                                                                                                                                               |
| `color.action.selected`           | **Background** for a selected / toggled-on item in a list, table, or nav. Stronger or more persistent than hover. / 列表、表格、导航中选中/打开项的**背景**。比 hover 更强或更持久。                                                                                                                                                                        |
| `color.action.disabled`           | **Foreground** for disabled interactive content (icons, labels that must stay in the action lane). Usually aligns with muted text. / 禁用交互内容的**前景**（仍走 action 车道的图标、标签）。通常与 muted 文字一致。                                                                                                                                        |
| `color.action.disabledBackground` | **Background** for disabled filled or hit-target areas that still need a surface (disabled chips, inert rows). / 仍需表面的禁用填充/热区**背景**（禁用芯片、失效行）。                                                                                                                                                                                      |
| `color.action.focus`              | **Background wash** for keyboard focus on ambient chrome (soft highlight under the focused row/item). Pair with `border.focus` / `shadow.focus` for the outline ring—this token is the fill cue, not the ring. / 环境 chrome 键盘聚焦时的**背景叠色**（聚焦行/项下的柔和高亮）。描边环用 `border.focus` / `shadow.focus`——本 token 是填充提示，不是焦点环。 |

Related opacity roles (`opacity.action.hover`, `selected`, `disabled`, `focus`, `activated`) are alpha multipliers when an adapter composites washes onto a surface instead of using opaque fills. Prefer the color tokens when a solid wash is already defined.

相关透明度角色（`opacity.action.*`）用于适配器把叠色合成到表面、而非使用不透明填充时。已有实色叠色定义时优先用颜色 token。

### Control recipes / 控件配方

`color.control.*` is a **complete control recipe**: resting / hover / pressed fill, label colors, and borders for a single bounded control (button, segmented option, dense chip-as-control). Two emphasis levels share the same slot names.

`color.control.*` 是**完整控件配方**：静止 / 悬停 / 按下填充、标签色与描边，用于单个边界控件（按钮、分段选项、作为控件的密集芯片）。两个强调级别共用同一套槽位名。

| Recipe / 配方       | Role in the UI / 界面角色                                                                                                                                                                                                            |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `control.primary`   | Main CTA and filled emphasis. Values typically track the brand solid ladder and contrast label. / 主 CTA 与实心强调。色值通常跟随品牌 solid 阶梯与 contrast 标签。                                                                   |
| `control.secondary` | Quiet bordered control on the stage. Values typically track panel, text, and structural borders (hover wash may alias `action.hover`). / 舞台上的安静描边控件。色值通常跟随 panel、文字与结构边框（悬停叠色可映射 `action.hover`）。 |

#### Shared slots / 共用槽位

Each of `control.primary` and `control.secondary` exposes:

每个 `control.primary` / `control.secondary` 都暴露：

| Token                               | Meaning / 含义                                                                                                                                                                                                                                                                          |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `color.control.<level>.bg`          | Resting **background** of the control. / 控件静止态**背景**。                                                                                                                                                                                                                           |
| `color.control.<level>.bgHover`     | **Background** while hovered (pointer over the control). / 悬停时的**背景**。                                                                                                                                                                                                           |
| `color.control.<level>.bgActive`    | **Background** while pressed / active (pointer down, or sticky pressed look). / 按下/激活时的**背景**（按住，或粘滞按下外观）。                                                                                                                                                         |
| `color.control.<level>.fg`          | **Foreground** for variants that sit on soft/transparent chrome (text/ghost/outline labels, icons next to a light fill)—not necessarily the label on the solid resting fill. / 落在 soft/透明 chrome 上的变体**前景**（文字/幽灵/描边标签、浅底旁图标）——不一定是实心静止底上的标签色。 |
| `color.control.<level>.fgContrast`  | **Foreground on the solid resting fill** (`bg`)—the default label/icon color for a filled button. Prefer this for contained/filled variants. / 实心静止底（`bg`）上的**前景**——实心按钮的默认标签/图标色。contained/filled 变体优先用它。                                               |
| `color.control.<level>.border`      | Resting **border** color. / 静止态**描边**色。                                                                                                                                                                                                                                          |
| `color.control.<level>.borderHover` | **Border** while hovered (adapters often keep this through the pressed state as well). / 悬停时的**描边**（适配器在按下态也常继续用它）。                                                                                                                                               |

#### How to bind a control / 如何绑定控件

| Variant / 变体     | Typical binding / 典型绑定                                                                                                       |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| Filled / contained | `bg` → `bgHover` → `bgActive`; label/icon = `fgContrast`; border = `border` → `borderHover`                                      |
| Outlined           | fill often `bg` or transparent; label/icon = `fg`; border = `border` → `borderHover`; hover/press fills = `bgHover` / `bgActive` |
| Text / ghost       | transparent resting fill; label/icon = `fg`; hover/press fills = `bgHover` / `bgActive`                                          |

Prefer `control.*` for buttons and similar chrome. Reach for raw `brand.*` only for non-control accents (links, selected markers). Themes may remap resolved values without changing these role names.

按钮类 chrome 优先 `control.*`；仅在非控件品牌强调时直接用 `brand.*`。主题可重映射解析值，但不改变角色名。

**Action vs control / Action 与 control：** use `action.*` when many items share one ambient wash language; use `control.*` when a single control owns its full fill–border–label recipe. Do not mix (e.g. `control.primary.bg` + `action.hover` on the same button) unless an adapter deliberately bridges them (secondary hover may alias `action.hover` by design).

多项目共享一套环境叠色语言时用 `action.*`；单个控件自带完整填充–描边–标签配方时用 `control.*`。不要混用（例如同一按钮上 `control.primary.bg` + `action.hover`），除非适配器有意桥接（secondary 的 hover 按设计可映射 `action.hover`）。

---

## Typography / 字体

### Families / 字族

- **Sans / 无衬线:** `Noto Sans SC` → `Source Han Sans SC` → `PingFang SC` → `Microsoft YaHei` → system UI sans（CJK-first / 中文优先）
- **Mono / 等宽:** `Noto Sans Mono` → system mono

One sans family carries the product voice. Hierarchy comes from size, weight, line-height, and letter-spacing—not a second display face.

全产品只用一套无衬线。层级靠字号、字重、行高、字距，而不是第二套展示字体。

### Primitive scales (selected) / 原始刻度（节选）

| Scale / 刻度          | Values / 值                                                                          |
| --------------------- | ------------------------------------------------------------------------------------ |
| Size / 字号           | `xs` 12 → `sm` 14 → `md` 16 → `lg` 18 → `xl` 20 → `2xl` 24 → … → `5xl` 48 → `7xl` 72 |
| Weight / 字重         | 100–900 (`thin` … `black`)                                                           |
| Line-height / 行高    | `none` 1 · `tight` 1.15 · `snug` 1.25 · `normal` 1.5 · `relaxed` 1.625 · `loose` 2   |
| Letter-spacing / 字距 | `tighter` −0.6px · `tight` −0.3px · `normal` 0 · `wide` +0.3px · `wider` +0.5px      |

### Semantic type roles / 语义字阶角色

| Role / 角色  | Size / 字号   | Weight / 字重  | Leading / 行高 | Tracking / 字距 | Use / 用途                            |
| ------------ | ------------- | -------------- | -------------- | --------------- | ------------------------------------- |
| `display`    | `5xl` (48)    | black (900)    | none (1)       | tighter         | Hero / rare large title / 稀有大标题  |
| `title`      | `2xl` (24)    | bold (700)     | tight          | tight           | Page / section title / 页、节标题     |
| `heading`    | `lg` (18)     | semibold (600) | snug           | normal          | In-page heading / 页内标题            |
| `subheading` | `md` (16)     | semibold (600) | snug           | normal          | Subsection / 小节                     |
| `body`       | `sm` (**14**) | normal (400)   | normal         | normal          | Default UI copy / 默认正文            |
| `bodySmall`  | `xs` (12)     | light (300)    | normal         | normal          | Compact secondary copy / 紧凑次要正文 |
| `label`      | `sm` (14)     | medium (500)   | snug           | wide            | Control labels / 控件标签             |
| `caption`    | `xs` (12)     | normal (400)   | snug           | wider           | Meta / helper / 元信息、辅助          |
| `code`       | `xs` (12)     | normal (400)   | normal         | normal          | Mono snippets / 等宽片段              |

Display/title tighten tracking; label/caption open slightly so the stack has distinct voices without a second family.

Display/title 收紧字距；label/caption 略放，使字阶有声部差。

Compiled CSS expands each role into multiple custom properties. Prefer the role, not hand-assembled primitives.

编译 CSS 会把每个角色展开为多个自定义属性。优先用角色，不要手拼原始量。

---

## Spacing, radius, measure / 间距、圆角、度量

### Space / 间距

4px grid. `space.1` = **4px**. Half steps exist (`0.5` = 2px, `1.5` = 6px, …).

4px 栅格。`space.1` = **4px**。含半步。

Common stops / 常用档：`space.1` 4 · `2` 8 · `3` 12 · `4` 16 · `6` 24 · `8` 32 · `11` 44 · `12` 48.

Tighten density with spacing and hierarchy, not by dropping contrast or type size below the role contract.

用间距与层级提高密度，而不是牺牲对比度或把字号压破角色契约。

### Radius / 圆角

`none` 0 → `xs` 2 → `sm` 4 → **`md` 6** → `lg` 8 → `xl` 12 → `2xl` 16 → `3xl` 24 → `full` 999

Default control chrome often lands on **`radius.md` (6px)**—quiet, slightly soft, not pill-first.

默认控件 chrome 常用 **`radius.md`（6px）**——安静略软，不以 pill 为默认。

### Border width / 边框宽度

`border.none` 0 · `xs` 0.5 · `sm` 1 · `md` 2 · `lg` 4 (px)

### Measure & breakpoints / 度量与断点

| Token                     | Value / 值                     | Use / 用途                                            |
| ------------------------- | ------------------------------ | ----------------------------------------------------- |
| `measure.xl`              | 1180px                         | Page / content max (via layout roles) / 页/内容最大宽 |
| `layout.reading.maxWidth` | 720px                          | Long-form reading column / 长文阅读栏                 |
| Breakpoints / 断点        | 640 / 768 / 1024 / 1280 / 1536 | Responsive shells / 响应式壳层                        |

### Layout semantics / 布局语义

| Token                           | Typical value / 典型值 | Use / 用途                      |
| ------------------------------- | ---------------------- | ------------------------------- |
| `layout.page.maxWidth`          | `measure.xl` (1180)    | Shell max width / 壳层最大宽    |
| `layout.page.gutter`            | `space.2` (8)          | Page gutter / 页边距            |
| `layout.reading.maxWidth`       | 720px                  | Reading measure / 阅读宽        |
| `layout.header.height`          | `space.11` (44)        | Top bar / 顶栏                  |
| `layout.toolbar.height`         | `space.8` (32)         | Toolbar / 工具栏                |
| `layout.sidebar.width`          | 248px                  | Sidebar / 侧栏                  |
| `layout.sidebar.collapsedWidth` | `space.12` (48)        | Collapsed rail / 收起侧栏       |
| `layout.content.maxWidth`       | `measure.xl`           | Content column cap / 内容栏上限 |

---

## Elevation / 纵深

Use **three** semantic depth steps. Do not invent Material-style `elevation.1…n` ladders for tool UI.

使用**三级**语义纵深。不要为工具 UI 发明 Material 式多级 elevation。

| Step / 级         | Surface / 表面           | Shadow / 阴影                | Intent / 意图                                               |
| ----------------- | ------------------------ | ---------------------------- | ----------------------------------------------------------- |
| Resting / 贴地    | `surface.panel`          | `shadow.surface`             | Default content on the stage / 舞台上的默认内容             |
| Raised / 浮起     | `surface.elevated`       | `shadow.raised` **required** | Floating panels, lifted cards / 浮起面板与抬起卡片          |
| Top chrome / 顶层 | elevated (or modal) fill | `shadow.overlay`             | Modal / menu / dialog above the page / 盖住页面的模态与菜单 |

Semantic shadows alias primitive steps / 语义阴影映射原始档：

| Semantic / 语义  | Primitive / 原始 | Approx. / 约略                                                    |
| ---------------- | ---------------- | ----------------------------------------------------------------- |
| `shadow.surface` | `shadow.xs`      | `0 1px 1px / 0.05`                                                |
| `shadow.raised`  | `shadow.md`      | `0 8px 20px -2px / 0.12`                                          |
| `shadow.overlay` | `shadow.lg`      | `0 18px 44px -4px / 0.2`                                          |
| `shadow.focus`   | dedicated ring   | `0 0 0 3px` @ ~0.24 — **not** brand glow / 扩散环，**非**品牌光晕 |

Primitive ladder also includes `sm`, `xl`, `2xl`, `inner`, `inset` for rare cases; product UI should stay on the three semantic steps + `focus`.

原始阴影另有 `sm` / `xl` / `2xl` / `inner` / `inset`；产品 UI 应停留在三级语义 + `focus`。

**Contract / 契约：** if a surface uses `surface.elevated`, pair it with `shadow.raised` (or `shadow.overlay` when it is top-layer chrome). Color step alone is not enough when panel and elevated fills are close.

使用 `surface.elevated` 时必须配对 `shadow.raised`（顶层则用 `overlay`）。panel 与 elevated 填充接近时，单靠色阶不够。

---

## Motion / 动效

Primitives only today (no semantic motion roles yet).

目前仅有原始量（尚无语义动效角色）。

| Token               | Value / 值                                                   |
| ------------------- | ------------------------------------------------------------ |
| `duration.instant`  | 0ms                                                          |
| `duration.fast`     | 120ms                                                        |
| `duration.normal`   | 180ms                                                        |
| `duration.slow`     | 260ms                                                        |
| `duration.slower`   | 360ms                                                        |
| `easing.linear`     | `cubic-bezier(0, 0, 1, 1)`                                   |
| `easing.standard`   | `cubic-bezier(0.2, 0, 0, 1)`                                 |
| `easing.enter`      | `cubic-bezier(0.16, 1, 0.3, 1)`                              |
| `easing.exit`       | `cubic-bezier(0.7, 0, 0.84, 0)`                              |
| `easing.emphasized` | `cubic-bezier(0.2, 0, 0, 1.2)` (slight overshoot / 轻微过冲) |

Prefer short confirmational motion on interaction (`fast` / `normal` + `standard` or `enter`). Avoid ambient decoration and long looping motion in tool chrome.

交互上优先短确认动效。避免工具 chrome 里的环境装饰与长循环动效。

---

## Z-index / 层叠

Semantic stacking roles, low → high:

语义层叠，低 → 高：

`base` → `raised` → `dropdown` → `sticky` → `overlay` → `modal` → `popover` → `toast` → `tooltip`

Pair stacking with elevation: a modal should use an appropriate `zIndex.*` **and** `shadow.overlay`.

层叠与纵深配合：模态应同时使用合适的 `zIndex.*` 与 `shadow.overlay`。

Do not invent one-off z-index numbers in components when a role exists.

已有角色时，不要在组件里写一次性 z-index 魔法数。

---

## Opacity & blur / 透明度与模糊

### Semantic opacity / 语义透明度

| Role / 角色                           | Typical use / 典型用途                                                                                    |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `opacity.disabled`                    | Disabled control affordance / 禁用态                                                                      |
| `opacity.hover` / `pressed` / `muted` | Lightweight state cues / 轻量状态提示                                                                     |
| `opacity.overlay` / `scrim`           | Dimmed backdrops / 遮罩                                                                                   |
| `opacity.action.*`                    | Fine-grained action overlays (`hover`, `selected`, `disabled`, `focus`, `activated`) / 更细的 action 叠色 |

Prefer these roles over hard-coded alphas in components.

组件内优先用这些角色，而不是写死 alpha。

### Blur / 模糊

Primitive blur scale: `none` 0 → `xs` 2 → `sm` 4 → `md` 8 → `lg` 12 → `xl` 16 → `2xl` 24 (px).

原始模糊刻度如上。Use sparingly (glass/scrim effects); tool UI stays mostly opaque.

谨慎使用（玻璃/遮罩特效）；工具 UI 以不透明为主。

---

## Consumption checklist / 消费清单

1. Paint with **semantic** color roles; use `control.*` for buttons and similar chrome.  
   用**语义**色；按钮类 chrome 用 `control.*`。
2. Set type with **typography roles**, not raw sizes.  
   用**字阶角色**，不要裸字号。
3. Space on the **4px grid**; use `layout.*` for shell rhythm.  
   间距走 **4px 栅格**；壳层节奏用 `layout.*`。
4. Elevate with the **three-step** surface + shadow contract.  
   纵深遵守**三级**表面 + 阴影契约。
5. Stack with `zIndex.*`; animate with short `duration.*` + `easing.*`.  
   层叠用 `zIndex.*`；动效用短 `duration.*` + `easing.*`。

Theme selection and adapters → [`usage.md`](./usage.md). Token source tree, format, and build → [`contributing.md`](./contributing.md).

主题选择与适配器 → [`usage.md`](./usage.md)。Token 源树、格式与构建 → [`contributing.md`](./contributing.md)。
