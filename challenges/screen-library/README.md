# Screen Library

This maintained React demo composes four film- and television-focused
historical projects into one screen-media workspace:

- Castlabs contributes episode search, details, local create/delete mutations,
  artwork, and simulated subscription feedback.
- Vue.js contributes the Signal Lost series profile, twelve episode fixtures,
  summaries, and pagination.
- FYLD / HanseCom contributes its three-character Avengers search, ratings,
  release years, summaries, Nuxt branding, and wide result cards.
- Pipz contributes the seven-film SWAPI order, Roman episode numbers, preserved
  Star Wars logo, animated opening, perspective crawl, pause, and restart
  controls.

Television and film remain distinct collections beneath a shared navigation
shell. All data is deterministic and local; the historical GraphQL, WebSocket,
OMDb, TVMaze, movie API, and SWAPI dependencies are not contacted. Immutable
sources remain under their four original challenge directories.

The canonical route is `screen-library`. The former `tv-episode-library` and
`film-library` routes, along with their eight historical source and capability
slugs, remain available as redirects.
