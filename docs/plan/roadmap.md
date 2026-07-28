# Roadmap

Every phase must produce verifiable evidence. Completed phases remain listed so
future contributors can see what happened and where to continue.

## Progress summary

| Phase | Status | Primary evidence |
| --- | --- | --- |
| 0 — Environment | Completed | `docs/migration/status.md` |
| 1 — Repository configuration | Completed | `scripts/migration/repositories.json` |
| 2 — External backups | Completed | external mirrors, bundles, and metadata |
| 3 — Monorepo foundation | Completed | workspace, scripts, docs, and Astro shell |
| 4 — History imports | Completed | 20 individual import merges |
| 5 — Import verification | Completed | `docs/migration/history-report.md` |
| 6 — Technical inventory | In progress | automatic inventory complete; manual review pending |
| 7 — Astro catalog | Completed | 20 challenge routes and static build |
| 8 — Challenge structure | In progress | metadata and English summaries complete; 16 of 20 demos integrated |
| 9 — Pilot demos | In progress | 16 owner-approved; screenshots pending |
| 10 — Remaining waves | Pending | 4 demos or case studies |
| 11 — Repository quality | In progress | checks pass; clean-clone build verified |
| 12 — Final release and cleanup | Pending | deploy, release, backup copy, manual review |

## Phase 0 — Environment

Validate Git, Node, pnpm, Python, `git-filter-repo`, Git LFS, and GitHub
authentication. Never rewrite history without `git-filter-repo`.

## Phase 1 — Configuration

Maintain the 20-repository manifest with default branches, source SHAs, LFS
usage, backup status, import status, and sanitization evidence.

## Phase 2 — Backups

Keep mirrors, verified bundles, and GitHub metadata outside this repository. A
failed backup blocks import. A pre-sanitization bundle preserves the complete
local consolidation state.

## Phase 3 — Monorepo foundation

Maintain the workspace, documentation, migration scripts, and Astro shell.

## Phase 4 — History

Each repository history lives under `challenges/<slug>/original` and has an
identifiable `chore(history): import <slug>` merge.

## Phase 5 — Verification

Compare source SHAs, authors, dates, file counts, and tree content. Document
removed and redacted paths rather than hiding expected sanitization differences.

## Phase 6 — Inventory

The automatic inventory is complete. Manually review each generated strategy,
external API dependency, backend requirement, and likely Node version.

## Phase 7 — Astro catalog

All 20 static challenge pages exist with metadata and migration state.

## Phases 8–10 — Demos and case studies

Finish Salsify and Vue screenshots first. Then continue in this order:

1. modern React/Vite projects;
2. Vue 3/Vite projects;
3. legacy React projects;
4. Vue CLI and Vue 2 projects;
5. backend-dependent projects;
6. case studies for projects that cannot run safely.

## Phases 11–12 — Quality and completion

Validate lint, types, tests, build, a clean clone, deploy, release, and an
off-device backup copy. Original repository deletion remains manual and is
blocked until every deletion-checklist item is complete.
