<script setup lang="ts">
import type { Lead } from "./fixtures";
defineProps<{ leads: Lead[] }>();
defineEmits<{ edit: [lead: Lead, opener: HTMLElement]; delete: [lead: Lead, opener: HTMLElement] }>();
</script>

<template>
  <div class="lead-table" tabindex="0" aria-label="Scrollable lead directory">
    <table>
      <thead><tr><th>Contact</th><th>Company</th><th>Cadence</th><th>Categories</th><th>Created</th><th><span class="sr-only">Actions</span></th></tr></thead>
      <tbody><tr v-for="lead in leads" :key="lead.id">
        <td><strong>{{ lead.name }}</strong><a :href="`mailto:${lead.email}`">{{ lead.email }}</a></td>
        <td><strong>{{ lead.company }}</strong><small v-if="lead.location">{{ lead.location.city }}</small></td>
        <td><span class="cadence">{{ lead.cadence }}</span></td>
        <td><div class="tags"><span v-for="category in lead.categories" :key="category">{{ category }}</span></div></td>
        <td>{{ lead.createdAt }}</td>
        <td><div class="actions"><button type="button" :aria-label="`Edit ${lead.name}`" @click="$emit('edit', lead, $event.currentTarget as HTMLElement)">Edit</button><button type="button" class="danger" :aria-label="`Delete ${lead.name}`" @click="$emit('delete', lead, $event.currentTarget as HTMLElement)">Delete</button></div></td>
      </tr></tbody>
    </table>
  </div>
  <div class="lead-cards" aria-label="Lead directory cards">
    <article v-for="lead in leads" :key="lead.id">
      <header><div><strong>{{ lead.name }}</strong><a :href="`mailto:${lead.email}`">{{ lead.email }}</a></div><span class="cadence">{{ lead.cadence }}</span></header>
      <dl><div><dt>Company</dt><dd>{{ lead.company }}</dd></div><div><dt>Phone</dt><dd>{{ lead.phone }}</dd></div><div v-if="lead.location"><dt>Location</dt><dd>{{ lead.location.city }}<span v-if="lead.location.address"> · {{ lead.location.address }}</span></dd></div><div v-if="lead.website"><dt>Website</dt><dd>{{ lead.website }}</dd></div></dl>
      <div class="tags"><span v-for="category in lead.categories" :key="category">{{ category }}</span></div>
      <footer><small>Created {{ lead.createdAt }}</small><div class="actions"><button type="button" :aria-label="`Edit ${lead.name}`" @click="$emit('edit', lead, $event.currentTarget as HTMLElement)">Edit</button><button type="button" class="danger" :aria-label="`Delete ${lead.name}`" @click="$emit('delete', lead, $event.currentTarget as HTMLElement)">Delete</button></div></footer>
    </article>
  </div>
</template>
