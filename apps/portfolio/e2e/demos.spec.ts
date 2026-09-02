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
  expect(errors, `browser errors in ${slug}`).toEqual([]);

  if (process.env.UPDATE_SCREENSHOTS !== "1") return;

  await mkdir(screenshotDirectory, { recursive: true });
  await page.screenshot({
    path: `${screenshotDirectory}/${slug}.png`,
    fullPage: true,
  });
}

test("3cket searches the imported event fixture and opens details", async ({ page }) => {
  const errors = await openDemo(page, "challenge-3cket");
  await page.getByPlaceholder("Name, category, city or country").fill("Evo Padel");
  await expect(page.locator(".event-grid article")).toHaveCount(1);
  await page.locator(".event-grid article button").click();
  await expect(page.getByRole("heading", { name: "Evo Padel Open" })).toBeVisible();
  await expect(page.getByText("A local presentation of the original dynamic route")).toBeVisible();
  await capture(page, "challenge-3cket", errors);
});

test("Leafwell combines directory filters and opens a profile", async ({ page }) => {
  const errors = await openDemo(page, "challenge-leafwell");
  await page.getByPlaceholder("Search by strain name").fill("Blue Dream");
  await expect(page.getByRole("heading", { name: "1 directory record" })).toBeVisible();
  await page.getByRole("button", { name: "View strain →" }).click();
  await expect(page.getByRole("heading", { name: "Blue Dream" })).toBeVisible();
  await expect(page.getByText(/not medical advice/)).toBeVisible();
  await capture(page, "challenge-leafwell", errors);
});

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

test("User Management signs up and keeps only its theme after reopening", async ({ page, context }) => {
  const errors = await openDemo(page, "challenge-user-management");
  await expect(page.getByRole("heading", { name: "Create your account" })).toBeVisible();

  await page.getByLabel("Email address").fill("new.user@example.test");
  await page.getByLabel("Password", { exact: true }).fill("ExamplePass123!");
  await page.getByLabel("Confirm password").fill("ExamplePass123!");
  await page.getByRole("button", { name: "Create account" }).click();
  await expect(page.getByRole("heading", { name: "Hello New" })).toBeVisible();
  await expect(page.getByTestId("user-card")).toHaveCount(6);

  const storedToken = await page.evaluate(() => {
    const session = JSON.parse(sessionStorage.getItem("user-management/session") ?? "null") as { token?: string } | null;
    return session?.token ?? null;
  });
  expect(storedToken).toMatch(/^demo-token-/);

  const demo = page.locator(".um-demo");
  const initialTheme = await demo.getAttribute("data-theme");
  const selectedTheme = initialTheme === "dark" ? "light" : "dark";
  await page.getByRole("button", { name: `Switch to ${selectedTheme} theme` }).click();
  await expect(demo).toHaveAttribute("data-theme", selectedTheme);
  expect(errors).toEqual([]);

  await page.close();
  const reopenedPage = await context.newPage();
  const reopenedErrors = await openDemo(reopenedPage, "challenge-user-management");
  await expect(reopenedPage.getByRole("heading", { name: "Create your account" })).toBeVisible();
  await expect(reopenedPage.locator(".um-demo")).toHaveAttribute("data-theme", selectedTheme);
  expect(await reopenedPage.evaluate(() => sessionStorage.getItem("user-management/session"))).toBeNull();
  expect(reopenedErrors).toEqual([]);
});

