import { cadences, type Lead, type LeadDraft } from "./fixtures";

export type LeadErrors = Partial<Record<keyof LeadDraft, string>>;

export function normalize(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLocaleLowerCase();
}

export function getCategoryOptions(items: Lead[]) {
  return [...new Set(items.flatMap(({ categories }) => categories))].sort((a, b) => a.localeCompare(b));
}

export function filterLeads(items: Lead[], query: string, categories: string[]) {
  const term = normalize(query);
  return items.filter((lead) => {
    const matchesQuery = !term || [lead.name, lead.email, lead.company].some((value) => normalize(value).includes(term));
    return matchesQuery && categories.every((category) => lead.categories.includes(category));
  });
}

export function validateLead(draft: LeadDraft): LeadErrors {
  const errors: LeadErrors = {};
  if (!draft.name.trim()) errors.name = "Name is required.";
  else if (draft.name.trim().length > 60) errors.name = "Name must be at most 60 characters.";
  if (!draft.email.trim()) errors.email = "E-mail is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email.trim())) errors.email = "Enter a valid e-mail address.";
  if (!draft.phone.trim()) errors.phone = "Phone is required.";
  if (!draft.company.trim()) errors.company = "Company is required.";
  if (!draft.categories.length || draft.categories.some((item) => !item.trim())) errors.categories = "Add at least one category.";
  if (!(cadences as readonly string[]).includes(draft.cadence)) errors.cadence = "Select a cadence.";
  return errors;
}

export function nextLeadId(items: Lead[]) {
  const maximum = items.reduce((result, { id }) => Math.max(result, Number(id.match(/^local-(\d+)$/)?.[1] ?? 0)), 0);
  return `local-${maximum + 1}`;
}

export function createLead(draft: LeadDraft, id: string, createdAt: string): Lead {
  const errors = validateLead(draft);
  if (Object.keys(errors).length) throw new Error(Object.values(errors)[0]);
  return { id, name: draft.name.trim(), email: draft.email.trim(), phone: draft.phone.trim(), company: draft.company.trim(), categories: draft.categories.map((item) => normalize(item)).filter(Boolean), cadence: draft.cadence, createdAt, origin: "local" };
}

export function updateLead(items: Lead[], updated: Lead) {
  return items.map((lead) => lead.id === updated.id ? { ...updated, categories: [...updated.categories] } : lead);
}

export function deleteLead(items: Lead[], id: string) {
  return items.filter((lead) => lead.id !== id);
}
