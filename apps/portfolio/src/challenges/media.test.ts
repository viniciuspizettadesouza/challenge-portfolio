import { readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { describe, expect, it } from "vitest";
import { challenges } from "./registry";

const publicDirectory = fileURLToPath(
  new URL("../../public/", import.meta.url),
);

describe("portfolio imagery", () => {
  it("provides one 800 by 500 WebP thumbnail per challenge", async () => {
    const files = await readdir(`${publicDirectory}/images/projects`);
    expect(files.sort()).toEqual(
      challenges.map(({ slug }) => `${slug}.webp`).sort(),
    );

    for (const challenge of challenges) {
      const metadata = await sharp(
        `${publicDirectory}/${challenge.screenshot}`,
      ).metadata();
      expect(metadata).toMatchObject({
        format: "webp",
        width: 800,
        height: 500,
      });
    }
  });

  it("provides a 1200 by 630 PNG for the portfolio and every challenge", async () => {
    const files = await readdir(`${publicDirectory}/images/social`);
    expect(files.sort()).toEqual(
      ["portfolio.png", ...challenges.map(({ slug }) => `${slug}.png`)].sort(),
    );

    for (const file of files) {
      const metadata = await sharp(
        `${publicDirectory}/images/social/${file}`,
      ).metadata();
      expect(metadata).toMatchObject({
        format: "png",
        width: 1200,
        height: 630,
      });
    }
  });
});
