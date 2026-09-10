# Challenge Portfolio history

This is the distilled historical record for the consolidation of 23 technical
challenges. It preserves the decisions, evidence, exceptions, and validation
results that explain the current repository without retaining the original
planning checklists and repeated progress reports. For current procedures, use
the [maintenance handbook](README.md).

## Outcome and timeline

| Date       | Phases | Outcome and evidence                                                                                                                                                                                                                                                                 |
| ---------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 2026-07-26 | 0–6    | Audited the initial 20 repositories, removed generated or sensitive material, sanitized complete histories, and verified imported trees, authors, and metadata.                                                                                                                      |
| 2026-07-28 | 7–11   | Integrated all 20 maintained demos. Revision `fe69c34` passed a fresh-clone frozen install, lint, typecheck, 62 unit tests, 20 Chromium tests, and a 43-page build.                                                                                                                  |
| 2026-07-29 | 12     | Revision `4c4fd64` configured GitHub Pages and passed production route and asset checks. The owner reviewed the portfolio, published the `migration-complete` release, and manually deleted the 20 superseded repositories.                                                          |
| 2026-07-30 | 13–16  | Added Leafwell and 3cket as signed source snapshots `e782b42` and `ba3715e`, then published integration `1b0c16e`. A fresh clone passed 68 unit tests, 22 Chromium tests, and a 47-page build; Pages and both demos were verified before the owner deleted both source repositories. |
| 2026-09-02 | 17     | Added User Management with five sanitized commits and a complete maintained Parts 1–4 implementation. Revisions `8227df4` and `6caced1` were published and verified before the owner deleted its superseded repository.                                                              |
| 2026-09-03 | 18     | Completed browser CI, dependency automation, full-history secret scanning, accessibility coverage, and URL-backed catalog discovery in revisions `e2b563b` and `6e79caf`. All workflows and production checks passed.                                                                |
| 2026-09-06 | 19     | Consolidated two proven duplicate pairs into domain-focused weather and book-sorting demos, renamed the catalog around capabilities, and retained compatibility routes from all historical public slugs. |
| 2026-09-06 | 20     | Consolidated Instruct and Meetime into the Lead Operations Workspace, retaining unified discovery, category filters, cadence-backed CRUD, versioned persistence, responsive records, and redirects from both retired entries. |
| 2026-09-08 | 21     | Consolidated JExperts and User Management into the People Operations Workspace, retaining secure administration, enriched employee profiles, reporting hierarchy, standalone delivery, and four legacy-route aliases. |
| 2026-09-08 | 22     | Consolidated Castlabs and Vue.js into the TV Episode Library, retaining series discovery, 17 searchable and paginated episodes, local mutations, subscription feedback, and four legacy-route aliases. |
| 2026-09-10 | 23     | Consolidated Conaz, Devlandia, and PropertiaG into the Algorithm Playground, retaining six interactive text, record, numeral, and pathfinding algorithms plus six legacy-route aliases. |
| 2026-09-10 | 24     | Consolidated FYLD / HanseCom and Pipz into the Film Library, retaining three-character movie discovery, the eight-result Avengers fixture, the seven-film Star Wars crawl, and four legacy-route aliases. |
| 2026-09-10 | 25     | Composed the TV Episode Library and Film Library into the Screen Library, retaining distinct television and film collections, all four historical sources, and ten compatibility aliases. |
| 2026-09-11 | 26     | Consolidated 3cket and Ingenious Build into the City Explorer, retaining distinct event and transit collections, complete local fixtures, and four compatibility aliases. |
| 2026-09-11 | 27     | Consolidated Lagoasoft and Sword Health into the Content Platform, retaining distinct news and social channels, local publishing and reactions, and four compatibility aliases. |

All phases are complete. A Phase 18 tag and GitHub Release were intentionally
deferred because the repository is a personal library, not because work
remains.

## Decisions that shaped the repository

- Astro is the static shell and hosts maintained React, Vue 3, and
  Astro/TypeScript demos.
- Historical source is immutable under `challenges/<slug>/original/`;
  supported adaptations belong under `challenges/<slug>/demo/`.
- Only maintained applications belong to the pnpm workspace. Historical
  dependencies and scripts are not installed or run during ordinary
  maintenance.
- The initial 20 projects retain sanitized default-branch histories attached
  to the original signed portfolio lineage.
