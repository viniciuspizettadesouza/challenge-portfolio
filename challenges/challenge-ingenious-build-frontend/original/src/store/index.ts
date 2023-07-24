import { createStore } from "vuex";
import axios from "axios";
import { groupStopsByLine, groupStopsByStopName, parseTime } from "@/utils";
import { RootState } from "@/interfaces";

export default createStore({
  state: {
    stops: [],
    groupedStopsByLineKeys: [],
    selectedBusLine: null,
    busLineStops: null,
    busLineStopsKeys: null,
    selectedBusLineStop: null,
    sortedBusLineStops: null,
  } as RootState,

  getters: {
    getStops: (state) => state.stops,
    getGroupedStopsByLineKeys: (state) => state.groupedStopsByLineKeys,
    getSelectedBusLine: (state) => state.selectedBusLine,
    getBusLineStops: (state) => state.busLineStops,
    getBusLineStopsKeys: (state) => state.busLineStopsKeys,
    getSelectedBusLineStop: (state) => state.selectedBusLineStop,
    getSortedBusLineStops: (state) => state.sortedBusLineStops,
  },

  mutations: {
    SET_STOPS(state, stops) {
      state.stops = stops;
    },
    SET_GROUPED_STOPS_BY_LINE_KEYS(state, groupedStopsByLineKeys) {
      state.groupedStopsByLineKeys = groupedStopsByLineKeys;
    },
    SET_SELECTED_BUS_LINE: (state, stop) => {
      state.selectedBusLine = stop;
    },
    SET_BUS_LINE_STOPS: (state, stops) => {
      state.busLineStops = stops;
    },
    SET_BUS_LINE_STOPS_KEYS: (state, stops) => {
      state.busLineStopsKeys = stops;
    },
    SET_SELECTED_BUS_LINE_STOP: (state, stop) => {
      state.selectedBusLineStop = stop;
    },
    SET_SORTED_BUS_LINE_STOPS: (state, stops) => {
      state.sortedBusLineStops = stops;
    },
  },

  actions: {
    async fetchStops({ commit }) {
      return axios
        .get("http://localhost:3000/stops")
        .then((response) => {
          const groupedStopsByLine = groupStopsByLine(response.data);
          commit("SET_STOPS", groupedStopsByLine);
          commit(
            "SET_GROUPED_STOPS_BY_LINE_KEYS",
            Object.keys(groupedStopsByLine)
          );
        })
        .catch((error) => {
          console.error(error);
        });
    },
    selectBusLine: ({ commit, state }, stop) => {
      commit("SET_SELECTED_BUS_LINE", stop);
      const busLineStops = groupStopsByStopName(state.stops[stop]);
      commit("SET_BUS_LINE_STOPS", busLineStops);
      commit("SET_BUS_LINE_STOPS_KEYS", Object.keys(busLineStops));
    },
    selectBusStop: ({ commit, state }, stop) => {
      commit("SET_SELECTED_BUS_LINE_STOP", stop);

      if (state.busLineStops) {
        const selectedBusLineStops = state.busLineStops[stop];
        const sortedBusLineStops = selectedBusLineStops.slice().sort((a, b) => {
          const timeA = parseTime(a.time);
          const timeB = parseTime(b.time);
          return timeA.getTime() - timeB.getTime();
        });

        commit("SET_SORTED_BUS_LINE_STOPS", sortedBusLineStops);
      }
    },
  },

  modules: {},
});
