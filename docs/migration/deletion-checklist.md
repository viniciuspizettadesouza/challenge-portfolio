# Manual deletion checklist

This document records the review completed before the repository owner manually
deleted the 20 superseded remote repositories.

## Preservation and migration

- [x] Sanitized source for all 20 projects exists in the monorepo.
- [x] Default-branch history for all 20 projects was imported.
- [x] Source metadata, trees, and imported author sets were compared.
- [x] The public history was sanitized.
- [x] Gitleaks reports no remaining findings.

## Repository validation

- [x] The unified repository was pushed to GitHub.
- [x] A fresh clone of the unified repository works.
- [x] `pnpm install --frozen-lockfile` works in the fresh clone.
- [x] The fresh-clone build generates all 20 challenge routes.
- [x] Lint, typecheck, unit/browser tests, and build pass in the primary checkout.
- [x] All 20 pages have been manually reviewed.
- [x] Every challenge has a functional demo or a complete case study.

Fresh-clone validation was repeated for published revision `fe69c34` on
2026-07-28: frozen install, lint, typecheck, 62 unit tests, 20 Chromium
interaction tests, and the 43-page static build passed.

## Release and final review

- [x] GitHub Pages workflow and `/challenge-portfolio/` base path are configured.
- [x] The application is deployed and production routes were validated.
- [x] The annotated `migration-complete` tag was published for the initial
  release and later removed during expansion-history cleanup.
- [x] The `migration-complete` GitHub Release exists.
- [x] The repository owner manually reviewed this checklist.

## Deletion

- [x] The repository owner manually deleted all 20 superseded remote
  repositories on 2026-07-29.
- [x] The consolidated `challenge-portfolio` repository remains available.
- [x] No project script contains a remote repository deletion operation.
