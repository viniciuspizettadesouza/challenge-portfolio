# FYLD / HanseCom Challenge

The complete sanitized history is preserved under `original/`. That directory
is historical evidence and must not be modified.

## Maintained demo

The Vue 3 demo under `demo/` modernizes the Nuxt 2/Vuetify movie search while
remaining close to the preserved screenshot:

- show the original NuxtJS branding and centered search heading;
- require at least three search characters;
- search deterministic records from the bundled Avengers response;
- present title, year, rating, and overview in the original wide-card layout.

The historical API token is unavailable and the original page rendered its
bundled mock even after requesting live data. The maintained demo searches
those local records directly and requires no credential or network request.

Status: integrated, automatically tested, and owner-approved on 2026-07-28.
