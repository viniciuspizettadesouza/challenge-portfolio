<template>
  <div class="selection-area">
    <div class="bus-lines-container">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Search..."
        :class="{ 'search-input': true, focused: isFocused }"
        @focus="isFocused = true"
        @blur="isFocused = false"
      />
      <button class="title" @click="toggleOrder">
        Bus Stops <img class="icon" src="@/assets/ToggleIcon.svg" />
      </button>
      <div v-for="stop in orderedBusStops" :key="stop" class="content bus-stop">
        {{ stop }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const searchTerm = ref("");
const isFocused = ref(false);
const ascendingOrder = ref(true);

const uniqueBusStops = computed(() => store.getters.getUniqueStops);

const filteredBusStops = computed(() => {
  const term = searchTerm.value.trim().toLowerCase();
  if (!term) {
    return uniqueBusStops.value;
  }
  return uniqueBusStops.value.filter((stop: string) =>
    stop.toLowerCase().includes(term)
  );
});

function toggleOrder() {
  ascendingOrder.value = !ascendingOrder.value;
}

const orderedBusStops = computed(() => {
  const sortedStops = ascendingOrder.value
    ? filteredBusStops.value
        .slice()
        .sort((a: string, b: string) => a.localeCompare(b))
    : filteredBusStops.value
        .slice()
        .sort((a: string, b: string) => b.localeCompare(a));
  return sortedStops;
});
</script>

<style lang="scss" scoped>
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
      color: #33373c;
      font-size: 12px;
      font-weight: 600;
      line-height: 16px;
      padding: 0 24px;
      border: none;
      background-color: white;
    }
    .icon {
      padding: 0 4px;
    }
    .search-input {
      width: 250px;
      height: 40px;
      padding: 12px 16px;
      margin: 8px 0 0 8px;
      background: white;
      border-radius: 4px;
      border: 0.5px #e2e4ea solid;
      outline: none;
      transition: box-shadow 0.2s ease-in-out;

      &:focus,
      &:focus-visible,
      &:focus-within {
        border-color: #1952e1;
        box-shadow: 0 0 0 2px rgba(25, 82, 225, 0.2);
      }
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
      border-top: 1px solid #ccc;
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
    -ms-overflow-style: none; /* Hide the scrollbar for IE and Edge */
    scrollbar-width: none; /*Hide the scrollbar for Firefox */
  }
}
</style>
