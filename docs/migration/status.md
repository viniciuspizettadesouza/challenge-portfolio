# Migration status

Last updated: 2026-07-30.

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
| Expansion quality and publication | In progress | sign and validate the restored-lineage integration, then publish it |

## Current next action

Sign the final portfolio integration commit, repeat fresh-clone validation, and
force-push the restored signed lineage. Then verify signatures, GitHub's
contributor panel, and the validated Pages routes. Optional archival or
deletion of the two source repositories remains a manual owner action.

The approved classifications, implementation constraints, and completion
criteria are recorded in
`docs/migration/expansion-assessment.md`.

## Expansion validation

Fresh-clone validation passed on 2026-07-30:

- frozen offline install for all 24 workspace projects;
- lint and Astro/TypeScript diagnostics with no findings;
- 68 unit tests;
- 22 Chromium interaction tests with no browser console or page errors;
- 22 reproducible screenshots;
- 47-page static production build.

The frozen install initially required one lockfile-pinned cache download
(`vite@8.1.5`); no dependency versions changed. The production home, catalog,
Leafwell detail/demo, and 3cket detail/demo routes all returned HTTP 200. The
repository owner also completed manual interactive review of both new demos.

## Production deployment

GitHub Pages deployed revision `4c4fd64` on 2026-07-29:

`https://viniciuspizettadesouza.github.io/challenge-portfolio/`

The GitHub Pages API confirms workflow-based publication, public visibility,
and enforced HTTPS. The workflow completed successfully, and production checks
returned HTTP 200 for the home page, challenge catalog, a challenge detail
page, a fullscreen demo, and the favicon.

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
import mode documented above.

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
upstream commit ancestry.

## Git ownership

Automated agents may stage files only when the repository owner explicitly
requests it. They must not commit, push, tag, or open pull requests. The
repository owner handles all Git publication.
