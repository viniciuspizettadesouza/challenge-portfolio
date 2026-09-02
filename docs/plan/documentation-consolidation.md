# Documentation consolidation plan

Status: Approved for later implementation.

## Summary

Close Phase 18 as completed on 2026-09-03, with the optional tag and GitHub
Release explicitly deferred by the owner. Replace the scattered active
documentation with one concise canonical handbook at `docs/README.md`, while
preserving detailed migration evidence under `docs/archive/`.

## Documentation changes

- Build `docs/README.md` as the canonical library containing:
  - repository purpose and architecture;
  - immutable `original/` versus maintained `demo/` rules;
  - installation, validation, screenshots, metadata, security, and deployment
    procedures;
  - CI, accessibility, and catalog-discovery behavior;
  - known accessibility deferrals;
  - a concise Phase 0–18 timeline with important dates, revisions, and evidence
    links;
  - an indexed list of all 23 retained challenge READMEs.
- Reduce `docs/migration/status.md` to a short authoritative handoff:
  - all phases completed;
  - release and tag intentionally deferred;
  - no pending migration work;
  - routine maintenance and Dependabot review as the next ongoing activity.
- Simplify the root README so it introduces the portfolio and directs
  maintainers to the central handbook. Correct stale anchors and remove the
  long list of overlapping documents.

## Archive structure

- Move completed planning material from `docs/plan/` to
  `docs/archive/consolidation/`.
- Move audits, assessments, history reports, security evidence, fidelity
  evidence, and deletion records to `docs/archive/migration/`.
- Move both release records to `docs/archive/releases/`.
- Add a small archive index explaining that archived files are historical
  evidence and that `docs/README.md` is authoritative.
- Keep generated inventory files under `docs/migration/`, portfolio JSON and
  screenshots under `docs/portfolio/`, and `docs/migration/status.md` at its
  required path.
- Remove old paths without redirect stubs and update every
  repository-controlled link to the new locations.
- Retain all challenge-level READMEs beside their projects. Do not modify any
  documentation under `challenges/*/original/`.

## Phase 18 closure

- Mark Phase 18 completed in the archived roadmap.
- Record successful browser, security, Pages, and production catalog
  verification for revision `6e79caf`.
- Mark the consolidation release and tag as intentionally deferred, not
  unfinished.
- Replace release-candidate wording with a completed hardening record that
  reflects the owner's personal-library use case.

## Validation

- Verify every relative Markdown link and referenced heading after the moves.
- Confirm no maintained files reference removed `docs/plan/`, `docs/releases/`,
  or moved migration paths.
- Run `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build`.
- Run `git diff --check`.
- Confirm no files under `challenges/*/original/`, generated inventory data,
  challenge READMEs, or screenshots changed unexpectedly.

## Assumptions

- A tag and GitHub Release are not required and are explicitly deferred.
- Breaking old external deep links is accepted; repository links will be
  updated.
- The central handbook and migration status are the only actively maintained
  narrative documents.
- Archived documents preserve evidence but are not sources of current
  operational instructions.
- Portfolio-maintained documentation remains in English.
