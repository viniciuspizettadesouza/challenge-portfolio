import { describe, expect, it } from "vitest";
import { filterChallenges, getCatalogFacets } from "./catalog";
import { challenges } from "./registry";

describe("catalog discovery", () => {
  it("builds sorted unique facets from challenge metadata", () => {
    const facets = getCatalogFacets(challenges);

    expect(facets.technologies).toContain("React");
    expect(facets.technologies).toContain("Vue");
    expect(facets.frameworks).toEqual(["static", "react", "vue3"]);
    expect(facets.adaptations).toEqual([
      "mock-backend",
      "native-react",
      "native-vue3",
      "upgrade-react",
      "static-embed",
      "upgrade-vue2",
    ]);
  });

  it("combines technology, framework, and adaptation filters", () => {
    const results = filterChallenges(challenges, {
      technology: "React",
      framework: "react",
      adaptation: "mock-backend",
    });

    expect(results.length).toBeGreaterThan(0);
    expect(
      results.every(({ technologies }) => technologies.includes("React")),
    ).toBe(true);
    expect(results.every(({ renderer }) => renderer === "react")).toBe(true);
    expect(
      results.every(
        ({ migrationStrategy }) => migrationStrategy === "mock-backend",
      ),
    ).toBe(true);
  });

  it("returns the complete catalog when every filter is empty", () => {
    expect(
      filterChallenges(challenges, {
        technology: "",
        framework: "",
        adaptation: "",
      }),
    ).toEqual(challenges);
  });
});
