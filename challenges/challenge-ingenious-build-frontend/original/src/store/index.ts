import { createStore } from "vuex";
import axios from "axios";
import { groupStopsByLine, groupStopsByStopName, parseTime } from "@/utils";
import { RootState } from "@/interfaces";

export default createStore({
  state: {
    stops: [],
    groupedStopsByLineKeys: [],
    busLineStops: null,
    busLineStopsKeys: null,
    selectedBusLineStop: null,
    sortedBusLineStops: null,
  } as RootState,

  getters: {
    getStops: (state) => state.stops,
    getGroupedStopsByLineKeys: (state) => state.groupedStopsByLineKeys,
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
    SET_BUS_LINE_STOPS: (state, stops) => {
      state.busLineStops = stops;
    },
    SET_BUS_LINE_STOPS_KEYS: (state, stops) => {
      state.busLineStopsKeys = stops;
    },
    SET_SELECTED_BUS_LINE_STOP: (state, stops) => {
      state.sortedBusLineStops = stops;
    },
    SET_SORTED_BUS_LINE_STOPS: (state, stops) => {
      state.sortedBusLineStops = stops;
    },
  },

  actions: {
    async fetchStops({ commit }) {
      try {
        const response = await axios.get("http://localhost:3000/stops");
        const groupedStopsByLine = groupStopsByLine(response.data);
        commit("SET_STOPS", groupedStopsByLine);
        commit(
          "SET_GROUPED_STOPS_BY_LINE_KEYS",
          Object.keys(groupedStopsByLine)
        );
      } catch (error) {
        console.error(error);
      }
    },
    selectBusLine: ({ commit }, stops) => {
      const busLineStops = groupStopsByStopName(stops);
      commit("SET_BUS_LINE_STOPS", busLineStops);
      commit("SET_BUS_LINE_STOPS_KEYS", Object.keys(busLineStops));
    },
    selectBusStop: ({ commit, state }, stop) => {
      console.log(stop, state.busLineStops);
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
    clearBusStop: ({ commit }) => {
      commit("SET_SELECTED_BUS_LINE_STOP", "");
    },
  },

  modules: {},
});
