<template>
  <div class="menu">
    <div
      v-for="(item, index) in menuItems"
      :key="index"
      :class="{ 'menu-item': true, selected: index === selectedItem }"
      @click="selectItem(index)"
    >
      {{ item }}
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const menuItems = ref(["Bus Lines", "Stops"]);
const selectedItem = ref(0);

const selectItem = (index) => {
  selectedItem.value = index;
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

  .menu-item {
    display: flex;
    align-items: center;
    padding: 20px 24px;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    transition: border-color 0.2s ease-in-out;
    color: #9a9da4;

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
