import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { readFileSync } from "node:fs";

interface ChallengeRoute {
  demoPath?: string;
  slug: string;
  title: string;
}

const challenges = JSON.parse(
  readFileSync(new URL("../src/challenges/data.json", import.meta.url), "utf8"),
) as ChallengeRoute[];

const wcagTags = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
const fullAuditSlugs = new Set([
  "challenge-conaz",
  "challenge-devlandia",
  "challenge-pipz",
  "challenge-salsify",
  "challenge-vuejs",
]);

async function expectAccessible(
  page: Page,
  route: string,
  options: { checkContrast?: boolean; exclude?: string[] } = {},
) {
  await page.goto(route);
  await page.waitForLoadState("networkidle");

  let audit = new AxeBuilder({ page }).withTags(wcagTags);
  if (!options.checkContrast) audit = audit.disableRules(["color-contrast"]);
  for (const selector of options.exclude ?? []) audit = audit.exclude(selector);

  const { violations } = await audit.analyze();

  expect(
    violations.map(({ id, impact, nodes }) => ({
      id,
      impact,
      targets: nodes.map((node) => node.target.join(" ")),
    })),
  ).toEqual([]);
}

test("shared shell meets the automated WCAG baseline", async ({ page }) => {
  for (const route of [
    "",
    "challenges",
    "challenges/challenge-propertiag",
    "about",
  ]) {
    await expectAccessible(page, route, { checkContrast: true });
  }
});

test("skip navigation and focus indicators work from the keyboard", async ({
  page,
}) => {
  await page.goto("challenges");
  await page.keyboard.press("Tab");

  const skipLink = page.getByRole("link", { name: "Skip to content" });
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(page.locator("main#content")).toBeFocused();
});

for (const challenge of challenges.filter(({ demoPath }) => demoPath)) {
  test(`${challenge.title} demo meets the accessibility baseline`, async ({
    page,
  }) => {
    await expectAccessible(page, `demos/${challenge.slug}`, {
      checkContrast: fullAuditSlugs.has(challenge.slug),
      exclude:
        challenge.slug === "challenge-vue"
          ? ['[id="2"]', '[id="3"]', '[id="4"]', '[id="5"]']
          : undefined,
    });

    await page.keyboard.press("Tab");
    const focusedElement = page.locator(":focus");
    await expect(focusedElement).toBeVisible();
    await expect(focusedElement).toHaveCSS("outline-style", "solid");
  });
}
