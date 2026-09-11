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
const fullAuditSlugs = new Set(challenges.map(({ slug }) => slug));

async function expectAccessible(
  page: Page,
  route: string,
  options: {
    checkContrast?: boolean;
    exclude?: string[];
    prepare?: (page: Page) => Promise<void>;
  } = {},
) {
  await page.goto(route);
  await page.waitForLoadState("networkidle");
  await options.prepare?.(page);

  let audit = new AxeBuilder({ page }).withTags(wcagTags);
  if (!options.checkContrast) audit = audit.disableRules(["color-contrast"]);
  for (const selector of options.exclude ?? []) audit = audit.exclude(selector);

  const { violations } = await audit.analyze();

  expect(
    violations.map(({ id, impact, nodes }) => ({
      id,
      impact,
      nodes: nodes.map(({ failureSummary, html, target }) => ({
        failureSummary,
        html,
        target: target.join(" "),
      })),
    })),
  ).toEqual([]);
}

test("shared shell meets the automated WCAG baseline", async ({ page }) => {
  for (const route of [
    "",
    "challenges",
    "challenges/algorithm-playground",
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
    });

    await page.keyboard.press("Tab");
    const focusedElement = page.locator(":focus");
    await expect(focusedElement).toBeVisible();
    await expect(focusedElement).toHaveCSS("outline-style", "solid");
  });
}

test("Screen Library film views meet the accessibility baseline", async ({
  page,
}) => {
  await expectAccessible(page, "demos/screen-library", {
    checkContrast: true,
    prepare: async (filmPage) => {
      await filmPage
        .getByRole("button", { name: "Films", exact: true })
        .click();
    },
  });
  await expectAccessible(page, "demos/screen-library", {
    checkContrast: true,
    prepare: async (filmPage) => {
      await filmPage
        .getByRole("button", { name: "Films", exact: true })
        .click();
      await filmPage.getByRole("button", { name: "Star Wars crawl" }).click();
    },
  });
});

test("Structured Data Workbench book view meets the accessibility baseline", async ({
  page,
}) => {
  await expectAccessible(page, "demos/structured-data-workbench", {
    checkContrast: true,
    prepare: async (workbenchPage) => {
      await workbenchPage.getByRole("button", { name: "Book sorting" }).click();
    },
  });
});

test("Climate & Weather Workspace emissions view meets the accessibility baseline", async ({
  page,
}) => {
  await expectAccessible(page, "demos/climate-workspace", {
    checkContrast: true,
    prepare: async (climatePage) => {
      await climatePage.getByRole("button", { name: "Emissions" }).click();
    },
  });
});
