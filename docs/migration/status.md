# Migration status

Last updated: 2026-09-03.

All migration and consolidation phases (0–18) are complete. All 23 historical
projects, maintained demos, production routes, and superseded-source cleanup
have been verified. No migration action remains.

Revision `6e79caf` remains the Phase 18 baseline. The 2026-09-03 maintenance
pass integrates the compatible dependency updates, keeps TypeScript 6 until
Astro and typescript-eslint support TypeScript 7, and keeps Vue 3.5.40 because
3.5.41–3.5.42 break Composition API island hydration. It also extends
pull-request CI to the complete validation build, adapts Playwright to Astro 7.2
foreground preview mode, and remediates all recorded accessibility deferrals.
No tag is planned.

## Next action

Commit and push the reviewed maintenance pass; verify all three GitHub Actions
workflows, then close any Dependabot pull requests superseded by the combined
update. Continue routine dependency and security maintenance afterward.

Use the [handbook](../README.md) for current procedures and
[HISTORY.md](../HISTORY.md) for the complete summarized migration, security,
fidelity, validation, and cleanup record.

Automated agents leave changes unstaged and do not commit, rewrite history,
tag, push, or open pull requests. The repository owner handles publication.
