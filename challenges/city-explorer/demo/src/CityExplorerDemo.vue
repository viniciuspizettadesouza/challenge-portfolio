<script setup lang="ts">
import { ref } from "vue";
import EventDiscoveryDemo from "./EventDiscoveryDemo.vue";
import TransitTimetableDemo from "./TransitTimetableDemo.vue";

type Collection = "events" | "transit";

const collection = ref<Collection>("events");
</script>

<template>
  <section class="city-explorer">
    <header class="city-header">
      <div class="city-brand">
        <span aria-hidden="true">CE</span>
        <div>
          <p>Mobility &amp; Events</p>
          <h2>City Explorer</h2>
        </div>
      </div>
      <nav aria-label="City Explorer collections">
        <button
          type="button"
          :class="{ active: collection === 'events' }"
          :aria-pressed="collection === 'events'"
          @click="collection = 'events'"
        >
          Events
        </button>
        <button
          type="button"
          :class="{ active: collection === 'transit' }"
          :aria-pressed="collection === 'transit'"
          @click="collection = 'transit'"
        >
          Transit
        </button>
      </nav>
    </header>

    <p class="city-intro">
      Discover local experiences, then inspect the routes, stops, and departure
      times that connect the city.
    </p>

    <EventDiscoveryDemo v-if="collection === 'events'" />
    <TransitTimetableDemo v-else />
  </section>
</template>

<style scoped>
.city-explorer {
  --city-blue: #214ee8;
  width: 100%;
  padding: clamp(.75rem, 2vw, 1.25rem);
  border: 1px solid #dce2ef;
  border-radius: 1.5rem;
  color: #151b2b;
  background: linear-gradient(145deg, #eef3ff, #f8f9fc 38%, #edf2fb);
  font-family: Inter, ui-sans-serif, system-ui, sans-serif;
}
.city-header, .city-brand, .city-header nav { display: flex; align-items: center; }
.city-header { justify-content: space-between; gap: 1rem; padding: .35rem .35rem 1rem; }
.city-brand { gap: .75rem; }
.city-brand > span {
  display: grid; place-items: center; width: 2.5rem; height: 2.5rem;
  border-radius: .75rem; color: white; background: var(--city-blue);
  font-size: .72rem; font-weight: 950; letter-spacing: .05em;
}
.city-brand p, .city-brand h2, .city-intro { margin: 0; }
.city-brand p { color: #526078; font-size: .62rem; font-weight: 850; letter-spacing: .1em; text-transform: uppercase; }
.city-brand h2 { font-size: 1.25rem; letter-spacing: -.03em; }
.city-header nav { gap: .3rem; padding: .3rem; border-radius: .75rem; background: white; box-shadow: 0 8px 24px rgba(31, 47, 83, .08); }
.city-header nav button {
  padding: .65rem 1rem; border: 0; border-radius: .55rem; color: #47536b;
  background: transparent; font: inherit; font-size: .78rem; font-weight: 850; cursor: pointer;
}
.city-header nav button.active { color: white; background: var(--city-blue); }
.city-intro { padding: 0 .35rem 1rem; color: #526078; font-size: .78rem; line-height: 1.5; }
@media (max-width: 38rem) {
  .city-header { align-items: flex-start; flex-direction: column; }
  .city-header nav { width: 100%; }
  .city-header nav button { flex: 1; }
}
</style>
