<template>
  <div class="container">
    <MainMenu />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import MainMenu from "@/components/MainMenu.vue";
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap");

.container {
  font-family: Inter;
  padding: 40px 32px;
}
</style>
