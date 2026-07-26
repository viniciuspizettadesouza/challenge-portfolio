<template>
  <q-btn @click="loadMoreArticles" label="Load more" color="primary" />
</template>

<script setup lang="ts">
const emit = defineEmits(['loadMoreArticles'])

const loadMoreArticles = () => {
  emit('loadMoreArticles')
}
</script>
