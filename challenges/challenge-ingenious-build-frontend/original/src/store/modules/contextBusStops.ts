import axios from "axios";
import { Commit } from "vuex";
import { getUniqueStopNames } from "@/utils";
import { RootStateBusStops, Stop } from "@/interfaces";

const contextBusStops = {
  state: {
    uniqueBusStops: [],
  } as RootStateBusStops,

  getters: {
    getUniqueStops: (state: RootStateBusStops) => state.uniqueBusStops,
  },

  mutations: {
    SET_UNIQUE_STOPS(state: RootStateBusStops, stops: Stop[]) {
      state.uniqueBusStops = stops;
    },
  },

  actions: {
    async fetchBusStops({ commit }: { commit: Commit }) {
      return axios
        .get("http://localhost:3000/stops")
        .then((response) => {
          const uniqueStopNames = getUniqueStopNames(response.data);
          commit("SET_UNIQUE_STOPS", uniqueStopNames);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },

  modules: {},
};

export default contextBusStops;
