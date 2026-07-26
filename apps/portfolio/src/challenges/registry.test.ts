import { describe, expect, it } from "vitest";
import { challenges, getChallenge } from "./registry";

describe("challenge registry", () => {
  it("contains exactly twenty unique challenges", () => {
    expect(challenges).toHaveLength(20);
    expect(new Set(challenges.map(({ slug }) => slug)).size).toBe(20);
  });

  it("resolves every registered slug", () => {
    for (const challenge of challenges) {
      expect(getChallenge(challenge.slug)).toBe(challenge);
    }
  });
});

