<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { cadences, type Lead, type LeadDraft } from "./fixtures";
import { validateLead } from "./logic";

const props = defineProps<{ lead: Lead | null; open: boolean }>();
const emit = defineEmits<{ cancel: []; save: [draft: LeadDraft] }>();
const dialog = ref<HTMLDialogElement>();
const touched = ref(false);
const categoryText = ref("");
const blank = (): LeadDraft => ({ name: "", email: "", phone: "", company: "", categories: [], cadence: "" });
const draft = ref<LeadDraft>(blank());
const errors = computed(() => touched.value ? validateLead({ ...draft.value, categories: parseCategories() }) : {});

function parseCategories() { return [...new Set(categoryText.value.split(",").map((item) => item.trim().toLocaleLowerCase()).filter(Boolean))]; }
function reset() {
  draft.value = props.lead ? { name: props.lead.name, email: props.lead.email, phone: props.lead.phone, company: props.lead.company, categories: [...props.lead.categories], cadence: props.lead.cadence } : blank();
  categoryText.value = draft.value.categories.join(", "); touched.value = false;
}
function submit() {
  touched.value = true; const candidate = { ...draft.value, categories: parseCategories() };
  if (!Object.keys(validateLead(candidate)).length) emit("save", candidate);
}
watch(() => props.open, async (open) => { if (open) { reset(); await nextTick(); if (!dialog.value?.open) dialog.value?.showModal(); } else if (dialog.value?.open) dialog.value.close(); });
onMounted(() => { if (props.open) { reset(); dialog.value?.showModal(); } });
</script>

<template>
  <dialog ref="dialog" class="lead-dialog" :aria-labelledby="lead ? 'edit-lead-title' : 'add-lead-title'" @cancel.prevent="emit('cancel')" @close="open && emit('cancel')">
    <form method="dialog" @submit.prevent="submit">
      <header><div><p>{{ lead ? "Update prospect" : "New prospect" }}</p><h3 :id="lead ? 'edit-lead-title' : 'add-lead-title'">{{ lead ? "Edit lead" : "Add lead" }}</h3></div><button type="button" class="icon-button" aria-label="Close lead form" @click="emit('cancel')">×</button></header>
      <div class="form-grid">
        <label><span>Name *</span><input v-model="draft.name" maxlength="60" @blur="touched = true" /><small v-if="errors.name">{{ errors.name }}</small></label>
        <label><span>E-mail *</span><input v-model="draft.email" type="email" @blur="touched = true" /><small v-if="errors.email">{{ errors.email }}</small></label>
        <label><span>Phone *</span><input v-model="draft.phone" type="tel" @blur="touched = true" /><small v-if="errors.phone">{{ errors.phone }}</small></label>
        <label><span>Company *</span><input v-model="draft.company" maxlength="80" @blur="touched = true" /><small v-if="errors.company">{{ errors.company }}</small></label>
        <label><span>Cadence *</span><select v-model="draft.cadence" @blur="touched = true"><option value="" disabled>Select a cadence</option><option v-for="cadence in cadences" :key="cadence">{{ cadence }}</option></select><small v-if="errors.cadence">{{ errors.cadence }}</small></label>
        <label><span>Categories * <em>comma separated</em></span><input v-model="categoryText" placeholder="saas, enterprise" @blur="touched = true" /><small v-if="errors.categories">{{ errors.categories }}</small></label>
      </div>
      <footer><button type="button" class="secondary" @click="emit('cancel')">Cancel</button><button type="submit" class="primary">{{ lead ? "Save changes" : "Add lead" }}</button></footer>
    </form>
  </dialog>
</template>
