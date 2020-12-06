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
          <caption v-if="testingWeather" class="text-center">{{ testingWeather[0][0].weather[0].main }} currently in Florianópolis. The temperature is
            {{ Math.round(testingWeather[0][0].temp) }} C.
          </caption>
          <caption v-else class="text-center">
          </caption>
          <b-thead>
            <b-tr>
              <b-th></b-th>
              <b-th v-for="count in nextHours" v-bind:key="count">
                <span v-if="count===0">Now</span>
                <span v-else>{{ hours + count }}</span>
              </b-th>
            </b-tr>
          </b-thead>
          <template v-if="testingWeather">
            <b-tbody v-for="(value, index) in testingWeather" v-bind:key="index">
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
      nextHours: [0, 1, 2, 3, 4, 5],
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
