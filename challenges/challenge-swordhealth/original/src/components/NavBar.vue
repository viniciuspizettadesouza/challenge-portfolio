<template>
  <q-header elevated class="bg-white">
    <q-toolbar class="text-black shadow-2 rounded-borders">
      <q-avatar color="primary">
        <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
      </q-avatar>
      <q-toolbar-title color="primary">
        <q-btn @click="navigateHome" flat label="Sword Health | News platform" />
      </q-toolbar-title>

      <q-btn v-if="!isAuthenticated" @click.prevent="login" color="primary" label="Login" />

      <div v-else class="q-pa-md" style="max-width: 300px">
        <q-btn-dropdown unelevated>
          <template v-slot:label>
            <div class="row items-center no-wrap">
              <q-item-section avatar>
                <q-avatar size="48px">
                  <img :src="user.picture">
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ user.given_name }}</q-item-label>
                <q-item-label caption>{{ user.email }}</q-item-label>
              </q-item-section>
            </div>
          </template>

          <q-list>
            <q-item clickable v-close-popup @click="navigateProfile">
              <q-item-section avatar>
                <q-avatar icon="person" color="primary" text-color="white" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Profile</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="logout">
              <q-item-section avatar>
                <q-avatar icon="logout" color="primary" text-color="white" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Logout</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>

    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue';
import { useRouter } from 'vue-router';

const auth0 = useAuth0()
const router = useRouter()
const isAuthenticated = auth0.isAuthenticated
const user = auth0.user

const login = () => {
  auth0.loginWithRedirect()
}
const logout = () => {
  auth0.logout({
    logoutParams: {
      returnTo: window.location.origin
    }
  })
}
const navigateHome = () => {
  router.push({ path: '/' });
}
const navigateProfile = () => {
  router.push({ path: '/profile' });
}
</script>
