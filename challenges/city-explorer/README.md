# City Explorer

This maintained Vue 3 demo consolidates two location- and schedule-focused
historical projects:

- 3cket contributes its ten-event fixture, responsive search, local artwork,
  dynamic details, price and date presentation, and explicit not-found flow.
- Ingenious Build contributes all 11 bus lines, 163 unique stops, ordered
  routes, chronological departures, directory search, and sort direction.

Events and transit remain distinct collections beneath a shared city-discovery
navigation shell. Both use deterministic data preserved with their historical
sources, so the demo requires neither the 3cket Express service nor the
Ingenious Build `json-server` process.

The immutable sources remain under `challenges/challenge-3cket/original/` and
`challenges/challenge-ingenious-build-frontend/original/`. The canonical route
is `city-explorer`; both former canonical slugs and both historical source
slugs remain available as redirects.
