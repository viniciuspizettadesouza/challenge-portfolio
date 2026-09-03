<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import {
  cadences,
  createLead,
  deleteLead,
  initialLeads,
  updateLead,
  validateLead,
  type Lead,
  type LeadDraft,
} from "./logic";

const STORAGE_KEY = "meetime-demo-leads";
const blankDraft = (): LeadDraft => ({ name: "", email: "", phone: "", cadence: "" });

const view = ref<"add" | "leads">("add");
const leads = ref<Lead[]>(initialLeads);
const draft = ref<LeadDraft>(blankDraft());
const touched = ref(false);
const submitStatus = ref("");
const editing = ref<Lead | null>(null);
const deleting = ref<Lead | null>(null);

const errors = computed(() => (touched.value ? validateLead(draft.value) : {}));

function persist(nextLeads: Lead[]) {
  leads.value = nextLeads;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextLeads));
}

function clearForm() {
  draft.value = blankDraft();
  touched.value = false;
  submitStatus.value = "";
}

function submitLead() {
  touched.value = true;
  if (Object.keys(errors.value).length) return;

  const lead = createLead(draft.value, Math.max(0, ...leads.value.map(({ id }) => id)) + 1);
  persist([lead, ...leads.value]);
  clearForm();
  submitStatus.value = "Thanks for your submission! The lead was added locally.";
}

function openEdit(lead: Lead) {
  editing.value = { ...lead };
}

function saveEdit() {
  if (!editing.value) return;
  const updated = {
    ...editing.value,
    leadName: editing.value.leadName.trim(),
    phone: editing.value.phone.trim(),
  };
  if (!updated.leadName || !updated.phone) return;
  persist(updateLead(leads.value, updated));
  editing.value = null;
}

function confirmDelete() {
  if (!deleting.value) return;
  persist(deleteLead(leads.value, deleting.value.id));
  deleting.value = null;
}

onMounted(() => {
  try {
    const cached = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
    if (Array.isArray(cached)) leads.value = cached;
  } catch {
    leads.value = initialLeads;
  }
});
</script>

<template>
  <section class="meetime-demo">
    <header class="meetime-toolbar">
      <button type="button" class="meetime-logo" @click="view = 'add'">
        <span aria-hidden="true">m</span>
        <strong>meetime</strong>
      </button>
      <nav aria-label="Meetime demo">
        <button type="button" :class="{ active: view === 'add' }" @click="view = 'add'">Add Leads</button>
        <button type="button" :class="{ active: view === 'leads' }" @click="view = 'leads'">List Leads</button>
      </nav>
    </header>

    <main>
      <section v-if="view === 'add'" class="lead-page">
        <header class="page-heading">
          <p>Prospecting workflow</p>
          <h2>Add lead</h2>
          <span>Private API replaced with local browser state</span>
        </header>

        <form class="lead-form" @submit.prevent="submitLead">
          <label>
            <span>Cadence *</span>
            <select v-model="draft.cadence" @blur="touched = true">
              <option value="" disabled>Select a cadence</option>
              <option v-for="cadence in cadences" :key="cadence.id" :value="cadence.name">{{ cadence.name }}</option>
            </select>
            <small v-if="errors.cadence">{{ errors.cadence }}</small>
          </label>

          <label>
            <span>Name</span>
            <input v-model="draft.name" maxlength="21" @blur="touched = true" />
            <em>{{ draft.name.length }} / 20</em>
            <small v-if="errors.name">{{ errors.name }}</small>
          </label>

          <label>
            <span>E-mail *</span>
            <input v-model="draft.email" type="email" @blur="touched = true" />
            <small v-if="errors.email">{{ errors.email }}</small>
          </label>

          <label>
            <span>Phone *</span>
            <input v-model="draft.phone" type="tel" @blur="touched = true" />
            <small v-if="errors.phone">{{ errors.phone }}</small>
          </label>

          <div class="form-actions">
            <button type="button" class="text-button" @click="clearForm">Clean</button>
            <button type="submit" class="primary-button">Submit</button>
          </div>
          <p v-if="submitStatus" class="submit-status" aria-live="polite">{{ submitStatus }}</p>
        </form>
      </section>

      <section v-else class="lead-page">
        <header class="page-heading page-heading--table">
          <div>
            <p>Local prospect database</p>
            <h2>List leads</h2>
          </div>
          <button type="button" class="primary-button" @click="view = 'add'">+ Add lead</button>
        </header>

        <div class="lead-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Created at</th>
                <th>Phone</th>
                <th>Cadence</th>
                <th><span class="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="lead in leads" :key="lead.id">
                <td>
                  <strong>{{ lead.leadName }}</strong>
                  <small>{{ lead.email }}</small>
                </td>
                <td>{{ lead.createdAt }}</td>
                <td>{{ lead.phone }}</td>
                <td><span class="cadence-chip">{{ lead.cadence }}</span></td>
                <td class="row-actions">
                  <button type="button" aria-label="Edit lead" title="Edit lead" @click="openEdit(lead)">✎</button>
                  <button type="button" aria-label="Delete lead" title="Delete lead" @click="deleting = lead">⌫</button>
                </td>
              </tr>
            </tbody>
          </table>
          <p v-if="leads.length === 0" class="empty-table">No leads remain. Add one to continue.</p>
          <footer>{{ leads.length }} local lead{{ leads.length === 1 ? '' : 's' }}</footer>
        </div>
      </section>
    </main>

    <div v-if="editing" class="dialog-backdrop" role="presentation" @click.self="editing = null">
      <form class="dialog-card" role="dialog" aria-modal="true" aria-labelledby="edit-title" @submit.prevent="saveEdit">
        <h3 id="edit-title">Edit Lead</h3>
        <label>Lead name<input v-model="editing.leadName" required /></label>
        <label>Lead created date<input v-model="editing.createdAt" required /></label>
        <label>Phone<input v-model="editing.phone" required /></label>
        <div>
          <button type="button" class="text-button" @click="editing = null">Cancel</button>
          <button type="submit" class="primary-button">Save</button>
        </div>
      </form>
    </div>

    <div v-if="deleting" class="dialog-backdrop" role="presentation" @click.self="deleting = null">
      <section class="dialog-card dialog-card--delete" role="dialog" aria-modal="true" aria-labelledby="delete-title">
        <h3 id="delete-title">Are you sure you want to delete this item?</h3>
        <p>{{ deleting.leadName }} will be removed from this local demo.</p>
        <div>
          <button type="button" class="text-button" @click="deleting = null">Cancel</button>
          <button type="button" class="danger-button" @click="confirmDelete">Delete</button>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.meetime-demo {
  --charcoal: #3c3c3c;
  --coral: #b83f3b;
  --ink: #313940;
  --muted: #59666f;
  --line: #dfe4e7;
  width: 100%;
  min-height: 43rem;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 1.15rem;
  color: var(--ink);
  background: #f7f8f9;
  font-family: Roboto, Arial, Helvetica, sans-serif;
}

