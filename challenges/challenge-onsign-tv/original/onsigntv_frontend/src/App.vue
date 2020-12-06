<template>
  <div id="app">
    <div class="container">
      <Header/>

      <div>
        <b-input-group>
          <b-input-group-text>
            <b-icon icon="cursor-fill"/>
          </b-input-group-text>
          <b-form-input v-if="address" v-model="address"></b-form-input>
          <b-form-input v-else></b-form-input>

          <template #append>
            <b-button variant="primary" @click="getLocation">
              <b-icon icon="search"/>
            </b-button>
          </template>
        </b-input-group>
        <p>Enter the city address, city name or zip code to get the weather forecast</p>
      </div>

      <div>
        <b-table-simple small caption-top responsive>
          <caption>{{ testingWeather[0][0].weather[0].main }} currently in Florianópolis. The temperature is
            {{ weatherMock.hourly[hours].temp }} C.
          </caption>
          <b-thead>
            <b-tr>
              <b-th></b-th>
              <b-th>Now</b-th>
              <b-th>{{ hours + 1 }}</b-th>
              <b-th>{{ hours + 2 }}</b-th>
              <b-th>{{ hours + 3 }}</b-th>
              <b-th>{{ hours + 4 }}</b-th>
              <b-th>{{ hours + 5 }}</b-th>
            </b-tr>
          </b-thead>
          <template v-if="testingWeather">
            <b-tbody v-for="(value, index) in testingWeather" v-bind:key="index">
              <b-tr>
                <b-th>Condition</b-th>
                <b-td>{{ value[0].weather[index].main }}</b-td>
                <b-td>{{ value[1].weather[index].main }}</b-td>
                <b-td>{{ value[2].weather[index].main }}</b-td>
                <b-td>{{ value[3].weather[index].main }}</b-td>
                <b-td>{{ value[4].weather[index].main }}</b-td>
                <b-td>{{ value[5].weather[index].main }}</b-td>
              </b-tr>
              <b-tr>
                <b-th>Temp</b-th>
                <b-td>{{ value[0].temp }} C</b-td>
                <b-td>{{ value[1].temp }} C</b-td>
                <b-td>{{ value[2].temp }} C</b-td>
                <b-td>{{ value[3].temp }} C</b-td>
                <b-td>{{ value[4].temp }} C</b-td>
                <b-td>{{ value[5].temp }} C</b-td>
              </b-tr>
              <b-tr>
                <b-th>Feels Like</b-th>
                <b-td>{{ value[0].feels_like }} C</b-td>
                <b-td>{{ value[1].feels_like }} C</b-td>
                <b-td>{{ value[2].feels_like }} C</b-td>
                <b-td>{{ value[3].feels_like }} C</b-td>
                <b-td>{{ value[4].feels_like }} C</b-td>
                <b-td>{{ value[5].feels_like }} C</b-td>
              </b-tr>
              <b-tr>
                <b-th>Humidity</b-th>
                <b-td>{{ value[0].humidity }}%</b-td>
                <b-td>{{ value[1].humidity }}%</b-td>
                <b-td>{{ value[2].humidity }}%</b-td>
                <b-td>{{ value[3].humidity }}%</b-td>
                <b-td>{{ value[4].humidity }}%</b-td>
                <b-td>{{ value[5].humidity }}%</b-td>
              </b-tr>
            </b-tbody>
          </template>
          <template v-else>
            <b-tbody v-for="(value, index) in weatherFiltered" v-bind:key="index">
              <b-tr>
                <b-th>Condition</b-th>
                <b-td>{{ value[0].weather[index].main }}</b-td>
                <b-td>{{ value[1].weather[index].main }}</b-td>
                <b-td>{{ value[2].weather[index].main }}</b-td>
                <b-td>{{ value[3].weather[index].main }}</b-td>
                <b-td>{{ value[4].weather[index].main }}</b-td>
                <b-td>{{ value[5].weather[index].main }}</b-td>
              </b-tr>
              <b-tr>
                <b-th>Temp</b-th>
                <b-td>{{ value[0].temp }} C</b-td>
                <b-td>{{ value[1].temp }} C</b-td>
                <b-td>{{ value[2].temp }} C</b-td>
                <b-td>{{ value[3].temp }} C</b-td>
                <b-td>{{ value[4].temp }} C</b-td>
                <b-td>{{ value[5].temp }} C</b-td>
              </b-tr>
              <b-tr>
                <b-th>Feels Like</b-th>
                <b-td>{{ value[0].feels_like }} C</b-td>
                <b-td>{{ value[1].feels_like }} C</b-td>
                <b-td>{{ value[2].feels_like }} C</b-td>
                <b-td>{{ value[3].feels_like }} C</b-td>
                <b-td>{{ value[4].feels_like }} C</b-td>
                <b-td>{{ value[5].feels_like }} C</b-td>
              </b-tr>
              <b-tr>
                <b-th>Humidity</b-th>
                <b-td>{{ value[0].humidity }}%</b-td>
                <b-td>{{ value[1].humidity }}%</b-td>
                <b-td>{{ value[2].humidity }}%</b-td>
                <b-td>{{ value[3].humidity }}%</b-td>
                <b-td>{{ value[4].humidity }}%</b-td>
                <b-td>{{ value[5].humidity }}%</b-td>
              </b-tr>
            </b-tbody>
          </template>

        </b-table-simple>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";

