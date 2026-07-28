<script setup lang="ts">
import { computed, ref } from "vue";
import { episodes, show } from "./fixture";
import { getTotalPages, paginate } from "./logic";

const pageSize = 5;
const currentPage = ref(1);
const totalPages = computed(() => getTotalPages(episodes.length, pageSize));
const visibleEpisodes = computed(() => paginate(episodes, currentPage.value, pageSize));

function previousPage() {
  currentPage.value = Math.max(1, currentPage.value - 1);
}

function nextPage() {
  currentPage.value = Math.min(totalPages.value, currentPage.value + 1);
}
</script>

<template>
  <div class="tv-demo">
    <section class="show-card">
      <div class="poster" aria-hidden="true">
        <span>SL</span>
        <i />
      </div>
      <div>
        <p class="fixture-label">Local portfolio fixture</p>
        <h3>{{ show.name }}</h3>
        <p class="summary">{{ show.summary }}</p>
        <ul class="facts" aria-label="Show details">
          <li>{{ show.genres.join(" · ") }}</li>
          <li>{{ show.status }}</li>
          <li>{{ show.premiered }}</li>
          <li>★ {{ show.rating }}</li>
        </ul>
      </div>
    </section>

    <section class="episodes">
      <div class="episodes-heading">
        <div>
          <p class="fixture-label">Episode guide</p>
          <h3>Episodes</h3>
        </div>
        <span>{{ episodes.length }} total</span>
      </div>

      <ol>
        <li v-for="episode in visibleEpisodes" :key="episode.id">
          <div class="episode-number">
            S{{ String(episode.season).padStart(2, "0") }}E{{
              String(episode.number).padStart(2, "0")
            }}
          </div>
          <div>
            <h4>{{ episode.name }}</h4>
            <p>{{ episode.summary }}</p>
            <small>{{ episode.airdate }} · {{ episode.runtime }} min</small>
          </div>
        </li>
      </ol>

      <nav aria-label="Episode pagination">
        <button type="button" :disabled="currentPage === 1" @click="previousPage">
          Previous
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button type="button" :disabled="currentPage === totalPages" @click="nextPage">
          Next
        </button>
      </nav>
    </section>
  </div>
</template>

<style scoped>
.tv-demo {
  display: grid;
  gap: 1rem;
}

.show-card,
.episodes {
  padding: clamp(1rem, 3vw, 1.5rem);
  background: #0f1210;
  border: 1px solid #303732;
  border-radius: 0.45rem;
}

.show-card {
  display: grid;
  grid-template-columns: 8rem 1fr;
  gap: 1.25rem;
}

.poster {
  position: relative;
  display: grid;
  min-height: 11rem;
  place-items: center;
  overflow: hidden;
  color: #111;
  background:
    linear-gradient(145deg, transparent 45%, rgb(11 13 12 / 60%) 46%),
    #b8f34a;
  border-radius: 0.35rem;
  font-size: 2rem;
  font-weight: 850;
  letter-spacing: -0.08em;
}

.poster i {
  position: absolute;
  right: -2rem;
  bottom: 1.5rem;
  width: 9rem;
  height: 1px;
  background: #111;
  box-shadow: 0 -0.45rem #111, 0 0.45rem #111;
  transform: rotate(-24deg);
}

.fixture-label {
  margin: 0 0 0.35rem;
  color: #b8f34a;
  font-size: 0.68rem;
  font-weight: 750;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

h3,
h4 {
  margin: 0;
}

.summary,
.episodes li p {
  color: #a4ada6;
}

.facts {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  padding: 0;
  list-style: none;
}

.facts li {
  padding: 0.25rem 0.5rem;
  color: #d8ded9;
  background: #1b201d;
  border: 1px solid #303732;
  border-radius: 10rem;
  font-size: 0.75rem;
}

.episodes-heading,
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.episodes-heading > span,
small,
nav span {
  color: #a4ada6;
  font-size: 0.78rem;
}

ol {
  display: grid;
  gap: 1px;
  margin-block: 1.25rem;
  padding: 1px;
  background: #303732;
  list-style: none;
}

ol li {
  display: grid;
  grid-template-columns: 4.5rem 1fr;
  gap: 1rem;
  padding: 1rem;
  background: #141715;
}

.episode-number {
  color: #b8f34a;
  font-family: ui-monospace, monospace;
  font-size: 0.8rem;
  font-weight: 700;
}

.episodes li p {
  margin: 0.35rem 0;
}

button {
  padding: 0.6rem 0.8rem;
  color: #111;
  background: #b8f34a;
  border: 0;
  border-radius: 0.3rem;
  font-weight: 700;
  cursor: pointer;
}

button:disabled {
  color: #6f7771;
  background: #252a27;
  cursor: not-allowed;
}

@media (max-width: 620px) {
  .show-card {
    grid-template-columns: 1fr;
  }

  .poster {
    min-height: 8rem;
  }

  ol li {
    grid-template-columns: 1fr;
  }
}
</style>
