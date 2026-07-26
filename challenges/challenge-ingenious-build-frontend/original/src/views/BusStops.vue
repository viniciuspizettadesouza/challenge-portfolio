<template>
  <SearchStops />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useStore } from "vuex";
import SearchStops from "@/components/SearchStops.vue";

const store = useStore();

onMounted(async () => {
  await store.dispatch("fetchBusStops");
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
