# Introduction & Principles / 介绍与原则

## What it is / 它是什么

`@rocketc/design-system` defines the shared visual language for Rocketc products:

- Design principles for personal tool UI
- DTCG design tokens (primitive → semantic → theme)
- Compiled outputs: CSS variables, JS token maps, MUI themes, Chakra system configs
- A multi-surface preview (primitives, plain HTML recipes, MUI, Chakra)

It is the **source of truth for look and feel**, not a React/Vue/Svelte component kit.

`@rocketc/design-system` 定义 Rocketc 产品的共享视觉语言：

- 面向个人工具 UI 的设计原则
- DTCG 设计 Token（原始 → 语义 → 主题）
- 编译产物：CSS 变量、JS Token 映射、MUI 主题、Chakra 系统配置
- 多表面预览（原始刻度、纯 HTML 配方、MUI、Chakra）

它是**观感的唯一事实来源**，不是 React / Vue / Svelte 组件库。

## What it is not / 它不是什么

- Not a component library (buttons, inputs, tables live in adapters or app packages)
- Not a Tailwind preset (yet)—principles allow it; this package does not ship one today
- Not a Figma library sync (tokens are code-first)

`@rocketc/design-system` replaces the deprecated `@rocketc/react` package as Rocketc's visual contract. Use its tokens and framework adapters with the component library appropriate for each application.

- 不是组件库（按钮、输入框、表格等留在适配器或应用包中）
- 尚不是 Tailwind 预设——原则允许，但本包暂未提供
- 不是 Figma 库同步（Token 以代码为先）

`@rocketc/design-system` 取代已废弃的 `@rocketc/react`，作为 Rocketc 的视觉契约。各应用应搭配合适的组件库使用其 Token 与框架适配器。

## Product direction / 产品方向

Rocketc Design System is a **personal tool UI** system:

- Quiet neutral chrome with switchable brand families: `default` (black / near-black) and `sun` (orange)
- Dense when the task needs it
- Portable across frameworks
- Signature from the active brand + type + elevation—not a multi-hue expressive palette

Rocketc 设计系统是一套**个人工具 UI** 系统：

- 克制的中性 chrome，可切换品牌族：`default`（黑 / 近黑）与 `sun`（橙）
- 任务需要时保持偏密
- 跨框架可移植
- 签名来自当前品牌 + 字阶 + 纵深，而不是多色表现力色板

Typical surfaces / 典型场景：

- Tools and dashboards / 工具与仪表盘
- Dense settings and data views / 偏密的设置与数据视图
- Content products that still need calm chrome / 仍需冷静 chrome 的内容产品

## Design goals / 设计目标

1. **Recognizable / 可识别** — Brand family (`default` or `sun`) + hierarchy feel owned without noisy decoration.  
   品牌族（`default` 或 `sun`）加层级，足够有归属感，不靠嘈杂装饰。
2. **Portable / 可移植** — One token source compiles to CSS, JS, MUI, and Chakra.  
   同一套 Token 源编译到 CSS、JS、MUI、Chakra。
3. **Semantic-first / 语义优先** — Apps consume roles (`color.control.primary.bg`, `shadow.raised`), not raw neutrals or oranges.  
   应用消费角色（如 `color.control.primary.bg`、`shadow.raised`），而不是原始灰阶或橙色。
4. **Comparable / 可对比** — Preview makes brand family, light/dark, and framework parity easy to check.  
   预览便于核对品牌族、明暗模式与框架对齐。
5. **Thin shared core / 薄共享核心** — Component recipes stay in adapters/apps; the DS stays token-shaped.  
   组件配方留在适配器/应用；设计系统保持 Token 形态。

## Brand families / 品牌族

| Family / 族 | Character / 性格                         | Brand solid (approx.) / 品牌实色（约） |
| ----------- | ---------------------------------------- | -------------------------------------- |
| `default`   | Black / near-black, Next.js-like neutral | `neutral.950`                          |
| `sun`       | Orange brand                             | `orange.500` (`#FF6900`)               |

Each family has **light** and **dark** modes → four compiled themes: `default.light`, `default.dark`, `sun.light`, `sun.dark`.

每个品牌族都有 **light / dark** → 四套编译主题：`default.light`、`default.dark`、`sun.light`、`sun.dark`。

---

## Principles / 原则

The sections below expand each principle with intent and practical consequences for tokens and UI work.

下列各节展开每条原则的意图，以及对 Token 与 UI 工作的实际约束。

### Signature Through Brand and Hierarchy / 以品牌与层级建立签名

**Intent / 意图：** Important surfaces feel owned without hurting scanability.  
重要表面有归属感，同时不伤害可扫读性。

**Do / 应当：**

- Use the active brand family on primary actions, selected states, and key emphasis  
  在主操作、选中态与关键强调上使用当前品牌族
- Keep type roles distinct (display / title / body / label / caption)  
  保持字阶角色清晰
- Keep elevation to three intentional steps (panel / elevated / overlay)  
  纵深只保留三级（panel / elevated / overlay）

**Don’t / 不要：**

- Invent ad-hoc saturated hues outside `default` / `sun` brand contracts  
  在 `default` / `sun` 品牌契约之外临时发明高饱和色
- Cover the UI in brand fill  
  用品牌色铺满界面
- Invent elevation.1…n for tool density  
  为工具密度发明多级 elevation

### Quiet by Default, Brand on Focus / 默认安静，聚焦时用品牌

**Intent / 意图：** Chrome stays calm; energy appears where the user acts.  
Chrome 保持冷静；能量出现在用户行动之处。

