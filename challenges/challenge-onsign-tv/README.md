# OnSign TV Challenge

> Portfolio note: this challenge's maintained demo is now consolidated into
> the React-based **Climate & Weather Workspace**. The source below remains as
> immutable historical evidence.

The complete sanitized history is preserved under `original/`. That directory
is historical evidence and must not be modified.

## Maintained demo

The forecast view under `../climate-workspace/demo/` modernizes the original Vue
2/BootstrapVue
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

The former `challenge-onsign-tv` and `weather-forecast` routes redirect to the
canonical `climate-workspace` entry. Status: consolidated and automatically
tested.
