# Migration status

Last updated: 2026-07-28.

This is the authoritative handoff document. Completed work remains visible.
Resume from the first phase marked `In progress` or `Pending`.

| Phase | Status | Evidence or next requirement |
| --- | --- | --- |
| Environment | Completed | Git, Node, pnpm, Python, `git-filter-repo`, and GitHub available |
| Repository configuration | Completed | 20 repositories confirmed and recorded |
| Backups | Completed | 20 mirrors and 20 verified bundles stored externally |
| GitHub metadata | Completed | metadata exported externally |
| History import | Completed | 20 default branches imported with individual merges |
| Import verification | Completed | all 20 trees and author sets verified |
| Security | Completed | public history sanitized; Gitleaks reports no findings |
| Astro shell | Completed | all 20 challenge routes build statically with project-specific summaries |
| Initial publication | Completed | `main` published and confirmed as the default branch |
| Technical inventory | Completed | all 20 strategies confirmed through implemented demos |
| Interactive demos | Completed | all 20 integrated, owner-approved, browser-tested, and captured |
| Remaining migration waves | Completed | all 20 challenges have maintained interactive demos |
| Deployment and final cleanup | Pending | deploy verified revision `fe69c34`, release, second backup copy, and owner review |

## Current next action

Deploy verified revision `fe69c34`. After deployment validation, create the
release, make the second off-device backup copy, and complete the final owner
review.

## Environment observed

- pnpm: 10.13.1;
- `git-filter-repo`: 2.47.0, installed locally outside Git tracking;
- Git LFS: not required for the audited default branches (`usesLfs=false`);
- GitHub CLI: authenticated;
- remote: `origin` configured;
- branch: `main`, tracking `origin/main`.

Original remote repositories have not been modified. Backups and metadata live
under `../challenge-portfolio-backups/` and are not tracked here.

## Upstream validation

A fresh public clone of revision
`fe69c346c4b94fe636ce79e7739d69e3382304ef` was validated on 2026-07-28.
`pnpm install --frozen-lockfile`, lint, typecheck, 62 unit tests, 20 Chromium
interaction tests, and the 43-page static build all passed.

History verification remains tied to the external backup mirrors under
`../challenge-portfolio-backups/` and is therefore not part of portable
clean-clone validation. It passed in the primary checkout before this revision
was published.

## Git ownership

Automated agents may stage files only when the repository owner explicitly
requests it. They must not commit, push, tag, or open pull requests. The
repository owner handles all Git publication.
