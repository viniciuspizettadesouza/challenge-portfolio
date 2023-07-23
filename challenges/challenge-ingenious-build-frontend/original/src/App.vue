<template>
  <div class="container">
    <div class="title">Timetable</div>

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

    <div class="lines">
      <div class="lines-title">Select Bus Line</div>
      <div class="lines-container">
        <div v-for="(item, index) in items" :key="index" class="lines-item">
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const items = ref([
      100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
      100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
    ]);
    const menuItems = ref(["Bus Lines", "Stops"]);
    const selectedItem = ref(0);

    const selectItem = (index) => {
      selectedItem.value = index;
    };

    return { items, menuItems, selectedItem, selectItem };
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap");

.container {
  padding: 40px 32px;

  .title {
    color: #1a1a1a;
    font-family: Inter;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 32px;
    margin-bottom: 24px;
  }

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
  .lines {
    border-radius: 4px;
    background: #fff;

    .lines-title {
      display: flex;
      padding: 24px 24px 8px 24px;

      color: #1a1a1a;
      font-family: Inter;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: 24px;
    }

    .lines-container {
      display: flex;
      flex-wrap: wrap;
      padding: 24px;
      gap: 8px;

      .lines-item {
        border-radius: 4px;
        padding: 8px 16px;
        background: #1952e1;
        color: #fff;
        font-family: Inter;
        font-size: 12px;
        font-style: normal;
        font-weight: 500;
        line-height: 16px;
      }
    }
  }
}
</style>
