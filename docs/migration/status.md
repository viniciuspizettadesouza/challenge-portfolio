# Migration status

Last updated: 2026-09-11.

All migration and consolidation phases (0–26) are complete. The portfolio now
presents 13 domain-focused entries backed by all 23 immutable historical
sources. 3cket and Ingenious Build are represented by the consolidated City
Explorer, and both historical source slugs plus the former `event-discovery`
and `public-transit-timetable` canonical slugs resolve to the new route.

The Phase 26 working tree passes lint, typecheck, 72 unit and SSR tests, 36
Chromium interaction and accessibility tests, a 105-page production build,
and Gitleaks across 330 commits with no findings. The City Explorer screenshot
received direct visual review, and all 13 canonical screenshots remain
represented.

Revision `6e79caf` remains the Phase 18 baseline. The 2026-09-03 maintenance
pass integrates the compatible dependency updates, keeps TypeScript 6 until
Astro and typescript-eslint support TypeScript 7, and keeps Vue 3.5.40 because
3.5.41–3.5.42 break Composition API island hydration. It also extends
pull-request CI to the complete validation build, adapts Playwright to Astro 7.2
foreground preview mode, and remediates all recorded accessibility deferrals.
No tag is planned.

## Next action

Review the City Explorer and refreshed screenshot, then commit and push the
approved Phase 26 changes and verify Browser tests, Security scan, and
Deploy to GitHub Pages against the published revision. Continue routine
dependency and security maintenance afterward.

Use the [handbook](../README.md) for current procedures and
[HISTORY.md](../HISTORY.md) for the complete summarized migration, security,
fidelity, validation, and cleanup record.

Automated agents leave changes unstaged and do not commit, rewrite history,
tag, push, or open pull requests. The repository owner handles publication.
