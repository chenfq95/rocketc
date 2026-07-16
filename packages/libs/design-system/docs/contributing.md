# Contributing / 贡献

How to change the design system safely—including the authoritative guide to the `tokens/` source tree (DTCG-compatible).

如何安全地改动设计系统——含 `tokens/` 源码树的权威说明（DTCG 兼容）。

## Before you edit / 改动前

1. Read [Introduction & Principles](./introduction.md).  
   阅读 [介绍与原则](./introduction.md)。
2. Decide which layer changes / 判断改哪一层：
   - **Semantic / 语义** — new or adjusted meaning (preferred for product language) / 新含义或调整含义（产品语言优先）
   - **Primitive / 原始** — new raw scale step / 新的原始刻度
   - **Theme / 主题** — family/mode difference only (`default|sun` × `light|dark`) / 仅品牌族或明暗差异
3. Prefer updating roles over adding one-off hex values in preview or adapters.  
   优先更新角色，而不是在预览或适配器里临时写 hex。

---

## Token layers / Token 分层

Rocketc uses three DTCG layers. Build merges them in order:

Rocketc 使用三层 DTCG。构建按顺序合并：

1. **Primitive / 原始** — raw scales (color ramps, space, radius, type primitives, motion…)  
   原始刻度（色阶、间距、圆角、字体原始量、动效…）
2. **Semantic / 语义** — role aliases; this layer is the `default.light` baseline  
   角色别名；本层即 `default.light` 基线
3. **Theme / 主题** — named overrides for family and mode (`default|sun` × `light|dark`)  
   按品牌族与明暗模式的具名覆盖

```text
tokens/
├── primitive/
│   ├── blur.tokens.json
│   ├── color.tokens.json
│   ├── dimension.tokens.json
│   ├── motion.tokens.json
│   ├── opacity.tokens.json
│   ├── shadow.tokens.json
│   ├── typography.tokens.json
│   └── z-index.tokens.json
├── semantic/
│   ├── color.tokens.json
│   ├── layout.tokens.json
│   ├── opacity.tokens.json
│   ├── shadow.tokens.json
│   ├── typography.tokens.json
│   └── z-index.tokens.json
└── theme/
    ├── default.light/
    ├── default.dark/
    ├── sun.light/
    └── sun.dark/
```

- `primitive/`: raw design values such as color scales, spacing, measure, radius, and font families.  
  原始设计值：色阶、间距、度量、圆角、字族等。
- `semantic/`: baseline role tokens (`default.light` baseline), including brand, text, layout, shadows, stacking.  
  语义角色基线（即 `default.light`），含品牌、文本、布局、阴影、层叠等。
- `theme/`: theme-family and color-mode overrides. A theme only needs files for values that differ from the semantic baseline.  
  品牌族与明暗模式覆盖；主题只需存放相对语义基线有差异的值。

**Consumption rule / 消费规则：** apps and adapters should use **semantic** tokens first. Reach for primitives only when composing a local recipe that has no semantic role yet. Role meaning for consumers: [Foundations](./foundations.md). Theme wiring and adapters: [Usage](./usage.md).

应用与适配器应**优先使用语义 Token**。仅在本地配方尚无语义角色时，再使用原始 Token。角色含义见 [基础](./foundations.md)；主题接线与适配器见 [用法](./usage.md)。

## Format / 格式

Files use `.tokens.json` with DTCG-style `$value` / `$type`.

文件使用 `.tokens.json`，以及 DTCG 风格的 `$value` / `$type`。

References use curly braces / 引用使用花括号：

```json
{
  "color": {
    "brand": {
      "solid": {
        "$value": "{color.neutral.950}",
        "$type": "color"
      }
    }
  }
}
```

Preferred structured values (not CSS strings) / 优先结构化值（而非 CSS 字符串）：

| Type / 类型              | Shape / 形态                                                          |
| ------------------------ | --------------------------------------------------------------------- |
| `color`                  | `{ colorSpace, components, alpha }`                                   |
| `dimension` / `duration` | `{ value, unit }`                                                     |
| `cubicBezier`            | `[x1, y1, x2, y2]`                                                    |
| `shadow`                 | `{ color, offsetX, offsetY, blur, spread, inset? }`                   |
| `typography`             | composite of family/size/weight/lineHeight/letterSpacing / 字体复合值 |
| `fontFamily`             | string array / 字符串数组                                             |
| `fontWeight` / `number`  | number / 数字                                                         |

Keep adapter-specific metadata out of token values; transforms derive CSS hex, RGB, or OKLCH (and JS/MUI/Chakra shapes) from structured values.

