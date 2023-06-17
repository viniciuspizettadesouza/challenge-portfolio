<template>
  <q-page class="column items-left">
    <q-card class="my-card" flat>
      <q-card-section horizontal>
        <div>
          <q-card-section vertical>
            <h1>{{ title }}</h1>
            <p>{{ description }}</p>

            <q-btn @click="navigateToNewArticle" label="Read more" color="primary" />
          </q-card-section>
        </div>
        <q-img class="col-5" src="https://cdn.quasar.dev/img/parallax1.jpg" />

      </q-card-section>
    </q-card>


    <div class="q-pa-md">
      <p>Categories</p>
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

            <q-btn @click="navigateToNewArticle" label="Read more" color="primary" />
          </q-card-section>
        </div>
      </q-card-section>
    </q-card>


    <example-component title="Example component" active :todos="todos" :meta="meta"></example-component>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Todo, Meta } from 'components/models';
import ExampleComponent from 'components/ExampleComponent.vue';

const router = useRouter()
const title = 'Lorem ipsum dolor sit amet'
const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
const categories = ['Marketing', 'Design', 'Engineering']


const onClickChip = function (cat: string) {
  console.log('chip:', cat)
}

const navigateToNewArticle = () => {
  router.push({ path: '/new-article' });
};

const todos = ref<Todo[]>([
  {
    id: 1,
    content: 'ct1'
  },
  {
    id: 2,
    content: 'ct2'
  },
  {
    id: 3,
    content: 'ct3'
  },
  {
    id: 4,
    content: 'ct4'
  },
  {
    id: 5,
    content: 'ct5'
  }
]);
const meta = ref<Meta>({
  totalCount: 1200
});
</script>
