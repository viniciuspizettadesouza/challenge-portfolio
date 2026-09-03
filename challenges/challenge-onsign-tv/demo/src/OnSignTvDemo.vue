<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  findLocationForecast,
  hourLabels,
  locationForecasts,
  nearestLocationForecast,
  type LocationForecast,
} from "./logic";

const STORAGE_KEY = "onsign-tv-demo-location";

const selected = ref<LocationForecast>(locationForecasts[0]);
const address = ref(locationForecasts[0].address);
const status = ref("Showing the bundled demo forecast.");
const locating = ref(false);

function selectForecast(forecast: LocationForecast, message: string) {
  selected.value = forecast;
  address.value = forecast.address;
  status.value = message;
  localStorage.setItem(STORAGE_KEY, forecast.address);
}

function searchAddress() {
  const forecast = findLocationForecast(address.value);

  if (!forecast) {
    status.value = `No local result for “${address.value.trim()}”. Try Florianópolis, London, or Lisbon.`;
    return;
  }

  selectForecast(forecast, `Loaded the local forecast for ${forecast.address}.`);
}

function useMyLocation() {
  if (!navigator.geolocation) {
    status.value = "Geolocation is not available in this browser.";
    return;
  }

  locating.value = true;
  status.value = "Waiting for browser location permission…";
  navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      const forecast = nearestLocationForecast(coords.latitude, coords.longitude);
      selectForecast(
        forecast,
        `Nearest bundled forecast: ${forecast.address}. Your coordinates stayed in this browser.`,
      );
      locating.value = false;
    },
    () => {
      status.value = "Location was unavailable. Enter one of the suggested cities.";
      locating.value = false;
    },
    { timeout: 8000 },
  );
}

function symbol(condition: string) {
  return { Clear: "☀", Clouds: "☁", Rain: "☂" }[condition];
}

onMounted(() => {
  const cachedAddress = localStorage.getItem(STORAGE_KEY);
  const cachedForecast = cachedAddress
    ? findLocationForecast(cachedAddress)
    : undefined;

  if (cachedForecast) {
    selected.value = cachedForecast;
    address.value = cachedForecast.address;
    status.value = "Restored the cached forecast from this browser.";
  }
});
</script>

