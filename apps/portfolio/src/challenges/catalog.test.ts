import { describe, expect, it } from "vitest";
import { filterChallenges, getCatalogFacets } from "./catalog";
import { challenges } from "./registry";

describe("catalog discovery", () => {
  it("builds sorted unique facets from challenge metadata", () => {
    const facets = getCatalogFacets(challenges);

    expect(facets.technologies).toContain("React");
    expect(facets.technologies).toContain("Vue");
    expect(facets.frameworks).toEqual(["static", "react", "vue3"]);
    expect(facets.themes).toEqual([
      "Algorithms & Utilities",
      "Business Operations",
      "Content & Media",
      "Data & Analytics",
      "Discovery & Catalogs",
      "Mobility & Events",
      "Weather & Climate",
    ]);
    expect(facets.adaptations).toEqual([
      "consolidated",
      "native-react",
    ]);
  });

  it("combines theme, technology, framework, and adaptation filters", () => {
    const results = filterChallenges(challenges, {
      theme: "Business Operations",
      technology: "React",
      framework: "react",
      adaptation: "consolidated",
    });

    expect(results.length).toBeGreaterThan(0);
    expect(
      results.every(({ technologies }) => technologies.includes("React")),
    ).toBe(true);
    expect(results.every(({ renderer }) => renderer === "react")).toBe(true);
    expect(
      results.every(
        ({ migrationStrategy }) => migrationStrategy === "consolidated",
      ),
    ).toBe(true);
  });

  it("returns the complete catalog when every filter is empty", () => {
    expect(
      filterChallenges(challenges, {
        theme: "",
        technology: "",
        framework: "",
        adaptation: "",
      }),
    ).toEqual(challenges);
  });
});
