<template>
  <div id="app">
    <div class="container">
      <Header/>

      <div>
        <b-input-group>
          <b-input-group-text>
            <b-icon icon="cursor-fill"/>
          </b-input-group-text>
          <b-form-input v-if="geocodeResponse" v-model="geocodeResponse.formatted_address"></b-form-input>
          <b-form-input v-else v-model="geocodeCache.formatted_address"></b-form-input>

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
          <caption v-if="weatherCache" class="text-center">{{ weatherCache[0][0].weather[0].main }} currently in
            {{ address }}. The temperature is
            {{ Math.round(weatherCache[0][0].temp) }} C.
          </caption>
          <caption v-else class="text-center">
          </caption>
          <b-thead>
            <b-tr>
              <b-th></b-th>
              <b-th v-for="item in hours" v-bind:key="item">
                <span>{{ item }}</span>
              </b-th>
            </b-tr>
          </b-thead>
          <template v-if="weatherCache !== null">
            <b-tbody v-for="(value, index) in weatherCache" v-bind:key="index">
              <b-tr>
                <b-th>Condition</b-th>
                <b-td v-for="count in nextHours" v-bind:key="count">
                  {{ value[count].weather[index].main }}
                </b-td>
              </b-tr>
              <b-tr>
                <b-th>Temp</b-th>
                <b-td v-for="count in nextHours" v-bind:key="count">
                  {{ Math.round(value[count].temp) }} C
                </b-td>
              </b-tr>
              <b-tr>
                <b-th>Feels Like</b-th>
                <b-td v-for="count in nextHours" v-bind:key="count">
                  {{ Math.round(value[count].feels_like) }} C
                </b-td>
              </b-tr>
              <b-tr>
                <b-th>Humidity</b-th>
                <b-td v-for="count in nextHours" v-bind:key="count">
                  {{ value[count].humidity }}%
                </b-td>
              </b-tr>
            </b-tbody>
          </template>
          <template v-else>
            <b-tbody v-for="(value, index) in weatherResponse" v-bind:key="index">
              <b-tr>
                <b-th>Condition</b-th>
                <b-td v-for="count in nextHours" v-bind:key="count">
                  {{ value[count].weather[index].main }}
                </b-td>
              </b-tr>
              <b-tr>
                <b-th>Temp</b-th>
                <b-td v-for="count in nextHours" v-bind:key="count">
                  {{ Math.round(value[count].temp) }} C
                </b-td>
              </b-tr>
              <b-tr>
                <b-th>Feels Like</b-th>
                <b-td v-for="count in nextHours" v-bind:key="count">
                  {{ Math.round(value[count].feels_like) }} C
                </b-td>
              </b-tr>
              <b-tr>
                <b-th>Humidity</b-th>
                <b-td v-for="count in nextHours" v-bind:key="count">
                  {{ value[count].humidity }}%
                </b-td>
              </b-tr>
            </b-tbody>
          </template>
        </b-table-simple>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header"

export default {
  name: 'App',
  data() {
    return {
      nextHours: [0, 1, 2, 3, 4, 5],
      weatherResponse: [],
      latitude: null,
      longitude: null,
      weatherCache: null,
      geocodeResponse: null,
      geocodeCache: null,
      address: null,
      hours: null
    }
  },
  components: { Header },
  created() {
    this.getTime()
    this.getGeocode()
    this.getWeather()
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
            console.log(error.message)
          }
      )
    },
    getTime() {
      let hours = new Date().getHours()
      let nextHours = this.nextHours

      this.hours = nextHours.map(function (num) {
        if (num===0) {
          return 'Now'
        }
        let hour = hours + num
        if (hour <= 24) {
          return hour
        }
        return hour - 24;
      })
    },
    getGeocode() {
      if (localStorage.getItem('geocodeCache') != null) {
        this.geocodeCache = JSON.parse(localStorage.getItem('geocodeCache'))
      }
    },
    getWeather() {
      if (localStorage.getItem('weatherCache') != null) {
        this.weatherCache = JSON.parse(localStorage.getItem('weatherCache'))
      }
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
                this.geocodeResponse = json.results[0]
                localStorage.setItem('geocodeCache', JSON.stringify(this.geocodeResponse))
                this.weatherOneCallAPI(lat, long)
              }).catch(error => {
                console.error('Failed retrieving information', error)
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
                console.error('Failed retrieving information', error)
              })
          )
    },
    filterWeather(weather) {
      let initial = this.hours
      let end = this.hours + 6
      this.weatherResponse.push(weather.hourly.slice(initial, end))
      localStorage.setItem('weatherCache', JSON.stringify(this.weatherResponse))
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
