# Portfolio maintenance runbook

Run commands from the `challenge-portfolio` repository root.

## 1. Install and run locally

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

The portfolio runs at `http://localhost:4321/`. Astro uses
`/challenge-portfolio/` as its production base path only.

## 2. Validate changes

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm test:e2e
pnpm security:secrets
pnpm build
```

`pnpm test:e2e` builds and previews the site and exercises all 23 demos in
Chromium without changing the tracked screenshots. It requires the Playwright
Chromium browser installed for the current Playwright version. The dedicated
browser workflow runs the same command for pushes to `main`, pull requests,
and manual dispatches; failed runs retain the HTML report and traces for 14
days.

`pnpm security:secrets` requires Docker and scans the complete Git history with
the official Gitleaks container pinned by version and digest. Review findings
and false positives using the process in
`docs/migration/security-review.md`; do not add broad allowlists.

## 3. Maintain challenge metadata

Each challenge owns:

- `challenge.json`: structured metadata and preserved source identity;
- `README.md`: concise historical and maintained-runtime context;
- `original/`: immutable sanitized historical source;
- `demo/`: maintained portfolio implementation.

After changing challenge metadata, inventory overrides, or portfolio summaries,
refresh the generated inventory and application registry:

```bash
pnpm inventory
```

Review changes to `docs/migration/inventory.json`,
`docs/migration/inventory.md`, every affected `challenge.json`, and
`apps/portfolio/src/challenges/data.json`.

The catalog derives its technology, framework, and adaptation-type options
from that generated challenge data. Filter state is encoded in the
`technology`, `framework`, and `adaptation` query parameters. Unknown values
are ignored, and the complete catalog remains available when JavaScript is
disabled.

## 4. Refresh screenshots

```bash
pnpm screenshots
```

The command runs the interaction suite and replaces all 23 images under
`docs/portfolio/screenshots/`. Review visual changes before committing them.

## 5. Deploy

The workflow at `.github/workflows/deploy-pages.yml` validates and publishes
the site whenever `main` is pushed. Astro's production configuration uses:

- site: `https://viniciuspizettadesouza.github.io`;
- base path: `/challenge-portfolio`;
- production URL:
  `https://viniciuspizettadesouza.github.io/challenge-portfolio/`.

After a deployment, verify the home page, catalog, at least one challenge page,
one fullscreen demo, and representative assets.

## 6. Preserve historical source

Never modify files under `challenges/*/original/`. Fixes and modernization
belong under `challenges/<slug>/demo/`. Intentional runtime differences must be
recorded in `docs/migration/fidelity-audit.md` or the challenge README.

## 7. Git policy

Automated agents may stage files only when the repository owner explicitly
requests it. They must not commit, push, tag, or open pull requests. Leave
changes unstaged by default.
