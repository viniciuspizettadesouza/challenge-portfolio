<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  addSearchHistory,
  closestForecast,
  findForecast,
  forecasts,
  type CityForecast,
} from "./logic";

const WEATHER_KEY = "blueticket-demo-weather";
const HISTORY_KEY = "blueticket-demo-searches";

const search = ref("Florianópolis");
const forecast = ref<CityForecast>(forecasts[0]);
const searchHistory = ref<string[]>([]);
const message = ref("Showing a deterministic local forecast.");
const locating = ref(false);

function saveSelection(selected: CityForecast) {
  forecast.value = selected;
  search.value = selected.city;
  searchHistory.value = addSearchHistory(searchHistory.value, selected.city);
  localStorage.setItem(WEATHER_KEY, selected.city);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(searchHistory.value));
}

function submitSearch() {
  const selected = findForecast(search.value);

  if (!selected) {
    message.value = `No local forecast found for “${search.value.trim()}”. Try one of the suggested cities.`;
    return;
  }

  saveSelection(selected);
  message.value = `Forecast loaded from the local ${selected.city} fixture.`;
}

function useLocation() {
  if (!navigator.geolocation) {
    message.value = "Geolocation is not available in this browser.";
    return;
  }

  locating.value = true;
  message.value = "Waiting for browser location permission…";
  navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      const selected = closestForecast(coords.latitude, coords.longitude);
      saveSelection(selected);
      message.value = `Nearest available local forecast: ${selected.city}. No coordinates were sent anywhere.`;
      locating.value = false;
    },
    () => {
      message.value = "Location was unavailable. Search a suggested city instead.";
      locating.value = false;
    },
    { timeout: 8000 },
  );
}

function weatherSymbol(icon: string) {
  return {
    sun: "☀",
    cloud: "☁",
    rain: "☂",
    "partly-cloudy": "◒",
  }[icon];
}

onMounted(() => {
  try {
    const storedHistory = JSON.parse(localStorage.getItem(HISTORY_KEY) ?? "[]");
    if (Array.isArray(storedHistory)) searchHistory.value = storedHistory;

    const storedCity = localStorage.getItem(WEATHER_KEY);
    const storedForecast = storedCity ? findForecast(storedCity) : undefined;
    if (storedForecast) {
      forecast.value = storedForecast;
      search.value = storedForecast.city;
      message.value = "Restored the last local forecast from this browser.";
    }
  } catch {
    message.value = "Showing a deterministic local forecast.";
  }
});
</script>

