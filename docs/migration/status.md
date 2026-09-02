# Migration status

Last updated: 2026-09-02.

This is the authoritative handoff document. Completed work remains visible.
Resume from the first phase marked `In progress` or `Pending`.

| Phase | Status | Evidence or next requirement |
| --- | --- | --- |
| Environment | Completed | Git, Node, pnpm, Python, `git-filter-repo`, and GitHub available |
| Repository configuration | Completed | 20 repositories confirmed and recorded |
| Source audit | Completed | repository manifest and sanitization declarations reviewed |
| History import | Completed | 20 default branches imported with individual merges |
| Import verification | Completed | all 20 imported histories retain verified trees, authors, and metadata |
| Security | Completed | public history sanitized; Gitleaks reports no findings |
| Astro shell | Completed | all 20 challenge routes build statically with project-specific summaries |
| Initial publication | Completed | `main` published and confirmed as the default branch |
| Technical inventory | Completed | all 20 strategies confirmed through implemented demos |
| Interactive demos | Completed | all 20 integrated, owner-approved, browser-tested, and captured |
| Remaining migration waves | Completed | all 20 challenges have maintained interactive demos |
| Deployment and final cleanup | Completed | Pages, tag, release, owner review, and legacy repository deletion completed |
| Expansion assessment | Completed | Leafwell (`strains` source repository) approved as project 21; 3cket approved as project 22 |
| Expansion audit and source snapshots | Completed | both signed snapshots verified; 3cket uses the approved non-default solution branch |
| Expansion catalog and demos | Completed | 22 metadata entries, demos, screenshots, and owner review completed |
| Expansion quality and publication | Completed | restored signed lineage published, fresh-clone validation passed, and Pages verified |
| Expansion source cleanup | Completed | owner manually deleted `strains` and `nuxt-challenge` on 2026-07-30 |
| Project 23 assessment and history | Completed | five sanitized commits preserve authors/dates/messages; source, rewritten, and merge SHAs recorded |
| Project 23 maintained demo | Completed | Parts 1–4, local services, CRUD/pagination, themes, testing, and Docker path implemented |
| Project 23 initial publication | Completed | integration revision `8227df4` is present on `origin/main` |
| Project 23 coverage follow-up | Completed | revision `6caced1` is on `origin/main`; the 23-project home and project-23 Pages routes were verified |
| Project 23 source cleanup | Completed | owner confirmed deletion of the superseded source repository on 2026-09-02 after preservation and publication |
| Post-consolidation hardening | Planned | optional prioritized backlog is recorded as roadmap phase 18 |

## Current next action

Start with the Phase 18 P0 backlog in `docs/plan/roadmap.md`: add Playwright to
CI, then add dependency and security automation. These are optional maintenance
improvements; no consolidation or source-cleanup work remains.

Project-23 evidence is recorded in
`docs/migration/expansion-assessment-user-management.md`; the earlier expansion
assessment remains the completed record for projects 21 and 22.

## Project 23 local validation

Validation completed on 2026-09-02 and was published through revision
`6caced1`:

- Corepack enabled pnpm 10.13.1; `pnpm install` completed for 25 workspaces;
- the frozen lockfile install was repeated successfully without network access;
- inventory generation produced 23 inventory and registry entries;
- ESLint passed;
- Astro/TypeScript diagnostics reported 0 errors, warnings, or hints;
- Vitest passed 77 tests across four files, including positive registration,
  malformed/cleared sessions, and every protected service with valid and
  invalid tokens;
- Playwright passed 24 Chromium interaction tests, including application
  close/reopen persistence, with no captured browser
  console or page errors;
- the screenshot workflow repeated all 24 browser tests successfully and retained
  `docs/portfolio/screenshots/challenge-user-management.png`;
- the standalone Vite build completed;
- the Astro production build generated 49 static pages, including project 23's
  detail and fullscreen demo routes;
- Docker image `challenge-user-management-demo:validation` built successfully;
  a temporary nginx container returned HTTP 200 and was then removed;
- `git diff --check` and the five-commit branding/PDF path audit passed.

No repository security script or Gitleaks executable is installed in the
current workspace. Targeted source/history searches found no secret material;
the existing repository security documentation remains explicit about the
tooling used for earlier migrations.

The approved classifications, implementation constraints, and completion
criteria are recorded in
`docs/migration/expansion-assessment.md`.

## Expansion validation

Fresh public-clone validation of published revision
`1b0c16e92860efac758d0d24c9eed2bfe131cd08` passed on 2026-07-30:

- frozen install for all 24 workspace projects;
- lint and Astro/TypeScript diagnostics with no findings;
- 68 unit tests;
- 22 Chromium interaction tests with no browser console or page errors;
- 22 reproducible screenshots;
- 47-page static production build.

No dependency versions changed. The production home, catalog, Leafwell
detail/demo, and 3cket detail/demo routes all returned HTTP 200. The repository
owner also completed manual interactive review of both new demos.

## Production deployment

GitHub Pages deployed expansion revision `1b0c16e` on 2026-07-30 in successful
workflow run `30505553039`:

`https://viniciuspizettadesouza.github.io/challenge-portfolio/`

The GitHub Pages API confirms workflow-based publication, public visibility,
and enforced HTTPS. Production checks returned HTTP 200 for the home page,
challenge catalog, and both expansion detail and fullscreen demo routes.

## Maintenance environment

- pnpm: 10.13.1;
- Node.js: 22 or newer;
- no migration-only tools or external services are required;
- remote: `origin` configured;
- branch: `main`, tracking `origin/main`.

The repository owner completed the final review and manually deleted all 20
superseded remote repositories on 2026-07-29. The sanitized source trees and
imported histories for those initial 20 projects remain preserved under
`challenges/*/original/`. The two expansion projects use the signed snapshot
import mode documented above. The owner manually deleted the `strains` and
`nuxt-challenge` source repositories on 2026-07-30 after preservation and
publication verification; both GitHub repository endpoints returned HTTP 404.

The annotated `migration-complete` tag and corresponding GitHub Release were
published on 2026-07-29. The tag was later removed during expansion-history
cleanup; the historical release record remains.

## Upstream validation

A fresh public clone of revision
`fe69c346c4b94fe636ce79e7739d69e3382304ef` was validated on 2026-07-28.
`pnpm install --frozen-lockfile`, lint, typecheck, 62 unit tests, 20 Chromium
interaction tests, and the 43-page static build all passed.

History verification passed in the primary checkout before this revision was
published. The resulting evidence is recorded in
`docs/migration/history-report.md`.

## Signed-lineage recovery

The original pre-expansion head
`10ccbb0564c77e84baa915ce2e8360ff6d80c561` was restored without rewriting its
ancestry. Every first-parent commit dated 2026-07-28 or 2026-07-29 retains its
original SSH signature. Across the full pre-expansion first-parent history, 26
commits contain signatures and 49 older commits remain in their original
unsigned state.

Leafwell was added by the signed snapshot commit
`e782b42c350b78e56aa3c9ed6f15ccd42420c06e`, followed by 3cket in the signed
snapshot commit `ba3715efb0ac20bbaf7568a7636770a4458008cf`. Both commits attach
only the reviewed source trees; neither attaches the source repositories'
upstream commit ancestry. The final integration commit
`1b0c16e92860efac758d0d24c9eed2bfe131cd08` is also signed. GitHub reports all
three signatures as valid and verified. Its contributor API no longer reports
the excluded Leafwell or 3cket upstream contributor identities.

## Git ownership

Automated agents may stage files only when the repository owner explicitly
requests it. They must not commit, push, tag, or open pull requests. The
repository owner handles all Git publication.
