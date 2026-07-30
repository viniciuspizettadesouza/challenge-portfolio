import payload from "../../original/backend/public/events.json";

export interface EventImage {
  url: string;
  mime_type: string;
}

export interface EventRecord {
  id: string;
  name: string;
  slug: string;
  category: string;
  status: string;
  has_live: boolean;
  starts_at: string;
  ends_at: string;
  location: {
    country: string;
    location: string;
    name: string;
  };
  theme: {
    background_image: EventImage;
    accent_colour: string;
  };
  price_range: {
    minimum: { amount: number; currency: string };
    maximum: { amount: number; currency: string };
  };
}

export const events = payload.data as EventRecord[];

export function filterEvents(items: EventRecord[], query: string) {
  const normalized = query.trim().toLocaleLowerCase();
  if (!normalized) return items;
  return items.filter(
    ({ name, category, location }) =>
      name.toLocaleLowerCase().includes(normalized) ||
      category.toLocaleLowerCase().includes(normalized) ||
      location.name.toLocaleLowerCase().includes(normalized) ||
      location.country.toLocaleLowerCase().includes(normalized),
  );
}

export function findEvent(slug: string) {
  return events.find((event) => event.slug === slug);
}

export function formatEventPrice(event: EventRecord) {
  const { minimum, maximum } = event.price_range;
  const currency = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: minimum.currency,
    maximumFractionDigits: 0,
  });
  if (minimum.amount === 0 && maximum.amount === 0) return "Free";
  if (minimum.amount === maximum.amount) return currency.format(minimum.amount);
  return `${currency.format(minimum.amount)}–${currency.format(maximum.amount)}`;
}

export function formatEventDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}
