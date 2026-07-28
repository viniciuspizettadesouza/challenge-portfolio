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
| 6 — Technical inventory | Completed | all 20 strategies confirmed through implemented demos |
| 7 — Astro catalog | Completed | 20 challenge routes and static build |
| 8 — Challenge structure | Completed | metadata, English summaries, and 20 demos integrated |
| 9 — Pilot demos | Completed | all 20 owner-approved with browser evidence and screenshots |
| 10 — Remaining waves | Completed | all 20 challenges have interactive demos |
| 11 — Repository quality | Completed | revision `fe69c34` passed frozen install and all checks in a fresh public clone |
| 12 — Final release and cleanup | In progress | Pages automation prepared; production validation, release, backup, and review remain |

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

Completed for all 20 projects. Historical source remains under each
`original/` directory, while maintained React, Vue, Astro, and fixture-backed
adaptations live under `demo/`. The fidelity comparison is recorded in
`docs/migration/fidelity-audit.md`; browser evidence and reproducible
screenshots cover every demo.

## Phases 11–12 — Quality and completion

Revision `fe69c34` passed fresh-clone validation. The GitHub Pages workflow and
the `/challenge-portfolio/` base-path support are prepared in the next change.
Publish that configuration, validate the production result, create the release,
and make the off-device backup copy. Original repository deletion remains
manual and is blocked until every deletion-checklist item is complete.
