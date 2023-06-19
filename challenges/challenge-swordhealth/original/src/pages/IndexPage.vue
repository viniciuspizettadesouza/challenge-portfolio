<template>
  <q-page class="column items-left">
    <index-banner :title="title" :description="description"></index-banner>

    <div class="q-pa-md">
      <span class="q-mr-md">Categories</span>
      <q-chip v-for="cat in categories" :key="cat" :label="cat" clickable @click="onClickChip(cat)" outline
        color="primary" text-color="white" />
    </div>

    <q-card class="my-card" flat>
      <q-card-section horizontal>
        <q-img class="col-5" src="https://cdn.quasar.dev/img/parallax1.jpg" />
        <div>
          <q-card-section vertical>
            <h1>{{ title }}</h1>
            <p>{{ description }}</p>

            <ButtonReadMore />
          </q-card-section>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import IndexBanner from 'src/components/IndexBanner.vue'; import ButtonReadMore from 'src/components/ButtonReadMore.vue'

const title = 'Lorem ipsum dolor sit amet'
const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
const categories = ['Marketing', 'Design', 'Engineering']

const onClickChip = function (cat: string) {
  console.log('chip:', cat)
}
</script>
