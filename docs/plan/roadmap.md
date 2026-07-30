# Roadmap

Every phase must produce verifiable evidence. Completed phases remain listed so
future contributors can see what happened and where to continue.

## Progress summary

| Phase | Status | Primary evidence |
| --- | --- | --- |
| 0 — Environment | Completed | `docs/migration/status.md` |
| 1 — Repository configuration | Completed | `scripts/migration/repositories.json` |
| 2 — Source audit | Completed | repository manifest and sanitization declarations |
| 3 — Monorepo foundation | Completed | workspace, scripts, docs, and Astro shell |
| 4 — History imports | Completed | 20 individual import merges |
| 5 — Import verification | Completed | `docs/migration/history-report.md` |
| 6 — Technical inventory | Completed | all 20 strategies confirmed through implemented demos |
| 7 — Astro catalog | Completed | 20 challenge routes and static build |
| 8 — Challenge structure | Completed | metadata, English summaries, and 20 demos integrated |
| 9 — Pilot demos | Completed | all 20 owner-approved with browser evidence and screenshots |
| 10 — Remaining waves | Completed | all 20 challenges have interactive demos |
| 11 — Repository quality | Completed | revision `fe69c34` passed frozen install and all checks in a fresh public clone |
| 12 — Final release and cleanup | Completed | Pages, tag, release, owner review, and legacy repository deletion completed |
| 13 — Expansion assessment | Completed | `docs/migration/expansion-assessment.md` approves projects 21 and 22 |
| 14 — Expansion audit and snapshots | Completed | both signed snapshots imported and verified; 3cket uses its owner-approved solution branch |
| 15 — Expansion catalog and demos | Completed | metadata, demos, tests, screenshots, and owner review complete |
| 16 — Expansion quality and publication | In progress | restored signed lineage and clean snapshots await final validation and publication |

## Phase 0 — Environment

Validate Git, Node, pnpm, Python, `git-filter-repo`, Git LFS, and GitHub
authentication. Never rewrite history without `git-filter-repo`.

## Phase 1 — Configuration

Maintain the 20-repository manifest with default branches, source SHAs, LFS
usage, import status, and sanitization evidence.

## Phase 2 — Source audit

Review the repository list, source revisions, and sanitization declarations
before importing history.

## Phase 3 — Monorepo foundation

Maintain the workspace, documentation, migration scripts, and Astro shell.

## Phase 4 — History

Each repository history lives under `challenges/<slug>/original` and has an
identifiable `chore(history): import <slug>` merge.

## Phase 5 — Verification

Compare source SHAs, dates, file counts, and tree content. Document removed,
redacted, and snapshot-only import decisions rather than hiding expected
sanitization differences.

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

Revision `fe69c34` passed fresh-clone validation. Revision `4c4fd64` configured
GitHub Pages and is live with verified home, catalog, detail, demo, and asset
routes. The owner completed the final review, published the
`migration-complete` tag, and manually deleted all 20 superseded remote
repositories. At that milestone, the GitHub Release was published and no
initial-scope migration action remained.

## Phase 13 — Expansion assessment

The repository investigation approved two unique additions:

- project 21, Leafwell (`strains` source repository), is a completed
  Next.js/React challenge with listing and detail routes backed by a
  third-party GraphQL API;
- project 22 is the 3cket Nuxt solution found seven commits beyond
  `nuxt-challenge`'s API-only default branch and is not part of an existing
  imported challenge.

The evidence, risks, strategies, and completion criteria are recorded in
`docs/migration/expansion-assessment.md`.

## Phase 14 — Expansion audit and snapshots

Both repositories were audited without executing historical code. Their source
SHAs, LFS status, secret-scan result, and sanitization decisions are recorded
in the manifest and expansion assessment. The owner approved the
`nuxt-challenge` solution branch `3cket` as the import source. To preserve the
portfolio's original signed lineage without attaching expansion contributors,
both reviewed source trees were imported as separate owner-signed snapshots and
verified in the history report.

## Phase 15 — Expansion catalog and demos

Metadata, English READMEs, summaries, inventory overrides, generated registry
entries, and catalog routes are complete. The maintained implementations are:

- a fixture-backed strain listing/detail demo that preserves the original
  GraphQL-driven interaction without a production API dependency;
- a fixture-backed event list/detail demo that preserves the imported Nuxt
  solution without requiring its Express process.

Unit and Chromium interaction coverage, screenshot evidence, the fidelity
audit, the security review, and applicable route/demo counts now cover 22
projects. The owner reviewed both new demos in production.

## Phase 16 — Expansion quality and publication

Fresh-clone validation passed with a frozen lockfile, lint, typecheck, 68 unit
tests, 22 Chromium tests, screenshot capture, and the 47-page static build.
The owner verified both new detail pages and fullscreen demos in production;
the home and catalog plus all four new routes returned HTTP 200. Publish the
restored signed lineage and clean snapshot commits with a force-with-lease
push, then recheck signatures, the GitHub contributor panel, and Pages.
Archival or deletion of the two source repositories is optional, manual, and
permitted only after preservation and publication are verified.
