<template>
  <q-card flat class="q-ma-md my-card">
    <q-card-section horizontal>
      <q-img class="col-6 card-img" src="https://cdn.quasar.dev/img/parallax1.jpg" />

      <q-card-section>
        <p class="text-body1">{{ title }}</p>
        <p class="text-body2">{{ description }}</p>
        <div>
          <ButtonReadMore />
        </div>
      </q-card-section>
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

<style lang="scss" scoped>
.my-card {
  width: 100%;
  max-width: 500px;
  max-height: 250px;
}

.card-img {
  max-height: 250px;
  max-width: 250px;
}
</style>
