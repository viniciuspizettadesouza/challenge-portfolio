<template>
  <BusLinesMenu />

  <SelectionMenu />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useStore } from "vuex";
import BusLinesMenu from "@/components/BusLinesMenu.vue";
import SelectionMenu from "@/components/SelectionMenu.vue";

const store = useStore();

onMounted(async () => {
  await store.dispatch("fetchStops");
});
</script>
