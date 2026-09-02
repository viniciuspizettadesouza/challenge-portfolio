import { describe, expect, it } from "vitest";
import { challenges, getChallenge } from "./registry";

describe("challenge registry", () => {
  it("contains exactly twenty-three unique challenges", () => {
    expect(challenges).toHaveLength(23);
    expect(new Set(challenges.map(({ slug }) => slug)).size).toBe(23);
    expect(challenges.every(({ migrationStatus }) => migrationStatus === "migrated")).toBe(true);
  });

  it("resolves every registered slug", () => {
    for (const challenge of challenges) {
      expect(getChallenge(challenge.slug)).toBe(challenge);
    }
  });

  it("provides a specific explanatory summary for every challenge", () => {
    for (const challenge of challenges) {
      expect(challenge.description.length).toBeGreaterThan(60);
      expect(challenge.description).not.toContain("available for source review");
    }

    expect(new Set(challenges.map(({ description }) => description)).size).toBe(23);
  });
});
