const base = import.meta.env.BASE_URL.replace(/\/$/, "");

export function withBase(path = "") {
  const suffix = path.replace(/^\/+/, "");
  return `${base}/${suffix}`;
}
