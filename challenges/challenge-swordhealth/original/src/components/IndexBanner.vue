<template>
  <div class="q-pa-md">
    <q-card flat>
      <q-card-section horizontal>
        <div>
          <h1>{{ title }}</h1>
          <h2 class="text-subtitle1">{{ description }}</h2>
          <ButtonReadMore />
        </div>

        <q-img class="col-5" src="https://cdn.quasar.dev/img/parallax1.jpg" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import ButtonReadMore from 'src/components/ButtonReadMore.vue'

const title = 'Lorem ipsum dolor sit amet'
const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
</script>
