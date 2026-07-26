<template>
  <q-layout>
    <q-page-container>

      <MainHeader />
      <router-view />

      <MainFooter />
    </q-page-container>

  </q-layout>
</template>

<script setup lang="ts">
import MainHeader from 'src/components/MainHeader.vue';
import MainFooter from 'src/components/MainFooter.vue';
</script>
