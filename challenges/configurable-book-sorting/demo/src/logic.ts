export interface Book {
  id: number;
  title: string;
  author: string;
  editionYear: number;
}

export type BookField = "title" | "author" | "editionYear";
export type SortDirection = "ascending" | "descending";

export interface SortRule {
  field: BookField;
  direction: SortDirection;
}

export class BookSortingError extends Error {
  readonly code: "NULL_COLLECTION" | "INVALID_CONFIGURATION";

  constructor(code: BookSortingError["code"], message: string) {
    super(message);
    this.name = "BookSortingError";
    this.code = code;
  }
}

export const books: readonly Book[] = [
  {
    id: 1,
    title: "Java How To Program",
    author: "Deitel & Deitel",
    editionYear: 2007,
  },
  {
    id: 2,
    title: "Patterns of Enterprise Application Architecture",
    author: "Martin Fowler",
    editionYear: 2002,
  },
  {
    id: 3,
    title: "Head First Design Patterns",
    author: "Elisabeth Freeman",
    editionYear: 2004,
  },
  {
    id: 4,
    title: "Internet & World Wide Web: How to Program",
    author: "Deitel & Deitel",
    editionYear: 2007,
  },
];

export const presets = {
  title: [{ field: "title", direction: "ascending" }],
  authorTitle: [
    { field: "author", direction: "ascending" },
    { field: "title", direction: "descending" },
  ],
  editionAuthorTitle: [
    { field: "editionYear", direction: "descending" },
    { field: "author", direction: "descending" },
    { field: "title", direction: "ascending" },
  ],
} as const satisfies Record<string, readonly SortRule[]>;

function validateRules(rules: readonly SortRule[]) {
  const validFields: BookField[] = ["title", "author", "editionYear"];
  const validDirections: SortDirection[] = ["ascending", "descending"];
  if (
    rules.length === 0 ||
    new Set(rules.map(({ field }) => field)).size !== rules.length ||
    rules.some(
      ({ field, direction }) =>
        !validFields.includes(field) || !validDirections.includes(direction),
    )
  ) {
    throw new BookSortingError(
      "INVALID_CONFIGURATION",
      "Choose at least one valid, unique field and direction for the sorting configuration.",
    );
  }
}

function compareValues(left: string | number, right: string | number) {
  return typeof left === "number" && typeof right === "number"
    ? left - right
    : String(left).localeCompare(String(right), "en", { sensitivity: "base" });
}

export function createBookComparator(rules: readonly SortRule[]) {
  validateRules(rules);
  return (left: Book, right: Book) => {
    for (const { field, direction } of rules) {
      const result = compareValues(left[field], right[field]);
      if (result !== 0) return direction === "ascending" ? result : -result;
    }
    return left.id - right.id;
  };
}

export function sortBooks(
  collection: readonly Book[] | null,
  rules: readonly SortRule[],
) {
  if (collection === null) {
    throw new BookSortingError(
      "NULL_COLLECTION",
      "The book collection is null.",
    );
  }
  return [...collection].sort(createBookComparator(rules));
}
