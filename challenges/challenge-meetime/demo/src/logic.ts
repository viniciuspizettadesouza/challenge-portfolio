export interface Cadence {
  id: string;
  name: string;
}

export interface Lead {
  id: number;
  leadName: string;
  email: string;
  phone: string;
  cadence: string;
  createdAt: string;
}

export interface LeadDraft {
  name: string;
  email: string;
  phone: string;
  cadence: string;
}

export const cadences: Cadence[] = [
  { id: "outbound-smb", name: "Outbound SMB" },
  { id: "product-demo", name: "Product Demo" },
  { id: "enterprise-follow-up", name: "Enterprise Follow-up" },
];

export const initialLeads: Lead[] = [
  {
    id: 1,
    leadName: "Mariana Costa",
    email: "mariana@example.com",
    phone: "+55 48 99123-4401",
    cadence: "Product Demo",
    createdAt: "28 Jul 2026",
  },
  {
    id: 2,
    leadName: "Daniel Brooks",
    email: "daniel@example.com",
    phone: "+44 20 7946 0182",
    cadence: "Enterprise Follow-up",
    createdAt: "27 Jul 2026",
  },
  {
    id: 3,
    leadName: "Sofia Martins",
    email: "sofia@example.com",
    phone: "+351 21 555 0188",
    cadence: "Outbound SMB",
    createdAt: "26 Jul 2026",
  },
];

export function validateLead(draft: LeadDraft) {
  const errors: Partial<Record<keyof LeadDraft, string>> = {};

  if (draft.name.trim().length > 20) {
    errors.name = "Name must be at most 20 characters long";
  }
  if (!draft.email.trim()) {
    errors.email = "E-mail is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email.trim())) {
    errors.email = "Must be a valid e-mail";
  }
  if (!draft.phone.trim()) {
    errors.phone = "Phone is required";
  }
  if (!cadences.some(({ name }) => name === draft.cadence)) {
    errors.cadence = "Cadence is required";
  }

  return errors;
}

export function createLead(draft: LeadDraft, id: number): Lead {
  const errors = validateLead(draft);
  if (Object.keys(errors).length) {
    throw new Error(Object.values(errors)[0]);
  }

  return {
    id,
    leadName: draft.name.trim() || draft.email.trim().split("@")[0],
    email: draft.email.trim(),
    phone: draft.phone.trim(),
    cadence: draft.cadence,
    createdAt: "28 Jul 2026",
  };
}

export function updateLead(leads: Lead[], updated: Lead) {
  return leads.map((lead) => (lead.id === updated.id ? { ...updated } : lead));
}

export function deleteLead(leads: Lead[], id: number) {
  return leads.filter((lead) => lead.id !== id);
}