- Leafwell and 3cket preserve reviewed source snapshots without attaching
  upstream contributor ancestry. The owner approved 3cket's non-default
  solution branch as the sole exception to the default-branch rule.
- User Management retains a five-commit sanitized history with neutral public
  identity because its recruitment brief prohibited former-company branding.
- Unavailable APIs, credentials, databases, expired media, and obsolete build
  systems are replaced in maintained demos with deterministic fixtures or
  safe browser-only behavior.
- Remote deletion was always a manual owner action. No project script deletes,
  archives, renames, or modifies remote repositories.

The supported presentation strategies established during migration were
`native-react`, `native-vue3`, `static-embed`, `upgrade-vue2`,
`upgrade-react`, `mock-backend`, `consolidated`, `case-study`, and `manual-review`.
Leafwell is the naming exception: its public slug is `challenge-leafwell`,
while its preserved source and demo remain in `challenges/strains/`.

## History preservation and sanitization

Tree verification compared blob IDs and paths. The initial 20 imports retained
their verified authors and metadata after the documented removals and
redactions:

| Project         | Preserved files | Sanitization evidence                                                                          |
| --------------- | --------------: | ---------------------------------------------------------------------------------------------- |
| Stormtech       |              22 | Removed `backend/node_modules`                                                                 |
| Vue             |              18 | No removal or redaction                                                                        |
| Vue.js          |              42 | No removal or redaction                                                                        |
| Castlabs        |              44 | No removal or redaction                                                                        |
| Conaz           |               2 | No removal or redaction                                                                        |
| JExperts        |              30 | Removed `backend/node_modules`                                                                 |
| Zygo            |               4 | No removal or redaction                                                                        |
| Salsify         |              25 | No removal or redaction                                                                        |
| ClimateSeed     |              29 | No removal or redaction                                                                        |
| Lagoasoft       |              22 | No removal or redaction                                                                        |
| Devlandia       |               3 | No removal or redaction                                                                        |
| Meetime         |              17 | Removed `node_modules`                                                                         |
| Instruct        |              19 | No removal or redaction                                                                        |
| Blueticket      |              21 | Redacted API-key matches in both historical `InputGeocode.vue` paths                           |
| Sword Health    |              54 | No removal or redaction                                                                        |
| Pipz            |              12 | Removed tracked `.env`                                                                         |
| PropertiaG      |              23 | No removal or redaction                                                                        |
| FYLD / HanseCom |              10 | Redacted API-key matches in `components/Tutorial.vue`, `pages/index.vue`, and `store/index.js` |
| OnSign TV       |              18 | Removed recruitment PDF; redacted an API-key match in the historical `App.vue`                 |
| Ingenious Build |              30 | No removal or redaction                                                                        |

The original pre-expansion head
`10ccbb0564c77e84baa915ce2e8360ff6d80c561` was restored without rewriting
its ancestry. Its first-parent history retained 26 signed commits and 49
original unsigned commits.

### Leafwell and 3cket snapshots

| Project  | Reviewed source                                                                                                                                                                                     | Audit                                                                                                                            | Preserved import                                                                                     |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Leafwell | `strains` `main` at `7f41b5022e29528d737fd045a9554bee98ae8d18`; 16 commits, 41 files, no LFS or tracked dependencies/environment files                                                              | Next.js 13.3.1, React 18, TypeScript, Tailwind, Apollo, and GraphQL listing/detail implementation; Gitleaks 8.30.1 found nothing | Owner-signed snapshot `e782b42c350b78e56aa3c9ed6f15ccd42420c06e`; upstream ancestry excluded         |
| 3cket    | Default `master` at `72fbed2c1911d27b4cd9d4e29aa0e72bf6da7a9e`; selected `3cket` branch at `11f0bc5bfd3bb6dbf95c8b3d2c328599792d5c16`, seven commits beyond master and 40 files before sanitization | Nuxt 3/Tailwind solution plus Express ten-event API; Gitleaks found nothing; removed `CHALLENGE.pdf` and `backend/CHALLENGE.pdf` | Owner-signed 39-file snapshot `ba3715efb0ac20bbaf7568a7636770a4458008cf`; upstream ancestry excluded |

