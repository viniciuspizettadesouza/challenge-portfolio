<template>
  <div class="selection-container">
    <span class="selection-area-empty" v-if="!busLineStopsKeys">
      Please select the bus line first
    </span>
    <div v-else class="selection-area">
      <div class="bus-lines-container">
        <div class="title">Bus Line: {{ selectedBusLine }}</div>
        <div class="subtitle">Bus Stops</div>
        <div
          v-for="stop in busLineStopsKeys"
          :key="stop"
          @click="selectBusStop(stop)"
          :class="{
            content: true,
            selected: selectedBusLineStop === stop,
          }"
        >
          {{ stop }}
        </div>
      </div>
    </div>

    <span class="selection-area-empty" v-if="!sortedBusLineStops">
      Please select the bus line first
    </span>
    <div v-else class="selection-area">
      <div class="bus-lines-container">
        <div class="title">Bus Stop: {{ selectedBusLineStop }}</div>
        <div class="subtitle">Time</div>
        <div
          v-for="(stop, index) in sortedBusLineStops"
          :key="index"
          class="content bus-stop"
        >
          {{ stop.time }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const busLineStopsKeys = computed(() => store.getters.getBusLineStopsKeys);
const selectedBusLine = computed(() => store.getters.getSelectedBusLine);

const selectedBusLineStop = computed(
  () => store.getters.getSelectedBusLineStop
);
const sortedBusLineStops = computed(() => store.getters.getSortedBusLineStops);

const selectBusStop = (stop: string) => {
  store.dispatch("selectBusStop", stop);
};
</script>

<style lang="scss" scoped>
.selection-container {
  display: flex;
  gap: 8px;
  justify-content: space-between;

  .selection-area-empty {
    display: flex;
    justify-content: center;
    align-items: center;
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
    min-height: 300px;
  }
  .selection-area {
    display: flex;
    flex-direction: column;
    width: 50%;
    border-radius: 4px;
    border: 2px white;
    background: #fff;
    color: #33373c;
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    min-height: 300px;

    .bus-lines-container {
      text-align: left;
      width: 100%;
      height: 400px;
      overflow-y: auto;

      .title {
        display: flex;
        align-items: center;
        height: 56px;
        color: #1a1a1a;
        font-size: 14px;
        font-weight: 600;
        line-height: 24px;
        padding: 0 24px;
      }
      .subtitle {
        display: flex;
        align-items: center;
        height: 56px;
        color: #33373c;
        font-size: 12px;
        font-weight: 600;
        line-height: 16px;
        padding: 0 24px;
      }
      .content {
        display: flex;
        align-items: center;
        height: 56px;
        color: #33373c;
        font-size: 12px;
        font-weight: 400;
        line-height: 16px;
        padding: 0 24px;
        border-top: 1px solid #f3f4f9;
        cursor: pointer;

        &.bus-stop {
          cursor: default;
        }
        &.selected {
          background-color: #f8f8fb;
          color: #1952e1;
        }

        &:hover {
          background-color: #f8f8fb;
        }
      }

      /* Hide the scrollbar for Chrome, Safari, and Opera */
      &::-webkit-scrollbar {
        display: none;
      }
      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */
    }
  }
}
</style>
