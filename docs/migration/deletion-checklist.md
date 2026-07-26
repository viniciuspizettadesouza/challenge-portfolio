# Manual deletion checklist

Do not delete any original repository while any required item remains
unchecked.

## Preservation and migration

- [x] 20 mirror clones exist outside the new repository.
- [x] 20 bundles were created.
- [x] All 20 bundles passed `git bundle verify`.
- [x] GitHub metadata was exported.
- [x] Sanitized source for all 20 projects exists in the monorepo.
- [x] Default-branch history for all 20 projects was imported.
- [x] Authors, emails, and trees were compared.
- [x] The public history was sanitized.
- [x] Gitleaks reports no remaining findings.

## Repository validation

- [x] The unified repository was pushed to GitHub.
- [x] A fresh clone of the unified repository works.
- [x] `pnpm install --frozen-lockfile` works in the fresh clone.
- [x] The fresh-clone build generates all 20 challenge routes.
- [x] Lint, typecheck, tests, and build pass in the primary checkout.
- [ ] All 20 pages have been manually reviewed.
- [ ] Every challenge has a functional demo or a complete case study.

## Release and recovery

- [ ] The application is deployed.
- [ ] The `migration-complete` tag and release exist.
- [ ] At least one backup copy exists on another disk or storage provider.
- [ ] The repository owner has manually reviewed this checklist.

## Deletion

Deletion is a manual, one-repository-at-a-time action performed by the owner.
No project script contains a remote repository deletion operation.
