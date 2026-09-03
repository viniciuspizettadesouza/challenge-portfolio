<script setup lang="ts">
import { computed, ref } from "vue";
import { filterLeads, getCategoryOptions, leads } from "./logic";

const nameQuery = ref("");
const selectedCategory = ref("");
const categories = ref<string[]>([]);
const categoryOptions = getCategoryOptions(leads);
const filteredLeads = computed(() => filterLeads(leads, nameQuery.value, categories.value));

function addCategory() {
  if (selectedCategory.value && !categories.value.includes(selectedCategory.value)) {
    categories.value.push(selectedCategory.value);
  }
  selectedCategory.value = "";
}

function removeCategory(category: string) {
  categories.value = categories.value.filter((item) => item !== category);
}
</script>

<template>
  <section class="instruct-demo">
    <header class="vough-header">
      <div class="vough-brand">
        <span class="vough-mark" aria-hidden="true"><i></i><b></b></span>
        <strong>vough</strong>
      </div>
      <div class="header-copy">
        <p>Sales workspace</p>
        <span>Local fixture · 10 contacts</span>
      </div>
    </header>

    <div class="leads-heading">
      <div>
        <p>Potential customers</p>
        <h2>Leads</h2>
      </div>
      <div class="result-count">
        <strong>{{ filteredLeads.length }}</strong>
        <span>matching leads</span>
      </div>
    </div>

    <div class="filters">
      <label>
        <span>Contact name</span>
        <div class="input-wrap">
          <i aria-hidden="true">⌕</i>
          <input v-model="nameQuery" type="search" placeholder="Search name..." />
        </div>
      </label>
      <label>
        <span>Company category</span>
        <select v-model="selectedCategory" @change="addCategory">
          <option value="">Add a category...</option>
          <option v-for="category in categoryOptions" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </label>
      <button
        v-if="nameQuery || categories.length"
        type="button"
        class="clear-button"
        @click="
          nameQuery = '';
          categories = [];
        "
      >
        Clear filters
      </button>
    </div>

    <div v-if="categories.length" class="category-chips" aria-label="Active categories">
      <button
        v-for="category in categories"
        :key="category"
        type="button"
        @click="removeCategory(category)"
      >
        {{ category }} <span aria-hidden="true">×</span>
      </button>
    </div>

    <div class="lead-table-wrap">
      <table>
        <thead>
          <tr>
            <th>Contact</th>
            <th>Company</th>
            <th>Location</th>
            <th>Phone</th>
            <th>Categories</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="lead in filteredLeads" :key="lead.id">
            <td>
              <div class="contact-cell">
                <span>{{ lead.name.charAt(0) }}</span>
                <div>
                  <strong>{{ lead.name }}</strong>
                  <a :href="`mailto:${lead.email}`">{{ lead.email }}</a>
                </div>
              </div>
            </td>
            <td>
              <strong>{{ lead.company.name }}</strong>
              <small>{{ lead.website }}</small>
            </td>
            <td>
              <strong>{{ lead.address.city }}</strong>
              <small>{{ lead.address.street }}, {{ lead.address.suite }}</small>
            </td>
            <td>{{ lead.phone }}</td>
            <td>
              <div class="row-tags">
                <span v-for="category in lead.company.bs.split(/\s+/)" :key="category">
                  {{ category }}
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="filteredLeads.length === 0" class="empty-results">
        <strong>No leads match these filters.</strong>
        <span>Remove a category or try another contact name.</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.instruct-demo {
  --dark: #180f50;
  --purple: #3113f2;
  --blue: #3d9df2;
  --mint: #5ef2d7;
  --grey: #ecf0f1;
  display: grid;
  gap: 1.1rem;
  width: 100%;
  overflow: hidden;
  border: 1px solid #e4e7ea;
  border-radius: 1.25rem;
  color: var(--dark);
  background: #fbfcfc;
  font-family:
    Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.vough-header,
.leads-heading,
.filters,
.contact-cell,
.header-copy,
.result-count {
  display: flex;
  align-items: center;
}

.vough-header {
  justify-content: space-between;
  padding: 1.1rem clamp(1rem, 4vw, 2rem);
  color: white;
  background: var(--dark);
}

.vough-brand {
  display: flex;
  align-items: center;
  gap: 0.55rem;
}

.vough-brand > strong {
  font-size: 1.35rem;
  letter-spacing: -0.06em;
}

.vough-mark {
  position: relative;
  display: block;
  width: 2rem;
  height: 1.65rem;
}

.vough-mark::before,
.vough-mark i,
.vough-mark b {
  position: absolute;
  display: block;
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 0.25rem 0.75rem 0.25rem 0.75rem;
  content: "";
  transform: rotate(45deg);
}

.vough-mark::before {
  left: 0;
  background: var(--purple);
}

.vough-mark i {
  right: 0;
  background: var(--mint);
}

.vough-mark b {
  top: 0.35rem;
  left: 0.4rem;
  background: var(--blue);
}

.header-copy {
  gap: 0.8rem;
}

.header-copy p,
.header-copy span {
  margin: 0;
  font-size: 0.7rem;
}

.header-copy p {
  font-weight: 800;
}

.header-copy span {
  padding-left: 0.8rem;
  border-left: 1px solid rgba(255, 255, 255, 0.25);
  color: #c8c3e8;
}

.leads-heading {
  justify-content: space-between;
  padding: 0.75rem clamp(1rem, 4vw, 2rem) 0;
}

.leads-heading p,
.leads-heading h2 {
  margin: 0;
}

.leads-heading p {
  margin-bottom: 0.25rem;
  color: var(--purple);
  font-size: 0.68rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.leads-heading h2 {
  font-size: clamp(1.8rem, 4vw, 2.5rem);
}

.result-count {
  gap: 0.5rem;
  padding: 0.55rem 0.75rem;
  border-radius: 0.6rem;
  background: var(--grey);
}

.result-count strong {
  color: var(--purple);
  font-size: 1.2rem;
}

.result-count span {
  color: #5b586c;
  font-size: 0.68rem;
}

.filters {
  align-items: flex-end;
  gap: 0.75rem;
  padding: 0 clamp(1rem, 4vw, 2rem);
}

.filters label {
  display: grid;
  gap: 0.35rem;
  width: min(16rem, 40%);
  color: #6e6b83;
  font-size: 0.68rem;
  font-weight: 800;
}

.input-wrap {
  position: relative;
}

.input-wrap i {
  position: absolute;
  top: 50%;
  left: 0.75rem;
  color: #807d90;
  font-size: 1rem;
  transform: translateY(-50%);
}

.filters input,
.filters select,
.clear-button {
  min-height: 2.7rem;
  border: 1px solid transparent;
  border-radius: 0.45rem;
  font: inherit;
}

.filters input,
.filters select {
  width: 100%;
  padding: 0 0.75rem;
  color: var(--dark);
  background: var(--grey);
}

.filters input {
  padding-left: 2.2rem;
}

.filters input:focus,
.filters select:focus {
  border-color: var(--purple);
  outline: 3px solid rgba(49, 19, 242, 0.1);
}

.clear-button {
  padding: 0 0.85rem;
  color: var(--purple);
  background: #eeeaff;
  font-weight: 800;
  cursor: pointer;
}

.category-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0 clamp(1rem, 4vw, 2rem);
}

.category-chips button {
  padding: 0.45rem 0.65rem;
  border: 0;
  border-radius: 0.4rem;
  color: var(--dark);
  background: var(--mint);
  font: inherit;
  font-size: 0.68rem;
  font-weight: 800;
  cursor: pointer;
}

.category-chips span {
  margin-left: 0.3rem;
}

.lead-table-wrap {
  overflow: auto;
  margin: 0 clamp(1rem, 4vw, 2rem) 2rem;
  border-radius: 0.75rem;
  box-shadow: 0 14px 35px rgba(24, 15, 80, 0.08);
}

table {
  width: 100%;
  min-width: 58rem;
  border-collapse: collapse;
  background: white;
}

th,
td {
  padding: 0.85rem 1rem;
  border-bottom: 1px solid #eef0f1;
  font-size: 0.72rem;
  text-align: left;
}

th {
  color: white;
  background: var(--dark);
  font-size: 0.65rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

tbody tr:hover {
  background: #effdf9;
}

.contact-cell {
  gap: 0.65rem;
}

.contact-cell > span {
  display: grid;
  place-items: center;
  flex: 0 0 auto;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  color: white;
  background: linear-gradient(145deg, var(--purple), var(--blue));
  font-weight: 900;
}

.contact-cell div,
td:nth-child(2),
td:nth-child(3) {
  display: grid;
  gap: 0.2rem;
}

.contact-cell a,
td small {
  color: #5b586c;
  font-size: 0.64rem;
  text-decoration: none;
}

.row-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}

.row-tags span {
  padding: 0.25rem 0.4rem;
  border-radius: 0.3rem;
  color: var(--purple);
  background: #eeeaff;
  font-size: 0.58rem;
  font-weight: 800;
}

.empty-results {
  display: grid;
  justify-items: center;
  gap: 0.35rem;
  min-width: 58rem;
  padding: 3rem;
  color: #77758b;
  background: white;
}

.empty-results strong {
  color: var(--dark);
}

.empty-results span {
  font-size: 0.72rem;
}

@media (max-width: 680px) {
  .vough-header,
  .leads-heading,
  .filters {
    align-items: flex-start;
    flex-direction: column;
  }

  .header-copy {
    align-items: flex-start;
    flex-direction: column;
    gap: 0.25rem;
  }

  .header-copy span {
    padding-left: 0;
    border-left: 0;
  }

  .result-count {
    align-self: stretch;
  }

  .filters label {
    width: 100%;
  }
}
</style>
