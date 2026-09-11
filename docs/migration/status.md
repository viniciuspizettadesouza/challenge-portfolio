# Migration status

Last updated: 2026-09-11.

All migration and consolidation phases (0–28) are complete. The portfolio now
presents 11 domain-focused entries backed by all 23 immutable historical
sources. Salsify, Stormtech, and Zygo are represented by the consolidated
Structured Data Workbench; their historical source slugs plus the former
`product-data-table` and `configurable-book-sorting` canonical slugs resolve to
the new route.

The Phase 28 working tree passes lint, typecheck, 70 unit and SSR tests, 32
Chromium interaction and accessibility tests, a 109-page production build,
and Gitleaks across 332 commits with no findings. The Structured Data Workbench
screenshot received direct visual review, and all 11 canonical screenshots
remain represented.

Revision `6e79caf` remains the Phase 18 baseline. The 2026-09-03 maintenance
pass integrates the compatible dependency updates, keeps TypeScript 6 until
Astro and typescript-eslint support TypeScript 7, and keeps Vue 3.5.40 because
3.5.41–3.5.42 break Composition API island hydration. It also extends
pull-request CI to the complete validation build, adapts Playwright to Astro 7.2
foreground preview mode, and remediates all recorded accessibility deferrals.
No tag is planned.

## Next action

Review the Structured Data Workbench and refreshed screenshot, then commit and
push the approved Phase 28 changes and verify Browser tests, Security scan, and
Deploy to GitHub Pages against the published revision. Continue routine
dependency and security maintenance afterward.

Use the [handbook](../README.md) for current procedures and
[HISTORY.md](../HISTORY.md) for the complete summarized migration, security,
fidelity, validation, and cleanup record.

Automated agents leave changes unstaged and do not commit, rewrite history,
tag, push, or open pull requests. The repository owner handles publication.
