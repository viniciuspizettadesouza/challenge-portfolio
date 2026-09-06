<script setup lang="ts">
import { onMounted, ref } from "vue";
import ForecastTables from "./ForecastTables.vue";
import {
  addSearchHistory,
  findForecast,
  forecasts,
  locationLabel,
  nearestForecast,
  type LocationForecast,
} from "./logic";
import { readWeatherState, writeWeatherState } from "./persistence";
import "./styles.css";

const selected = ref<LocationForecast>(forecasts[0]);
const query = ref(locationLabel(forecasts[0]));
const history = ref<string[]>([]);
const status = ref("Showing a deterministic local forecast.");
const locating = ref(false);

function browserStorage() {
  try {
    return window.localStorage;
  } catch {
    return undefined;
  }
}

function selectForecast(forecast: LocationForecast, message: string) {
  selected.value = forecast;
  query.value = locationLabel(forecast);
  history.value = addSearchHistory(history.value, forecast);
  status.value = message;
  writeWeatherState(browserStorage(), {
    version: 1,
    selectedId: forecast.id,
    history: history.value,
  });
}

function search() {
  if (!query.value.trim()) {
    status.value = "Enter an address, city, or country to search.";
    return;
  }
  const forecast = findForecast(query.value);
  if (!forecast) {
    status.value = `No local forecast found for “${query.value.trim()}”. Try one of the suggested locations.`;
    return;
  }
  selectForecast(
    forecast,
    `Loaded the private local forecast for ${locationLabel(forecast)}.`,
  );
}

function useLocation() {
  if (!navigator.geolocation) {
    status.value = "Geolocation is not available in this browser.";
    return;
  }
  locating.value = true;
  status.value = "Waiting for browser location permission…";
  navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      const forecast = nearestForecast(coords.latitude, coords.longitude);
      selectForecast(
        forecast,
        `Nearest bundled forecast: ${locationLabel(forecast)}. Your coordinates stayed in this browser.`,
      );
      locating.value = false;
    },
    (error) => {
      status.value =
        error.code === error.TIMEOUT
          ? "Location request timed out. Search a suggested location instead."
          : "Location permission was unavailable. Search a suggested location instead.";
      locating.value = false;
    },
    { timeout: 8000 },
  );
}

onMounted(() => {
  const state = readWeatherState(browserStorage());
  const restored = state && forecasts.find(({ id }) => id === state.selectedId);
  if (!state || !restored) return;
  selected.value = restored;
  query.value = locationLabel(restored);
  history.value = state.history;
  status.value =
    "Restored your last forecast and recent searches from this browser.";
});
</script>

<template>
  <section class="weather-demo">
    <header class="weather-hero">
      <div class="weather-mark" aria-hidden="true"><span>☀</span><i>☁</i></div>
      <div>
        <p class="eyebrow">Weather & climate</p>
        <h2>Forecast explorer</h2>
        <p>
          Compare the next six hours or inspect a complete two-day
          outlook—without sending your search or coordinates anywhere.
        </p>
      </div>
      <div class="current">
        <span>{{ selected.hours[0].condition }}</span
        ><strong>{{ selected.hours[0].temperature }}°</strong
        ><small>Feels like {{ selected.hours[0].feelsLike }}°</small>
      </div>
    </header>

    <main>
      <section class="search-panel" aria-labelledby="location-heading">
        <div>
          <p class="eyebrow">Local forecast</p>
          <h3 id="location-heading">{{ locationLabel(selected) }}</h3>
        </div>
        <form @submit.prevent="search">
          <label for="weather-location">Address, city, or country</label>
          <div class="search-row">
            <input
              id="weather-location"
              v-model="query"
              list="weather-locations"
              autocomplete="off"
            /><button type="submit">Search</button
            ><button
              type="button"
              class="secondary"
              :disabled="locating"
              @click="useLocation"
            >
              {{ locating ? "Locating…" : "Use my location" }}
            </button>
          </div>
          <datalist id="weather-locations">
            <option
              v-for="forecast in forecasts"
              :key="forecast.id"
              :value="locationLabel(forecast)"
            ></option>
            <option v-for="item in history" :key="item" :value="item"></option>
          </datalist>
        </form>
        <div v-if="history.length" class="history">
          <span>Recent searches</span
          ><button
            v-for="item in history"
            :key="item"
            type="button"
            @click="
              query = item;
              search();
            "
          >
            {{ item.split(",")[0] }}
          </button>
        </div>
        <p class="weather-status" aria-live="polite">{{ status }}</p>
      </section>
      <ForecastTables :forecast="selected" />
      <footer>
        Deterministic local forecasts replace the historical Google Maps and
        OpenWeather calls. Location coordinates never leave this page.
      </footer>
    </main>
  </section>
</template>
