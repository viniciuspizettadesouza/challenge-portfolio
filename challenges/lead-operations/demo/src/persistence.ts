import { initialLeads, instructLeads, meetimeLeads, type Lead } from "./fixtures";

export const LEAD_STORAGE_KEY = "challenge-portfolio/lead-operations/v1";
export const LEGACY_MEETIME_STORAGE_KEY = "meetime-demo-leads";
export interface LeadState { version: 1; leads: Lead[] }
type StorageLike = Pick<Storage, "getItem" | "setItem">;

function isLead(value: unknown): value is Lead {
  if (!value || typeof value !== "object") return false;
  const lead = value as Partial<Lead>;
  return typeof lead.id === "string" && typeof lead.name === "string" && typeof lead.email === "string" && typeof lead.phone === "string" && typeof lead.company === "string" && Array.isArray(lead.categories) && lead.categories.every((item) => typeof item === "string") && typeof lead.cadence === "string" && typeof lead.createdAt === "string" && ["instruct", "meetime", "local"].includes(lead.origin ?? "");
}

export function readLeadState(storage?: StorageLike): LeadState | undefined {
  try {
    const value: unknown = JSON.parse(storage?.getItem(LEAD_STORAGE_KEY) ?? "null");
    if (!value || typeof value !== "object") return undefined;
    const state = value as Partial<LeadState>;
    return state.version === 1 && Array.isArray(state.leads) && state.leads.every(isLead) ? { version: 1, leads: state.leads } : undefined;
  } catch { return undefined; }
}

interface LegacyLead { id?: number; leadName?: string; email?: string; phone?: string; cadence?: string; createdAt?: string }

export function migrateLegacyLeads(value: unknown): Lead[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const migrated = value.flatMap((item: LegacyLead, index) => {
    if (!item || typeof item.email !== "string" || typeof item.phone !== "string" || typeof item.cadence !== "string") return [];
    const fixture = meetimeLeads.find(({ email }) => email.toLocaleLowerCase() === item.email!.toLocaleLowerCase());
    return [{
      ...(fixture ?? { company: "Independent prospect", categories: ["uncategorized"] }),
      id: fixture?.id ?? `local-${index + 1}`,
      name: typeof item.leadName === "string" && item.leadName.trim() ? item.leadName.trim() : item.email.split("@")[0],
      email: item.email.trim(), phone: item.phone.trim(), cadence: item.cadence,
      createdAt: typeof item.createdAt === "string" ? item.createdAt : "Imported locally", origin: fixture ? "meetime" as const : "local" as const,
    }];
  });
  const unique = migrated.filter((lead, index) => migrated.findIndex(({ email }) => email.toLocaleLowerCase() === lead.email.toLocaleLowerCase()) === index);
  return [...instructLeads.map((lead) => ({ ...lead, categories: [...lead.categories] })), ...unique];
}

export function loadLeads(storage?: StorageLike) {
  const saved = readLeadState(storage);
  if (saved) return { leads: saved.leads, source: "saved" as const };
  try {
    const raw = storage?.getItem(LEGACY_MEETIME_STORAGE_KEY);
    const migrated = raw === null || raw === undefined ? undefined : migrateLegacyLeads(JSON.parse(raw));
    if (migrated) {
      writeLeadState(storage, migrated);
      return { leads: migrated, source: "migrated" as const };
    }
  } catch { /* fall through to fixtures */ }
  return { leads: initialLeads.map((lead) => ({ ...lead, categories: [...lead.categories] })), source: "fixtures" as const };
}

export function writeLeadState(storage: StorageLike | undefined, leads: Lead[]) {
  try { storage?.setItem(LEAD_STORAGE_KEY, JSON.stringify({ version: 1, leads } satisfies LeadState)); return Boolean(storage); }
  catch { return false; }
}
