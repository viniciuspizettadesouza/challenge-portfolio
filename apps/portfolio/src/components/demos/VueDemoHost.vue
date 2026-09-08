<script setup lang="ts">
import ThreeCketDemo from "@challenge/3cket-demo";
import ClimateSeedDemo from "@challenge/climateseed-demo";
import FyldHansecomDemo from "@challenge/fyld-hansecom-demo";
import IngeniousBuildDemo from "@challenge/ingenious-build-demo";
import LeadOperationsDemo from "@challenge/lead-operations-demo";
import SwordHealthDemo from "@challenge/swordhealth-demo";
import VueDemo from "@challenge/vue-demo";
import WeatherForecastDemo from "@challenge/weather-forecast-demo";
import { computed } from "vue";

const props = defineProps<{ slug: string }>();
const demos = {
  "event-discovery": ThreeCketDemo,
  "weather-forecast": WeatherForecastDemo,
  "carbon-emissions-dashboard": ClimateSeedDemo,
  "movie-search": FyldHansecomDemo,
  "public-transit-timetable": IngeniousBuildDemo,
  "lead-operations": LeadOperationsDemo,
  "news-publishing-platform": SwordHealthDemo,
  "formula-one-driver-explorer": VueDemo,
};
const demo = computed(() => demos[props.slug as keyof typeof demos]);
</script>

<template><component :is="demo" v-if="demo" /></template>
