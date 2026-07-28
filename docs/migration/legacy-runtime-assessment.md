# Legacy runtime assessment

Last updated: 2026-07-28.

This document ranks the 20 preserved projects from easiest to hardest to test
functionally. It distinguishes direct execution evidence from static analysis.
Passing a build does not prove browser-level functional parity, especially when
a project depends on an external API.

## Evidence labels

- `Executed`: a dependency-free program was run with included or representative
  sample input.
- `Built`: dependencies were installed in a temporary copy and a production
  build passed.
- `Tested`: an available automated test suite passed in a temporary copy.
- `Portfolio demo`: the maintained adaptation is integrated into the portfolio
  and covered by the portfolio checks.
- `Owner approved`: the repository owner completed a manual visual and
  functional review.
- `Inspected`: the classification is based on source, scripts, dependencies,
  lockfiles, and service requirements; it has not been executed independently.

No dependency was installed inside `challenges/*/original/`.

## Ranked assessment

| Rank | Project | Current evidence | Why it has this rank | Owner effort |
| ---: | --- | --- | --- | --- |
| 1 | `challenge-conaz` | Executed, Portfolio demo, Owner approved | One Node.js file, no dependencies, services, or credentials | None |
| 2 | `challenge-zygo` | Executed, Portfolio demo, Owner approved | Two Node.js files and a local JSON fixture | None |
| 3 | `challenge-devlandia` | Executed, Portfolio demo, Owner approved | Two dependency-free Ruby scripts; sample inputs run successfully | None beyond having Ruby |
| 4 | `challenge-salsify` | Built, Portfolio demo, Owner approved | Modern React/Vite app with local data and no external API | None |
| 5 | `challenge-vue` | Portfolio demo, Owner approved | Small Vue 3/Vite app with no backend or private API | None for the maintained demo |
| 6 | `challenge-vuejs` | Built, Tested, Portfolio demo, Owner approved | Modern Vue 3 episode guide integrated with local fixtures | None for the maintained demo |
| 7 | `challenge-propertiag` | Built, Tested, Portfolio demo, Owner approved | Self-contained Next.js calculator adapted to a tested React island | None for the maintained demo |
| 8 | `challenge-climateseed` | Inspected, install verified, Portfolio demo, Owner approved | Modern Vue 3/Vite dashboard preserved and adapted with the original local dataset | None for the maintained demo |
| 9 | `challenge-lagoasoft` | Inspected, Portfolio demo, Owner approved | React 16/CRA social feed adapted from its local JSON | None for the maintained demo |
| 10 | `challenge-ingenious-build-frontend` | Inspected, Portfolio demo, Owner approved | Vue 3 timetable integrated with its complete bundled dataset | None for the maintained demo |
| 11 | `challenge-instruct` | Inspected, Portfolio demo, Owner approved | Nuxt 2 lead table adapted with the original public dataset stored locally | None for the maintained demo |
| 12 | `challenge-swordhealth` | Inspected, Portfolio demo, Owner approved | Vue 3/Quasar news platform adapted with a safe local demo identity | None for the maintained demo |
| 13 | `challenge-pipz` | Inspected, Portfolio demo, Owner approved | React 16/CRA film list adapted with the original SWAPI fields and crawl design | None for the maintained demo |
| 14 | `challenge-fyld-hansecom` | Inspected, Portfolio demo, Owner approved | Nuxt 2 movie search adapted with records from its bundled response | None for the maintained demo |
| 15 | `challenge-castlabs` | Inspected, Portfolio demo, Owner approved | React/Vite episode manager adapted with local service fixtures | None for the maintained demo |
| 16 | `challenge-blueticket` | Inspected, Portfolio demo, Owner approved | Vue 2 weather/geocoding screen adapted with local city forecasts | None for the maintained demo |
| 17 | `challenge-onsign-tv` | Inspected, Portfolio demo, Owner approved | Vue 2 weather/geolocation screen adapted with local forecast fixtures | None for the maintained demo |
| 18 | `challenge-meetime` | Inspected, Portfolio demo, Owner approved | Vue 2 sales client adapted with fictional local leads and cadences | None for the maintained demo |
| 19 | `challenge-stormtech` | Inspected, Portfolio demo, Owner approved | React 16/Express/MongoDB sorter adapted with its documented local book fixture | None for the maintained demo |
| 20 | `challenge-jexperts` | Inspected, Portfolio demo, Owner approved | React 16/Express/MongoDB employee directory adapted with fictional local records | None for the maintained demo |

