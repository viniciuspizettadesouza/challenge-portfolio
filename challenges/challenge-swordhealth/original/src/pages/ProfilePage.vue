<template>
  <q-page class="row items-center justify-center">
    <q-avatar size="100px" class="q-mr-">
      <q-img :src="user?.picture" spinner-color="white" />
    </q-avatar>

    <q-card-section>
      <h2>{{ user?.name }}</h2>
      <p class="text-grey text-subtitle1">{{ user?.email }}</p>

    </q-card-section>
    <q-card-section>
      <highlightjs language="json" :code="JSON.stringify(user, null, 2)" />
    </q-card-section>
  </q-page>
</template>

<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue';

const auth0 = useAuth0()
const user = auth0.user
</script>
