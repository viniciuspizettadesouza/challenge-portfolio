export interface EmissionResult {
  entityId: number;
  categoryId: number;
  kco2e: number;
}

export interface Organisation {
  id: number;
  name: string;
  numberOfEmployees: number;
  turnover: number;
}

export interface Category {
  id: number;
  name: string;
  categoryId: number | null;
  scope?: string;
}

export interface OrganisationEmission {
  id: number;
  name: string;
  value: number;
  percentage: number;
}

export const organisations: Organisation[] = [
  {
    id: 1,
    name: "Climateseed",
    numberOfEmployees: 100,
    turnover: 1_000_000_000,
  },
  { id: 2, name: "Acme Corp", numberOfEmployees: 10, turnover: 20_000 },
  { id: 3, name: "Fast Co2", numberOfEmployees: 50, turnover: 35_000 },
];

export const categories: Category[] = [
  { id: 1, name: "Travel", categoryId: null },
  { id: 2, name: "Business travel", categoryId: 1, scope: "Scope 2" },
  { id: 3, name: "Vehicle fleet", categoryId: 1, scope: "Scope 2" },
  { id: 4, name: "Digital", categoryId: null },
  { id: 5, name: "Website", categoryId: 4, scope: "Scope 1" },
  { id: 6, name: "Videoconference", categoryId: 4, scope: "Scope 2" },
  { id: 7, name: "IT equipment", categoryId: 4, scope: "Scope 3" },
];

export const initialResults: EmissionResult[] = [
  { entityId: 1, categoryId: 2, kco2e: 10_000 },
  { entityId: 1, categoryId: 2, kco2e: 155 },
  { entityId: 1, categoryId: 3, kco2e: 120 },
  { entityId: 1, categoryId: 5, kco2e: 1 },
  { entityId: 1, categoryId: 6, kco2e: 90 },
  { entityId: 1, categoryId: 7, kco2e: 1_500 },
  { entityId: 2, categoryId: 2, kco2e: 800 },
  { entityId: 2, categoryId: 2, kco2e: 100 },
  { entityId: 2, categoryId: 3, kco2e: 126 },
  { entityId: 2, categoryId: 5, kco2e: 20 },
  { entityId: 2, categoryId: 6, kco2e: 60 },
  { entityId: 2, categoryId: 7, kco2e: 1_200 },
  { entityId: 3, categoryId: 2, kco2e: 1_050 },
  { entityId: 3, categoryId: 2, kco2e: 155 },
  { entityId: 3, categoryId: 3, kco2e: 120 },
  { entityId: 3, categoryId: 5, kco2e: 1 },
  { entityId: 3, categoryId: 6, kco2e: 90 },
  { entityId: 3, categoryId: 7, kco2e: 1_500 },
];

export function aggregateByOrganisation(
  results: EmissionResult[],
  availableOrganisations: Organisation[],
): OrganisationEmission[] {
  const totals = new Map(availableOrganisations.map(({ id }) => [id, 0]));

  for (const result of results) {
    if (!totals.has(result.entityId)) {
      continue;
    }

    totals.set(result.entityId, (totals.get(result.entityId) ?? 0) + result.kco2e);
  }

  const totalEmissions = [...totals.values()].reduce((sum, value) => sum + value, 0);

  return availableOrganisations.map(({ id, name }) => {
    const value = totals.get(id) ?? 0;

    return {
      id,
      name,
      value,
      percentage: totalEmissions === 0 ? 0 : (value / totalEmissions) * 100,
    };
  });
}

export function createEmissionResult(
  entityId: number,
  categoryId: number,
  kco2e: number,
): EmissionResult {
  if (!organisations.some(({ id }) => id === entityId)) {
    throw new Error("Select a valid organisation.");
  }

  if (!categories.some(({ id }) => id === categoryId && id !== 1 && id !== 4)) {
    throw new Error("Select a valid emissions category.");
  }

  if (!Number.isFinite(kco2e) || kco2e <= 0) {
    throw new Error("Emissions must be greater than zero.");
  }

  return { entityId, categoryId, kco2e };
}
