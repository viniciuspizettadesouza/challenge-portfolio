<template>
  <div class="bus-lines">
    <div class="bus-lines-title">Select Bus Line</div>
    <div class="bus-lines-container">
      <div
        v-for="(stop, index) in groupedStopsByLineKeys"
        :key="index"
        :class="{ 'bus-lines-item': true, selected: stop === selectedBusLine }"
        @click="selectBusLine(stop)"
      >
        {{ stop }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const selectedBusLine = computed(() => store.getters.getSelectedBusLine);
const groupedStopsByLineKeys = computed(
  () => store.getters.getGroupedStopsByLineKeys
);

const selectBusLine = (stop: number) => {
  store.dispatch("selectBusLine", stop);
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

      &.selected {
        background-color: #2e3e6e;
      }
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
