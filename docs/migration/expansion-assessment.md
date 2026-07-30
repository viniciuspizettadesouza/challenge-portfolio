# Expansion assessment: projects 21 and 22

Last updated: 2026-07-30.

This assessment records the decision to extend the completed 20-project
portfolio with two additional repositories. Both are now represented in the
manifest, catalog, and preserved source trees.

## Decision

| Order | Repository | Decision | Portfolio slug | Presentation strategy |
| --- | --- | --- | --- | --- |
| 21 | `viniciuspizettadesouza/strains` | Include as Leafwell | `challenge-leafwell` | `native-react` with local GraphQL-derived fixtures |
| 22 | `viniciuspizettadesouza/nuxt-challenge` | Included from approved branch `3cket` | `challenge-3cket` | `mock-backend` preserving the Nuxt event application |

The repositories remain separate challenge entries. `nuxt-challenge` does not
match any of the existing 20 projects: its event names, event schema, endpoint
routes, and repository identity do not occur in the imported challenge trees.

## Project 21 — Leafwell (`strains` source repository)

### Repository evidence

- public, active repository with default branch `main`;
- current reviewed head: `7f41b5022e29528d737fd045a9554bee98ae8d18`;
- Next.js 13.3.1, React 18, TypeScript, Tailwind CSS, Apollo Client, and
  GraphQL;
- the challenge brief asks for a strain listing/search page and an individual
  strain page based on Figma designs;
- the implementation contains both the listing composition in `app/page.tsx`
  and the dynamic `app/cannabis-strains/[slug]/page.tsx` route;
- the commit history documents GraphQL integration, the listing page,
  filtering, pagination, styling, and deployment work;
- no matching repository or strain-focused implementation exists in the
  current 20-project catalog.

### Completed migration approach

- [x] Audit the source tree and history for generated files, credentials, and
   material that should be redacted before import.
- [x] Import the sanitized default-branch source snapshot beneath
   `challenges/strains/original/` in an owner-signed commit without upstream
   ancestry.
- [x] Present the project as `challenge-leafwell`, matching the original
   Leafwell branding, while retaining `challenges/strains/` as the immutable
   historical-source directory.
- [x] Add challenge metadata, an English project README, inventory overrides, and
   a portfolio summary.
- [x] Build the maintained demo beneath `challenges/strains/demo/`, preserving
   the two-page listing/detail flow, alphabetical and type filtering, and
   pagination.
- [x] Use a reviewed local fixture for the maintained demo instead of making the
   static portfolio depend on the third-party Leafwell GraphQL endpoint.
   Record any differences from the live response and Figma source in the
   fidelity audit.
- [x] Add unit, Chromium interaction, static-build, and screenshot evidence.

## Project 22 — 3cket (`nuxt-challenge` source repository)

### Repository evidence

- public, active repository with default branch `master`;
- default-branch head:
  `72fbed2c1911d27b4cd9d4e29aa0e72bf6da7a9e`;
- the default branch contains a README, a three-page engineering brief, an
  Express server, ten event records, and local event images;
- `index.js` exposes `GET /events` and `GET /events/:event`, returning a
  ten-record `public/events.json` fixture and a structured 404 for unknown
  slugs;
- the fixture contains sports, festival, conference, party, and food events,
  local image URLs, locations, date ranges, and EUR price ranges;
- the engineering brief requires a responsive Nuxt/Tailwind event grid and a
  dynamic event detail page that consume the provided API;
- remote branch `3cket`, head
  `11f0bc5bfd3bb6dbf95c8b3d2c328599792d5c16`, contains seven commits beyond
  `master` and the completed Nuxt 3/Tailwind frontend, including event search,
  responsive cards, dynamic details, and not-found handling;
- the `3cket` branch retains the Express source beneath `backend/` and the
  implementation beneath `frontend/`;
- its data and routes do not match any of the existing 20 preserved projects.

### Source-branch decision

The repository exposes `master` as its default branch, but importing only that
branch would preserve the challenge materials and omit the completed solution.
The owner approved branch `3cket` as an explicit exception to the
default-branch rule. The manifest records both the repository's default
`master` identity and the selected `3cket` source ref.

### Completed migration approach

- [x] Resolve and record the source branch before rewriting or importing history.
- [x] Exclude `CHALLENGE.pdf` and its renamed `backend/CHALLENGE.pdf` path from
   the public snapshot, consistent with the portfolio's treatment of prior
   recruitment-process documents. Preserve a concise description of its
   requirements in portfolio-maintained documentation.
- [x] Import the approved sanitized snapshot beneath
   `challenges/challenge-3cket/original/` in an owner-signed commit without
   upstream ancestry.
- [x] Add metadata and an English README that record the default-branch mismatch,
   selected source ref, and original repository name.
- [x] Adapt the Nuxt 3 event grid, search, dynamic detail route, and not-found
   behavior beneath `challenges/challenge-3cket/demo/`.
- [x] Use the bundled JSON and images locally so GitHub Pages does not require a
   running Express service or `localhost:3001`.
- [x] Add route, filtering, detail, not-found, build, and screenshot evidence.

## Source audit result

The repositories were cloned and inspected without executing their historical
scripts or installing their dependencies.

| Evidence | `strains` | `nuxt-challenge` |
| --- | --- | --- |
| Reviewed refs | `main` | `master` and `3cket` |
| Commits in selected history | 16 | 8 through `3cket` |
| Files at selected head before sanitization | 41 | 40 on `3cket` |
| Git LFS | none | none |
| Tracked dependency directories or environment files | none | none |
| Gitleaks 8.30.1 | no findings | no findings |
| Sanitization decision | none required | remove recruitment brief PDF paths |

The Gitleaks scan covered approximately 355.56 KB from the `strains` history
and 622.94 KB from all fetched `nuxt-challenge` refs. It found no credentials
or tokens. The source trees pass `git fsck --full`.

## Shared completion criteria

Both projects follow the existing preservation boundary with an explicit
snapshot-only history exception:

- [x] Historical source snapshots are imported only into `original/` and are
  not modernized.
- [x] Maintained runtime work belongs only in `demo/`.
- [x] Source identity, sanitization, and import evidence are recorded in the
  repository manifest and migration reports;
- [x] Metadata and generated inventory/catalog files cover 22 projects.
- [x] Automated tests, browser coverage, screenshots, and static route counts
  cover both new demos;
- [x] Counts in portfolio-maintained documentation are updated from 20 to 22 only
  as the corresponding implementation evidence becomes true;
- [ ] Archival or deletion of either original remote repository remains a manual
  owner action after review, publication, and preservation verification.
