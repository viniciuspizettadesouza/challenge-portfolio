<template>
  <q-btn @click="navigateToNewArticle" label="Read more" color="primary" />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter()

const navigateToNewArticle = () => {
  router.push({ path: '/new-article' });
}
</script>
