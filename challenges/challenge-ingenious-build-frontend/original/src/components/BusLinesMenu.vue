<template>
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
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const selectedBusLineStop = computed(
  () => store.getters.getSelectedBusLineStop
);
const stops = computed(() => store.getters.getStops);
const groupedStopsByLineKeys = computed(
  () => store.getters.getGroupedStopsByLineKeys
);

const selectBusLine = (stop) => {
  store.dispatch("selectBusLine", stops.value[stop]);
  console.log(selectedBusLineStop.value, stop);
  if (selectedBusLineStop.value !== stops.value[stop]) {
    store.dispatch("clearBusStop");
  }
};
</script>

<style lang="scss" scoped>
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
</style>
