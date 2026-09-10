export const categories = ["Marketing", "Design", "Engineering", "Medicine", "Finance"] as const;
export type Category = (typeof categories)[number];

export interface Article {
  id: string;
  title: string;
  description: string;
  category: Category;
  content: string;
  author: string;
}

export interface ArticleDraft {
  title: string;
  description: string;
  category: Category | "";
  content: string;
}

export const initialArticles: Article[] = [
  {
    id: "01",
    title: "Lorem ipsum dolor sit amet",
    description:
      "A practical look at how digital care teams can create consistent, human-centred experiences.",
    category: "Medicine",
    content:
      "Digital care works best when clinical expertise and thoughtful product design reinforce each other. Clear guidance, useful feedback, and an accessible experience help people stay engaged throughout their recovery.",
    author: "Alex Morgan",
  },
  {
    id: "02",
    title: "Sed ut perspiciatis unde omnis iste natus",
    description:
      "Building reliable products requires a shared language between engineering, design, and care teams.",
    category: "Engineering",
    content:
      "Strong delivery systems make quality visible. Small releases, measurable outcomes, and close collaboration allow teams to learn early and keep the product aligned with the people using it.",
    author: "Alex Morgan",
  },
  {
    id: "03",
    title: "At vero eos et accusamus et iusto",
    description:
      "Five principles for turning complex healthcare journeys into calm, understandable interfaces.",
    category: "Design",
    content:
      "Good health interfaces reduce cognitive load without hiding essential detail. Consistent hierarchy, plain language, and timely feedback give members confidence about what to do next.",
    author: "Taylor Reed",
  },
  {
    id: "04",
    title: "Excepteur sint occaecat cupidatat non proident",
    description:
      "How focused storytelling connects the right people with meaningful health outcomes.",
    category: "Marketing",
    content:
      "The most useful stories begin with a real problem and show the outcome honestly. Evidence and empathy are stronger together than either is alone.",
    author: "Taylor Reed",
  },
  {
    id: "05",
    title: "Planning sustainable care at scale",
    description:
      "A finance perspective on investing in prevention and measuring long-term value.",
    category: "Finance",
    content:
      "Sustainable care models consider clinical outcomes, member experience, and operational cost together. Long-term measures make prevention visible in planning decisions.",
    author: "Jordan Lee",
  },
  {
    id: "06",
    title: "The feedback loops behind better recovery",
    description:
      "Engineering systems that help clinicians understand progress without adding administrative burden.",
    category: "Engineering",
    content:
      "Useful feedback arrives at the right moment and in the right level of detail. Automated collection can give clinicians better context while preserving time for care.",
    author: "Jordan Lee",
  },
];

export function filterArticles(items: Article[], selected: Category[]) {
  return selected.length === 0
    ? items
    : items.filter(({ category }) => selected.includes(category));
}

export function visibleArticles(items: Article[], selected: Category[], limit: number) {
  return filterArticles(items, selected).slice(0, Math.max(0, limit));
}

export function createArticle(draft: ArticleDraft, author: string, nextId: number): Article {
  if (draft.title.trim().length < 4) throw new Error("Title must contain at least 4 characters.");
  if (draft.description.trim().length < 4) {
    throw new Error("Description must contain at least 4 characters.");
  }
  if (!categories.includes(draft.category as Category)) {
    throw new Error("Select an article category.");
  }
  if (draft.content.trim().length < 4) {
    throw new Error("Content must contain at least 4 characters.");
  }

  return {
    id: String(nextId).padStart(2, "0"),
    title: draft.title.trim(),
    description: draft.description.trim(),
    category: draft.category as Category,
    content: draft.content.trim(),
    author,
  };
}
