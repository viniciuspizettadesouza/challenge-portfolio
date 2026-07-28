export interface Book {
  id: number;
  title: string;
  author: string;
  edition: number;
}

export type OrderingRule =
  | "title-ascending"
  | "author-ascending-title-descending"
  | "edition-descending-author-descending-title-ascending"
  | "null-collection"
  | "empty-set";

const text = (left: string, right: string) => left.localeCompare(right);

export function sortBooks(books: Book[], rule: OrderingRule) {
  if (rule === "null-collection") {
    throw new Error("OrderingException: the book collection is null.");
  }
  if (rule === "empty-set") {
    return [];
  }

  return [...books].sort((left, right) => {
    if (rule === "title-ascending") {
      return text(left.title, right.title);
    }
    if (rule === "author-ascending-title-descending") {
      return text(left.author, right.author) || text(right.title, left.title);
    }
    return (
      right.edition - left.edition ||
      text(right.author, left.author) ||
      text(left.title, right.title)
    );
  });
}
