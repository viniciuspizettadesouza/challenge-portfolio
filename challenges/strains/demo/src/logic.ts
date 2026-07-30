export type StrainType = "Hybrid" | "Indica" | "Sativa";

export interface Strain {
  slug: string;
  name: string;
  type: StrainType;
  summary: string;
  thc: [number, number];
  cbg: [number, number];
  indica: number;
  sativa: number;
  aromas: string[];
  flavours: string[];
  accent: string;
}

export interface StrainFilters {
  query: string;
  initial: string;
  type: StrainType | "All";
}

export const strains: Strain[] = [
  {
    slug: "acapulco-gold",
    name: "Acapulco Gold",
    type: "Sativa",
    summary:
      "A classic cultivar represented here with a bright citrus profile and a balanced directory record.",
    thc: [18, 25],
    cbg: [0, 1],
    indica: 20,
    sativa: 80,
    aromas: ["Earthy", "Coffee", "Citrus"],
    flavours: ["Sweet", "Spice", "Orange"],
    accent: "#efb84d",
  },
  {
    slug: "blue-dream",
    name: "Blue Dream",
    type: "Hybrid",
    summary:
      "A fruit-forward hybrid entry used to demonstrate a complete strain card and detail profile.",
    thc: [17, 24],
    cbg: [0, 1],
    indica: 40,
    sativa: 60,
    aromas: ["Berry", "Herbal", "Floral"],
    flavours: ["Blueberry", "Vanilla", "Herbs"],
    accent: "#7b83d6",
  },
  {
    slug: "cannatonic",
    name: "Cannatonic",
    type: "Hybrid",
    summary:
      "A balanced directory fixture with pine notes and an intentionally moderate composition range.",
    thc: [7, 12],
    cbg: [1, 2],
    indica: 50,
    sativa: 50,
    aromas: ["Pine", "Wood", "Citrus"],
    flavours: ["Herbal", "Lemon", "Earth"],
    accent: "#6d9a72",
  },
  {
    slug: "durban-poison",
    name: "Durban Poison",
    type: "Sativa",
    summary:
      "A crisp anise-and-pine record that exercises the alphabetical filtering controls.",
    thc: [16, 25],
    cbg: [0, 1],
    indica: 0,
    sativa: 100,
    aromas: ["Pine", "Anise", "Sweet"],
    flavours: ["Herbal", "Spice", "Citrus"],
    accent: "#487b50",
  },
  {
    slug: "granddaddy-purple",
    name: "Granddaddy Purple",
    type: "Indica",
    summary:
      "A deep berry fixture with a strongly indica composition and a contrasting purple palette.",
    thc: [17, 23],
    cbg: [0, 1],
    indica: 80,
    sativa: 20,
    aromas: ["Grape", "Berry", "Floral"],
    flavours: ["Plum", "Grape", "Herbs"],
    accent: "#80629d",
  },
  {
    slug: "harlequin",
    name: "Harlequin",
    type: "Sativa",
    summary:
      "A mango-and-wood directory record with a lower THC range for visual comparison.",
    thc: [4, 10],
    cbg: [1, 2],
    indica: 25,
    sativa: 75,
    aromas: ["Mango", "Wood", "Earthy"],
    flavours: ["Tropical", "Herbal", "Sweet"],
    accent: "#d88658",
  },
  {
    slug: "ice-cream-cake",
    name: "Ice Cream Cake",
    type: "Indica",
    summary:
      "A vanilla-led fixture that demonstrates a high-range indica record in the directory.",
    thc: [20, 25],
    cbg: [0, 1],
    indica: 75,
    sativa: 25,
    aromas: ["Vanilla", "Cream", "Earthy"],
    flavours: ["Vanilla", "Sugar", "Nutty"],
    accent: "#b77d8e",
  },
  {
    slug: "jack-herer",
    name: "Jack Herer",
    type: "Sativa",
    summary:
      "A pine-and-pepper record named for the well-known cultivar and used here as local fixture data.",
    thc: [18, 24],
    cbg: [0, 1],
    indica: 30,
    sativa: 70,
    aromas: ["Pine", "Pepper", "Herbal"],
    flavours: ["Spice", "Wood", "Citrus"],
    accent: "#4d876d",
  },
  {
    slug: "kush-mints",
    name: "Kush Mints",
    type: "Hybrid",
    summary:
      "A mint-and-coffee hybrid record with an even composition and cool green accent.",
    thc: [20, 28],
    cbg: [0, 1],
    indica: 50,
    sativa: 50,
    aromas: ["Mint", "Coffee", "Earthy"],
    flavours: ["Mint", "Chocolate", "Herbs"],
    accent: "#4d9a8a",
  },
  {
    slug: "northern-lights",
    name: "Northern Lights",
    type: "Indica",
    summary:
      "A pine-and-floral fixture with a strongly indica composition and a night-sky palette.",
    thc: [16, 21],
    cbg: [0, 1],
    indica: 90,
    sativa: 10,
    aromas: ["Pine", "Floral", "Earthy"],
    flavours: ["Sweet", "Spice", "Wood"],
    accent: "#536ba1",
  },
  {
    slug: "orange-crush",
    name: "Orange Crush",
    type: "Hybrid",
    summary:
      "A citrus-first directory fixture that makes the type and initial controls easy to verify.",
    thc: [15, 22],
    cbg: [0, 1],
    indica: 35,
    sativa: 65,
    aromas: ["Orange", "Peel", "Floral"],
    flavours: ["Citrus", "Sweet", "Tangerine"],
    accent: "#e47d38",
  },
  {
    slug: "purple-punch",
    name: "Purple Punch",
    type: "Indica",
    summary:
      "A grape-and-vanilla record completing the second page of the deterministic fixture.",
    thc: [18, 23],
    cbg: [0, 1],
    indica: 80,
    sativa: 20,
    aromas: ["Grape", "Vanilla", "Berry"],
    flavours: ["Plum", "Sugar", "Herbs"],
    accent: "#855d91",
  },
];

export function filterStrains(items: Strain[], filters: StrainFilters) {
  const query = filters.query.trim().toLocaleLowerCase();
  return items.filter((strain) => {
    const matchesQuery = !query || strain.name.toLocaleLowerCase().includes(query);
    const matchesInitial =
      !filters.initial || strain.name.toLocaleUpperCase().startsWith(filters.initial);
    const matchesType = filters.type === "All" || strain.type === filters.type;
    return matchesQuery && matchesInitial && matchesType;
  });
}

export function paginateStrains(items: Strain[], page: number, pageSize = 6) {
  const safePageSize = Math.max(1, pageSize);
  const totalPages = Math.max(1, Math.ceil(items.length / safePageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * safePageSize;
  return {
    items: items.slice(start, start + safePageSize),
    currentPage,
    totalPages,
  };
}

export function findStrain(slug: string) {
  return strains.find((strain) => strain.slug === slug);
}
