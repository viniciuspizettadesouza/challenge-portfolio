# Vue.js Challenge

History imported, sanitized, and verified.

## Portfolio presentation

The maintained adaptation is consolidated with the Castlabs episode manager in
[`../tv-episode-library/demo`](../tv-episode-library/demo). It contributes the
Signal Lost series profile, twelve episode records, summaries, and pagination.
Deterministic local fixtures replace the original insecure HTTP TVMaze
requests, so the demo works without external services.

The historical Vue application remains unchanged under `original/`. The former
`challenge-vuejs` and `tv-episode-guide` routes redirect to the canonical
`tv-episode-library` entry.

## Status

The consolidated demo is covered by SSR, unit, browser interaction, and
accessibility tests.
