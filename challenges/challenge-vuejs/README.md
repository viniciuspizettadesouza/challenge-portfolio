# Vue.js Challenge

History imported, sanitized, and verified.

## Portfolio presentation

The maintained adaptation is consolidated with Castlabs, FYLD / HanseCom, and
Pipz in [`../screen-library/demo`](../screen-library/demo). Its television
collection includes the Signal Lost series profile, twelve episode records,
summaries, and pagination.
Deterministic local fixtures replace the original insecure HTTP TVMaze
requests, so the demo works without external services.

The historical Vue application remains unchanged under `original/`. The former
`challenge-vuejs` and `tv-episode-guide` routes redirect to the canonical
`screen-library` entry.

## Status

The consolidated demo is covered by SSR, unit, browser interaction, and
accessibility tests.
