<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useTVShowStore } from '@/stores/tvShow';
import { onBeforeMount } from 'vue';
import { computed, ref } from 'vue';

const tvShowStore = useTVShowStore();
const { tvShow, episodes } = storeToRefs(tvShowStore);

const pageSize = 10;
const currentPage = ref(1);

onBeforeMount(async () => {
  await tvShowStore.fetchTVShowAndEpisodes();
});

const totalPages = computed(() => Math.ceil(episodes.value.length / pageSize));

const paginatedEpisodes = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize;
  const endIndex = currentPage.value * pageSize;
  return episodes.value.slice(startIndex, endIndex);
});

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

function previousPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}
</script>

<template>
  <div>
    <h1>{{ tvShow.name }}</h1>
    <img v-if="tvShow.image" :src="tvShow.image.medium" :alt="tvShow.name" />
    <p>{{ tvShow.summary }}</p>
    <h2>Episodes</h2>

    <div v-for="(episode, index) in paginatedEpisodes" :key="index">
      {{ episode.summary }}
      <p v-html="episode.summary" />
    </div>

    <div>
      <button @click="previousPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>
</template>
