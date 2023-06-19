<template>
  <q-page>
    <index-banner />

    <div class="q-pa-md">
      <q-card flat>
        <div>
          <span class="q-mr-md text-body1">Categories</span>
          <q-chip v-for="cat in categories" :key="cat" :label="cat" clickable @click="onClickChip(cat)" outline
            color="primary" text-color="white" />
        </div>
      </q-card>
    </div>

    <div class="q-pa-md row justify-between q-gutter-md">
      <index-article v-for="article in articles" :key="article.id" :title="article.title"
        :description="article.description" />
    </div>

    <div class="q-ma-lg flex justify-center">
      <ButtonLoadMore @load-more-articles="loadMoreArticles" />
    </div>

  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import IndexBanner from 'src/components/IndexBanner.vue';
import IndexArticle from 'src/components/IndexArticle.vue';
import ButtonLoadMore from 'src/components/ButtonLoadMore.vue'

const categories = ['Marketing', 'Design', 'Engineering']
const articles = ref([
  {
    id: '01',
    title: 'Lorem ipsum dolor sit amet',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  },
  {
    id: '02',
    title: 'Sed ut perspiciatis unde omnis iste natus',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.'
  },
  {
    id: '03',
    title: 'At vero eos et accusamus et iusto',
    description: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.'
  },
  {
    id: '04',
    title: 'Excepteur sint occaecat cupidatat non proident',
    description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  }
])

const onClickChip = function (cat: string) {
  console.log('chip:', cat)
}
const loadMoreArticles = (amount = 2) => {
  for (let i = 1; i <= amount; i++) {
    articles.value.push(
      {
        id: String(i + articles.value.length).padStart(2, '0'),
        title: 'Excepteur sint occaecat cupidatat non proident',
        description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      }
    );
  }
}
</script>

<style lang="scss" scoped>
.page {
  max-width: 2500px;
}
</style>
