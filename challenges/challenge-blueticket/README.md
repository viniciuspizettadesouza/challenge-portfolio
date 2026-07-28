# Blueticket Challenge

The complete sanitized history is preserved under `original/`. That directory
is historical evidence and must not be modified.

## Maintained demo

The Vue 3 demo under `demo/` modernizes the original Vue 2/Vuetify weather
screen while retaining its primary workflow:

- search deterministic forecasts by city or country;
- use browser geolocation to choose the nearest available local city;
- inspect the complete 48-record hourly horizon with temperature, feels-like
  temperature, humidity, condition, and description;
- retain recent searches and the last selected forecast in localStorage.

The preserved application called Google Maps and OpenWeather directly. Its
Google key was removed during sanitization, and historical credentials must not
be reused. The maintained demo uses four local city fixtures and never sends
search text or browser coordinates over the network.

Status: integrated, automatically tested, and owner-approved on 2026-07-28.