不要把适配器专用元数据写进 Token 值；转换层从结构化值派生 CSS hex / RGB / OKLCH，以及 JS / MUI / Chakra 形态。

## Naming / 命名

- Logical path ≈ token path / 逻辑路径 ≈ Token 路径：`color.brand.solid`, `typography.body`, `shadow.raised`
- CSS variables use prefix **`rds`** / CSS 变量前缀为 **`rds`**：`--rds-color-brand-solid`, `--rds-shadow-raised`
- Typography composites expand to parts / 字体角色展开为多个属性：`--rds-typography-body-font-size`, `…-letter-spacing`, etc.

## Token groups (by folder) / Token 分组（按目录）

### Primitive / 原始

| File / 文件              | Contents / 内容                                                        |
| ------------------------ | ---------------------------------------------------------------------- |
| `color.tokens.json`      | `neutral`, `orange`, status hues, black/white / 中性、橙、状态色、黑白 |
| `typography.tokens.json` | family, size, weight, lineHeight, letterSpacing                        |
| `dimension.tokens.json`  | space, radius, border, size, measure, breakpoints                      |
| `shadow.tokens.json`     | none → 2xl, inner/inset                                                |
| `motion.tokens.json`     | duration, easing                                                       |
| `opacity.tokens.json`    | opacity scale / 透明度刻度                                             |
| `blur.tokens.json`       | blur scale / 模糊刻度                                                  |
| `z-index.tokens.json`    | numeric ladder / 数字阶梯                                              |

### Semantic / 语义

| File / 文件              | Contents / 内容                                             |
| ------------------------ | ----------------------------------------------------------- |
| `color.tokens.json`      | surface, text, border, action, control, brand, status, info |
| `typography.tokens.json` | display → code roles / 展示到代码角色                       |
| `shadow.tokens.json`     | surface, raised, overlay, focus                             |
| `layout.tokens.json`     | page, reading, header, toolbar, sidebar, content            |
| `opacity.tokens.json`    | UI opacity roles / UI 透明度角色                            |
| `z-index.tokens.json`    | base → tooltip roles / 从 base 到 tooltip                   |

Elevation and other visual contracts for roles live in [Foundations](./foundations.md)—do not invent extra elevation levels in token JSON for tool UI.

角色的视觉契约（含纵深）见 [基础](./foundations.md)——不要在 Token JSON 里为工具 UI 额外发明 elevation 级别。

---

## Workflow / 工作流

```bash
cd packages/libs/design-system

# 1. Edit tokens under tokens/ / 在 tokens/ 下编辑
# 2. Rebuild / 重建
bun run build:tokens

# 3. Visual check / 视觉核对
bun run dev

# 4. Types (scripts + preview projects) / 类型检查
bun run typecheck
```

### Build pipeline / 构建流水线

```bash
bun run build:tokens
# or
bun run build
```

Pipeline (`scripts/build-tokens.ts` + Style Dictionary):

流水线（`scripts/build-tokens.ts` + Style Dictionary）：

1. Load primitive + semantic for each theme / 为每个主题加载原始 + 语义层
2. Apply `tokens/theme/<theme>` overrides / 应用对应主题覆盖
3. Emit / 输出：

```text
dist/
├── css/{default,sun}.{light,dark}.css
├── js/{default,sun}.{light,dark}.*
├── mui/{default,sun}.{light,dark}.*
└── chakra/{default,sun}.{light,dark}.*
```

- Default selector / 默认选择器：`:root`, `[data-theme='default.light']`
- Variant selectors / 变体选择器：`[data-theme='<family>.<mode>']`
- CSS files inline `normalize.css` baseline styles / CSS 内联 normalize 基线

Do not edit `dist/` by hand. / 不要手改 `dist/`。

## Checklist for visual changes / 视觉变更检查清单

- [ ] All four themes reviewed in preview (`default|sun` × `light|dark`)  
       预览中核对全部四套主题
- [ ] Plain HTML elevation ladder still reads as three clear steps  
       纯 HTML 纵深阶梯仍清晰可读为三级
- [ ] Brand identity comes only from the active family (`default` black / `sun` orange)—no ad-hoc third brand hue  
       品牌身份只来自当前族（`default` 黑 / `sun` 橙）——不要临时第三品牌色
- [ ] Secondary chrome uses neutral semantic roles; info remains informational  
       次要 chrome 使用中性语义角色；info 保持信息性
- [ ] MUI, Chakra, and shadcn tabs do not regress obvious theme wiring
      MUI / Chakra / shadcn 页没有明显主题接线回退
