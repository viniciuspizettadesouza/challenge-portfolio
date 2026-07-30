<template>
  <input
    type="text"
    v-model="searchQuery"
    class="rounded border border-gray-300 p-2 focus:outline-blue-500"
    placeholder="Search events..."
  />
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { EventData } from "~/utils/types";
const props = defineProps(["events"]);
const emit = defineEmits(["filtered-events"]);

const searchQuery = ref("");

const filteredEvents = computed(() => {
  const query = searchQuery.value.toLowerCase();
  if (!query) {
    return props.events;
  }

  return props.events.filter((event: EventData) =>
    event.name.toLowerCase().includes(query),
  );
});

onMounted(() => {
  emit("filtered-events", props.events);
});

watch(searchQuery, (newQuery) => {
  emit("filtered-events", filteredEvents.value);
});
</script>
