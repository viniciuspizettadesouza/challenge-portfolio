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
| Astro shell | Completed | all 20 challenge routes build statically |
| Initial publication | Completed | `main` published and confirmed as the default branch |
| Technical inventory | In progress | runtime difficulty ranked; durable strategy confirmations pending |
| Interactive demos | In progress | 6 integrated, tested, and owner-approved; screenshots pending |
| Remaining migration waves | Pending | 14 demos or complete case studies |
| Deployment and final cleanup | Pending | deploy, release, second backup copy, and owner review |

## Current next action

Test and integrate `challenge-propertiag` with a compatible Node and Yarn
runtime. Capture screenshots for approved demos as release evidence when
convenient.

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

A fresh public clone was created on 2026-07-26. In that clone,
`pnpm install --frozen-lockfile` and `pnpm build` passed and generated 23 static
pages. Lint, typecheck, tests, and build also passed in the primary checkout.

## Git ownership

Automated agents may stage files only when the repository owner explicitly
requests it. They must not commit, push, tag, or open pull requests. The
repository owner handles all Git publication.