Both source trees passed `git fsck --full`. Their audit covered approximately
355.56 KB for Leafwell and 622.94 KB for all fetched 3cket refs. Integration
revision `1b0c16e92860efac758d0d24c9eed2bfe131cd08` and both snapshot
commits are reported by GitHub as valid and verified.

### User Management sanitized history

The selected `main` head
`f73752d439ab7ae4dbf4aaca579ca19a79443653` dated 2024-05-01 contained
21 files and used React 18, React Router 6, TypeScript 5, and Vite 5. The audit
excluded its recruitment PDF and neutralized the package name and navigation
heading. Its tracked `.env` contains only the public
`VITE_API_URL=https://reqres.in/api`, not a credential. No secrets,
dependencies, or build output were imported.

The rewrite changed only paths, the excluded PDF, and prohibited branding.
Authors, dates, messages, and order were preserved:

| Original commit                            | Sanitized commit                           |
| ------------------------------------------ | ------------------------------------------ |
| `92d5e203c0682bcf9d0605ddd0213ff5e8556359` | `9941d66b4165493da1b423d2b2f448a9fd008f05` |
| `08a776945dabc2cac41847efea02da22394a2fec` | `a7ce164201b8a5d9e8c6f9de657752af79b9bd79` |
| `a3e5e865b28beb59b52832dfb77586627948826b` | `8a28a9b30c2babb42b3d1def111d8bf25d8e4e90` |
| `15db0bd29b0cde1548219d3bb41b1e1284d77f19` | `566552a83e4ba41513e486ad27922ac8d53749c2` |
| `f73752d439ab7ae4dbf4aaca579ca19a79443653` | `2c88ede2eccf9eb1d5b1f1ea66a0de5bea7aa2d3` |

The 20-file sanitized lineage ends at
`2c88ede2eccf9eb1d5b1f1ea66a0de5bea7aa2d3` and is attached by merge
`d1c01d5b115ca7c43f55153e4ce3af7b6fc5b42f`.

The historical application implemented approximately Part 1: registration,
sign-in, password confirmation, session storage, navigation, a welcome view,
and a ReqRes user fetch. Sign-in incorrectly depended on prior registration,
and the fetched token was not enforced. The maintained demo completed Parts
1–4 with independent seeded sign-in, protected local services, 14 fictional
records, CRUD, six-user pagination, in-memory mutation reset, persistent theme,
responsive keyboard-accessible themes, focused unit/browser coverage, and a
multi-stage Vite/nginx Docker build.

## Maintained-demo fidelity

| Challenge       | Historical architecture → maintained runtime        | Preserved behavior and intentional substitution                                                                      |
| --------------- | --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| City Explorer | Nuxt 3/Tailwind/Express and Vue 3/Vuex/json-server → Vue 3 island | Combines the 3cket event grid, search, details, images, and not-found behavior with all 11 Ingenious Build lines, 163 stops, positions, times, search, and sorting from local fixtures |
| Weather Forecast Explorer | Two Vue 2/Maps/OpenWeather challenges → Vue 3 island | Combines address search, Haversine geolocation matching, history, six-hour comparison, and a 48-hour local forecast from Blueticket and OnSign TV |
| Screen Library | React/Apollo/WebSockets/OMDb, Vue 3/Pinia/TVMaze, Nuxt 2/movie API, and React 16/SWAPI → React island | Composes searchable series and episode management with Avengers discovery and a controllable seven-film Star Wars crawl using distinct local television and film collections |
| ClimateSeed     | Vue 3/Pinia/ApexCharts → Vue 3 island               | Organisation comparison, chart switching, aggregation, and results use semantic CSS charts                           |
| Algorithm Playground | Node scripts, two Ruby CLIs, and Next.js/React → Astro/TypeScript | Combines character counts, run-length encoding, member synchronization, validated Roman numerals, and editable full-path and next-move grid solutions from Conaz, PropertiaG, and Devlandia |
| Lead Operations Workspace | Nuxt 2/JSONPlaceholder and Vue 2/private API → Vue 3 island | Combines contact and company discovery, category filters, cadence-backed CRUD, validation, and compatible browser persistence from Instruct and Meetime |
| People Operations Workspace | React 16/Express/MongoDB and React 18/ReqRes → React island/local service | Combines authentication, protected CRUD, pagination, themes, approximate search, detailed profiles, reporting hierarchy, and Docker delivery from JExperts and User Management |
| Content Platform | Vue 3/Quasar/Auth0 and React 16/Instagram → Vue 3 island | Combines article discovery, categories, details, author sessions, profiles, publishing, and image previews with five social posts and independent likes; external Auth0 and expired media remain replaced locally |
| Salsify         | React/Vite-style source → direct React island       | Original datastore, filters, operators, values, and table run with an Astro style layer                              |
| Configurable Book Sorting | React/Express/MongoDB and Node scripts → React island | Combines the identical Stormtech and Zygo requirements in a configurable comparator pipeline with all documented outcomes |
| Leafwell        | Next.js 13/Apollo/GraphQL → React island            | Name, initial, type, pagination, and details use deterministic GraphQL-derived records                               |
| Vue             | Vue 3 component → direct Vue 3 island               | Original driver selector runs directly with only missing utility styles supplied                                     |

