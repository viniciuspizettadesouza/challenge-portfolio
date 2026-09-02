import type { Challenge, ChallengeRenderer } from "./registry";

export interface CatalogFilters {
  adaptation: string;
  framework: string;
  technology: string;
}

export const frameworkLabels: Record<ChallengeRenderer, string> = {
  react: "React",
  vue3: "Vue 3",
  static: "Astro / static",
  "case-study": "Case study",
};

export const adaptationLabels: Record<Challenge["migrationStrategy"], string> =
  {
    "native-react": "Native React",
    "native-vue3": "Native Vue 3",
    "static-embed": "Static embed",
    "upgrade-vue2": "Vue 2 upgrade",
    "upgrade-react": "React upgrade",
    "mock-backend": "Local backend fixture",
    "case-study": "Case study",
    "manual-review": "Manual review",
  };

export function getCatalogFacets(challenges: Challenge[]) {
  return {
    technologies: [
      ...new Set(challenges.flatMap(({ technologies }) => technologies)),
    ].sort((left, right) => left.localeCompare(right)),
    frameworks: [...new Set(challenges.map(({ renderer }) => renderer))].sort(
      (left, right) =>
        frameworkLabels[left].localeCompare(frameworkLabels[right]),
    ),
    adaptations: [
      ...new Set(challenges.map(({ migrationStrategy }) => migrationStrategy)),
    ].sort((left, right) =>
      adaptationLabels[left].localeCompare(adaptationLabels[right]),
    ),
  };
}

export function filterChallenges(
  challenges: Challenge[],
  filters: CatalogFilters,
) {
  return challenges.filter(
    (challenge) =>
      (!filters.technology ||
        challenge.technologies.includes(filters.technology)) &&
      (!filters.framework || challenge.renderer === filters.framework) &&
      (!filters.adaptation ||
        challenge.migrationStrategy === filters.adaptation),
  );
}
