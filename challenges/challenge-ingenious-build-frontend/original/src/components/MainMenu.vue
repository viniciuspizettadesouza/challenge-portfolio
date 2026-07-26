<template>
  <h1 class="title">Timetable</h1>
  <div class="menu">
    <router-link
      to="/"
      :class="{ 'menu-item': true, selected: isActive('/') }"
      @click="selectItem(0)"
    >
      Bus Lines
    </router-link>

    <router-link
      to="/stops"
      :class="{ 'menu-item': true, selected: isActive('/stops') }"
      @click="selectItem(1)"
    >
      Stops
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const selectedItem = ref(0);

const selectItem = (index: number) => {
  selectedItem.value = index;
};
const isActive = (path: string) => {
  return route.path === path;
};
</script>

<style lang="scss" scoped>
.menu {
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 4px;
  padding: 0px 24px;
  margin-bottom: 16px;

  .title {
    color: #1a1a1a;
    font-size: 24px;
    font-weight: 600;
    line-height: 32px;
    margin-bottom: 24px;
  }

  .menu-item {
    display: flex;
    align-items: center;
    padding: 20px 24px;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    transition: border-color 0.2s ease-in-out;
    color: #9a9da4;
    text-decoration: none;

    &:hover {
      border-color: #1952e1;
    }
  }

  .selected {
    border-color: #1952e1;
    color: #1a1a1a;
  }
}
</style>
