<template>
  <div class="container">
    <h1 class="title">Timetable</h1>

    <MainMenu />

    <BusLinesMenu />

    <SelectionMenu />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useStore } from "vuex";
import MainMenu from "./components/MainMenu.vue";
import BusLinesMenu from "./components/BusLinesMenu.vue";
import SelectionMenu from "./components/SelectionMenu.vue";

const store = useStore();

onMounted(async () => {
  await store.dispatch("fetchStops");
});
</script>

<style lang="scss" scoped>
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
}
</style>