- [ ] Docs updated (bilingual) if you introduce a new public role or change a contract  
       若新增公共角色或变更契约，同步更新中英文档

## File ownership / 文件归属

| Path / 路径               | Own / 职责                                                                          |
| ------------------------- | ----------------------------------------------------------------------------------- |
| `tokens/**`               | Design values (source of truth) / 设计值（事实来源）                                |
| `scripts/build-tokens/**` | Compile pipeline / adapters / 编译流水线与适配器                                    |
| `preview/**`              | Visual verification only—not another token source / 仅视觉验证，不是第二套 Token 源 |
| `docs/**`                 | Human contracts and guides (EN + ZH) / 人读契约与指南（中英）                       |
| `dist/**`                 | Generated—do not hand-edit / 生成物——勿手改                                         |

## Extending tokens / 扩展 Token

1. Prefer adding or adjusting a **semantic** role if product language needs a new meaning.  
   产品语言需要新含义时，优先新增或调整**语义**角色。
2. Add primitives only when a new raw scale step is required.  
   仅在需要新的原始刻度时再加原始 Token。
3. Put theme-only differences under `tokens/theme/<family>.<mode>/`.  
   仅主题差异放进 `tokens/theme/<family>.<mode>/`。
4. Rebuild and check preview (all four themes + framework tabs).  
   重建并检查预览（四套主题 + 框架页）。
5. Document role intent in [Foundations](./foundations.md) / [Usage](./usage.md) if the role is public API.  
   若角色属于公共 API，在 [基础](./foundations.md) / [用法](./usage.md) 中说明意图。

### Adding a semantic color role / 新增语义色彩角色

1. Add the role under `tokens/semantic/color.tokens.json` with the shared palette recipe when it is a palette family.  
   若是色板族，在 `tokens/semantic/color.tokens.json` 按共享槽位配方添加。
2. Add family/mode overrides under `tokens/theme/<family>.<mode>/` when contrast must change.  
   对比度需变化时，在 `tokens/theme/<family>.<mode>/` 添加覆盖。
3. Rebuild; confirm CSS variables and JS keys exist.  
   重建；确认 CSS 变量与 JS key 存在。
4. Document the role in [Foundations](./foundations.md) and [Usage](./usage.md) (bilingual).  
   在 [基础](./foundations.md) 与 [用法](./usage.md) 中英说明该角色。
5. Extend preview swatches if the role is first-class.  
   若为一流角色，扩展预览色板。

### Adding a brand family / 新增品牌族

1. Add `tokens/theme/<family>.light/` and `tokens/theme/<family>.dark/` override sets.  
   增加 `<family>.light` / `<family>.dark` 覆盖集。
2. Register the theme names in the build pipeline (`scripts/build-tokens`).  
   在构建流水线中注册主题名。
3. Export CSS/JS/MUI/Chakra/Tailwind paths from `package.json`.
   在 `package.json` 导出 CSS/JS/MUI/Chakra/Tailwind 路径。
4. Extend preview family controls and bilingual docs.  
   扩展预览品牌族控件与中英文档。

### Adding framework mapping / 新增框架映射

1. Keep token JSON free of framework keys.  
   Token JSON 不写框架键。
2. Map in `scripts/build-tokens/mui.ts`, `chakra.ts`, or `tailwind.ts` (or a new adapter module).  
   在 `mui.ts` / `chakra.ts`（或新适配模块）中映射。
3. Export through `package.json` `exports`.  
   经 `package.json` `exports` 导出。
4. Add or extend a preview panel.  
   新增或扩展预览面板。
5. Document in [Usage](./usage.md) (bilingual).  
   在 [用法](./usage.md) 中英记录。

## What not to do / 不要做

- Commit hand-edited `dist/` as the source of truth  
  把手改 `dist/` 当事实来源提交
- Introduce a third brand hue without a new theme family and principle update  
  没有新主题族与原则更新就引入第三品牌色
- Use primitive teal/purple in product UI when an existing semantic role already fits  
  已有语义角色仍在产品 UI 直接用原始 teal/purple
- Put component variants into shared tokens unless they are truly cross-framework semantics  
  除非是真正跨框架语义，否则不要把组件变体塞进共享 Token
- Update only the English or only the Chinese half of docs  
  只改文档的英文或只改中文一侧

## Related package docs / 相关文档

- Introduction & Principles / 介绍与原则：[`./introduction.md`](./introduction.md)
- Foundations / 基础：[`./foundations.md`](./foundations.md)
- Usage / 用法：[`./usage.md`](./usage.md)
- Package README (docs index) / 包 README（文档目录）：[`../README.md`](../README.md)