<template>
  <section class="onsign-demo">
    <header class="onsign-nav">
      <a class="onsign-brand" href="#onsign-forecast">
        <span aria-hidden="true"><i></i><b></b></span>
        <strong>OnSign TV</strong>
      </a>
      <nav aria-label="OnSign TV demo">
        <a href="#onsign-forecast">Forecast</a>
        <a href="#onsign-about">About</a>
      </nav>
    </header>

    <main id="onsign-forecast">
      <section class="location-panel">
        <div>
          <p class="location-kicker">Location forecast</p>
          <h2>Weather for the next six hours</h2>
        </div>

        <form class="location-search" @submit.prevent="searchAddress">
          <label>
            <span class="location-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M12 21s6-5.6 6-12a6 6 0 1 0-12 0c0 6.4 6 12 6 12Z"></path><circle cx="12" cy="9" r="2"></circle></svg>
            </span>
            <span class="sr-only">Address, city, or postcode</span>
            <input v-model="address" list="onsign-locations" />
          </label>
          <datalist id="onsign-locations">
            <option v-for="forecast in locationForecasts" :key="forecast.address" :value="forecast.address"></option>
          </datalist>
          <button type="submit" aria-label="Search address" title="Search address">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6"></circle><path d="m15 15 5 5"></path></svg>
          </button>
          <button type="button" class="location-button" :disabled="locating" @click="useMyLocation">
            Use my location
          </button>
        </form>
        <p>Enter an address, city name, or postcode to get the weather forecast.</p>
        <p class="location-status" aria-live="polite">{{ status }}</p>
      </section>

      <section class="forecast-card">
        <p class="forecast-caption">
          <strong>{{ selected.hours[0].condition }}</strong> currently in
          {{ selected.address }}. The temperature is
          <strong>{{ Math.round(selected.hours[0].temperature) }}° C</strong>.
        </p>

        <div class="forecast-grid-wrap">
          <table>
            <thead>
              <tr>
                <th><span class="sr-only">Measurement</span></th>
                <th v-for="label in hourLabels(selected.hours)" :key="label">{{ label }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Condition</th>
                <td v-for="hour in selected.hours" :key="`condition-${hour.hour}`">
                  <span class="condition">
                    <i aria-hidden="true">{{ symbol(hour.condition) }}</i>
                    {{ hour.condition }}
                  </span>
                </td>
              </tr>
              <tr>
                <th>Temp</th>
                <td v-for="hour in selected.hours" :key="`temp-${hour.hour}`">{{ Math.round(hour.temperature) }}° C</td>
              </tr>
              <tr>
                <th>Feels Like</th>
                <td v-for="hour in selected.hours" :key="`feels-${hour.hour}`">{{ Math.round(hour.feelsLike) }}° C</td>
              </tr>
              <tr>
                <th>Humidity</th>
                <td v-for="hour in selected.hours" :key="`humidity-${hour.hour}`">{{ hour.humidity }}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <aside id="onsign-about" class="onsign-about">
        <strong>Safe local adaptation</strong>
        <p>Google reverse geocoding and OpenWeather are represented by bundled forecasts. Browser coordinates are used only to select the nearest fixture and are never transmitted.</p>
      </aside>
    </main>
  </section>
</template>

<style scoped>
.onsign-demo {
  --navy: #26374d;
  --blue: #1d659c;
  --sky: #12698f;
  --muted: #526779;
  --line: #dce4eb;
  width: 100%;
  min-height: 42rem;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 1.15rem;
  color: var(--navy);
  background: #f8fafc;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.onsign-demo *,
.onsign-demo *::before,
.onsign-demo *::after {
  box-sizing: border-box;
}

.onsign-nav {
  display: flex;
  align-items: center;
  gap: 2rem;
  min-height: 4.5rem;
  padding: 0.8rem clamp(1rem, 5vw, 4rem);
  border-bottom: 1px solid var(--line);
  background: white;
}

.onsign-brand {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  color: var(--navy);
  text-decoration: none;
}

.onsign-brand > span {
  position: relative;
  width: 2rem;
  height: 1.6rem;
  overflow: hidden;
}

.onsign-brand > span::before,
.onsign-brand i,
.onsign-brand b {
  position: absolute;
  top: -1rem;
  width: 1.7rem;
  height: 2.8rem;
  background: var(--navy);
  content: "";
  transform: rotate(-32deg);
}

.onsign-brand > span::before {
  left: -0.65rem;
  background: #43bd8d;
}

.onsign-brand i {
  left: 0.25rem;
}

.onsign-brand b {
  right: -0.8rem;
  background: #39867d;
  transform: rotate(32deg);
}

.onsign-brand strong {
  font-size: 1.1rem;
}

.onsign-nav nav {
  display: flex;
  gap: 1.8rem;
  margin-left: auto;
}

.onsign-nav nav a {
  color: #5c6e7d;
  font-size: 0.78rem;
  font-weight: 650;
  text-decoration: none;
}

.onsign-demo main {
  max-width: 72rem;
  margin: 0 auto;
  padding: clamp(1.5rem, 4vw, 3rem);
}

.location-panel {
  display: grid;
  grid-template-columns: minmax(16rem, 0.9fr) minmax(25rem, 1.4fr);
  align-items: end;
  gap: 0.8rem 3rem;
  margin-bottom: 1.8rem;
}

.location-panel h2,
.location-panel p {
  margin: 0;
}

.location-kicker {
  margin-bottom: 0.35rem !important;
  color: var(--sky);
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.11em;
  text-transform: uppercase;
}

.location-panel h2 {
  font-size: clamp(1.7rem, 4vw, 2.65rem);
  letter-spacing: -0.05em;
  line-height: 1;
}

.location-search {
  display: grid;
  grid-template-columns: 1fr 2.7rem auto;
  align-items: stretch;
}

.location-search label {
  display: flex;
  min-width: 0;
  border: 1px solid #cbd5df;
  border-radius: 0.3rem 0 0 0.3rem;
  background: white;
}

.location-icon {
  display: grid;
  place-items: center;
  width: 2.5rem;
  color: var(--sky);
  border-right: 1px solid var(--line);
}

.location-search svg {
  width: 1.1rem;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
}

.location-search input {
  min-width: 0;
  width: 100%;
  padding: 0.7rem;
  border: 0;
  outline: 0;
  color: var(--navy);
  background: transparent;
  font: inherit;
  font-size: 0.76rem;
}

.location-search > button {
  display: grid;
  place-items: center;
  border: 0;
  color: white;
  background: var(--blue);
  cursor: pointer;
}

.location-search > .location-button {
  display: block;
  margin-left: 0.6rem;
  padding: 0.5rem 0.8rem;
  border-radius: 0.3rem;
  font: inherit;
  font-size: 0.68rem;
  font-weight: 700;
  white-space: nowrap;
}

.location-panel > p {
  grid-column: 2;
  color: var(--muted);
  font-size: 0.7rem;
}

.location-panel > .location-status {
  color: #4b6375;
  font-weight: 650;
}

.forecast-card {
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 0.5rem;
  background: white;
  box-shadow: 0 15px 38px rgba(38, 55, 77, 0.08);
}

.forecast-caption {
  margin: 0;
  padding: 1.15rem;
  color: #53697a;
  text-align: center;
  font-size: 0.82rem;
}

.forecast-grid-wrap {
  overflow-x: auto;
}

.forecast-card table {
  width: 100%;
  min-width: 48rem;
  border-collapse: collapse;
  font-size: 0.76rem;
  text-align: center;
}

.forecast-card th,
.forecast-card td {
  padding: 0.9rem 1rem;
  border-top: 1px solid var(--line);
  border-left: 1px solid #edf2f6;
  white-space: nowrap;
}

.forecast-card thead th {
  color: var(--blue);
  background: #f2f8fc;
  font-size: 0.68rem;
  font-weight: 800;
}

.forecast-card tbody th {
  color: #53697a;
  background: #f8fafc;
  text-align: left;
}

.condition {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.condition i {
  color: #e6a21a;
  font-size: 1rem;
  font-style: normal;
}

.onsign-about {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  padding: 1rem 1.2rem;
  border: 1px solid #dcecf4;
  border-radius: 0.45rem;
  color: #4f6575;
  background: #eff9fd;
  font-size: 0.7rem;
  line-height: 1.55;
}

.onsign-about strong {
  color: var(--blue);
  white-space: nowrap;
}

.onsign-about p {
  margin: 0;
}

.sr-only {
  position: absolute;
  overflow: hidden;
  width: 1px;
  height: 1px;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
}

@media (max-width: 760px) {
  .location-panel {
    grid-template-columns: 1fr;
  }

  .location-panel > p {
    grid-column: 1;
  }
}

@media (max-width: 560px) {
  .onsign-nav {
    align-items: flex-start;
    flex-direction: column;
    gap: 0.65rem;
  }

  .onsign-nav nav {
    margin-left: 0;
  }

  .location-search {
    grid-template-columns: 1fr 2.7rem;
  }

  .location-search > .location-button {
    grid-column: 1 / -1;
    margin: 0.6rem 0 0;
  }

  .onsign-about {
    flex-direction: column;
  }
}
</style>
