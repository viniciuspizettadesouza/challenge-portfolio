import { useEffect, useState, type FormEvent } from "react";
import ForecastTables from "./ForecastTables";
import {
  addSearchHistory,
  findForecast,
  forecasts,
  locationLabel,
  nearestForecast,
  type LocationForecast,
} from "./weatherLogic";
import { readWeatherState, writeWeatherState } from "./persistence";
import "./weather-styles.css";

function browserStorage() {
  try {
    return window.localStorage;
  } catch {
    return undefined;
  }
}

export default function WeatherForecastDemo() {
  const [selected, setSelected] = useState<LocationForecast>(forecasts[0]);
  const [query, setQuery] = useState(locationLabel(forecasts[0]));
  const [history, setHistory] = useState<string[]>([]);
  const [status, setStatus] = useState(
    "Showing a deterministic local forecast.",
  );
  const [locating, setLocating] = useState(false);

  useEffect(() => {
    const state = readWeatherState(browserStorage());
    const restored =
      state && forecasts.find(({ id }) => id === state.selectedId);
    if (!state || !restored) return;
    setSelected(restored);
    setQuery(locationLabel(restored));
    setHistory(state.history);
    setStatus(
      "Restored your last forecast and recent searches from this browser.",
    );
  }, []);

  function selectForecast(forecast: LocationForecast, message: string) {
    const nextHistory = addSearchHistory(history, forecast);
    setSelected(forecast);
    setQuery(locationLabel(forecast));
    setHistory(nextHistory);
    setStatus(message);
    writeWeatherState(browserStorage(), {
      version: 1,
      selectedId: forecast.id,
      history: nextHistory,
    });
  }

  function search(value = query) {
    if (!value.trim()) {
      setStatus("Enter an address, city, or country to search.");
      return;
    }
    const forecast = findForecast(value);
    if (!forecast) {
      setStatus(
        `No local forecast found for “${value.trim()}”. Try one of the suggested locations.`,
      );
      return;
    }
    selectForecast(
      forecast,
      `Loaded the private local forecast for ${locationLabel(forecast)}.`,
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    search();
  }

  function useLocation() {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not available in this browser.");
      return;
    }
    setLocating(true);
    setStatus("Waiting for browser location permission…");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const forecast = nearestForecast(coords.latitude, coords.longitude);
        selectForecast(
          forecast,
          `Nearest bundled forecast: ${locationLabel(forecast)}. Your coordinates stayed in this browser.`,
        );
        setLocating(false);
      },
      (error) => {
        setStatus(
          error.code === error.TIMEOUT
            ? "Location request timed out. Search a suggested location instead."
            : "Location permission was unavailable. Search a suggested location instead.",
        );
        setLocating(false);
      },
      { timeout: 8000 },
    );
  }

  const current = selected.hours[0];

  return (
    <section className="weather-demo">
      <header className="weather-hero">
        <div className="weather-mark" aria-hidden="true">
          <span>☀</span>
          <i>☁</i>
        </div>
        <div>
          <p className="eyebrow">Weather &amp; climate</p>
          <h2>Forecast explorer</h2>
          <p>
            Compare the next six hours or inspect a complete two-day
            outlook—without sending your search or coordinates anywhere.
          </p>
        </div>
        <div className="current">
          <span>{current.condition}</span>
          <strong>{current.temperature}°</strong>
          <small>Feels like {current.feelsLike}°</small>
        </div>
      </header>

      <main>
        <section className="search-panel" aria-labelledby="location-heading">
          <div>
            <p className="eyebrow">Local forecast</p>
            <h3 id="location-heading">{locationLabel(selected)}</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="weather-location">Address, city, or country</label>
            <div className="search-row">
              <input
                id="weather-location"
                value={query}
                list="weather-locations"
                autoComplete="off"
                onChange={(event) => setQuery(event.target.value)}
              />
              <button type="submit">Search</button>
              <button
                type="button"
                className="secondary"
                disabled={locating}
                onClick={useLocation}
              >
                {locating ? "Locating…" : "Use my location"}
              </button>
            </div>
            <datalist id="weather-locations">
              {forecasts.map((forecast) => (
                <option key={forecast.id} value={locationLabel(forecast)} />
              ))}
              {history.map((item) => (
                <option key={item} value={item} />
              ))}
            </datalist>
          </form>
          {history.length > 0 && (
            <div className="history">
              <span>Recent searches</span>
              {history.map((item) => (
                <button key={item} type="button" onClick={() => search(item)}>
                  {item.split(",")[0]}
                </button>
              ))}
            </div>
          )}
          <p className="weather-status" aria-live="polite">
            {status}
          </p>
        </section>
        <ForecastTables forecast={selected} />
        <footer>
          Deterministic local forecasts replace the historical Google Maps and
          OpenWeather calls. Location coordinates never leave this page.
        </footer>
      </main>
    </section>
  );
}
