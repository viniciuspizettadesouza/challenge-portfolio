# Demo fidelity audit

Last updated: 2026-07-28.

This document records how each maintained portfolio demo relates to its
preserved historical source. The audit distinguishes feature fidelity from
runtime architecture fidelity:

- `challenges/*/original/` preserves the historical source and architecture;
- `challenges/*/demo/` is the supported portfolio runtime;
- unavailable credentials, remote APIs, databases, and obsolete build systems
  are replaced only in maintained demos;
- intentional repairs and substitutions remain explicit below.

## Audit results

| Challenge | Historical architecture | Maintained runtime | Preserved behaviour and intentional differences |
| --- | --- | --- | --- |
| Blueticket | Vue 2, Vuetify, Google Maps, OpenWeather | Vue 3 island | City search, geolocation, complete 48-hour conditions, search history, and forecast caching; local cities replace external APIs |
| Castlabs | React, Apollo GraphQL, WebSocket subscriptions, OMDb | React island | Search, detail, create/delete mutations, and create/update/delete subscription feedback; fixtures and local artwork replace unavailable services |
| ClimateSeed | Vue 3, Pinia, ApexCharts | Vue 3 island | Original organisations, employee comparison, chart switching, emissions aggregation, and result creation; semantic CSS charts replace ApexCharts |
| Conaz | Dependency-free Node.js script | Astro/TypeScript demo | Character counts, run-length encoding, and member synchronisation are interactive; browser logic replaces console output |
| Devlandia | Two Ruby CLI programs | Astro/TypeScript demo | Full path and next-move solutions accept editable grids; browser logic replaces terminal input |
| FYLD / HanseCom | Nuxt 2, Vuex, Vuetify, movie API | Vue 3 island | Three-character search and the bundled Avengers response retain the preserved screenshot layout; no external token is used |
| Ingenious Build | Vue 3, Router, Vuex, json-server | Vue 3 island | All 11 lines, 163 stops, route positions, times, search, and sort direction use the complete bundled response |
| Instruct | Nuxt 2, JSONPlaceholder | Vue 3 island | Ten original lead records, name search, extracted categories, and combined filters use a local API fixture |
| JExperts | React 16, Router, Express, Mongoose, MongoDB | React island | Preserved screenshot layout, show-all, approximate search, profile/address fields, and two-step registration; the orphaned address route is repaired, records are fictional, and passwords are discarded |
| Lagoasoft | React 16, Create React App, Instagram media | React island | Five original posts and independent likes are retained; expired CDN media is replaced by local CSS artwork |
| Meetime | Vue 2, Router, Vuetify, Vuelidate, private API | Vue 3 island | Add/list/edit/delete lead workflows, cadence validation, dialogs, and persistence use fictional local data |
| OnSign TV | Vue 2, BootstrapVue, Google Maps, OpenWeather | Vue 3 island | Bootstrap-style navigation, address/geolocation selection, `Now` plus five hours, matrix fields, and caching use three local locations |
| Pipz | React 16, SWAPI, crawl libraries | React island | Historical seven-film order, Roman episodes, dates, preserved logo, intro, crawl, pause, and restart work without SWAPI |
| PropertiaG | Next.js 12, React | React island | The original integer-to-Roman conversion and 1–1000 constraint remain; explicit validation and examples were added |
| Salsify | React and Vite-style source | React island using the original component | Original datastore, property/operator/value filters, and table are executed directly with an Astro-compatible style layer |
| Stormtech | React 16, Express, Mongoose, MongoDB | React island | Exact README book fixture, five individual sorts, three ordered cases, null exception, and empty set; local records replace the backend |
| Sword Health | Vue 3, Quasar, Router, Auth0 | Vue 3 island | Feed, category filters, load more, detail, local session, profile, authoring, image selection/preview, and article creation work without Auth0 |
| Vue | Vue 3 component | Vue 3 island using the original component | Original driver selector runs directly; only missing visual utility styles are supplied locally |
| Vue.js | Vue 3, Pinia, Router, TVMaze HTTP API | Vue 3 island | Show metadata, episode list, summaries, and pagination use a deterministic local show fixture |
| Zygo | Dependency-free Node.js sorting service | Astro/TypeScript demo | Three documented sort configurations, exact book orders, null `OrderingException`, and empty-set output are interactive |

## Verification scope

The repository checks cover:

- all 20 registered challenge routes and demo routes;
- server rendering for React and Vue islands;
- pure logic for algorithms, fixtures, validation, filtering, sorting,
  creation, deletion, pagination, and approximate matching;
- lint, Astro/TypeScript diagnostics, unit tests, and static production build.

Browser automation under `apps/portfolio/e2e/` exercises one representative
interaction for every demo and fails on browser console or page errors. The
same run refreshes all 20 representative screenshots under
`docs/portfolio/screenshots/`.

## Architectural rule

The portfolio does not attempt to revive unsafe or unavailable infrastructure.
Historical runtime architecture remains inspectable under `original/`; the
maintained demo must preserve the meaningful user-facing workflow while being
deterministic, credential-free, and runnable from the single Astro workspace.