export default {
  name: 'App',
  data() {
    return {
      geocodingResponse: null,
      address: null,
      weatherFiltered: [],
      weatherItems: [],
      latitude: -27.585,
      longitude: -48.435,
      hours: null,
      testingWeather: null,
      weatherMock: {
        "lat": -27.59,
        "lon": -48.44,
        "timezone": "America/Sao_Paulo",
        "timezone_offset": -10800,
        "hourly": [{
          "dt": 1607223600,
          "temp": 19,
          "feels_like": 21.04,
          "pressure": 1020,
          "humidity": 93,
          "dew_point": 17.84,
          "uvi": 0,
          "clouds": 75,
          "visibility": 6995,
          "wind_speed": 0.98,
          "wind_deg": 307,
          "weather": [{ "id": 501, "main": "Rain", "description": "moderate rain", "icon": "10n" }],
          "pop": 0.97,
          "rain": { "1h": 2.3 }
        }, {
          "dt": 1607227200,
          "temp": 18.69,
          "feels_like": 20.46,
          "pressure": 1020,
          "humidity": 92,
          "dew_point": 17.36,
          "uvi": 0,
          "clouds": 87,
          "visibility": 6574,
          "wind_speed": 1.08,
          "wind_deg": 292,
          "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n" }],
          "pop": 0.77
        }, {
          "dt": 1607230800,
          "temp": 18.53,
          "feels_like": 19.94,
          "pressure": 1019,
          "humidity": 92,
          "dew_point": 17.21,
          "uvi": 0,
          "clouds": 95,
          "visibility": 6836,
          "wind_speed": 1.51,
          "wind_deg": 275,
          "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n" }],
          "pop": 0.8
        }, {
          "dt": 1607234400,
          "temp": 18.47,
          "feels_like": 19.98,
          "pressure": 1018,
          "humidity": 91,
          "dew_point": 16.97,
          "uvi": 0,
          "clouds": 98,
          "visibility": 7453,
          "wind_speed": 1.22,
          "wind_deg": 257,
          "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n" }],
          "pop": 0.8
        }, {
          "dt": 1607238000,
          "temp": 18.58,
          "feels_like": 20,
          "pressure": 1018,
          "humidity": 91,
          "dew_point": 17.08,
          "uvi": 0,
          "clouds": 100,
          "visibility": 10000,
          "wind_speed": 1.42,
          "wind_deg": 194,
          "weather": [{ "id": 501, "main": "Rain", "description": "moderate rain", "icon": "10n" }],
          "pop": 1,
          "rain": { "1h": 2.19 }
        }, {
          "dt": 1607241600,
          "temp": 18.75,
          "feels_like": 20.29,
          "pressure": 1018,
          "humidity": 91,
          "dew_point": 17.36,
          "uvi": 0,
          "clouds": 100,
          "visibility": 4801,
          "wind_speed": 1.34,
          "wind_deg": 146,
          "weather": [{ "id": 501, "main": "Rain", "description": "moderate rain", "icon": "10n" }],
          "pop": 1,
          "rain": { "1h": 2.81 }
        }, {
          "dt": 1607245200,
          "temp": 19.18,
          "feels_like": 19.95,
          "pressure": 1018,
          "humidity": 91,
          "dew_point": 17.84,
          "uvi": 0.2,
          "clouds": 100,
          "visibility": 4019,
          "wind_speed": 2.69,
          "wind_deg": 102,
          "weather": [{ "id": 501, "main": "Rain", "description": "moderate rain", "icon": "10d" }],
          "pop": 1,
          "rain": { "1h": 3.62 }
        }, {
          "dt": 1607248800,
          "temp": 19.76,
          "feels_like": 19.5,
          "pressure": 1018,
          "humidity": 91,
          "dew_point": 18.35,
          "uvi": 0.1,
          "clouds": 100,
          "visibility": 6929,
          "wind_speed": 4.52,
          "wind_deg": 93,
          "weather": [{ "id": 501, "main": "Rain", "description": "moderate rain", "icon": "10d" }],
          "pop": 1,
          "rain": { "1h": 2.7 }
        }, {
          "dt": 1607252400,
          "temp": 20.29,
          "feels_like": 18.9,
          "pressure": 1019,
          "humidity": 89,
          "dew_point": 18.54,
          "uvi": 0.3,
          "clouds": 100,
          "visibility": 8044,
          "wind_speed": 6.24,
          "wind_deg": 89,
          "weather": [{ "id": 501, "main": "Rain", "description": "moderate rain", "icon": "10d" }],
          "pop": 1,
          "rain": { "1h": 2.03 }
        }, {
          "dt": 1607256000,
          "temp": 20.31,
          "feels_like": 18.38,
          "pressure": 1019,
          "humidity": 90,
          "dew_point": 18.62,
          "uvi": 0.6,
          "clouds": 100,
          "visibility": 5505,
          "wind_speed": 7.13,
          "wind_deg": 89,
          "weather": [{ "id": 501, "main": "Rain", "description": "moderate rain", "icon": "10d" }],
          "pop": 1,
          "rain": { "1h": 2.45 }
        }, {
          "dt": 1607259600,
          "temp": 20.27,
          "feels_like": 18.37,
          "pressure": 1019,
          "humidity": 89,
          "dew_point": 18.56,
          "uvi": 0.63,
          "clouds": 100,
          "visibility": 4645,
          "wind_speed": 6.95,
          "wind_deg": 86,
          "weather": [{ "id": 501, "main": "Rain", "description": "moderate rain", "icon": "10d" }],
          "pop": 1,
          "rain": { "1h": 2.89 }
        }, {
          "dt": 1607263200,
          "temp": 20.23,
          "feels_like": 18.29,
          "pressure": 1019,
          "humidity": 90,
          "dew_point": 18.54,
          "uvi": 0.81,
          "clouds": 100,
          "visibility": 6184,
          "wind_speed": 7.1,
          "wind_deg": 88,
          "weather": [{ "id": 501, "main": "Rain", "description": "moderate rain", "icon": "10d" }],
          "pop": 1,
          "rain": { "1h": 3.35 }
        }, {
          "dt": 1607266800,
          "temp": 20.32,
          "feels_like": 18.65,
          "pressure": 1018,
          "humidity": 89,
          "dew_point": 18.51,
          "uvi": 0.9,
          "clouds": 100,
          "visibility": 8081,
          "wind_speed": 6.65,
          "wind_deg": 82,
          "weather": [{ "id": 501, "main": "Rain", "description": "moderate rain", "icon": "10d" }],
          "pop": 1,
          "rain": { "1h": 2.16 }
        }, {
          "dt": 1607270400,
          "temp": 20.31,
          "feels_like": 18.88,
          "pressure": 1018,
          "humidity": 89,
          "dew_point": 18.49,
          "uvi": 0.84,
          "clouds": 100,
          "visibility": 7058,
          "wind_speed": 6.3,
          "wind_deg": 86,
          "weather": [{ "id": 501, "main": "Rain", "description": "moderate rain", "icon": "10d" }],
          "pop": 1,
          "rain": { "1h": 2.54 }
        }, {
          "dt": 1607274000,
          "temp": 20.27,
          "feels_like": 18.55,
          "pressure": 1018,
          "humidity": 89,
          "dew_point": 18.49,
          "uvi": 0.7,
          "clouds": 100,
          "visibility": 6370,
          "wind_speed": 6.7,
          "wind_deg": 90,
          "weather": [{ "id": 501, "main": "Rain", "description": "moderate rain", "icon": "10d" }],
          "pop": 1,
          "rain": { "1h": 2.7 }
        }, {
          "dt": 1607277600,
          "temp": 20.22,
          "feels_like": 18.49,
          "pressure": 1017,
          "humidity": 89,
          "dew_point": 18.52,
          "uvi": 0.49,
          "clouds": 100,
          "visibility": 5529,
          "wind_speed": 6.68,
          "wind_deg": 91,
          "weather": [{ "id": 501, "main": "Rain", "description": "moderate rain", "icon": "10d" }],
          "pop": 1,
          "rain": { "1h": 3 }
        }, {
          "dt": 1607281200,
          "temp": 20.28,
          "feels_like": 18.41,
          "pressure": 1017,
          "humidity": 89,
          "dew_point": 18.58,
          "uvi": 0.25,
          "clouds": 100,
          "visibility": 5629,
          "wind_speed": 6.91,
          "wind_deg": 93,
          "weather": [{ "id": 501, "main": "Rain", "description": "moderate rain", "icon": "10d" }],
          "pop": 1,
          "rain": { "1h": 2.52 }
        }, {
          "dt": 1607284800,
          "temp": 20.24,
          "feels_like": 18.71,
          "pressure": 1017,
          "humidity": 90,
          "dew_point": 18.55,
          "uvi": 0.11,
          "clouds": 100,
          "visibility": 4651,
          "wind_speed": 6.52,
          "wind_deg": 89,
          "weather": [{ "id": 501, "main": "Rain", "description": "moderate rain", "icon": "10d" }],
          "pop": 1,
          "rain": { "1h": 2.82 }
        }, {
          "dt": 1607288400,
          "temp": 20.2,
          "feels_like": 18.41,
          "pressure": 1017,
          "humidity": 90,
          "dew_point": 18.6,
          "uvi": 0.03,
          "clouds": 100,
          "visibility": 6148,
          "wind_speed": 6.86,
          "wind_deg": 87,
          "weather": [{ "id": 501, "main": "Rain", "description": "moderate rain", "icon": "10d" }],
          "pop": 1,
          "rain": { "1h": 3.56 }
        }, {
          "dt": 1607292000,
          "temp": 20.37,
          "feels_like": 18.34,
          "pressure": 1017,
          "humidity": 89,
          "dew_point": 18.54,
          "uvi": 0,
          "clouds": 100,
          "visibility": 9595,
          "wind_speed": 7.2,
          "wind_deg": 89,
          "weather": [{ "id": 501, "main": "Rain", "description": "moderate rain", "icon": "10n" }],
          "pop": 1,
          "rain": { "1h": 1.53 }
        }, {
          "dt": 1607295600,
          "temp": 20.48,
          "feels_like": 18.19,
          "pressure": 1018,
          "humidity": 88,
          "dew_point": 18.46,
          "uvi": 0,
          "clouds": 100,
          "visibility": 8152,
          "wind_speed": 7.52,
          "wind_deg": 93,
          "weather": [{ "id": 501, "main": "Rain", "description": "moderate rain", "icon": "10n" }],
          "pop": 1,
          "rain": { "1h": 1.57 }
        }, {
          "dt": 1607299200,
          "temp": 20.54,
          "feels_like": 18.04,
          "pressure": 1018,
          "humidity": 86,
          "dew_point": 18.21,
          "uvi": 0,
          "clouds": 100,
          "visibility": 10000,
          "wind_speed": 7.64,
          "wind_deg": 94,
          "weather": [{ "id": 501, "main": "Rain", "description": "moderate rain", "icon": "10n" }],
          "pop": 1,
          "rain": { "1h": 1.28 }
        }, {
          "dt": 1607302800,
          "temp": 20.61,
          "feels_like": 18.46,
          "pressure": 1018,
          "humidity": 84,
          "dew_point": 17.97,
          "uvi": 0,
          "clouds": 100,
          "visibility": 10000,
          "wind_speed": 6.95,
          "wind_deg": 93,
          "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10n" }],
          "pop": 0.76,
          "rain": { "1h": 0.98 }
        }, {
          "dt": 1607306400,
          "temp": 20.51,
          "feels_like": 18.87,
          "pressure": 1018,
          "humidity": 84,
          "dew_point": 17.9,
          "uvi": 0,
          "clouds": 100,
          "visibility": 10000,
          "wind_speed": 6.16,
          "wind_deg": 93,
          "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10n" }],
          "pop": 0.76,
          "rain": { "1h": 0.72 }
        }, {
          "dt": 1607310000,
          "temp": 20.56,
          "feels_like": 19.23,
          "pressure": 1017,
          "humidity": 84,
          "dew_point": 17.86,
          "uvi": 0,
          "clouds": 100,
          "visibility": 10000,
          "wind_speed": 5.75,
          "wind_deg": 90,
          "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10n" }],
          "pop": 0.84,
          "rain": { "1h": 0.6 }
        }, {
          "dt": 1607313600,
          "temp": 20.63,
          "feels_like": 19.76,
          "pressure": 1017,
          "humidity": 83,
          "dew_point": 17.77,
          "uvi": 0,
          "clouds": 100,
          "visibility": 10000,
          "wind_speed": 5.01,
          "wind_deg": 90,
          "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10n" }],
          "pop": 0.84,
          "rain": { "1h": 0.26 }
        }, {
          "dt": 1607317200,
          "temp": 20.66,
          "feels_like": 19.95,
          "pressure": 1016,
          "humidity": 83,
          "dew_point": 17.8,
          "uvi": 0,
          "clouds": 99,
          "visibility": 10000,
          "wind_speed": 4.81,
          "wind_deg": 90,
          "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10n" }],
          "pop": 0.84,
          "rain": { "1h": 0.43 }
        }, {
          "dt": 1607320800,
          "temp": 20.63,
          "feels_like": 20.34,
          "pressure": 1016,
          "humidity": 84,
          "dew_point": 17.88,
          "uvi": 0,
          "clouds": 99,
          "visibility": 10000,
          "wind_speed": 4.3,
          "wind_deg": 89,
          "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10n" }],
          "pop": 0.89,
          "rain": { "1h": 0.48 }
        }, {
          "dt": 1607324400,
          "temp": 20.57,
          "feels_like": 20.36,
          "pressure": 1016,
          "humidity": 85,
          "dew_point": 18.07,
          "uvi": 0,
          "clouds": 100,
          "visibility": 10000,
          "wind_speed": 4.27,
          "wind_deg": 89,
          "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10n" }],
          "pop": 0.88,
          "rain": { "1h": 0.66 }
        }, {
          "dt": 1607328000,
          "temp": 20.65,
          "feels_like": 20.46,
          "pressure": 1016,
          "humidity": 86,
          "dew_point": 18.29,
          "uvi": 0,
          "clouds": 100,
          "visibility": 10000,
          "wind_speed": 4.4,
          "wind_deg": 85,
          "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10n" }],
          "pop": 0.9,
          "rain": { "1h": 0.73 }
        }, {
          "dt": 1607331600,
          "temp": 20.64,
          "feels_like": 20.28,
          "pressure": 1016,
          "humidity": 86,
          "dew_point": 18.4,
          "uvi": 0.19,
          "clouds": 100,
          "visibility": 10000,
          "wind_speed": 4.63,
          "wind_deg": 84,
          "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10d" }],
          "pop": 0.91,
          "rain": { "1h": 0.92 }
        }, {
          "dt": 1607335200,
          "temp": 20.74,
          "feels_like": 20.35,
          "pressure": 1017,
          "humidity": 86,
          "dew_point": 18.42,
          "uvi": 0.4,
          "clouds": 100,
          "visibility": 10000,
          "wind_speed": 4.74,
          "wind_deg": 91,
          "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10d" }],
          "pop": 0.9,
          "rain": { "1h": 0.62 }
        }, {
          "dt": 1607338800,
          "temp": 21.12,
          "feels_like": 20.66,
          "pressure": 1017,
          "humidity": 85,
          "dew_point": 18.57,
          "uvi": 1.15,
          "clouds": 100,
          "visibility": 10000,
          "wind_speed": 4.96,
          "wind_deg": 94,
          "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10d" }],
          "pop": 0.85,
          "rain": { "1h": 0.47 }
        }, {
          "dt": 1607342400,
          "temp": 21.13,
          "feels_like": 20.58,
          "pressure": 1017,
          "humidity": 84,
          "dew_point": 18.48,
          "uvi": 2.29,
          "clouds": 100,
          "visibility": 10000,
          "wind_speed": 4.97,
          "wind_deg": 95,
          "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10d" }],
          "pop": 0.88,
          "rain": { "1h": 0.51 }
        }, {
          "dt": 1607346000,
          "temp": 21.3,
          "feels_like": 20.77,
          "pressure": 1017,
          "humidity": 84,
          "dew_point": 18.63,
          "uvi": 2.86,
          "clouds": 100,
          "visibility": 10000,
          "wind_speed": 5.05,
          "wind_deg": 92,
          "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10d" }],
          "pop": 0.83,
          "rain": { "1h": 0.56 }
        }, {
          "dt": 1607349600,
          "temp": 21.31,
          "feels_like": 20.74,
          "pressure": 1017,
          "humidity": 84,
          "dew_point": 18.67,
          "uvi": 3.71,
          "clouds": 100,
          "visibility": 10000,
          "wind_speed": 5.11,
          "wind_deg": 94,
          "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10d" }],
          "pop": 0.82,
          "rain": { "1h": 0.49 }
        }, {
          "dt": 1607353200,
          "temp": 21.71,
          "feels_like": 21.33,
          "pressure": 1017,
          "humidity": 83,
          "dew_point": 18.79,
          "uvi": 4.14,
          "clouds": 100,
          "visibility": 10000,
          "wind_speed": 4.97,
          "wind_deg": 95,
          "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10d" }],
          "pop": 0.79,
          "rain": { "1h": 0.53 }
        }, {
          "dt": 1607356800,
          "temp": 21.51,
          "feels_like": 21.07,
          "pressure": 1016,
          "humidity": 84,
          "dew_point": 18.8,
          "uvi": 4.89,
          "clouds": 99,
          "visibility": 10000,
          "wind_speed": 5.05,
          "wind_deg": 92,
          "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10d" }],
          "pop": 0.83,
          "rain": { "1h": 0.41 }
        }, {
          "dt": 1607360400,
          "temp": 21.59,
          "feels_like": 21.31,
          "pressure": 1015,
          "humidity": 84,
          "dew_point": 18.81,
          "uvi": 4.06,
          "clouds": 99,
          "visibility": 10000,
          "wind_speed": 4.87,
          "wind_deg": 91,
          "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10d" }],
          "pop": 0.83,
          "rain": { "1h": 0.35 }
        }, {
          "dt": 1607364000,
          "temp": 21.59,
          "feels_like": 21.41,
          "pressure": 1015,
          "humidity": 84,
          "dew_point": 18.85,
          "uvi": 2.84,
          "clouds": 100,
          "visibility": 10000,
          "wind_speed": 4.72,
          "wind_deg": 90,
          "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10d" }],
          "pop": 0.78,
          "rain": { "1h": 0.25 }
        }, {
          "dt": 1607367600,
          "temp": 21.63,
          "feels_like": 21.37,
          "pressure": 1014,
          "humidity": 83,
          "dew_point": 18.78,
          "uvi": 1.31,
          "clouds": 100,
          "visibility": 10000,
          "wind_speed": 4.74,
          "wind_deg": 86,
          "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10d" }],
          "pop": 0.6,
          "rain": { "1h": 0.15 }
        }, {
          "dt": 1607371200,
          "temp": 22.1,
          "feels_like": 21.95,
          "pressure": 1014,
          "humidity": 81,
          "dew_point": 18.73,
          "uvi": 0.55,
          "clouds": 89,
          "visibility": 10000,
          "wind_speed": 4.63,
          "wind_deg": 84,
          "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10d" }],
          "pop": 0.63,
          "rain": { "1h": 0.11 }
        }, {
          "dt": 1607374800,
          "temp": 22.03,
          "feels_like": 22.16,
          "pressure": 1014,
          "humidity": 82,
          "dew_point": 18.86,
          "uvi": 0.15,
          "clouds": 87,
          "visibility": 10000,
          "wind_speed": 4.31,
          "wind_deg": 87,
          "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10d" }],
          "pop": 0.6,
          "rain": { "1h": 0.3 }
        }, {
          "dt": 1607378400,
          "temp": 21.72,
          "feels_like": 21.98,
          "pressure": 1014,
          "humidity": 83,
          "dew_point": 18.86,
          "uvi": 0,
          "clouds": 91,
          "visibility": 10000,
          "wind_speed": 4.05,
          "wind_deg": 86,
          "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10d" }],
          "pop": 0.73,
          "rain": { "1h": 0.5 }
        }, {
          "dt": 1607382000,
          "temp": 21.78,
          "feels_like": 22.11,
          "pressure": 1015,
          "humidity": 83,
          "dew_point": 18.93,
          "uvi": 0,
          "clouds": 90,
          "visibility": 10000,
          "wind_speed": 4,
          "wind_deg": 87,
          "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10n" }],
          "pop": 0.85,
          "rain": { "1h": 0.43 }
        }, {
          "dt": 1607385600,
          "temp": 21.89,
          "feels_like": 22.2,
          "pressure": 1015,
          "humidity": 83,
          "dew_point": 19.05,
          "uvi": 0,
          "clouds": 87,
          "visibility": 10000,
          "wind_speed": 4.09,
          "wind_deg": 84,
          "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10n" }],
          "pop": 0.81,
          "rain": { "1h": 0.3 }
        }, {
          "dt": 1607389200,
          "temp": 21.92,
          "feels_like": 22.56,
          "pressure": 1016,
          "humidity": 84,
          "dew_point": 19.12,
          "uvi": 0,
          "clouds": 60,
          "visibility": 10000,
          "wind_speed": 3.76,
          "wind_deg": 77,
          "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10n" }],
          "pop": 0.62,
          "rain": { "1h": 0.35 }
        }, {
          "dt": 1607392800,
          "temp": 21.84,
          "feels_like": 22.8,
          "pressure": 1015,
          "humidity": 84,
          "dew_point": 19.13,
          "uvi": 0,
          "clouds": 67,
          "visibility": 10000,
          "wind_speed": 3.25,
          "wind_deg": 68,
          "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10n" }],
          "pop": 0.83,
          "rain": { "1h": 0.52 }
        }]
      },
      geocodingMock: {
        "plus_code": {
          "compound_code": "CH77+55 Barra da Lagoa, Florianópolis - SC, Brasil",
          "global_code": "584HCH77+55"
        }, "results": [{
          "address_components": [{
            "long_name": "50",
            "short_name": "50",
            "types": ["street_number"]
          }, {
            "long_name": "Servidão dos Coroas",
            "short_name": "Servidão dos Coroas",
            "types": ["route"]
          }, {
            "long_name": "Barra da Lagoa",
            "short_name": "Barra da Lagoa",
            "types": ["political", "sublocality", "sublocality_level_1"]
          }, {
            "long_name": "Florianópolis",
            "short_name": "Florianópolis",
            "types": ["administrative_area_level_2", "political"]
          }, {
            "long_name": "Santa Catarina",
            "short_name": "SC",
            "types": ["administrative_area_level_1", "political"]
          }, {
            "long_name": "Brasil",
            "short_name": "BR",
            "types": ["country", "political"]
          }, { "long_name": "88061-600", "short_name": "88061-600", "types": ["postal_code"] }],
          "formatted_address": "Servidão dos Coroas, 50 - Barra da Lagoa, Florianópolis - SC, 88061-600, Brasil",
          "geometry": {
            "location": { "lat": -27.5870329, "lng": -48.43698029999999 },
            "location_type": "ROOFTOP",
            "viewport": {
              "northeast": { "lat": -27.5856839197085, "lng": -48.4356313197085 },
              "southwest": { "lat": -27.5883818802915, "lng": -48.43832928029149 }
            }
          },
          "place_id": "ChIJWd8jwfU-J5URU3Y4r_RumJY",
          "plus_code": {
            "compound_code": "CH77+56 Barra da Lagoa, Florianópolis - SC, Brasil",
            "global_code": "584HCH77+56"
          },
          "types": ["establishment", "lodging", "point_of_interest"]
        }, {
          "address_components": [{
            "long_name": "50",
            "short_name": "50",
            "types": ["street_number"]
          }, {
            "long_name": "Servidão dos Coroas",
            "short_name": "Servidão dos Coroas",
            "types": ["route"]
          }, {
            "long_name": "Barra da Lagoa",
            "short_name": "Barra da Lagoa",
            "types": ["political", "sublocality", "sublocality_level_1"]
          }, {
            "long_name": "Florianópolis",
            "short_name": "Florianópolis",
            "types": ["administrative_area_level_2", "political"]
          }, {
            "long_name": "Santa Catarina",
            "short_name": "SC",
            "types": ["administrative_area_level_1", "political"]
          }, {
            "long_name": "Brasil",
            "short_name": "BR",
            "types": ["country", "political"]
          }, { "long_name": "88061-600", "short_name": "88061-600", "types": ["postal_code"] }],
          "formatted_address": "Servidão dos Coroas, 50 - Barra da Lagoa, Florianópolis - SC, 88061-600, Brasil",
          "geometry": {
            "bounds": {
              "northeast": { "lat": -27.5869676, "lng": -48.4369396 },
              "southwest": { "lat": -27.5870839, "lng": -48.4370632 }
            },
            "location": { "lat": -27.5870329, "lng": -48.43698029999999 },
            "location_type": "ROOFTOP",
            "viewport": {
              "northeast": { "lat": -27.5856767697085, "lng": -48.4356524197085 },
              "southwest": { "lat": -27.5883747302915, "lng": -48.4383503802915 }
            }
          },
          "place_id": "ChIJraN6uF8-J5UR1NdLBmwOmI4",
          "types": ["premise"]
        }, {
          "address_components": [{
            "long_name": "606",
            "short_name": "606",
            "types": ["street_number"]
          }, {
            "long_name": "Servidão dos Coroas",
            "short_name": "Servidão dos Coroas",
            "types": ["route"]
          }, {
            "long_name": "Barra da Lagoa",
            "short_name": "Barra da Lagoa",
            "types": ["political", "sublocality", "sublocality_level_1"]
          }, {
            "long_name": "Florianópolis",
            "short_name": "Florianópolis",
            "types": ["administrative_area_level_2", "political"]
          }, {
            "long_name": "Santa Catarina",
            "short_name": "SC",
            "types": ["administrative_area_level_1", "political"]
          }, {
            "long_name": "Brasil",
            "short_name": "BR",
            "types": ["country", "political"]
          }, { "long_name": "88061-600", "short_name": "88061-600", "types": ["postal_code"] }],
          "formatted_address": "Servidão dos Coroas, 606 - Barra da Lagoa, Florianópolis - SC, 88061-600, Brasil",
          "geometry": {
            "location": { "lat": -27.587071, "lng": -48.436858 },
            "location_type": "ROOFTOP",
            "viewport": {
              "northeast": { "lat": -27.58572201970849, "lng": -48.4355090197085 },
              "southwest": { "lat": -27.5884199802915, "lng": -48.4382069802915 }
            }
          },
          "place_id": "ChIJhQ1xyF8-J5URCMuKnMjPqNs",
          "plus_code": {
            "compound_code": "CH77+57 Barra da Lagoa, Florianópolis - SC, Brasil",
            "global_code": "584HCH77+57"
          },
          "types": ["street_address"]
        }, {
          "address_components": [{
            "long_name": "Rodovia Jornalista Manoel de Menezes",
            "short_name": "Rodovia Jornalista Manoel de Menezes",
            "types": ["establishment", "point_of_interest", "transit_station"]
          }, {
            "long_name": "Barra da Lagoa",
            "short_name": "Barra da Lagoa",
            "types": ["political", "sublocality", "sublocality_level_1"]
          }, {
            "long_name": "Florianópolis",
            "short_name": "Florianópolis",
            "types": ["administrative_area_level_2", "political"]
          }, {
            "long_name": "Santa Catarina",
            "short_name": "SC",
            "types": ["administrative_area_level_1", "political"]
          }, {
            "long_name": "Brasil",
            "short_name": "BR",
            "types": ["country", "political"]
          }, { "long_name": "88061-600", "short_name": "88061-600", "types": ["postal_code"] }],
          "formatted_address": "Rodovia Jornalista Manoel de Menezes - Barra da Lagoa, Florianópolis - SC, 88061-600, Brasil",
          "geometry": {
            "location": { "lat": -27.587043, "lng": -48.436577 },
            "location_type": "GEOMETRIC_CENTER",
            "viewport": {
              "northeast": { "lat": -27.58569401970849, "lng": -48.4352280197085 },
              "southwest": { "lat": -27.5883919802915, "lng": -48.4379259802915 }
            }
          },
          "place_id": "ChIJG-t9yV8-J5URlvChY_QP_xs",
          "plus_code": {
            "compound_code": "CH77+59 Barra da Lagoa, Florianópolis - SC, Brasil",
            "global_code": "584HCH77+59"
          },
          "types": ["establishment", "point_of_interest", "transit_station"]
        }, {
          "address_components": [{
            "long_name": "52",
            "short_name": "52",
            "types": ["street_number"]
          }, {
            "long_name": "Servidão dos Coroas",
            "short_name": "Servidão dos Coroas",
            "types": ["route"]
          }, {
            "long_name": "Barra da Lagoa",
            "short_name": "Barra da Lagoa",
            "types": ["political", "sublocality", "sublocality_level_1"]
          }, {
            "long_name": "Florianópolis",
            "short_name": "Florianópolis",
            "types": ["administrative_area_level_2", "political"]
          }, {
            "long_name": "Santa Catarina",
            "short_name": "SC",
            "types": ["administrative_area_level_1", "political"]
          }, {
            "long_name": "Brasil",
            "short_name": "BR",
            "types": ["country", "political"]
          }, { "long_name": "88061-600", "short_name": "88061-600", "types": ["postal_code"] }],
          "formatted_address": "Servidão dos Coroas, 52 - Barra da Lagoa, Florianópolis - SC, 88061-600, Brasil",
          "geometry": {
            "location": { "lat": -27.5870853, "lng": -48.4370179 },
            "location_type": "RANGE_INTERPOLATED",
            "viewport": {
              "northeast": { "lat": -27.5857363197085, "lng": -48.4356689197085 },
              "southwest": { "lat": -27.5884342802915, "lng": -48.4383668802915 }
            }
          },
          "place_id": "EkZTZXJ2aWTDo28gZG9zIENvcm9hcywgNTIgLSBCYXJyYSBkYSBMYWdvYSwgRmxvcmlhbsOzcG9saXMgLSBTQywgQnJhemlsIhoSGAoUChIJIyCKyF8-J5URM-FTrDPHw7kQNA",
          "types": ["street_address"]
        }, {
          "address_components": [{
            "long_name": "65-41",
            "short_name": "65-41",
            "types": ["street_number"]
          }, {
            "long_name": "Servidão dos Coroas",
            "short_name": "Servidão dos Coroas",
            "types": ["route"]
          }, {
            "long_name": "Barra da Lagoa",
            "short_name": "Barra da Lagoa",
            "types": ["political", "sublocality", "sublocality_level_1"]
          }, {
            "long_name": "Florianópolis",
            "short_name": "Florianópolis",
            "types": ["administrative_area_level_2", "political"]
          }, {
            "long_name": "Santa Catarina",
            "short_name": "SC",
            "types": ["administrative_area_level_1", "political"]
          }, {
            "long_name": "Brasil",
            "short_name": "BR",
            "types": ["country", "political"]
          }, { "long_name": "88061-600", "short_name": "88061-600", "types": ["postal_code"] }],
          "formatted_address": "Servidão dos Coroas, 65-41 - Barra da Lagoa, Florianópolis - SC, 88061-600, Brasil",
          "geometry": {
            "bounds": {
              "northeast": { "lat": -27.5870517, "lng": -48.4364887 },
              "southwest": { "lat": -27.587209, "lng": -48.437162 }
            },
            "location": { "lat": -27.5871303, "lng": -48.4368253 },
            "location_type": "GEOMETRIC_CENTER",
            "viewport": {
              "northeast": { "lat": -27.5857813697085, "lng": -48.4354763697085 },
              "southwest": { "lat": -27.5884793302915, "lng": -48.4381743302915 }
            }
          },
          "place_id": "ChIJIyCKyF8-J5URMuFTrDPHw7k",
          "types": ["route"]
        }, {
          "address_components": [{
            "long_name": "88061-600",
            "short_name": "88061-600",
            "types": ["postal_code"]
          }, {
            "long_name": "Barra da Lagoa",
            "short_name": "Barra da Lagoa",
            "types": ["political", "sublocality", "sublocality_level_1"]
          }, {
            "long_name": "Florianópolis",
            "short_name": "Florianópolis",
            "types": ["administrative_area_level_2", "political"]
          }, {
            "long_name": "Santa Catarina",
            "short_name": "SC",
            "types": ["administrative_area_level_1", "political"]
          }, { "long_name": "Brasil", "short_name": "BR", "types": ["country", "political"] }],
          "formatted_address": "Barra da Lagoa, Florianópolis - SC, 88061-600, Brasil",
          "geometry": {
            "bounds": {
              "northeast": { "lat": -27.5819014, "lng": -48.43633699999999 },
              "southwest": { "lat": -27.587613, "lng": -48.4422131 }
            },
            "location": { "lat": -27.5857064, "lng": -48.4398241 },
            "location_type": "APPROXIMATE",
            "viewport": {
              "northeast": { "lat": -27.5819014, "lng": -48.43633699999999 },
              "southwest": { "lat": -27.587613, "lng": -48.4422131 }
            }
          },
          "place_id": "ChIJ4e9mx18-J5URQYRs6AAixE8",
          "types": ["postal_code"]
        }, {
          "address_components": [{
            "long_name": "Barra da Lagoa",
            "short_name": "Barra da Lagoa",
            "types": ["political", "sublocality", "sublocality_level_1"]
          }, {
            "long_name": "Florianópolis",
            "short_name": "Florianópolis",
            "types": ["administrative_area_level_2", "political"]
          }, {
            "long_name": "Santa Catarina",
            "short_name": "SC",
            "types": ["administrative_area_level_1", "political"]
          }, { "long_name": "Brasil", "short_name": "BR", "types": ["country", "political"] }],
          "formatted_address": "Barra da Lagoa, Florianópolis - SC, Brasil",
          "geometry": {
            "bounds": {
              "northeast": { "lat": -27.5683061, "lng": -48.42200130000001 },
              "southwest": { "lat": -27.5895742, "lng": -48.4430063 }
            },
            "location": { "lat": -27.5740887, "lng": -48.4312669 },
            "location_type": "APPROXIMATE",
            "viewport": {
              "northeast": { "lat": -27.5683061, "lng": -48.42200130000001 },
              "southwest": { "lat": -27.5895742, "lng": -48.4430063 }
            }
          },
          "place_id": "ChIJ8TBFCls-J5URaDfbwPh_aIQ",
          "types": ["political", "sublocality", "sublocality_level_1"]
        }, {
          "address_components": [{
            "long_name": "88061",
            "short_name": "88061",
            "types": ["postal_code", "postal_code_prefix"]
          }, {
            "long_name": "Barra da Lagoa",
            "short_name": "Barra da Lagoa",
            "types": ["political", "sublocality", "sublocality_level_1"]
          }, {
            "long_name": "Florianópolis",
            "short_name": "Florianópolis",
            "types": ["administrative_area_level_2", "political"]
          }, {
            "long_name": "Santa Catarina",
            "short_name": "SC",
            "types": ["administrative_area_level_1", "political"]
          }, { "long_name": "Brasil", "short_name": "BR", "types": ["country", "political"] }],
          "formatted_address": "Barra da Lagoa, Florianópolis - SC, 88061, Brasil",
          "geometry": {
            "bounds": {
              "northeast": { "lat": -27.568303, "lng": -48.4217678 },
              "southwest": { "lat": -27.5903979, "lng": -48.4434981 }
            },
            "location": { "lat": -27.57891, "lng": -48.4312669 },
            "location_type": "APPROXIMATE",
            "viewport": {
              "northeast": { "lat": -27.568303, "lng": -48.4217678 },
              "southwest": { "lat": -27.5903979, "lng": -48.4434981 }
            }
          },
          "place_id": "ChIJd1UjNVo-J5UR_fDl0OLwJkI",
          "types": ["postal_code", "postal_code_prefix"]
        }, {
          "address_components": [{
            "long_name": "Florianópolis",
            "short_name": "Florianópolis",
            "types": ["administrative_area_level_2", "political"]
          }, {
            "long_name": "Santa Catarina",
            "short_name": "SC",
            "types": ["administrative_area_level_1", "political"]
          }, { "long_name": "Brasil", "short_name": "BR", "types": ["country", "political"] }],
          "formatted_address": "Florianópolis - SC, Brasil",
          "geometry": {
            "bounds": {
              "northeast": { "lat": -27.382992, "lng": -48.3587861 },
              "southwest": { "lat": -27.8493578, "lng": -48.6065648 }
            },
            "location": { "lat": -27.5948698, "lng": -48.54821949999999 },
            "location_type": "APPROXIMATE",
            "viewport": {
              "northeast": { "lat": -27.382992, "lng": -48.3587861 },
              "southwest": { "lat": -27.8493578, "lng": -48.6065648 }
            }
          },
          "place_id": "ChIJn7h-4b9JJ5URGCq6n0zj1tM",
          "types": ["administrative_area_level_2", "political"]
        }, {
          "address_components": [{
            "long_name": "Florianópolis",
            "short_name": "Florianópolis",
            "types": ["locality", "political"]
          }, {
            "long_name": "Florianópolis",
            "short_name": "Florianópolis",
            "types": ["administrative_area_level_2", "political"]
          }, {
            "long_name": "Santa Catarina",
            "short_name": "SC",
            "types": ["administrative_area_level_1", "political"]
          }, { "long_name": "Brasil", "short_name": "BR", "types": ["country", "political"] }],
          "formatted_address": "Florianópolis, SC, Brasil",
          "geometry": {
            "bounds": {
              "northeast": { "lat": -27.2512747, "lng": -48.3270908 },
              "southwest": { "lat": -27.8919162, "lng": -48.6134675 }
            },
            "location": { "lat": -27.5986393, "lng": -48.5187229 },
            "location_type": "APPROXIMATE",
            "viewport": {
              "northeast": { "lat": -27.2512747, "lng": -48.3270908 },
              "southwest": { "lat": -27.8919162, "lng": -48.6134675 }
            }
          },
          "place_id": "ChIJ1zLGsk45J5URRscEagtVvIE",
          "types": ["locality", "political"]
        }, {
          "address_components": [{
            "long_name": "Santa Catarina",
            "short_name": "SC",
            "types": ["administrative_area_level_1", "political"]
          }, { "long_name": "Brasil", "short_name": "BR", "types": ["country", "political"] }],
          "formatted_address": "Santa Catarina, Brasil",
          "geometry": {
            "bounds": {
              "northeast": { "lat": -25.9559588, "lng": -48.329359 },
              "southwest": { "lat": -29.351441, "lng": -53.83635870000001 }
            },
            "location": { "lat": -27.2423392, "lng": -50.2188556 },
            "location_type": "APPROXIMATE",
            "viewport": {
              "northeast": { "lat": -25.9559588, "lng": -48.329359 },
              "southwest": { "lat": -29.351441, "lng": -53.83635870000001 }
            }
          },
          "place_id": "ChIJ-f9SwCVN2ZQRK6t_7YB1Jys",
          "types": ["administrative_area_level_1", "political"]
        }, {
          "address_components": [{ "long_name": "Brasil", "short_name": "BR", "types": ["country", "political"] }],
          "formatted_address": "Brasil",
          "geometry": {
            "bounds": {
              "northeast": { "lat": 5.2717863, "lng": -28.650543 },
              "southwest": { "lat": -34.0891, "lng": -73.9828169 }
            },
            "location": { "lat": -14.235004, "lng": -51.92528 },
            "location_type": "APPROXIMATE",
            "viewport": {
              "northeast": { "lat": 5.2717863, "lng": -28.650543 },
              "southwest": { "lat": -34.0891, "lng": -73.9828169 }
            }
          },
          "place_id": "ChIJzyjM68dZnAARYz4p8gYVWik",
          "types": ["country", "political"]
        }, {
          "address_components": [{
            "long_name": "CH77+55",
            "short_name": "CH77+55",
            "types": ["plus_code"]
          }, {
            "long_name": "Barra da Lagoa",
            "short_name": "Barra da Lagoa",
            "types": ["political", "sublocality", "sublocality_level_1"]
          }, {
            "long_name": "Florianópolis",
            "short_name": "Florianópolis",
            "types": ["administrative_area_level_2", "political"]
          }, {
            "long_name": "Santa Catarina",
            "short_name": "SC",
            "types": ["administrative_area_level_1", "political"]
          }, { "long_name": "Brasil", "short_name": "BR", "types": ["country", "political"] }],
          "formatted_address": "CH77+55 Barra da Lagoa, Florianópolis - SC, Brasil",
          "geometry": {
            "bounds": {
              "northeast": { "lat": -27.587, "lng": -48.437 },
              "southwest": { "lat": -27.587125, "lng": -48.43712499999999 }
            },
            "location": { "lat": -27.587, "lng": -48.437 },
            "location_type": "ROOFTOP",
            "viewport": {
              "northeast": { "lat": -27.5857135197085, "lng": -48.4357135197085 },
              "southwest": { "lat": -27.58841148029151, "lng": -48.43841148029149 }
            }
          },
          "place_id": "GhIJg8DKoUWWO8ARDi2yne83SMA",
          "plus_code": {
            "compound_code": "CH77+55 Barra da Lagoa, Florianópolis - SC, Brasil",
            "global_code": "584HCH77+55"
          },
          "types": ["plus_code"]
        }], "status": "OK"
      }
    }
  },
  components: { Header },
  created() {
    this.getTime()
    if (localStorage.getItem('weatherFiltered') != null) {
      this.testingWeather = JSON.parse(localStorage.getItem('weatherFiltered'));
    }
  },
  methods: {
    getLocation() {
      navigator.geolocation.getCurrentPosition(
          position => {
            this.latitude = this.roundCoordinates(position.coords.latitude)
            this.longitude = this.roundCoordinates(position.coords.longitude)
            this.reverseGeocoding(this.latitude, this.longitude)
          },
          error => {
            console.log(error.message);
          }
      );
    },
    roundCoordinates(coordinate) {
      let split = coordinate.toString().split('.')
      return split[0] + '.' + split[1].toString().substring(0, 3)
    },
    reverseGeocoding(lat, long) {
      fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
          lat + "," + long + "&key=[REDACTED]")
          .then(response => response.json()
              .then(json => {
                this.geocodingResponse = json
                this.address = json.plus_code.compound_code
                this.weatherOneCallAPI(lat, long)
              }).catch(error => {
                console.error('Failed retrieving information', error);
              })
          )
    },
    weatherOneCallAPI(lat, long) {
      fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" +
          lat + "&lon=" + long + "&exclude=current,minutely,daily,alerts&units=metric" + "&appid=99a93a4390907ebb53ea070c0768ecc0")
          .then(response => response.json()
              .then(json => {
                this.filterWeather(json)
              }).catch(error => {
                console.error('Failed retrieving information', error);
              })
          )
    },
    getTime() {
      this.hours = new Date().getHours()
    },
    filterWeather(weather) {
      let initial = this.hours
      let end = this.hours + 6
      this.weatherFiltered.push(weather.hourly.slice(initial, end))
      localStorage.setItem('weatherFiltered', JSON.stringify(this.weatherFiltered));
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
