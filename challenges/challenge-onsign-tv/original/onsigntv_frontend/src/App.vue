<template>
  <div id="app">
    <div class="container">
      <b-row class="justify-content-md-center">
        <b-col cols="12" sm="4">OnSign TV</b-col>
        <b-col>Forecast</b-col>
        <b-col>About</b-col>
      </b-row>

      <div>
        <b-input-group>
          <b-input-group-text>
            <b-icon icon="cursor-fill"/>
          </b-input-group-text>
          <b-form-input></b-form-input>

          <template #append>
            <b-button variant="primary" @click="geocodingApi">
              <b-icon icon="search"/>
            </b-button>
          </template>
        </b-input-group>
        <p>Enter the city address, city name or zip code to get the weather forecast</p>
      </div>

      <div>
        <b-table-simple small caption-top responsive>
          <caption>Light rain currently in Florianópolis. The temperature is 23C.</caption>
          <b-thead>
            <b-tr>
              <b-th></b-th>
              <b-th>Now</b-th>
              <b-th>Now + 1</b-th>
              <b-th>Now + 2</b-th>
              <!--              <b-th>Now + 3</b-th>-->
              <!--              <b-th>Now + 4</b-th>-->
              <!--              <b-th>Now + 5</b-th>-->
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr v-for="condition in weather" v-bind:key="condition.id">
              <b-th>{{ condition.row.title }}</b-th>
              <b-td>{{ condition.row.a }}</b-td>
              <b-td>{{ condition.row.b }}</b-td>
              <b-td>{{ condition.row.c }}</b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </div>

      <div style="margin-top: 20px">
        {{ geocodingResponse }}
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      geocodingResponse: null,
      weather: [
        {
          id: '1',
          row: {
            title: 'Condition',
            a: 'rain',
            b: 'rain',
            c: 'rain'
          }
        },
        {
          id: '2',
          row: {
            title: 'Temp',
            a: 24,
            b: 25,
            c: 26
          }
        }
      ],
      geocodingMock: {
        "results": [
          {
            "address_components": [
              {
                "long_name": "1600",
                "short_name": "1600",
                "types": ["street_number"]
              },
              {
                "long_name": "Amphitheatre Parkway",
                "short_name": "Amphitheatre Pkwy",
                "types": ["route"]
              },
              {
                "long_name": "Mountain View",
                "short_name": "Mountain View",
                "types": ["locality", "political"]
              },
              {
                "long_name": "Santa Clara County",
                "short_name": "Santa Clara County",
                "types": ["administrative_area_level_2", "political"]
              },
              {
                "long_name": "California",
                "short_name": "CA",
                "types": ["administrative_area_level_1", "political"]
              },
              {
                "long_name": "United States",
                "short_name": "US",
                "types": ["country", "political"]
              },
              {
                "long_name": "94043",
                "short_name": "94043",
                "types": ["postal_code"]
              }
            ],
            "formatted_address": "1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA",
            "geometry": {
              "location": {
                "lat": 37.4267861,
                "lng": -122.0806032
              },
              "location_type": "ROOFTOP",
              "viewport": {
                "northeast": {
                  "lat": 37.4281350802915,
                  "lng": -122.0792542197085
                },
                "southwest": {
                  "lat": 37.4254371197085,
                  "lng": -122.0819521802915
                }
              }
            },
            "place_id": "ChIJtYuu0V25j4ARwu5e4wwRYgE",
            "plus_code": {
              "compound_code": "CWC8+R3 Mountain View, California, United States",
              "global_code": "849VCWC8+R3"
            },
            "types": ["street_address"]
          }
        ],
        "status": "OK"
      }
    }
  },
  components: {},
  methods: {
    geocodingApi() {
      this.geocodingResponse = this.geocodingMock
    }
  }
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
