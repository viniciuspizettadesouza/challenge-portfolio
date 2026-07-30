<script setup lang="ts">
import { EventData } from "~/utils/types/index";

const props = defineProps({
  event: { type: Object as () => EventData, required: true },
});
</script>

<template>
  <div
    class="mx-auto w-full max-w-md overflow-hidden rounded bg-white shadow-lg hover:cursor-pointer"
  >
    <img
      :src="event.theme.background_image.url"
      alt="Event Image"
      class="h-32 w-full object-cover"
    />
    <div class="px-6 py-4">
      <div class="mb-2 text-xl font-bold text-gray-700">{{ event.name }}</div>
      <p class="text-base text-gray-700">
        Location: {{ event.location.name }}, {{ event.location.country }}
      </p>
      <p class="text-base text-gray-700">
        Price Range: {{ event.price_range.minimum.amount }} -
        {{ event.price_range.maximum.amount }}
        {{ event.price_range.minimum.currency }}
      </p>
    </div>
  </div>
</template>
~/utils/types
