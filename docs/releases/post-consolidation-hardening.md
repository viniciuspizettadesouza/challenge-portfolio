# Post-consolidation hardening release candidate

Prepared: 2026-09-02.

## Included work

- Playwright Chromium coverage in GitHub Actions with failed-run reports and
  explicit screenshot regeneration;
- grouped weekly Dependabot proposals for the pnpm workspace and GitHub
  Actions;
- a scheduled, pull-request, push, and manually runnable full-history Gitleaks
  scan pinned to the official 8.30.0 container digest;
- axe accessibility coverage for the shared shell and all 23 demos, shared
  keyboard focus treatment, and a documented all-demo review;
- URL-backed catalog filters for technology, framework, and adaptation type,
  including history restoration and complete no-JavaScript content.

## Local validation

The release candidate passed on 2026-09-02:

- `pnpm install --frozen-lockfile --offline` for all 25 workspace projects;
- ESLint with no findings;
- Astro and TypeScript diagnostics with 0 errors, warnings, or hints;
- 80 Vitest tests across five files;
- 51 Chromium tests, comprising 24 demo interactions, 25 accessibility checks,
  and two catalog discovery checks;
- the 49-page Astro static build;
- Gitleaks 8.30.0 against 310 commits and approximately 14.42 MB, with no
  findings;
- `git diff --check`.

The ordinary browser command produced no tracked screenshot changes.

## Reviewed deferrals

The demo-level contrast findings and immutable Vue checkbox-label limitation
are documented in `docs/migration/accessibility-audit.md`. They are deferred to
a visual-fidelity pass that includes owner review and screenshot regeneration;
they are not excluded from the record or represented as remediated.

## Owner publication checklist

- [ ] Review and commit the release candidate.
- [ ] Push the reviewed revision to `main`.
- [ ] Confirm the browser, security, and Pages workflows succeed for that
      revision.
- [ ] Verify the production home, catalog, a filtered catalog URL, one challenge
      detail, and one fullscreen demo route.
- [ ] Create the owner-selected tag and GitHub Release using this document as
      the validation record.

Phase 18 remains in progress until these publication steps are complete. Agents
must not perform them under the repository Git policy.
