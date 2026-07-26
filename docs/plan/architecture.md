# Architecture

## Objective

Consolidate 20 public repositories into a navigable monorepo while preserving
the default-branch source, commit authors, messages and dates, plus complete
external backups of Git references.

## Structure

```text
apps/portfolio/                 static Astro shell
challenges/<slug>/original/     preserved, sanitized tree and history
challenges/<slug>/demo/         optional executable adaptation
challenges/<slug>/challenge.json
challenges/<slug>/README.md
docs/migration/                 migration evidence and current status
scripts/migration/              auditable automation
```

## Application

- Astro with strict TypeScript and static output;
- official React and Vue 3 integrations;
- shared CSS without a component library;
- `/`, `/challenges`, `/challenges/[slug]`, and `/about` routes;
- a typed registry containing all 20 challenges;
- pages remain available while a demo is pending.

## Isolation

Only `apps/*`, `packages/*`, and `challenges/*/demo` belong to the pnpm
workspace. `original/` is excluded to prevent accidental installation of legacy
dependencies or execution of unknown scripts.

## Presentation strategies

- `native-react`: modern React component integrated into Astro;
- `native-vue3`: Vue 3 component integrated into Astro;
- `static-embed`: isolated static build;
- `upgrade-vue2`: controlled Vue 2 to Vue 3 adaptation;
- `upgrade-react`: legacy React adaptation;
- `mock-backend`: frontend backed by local fixtures or mocks;
- `case-study`: complete documentation when execution is not practical;
- `manual-review`: blocks automatic migration until reviewed.

