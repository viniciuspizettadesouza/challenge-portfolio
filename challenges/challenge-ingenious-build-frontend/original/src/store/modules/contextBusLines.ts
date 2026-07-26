import axios from "axios";
import { groupStopsByLine, groupStopsByStopName, parseTime } from "@/utils";
import { Stop, RootStateBusLines, GroupedStops } from "@/interfaces";
import { Commit } from "vuex";

const contextBusLines = {
  state: {
    stops: [],
    groupedStopsByLineKeys: [],
    selectedBusLine: null,
    busLineStops: null,
    busLineStopsKeys: null,
    selectedBusLineStop: null,
    sortedBusLineStops: null,
  } as RootStateBusLines,

  getters: {
    getStops: (state: RootStateBusLines) => state.stops,
    getGroupedStopsByLineKeys: (state: RootStateBusLines) =>
      state.groupedStopsByLineKeys,
    getSelectedBusLine: (state: RootStateBusLines) => state.selectedBusLine,
    getBusLineStops: (state: RootStateBusLines) => state.busLineStops,
    getBusLineStopsKeys: (state: RootStateBusLines) => state.busLineStopsKeys,
    getSelectedBusLineStop: (state: RootStateBusLines) =>
      state.selectedBusLineStop,
    getSortedBusLineStops: (state: RootStateBusLines) =>
      state.sortedBusLineStops,
  },

  mutations: {
    SET_STOPS(state: RootStateBusLines, stops: Stop[]) {
      state.stops = stops;
    },
    SET_GROUPED_STOPS_BY_LINE_KEYS(
      state: RootStateBusLines,
      groupedStopsByLineKeys: string[]
    ) {
      state.groupedStopsByLineKeys = groupedStopsByLineKeys;
    },
    SET_SELECTED_BUS_LINE: (state: RootStateBusLines, stop: string) => {
      state.selectedBusLine = stop;
    },
    SET_BUS_LINE_STOPS: (
      state: RootStateBusLines,
      stops: GroupedStops | null
    ) => {
      state.busLineStops = stops;
    },
    SET_BUS_LINE_STOPS_KEYS: (
      state: RootStateBusLines,
      stops: string[] | null
    ) => {
      state.busLineStopsKeys = stops;
    },
    SET_SELECTED_BUS_LINE_STOP: (state: RootStateBusLines, stop: null) => {
      state.selectedBusLineStop = stop;
    },
    SET_SORTED_BUS_LINE_STOPS: (
      state: RootStateBusLines,
      stops: Stop[] | null
    ) => {
      state.sortedBusLineStops = stops;
    },
  },

  actions: {
    async fetchStops({ commit }: { commit: Commit }) {
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
    selectBusLine: (
      { commit, state }: { commit: Commit; state: RootStateBusLines },
      stop: string | number
    ) => {
      const stopIndex = stop as number;
      commit("SET_SELECTED_BUS_LINE", stop);
      const busLineStops = groupStopsByStopName(state.stops[stopIndex]);
      commit("SET_BUS_LINE_STOPS", busLineStops);
      commit("SET_BUS_LINE_STOPS_KEYS", Object.keys(busLineStops));
    },
    selectBusStop: (
      { commit, state }: { commit: Commit; state: RootStateBusLines },
      stop: string | number
    ) => {
      commit("SET_SELECTED_BUS_LINE_STOP", stop);

      if (state.busLineStops) {
        const selectedBusLineStops = state.busLineStops[stop];
        const sortedBusLineStops = selectedBusLineStops
          .slice()
          .sort((a: { time: string }, b: { time: string }) => {
            const timeA = parseTime(a.time);
            const timeB = parseTime(b.time);
            return timeA.getTime() - timeB.getTime();
          });

        commit("SET_SORTED_BUS_LINE_STOPS", sortedBusLineStops);
      }
    },
  },

  modules: {},
};

export default contextBusLines;
