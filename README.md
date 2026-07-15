# rocketc

Personal Front End Toolkit

![Logo](./assets/rocketc.svg)

## Packages

This monorepo contains the following public packages:

- **[@rocketc/design-system](./packages/libs/design-system/README.md)** - Framework-agnostic design system foundations, tokens, and previews
- **[@rocketc/react](./packages/libs/react/README.md)** - Deprecated; use `@rocketc/design-system` instead
- **[@rocketc/shortcuts](./packages/libs/shortcuts/README.md)** - Pure JavaScript shortcut solution without any framework dependencies
- **[@rocketc/react-use-shortcuts](./packages/libs/react-use-shortcuts/README.md)** - React hooks and context providers for keyboard shortcuts
- **[@rocketc/cli](./packages/commands/cli/README.md)** - RocketC command-line tool

## Contributing

### Changeset Release Flow

This repository uses Changesets to version and publish public packages.

1. Make package changes in a feature branch.
2. Add a changeset:

   ```bash
   bunx changeset
   ```

3. Select the affected public packages and choose the version bump type.
4. Commit the generated `.changeset/*.md` file together with the code changes.
5. Merge the feature branch into `main`.
6. Run the `Version packages` GitHub Actions workflow manually. It will run checks, apply the pending changesets, update package versions and changelogs, then open a version PR.
7. Review and merge the version PR.
8. Run the `Publish packages` workflow manually, or let it run after the version PR merge when its trigger conditions match. It publishes changed packages with:

   ```bash
   bunx changeset publish
   ```

Use `patch` for bug fixes, `minor` for backwards-compatible features, and `major` for breaking changes.
