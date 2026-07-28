import { expect, test, type Page } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const screenshotDirectory = fileURLToPath(
  new URL("../../../docs/portfolio/screenshots/", import.meta.url),
);

async function openDemo(page: Page, slug: string) {
  const errors: string[] = [];

  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  await page.goto(`demos/${slug}`);
  await expect(page.getByText("Interactive demo", { exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Back to challenge" })).toHaveAttribute(
    "href",
    `/challenge-portfolio/challenges/${slug}`,
  );
  await page.addStyleTag({
    content: "*, *::before, *::after { animation: none !important; transition: none !important; }",
  });

  return errors;
}

async function capture(page: Page, slug: string, errors: string[]) {
  await mkdir(screenshotDirectory, { recursive: true });
  await page.screenshot({
    path: `${screenshotDirectory}/${slug}.png`,
    fullPage: true,
  });
  expect(errors, `browser errors in ${slug}`).toEqual([]);
}

test("Stormtech sorts the local book fixture", async ({ page }) => {
  const errors = await openDemo(page, "challenge-stormtech");
  await page.getByRole("button", { name: "Title Descending" }).click();
  await expect(page.locator(".storm-section").first().locator("tbody tr").first()).toContainText(
    "Patterns of Enterprise Application Architecture",
  );
  await capture(page, "challenge-stormtech", errors);
});

test("Vue filters and selects the original driver list", async ({ page }) => {
  const errors = await openDemo(page, "challenge-vue");
  await page.locator("#selectAll").check();
  await expect(page.getByText("5 of 5 selected")).toBeVisible();
  await page.locator("#filters").selectOption("Selected");
  await capture(page, "challenge-vue", errors);
});

test("Vuejs paginates the local episode guide", async ({ page }) => {
  const errors = await openDemo(page, "challenge-vuejs");
  await page.getByRole("button", { name: "Next" }).click();
  await expect(page.getByText("Page 2 of 3")).toBeVisible();
  await capture(page, "challenge-vuejs", errors);
});

test("Castlabs filters episodes and receives an update event", async ({ page }) => {
  const errors = await openDemo(page, "challenge-castlabs");
  await page.getByPlaceholder("Search episodes...").fill("Northbound");
  await expect(page.getByRole("heading", { name: "2 episodes" })).toBeVisible();
  await page.getByRole("button", { name: "Simulate update event" }).click();
  await expect(page.getByText(/UPDATE received/)).toBeVisible();
  await capture(page, "challenge-castlabs", errors);
});

test("Conaz runs the preserved encoding algorithm", async ({ page }) => {
  const errors = await openDemo(page, "challenge-conaz");
  await page.locator("#conaz-encoding").fill("aaabb");
  await expect(page.locator("#conaz-encoding-output")).toHaveText("3a2b");
  await capture(page, "challenge-conaz", errors);
});

test("JExperts shows the fixture-backed employee directory", async ({ page }) => {
  const errors = await openDemo(page, "challenge-jexperts");
  await page.getByRole("button", { name: "See all Users" }).click();
  await expect(
    page.locator(".jexperts-user").filter({ hasText: "Name: Adriano Lima" }).first(),
  ).toBeVisible();
  await capture(page, "challenge-jexperts", errors);
});

test("Zygo preserves the null-collection exception", async ({ page }) => {
  const errors = await openDemo(page, "challenge-zygo");
  await page.locator("#zygo-rule").selectOption("null-collection");
  await expect(page.locator("#zygo-ids")).toContainText(
    "OrderingException: the book collection is null.",
  );
  await capture(page, "challenge-zygo", errors);
});

test("Salsify uses the original product filter component", async ({ page }) => {
  const errors = await openDemo(page, "challenge-salsify");
  await page.getByLabel("Property Select").selectOption({ index: 1 });
  await expect(page.getByLabel("Operator Select")).toBeVisible();
  await page.getByLabel("Operator Select").selectOption({ index: 1 });
  await capture(page, "challenge-salsify", errors);
});

test("ClimateSeed switches chart presentation", async ({ page }) => {
  const errors = await openDemo(page, "challenge-climateseed");
  await page.getByRole("button", { name: "Bar" }).click();
  await expect(page.getByRole("button", { name: "Bar" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await capture(page, "challenge-climateseed", errors);
});

test("Lagoasoft keeps independent post likes", async ({ page }) => {
  const errors = await openDemo(page, "challenge-lagoasoft");
  const like = page.locator(".lago-actions button").first();
  await like.click();
  await expect(like).toHaveAttribute("aria-pressed", "true");
  await capture(page, "challenge-lagoasoft", errors);
});

test("Devlandia calculates the next bot move", async ({ page }) => {
  const errors = await openDemo(page, "challenge-devlandia");
  await page.getByRole("button", { name: "Show next move" }).click();
  await expect(page.locator("#devlandia-output")).toContainText("Next move:\nLEFT");
  await capture(page, "challenge-devlandia", errors);
});

test("Meetime opens the local leads list", async ({ page }) => {
  const errors = await openDemo(page, "challenge-meetime");
  await page.getByRole("button", { name: "List Leads" }).click();
  await expect(page.getByRole("heading", { name: "List leads" })).toBeVisible();
  await capture(page, "challenge-meetime", errors);
});

test("Instruct filters the preserved contact fixture", async ({ page }) => {
  const errors = await openDemo(page, "challenge-instruct");
  await page.getByPlaceholder("Search name...").fill("Glenna");
  await expect(page.locator(".result-count")).toContainText("1");
  await expect(page.locator(".result-count")).toContainText("matching leads");
  await expect(page.getByText("Glenna Reichert")).toBeVisible();
  await capture(page, "challenge-instruct", errors);
});

test("Blueticket searches the expanded hourly forecast", async ({ page }) => {
  const errors = await openDemo(page, "challenge-blueticket");
  await page.locator(".weather-search input").fill("London");
  await page.getByRole("button", { name: "Search" }).click();
  await expect(page.getByRole("heading", { name: "London, United Kingdom" })).toBeVisible();
  await expect(page.locator(".forecast-table-wrap tbody tr")).toHaveCount(48);
  await capture(page, "challenge-blueticket", errors);
});

test("Sword Health supports the authenticated image workflow", async ({ page }) => {
  const errors = await openDemo(page, "challenge-swordhealth");
  await page.getByRole("button", { name: "Start demo session" }).click();
  await page.getByRole("button", { name: "Write" }).click();
  await page.locator('input[type="file"]').setInputFiles({
    name: "article.png",
    mimeType: "image/png",
    buffer: Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Y9Z+9sAAAAASUVORK5CYII=",
      "base64",
    ),
  });
  await expect(page.getByText("article.png")).toBeVisible();
  await expect(page.locator(".article-image-preview img")).toBeVisible();
  await capture(page, "challenge-swordhealth", errors);
});

test("Pipz controls the preserved Star Wars crawl", async ({ page }) => {
  const errors = await openDemo(page, "challenge-pipz");
  await page.getByRole("button", { name: "Pause crawl" }).click();
  await expect(page.getByRole("button", { name: "Resume crawl" })).toBeVisible();
  await capture(page, "challenge-pipz", errors);
});

test("PropertiaG translates an example number", async ({ page }) => {
  const errors = await openDemo(page, "challenge-propertiag");
  await page.getByRole("button", { name: "944" }).click();
  await expect(page.locator("output")).toContainText("CMXLIV");
  await capture(page, "challenge-propertiag", errors);
});

test("FYLD searches the preserved movie dataset", async ({ page }) => {
  const errors = await openDemo(page, "challenge-fyld-hansecom");
  await page.getByRole("button", { name: "Search" }).click();
  await expect(page.getByText(/\d+ movies found\./)).toBeVisible();
  await expect(page.getByText(/The Avengers/).first()).toBeVisible();
  await capture(page, "challenge-fyld-hansecom", errors);
});

test("OnSign TV searches the local weather fixture", async ({ page }) => {
  const errors = await openDemo(page, "challenge-onsign-tv");
  await page.locator(".location-search input").fill("London");
  await page.getByRole("button", { name: "Search address" }).click();
  await expect(page.locator(".forecast-caption")).toContainText("London, United Kingdom");
  await capture(page, "challenge-onsign-tv", errors);
});

test("Ingenious Build selects a line and stop", async ({ page }) => {
  const errors = await openDemo(page, "challenge-ingenious-build-frontend");
  const lineButton = page.locator(".line-buttons button").first();
  const line = (await lineButton.textContent())?.trim() ?? "";
  await lineButton.click();
  const stopButton = page.locator(".scroll-list button").first();
  const stop = (await stopButton.textContent())?.trim() ?? "";
  await stopButton.click();
  await expect(page.locator(".selections")).toContainText(line);
  await expect(page.locator(".selections")).toContainText(stop);
  await capture(page, "challenge-ingenious-build-frontend", errors);
});
