# Expansion assessment: project 23 user management

Assessed and implemented on 2026-09-02 as a new expansion after the completed
projects 21 and 22 migration.

## Decision and source evidence

The project is included as `challenge-user-management` and publicly titled
**React User Management Challenge**. The legacy recruitment repository name is
intentionally omitted from public catalog metadata because the original brief
prohibits delivery containing the former company's brand. The audit records the
neutral source relationship, default branch `main`, selected ref `main`, and
HEAD `f73752d439ab7ae4dbf4aaca579ca19a79443653`.

The selected history has five commits from initial setup through the final
tracked environment configuration. The source head dates to 2024-05-01 and
contains 21 files before sanitization. It is React `^18.2.0`, React DOM
`^18.2.0`, React Router `^6.22.3`, TypeScript `^5.2.2`, and Vite `^5.2.0`.

## Source audit and sanitization

The source was cloned read-only and inspected without installing or executing
its historical dependencies. The audit covered branding, environment files,
credentials, common secret names, generated output, dependency directories,
recruitment documents, API keys, and tokens.

- The recruitment specification PDF is excluded. Its requirements are
  summarized here instead of republishing a recruitment document.
- The historical package name and navigation heading contained the prohibited
  brand and are neutralized.
- The tracked `.env` contains only `VITE_API_URL=https://reqres.in/api`; it is
  retained because this endpoint is public configuration, not a secret.
- No API key, credential, real password, token, dependency directory, or
  generated build output was found or imported.
- The resulting sanitized head contains 20 files. No historical implementation code
  was otherwise modernized or repaired.

The five source commits were rewritten only to prefix their paths, exclude the
PDF, and neutralize branding. Authors, author dates, and messages are retained,
then the sanitized lineage was attached with merge
`d1c01d5b115ca7c43f55153e4ce3af7b6fc5b42f`. Once imported under `original/`,
it is treated as immutable.

| Original commit | Sanitized commit |
| --- | --- |
| `92d5e203c0682bcf9d0605ddd0213ff5e8556359` | `9941d66b4165493da1b423d2b2f448a9fd008f05` |
| `08a776945dabc2cac41847efea02da22394a2fec` | `a7ce164201b8a5d9e8c6f9de657752af79b9bd79` |
| `a3e5e865b28beb59b52832dfb77586627948826b` | `8a28a9b30c2babb42b3d1def111d8bf25d8e4e90` |
| `15db0bd29b0cde1548219d3bb41b1e1284d77f19` | `566552a83e4ba41513e486ad27922ac8d53749c2` |
| `f73752d439ab7ae4dbf4aaca579ca19a79443653` | `2c88ede2eccf9eb1d5b1f1ea66a0de5bea7aa2d3` |

## Historical completeness

The historical application completed approximately Part 1: sign-up, sign-in,
password confirmation, React Router navigation, token/id storage in
`sessionStorage`, a welcome view, and a ReqRes user fetch. Sign-in incorrectly
required an id created by a prior sign-up in the same browser. The welcome
request read the token but did not send or enforce it. Parts 2–4 were absent:
there was no CRUD dashboard, six-item pagination, persistent theme, automated
challenge test suite, or Docker deployment.

## Maintained completion strategy

The maintained React demo completes all four parts while remaining compatible
with the Astro island and GitHub Pages base path. A small state router avoids a
nested `BrowserRouter`. The same component also has a standalone Vite entry.

- Authentication supports sign-up validation and independent seeded sign-in.
  Its synthetic token is stored in `sessionStorage` and required by every
  protected service operation.
- A local asynchronous service layer replaces ReqRes with 14 fictional,
  deterministic records. It provides current-user, list, create, update, and
  delete operations without a real backend. This is a behavioural equivalent
  of the brief's API, not a literal ReqRes HTTP integration.
- CRUD mutations remain only in React runtime state and reset on refresh.
  Pagination renders exactly six users per page and corrects invalid pages.
- Theme preference alone persists in `localStorage`; both themes are responsive
  and keyboard accessible.
- The authenticated dashboard replaces the standalone welcome screen while
  retaining `Hello <first_name>` in its header.
- Vitest and Playwright are used instead of the brief's Cypress preference to
  follow the portfolio's established testing stack.
- Automated coverage explicitly exercises successful registration, independent
  sign-in, session serialization/clearing, invalid tokens on every protected
  operation, valid protected operations, CRUD reset, and theme persistence
  after the application page is closed and reopened.
- A multi-stage Dockerfile builds the same Vite component and serves it through
  nginx without altering the portfolio deployment.

## Completion evidence

Implementation, inventory, unit coverage, Playwright interaction coverage,
screenshot generation, lint, typecheck, tests, static build, and Docker results
are recorded in `docs/migration/status.md`. Owner review, publication, and any
source-repository cleanup remain explicitly pending; no deletion is automated.