No historical dependency was installed in place. Conaz and Zygo ran directly;
both Devlandia Ruby programs ran with sample input; and Salsify, Vue.js, and
PropertiaG passed their available checks in temporary environments. The
PropertiaG committed snapshot remained stale despite a passing heading test.
ClimateSeed installed, but its preserved build retained TypeScript errors in
the ApexCharts plugin, router, and store. These limitations affect only
historical runtimes; all maintained demos pass the portfolio checks.

## Security record

The initial sanitization completed on 2026-07-26. Gitleaks 8.30.1 scanned 268
commits and approximately 12.77 MB. Three API-key-like values in Blueticket,
FYLD/HanseCom, and OnSign TV were replaced with `[REDACTED]` throughout
history; repeat scans found nothing. Temporary files containing original
values were securely deleted.

On 2026-07-30, Gitleaks 8.30.1 scanned approximately 978.50 KB across the
complete Leafwell and 3cket histories and found nothing. User Management
received targeted source/history, PDF, and branding checks on 2026-09-02; no
Gitleaks executable was available in that implementation environment, so no
scan was claimed then.

Phase 18 introduced `pnpm security:secrets` and a GitHub Actions scan of full
history using official Gitleaks 8.30.0 pinned by container digest. Version
8.30.1 was avoided for automation because its published build had a confirmed
detection regression. The final scan covered 310 commits and approximately
14.42 MB with no findings. The workflow runs on pull requests, pushes to
`main`, Mondays, and manual dispatch; Dependabot proposes grouped pnpm and
GitHub Actions updates every Monday.

Security findings are treated as real until reviewed: rotate live credentials,
remove them from current code, and coordinate any history rewrite separately.
Only a proven false positive may receive an exact fingerprint entry with an
explanatory comment in `.gitleaksignore`; broad path, rule, regex, or entropy
allowlists are prohibited. Rerun the complete-history scan after any exception.

## Accessibility baseline

Established on 2026-09-02 and completed across every demo on 2026-09-03,
Playwright and axe cover the shared home, catalog, detail, and about routes plus
all 18 canonical fullscreen demos against applicable WCAG 2.0 A/AA, 2.1 A/AA, and 2.2 AA
rules. Full contrast analysis now runs on the shared shell and every maintained
demo. Keyboard coverage verifies the catalog skip link, target focus, the first
target on every demo, and the shared three-pixel focus ring.

The maintenance pass corrected supporting-text, control, table-heading, and
action contrast in 15 demos. The Vue demo supplies maintained, visually hidden
labels for four controls whose immutable historical component reuses the wrong
`for` target. All explicit axe exclusions and the contrast sampling allowlist
were removed, and the refreshed screenshots record the small fidelity-preserving
color changes.

Phase 25 retains this full baseline across the 14 consolidated canonical demos.
Phase 26 retains the baseline across 13 canonical demos and directly audits the
new City Explorer shell.
Phase 27 retains the baseline across 12 canonical demos and directly audits the
new Content Platform shell plus its news and social channels.

## Validation and publication record

