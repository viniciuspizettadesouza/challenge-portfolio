# Challenge Portfolio

A unified portfolio that preserves and presents 23 historical technical
challenges.

Each challenge has two clearly separated representations:

- `original/`: sanitized source; the initial 20 projects retain imported Git
history; Leafwell and 3cket use snapshot-only imports, while User Management
  retains five sanitized historical commits;
- `demo/`: an executable, modernized, or adapted portfolio version.

## Current status

The initial 20 default-branch histories, two expansion snapshots, and the
sanitized five-commit User Management history have
been imported, sanitized, and verified. The 3cket solution intentionally comes from its
non-default `3cket` branch with owner approval. The Astro catalog builds all 23
challenge routes, and every maintained demo is integrated and browser-tested,
represented by a reproducible screenshot. The repository owner completed
production review of both expansion demos. The clean expansion commits retain
the original signed pre-expansion portfolio history without importing
third-party expansion ancestry.

The repository owner deleted the initial 20 superseded remote repositories
after completing their migration review. The GitHub Release records that
initial consolidation milestone; its tag was removed during expansion-history
cleanup. The owner also deleted the preserved `strains` and `nuxt-challenge`
source repositories on 2026-07-30 after their signed snapshots, maintained
demos, and publication evidence were verified.

The authoritative progress record is
[`docs/migration/status.md`](docs/migration/status.md).

## Documentation

- [Plan index](docs/plan/README.md)
- [Architecture](docs/plan/architecture.md)
- [Roadmap](docs/plan/roadmap.md)
- [Maintenance runbook](docs/plan/runbook.md)
- [Decisions and constraints](docs/plan/decisions.md)
- [Demo fidelity audit](docs/migration/fidelity-audit.md)
- [Security review](docs/migration/security-review.md)
- [Deletion checklist](docs/migration/deletion-checklist.md)
- [Migration-complete release notes](docs/releases/migration-complete.md)

## Commands

```bash
corepack enable
pnpm install
pnpm dev
pnpm lint
pnpm typecheck
pnpm test
pnpm test:e2e
pnpm build
```

Refresh the generated technical inventory and challenge registry after changing
challenge metadata:

```bash
pnpm inventory
```

Read the [runbook](docs/plan/runbook.md) before maintaining the portfolio.

Integrated demos are available both on their challenge detail pages and through
distraction-free routes at
`/challenge-portfolio/demos/<challenge-slug>`. The dedicated route also
provides a browser fullscreen control.

## Live site

The portfolio is deployed at:

[viniciuspizettadesouza.github.io/challenge-portfolio](https://viniciuspizettadesouza.github.io/challenge-portfolio/)

Astro is configured for the `/challenge-portfolio/` project subpath. The
workflow at `.github/workflows/deploy-pages.yml` validates and publishes the
site whenever `main` is pushed, and it can also be run manually from GitHub
Actions.

For the first deployment, set **Settings → Pages → Build and deployment →
Source** to **GitHub Actions**. See the
[deployment runbook](docs/plan/runbook.md#9-deploy-to-github-pages).

## Git workflow

Automated agents must leave changes uncommitted and unpushed unless the
repository owner explicitly authorizes a narrowly scoped exception, as they
did for the two signed expansion snapshots and final integration. The repository owner reviews
and publishes all work. See [`AGENTS.md`](AGENTS.md).
