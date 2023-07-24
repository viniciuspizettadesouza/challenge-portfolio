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

<style lang="scss" scoped>
.title {
  color: #1a1a1a;
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  margin-bottom: 24px;
}
</style>
