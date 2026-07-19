# Rocketc Agent Guide

## Repository Scope

Rocketc is a Bun workspaces monorepo for frontend libraries, design-system
assets, documentation sites, and a playground. Use Bun for dependency and
workspace commands; do not introduce another package manager or lockfile.

Before editing a subtree with its own `AGENTS.md`, read that file as well.
Local instructions supplement this guide and win when they conflict.

| Path                                   | Purpose                                                 | Local guide                                   |
| -------------------------------------- | ------------------------------------------------------- | --------------------------------------------- |
| `packages/libs/design-system/**`       | Tokens, generated adapters, and the Astro/React preview | None                                          |
| `packages/libs/web-components/**`      | Lit components and shared accessibility utilities       | None                                          |
| `packages/libs/web-components/site/**` | Astro component documentation site                      | `packages/libs/web-components/site/AGENTS.md` |
| `packages/libs/shortcuts/**`           | Framework-independent keyboard shortcut library         | None                                          |
| `packages/libs/react-use-shortcuts/**` | React bindings for shortcuts                            | None                                          |
| `packages/libs/ioc/**`                 | Dependency injection library                            | None                                          |
| `packages/commands/cli/**`             | Rocketc CLI                                             | None                                          |
| `packages/playground/react-app/**`     | React integration playground                            | None                                          |

## Setup And Commands

- Install dependencies with `bun install --frozen-lockfile` when the lockfile
  should remain unchanged, or `bun install` when dependencies intentionally
  change.
- Run a package script with `bun run --filter '<package-name>' <script>`.
- Format the repository with `bun run format`. For a narrow change, pass only
  the touched files to `bunx oxfmt` to avoid unrelated formatting churn.
- Run the CI-equivalent checks from the repository root:

  ```sh
  bun run --filter '*' lint
  bun run --filter '@rocketc/ioc' --filter '@rocketc/shortcuts' --filter '@rocketc/design-system' --filter '@rocketc/cli' build
  bun run --filter '@rocketc/react' --filter '@rocketc/react-use-shortcuts' build
  bun run --filter '@rocketc/react-app' build
  bun run --filter '*' test
  ```

- Prefer the smallest relevant verification while iterating, then broaden it
  when a change affects shared contracts or multiple workspaces.
- Run tests in `@rocketc/shortcuts` and `@rocketc/ioc` with
  `bun run --filter '<package-name>' test`.
- Type-check `@rocketc/design-system` or `@rocketc/web-components` with their
  `typecheck` scripts. Build either documentation site with its package's
  `build` or `build:site` script.

## Code And Architecture

- The codebase is TypeScript ESM. Follow the nearest source file's import,
  naming, and test conventions; keep public types explicit and avoid `any`.
- All code comments and documentation-site content must be bilingual, with
  Chinese first and the corresponding English translation immediately after.
- Both language versions must convey the same meaning. When one version
  changes, update the other in the same change.
- Agent-only files are exempt from the bilingual requirement, including
  `AGENTS.md`, Agent Skills, Rules, Hooks, and other Agent configuration or
  instruction files.
- Keep changes scoped to the owning package. Use `workspace:*` for internal
  package dependencies.
- `@rocketc/design-system` owns tokens and generated CSS/JS/framework adapters.
  Change token sources or generator scripts instead of hand-editing `dist/**`.
- `@rocketc/web-components` consumes design-system tokens. Preserve native
  element semantics, keyboard behavior, focus handling, ARIA delegation, and
  composed event behavior when changing Lit components.
- In `@rocketc/web-components`, every file that defines a mixin must start with
  the `mixin-` prefix and should otherwise follow the exported mixin name.
- Component demos and documentation must reflect the public API. Update package
  exports and barrel files when adding or removing public modules.
- Treat `dist/**`, `.astro/**`, and dependency directories as generated output.
  Do not edit or commit them unless a release workflow explicitly requires it.
- Do not revive `@rocketc/react`; it is deprecated in favor of
  `@rocketc/design-system`.

## Tests And Review

- Add or update focused Vitest coverage for behavioral changes in packages that
  have tests. For UI work, verify the relevant build and inspect both desktop
  and mobile states when layout or interaction changes.
- Do not weaken accessibility behavior or replace semantic controls with
  non-semantic elements without an equivalent interaction contract.
- Do not overwrite unrelated working-tree changes. Generated files should only
  change as a consequence of an intentional source or generator update.

## Changes And Releases

- Use Conventional Commit subjects, matching the repository history, for
  example `feat(web-components): add button loading state`.
- Add a Changeset for user-visible changes to public packages. Use `patch` for
  fixes, `minor` for backwards-compatible features, and `major` for breaking
  changes. Documentation-only and private-package changes normally do not need
  one.
- Keep commits focused and include the verification performed in the PR
  description.