| Baseline                   | Validation                                                                                                                                                                                                 |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Initial 20 · `fe69c34`     | Fresh public clone; frozen install; lint and typecheck; 62 unit and 20 Chromium tests; 20 screenshots; 43 static pages                                                                                     |
| Pages · `4c4fd64`          | Home, catalog, detail, demo, and asset routes returned HTTP 200 under the `/challenge-portfolio/` base                                                                                                     |
| Projects 21–22 · `1b0c16e` | 24 workspaces; frozen install; lint and typecheck; 68 unit and 22 Chromium tests; 22 screenshots; 47 pages; production home/catalog and four new routes returned HTTP 200                                  |
| Project 23 · `6caced1`     | 25 workspaces; offline frozen install; lint and typecheck; 77 unit and 24 Chromium tests; 23 screenshots; 49 pages; standalone Vite and Docker/nginx builds; production home/detail/demo returned HTTP 200 |
| Phase 18 · `6e79caf`       | Lint and typecheck; 80 unit tests; 51 Chromium tests (24 interactions, 25 accessibility, 2 catalog); 49 pages; Gitleaks over 310 commits; no screenshot changes                                            |
| 2026-09-03 maintenance     | Compatible dependency updates; lint and typecheck; 80 unit tests; 51 Chromium tests with full accessibility coverage; 49 pages; Gitleaks over 316 commits; 23 reviewed screenshots                |
| Phase 19 domain consolidation | Frozen install; lint and typecheck; 79 unit/SSR tests; 49 Chromium tests including all 21 canonical demos; 21 screenshots; 91 static pages including legacy challenge and demo redirects |
| Phase 20 lead consolidation | Offline frozen install; lint and typecheck; 78 unit/SSR tests; 48 Chromium interaction and accessibility tests; 20 screenshots; 93 static pages including four retained lead-route aliases; Gitleaks over 319 commits |
| Phase 21 people consolidation | 21 workspaces; lint and typecheck; 78 unit/SSR tests; 46 Chromium interaction and accessibility tests; 19 screenshots; 95 static pages including four retained people-route aliases; standalone Vite and Docker/nginx builds; Gitleaks over 320 commits |
| Phase 22 TV episode consolidation | 20 workspaces; lint and typecheck; 77 unit/SSR tests; 44 Chromium interaction and accessibility tests; 18 screenshots; 97 static pages including four retained episode-route aliases; Gitleaks over 321 commits |
| Phase 23 algorithm consolidation | 18 workspaces; lint and typecheck; 76 unit/SSR tests; 40 Chromium interaction and accessibility tests; 16 screenshots; 99 static pages including six retained algorithm-route aliases; Gitleaks over 325 commits |
| Phase 24 film consolidation | 17 workspaces; lint and typecheck; 74 unit/SSR tests; 39 Chromium interaction and accessibility tests including both Film Library views; 15 screenshots; 101 static pages including four retained film-route aliases; Gitleaks over 328 commits |
| Phase 25 screen-media composition | 16 workspaces; lint and typecheck; 73 unit/SSR tests; 38 Chromium interaction and accessibility tests covering television, film discovery, and crawl views; 14 screenshots; 103 static pages including ten retained screen-media aliases; Gitleaks over 329 commits |
| Phase 26 city exploration consolidation | 15 workspaces; lint and typecheck; 72 unit/SSR tests; 36 Chromium interaction and accessibility tests covering event discovery and transit planning; 13 screenshots; 105 static pages including four retained city-exploration aliases; Gitleaks over 330 commits |
| Phase 27 content-platform consolidation | 14 workspaces; lint and typecheck; 71 unit/SSR tests; 34 Chromium interaction and accessibility tests covering news publishing and social engagement; 12 screenshots; 107 static pages including four retained content-platform aliases; Gitleaks over 331 commits |

For `6e79caf`, GitHub Actions runs Browser tests `33693030456`, Security
scan `33693030344`, and Deploy to GitHub Pages `33693030353` passed.
Production checks covered the home, catalog, representative detail and
fullscreen demo routes, and a shareable React technology/framework filter.

The original `migration-complete` tag was removed during signed-lineage
cleanup, while its GitHub Release remains as the initial 20-project milestone.
The owner explicitly deferred a Phase 18 tag and release.

## Source cleanup

- The owner manually deleted all 20 initial superseded repositories on
  2026-07-29 after preservation, validation, production review, and release.
- The owner manually deleted `strains` and `nuxt-challenge` on 2026-07-30
  after verifying their signed snapshots and production demos; both endpoints
  returned HTTP 404.
- The owner manually deleted the User Management source repository on
  2026-09-02 after verifying its sanitized history, maintained demo, expanded
  tests, and production routes.
- The consolidated repository remains the sole maintained library. No source
  cleanup or migration action remains.