**Do / 应当：**

- Default surfaces, borders, and secondary actions stay neutral  
  默认表面、边框与次要操作保持中性
- Reserve brand for primary CTAs, selection, and important focus moments  
  品牌色留给主 CTA、选中与重要聚焦
- Keep status colors in the status lane  
  状态色只用于状态

**Don’t / 不要：**

- Tint every card with brand soft  
  每张卡片都铺品牌 soft
- Use danger/success as decoration  
  把危险/成功色当装饰

### Dense When Needed / 需要时保持密度

**Intent / 意图：** Tools need compact information, not cramped type.  
工具需要紧凑信息，而不是挤扁文字。

**Do / 应当：**

- Prefer 14px body and a 4px spacing grid  
  优先 14px 正文与 4px 间距栅格
- Tighten with spacing and hierarchy, not by dropping contrast  
  用间距与层级收紧，而不是牺牲对比度
- Use layout tokens for header/toolbar/sidebar rhythm  
  用布局 Token 控制顶栏/工具栏/侧栏节奏

**Don’t / 不要：**

- Shrink text below readable sizes to “fit more”  
  为了塞更多内容把字缩到不可读
- Add cozy/comfortable density modes unless product need is proven  
  没有明确产品需求时不要加舒适密度模式

### Color Has Meaning / 色彩有语义

Roles are contracts / 角色即契约：

| Role / 角色                     | Meaning / 含义                                                                                                     |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Brand**                       | Identity + primary action. `default` → near-black; `sun` → orange. / 身份 + 主操作。`default` → 近黑；`sun` → 橙。 |
| **Control primary / secondary** | Complete control recipes that may alias brand and chrome. / 完整控件配方，可映射品牌与 chrome。                    |
| **Info**                        | Informational chrome—not a blue “system info” brand. / 信息性 chrome，不是蓝色「系统信息」品牌。                   |
| **Success / Warning / Danger**  | Status only. / 仅表示状态。                                                                                        |

**Don’t** mix these casually (e.g. brand for errors, or success green for primary CTAs).  
**不要**随意混用（例如用品牌色表示错误，或用成功绿做主 CTA）。

### Motion Should Confirm / 动效应确认

**Intent / 意图：** Motion confirms change; it does not entertain.  
动效确认变化，而不是娱乐。

**Do / 应当：**

- Prefer `duration.fast` / `normal` (120–180ms) for hover, focus, and toggles  
  悬停、聚焦、切换优先 `duration.fast` / `normal`（120–180ms）
- Use `easing.enter` / `exit` when showing or hiding layers  
  显示/隐藏层时使用 `easing.enter` / `exit`
- Respect reduced-motion preferences in applications  
  应用中尊重减少动效偏好

**Don’t / 不要：**

- Add ambient looping motion on tool chrome  
  在工具 chrome 上加环境循环动效
- Use long decorative transitions on dense workflows  
  在高密度流程里用冗长装饰过渡

### Portable by Design / 以可移植为设计前提

**Intent / 意图：** Tokens travel; components can differ.  
Token 可迁移；组件可以不同。

**Do / 应当：**

- Change look in `tokens/`, then rebuild  
  在 `tokens/` 改观感，然后重建
- Prefer semantic tokens in apps and adapters  
  应用与适配器优先语义 Token
- Keep framework-specific recipes out of the shared token JSON  
  不要把框架专用配方写进共享 Token JSON

**Don’t / 不要：**

- Hardcode hex/rgb in components when a semantic token exists  
  已有语义 Token 时仍在组件里写死 hex/rgb
- Fork a second visual system without a migration plan  
  没有迁移计划就分叉第二套视觉系统

### Depth (elevation) / 纵深

Depth stays at three steps / 纵深保持三级：

1. **Panel** — resting content (`shadow.surface` + subtle border) / 贴地内容
2. **Elevated** — floating UI (`shadow.raised` required) / 浮起 UI（必须配 raised）
3. **Overlay** — top chrome (`shadow.overlay`) / 顶层 chrome

Light mode leans on border + shadow. Dark mode leans on surface color steps. See [Foundations → Elevation](./foundations.md#elevation--纵深).

亮色主要靠边框 + 阴影；暗色主要靠表面色阶。详见 [基础 → 纵深](./foundations.md#elevation--纵深)。

---

## Package layout / 包结构

```text
packages/libs/design-system/
├── README.md             # Package entry & docs index / 包入口与文档目录
├── docs/                 # Detailed bilingual guides / 中英详细指南
├── tokens/
│   ├── primitive/        # Raw scales / 原始刻度
│   ├── semantic/         # Role aliases (default.light baseline) / 角色别名
│   └── theme/            # default|sun × light|dark overrides / 主题覆盖
├── scripts/build-tokens/ # Style Dictionary pipeline / 构建流水线
├── dist/                 # Compiled assets / 编译产物
└── preview/              # Vite playground / 预览
```

Published package contents are mainly `dist/` plus the package README. Source tokens and docs live in the repo for authors and consumers who work from source.

发布内容主要是 `dist/` 与包 README。源 Token 与文档留在仓库，供源码侧作者与消费者使用。

## Versioning note / 版本说明

The package is early (`0.0.1`). Token names and semantic roles should stay stable when possible; primitive scale tweaks and theme overrides are the preferred way to evolve the look.

包仍处于早期（`0.0.1`）。Token 名与语义角色应尽量稳定；观感演进优先改原始刻度与主题覆盖。
