# Climate & Weather Workspace

This maintained React demo consolidates three weather- and climate-focused
historical projects:

- Blueticket and OnSign TV contribute address search, private browser
  geolocation, recent-search suggestions, a six-hour comparison, and a detailed
  48-hour local forecast.
- ClimateSeed contributes organisation and employee comparison, emissions
  aggregation, switchable donut and bar charts, and validated local results.

Forecasts and emissions remain distinct views beneath shared climate
navigation. All data and mutations are deterministic and local: the demo
contacts neither the historical Google Maps and OpenWeather services nor any
external emissions API.

The immutable sources remain under
`challenges/challenge-blueticket/original/`,
`challenges/challenge-onsign-tv/original/`, and
`challenges/challenge-climateseed/original/`. The canonical route is
`climate-workspace`; the former `weather-forecast` and
`carbon-emissions-dashboard` routes, together with all three historical source
slugs, remain available as redirects.