.meetime-demo *,
.meetime-demo *::before,
.meetime-demo *::after {
  box-sizing: border-box;
}

.meetime-demo button,
.meetime-demo input,
.meetime-demo select {
  font: inherit;
}

.meetime-toolbar {
  display: flex;
  align-items: center;
  min-height: 3.7rem;
  padding: 0.55rem clamp(1rem, 4vw, 2.5rem);
  background: var(--charcoal);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
}

.meetime-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0;
  border: 0;
  color: white;
  background: transparent;
  cursor: pointer;
}

.meetime-logo span {
  display: grid;
  place-items: center;
  width: 1.9rem;
  height: 1.9rem;
  border-radius: 0.25rem 0.65rem 0.25rem 0.65rem;
  color: white;
  background: var(--coral);
  font-size: 1.25rem;
  font-weight: 900;
}

.meetime-logo strong {
  font-size: 1.15rem;
  letter-spacing: -0.04em;
}

.meetime-toolbar nav {
  display: flex;
  gap: 0.3rem;
  margin-left: auto;
}

.meetime-toolbar nav button {
  padding: 0.65rem 0.8rem;
  border: 0;
  border-bottom: 2px solid transparent;
  color: #d7d7d7;
  background: transparent;
  font-size: 0.7rem;
  font-weight: 750;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  cursor: pointer;
}

.meetime-toolbar nav button.active {
  border-color: var(--coral);
  color: white;
}

.meetime-demo main {
  max-width: 64rem;
  margin: 0 auto;
  padding: clamp(2rem, 5vw, 4rem) clamp(1rem, 4vw, 3rem);
}

.lead-page {
  width: 100%;
}

.page-heading {
  margin-bottom: 1.6rem;
}

.page-heading p,
.page-heading h2 {
  margin: 0;
}

