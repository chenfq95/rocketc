# @rocketc/web-components usage site

Astro site that scans co-located `../src/components/**/demo/*.html` snippets and renders a component usage gallery.

```bash
# from packages/libs/web-components
bun run site:dev
```

Requires a prior `tsc` build of the package (`site:dev` / `site:build` do this). Theme CSS comes from `@rocketc/design-system`.
