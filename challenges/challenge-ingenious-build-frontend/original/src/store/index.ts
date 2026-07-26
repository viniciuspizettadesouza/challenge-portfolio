import { createStore } from "vuex";
import contextBusLines from "@/store/modules/contextBusLines";
import contextBusStops from "@/store/modules/contextBusStops";

const store = createStore({
  modules: {
    contextBusLines,
    contextBusStops,
  },
});

export default store;
