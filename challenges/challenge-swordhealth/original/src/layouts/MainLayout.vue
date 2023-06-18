<template>
  <q-layout>
    <MainHeader />

    <q-page-container>
      <router-view />
    </q-page-container>

    <MainFooter />
  </q-layout>
</template>

<script setup lang="ts">
import MainHeader from 'src/components/MainHeader.vue';
import MainFooter from 'src/components/MainFooter.vue';
</script>
