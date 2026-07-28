<script setup lang="ts">
import { computed, ref } from "vue";
import {
  getLines,
  getStopsForLine,
  getTimesForStop,
  getUniqueStops,
  stops,
} from "./logic";

const activeView = ref<"lines" | "stops">("lines");
const selectedLine = ref<number | null>(null);
const selectedStop = ref("");
const query = ref("");
const direction = ref<"ascending" | "descending">("ascending");

const lines = getLines(stops);
const lineStops = computed(() =>
  selectedLine.value === null ? [] : getStopsForLine(stops, selectedLine.value),
);
const times = computed(() =>
  selectedLine.value === null || !selectedStop.value
    ? []
    : getTimesForStop(stops, selectedLine.value, selectedStop.value),
);
const stopDirectory = computed(() => getUniqueStops(stops, query.value, direction.value));

function selectLine(line: number) {
  selectedLine.value = line;
  selectedStop.value = "";
}

function showView(view: "lines" | "stops") {
  activeView.value = view;
}
</script>

<template>
  <section class="ingenious-demo">
    <header class="ingenious-heading">
      <div>
        <p>Ingenious Build · Transit data</p>
        <h2>Stops Board</h2>
      </div>
      <div class="dataset-summary">
        <strong>{{ lines.length }}</strong>
        <span>lines</span>
        <i></i>
        <strong>{{ getUniqueStops(stops).length }}</strong>
        <span>stops</span>
      </div>
    </header>

    <nav class="ingenious-tabs" aria-label="Timetable views">
      <button
        type="button"
        :class="{ active: activeView === 'lines' }"
        :aria-pressed="activeView === 'lines'"
        @click="showView('lines')"
      >
        Bus Lines
      </button>
      <button
        type="button"
        :class="{ active: activeView === 'stops' }"
        :aria-pressed="activeView === 'stops'"
        @click="showView('stops')"
      >
        Stops
      </button>
    </nav>

    <div v-if="activeView === 'lines'" class="lines-view">
      <article class="panel line-picker">
        <div class="panel-title">
          <div>
            <span>Network</span>
            <h3>Select Bus Line</h3>
          </div>
          <small>{{ lines.length }} available</small>
        </div>
        <div class="line-buttons">
          <button
            v-for="line in lines"
            :key="line"
            type="button"
            :class="{ selected: selectedLine === line }"
            @click="selectLine(line)"
          >
            {{ line }}
          </button>
        </div>
      </article>

      <div class="selections">
        <article class="panel schedule-column">
          <template v-if="selectedLine !== null">
            <div class="panel-title">
              <div>
                <span>Bus line</span>
                <h3>{{ selectedLine }}</h3>
              </div>
              <small>{{ lineStops.length }} stops</small>
            </div>
            <p class="column-label">Bus Stops</p>
            <div class="scroll-list">
              <button
                v-for="stop in lineStops"
                :key="stop.stop"
                type="button"
                :class="{ selected: selectedStop === stop.stop }"
                @click="selectedStop = stop.stop"
              >
                <span>{{ stop.stop }}</span>
                <small>#{{ stop.order }}</small>
              </button>
            </div>
          </template>
          <div v-else class="empty-state">
            <span aria-hidden="true">↖</span>
            <strong>Please select a bus line first</strong>
            <small>The route stops will appear here.</small>
          </div>
        </article>

        <article class="panel schedule-column">
          <template v-if="selectedStop">
            <div class="panel-title">
              <div>
                <span>Bus stop</span>
                <h3>{{ selectedStop }}</h3>
              </div>
              <small>Line {{ selectedLine }}</small>
            </div>
            <p class="column-label">Departure Time</p>
            <div class="time-grid">
              <span v-for="(time, index) in times" :key="`${time}-${index}`">{{ time }}</span>
            </div>
          </template>
          <div v-else class="empty-state">
            <span aria-hidden="true">◎</span>
            <strong>Please select a stop</strong>
            <small>Sorted departure times will appear here.</small>
          </div>
        </article>
      </div>
    </div>

    <article v-else class="panel stop-directory">
      <div class="directory-toolbar">
        <label>
          <span>Find a stop</span>
          <input v-model="query" type="search" placeholder="Search stop name..." />
        </label>
        <button
          type="button"
          @click="
            direction = direction === 'ascending' ? 'descending' : 'ascending'
          "
        >
          Sort {{ direction === "ascending" ? "A–Z" : "Z–A" }}
          <span aria-hidden="true">{{ direction === "ascending" ? "↓" : "↑" }}</span>
        </button>
      </div>
      <div class="directory-heading">
        <strong>Bus Stops</strong>
        <span>{{ stopDirectory.length }} results</span>
      </div>
      <div class="directory-list">
        <div v-for="stop in stopDirectory" :key="stop">
          <span>{{ stop }}</span>
          <small>Stop</small>
        </div>
      </div>
      <p v-if="stopDirectory.length === 0" class="no-results">No matching stops found.</p>
    </article>
  </section>
</template>

