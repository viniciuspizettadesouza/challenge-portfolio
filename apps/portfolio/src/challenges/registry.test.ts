import { describe, expect, it } from "vitest";
import { challengeAliases, challenges, getChallenge } from "./registry";

describe("challenge registry", () => {
  it("contains nineteen curated entries backed by all twenty-three sources", () => {
    expect(challenges).toHaveLength(19);
    expect(new Set(challenges.map(({ slug }) => slug)).size).toBe(19);
    const sourceSlugs = challenges.flatMap(({ sources }) =>
      sources.map(({ slug }) => slug),
    );
    expect(sourceSlugs).toHaveLength(23);
    expect(new Set(sourceSlugs).size).toBe(23);
    expect(
      challenges.every(({ migrationStatus }) => migrationStatus === "migrated"),
    ).toBe(true);
  });

  it("resolves every unique legacy slug to its canonical entry", () => {
    expect(challengeAliases.size).toBe(27);
    for (const challenge of challenges) {
      for (const alias of challenge.aliases) {
        expect(challengeAliases.get(alias)).toBe(challenge);
      }
    }
  });

  it("resolves every registered slug", () => {
    for (const challenge of challenges) {
      expect(getChallenge(challenge.slug)).toBe(challenge);
    }
  });

  it("provides a specific explanatory summary for every challenge", () => {
    for (const challenge of challenges) {
      expect(challenge.description.length).toBeGreaterThan(60);
      expect(challenge.description).not.toContain(
        "available for source review",
      );
    }

    expect(new Set(challenges.map(({ description }) => description)).size).toBe(
      19,
    );
  });
});
