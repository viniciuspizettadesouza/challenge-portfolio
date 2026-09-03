# Challenge Portfolio

A unified Astro portfolio that preserves and presents 23 historical technical
challenges.

Each project separates immutable, sanitized source in `original/` from the
maintained portfolio adaptation in `demo/`. The catalog provides searchable,
shareable discovery plus embedded and distraction-free demo routes.

[Open the live portfolio](https://viniciuspizettadesouza.github.io/challenge-portfolio/)

## Start locally

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

The usual validation commands are `pnpm lint`, `pnpm typecheck`, `pnpm test`,
`pnpm test:e2e`, `pnpm security:secrets`, and `pnpm build`.

## Documentation

- [Canonical handbook](docs/README.md)
- [Current migration and maintenance status](docs/migration/status.md)
- [Challenge library](docs/README.md#challenge-library)
- [Distilled migration and hardening history](docs/HISTORY.md)

Migration Phases 0–18 are complete. Routine dependency, CI, and security
maintenance is the current work; no migration task is pending.

Automated agents leave changes unstaged and unpublished unless the repository
owner explicitly directs otherwise. See [AGENTS.md](AGENTS.md).