<style scoped>
.ingenious-demo {
  --blue: #1952e1;
  --navy: #24345f;
  --ink: #20242a;
  --muted: #777d88;
  --line: #e8eaf0;
  display: grid;
  gap: 1rem;
  width: 100%;
  padding: clamp(1rem, 3vw, 2rem);
  border-radius: 1.25rem;
  color: var(--ink);
  background: #f3f4f9;
  font-family:
    Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.ingenious-heading,
.ingenious-tabs,
.panel-title,
.directory-toolbar,
.directory-heading,
.dataset-summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.ingenious-heading p,
.ingenious-heading h2,
.panel-title h3,
.column-label {
  margin: 0;
}

.ingenious-heading p {
  margin-bottom: 0.25rem;
  color: var(--blue);
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.ingenious-heading h2 {
  font-size: clamp(1.7rem, 4vw, 2.5rem);
}

.dataset-summary {
  justify-content: flex-end;
  padding: 0.65rem 0.85rem;
  border-radius: 0.75rem;
  background: white;
  box-shadow: 0 8px 24px rgba(39, 50, 83, 0.06);
}

.dataset-summary strong {
  color: var(--blue);
}

.dataset-summary span {
  color: var(--muted);
  font-size: 0.7rem;
}

.dataset-summary i {
  width: 1px;
  height: 1.3rem;
  background: var(--line);
}

.ingenious-tabs {
  justify-content: flex-start;
  padding: 0 1rem;
  border-radius: 0.55rem;
  background: white;
}

.ingenious-tabs button {
  padding: 1rem;
  border: 0;
  border-bottom: 2px solid transparent;
  color: #969aa3;
  background: transparent;
  font: inherit;
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
}

.ingenious-tabs button.active {
  border-color: var(--blue);
  color: var(--ink);
}

.lines-view {
  display: grid;
  gap: 1rem;
}

.panel {
  border: 1px solid transparent;
  border-radius: 0.55rem;
  background: white;
}

.line-picker {
  padding: 1.2rem;
}

.panel-title {
  align-items: flex-start;
}

.panel-title span {
  color: var(--muted);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.panel-title h3 {
  margin-top: 0.2rem;
  font-size: 1rem;
}

.panel-title > small {
  padding: 0.3rem 0.5rem;
  border-radius: 999px;
  color: var(--blue);
  background: #edf2ff;
  font-size: 0.65rem;
  font-weight: 800;
}

.line-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin-top: 1rem;
}

.line-buttons button {
  min-width: 3.5rem;
  padding: 0.55rem 0.8rem;
  border: 0;
  border-radius: 0.35rem;
  color: white;
  background: var(--blue);
  font: inherit;
  font-size: 0.75rem;
  font-weight: 800;
  cursor: pointer;
}

.line-buttons button.selected {
  background: var(--navy);
  box-shadow: 0 0 0 3px rgba(25, 82, 225, 0.16);
}

.selections {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.65rem;
}

.schedule-column {
  min-width: 0;
  min-height: 23rem;
  padding: 1.2rem;
}

.column-label {
  margin-top: 1.25rem;
  padding-bottom: 0.75rem;
  color: #424750;
  font-size: 0.72rem;
  font-weight: 800;
}

.scroll-list {
  overflow: auto;
  max-height: 18rem;
  margin: 0 -1.2rem -1.2rem;
}

.scroll-list button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.85rem 1.2rem;
  border: 0;
  border-top: 1px solid var(--line);
  color: #424750;
  background: white;
  font: inherit;
  font-size: 0.75rem;
  text-align: left;
  cursor: pointer;
}

.scroll-list button:hover,
.scroll-list button.selected {
  color: var(--blue);
  background: #f7f9ff;
}

.scroll-list small {
  color: #9a9da4;
}

.empty-state {
  display: grid;
  place-items: center;
  align-content: center;
  height: 100%;
  min-height: 20rem;
  padding: 2rem;
  border: 2px dashed #c7cad2;
  border-radius: 0.4rem;
  color: #666b75;
  text-align: center;
}

.empty-state > span {
  margin-bottom: 0.7rem;
  color: var(--blue);
  font-size: 1.7rem;
}

.empty-state strong {
  font-size: 0.85rem;
}

.empty-state small {
  margin-top: 0.3rem;
  color: #9a9da4;
  font-size: 0.68rem;
}

.time-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(4.2rem, 1fr));
  gap: 0.45rem;
  overflow: auto;
  max-height: 17rem;
}

.time-grid span {
  padding: 0.55rem;
  border: 1px solid var(--line);
  border-radius: 0.35rem;
  color: var(--navy);
  background: #f8f9fc;
  font-size: 0.72rem;
  font-weight: 800;
  text-align: center;
}

.stop-directory {
  overflow: hidden;
}

.directory-toolbar {
  padding: 1rem;
}

.directory-toolbar label {
  display: grid;
  gap: 0.35rem;
  width: min(24rem, 70%);
  color: var(--muted);
  font-size: 0.68rem;
  font-weight: 800;
}

.directory-toolbar input {
  min-height: 2.65rem;
  padding: 0 0.8rem;
  border: 1px solid var(--line);
  border-radius: 0.4rem;
  font: inherit;
}

.directory-toolbar input:focus {
  border-color: var(--blue);
  outline: 3px solid rgba(25, 82, 225, 0.12);
}

.directory-toolbar button {
  padding: 0.7rem 0.85rem;
  border: 1px solid var(--line);
  border-radius: 0.4rem;
  color: var(--ink);
  background: white;
  font: inherit;
  font-size: 0.72rem;
  font-weight: 800;
  cursor: pointer;
}

.directory-heading {
  padding: 0.8rem 1rem;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  font-size: 0.75rem;
}

.directory-heading span {
  color: var(--muted);
  font-size: 0.68rem;
}

.directory-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  overflow: auto;
  max-height: 26rem;
}

.directory-list div {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.85rem 1rem;
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  color: #424750;
  font-size: 0.73rem;
}

.directory-list small {
  color: #a0a4ad;
}

.no-results {
  padding: 3rem;
  color: var(--muted);
  text-align: center;
}

@media (max-width: 680px) {
  .ingenious-heading,
  .directory-toolbar {
    align-items: flex-start;
    flex-direction: column;
  }

  .dataset-summary {
    align-self: stretch;
    justify-content: flex-start;
  }

  .selections,
  .directory-list {
    grid-template-columns: 1fr;
  }

  .directory-toolbar label {
    width: 100%;
  }
}
</style>
