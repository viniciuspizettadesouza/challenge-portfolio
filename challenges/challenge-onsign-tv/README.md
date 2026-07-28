# OnSign TV Challenge

The complete sanitized history is preserved under `original/`. That directory
is historical evidence and must not be modified.

## Maintained demo

The Vue 3 demo under `demo/` modernizes the original Vue 2/BootstrapVue
forecast screen while retaining its distinct workflow and layout:

- resolve a typed city or use browser geolocation;
- select the nearest available local forecast without transmitting coordinates;
- show `Now` plus five hourly columns;
- compare condition, temperature, feels-like temperature, and humidity in the
  original horizontal matrix;
- restore the last selected forecast from localStorage.

The historical Google Maps key was removed during sanitization, and the
committed OpenWeather credential must not be reused. Three deterministic local
forecasts replace those services in the maintained demo.

Status: integrated and automatically tested. Owner review is pending.