## What is known to work now

The following direct checks passed:

```text
challenge-conaz       Node script exited successfully
challenge-zygo        Node script exited successfully with the bundled JSON
challenge-devlandia   both Ruby scripts exited successfully with sample input
challenge-salsify     npm clean install and production build passed
challenge-vuejs       npm clean install, production build, and unit test passed
challenge-propertiag  Yarn 1 install and production build passed under Node 18
```

All twenty maintained portfolio demos pass lint, typecheck, unit tests,
Chromium interaction tests, and static build. The repository owner approved
all twenty on 2026-07-28. Each browser test exercises a representative workflow
and writes a screenshot to `docs/portfolio/screenshots/`.

PropertiaG's original heading test passes, but its committed snapshot is stale
and still describes the Next.js starter instead of the calculator. Climateseed
installed successfully, but its preserved build exposes existing TypeScript
errors in `src/plugins/apexcharts.ts`, `src/router/index.ts`, and
`src/stores/data.ts`. Its maintained Vue 3 adaptation keeps the original source
unchanged, uses the same local data, and replaces the fragile chart integration
with tested semantic HTML and CSS charts.

Lagoasoft's five-post data and browser-only voting behavior are preserved in a
modern React island. Its expired Instagram CDN media is intentionally replaced
with local CSS artwork so the demo remains deterministic and network-free.

Ingenious Build's maintained Vue 3 island consumes the complete preserved
`data.json` response at build time. It retains the two timetable views while
removing the need to run `json-server` on port 3000.

Instruct's Nuxt 2 leads workflow is retained in a responsive Vue 3 island with a
local copy of the ten-record JSONPlaceholder fixture. Contact and company
category filters no longer depend on live network availability.

Sword Health's public news and protected authoring flows are retained without
contacting its historical Auth0 tenant. A clearly labelled local demo identity
supports profile and article creation for safe portfolio review.

Pipz's Star Wars film listing now uses a deterministic seven-film fixture in a
modern React island. It reproduces the preserved blue intro, original logo,
historical API order, Roman episode numbers, and yellow perspective crawl.

Fyld Hansecom's maintained Vue 3 search uses records already committed in the
historical Vuex store. It follows the preserved Nuxt/Vuetify screenshot and no
longer requires the removed external movie API token.

Castlabs' maintained React episode manager replaces the unavailable GraphQL
HTTP and WebSocket services with deterministic browser state. Search, episode
details, create/delete mutations, and immediate subscription-style feedback
remain interactive; OMDb poster requests are represented by local artwork.

Blueticket's Vue 2 city weather screen is retained as a Vue 3 island with four
local forecast fixtures. Search, browser geolocation matching, a complete
48-record hourly horizon, weather fields, recent searches, and last-forecast
caching remain interactive without contacting Google Maps or OpenWeather.

OnSign TV's Vue 2 location forecast is retained as a Vue 3 island with its
Bootstrap-style navigation and horizontal six-hour matrix. Address search,
privacy-safe geolocation matching, conditions, temperatures, humidity, and
last-forecast caching work with three bundled locations.

Meetime's two Vue 2 routes are retained in a single Vue 3 island. Cadence
selection, form validation, lead creation, the lead table, edit/delete dialogs,
and browser persistence use fictional fixtures rather than the private sales
API or historical authorization values.

Stormtech's React frontend is retained as a modern React island using the exact
four books and expected orders from its README. The five individual sorts and
all five scenarios—including the null exception and empty set—work without the
historical Express server or remote MongoDB connection.

JExperts' React employee directory is retained as a modern React island that
follows its preserved screenshot. Show-all and approximate name search, profile
and address details, a repaired two-step registration flow, and browser
persistence use fictional records without the historical Express/MongoDB
services; submitted passwords are deliberately discarded.

## Recommended next validation

1. Commit and push the current maintained source and browser evidence.
2. Run the complete validation in a fresh clone of that revision.
3. Do not revive historical credential or database connections; the documented
   fixtures are the supported portfolio runtime.

## Completion rule

A project may be marked functionally verified only after:

- install and build pass in a recorded runtime;
- available automated tests pass;
- the main browser workflow is manually or automatically exercised;
- network, backend, and credential dependencies are either safely configured or
  replaced with documented fixtures;
- the result and any intentional differences are recorded in this document or
  the project's maintained README.