.page-heading p {
  margin-bottom: 0.25rem;
  color: var(--coral);
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.page-heading h2 {
  font-size: clamp(2rem, 5vw, 3rem);
  letter-spacing: -0.05em;
}

.page-heading > span {
  display: inline-block;
  margin-top: 0.4rem;
  color: var(--muted);
  font-size: 0.72rem;
}

.page-heading--table {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 1rem;
}

.lead-form {
  display: grid;
  gap: 1rem;
  max-width: 42rem;
  padding: clamp(1rem, 3vw, 2rem);
  border: 1px solid var(--line);
  border-radius: 0.5rem;
  background: white;
  box-shadow: 0 10px 30px rgba(49, 57, 64, 0.06);
}

.lead-form label,
.dialog-card label {
  position: relative;
  display: grid;
  gap: 0.35rem;
  color: #66727b;
  font-size: 0.72rem;
  font-weight: 650;
}

.lead-form input,
.lead-form select,
.dialog-card input {
  width: 100%;
  padding: 0.78rem;
  border: 1px solid #bcc6cc;
  border-radius: 0.25rem;
  color: var(--ink);
  background: white;
  outline: 0;
}

.lead-form input:focus,
.lead-form select:focus,
.dialog-card input:focus {
  border-color: var(--coral);
  box-shadow: 0 0 0 2px rgba(240, 91, 86, 0.14);
}

.lead-form label em {
  position: absolute;
  right: 0.5rem;
  bottom: 0.65rem;
  color: #59666f;
  font-size: 0.58rem;
  font-style: normal;
}

.lead-form label small {
  color: #c53d39;
  font-size: 0.64rem;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.4rem;
}

.primary-button,
.danger-button,
.text-button {
  padding: 0.65rem 0.9rem;
  border: 0;
  border-radius: 0.25rem;
  font-size: 0.68rem;
  font-weight: 750;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  cursor: pointer;
}

.primary-button {
  color: white;
  background: var(--coral);
  box-shadow: 0 3px 8px rgba(240, 91, 86, 0.22);
}

.text-button {
  color: #68747c;
  background: transparent;
}

.danger-button {
  color: white;
  background: #c53d39;
}

.submit-status {
  margin: 0;
  padding: 0.75rem;
  border-radius: 0.25rem;
  color: #267153;
  background: #e8f7f0;
  font-size: 0.72rem;
}

.lead-table-wrap {
  overflow-x: auto;
  border: 1px solid var(--line);
  border-radius: 0.45rem;
  background: white;
  box-shadow: 0 10px 30px rgba(49, 57, 64, 0.06);
}

.lead-table-wrap table {
  width: 100%;
  min-width: 47rem;
  border-collapse: collapse;
  text-align: left;
}

.lead-table-wrap th,
.lead-table-wrap td {
  padding: 0.9rem 1rem;
  border-bottom: 1px solid #edf0f2;
  font-size: 0.73rem;
}

.lead-table-wrap th {
  color: #77838c;
  background: #f8f9fa;
  font-size: 0.62rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.lead-table-wrap td:first-child {
  display: grid;
  gap: 0.2rem;
}

.lead-table-wrap td small {
  color: var(--muted);
}

.cadence-chip {
  padding: 0.3rem 0.5rem;
  border-radius: 999px;
  color: #8d413e;
  background: #fff0ef;
  font-size: 0.62rem;
  font-weight: 700;
}

.row-actions {
  white-space: nowrap;
  text-align: right;
}

.row-actions button {
  padding: 0.35rem;
  border: 0;
  color: #6d7981;
  background: transparent;
  font-size: 1rem;
  cursor: pointer;
}

.lead-table-wrap footer,
.empty-table {
  margin: 0;
  padding: 0.8rem 1rem;
  color: var(--muted);
  background: #fafbfb;
  font-size: 0.65rem;
  text-align: right;
}

.empty-table {
  text-align: center;
}

.dialog-backdrop {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  place-items: center;
  padding: 1rem;
  background: rgba(25, 30, 34, 0.55);
}

.dialog-card {
  display: grid;
  gap: 1rem;
  width: min(30rem, 100%);
  padding: 1.5rem;
  border-radius: 0.4rem;
  background: white;
  box-shadow: 0 25px 70px rgba(0, 0, 0, 0.3);
}

.dialog-card h3,
.dialog-card p {
  margin: 0;
}

.dialog-card h3 {
  font-size: 1.3rem;
}

.dialog-card > div {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.dialog-card--delete p {
  color: var(--muted);
  font-size: 0.78rem;
}

.sr-only {
  position: absolute;
  overflow: hidden;
  width: 1px;
  height: 1px;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
}

@media (max-width: 540px) {
  .meetime-toolbar {
    align-items: flex-start;
    flex-direction: column;
    gap: 0.6rem;
  }

  .meetime-toolbar nav {
    margin-left: 0;
  }

  .page-heading--table {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
