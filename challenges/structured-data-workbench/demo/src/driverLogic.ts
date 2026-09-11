export type DriverFilter = "All" | "Selected" | "Unselected";

export interface Driver {
  id: number;
  name: string;
}

export const drivers: Driver[] = [
  { id: 1, name: "Sergio Perez" },
  { id: 2, name: "Max Verstappen" },
  { id: 3, name: "Lewis Hamilton" },
  { id: 4, name: "Lando Norris" },
  { id: 5, name: "Daniel Ricciardo" },
];

export function filterDrivers(
  items: Driver[],
  selectedIds: ReadonlySet<number>,
  filter: DriverFilter,
) {
  if (filter === "Selected") {
    return items.filter(({ id }) => selectedIds.has(id));
  }
  if (filter === "Unselected") {
    return items.filter(({ id }) => !selectedIds.has(id));
  }
  return items;
}

export function toggleDriver(
  selectedIds: ReadonlySet<number>,
  driverId: number,
) {
  const next = new Set(selectedIds);
  if (next.has(driverId)) next.delete(driverId);
  else next.add(driverId);
  return next;
}
