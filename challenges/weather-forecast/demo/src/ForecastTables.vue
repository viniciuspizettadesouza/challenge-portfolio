<script setup lang="ts">
import {
  comparisonHours,
  type LocationForecast,
  type WeatherCondition,
} from "./logic";

defineProps<{ forecast: LocationForecast }>();

const symbols: Record<WeatherCondition, string> = {
  Clear: "☀",
  Clouds: "☁",
  Rain: "☂",
  "Partly cloudy": "◐",
};
</script>

<template>
  <section class="weather-card" aria-labelledby="comparison-heading">
    <div class="section-heading">
      <div>
        <p>At a glance</p>
        <h3 id="comparison-heading">Next six hours</h3>
      </div>
      <span>Now + five hourly updates</span>
    </div>
    <div
      class="table-scroll"
      tabindex="0"
      aria-label="Scrollable six-hour forecast comparison"
    >
      <table class="comparison-table">
        <thead>
          <tr>
            <th>Measurement</th>
            <th
              v-for="(hour, index) in comparisonHours(forecast.hours)"
              :key="hour.index"
            >
              {{ index === 0 ? "Now" : hour.label.split(" · ").at(-1) }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Condition</th>
            <td
              v-for="hour in comparisonHours(forecast.hours)"
              :key="`condition-${hour.index}`"
            >
              <span class="condition"
                ><i aria-hidden="true">{{ symbols[hour.condition] }}</i
                >{{ hour.condition }}</span
              >
            </td>
          </tr>
          <tr>
            <th>Temperature</th>
            <td
              v-for="hour in comparisonHours(forecast.hours)"
              :key="`temp-${hour.index}`"
            >
              {{ hour.temperature }}°C
            </td>
          </tr>
          <tr>
            <th>Feels like</th>
            <td
              v-for="hour in comparisonHours(forecast.hours)"
              :key="`feels-${hour.index}`"
            >
              {{ hour.feelsLike }}°C
            </td>
          </tr>
          <tr>
            <th>Humidity</th>
            <td
              v-for="hour in comparisonHours(forecast.hours)"
              :key="`humidity-${hour.index}`"
            >
              {{ hour.humidity }}%
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <section class="weather-card" aria-labelledby="details-heading">
    <div class="section-heading">
      <div>
        <p>Detailed outlook</p>
        <h3 id="details-heading">48-hour forecast</h3>
      </div>
      <span>{{ forecast.hours.length }} deterministic hourly records</span>
    </div>
    <div
      class="table-scroll detail-scroll"
      tabindex="0"
      aria-label="Scrollable 48-hour forecast"
    >
      <table class="detail-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Condition</th>
            <th>Temperature</th>
            <th>Feels like</th>
            <th>Humidity</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="hour in forecast.hours" :key="hour.index">
            <td>
              <strong>{{ hour.label }}</strong>
            </td>
            <td>
              <span class="condition"
                ><i aria-hidden="true">{{ symbols[hour.condition] }}</i
                >{{ hour.condition }}</span
              >
            </td>
            <td>{{ hour.temperature }}°C</td>
            <td>{{ hour.feelsLike }}°C</td>
            <td>{{ hour.humidity }}%</td>
            <td>{{ hour.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
