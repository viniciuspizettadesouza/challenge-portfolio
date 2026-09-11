<script setup lang="ts">
import CityExplorerDemo from "@challenge/city-explorer-demo";
import ContentPlatformDemo from "@challenge/content-platform-demo";
import LeadOperationsDemo from "@challenge/lead-operations-demo";
import { computed } from "vue";

const props = defineProps<{ slug: string }>();
const demos = {
  "city-explorer": CityExplorerDemo,
  "content-platform": ContentPlatformDemo,
  "lead-operations": LeadOperationsDemo,
};
const demo = computed(() => demos[props.slug as keyof typeof demos]);
</script>

<template><component :is="demo" v-if="demo" /></template>