<template>
  <section class="blueticket-demo">
    <header class="blueticket-header">
      <a class="blueticket-brand" href="#blueticket-weather" aria-label="Blueticket weather">
        <span aria-hidden="true"><i></i></span>
        <strong>blueticket</strong>
      </a>
      <p>Weather challenge · local edition</p>
    </header>

    <main id="blueticket-weather">
      <section class="weather-intro">
        <div>
          <p class="weather-kicker">Weather search</p>
          <h2>What is the weather like?</h2>
          <p>Search a city or use your location to select the nearest available local forecast.</p>
        </div>

        <form class="weather-search" @submit.prevent="submitSearch">
          <label>
            <span>Search city</span>
            <div>
              <input v-model="search" list="blueticket-cities" autocomplete="off" />
              <button type="button" :disabled="locating" aria-label="Use my location" title="Use my location" @click="useLocation">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="4"></circle>
                  <path d="M12 2v3M12 19v3M2 12h3M19 12h3"></path>
                </svg>
              </button>
            </div>
          </label>
          <datalist id="blueticket-cities">
            <option v-for="item in forecasts" :key="item.city" :value="item.city">
              {{ item.country }}
            </option>
          </datalist>
          <button type="submit">Search</button>
        </form>

        <div v-if="searchHistory.length" class="search-history">
          <span>Recent:</span>
          <button v-for="city in searchHistory" :key="city" type="button" @click="search = city; submitSearch()">
            {{ city }}
          </button>
        </div>
        <p class="weather-message" aria-live="polite">{{ message }}</p>
      </section>

      <section class="forecast">
        <header class="forecast-heading">
          <div>
            <p>Hourly forecast</p>
            <h3>{{ forecast.city }}, {{ forecast.country }}</h3>
          </div>
          <span>Updated {{ forecast.updatedAt }} · {{ forecast.hourly.length }} hourly records</span>
        </header>

        <div class="forecast-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Temperature</th>
                <th>Feels like</th>
                <th>Humidity</th>
                <th>Weather</th>
                <th>Weather description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(hour, index) in forecast.hourly" :key="`${hour.time}-${index}`">
                <td><strong>{{ hour.time }}</strong></td>
                <td><b>{{ Math.round(hour.temp) }}° C</b></td>
                <td>{{ Math.round(hour.feelsLike) }}° C</td>
                <td>{{ hour.humidity }}%</td>
                <td>
                  <span class="weather-condition" :class="`weather-condition--${hour.icon}`">
                    <i aria-hidden="true">{{ weatherSymbol(hour.icon) }}</i>
                    {{ hour.weather }}
                  </span>
                </td>
                <td>{{ hour.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <footer>
          Google geocoding and OpenWeather calls are replaced with local fixtures. Search history and the last forecast are cached only in this browser.
        </footer>
      </section>
    </main>
  </section>
</template>

<style scoped>
.blueticket-demo {
  --blue: #1464c0;
  --cyan: #20a7e8;
  --ink: #16324a;
  --muted: #718096;
  --line: #dfe8ef;
  width: 100%;
  min-height: 42rem;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 1.2rem;
  color: var(--ink);
  background: #f4f8fb;
  font-family: Roboto, Arial, Helvetica, sans-serif;
}

.blueticket-demo *,
.blueticket-demo *::before,
.blueticket-demo *::after {
  box-sizing: border-box;
}

.blueticket-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 4.3rem;
  padding: 0.8rem clamp(1rem, 4vw, 2.5rem);
  color: white;
  background: var(--blue);
  box-shadow: 0 5px 20px rgba(20, 100, 192, 0.22);
}

.blueticket-header p {
  margin: 0;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
}

.blueticket-brand {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  color: inherit;
  text-decoration: none;
}

.blueticket-brand > span {
  position: relative;
  display: block;
  width: 2rem;
  height: 2rem;
  transform: rotate(45deg);
}

.blueticket-brand > span::before,
.blueticket-brand > span::after,
.blueticket-brand i {
  position: absolute;
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 0.18rem;
  content: "";
}

.blueticket-brand > span::before {
  top: 0;
  left: 0;
  background: #fff;
}

.blueticket-brand > span::after {
  right: 0;
  bottom: 0;
  background: #77d1ff;
}

.blueticket-brand i {
  top: 0.4rem;
  left: 0.4rem;
  z-index: 1;
  background: var(--blue);
}

.blueticket-brand strong {
  font-size: 1.25rem;
  letter-spacing: -0.04em;
}

.blueticket-demo main {
  padding: clamp(1.2rem, 4vw, 3rem);
}

.weather-intro,
.forecast {
  max-width: 68rem;
  margin: 0 auto;
}

.weather-intro {
  display: grid;
  grid-template-columns: minmax(15rem, 1fr) minmax(20rem, 1.25fr);
  align-items: end;
  gap: 1.5rem 3rem;
  margin-bottom: 1.8rem;
}

.weather-intro p,
.weather-intro h2 {
  margin: 0;
}

.weather-intro .weather-kicker {
  margin-bottom: 0.35rem;
  color: var(--cyan);
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.11em;
  text-transform: uppercase;
}

.weather-intro h2 {
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  letter-spacing: -0.05em;
  line-height: 1;
}

.weather-intro > div:first-child > p:last-child {
  max-width: 35rem;
  margin-top: 0.75rem;
  color: var(--muted);
  font-size: 0.82rem;
  line-height: 1.55;
}

.weather-search {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: end;
  gap: 0.8rem;
}

.weather-search label {
  display: grid;
  gap: 0.4rem;
  color: #476072;
  font-size: 0.7rem;
  font-weight: 750;
}

.weather-search label > div {
  display: flex;
  border-bottom: 2px solid #9eb0be;
}

.weather-search input {
  width: 100%;
  padding: 0.7rem 0.15rem;
  border: 0;
  outline: 0;
  color: var(--ink);
  background: transparent;
  font: inherit;
}

.weather-search label button {
  display: grid;
  place-items: center;
  width: 2.5rem;
  border: 0;
  color: var(--blue);
  background: transparent;
  cursor: pointer;
}

.weather-search svg {
  width: 1.25rem;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
}

.weather-search > button {
  min-height: 2.35rem;
  padding: 0.65rem 1.25rem;
  border: 0;
  border-radius: 0.2rem;
  color: white;
  background: var(--blue);
  box-shadow: 0 4px 10px rgba(20, 100, 192, 0.22);
  font: inherit;
  font-size: 0.72rem;
  font-weight: 750;
  text-transform: uppercase;
  cursor: pointer;
}

.search-history {
  display: flex;
  grid-column: 1 / -1;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: -0.5rem;
  color: var(--muted);
  font-size: 0.68rem;
}

.search-history button {
  padding: 0.3rem 0.55rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  color: #476072;
  background: white;
  font: inherit;
  cursor: pointer;
}

.weather-message {
  grid-column: 1 / -1;
  color: var(--muted);
  font-size: 0.72rem;
}

.forecast {
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 0.7rem;
  background: white;
  box-shadow: 0 16px 38px rgba(35, 70, 95, 0.08);
}

.forecast-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.25rem 1.4rem;
  border-bottom: 1px solid var(--line);
}

