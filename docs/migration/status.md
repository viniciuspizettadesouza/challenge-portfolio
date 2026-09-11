# Migration status

Last updated: 2026-09-11.

All migration and consolidation phases (0–29) are complete. The portfolio now
presents 10 domain-focused entries backed by all 23 immutable historical
sources. Blueticket, OnSign TV, and ClimateSeed are represented by the
React-based Climate & Weather Workspace; their historical source slugs plus the
former `weather-forecast` and `carbon-emissions-dashboard` canonical slugs
resolve to the new route.

The Phase 29 working tree passes lint, typecheck, 69 unit and SSR tests, 31
Chromium interaction and accessibility tests, a 111-page production build,
and Gitleaks across 333 commits with no findings. The Climate & Weather
Workspace screenshot received direct visual review, and all 10 canonical
screenshots remain represented.

Revision `6e79caf` remains the Phase 18 baseline. The 2026-09-03 maintenance
pass integrates the compatible dependency updates, keeps TypeScript 6 until
Astro and typescript-eslint support TypeScript 7, and keeps Vue 3.5.40 because
3.5.41–3.5.42 break Composition API island hydration. It also extends
pull-request CI to the complete validation build, adapts Playwright to Astro 7.2
foreground preview mode, and remediates all recorded accessibility deferrals.
No tag is planned.

## Next action

Review the Climate & Weather Workspace and refreshed screenshot, then commit
and push the approved Phase 29 changes and verify Browser tests, Security scan, and
Deploy to GitHub Pages against the published revision. Continue routine
dependency and security maintenance afterward.

Use the [handbook](../README.md) for current procedures and
[HISTORY.md](../HISTORY.md) for the complete summarized migration, security,
fidelity, validation, and cleanup record.

Automated agents leave changes unstaged and do not commit, rewrite history,
tag, push, or open pull requests. The repository owner handles publication.
