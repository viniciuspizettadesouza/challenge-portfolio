<script setup lang="ts">
import CityExplorerDemo from "@challenge/city-explorer-demo";
import ClimateSeedDemo from "@challenge/climateseed-demo";
import ContentPlatformDemo from "@challenge/content-platform-demo";
import LeadOperationsDemo from "@challenge/lead-operations-demo";
import VueDemo from "@challenge/vue-demo";
import WeatherForecastDemo from "@challenge/weather-forecast-demo";
import { computed } from "vue";

const props = defineProps<{ slug: string }>();
const demos = {
  "city-explorer": CityExplorerDemo,
  "weather-forecast": WeatherForecastDemo,
  "carbon-emissions-dashboard": ClimateSeedDemo,
  "content-platform": ContentPlatformDemo,
  "lead-operations": LeadOperationsDemo,
  "formula-one-driver-explorer": VueDemo,
};
const demo = computed(() => demos[props.slug as keyof typeof demos]);
</script>

<template><component :is="demo" v-if="demo" /></template>
