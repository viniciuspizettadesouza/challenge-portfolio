# TV Episode Library

This neutral maintained demo consolidates two related historical projects:

- Castlabs supplies searchable episode management, detailed records, local
  create/delete mutations, artwork, and simulated subscription feedback.
- Vue.js supplies the Signal Lost series profile, twelve episode fixtures,
  summaries, and pagination.

The React implementation lives under `demo/`. It uses deterministic local data
instead of the original GraphQL, WebSocket, OMDb, and insecure HTTP TVMaze
dependencies. The immutable sources remain in
`../challenge-castlabs/original/` and `../challenge-vuejs/original/`.

The canonical route is `tv-episode-library`. The four former source and
capability slugs remain available as redirects.
