<template>
  <div class="container">
    <div class="title">Timetable</div>

    <div class="menu">
      <div
        v-for="(item, index) in menuItems"
        :key="index"
        :class="{ 'menu-item': true, selected: index === selectedItem }"
        @click="selectItem(index)"
      >
        {{ item }}
      </div>
    </div>

    <div class="bus-lines">
      <div class="bus-lines-title">Select Bus Line</div>
      <div class="bus-lines-container">
        <div
          v-for="(stop, index) in groupedStopsByLineKeys"
          :key="index"
          class="bus-lines-item"
          @click="selectBusLine(stop)"
        >
          {{ stop }}
        </div>
      </div>
    </div>

    <div class="selection-container">
      <div class="selection-area">
        <div class="bus-lines-container">
          <div v-if="busLineStops !== null" class="selected-stops">
            <div
              v-for="stop in busLineStopsKeys"
              :key="stop"
              @click="selectBusStop(stop)"
            >
              {{ stop }}
            </div>
          </div>
        </div>
      </div>

      <div class="selection-area">
        <div class="bus-stops-container" v-if="sortedBusLineStops">
          <div class="title">Title</div>
          <div class="subtitle">Time</div>
          <div
            v-for="(stop, index) in sortedBusLineStops"
            :key="index"
            class="time"
          >
            {{ stop.time }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const stops = computed(() => store.getters.getStops);
    const groupedStopsByLineKeys = computed(
      () => store.getters.getGroupedStopsByLineKeys
    );
    const busLineStopsKeys = computed(() => store.getters.getBusLineStopsKeys);
    const selectedBusLineStop = computed(
      () => store.getters.getSelectedBusLineStop
    );
    const sortedBusLineStops = computed(
      () => store.getters.getSortedBusLineStops
    );

    const menuItems = ref(["Bus Lines", "Stops"]);
    const selectedItem = ref(0);
    const fetchedStops = ref([]);

    const selectItem = (index) => {
      selectedItem.value = index;
    };

    const selectBusLine = (stop) => {
      store.dispatch("selectBusLine", stops.value[stop]);
      console.log(selectedBusLineStop.value, stop);
      if (selectedBusLineStop.value !== stops.value[stop]) {
        store.dispatch("clearBusStop");
      }
    };

    const selectBusStop = (stop) => {
      store.dispatch("selectBusStop", stop);
    };

    onMounted(async () => {
      await store.dispatch("fetchStops");
      fetchedStops.value = store.state.stops;
    });

    return {
      menuItems,
      selectedItem,
      selectItem,
      fetchedStops,
      stops,
      groupedStopsByLineKeys,
      busLineStopsKeys,
      selectedBusLineStop,
      sortedBusLineStops,
      selectBusLine,
      selectBusStop,
    };
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap");

.container {
  font-family: Inter;
  padding: 40px 32px;

  .title {
    color: #1a1a1a;
    font-size: 24px;
    font-weight: 600;
    line-height: 32px;
    margin-bottom: 24px;
  }

  .menu {
    display: flex;
    align-items: center;
    background-color: white;
    border-radius: 4px;
    padding: 0px 24px;
    margin-bottom: 16px;

    .menu-item {
      display: flex;
      align-items: center;
      padding: 20px 24px;
      cursor: pointer;
      border-bottom: 2px solid transparent;
      transition: border-color 0.2s ease-in-out;
      color: #9a9da4;

      &:hover {
        border-color: #1952e1;
      }
    }

    .selected {
      border-color: #1952e1;
      color: #1a1a1a;
    }
  }
  .bus-lines {
    border-radius: 4px;
    background: #fff;
    margin-bottom: 16px;
    .bus-lines-title {
      display: flex;
      padding: 24px 24px 8px 24px;
      color: #1a1a1a;
      font-size: 14px;
      font-weight: 600;
      line-height: 24px;
    }

    .bus-lines-container {
      display: flex;
      flex-wrap: wrap;
      padding: 24px;
      gap: 8px;

      .bus-lines-item {
        border-radius: 4px;
        padding: 8px 16px;
        background: #1952e1;
        color: #fff;
        font-size: 12px;
        font-weight: 500;
        line-height: 16px;
      }
    }
    .bus-stops-container {
      .title {
        color: #1a1a1a;
        font-size: 14px;
        font-weight: 600;
        line-height: 24px;
      }
      .subtitle {
        color: #33373c;
        font-size: 12px;
        font-weight: 600;
        line-height: 16px;
      }
      .time {
        color: #33373c;
        font-size: 12px;
        font-weight: 400;
        line-height: 16px;
      }
    }
  }

  .selection-container {
    display: flex;
    gap: 8px;
    justify-content: space-between;

    .selection-area {
      width: 50%;
      border-radius: 4px;
      border: 2px dashed #9a9da4;
      background: #fff;
      color: #63666e;
      text-align: center;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px;
      min-height: 100px;
    }
  }
}
</style>
