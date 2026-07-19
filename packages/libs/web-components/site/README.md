# @rocketc/web-components 使用站点 / Usage site

Astro 站点会扫描同目录组织的 `../src/components/**/demo/*.html` 代码片段，并渲染组件用法画廊。

The Astro site scans co-located `../src/components/**/demo/*.html` snippets and renders a component usage gallery.

```bash
# 在 packages/libs/web-components 中运行 / Run from packages/libs/web-components
bun run site:dev
```

站点需要先通过 `tsc` 构建组件包（`site:dev` / `site:build` 会自动执行）。主题 CSS 来自 `@rocketc/design-system`。

The site requires a prior `tsc` build of the package (`site:dev` / `site:build` do this). Theme CSS comes from `@rocketc/design-system`.
