# Migration status

Last updated: 2026-09-12.

All migration, consolidation, and presentation phases (0–31) are complete. The
portfolio now presents 9 domain-focused entries backed by all 23 immutable
historical sources. The Vue driver-selection exercise is represented as the
third area of the React-based Structured Data Workbench; `challenge-vue` and
the former `formula-one-driver-explorer` canonical slug resolve to the
consolidated route.

The derived thumbnail and social-image pipeline removes the portfolio demo
toolbar before cropping, so it cannot cover project content. Future evidence
captures also keep that toolbar in normal document flow while taking full-page
screenshots.

The internal [architecture reference](../architecture.md) now documents the
repository boundaries, metadata and renderer flows, reproducible image
pipeline, CI/deployment path, and change-impact expectations with Mermaid
diagrams.

The Phase 31 working tree passes lint, typecheck, 73 unit and SSR tests, 34
Chromium interaction, presentation, SEO, and accessibility tests, and a
111-page production build with 12 canonical sitemap URLs. Gitleaks scanned all
335 committed revisions with no findings. All 9 evidence screenshots remain
represented by reproducible 800 × 500 WebP thumbnails, 9 project-specific 1200
× 630 social cards, and one portfolio social card. The home, catalog, and
representative social cards received direct visual review.

Revision `6e79caf` remains the Phase 18 baseline. The 2026-09-03 maintenance
pass integrates the compatible dependency updates, keeps TypeScript 6 until
Astro and typescript-eslint support TypeScript 7, and keeps Vue 3.5.40 because
3.5.41–3.5.42 break Composition API island hydration. It also extends
pull-request CI to the complete validation build, adapts Playwright to Astro 7.2
foreground preview mode, and remediates all recorded accessibility deferrals.
No tag is planned.

## Next action

Review the featured home, complete catalog, generated social cards, and
architecture reference, then commit and push the approved changes. Verify
Browser tests, Security scan, Deploy to GitHub Pages, social metadata,
`robots.txt`, and the sitemap against the published revision. Continue routine
dependency, security, image, metadata, and architecture-documentation
maintenance afterward.

Use the [handbook](../README.md) for current procedures and
[HISTORY.md](../HISTORY.md) for the complete summarized migration, security,
fidelity, validation, and cleanup record.

Automated agents leave changes unstaged and do not commit, rewrite history,
tag, push, or open pull requests. The repository owner handles publication.
