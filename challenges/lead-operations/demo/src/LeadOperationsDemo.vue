<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from "vue";
import { initialLeads, type Lead, type LeadDraft } from "./fixtures";
import { createLead, deleteLead, filterLeads, getCategoryOptions, nextLeadId, updateLead } from "./logic";
import { loadLeads, writeLeadState } from "./persistence";
import LeadDirectory from "./LeadDirectory.vue";
import LeadFormDialog from "./LeadFormDialog.vue";
import "./styles.css";

const leads = ref<Lead[]>(initialLeads);
const query = ref(""); const selectedCategory = ref(""); const categories = ref<string[]>([]);
const formOpen = ref(false); const editing = ref<Lead | null>(null); const deleting = ref<Lead | null>(null);
const deleteDialog = ref<HTMLDialogElement>(); const status = ref(""); let opener: HTMLElement | null = null;
const filtered = computed(() => filterLeads(leads.value, query.value, categories.value));
const categoryOptions = computed(() => getCategoryOptions(leads.value).filter((item) => !categories.value.includes(item)));
function remember(element?: HTMLElement) { opener = element ?? document.activeElement as HTMLElement; }
function addCategory() { if (selectedCategory.value) categories.value.push(selectedCategory.value); selectedCategory.value = ""; }
function clearFilters() { query.value = ""; categories.value = []; }
function openAdd(event: Event) { remember(event.currentTarget as HTMLElement); editing.value = null; formOpen.value = true; }
function openEdit(lead: Lead, element: HTMLElement) { remember(element); editing.value = lead; formOpen.value = true; }
async function closeForm() { formOpen.value = false; editing.value = null; await nextTick(); opener?.focus(); }
function persist(next: Lead[]) { leads.value = next; if (!writeLeadState(window.localStorage, next)) status.value = "Changes remain available for this visit, but browser storage is unavailable."; }
function save(draft: LeadDraft) {
  if (editing.value) { persist(updateLead(leads.value, { ...editing.value, ...draft })); status.value = `${draft.name} was updated.`; }
  else { const lead = createLead(draft, nextLeadId(leads.value), new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(new Date())); persist([lead, ...leads.value]); clearFilters(); status.value = `${lead.name} was added.`; }
  closeForm();
}
function openDelete(lead: Lead, element: HTMLElement) { remember(element); deleting.value = lead; nextTick(() => deleteDialog.value?.showModal()); }
async function closeDelete() { deleteDialog.value?.close(); deleting.value = null; await nextTick(); opener?.focus(); }
function confirmDelete() { if (!deleting.value) return; const name = deleting.value.name; persist(deleteLead(leads.value, deleting.value.id)); status.value = `${name} was deleted.`; closeDelete(); }
onMounted(() => { const loaded = loadLeads(window.localStorage); leads.value = loaded.leads; if (loaded.source === "saved") status.value = "Restored your saved lead workspace from this browser."; if (loaded.source === "migrated") status.value = "Imported your saved Sales Lead Management records."; });
</script>

<template>
  <section class="lead-ops">
    <header class="workspace-hero"><div class="brand"><span aria-hidden="true">LO</span><div><strong>Lead Operations</strong><small>Local prospect workspace</small></div></div><div><p>Business operations</p><h2>Turn prospects into conversations.</h2><span>Search, qualify, and assign every lead from one private browser workspace.</span></div><button type="button" class="primary" @click="openAdd">+ Add lead</button></header>
    <main>
      <section class="summary" aria-label="Lead summary"><div><strong>{{ leads.length }}</strong><span>Total leads</span></div><div><strong>{{ filtered.length }}</strong><span>Matching</span></div><div><strong>{{ categories.length }}</strong><span>Active categories</span></div></section>
      <section class="workspace-panel" aria-labelledby="directory-heading">
        <header class="section-heading"><div><p>Prospect database</p><h3 id="directory-heading">Lead directory</h3></div><button type="button" class="primary compact-add" @click="openAdd">+ Add lead</button></header>
        <div class="filters"><label><span>Contact or company</span><input v-model="query" type="search" placeholder="Search contact or company..." /></label><label><span>Company category</span><select v-model="selectedCategory" @change="addCategory"><option value="">Add a category...</option><option v-for="category in categoryOptions" :key="category">{{ category }}</option></select></label><button v-if="query || categories.length" type="button" class="secondary clear" @click="clearFilters">Clear filters</button></div>
        <div v-if="categories.length" class="active-tags" aria-label="Active category filters"><button v-for="category in categories" :key="category" type="button" @click="categories = categories.filter((item) => item !== category)">{{ category }} <span aria-hidden="true">×</span><span class="sr-only">Remove filter</span></button></div>
        <LeadDirectory v-if="filtered.length" :leads="filtered" @edit="openEdit" @delete="openDelete" />
        <div v-else-if="leads.length" class="empty"><strong>No leads match these filters.</strong><span>Try another contact, company, or category combination.</span><button type="button" class="secondary" @click="clearFilters">Clear filters</button></div>
        <div v-else class="empty"><strong>Your lead directory is empty.</strong><span>Add a prospect to restart the local workflow.</span><button type="button" class="primary" @click="openAdd">Add your first lead</button></div>
      </section>
      <p class="workspace-status" aria-live="polite">{{ status }}</p>
      <footer class="privacy-note">All records stay in this browser. Historical private APIs are never contacted.</footer>
    </main>
    <LeadFormDialog :open="formOpen" :lead="editing" @cancel="closeForm" @save="save" />
    <dialog ref="deleteDialog" class="lead-dialog delete-dialog" aria-labelledby="delete-title" @cancel.prevent="closeDelete" @close="deleting && closeDelete()"><section v-if="deleting"><p>Confirm removal</p><h3 id="delete-title">Delete {{ deleting.name }}?</h3><span>This removes the lead from this local browser workspace.</span><footer><button type="button" class="secondary" @click="closeDelete">Cancel</button><button type="button" class="danger-solid" @click="confirmDelete">Delete lead</button></footer></section></dialog>
  </section>
</template>
