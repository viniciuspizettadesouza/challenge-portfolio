# Legacy runtime assessment

Last updated: 2026-07-26.

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
- `Inspected`: the classification is based on source, scripts, dependencies,
  lockfiles, and service requirements; it has not been executed independently.

No dependency was installed inside `challenges/*/original/`.

## Ranked assessment

| Rank | Project | Current evidence | Why it has this rank | Owner effort |
| ---: | --- | --- | --- | --- |
| 1 | `challenge-conaz` | Executed | One Node.js file, no dependencies, services, or credentials | None |
| 2 | `challenge-zygo` | Executed | Two Node.js files and a local JSON fixture | None |
| 3 | `challenge-devlandia` | Executed | Two dependency-free Ruby scripts; sample inputs run successfully | None beyond having Ruby |
| 4 | `challenge-salsify` | Built, Portfolio demo | Modern React/Vite app with local data and no external API | None |
| 5 | `challenge-vue` | Portfolio demo, Inspected | Small Vue 3/Vite app with no backend or private API | Low; independently build the preserved app |
| 6 | `challenge-vuejs` | Built, Tested | Modern Vue 3/Vite app; production build and one unit test pass | Low; browser flow depends on a TVMaze request currently using HTTP |
| 7 | `challenge-propertiag` | Inspected | Self-contained Next.js calculator with Jest tests and no API | Low; use Yarn 1 and a compatible Node version |
| 8 | `challenge-climateseed` | Inspected, install verified | Modern Vue 3/Vite app with local data and a unit test | Low to medium; production build currently has three TypeScript errors |
| 9 | `challenge-lagoasoft` | Inspected | React 16/CRA app backed by local JSON | Medium; use an older Node/Yarn toolchain and replace expired remote image URLs if needed |
| 10 | `challenge-ingenious-build-frontend` | Inspected | Vue 3 app with a bundled `json-server` fixture | Medium; use Node 16 and run both API and UI processes |
| 11 | `challenge-instruct` | Inspected | Nuxt 2 frontend using the public JSONPlaceholder API | Medium; legacy Node/Nuxt compatibility plus live network behavior |
| 12 | `challenge-swordhealth` | Inspected | Vue 3/Quasar app with an explicit Node 14–18 range | Medium to high; Auth0 tenant and callback configuration may require owner access |
| 13 | `challenge-pipz` | Inspected | Small React 16/CRA frontend | High; the removed environment configuration pointed to a Star Wars API that must be replaced or mocked |
| 14 | `challenge-fyld-hansecom` | Inspected | Small Nuxt 2 movie search app | High; the external movie API token was redacted and a replacement API or mock is required |
| 15 | `challenge-castlabs` | Inspected | Modern React/Vite code but multiple live data integrations | High; GraphQL HTTP/WebSocket and OMDb configuration must be safely replaced or mocked |
| 16 | `challenge-blueticket` | Inspected | Vue 2 weather/geocoding application | High; Google Maps credentials were redacted and the OpenWeather integration is old |
| 17 | `challenge-onsign-tv` | Inspected | Vue 2 weather/geolocation application | High; Google Maps credentials were redacted and the OpenWeather integration is old |
| 18 | `challenge-meetime` | Inspected | Vue 2 client for a private sales API | Very high; requires authorized API access and should use fixtures instead of historical credentials |
| 19 | `challenge-stormtech` | Inspected | React 16 frontend plus Express/Mongoose backend | Very high; requires a replacement MongoDB database, seed data, two processes, and legacy Node |
| 20 | `challenge-jexperts` | Inspected | React 16 frontend plus a larger Express/Mongoose CRUD backend | Very high; requires replacement database/configuration, representative data, two processes, and deeper workflow review |

## What is known to work now

The following direct checks passed:

```text
challenge-conaz       Node script exited successfully
challenge-zygo        Node script exited successfully with the bundled JSON
challenge-devlandia   both Ruby scripts exited successfully with sample input
challenge-salsify     npm clean install and production build passed
challenge-vuejs       npm clean install, production build, and unit test passed
```

The maintained Salsify and Vue portfolio demos also pass the portfolio lint,
typecheck, tests, and static build.

Climateseed installed successfully, but its build exposed existing TypeScript
errors in `src/plugins/apexcharts.ts`, `src/router/index.ts`, and
`src/stores/data.ts`. Propertia was not treated as failed: it has a Yarn
lockfile, so an `npm ci` attempt is not a valid test for that project.

## Recommended testing order

1. Record console evidence for Conaz, Zygo, and Devlandia, and capture browser
   evidence for Salsify and Vue.
2. Run a browser smoke test for Vue.js and replace its HTTP API URL with HTTPS
   or a fixture if necessary.
3. Test Propertia with Yarn 1 and Node 16 or 18.
4. Fix Climateseed's three type errors, then run its build and unit test again.
5. Test Lagoasoft, Ingenious Build, and Instruct in isolated legacy runtimes.
6. Decide whether Sword Health should retain Auth0 or become a fixture-backed
   demo.
7. Use local fixtures for every credential-dependent project before attempting
   functional parity.
8. Recreate MongoDB locally for Stormtech and JExperts only if full backend
   behavior is valuable; otherwise produce complete case studies.

## Completion rule

A project may be marked functionally verified only after:

- install and build pass in a recorded runtime;
- available automated tests pass;
- the main browser workflow is manually or automatically exercised;
- network, backend, and credential dependencies are either safely configured or
  replaced with documented fixtures;
- the result and any intentional differences are recorded in this document or
  the project's maintained README.
