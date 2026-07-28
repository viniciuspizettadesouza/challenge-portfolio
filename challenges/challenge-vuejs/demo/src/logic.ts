export function getTotalPages(itemCount: number, pageSize: number) {
  if (pageSize <= 0) throw new Error("Page size must be greater than zero.");
  return Math.max(1, Math.ceil(itemCount / pageSize));
}

export function clampPage(page: number, itemCount: number, pageSize: number) {
  return Math.min(Math.max(1, page), getTotalPages(itemCount, pageSize));
}

export function paginate<T>(items: T[], page: number, pageSize: number) {
  const safePage = clampPage(page, items.length, pageSize);
  const start = (safePage - 1) * pageSize;
  return items.slice(start, start + pageSize);
}