.forecast-heading p,
.forecast-heading h3 {
  margin: 0;
}

.forecast-heading p {
  margin-bottom: 0.15rem;
  color: var(--cyan);
  font-size: 0.63rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.forecast-heading h3 {
  font-size: 1.2rem;
}

.forecast-heading > span {
  color: var(--muted);
  font-size: 0.7rem;
}

.forecast-table-wrap {
  max-height: 34rem;
  overflow-x: auto;
  overflow-y: auto;
}

.forecast table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.78rem;
  text-align: left;
}

.forecast th {
  position: sticky;
  top: 0;
  z-index: 1;
  padding: 0.75rem 1rem;
  color: var(--muted);
  background: #f7fafc;
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  white-space: nowrap;
}

.forecast td {
  padding: 0.85rem 1rem;
  border-top: 1px solid #edf2f6;
  color: #536779;
  white-space: nowrap;
}

.forecast td strong,
.forecast td b {
  color: var(--ink);
}

.weather-condition {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.weather-condition i {
  display: grid;
  place-items: center;
  width: 1.65rem;
  height: 1.65rem;
  border-radius: 50%;
  color: #af6c00;
  background: #fff5d6;
  font-style: normal;
}

.weather-condition--cloud i {
  color: #597081;
  background: #e8eef2;
}

.weather-condition--rain i {
  color: #176aa4;
  background: #dff2ff;
}

.forecast footer {
  padding: 0.85rem 1.4rem;
  border-top: 1px solid var(--line);
  color: #81909c;
  background: #f9fbfc;
  font-size: 0.65rem;
  line-height: 1.5;
}

@media (max-width: 720px) {
  .weather-intro {
    grid-template-columns: 1fr;
  }

  .blueticket-header {
    align-items: flex-start;
    flex-direction: column;
    gap: 0.7rem;
  }
}

@media (max-width: 440px) {
  .weather-search {
    grid-template-columns: 1fr;
  }

  .weather-search > button {
    justify-self: end;
  }

  .forecast-heading {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
