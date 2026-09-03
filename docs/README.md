# Challenge Portfolio handbook

This is the canonical maintenance guide for the Challenge Portfolio. The
repository presents 23 historical technical challenges through a single Astro
site while preserving reviewed source material separately from maintained
demos.

## Current state

Migration Phases 0–18 are complete. Revision `6e79caf` is the verified Phase
18 baseline: browser, security, accessibility, catalog-discovery, GitHub Pages,
and production checks passed. The owner intentionally deferred a new tag and
GitHub Release because this repository is a personal library; that is a release
decision, not pending migration work.

The short operational handoff is [migration status](migration/status.md).
The decisions, preservation evidence, project fidelity notes, validation
results, and completed Phase 0–18 timeline are in the
[distilled history](HISTORY.md).

## Repository model

```text
apps/portfolio/                 Astro catalog and test suites
challenges/<slug>/original/     Sanitized, immutable historical source
challenges/<slug>/demo/         Maintained portfolio adaptation
challenges/<slug>/challenge.json
challenges/<slug>/README.md     Per-challenge context and maintenance notes
docs/migration/                 Current status and generated inventory
docs/portfolio/                 Generated catalog summaries and screenshots
docs/HISTORY.md                Distilled migration and hardening evidence
```

Repository invariants:

- Never modify `challenges/*/original/`. It is historical evidence.
- Put fixes and adaptations in `challenges/<slug>/demo/`.
- Keep portfolio-maintained documentation in English.
- Update the challenge manifest, generated inventory, and tests together when
  metadata changes.
- The historical Leafwell directory is `challenges/strains/`, while its public
  catalog slug is `challenge-leafwell`.
- The pnpm workspace deliberately includes maintained demos and excludes
  historical `original/` trees.

## Local development and validation

Requirements are Node.js 22 or newer, Corepack, pnpm 10.13.1, Git, and
Chromium for browser tests.

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Run the standard quality gate before publication:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm test:e2e
pnpm security:secrets
pnpm build
git diff --check
```

`pnpm test:e2e` validates Chromium interactions and accessibility without
rewriting tracked images. Use `pnpm screenshots` only when a deliberate visual
change requires refreshing the reproducible screenshots in
`docs/portfolio/screenshots/`. Review every changed image before keeping it.
The secret scan uses the digest-pinned Gitleaks container defined by
`scripts/security/scan-secrets.sh`, so Docker must be available for that check.

## Metadata and catalog discovery

Each challenge is registered by its `challenge.json`. After changing a
manifest, run:

```bash
pnpm inventory
```

This refreshes the generated technical inventory at
`docs/migration/inventory.json` and `docs/migration/inventory.md`, plus the
catalog summaries at `docs/portfolio/challenge-summaries.json`. Intentional
classification exceptions belong in
`docs/migration/inventory-overrides.json`.

The catalog supports shareable query-string filters for search, technology,
framework, capability, and provenance. Preserve backward-compatible URLs when
changing filter behavior, and cover additions in both unit and browser tests.

## CI, security, and dependencies

Three GitHub Actions workflows protect `main`:

- `browser-tests.yml` installs pinned Chromium and runs the Playwright suite;
- `security.yml` scans complete Git history on pushes, pull requests, a weekly
  schedule, and manual runs;
- `deploy-pages.yml` runs lint, typecheck, unit tests, and the production build
  before publishing GitHub Pages.

Dependabot checks npm and GitHub Actions dependencies every Monday. Review its
pull requests with the same quality gate as application changes.

Treat every secret-scanner finding as real until investigated. Identify the
commit and fingerprint, rotate any live credential, and remove it from current
code. Suppress only a proven false positive with the smallest exact
fingerprint entry in `.gitleaksignore`, record the reason, then rerun the full
history scan. The completed scan and sanitization evidence is in the
[security record](HISTORY.md#security-record).

## Accessibility and visual review

The browser suite combines Playwright interaction tests with axe-core rules.
Playwright drives the browser and assertions; `@axe-core/playwright` injects
the axe accessibility engine into those pages. Both are needed because browser
correctness and automated accessibility analysis cover different failure
classes.

The Phase 18 baseline remediated portfolio-shell violations and records the
remaining third-party or historical demo limitations as explicit deferrals.
Do not broaden exclusions merely to make tests pass. Reassess deferrals when a
maintained demo is materially changed. See the
[accessibility baseline](HISTORY.md#accessibility-baseline-and-deferrals) and
[demo fidelity record](HISTORY.md#maintained-demo-fidelity).

## Deployment

The public site is
[viniciuspizettadesouza.github.io/challenge-portfolio](https://viniciuspizettadesouza.github.io/challenge-portfolio/).
Astro is configured for the `/challenge-portfolio/` project base. A push to
`main` deploys through `deploy-pages.yml`; the workflow may also be dispatched
manually. GitHub Pages must use **GitHub Actions** as its build source.

After deployment, verify the home page, `/challenges/`, at least one detail
page, its `/demos/<slug>/` route, and a shareable filtered catalog URL. Confirm
HTTP 200 responses, expected filtering, and no browser console or page errors.

## Challenge library

The challenge READMEs remain next to the code and are the maintained entry
points for project-specific context:

- [3cket](../challenges/challenge-3cket/README.md)
- [Blueticket](../challenges/challenge-blueticket/README.md)
- [Castlabs](../challenges/challenge-castlabs/README.md)
- [ClimateSeed](../challenges/challenge-climateseed/README.md)
- [Conaz](../challenges/challenge-conaz/README.md)
- [Devlandia](../challenges/challenge-devlandia/README.md)
- [FYLD / HanseCom](../challenges/challenge-fyld-hansecom/README.md)
- [Ingenious Build](../challenges/challenge-ingenious-build-frontend/README.md)
- [Instruct](../challenges/challenge-instruct/README.md)
- [JExperts](../challenges/challenge-jexperts/README.md)
- [Lagoasoft](../challenges/challenge-lagoasoft/README.md)
- [Leafwell](../challenges/strains/README.md)
- [Meetime](../challenges/challenge-meetime/README.md)
- [OnSign TV](../challenges/challenge-onsign-tv/README.md)
- [Pipz](../challenges/challenge-pipz/README.md)
- [PropertiaG](../challenges/challenge-propertiag/README.md)
- [Salsify](../challenges/challenge-salsify/README.md)
- [Stormtech](../challenges/challenge-stormtech/README.md)
- [Sword Health](../challenges/challenge-swordhealth/README.md)
- [User Management](../challenges/challenge-user-management/README.md)
- [Vue](../challenges/challenge-vue/README.md)
- [Vue.js](../challenges/challenge-vuejs/README.md)
- [Zygo](../challenges/challenge-zygo/README.md)

## Evidence and ownership

Generated inventory and screenshots stay in their tooling-required paths.
[HISTORY.md](HISTORY.md) preserves the unique migration decisions, audits,
validation, deletion evidence, and release outcomes in summarized form.

Automated agents leave changes unstaged unless the repository owner explicitly
requests staging. They do not commit, amend, rebase, tag, push, or open pull
requests. The owner reviews and publishes all changes; see `AGENTS.md`.
