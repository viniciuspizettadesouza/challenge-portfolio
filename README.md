# Challenge Portfolio

A unified portfolio that preserves and presents 20 historical technical
challenges.

Each challenge has two clearly separated representations:

- `original/`: sanitized source and imported Git history from the original
  repository;
- `demo/`: an executable, modernized, or adapted portfolio version.

## Current status

The 20 default branches have been imported, backed up, sanitized, and verified.
The Astro catalog builds all 20 challenge routes. The Salsify React demo and the
Vue 3 demo are integrated; the remaining demos and case studies are pending.

The authoritative progress record is
[`docs/migration/status.md`](docs/migration/status.md).

## Documentation

- [Plan index](docs/plan/README.md)
- [Architecture](docs/plan/architecture.md)
- [Roadmap](docs/plan/roadmap.md)
- [Migration runbook](docs/plan/runbook.md)
- [Decisions and constraints](docs/plan/decisions.md)
- [Legacy runtime assessment](docs/migration/legacy-runtime-assessment.md)
- [Security review](docs/migration/security-review.md)
- [Deletion checklist](docs/migration/deletion-checklist.md)

## Commands

```bash
corepack enable
pnpm install
pnpm dev
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Migration commands are intentionally separate from the regular build:

```bash
pnpm migration:check
pnpm migration:backup
pnpm migration:metadata
pnpm migration:import -- --repository challenge-vue
pnpm migration:refresh
pnpm verify:migration
pnpm inventory
```

Read the [runbook](docs/plan/runbook.md) before performing history operations.
No repository script deletes, archives, or modifies an original remote
repository.

Integrated demos are available both on their challenge detail pages and through
distraction-free routes at `/demos/<challenge-slug>`. The dedicated route also
provides a browser fullscreen control.

## Git workflow

Automated agents must leave changes uncommitted and unpushed. The repository
owner reviews, commits, and pushes all future work. See [`AGENTS.md`](AGENTS.md).
