<script setup lang="ts">
import { ref } from "vue";
import { movies, searchMovies, type Movie } from "./logic";

const query = ref("avengers");
const results = ref<Movie[]>([]);
const searched = ref(false);
const message = ref("");

function submitSearch() {
  const normalized = query.value.trim();
  if (normalized.length < 3) {
    results.value = [];
    searched.value = false;
    message.value = "Enter at least three characters.";
    return;
  }

  results.value = searchMovies(movies, normalized);
  searched.value = true;
  message.value =
    results.value.length === 0
      ? `No movies found for “${normalized}”.`
      : `${results.value.length} movies found.`;
}
</script>

<template>
  <section class="fyld-demo">
    <header class="nuxt-heading">
      <div class="nuxt-brand" aria-label="NuxtJS">
        <span class="nuxt-mark" aria-hidden="true"><i></i><b></b></span>
        <strong>NuxtJS</strong>
      </div>
      <h2>Search for any movie</h2>
    </header>

    <form class="movie-search" @submit.prevent="submitSearch">
      <label>
        <span class="sr-only">Movie title</span>
        <input v-model="query" type="search" placeholder="Search movie" />
      </label>
      <button type="submit">Search</button>
    </form>

    <p v-if="message" class="search-message" aria-live="polite">{{ message }}</p>

    <div v-if="searched" class="movie-results">
      <article v-for="movie in results" :key="movie.id">
        <h3>{{ movie.title }} ({{ movie.releaseDate.slice(0, 4) }})</h3>
        <p class="rating">Rating: {{ movie.rating }}</p>
        <p><strong>Overview:</strong> {{ movie.overview }}</p>
      </article>
    </div>

    <div v-else class="search-hint">
      <p>Type a movie title and select Search.</p>
      <small>The preserved “avengers” query is ready to run.</small>
    </div>
  </section>
</template>

<style scoped>
.fyld-demo {
  width: 100%;
  min-height: 40rem;
  padding: clamp(1.5rem, 4vw, 3rem);
  border: 1px solid #ededed;
  border-radius: 1.1rem;
  color: #2d2d2d;
  background: #fafafa;
  font-family: Roboto, Arial, Helvetica, sans-serif;
}

.nuxt-heading {
  display: grid;
  justify-items: center;
  margin-bottom: 2rem;
}

.nuxt-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #003543;
}

.nuxt-brand > strong {
  font-size: clamp(2.2rem, 7vw, 4.5rem);
  letter-spacing: -0.07em;
}

.nuxt-mark {
  position: relative;
  display: block;
  width: 5rem;
  height: 3.6rem;
}

.nuxt-mark::before,
.nuxt-mark i,
.nuxt-mark b {
  position: absolute;
  bottom: 0;
  width: 0;
  height: 0;
  border-right: 1.6rem solid transparent;
  border-bottom: 3rem solid #00dc82;
  border-left: 1.6rem solid transparent;
  content: "";
}

.nuxt-mark::before {
  left: 0;
}

.nuxt-mark i {
  right: 0;
}

.nuxt-mark b {
  right: 1rem;
  border-right-width: 1.25rem;
  border-bottom-width: 2.3rem;
  border-bottom-color: #003543;
  border-left-width: 1.25rem;
}

.nuxt-heading h2 {
  margin: 0.3rem 0 0;
  font-size: clamp(1.25rem, 3vw, 2.1rem);
}

.movie-search {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: end;
  gap: 1.2rem;
}

.movie-search input {
  width: 100%;
  padding: 0.75rem 0;
  border: 0;
  border-bottom: 1px solid #969696;
  color: #333;
  background: transparent;
  font: inherit;
  font-size: 1rem;
}

.movie-search input:focus {
  border-color: #00a86b;
  outline: 0;
}

.movie-search button {
  padding: 0.9rem 1.6rem;
  border: 0;
  border-radius: 0.2rem;
  color: #222;
  background: #f5f5f5;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.2);
  font: inherit;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
}

.movie-search button:hover {
  background: #ededed;
}

.search-message {
  margin: 0.7rem 0;
  color: #686868;
  font-size: 0.75rem;
}

.movie-results {
  display: grid;
  gap: 1rem;
  margin-top: 1.5rem;
}

.movie-results article {
  padding: 1.35rem;
  border-radius: 0.25rem;
  background: white;
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.13),
    0 1px 2px rgba(0, 0, 0, 0.08);
}

.movie-results h3 {
  margin: 0;
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  font-weight: 400;
}

.movie-results p {
  margin: 1rem 0 0;
  color: #414141;
  font-size: 0.85rem;
  line-height: 1.7;
}

.movie-results .rating {
  margin-top: 0.3rem;
  color: #777;
}

.movie-results p strong {
  font-weight: 400;
}

.search-hint {
  display: grid;
  place-items: center;
  min-height: 15rem;
  color: #595959;
  text-align: center;
}

.search-hint p,
.search-hint small {
  margin: 0;
}

.search-hint small {
  margin-top: -5rem;
}

.sr-only {
  position: absolute;
  overflow: hidden;
  width: 1px;
  height: 1px;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
}

@media (max-width: 540px) {
  .movie-search {
    grid-template-columns: 1fr;
  }

  .movie-search button {
    justify-self: end;
  }

  .nuxt-mark {
    transform: scale(0.75);
  }
}
</style>