test("User Management completes authentication, CRUD, pagination, and theme persistence", async ({ page }) => {
  const errors = await openDemo(page, "challenge-user-management");

  await expect(page.getByRole("heading", { name: "Create your account" })).toBeVisible();
  await page.getByLabel("Email address").fill("new.user@example.test");
  await page.getByLabel("Password", { exact: true }).fill("ExamplePass123!");
  await page.getByLabel("Confirm password").fill("DifferentPass123!");
  await page.getByRole("button", { name: "Create account" }).click();
  await expect(page.getByRole("alert")).toHaveText("Passwords do not match.");

  await page.getByRole("tab", { name: "Sign In" }).click();
  await expect(page.getByText("admin@example.test")).toBeVisible();
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Hello Janet" })).toBeVisible();
  await expect(page.getByTestId("user-card")).toHaveCount(6);

  await page.getByRole("button", { name: "Next" }).click();
  await expect(page.getByText("Page 2 of 3")).toBeVisible();
  await expect(page.getByTestId("user-card")).toHaveCount(6);

  await page.getByRole("button", { name: "Add user" }).click();
  await page.getByLabel("First name").fill("Rowan");
  await page.getByLabel("Last name").fill("Stone");
  await page.getByLabel("Email address").fill("rowan.stone@example.test");
  await page.getByRole("button", { name: "Save user" }).click();
  await expect(page.getByText("Rowan was created.")).toBeVisible();
  await expect(page.getByText("Page 3 of 3")).toBeVisible();
  await expect(page.getByText("Rowan Stone")).toBeVisible();

  await page.getByRole("button", { name: "Edit Rowan Stone" }).click();
  await page.getByLabel("Last name").fill("Vale");
  await page.getByRole("button", { name: "Save user" }).click();
  await expect(page.getByText("Rowan Vale")).toBeVisible();

  await page.getByRole("button", { name: "Delete Kai Tan" }).click();
  await expect(page.getByRole("alertdialog")).toBeVisible();
  await page.getByRole("button", { name: "Delete user" }).click();
  await expect(page.getByText("Kai was deleted.")).toBeVisible();
  await expect(page.getByText("Page 3 of 3")).toBeVisible();

  const demo = page.locator(".um-demo");
  const originalTheme = await demo.getAttribute("data-theme");
  await page.getByRole("button", { name: `Switch to ${originalTheme === "dark" ? "light" : "dark"} theme` }).click();
  const selectedTheme = originalTheme === "dark" ? "light" : "dark";
  await expect(demo).toHaveAttribute("data-theme", selectedTheme);

  await page.reload();
  await expect(page.getByRole("heading", { name: "Hello Janet" })).toBeVisible();
  await expect(page.locator(".um-demo")).toHaveAttribute("data-theme", selectedTheme);
  await expect(page.getByTestId("user-card")).toHaveCount(6);
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByRole("button", { name: "Next" }).click();
  await expect(page.getByText("Kai Tan")).toBeVisible();
  await expect(page.getByText("Rowan Vale")).toHaveCount(0);
  await page.getByRole("button", { name: "Previous" }).click();
  await page.getByRole("button", { name: "Previous" }).click();
  await capture(page, "challenge-user-management", errors);
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

test("catalog combines URL-backed filters and restores browser history", async ({ page }) => {
  await page.goto("challenges?technology=React&framework=react");
  const entries = page.locator(".catalog-entry:visible");
  const initialCount = await entries.count();
  expect(initialCount).toBeGreaterThan(0);
  await expect(page.getByLabel("Technology")).toHaveValue("React");
  await expect(page.getByLabel("Framework")).toHaveValue("react");

  await page.getByLabel("Adaptation type").selectOption("mock-backend");
  await expect(page).toHaveURL(/adaptation=mock-backend/);
  await expect(page.locator(".catalog-entry:visible")).not.toHaveCount(initialCount);

  await page.goBack();
  await expect(page.getByLabel("Adaptation type")).toHaveValue("");
  await expect(page.locator(".catalog-entry:visible")).toHaveCount(initialCount);

  await page.getByRole("button", { name: "Clear filters" }).click();
  await expect(page).not.toHaveURL(/technology=|framework=|adaptation=/);
  await expect(page.locator(".catalog-entry:visible")).toHaveCount(23);
});

test("catalog keeps every challenge available without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("challenges?technology=React");

  await expect(page.locator(".catalog-entry")).toHaveCount(23);
  await expect(page.locator(".catalog-entry a")).toHaveCount(23);
  await context.close();
});
