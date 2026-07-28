export interface Book {
  id: number;
  title: string;
  author: string;
  editionYear: number;
}

export type SortRule =
  | "original"
  | "title-ascending"
  | "title-descending"
  | "author-ascending"
  | "author-descending"
  | "edition-descending";

export type Scenario = "first" | "second" | "third" | "fourth" | "fifth";

export const books: Book[] = [
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

function compareText(a: string, b: string) {
  return a.localeCompare(b, "en", { sensitivity: "base" });
}

export function sortBooks(items: Book[], rule: SortRule) {
  const sorted = [...items];

  return sorted.sort((a, b) => {
    switch (rule) {
      case "title-ascending":
        return compareText(a.title, b.title);
      case "title-descending":
        return compareText(b.title, a.title);
      case "author-ascending":
        return compareText(a.author, b.author);
      case "author-descending":
        return compareText(b.author, a.author);
      case "edition-descending":
        return b.editionYear - a.editionYear;
      default:
        return a.id - b.id;
    }
  });
}

export function runScenario(items: Book[], scenario: Scenario) {
  switch (scenario) {
    case "first":
      return sortBooks(items, "title-ascending");
    case "second":
      return [...items].sort(
        (a, b) =>
          compareText(a.author, b.author) || compareText(b.title, a.title),
      );
    case "third":
      return [...items].sort(
        (a, b) =>
          b.editionYear - a.editionYear ||
          compareText(b.author, a.author) ||
          compareText(a.title, b.title),
      );
    case "fourth":
      throw new Error("SortingServiceException: the book collection is null.");
    case "fifth":
      return [];
  }
}
