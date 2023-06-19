<template>
  <q-card class="my-card" flat>
    <q-card-section horizontal>
      <div>
        <q-card-section vertical>
          <h1>{{ title }}</h1>
          <p>{{ description }}</p>

          <ButtonReadMore />
        </q-card-section>
      </div>
      <q-img class="col-5" src="https://cdn.quasar.dev/img/parallax1.jpg" />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import ButtonReadMore from 'src/components/ButtonReadMore.vue'

defineProps({
  title: String,
  description: String
})
</script>
