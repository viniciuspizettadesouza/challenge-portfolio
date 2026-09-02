# Architecture

## Objective

Consolidate 23 historical challenges into a navigable monorepo. The initial 20
projects retain their sanitized imported histories and the portfolio retains
its original signed pre-expansion lineage. Leafwell and 3cket preserve reviewed
source snapshots without importing upstream contributor ancestry. Project 23
retains a five-commit sanitized history with neutralized paths because its brief prohibits public branding. The
owner-approved 3cket snapshot uses the solution branch because the default
branch contains only the supplied API.

## Structure

```text
apps/portfolio/                 static Astro shell
challenges/<slug>/original/     preserved, sanitized source tree
challenges/<slug>/demo/         optional executable adaptation
challenges/<slug>/challenge.json
challenges/<slug>/README.md
docs/migration/                 migration evidence and current status
scripts/migration/              inventory and metadata generation
```

Leafwell is the documented naming exception: its public portfolio slug is
`challenge-leafwell`, while its immutable imported source and maintained demo
remain in `challenges/strains/`.

## Application

- Astro with strict TypeScript and static output;
- official React and Vue 3 integrations;
- shared CSS without a component library;
- `/`, `/challenges`, `/challenges/[slug]`, and `/about` routes;
- a typed registry containing all 23 challenges;
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
