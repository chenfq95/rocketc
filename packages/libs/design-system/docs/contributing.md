# Contributing

How to change the design system safely.

## Before you edit

1. Read [Principles](./principles.md) and [Tokens](./tokens.md).
2. Decide which layer changes:
   - **Semantic** — new or adjusted meaning (preferred for product language)
   - **Primitive** — new raw scale step
   - **Theme** — light/dark difference only
3. Prefer updating roles over adding one-off hex values in preview or adapters.

## Workflow

```bash
cd packages/libs/design-system

# 1. Edit tokens under tokens/
# 2. Rebuild
bun run build:tokens

# 3. Visual check
bun run dev

# 4. Types (scripts + preview projects)
bun run typecheck
```

## Checklist for visual changes

- [ ] Light and dark both reviewed in preview
- [ ] Plain HTML elevation ladder still reads as three clear steps
- [ ] Brand remains the only saturated identity hue for primary action
- [ ] Accent/info stay muted neutrals unless principles change
- [ ] MUI and Chakra tabs do not regress obvious theme wiring
- [ ] Docs updated if you introduce a new public role or change a contract

## File ownership

| Path                      | Own                                               |
| ------------------------- | ------------------------------------------------- |
| `tokens/**`               | Design values (source of truth)                   |
| `scripts/build-tokens/**` | Compile pipeline / adapters                       |
| `preview/**`              | Visual verification only—not another token source |
| `docs/**`                 | Human contracts and guides                        |
| `dist/**`                 | Generated—do not hand-edit                        |

## Adding a semantic color role

1. Add the role under `tokens/semantic/color.tokens.json` with the six-slot recipe when it is a palette family.
2. Add dark overrides in `tokens/theme/dark/color.tokens.json` if contrast must change.
3. Rebuild; confirm CSS variables and JS keys exist.
4. Document the role in [Foundations](./foundations.md) and [Usage](./usage.md).
5. Extend preview swatches if the role is first-class.

## Adding framework mapping

1. Keep token JSON free of framework keys.
2. Map in `scripts/build-tokens/mui.ts` or `chakra.ts` (or a new adapter module).
3. Export through `package.json` `exports`.
4. Add or extend a preview panel.
5. Document in [Themes & adapters](./themes-and-adapters.md).

## What not to do

- Commit hand-edited `dist/` as the source of truth
- Introduce a second brand hue without updating principles
- Use primitive blue/teal/purple in product UI while semantic `info`/`accent` are neutral—unless you intentionally change those roles
- Put component variants (button sizes, input states) into shared tokens unless they are truly cross-framework semantics

## Related package docs

- Short principles: [`../principles.md`](../principles.md)
- Token folder README: [`../tokens/README.md`](../tokens/README.md)
- Package README: [`../README.md`](../README.md)
