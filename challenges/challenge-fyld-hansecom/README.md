# FYLD / HanseCom Challenge

> Portfolio note: this challenge's maintained demo is now consolidated into
> the domain-based **Screen Library**. The source below remains as immutable
> historical evidence.

The complete sanitized history is preserved under `original/`. That directory
is historical evidence and must not be modified.

## Consolidated maintained demo

The film collection under `../screen-library/demo/` modernizes the Nuxt
2/Vuetify movie search while remaining close to the preserved screenshot:

- show the original NuxtJS branding and centered search heading;
- require at least three search characters;
- search deterministic records from the bundled Avengers response;
- present title, year, rating, and overview in the original wide-card layout.

The historical API token is unavailable and the original page rendered its
bundled mock even after requesting live data. The maintained demo searches
those local records directly and requires no credential or network request.

The former `challenge-fyld-hansecom` and `movie-search` routes redirect to the
canonical `screen-library` entry. Status: consolidated and automatically tested.
