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
  await expect(
    page.getByText("Interactive demo", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Back to challenge" }),
  ).toHaveAttribute("href", `/challenge-portfolio/challenges/${slug}`);
  await expect(page.locator("astro-island[ssr]")).toHaveCount(0, {
    timeout: 10_000,
  });
  expect(errors, `hydration errors in ${slug}`).toEqual([]);
  await page.addStyleTag({
    content:
      "*, *::before, *::after { animation: none !important; transition: none !important; }",
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

test("City Explorer preserves event discovery and transit planning", async ({
  page,
}) => {
  const errors = await openDemo(page, "city-explorer");
  await page
    .getByPlaceholder("Name, category, city or country")
    .fill("Evo Padel");
  await expect(page.locator(".event-grid article")).toHaveCount(1);
  await page.locator(".event-grid article button").click();
  await expect(
    page.getByRole("heading", { name: "Evo Padel Open" }),
  ).toBeVisible();
  await expect(
    page.getByText("A local presentation of the original dynamic route"),
  ).toBeVisible();

  await page.getByRole("button", { name: "Transit", exact: true }).click();
  const lineButton = page.locator(".line-buttons button").first();
  const line = (await lineButton.textContent())?.trim() ?? "";
  await lineButton.click();
  const stopButton = page.locator(".scroll-list button").first();
  const stop = (await stopButton.textContent())?.trim() ?? "";
  await stopButton.click();
  await expect(page.locator(".selections")).toContainText(line);
  await expect(page.locator(".selections")).toContainText(stop);
  await capture(page, "city-explorer", errors);
});

test("Leafwell combines directory filters and opens a profile", async ({
  page,
}) => {
  const errors = await openDemo(page, "strain-directory");
  await page.getByPlaceholder("Search by strain name").fill("Blue Dream");
  await expect(
    page.getByRole("heading", { name: "1 directory record" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "View strain →" }).click();
  await expect(page.getByRole("heading", { name: "Blue Dream" })).toBeVisible();
  await expect(page.getByText(/not medical advice/)).toBeVisible();
  await capture(page, "strain-directory", errors);
});

test("book workbench applies a configurable descending title rule", async ({
  page,
}) => {
  const errors = await openDemo(page, "configurable-book-sorting");
  await page.getByLabel("Rule 1 direction").selectOption("descending");
  await expect(page.locator(".result-panel tbody tr").first()).toContainText(
    "Patterns of Enterprise Application Architecture",
  );
  await capture(page, "configurable-book-sorting", errors);
});

test("Vue filters and selects the original driver list", async ({ page }) => {
  const errors = await openDemo(page, "formula-one-driver-explorer");
  await page.locator("#selectAll").check();
  await expect(page.getByText("5 of 5 selected")).toBeVisible();
  await page.locator("#filters").selectOption("Selected");
  await capture(page, "formula-one-driver-explorer", errors);
});

test("People Operations signs up and keeps only its theme after reopening", async ({
  page,
  context,
}) => {
  const errors = await openDemo(page, "people-operations");
  await expect(
    page.getByRole("heading", { name: "Create your account" }),
  ).toBeVisible();

  await page.getByLabel("Email address").fill("new.user@example.test");
  await page.getByLabel("Password", { exact: true }).fill("ExamplePass123!");
  await page.getByLabel("Confirm password").fill("ExamplePass123!");
  await page.getByRole("button", { name: "Create account" }).click();
  await expect(page.getByRole("heading", { name: "Hello New" })).toBeVisible();
  await expect(page.getByTestId("user-card")).toHaveCount(6);

  const storedToken = await page.evaluate(() => {
    const session = JSON.parse(
      sessionStorage.getItem("user-management/session") ?? "null",
    ) as { token?: string } | null;
    return session?.token ?? null;
  });
  expect(storedToken).toMatch(/^demo-token-/);

  const demo = page.locator(".um-demo");
  const initialTheme = await demo.getAttribute("data-theme");
  const selectedTheme = initialTheme === "dark" ? "light" : "dark";
  await page
    .getByRole("button", { name: `Switch to ${selectedTheme} theme` })
    .click();
  await expect(demo).toHaveAttribute("data-theme", selectedTheme);
  expect(errors).toEqual([]);

  await page.close();
  const reopenedPage = await context.newPage();
  const reopenedErrors = await openDemo(reopenedPage, "people-operations");
  await expect(
    reopenedPage.getByRole("heading", { name: "Create your account" }),
  ).toBeVisible();
  await expect(reopenedPage.locator(".um-demo")).toHaveAttribute(
    "data-theme",
    selectedTheme,
  );
  expect(
    await reopenedPage.evaluate(() =>
      sessionStorage.getItem("user-management/session"),
    ),
  ).toBeNull();
  expect(reopenedErrors).toEqual([]);
});

test("People Operations completes authentication, directory discovery, CRUD, and theme persistence", async ({
  page,
}) => {
  const errors = await openDemo(page, "people-operations");

  await expect(
    page.getByRole("heading", { name: "Create your account" }),
  ).toBeVisible();
  await page.getByLabel("Email address").fill("new.user@example.test");
  await page.getByLabel("Password", { exact: true }).fill("ExamplePass123!");
  await page.getByLabel("Confirm password").fill("DifferentPass123!");
  await page.getByRole("button", { name: "Create account" }).click();
  await expect(page.getByRole("alert")).toHaveText("Passwords do not match.");

  await page.getByRole("tab", { name: "Sign In" }).click();
  await expect(page.getByText("admin@example.test")).toBeVisible();
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Hello Janet" }),
  ).toBeVisible();
  await expect(page.getByTestId("user-card")).toHaveCount(6);

  await page.getByPlaceholder("Name, email or department").fill("Vincus");
  await expect(page.getByRole("heading", { name: "Vinicius Souza" })).toBeVisible();
  await expect(page.getByTestId("user-card")).toHaveCount(1);
  await page.getByPlaceholder("Name, email or department").fill("");
  await page.getByLabel("Reports to").selectOption({ label: "Adriano Lima" });
  await expect(page.getByRole("heading", { name: "Vinicius Souza" })).toBeVisible();
  await expect(page.getByTestId("user-card")).toHaveCount(1);
  await page.getByLabel("Reports to").selectOption("all");

  await page.getByRole("button", { name: "Next" }).click();
  await expect(page.getByText("Page 2 of 3")).toBeVisible();
  await expect(page.getByTestId("user-card")).toHaveCount(6);

  await page.getByRole("button", { name: "Add user" }).click();
  await page.getByLabel("First name").fill("Rowan");
  await page.getByLabel("Last name").fill("Stone");
  await page.getByLabel("Email address").fill("rowan.stone@example.test");
  await page.getByLabel("Login").fill("rstone");
  await page.getByLabel(/^Password/).fill("LocalPass123!");
  await page.getByRole("button", { name: "Save user" }).click();
  await expect(page.getByText("Rowan was created.")).toBeVisible();
  await expect(page.getByText("Page 3 of 3")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Rowan Stone" })).toBeVisible();

  await page.getByRole("button", { name: "Edit Rowan Stone" }).click();
  await page.getByLabel("Last name").fill("Vale");
  await page.getByRole("button", { name: "Save user" }).click();
  await expect(page.getByRole("heading", { name: "Rowan Vale" })).toBeVisible();

  await page.getByRole("button", { name: "Delete Kai Tan" }).click();
  await expect(page.getByRole("alertdialog")).toBeVisible();
  await page.getByRole("button", { name: "Delete user" }).click();
  await expect(page.getByText("Kai was deleted.")).toBeVisible();
  await expect(page.getByText("Page 3 of 3")).toBeVisible();

  const demo = page.locator(".um-demo");
  const originalTheme = await demo.getAttribute("data-theme");
  await page
    .getByRole("button", {
      name: `Switch to ${originalTheme === "dark" ? "light" : "dark"} theme`,
    })
    .click();
  const selectedTheme = originalTheme === "dark" ? "light" : "dark";
  await expect(demo).toHaveAttribute("data-theme", selectedTheme);

  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Hello Janet" }),
  ).toBeVisible();
  await expect(page.locator(".um-demo")).toHaveAttribute(
    "data-theme",
    selectedTheme,
  );
  await expect(page.getByTestId("user-card")).toHaveCount(6);
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByRole("button", { name: "Next" }).click();
  await expect(page.getByRole("heading", { name: "Kai Tan" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Rowan Vale" })).toHaveCount(0);
  await page.getByRole("button", { name: "Previous" }).click();
  await page.getByRole("button", { name: "Previous" }).click();
  await page.evaluate(() => {
    (document.activeElement as HTMLElement | null)?.blur();
    window.scrollTo(0, 0);
  });
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  await capture(page, "people-operations", errors);
});

test("Screen Library combines series discovery and episode management", async ({
  page,
}) => {
  const errors = await openDemo(page, "screen-library");
  await expect(page.getByRole("heading", { name: "17 matching episodes" })).toBeVisible();
  await page.getByRole("combobox", { name: "Series" }).selectOption("signal-lost");
  await expect(page.getByRole("heading", { name: "12 matching episodes" })).toBeVisible();
  await page.getByRole("button", { name: "Next" }).click();
  await expect(page.getByText("Page 2 of 3")).toBeVisible();
  await page.getByPlaceholder("Search episodes or series...").fill("Return Signal");
  await expect(page.getByRole("heading", { name: "1 matching episode" })).toBeVisible();
  await page.getByRole("button", { name: "Simulate update event" }).click();
  await expect(page.getByText(/UPDATE received/)).toBeVisible();
  expect(errors).toEqual([]);
});

test("Algorithm Playground preserves all three source workflows", async ({ page }) => {
  const errors = await openDemo(page, "algorithm-playground");
  await page.locator("#algorithm-encoding").fill("aaabb");
  await expect(page.locator("#algorithm-encoding-output")).toHaveText("3a2b");

  await page.getByRole("tab", { name: /Roman numerals/ }).click();
  await page.getByRole("button", { name: "944" }).click();
  await expect(page.locator("#algorithm-roman-output")).toContainText("CMXLIV");

  await page.getByRole("tab", { name: /Grid path/ }).click();
  await page.getByRole("button", { name: "Show next move" }).click();
  await expect(page.locator("#algorithm-path-output")).toContainText(
    "Next move:\nLEFT",
  );
  await page.getByRole("tab", { name: /Text lab/ }).click();
  await page.evaluate(() => {
    (document.activeElement as HTMLElement | null)?.blur();
    window.scrollTo(0, 0);
  });
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  await capture(page, "algorithm-playground", errors);
});

test("book workbench preserves the null-collection exception", async ({
  page,
}) => {
  const errors = await openDemo(page, "configurable-book-sorting");
  await page.getByRole("button", { name: "Null collection" }).click();
  await expect(page.getByRole("alert")).toContainText("NULL_COLLECTION");
  expect(errors).toEqual([]);
});

test("Salsify uses the original product filter component", async ({ page }) => {
  const errors = await openDemo(page, "product-data-table");
  await page.getByLabel("Property Select").selectOption({ index: 1 });
  await expect(page.getByLabel("Operator Select")).toBeVisible();
  await page.getByLabel("Operator Select").selectOption({ index: 1 });
  await capture(page, "product-data-table", errors);
});

test("ClimateSeed switches chart presentation", async ({ page }) => {
  const errors = await openDemo(page, "carbon-emissions-dashboard");
  await page.getByRole("button", { name: "Bar" }).click();
  await expect(page.getByRole("button", { name: "Bar" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await capture(page, "carbon-emissions-dashboard", errors);
});

test("lead operations searches, creates, edits, deletes, and persists leads", async ({ page }) => {
  const errors = await openDemo(page, "lead-operations");
  await page.getByPlaceholder("Search contact or company...").fill("Northstar");
  await expect(page.locator(".lead-table tbody tr")).toHaveCount(1);
  await expect(page.getByText("Daniel Brooks").first()).toBeVisible();
  await page.getByRole("button", { name: "Clear filters" }).last().click();
  await page.getByLabel("Company category").selectOption("e-enable");
  await page.getByLabel("Company category").selectOption("applications");
  await expect(page.locator(".lead-table tbody tr")).toHaveCount(2);
  await page.getByRole("button", { name: "Clear filters" }).click();
  await page.getByPlaceholder("Search contact or company...").fill("no-such-company");
  await expect(page.getByText("No leads match these filters.")).toBeVisible();
  await page.getByRole("button", { name: "Clear filters" }).last().click();
  const addButton = page.getByRole("button", { name: "+ Add lead" }).first();
  await addButton.click();
  await page.getByRole("button", { name: "Add lead", exact: true }).click();
  await expect(page.getByText("Name is required.")).toBeVisible();
  await page.getByLabel("Name *").fill("Alex Morgan");
  await page.getByLabel("E-mail *").fill("alex@example.com");
  await page.getByLabel("Phone *").fill("+351 210 000 000");
  await page.getByLabel("Company *").fill("Example Labs");
  await page.getByLabel("Cadence *").selectOption("Product Demo");
  await page.getByLabel(/Categories/).fill("saas, enterprise");
  await page.getByRole("button", { name: "Add lead", exact: true }).click();
  await expect(addButton).toBeFocused();
  await expect(page.getByText("Alex Morgan").first()).toBeVisible();
  await page.getByRole("button", { name: "Edit Alex Morgan" }).first().click();
  await page.getByLabel("Company *").fill("Example Group");
  await page.getByRole("button", { name: "Save changes" }).click();
  await expect(page.getByText("Example Group").first()).toBeVisible();
  await page.reload();
  await expect(page.getByText("Alex Morgan").first()).toBeVisible();
  await page.getByRole("button", { name: "Delete Alex Morgan" }).first().click();
  await page.getByRole("button", { name: "Delete lead" }).click();
  await expect(page.getByRole("button", { name: "Delete Alex Morgan" })).toHaveCount(0);
  await expect(page.getByText("Alex Morgan was deleted.")).toBeVisible();
  await capture(page, "lead-operations", errors);
});

test("lead operations switches to accessible cards on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const errors = await openDemo(page, "lead-operations");
  await expect(page.locator(".lead-table")).toBeHidden();
  await expect(page.locator(".lead-cards")).toBeVisible();
  await expect(page.locator(".lead-cards article")).toHaveCount(13);
  expect(errors).toEqual([]);
});

test("weather explorer searches the expanded hourly forecast", async ({
  page,
}) => {
  const errors = await openDemo(page, "weather-forecast");
  await page.locator("#weather-location").fill("London");
  await page.getByRole("button", { name: "Search" }).click();
  await expect(
    page.getByRole("heading", { name: "London, England, United Kingdom" }),
  ).toBeVisible();
  await expect(page.locator(".detail-table tbody tr")).toHaveCount(48);
  await page.reload();
  await expect(page.locator("#weather-location")).toHaveValue(
    "London, England, United Kingdom",
  );
  await expect(
    page.getByText(
      "Restored your last forecast and recent searches from this browser.",
    ),
  ).toBeVisible();
  await capture(page, "weather-forecast", errors);
});

test("Content Platform preserves news publishing and social engagement", async ({
  page,
}) => {
  const errors = await openDemo(page, "content-platform");
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

  await page.getByRole("button", { name: "Social feed", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "A local social feed with independent likes" }),
  ).toBeVisible();
  const like = page.locator(".lago-actions button").first();
  await like.click();
  await expect(like).toHaveAttribute("aria-pressed", "true");
  await capture(page, "content-platform", errors);
});

test("Screen Library composes movie search and the preserved Star Wars crawl", async ({
  page,
}) => {
  const errors = await openDemo(page, "screen-library");
  await page.getByRole("button", { name: "Films", exact: true }).click();
  await page.getByRole("button", { name: "Search" }).click();
  await expect(page.getByText("8 movies found.")).toBeVisible();
  await expect(page.getByText(/The Avengers/).first()).toBeVisible();
  await page.getByRole("button", { name: "Star Wars crawl" }).click();
  await expect(page.getByAltText("Star Wars")).toBeVisible();
  await page.getByRole("button", { name: "Pause crawl" }).click();
  await expect(
    page.getByRole("button", { name: "Resume crawl" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Discover movies" }).click();
  await expect(page.getByText("8 movies found.")).toBeVisible();
  await capture(page, "screen-library", errors);
});

test("legacy challenge and demo URLs redirect to canonical entries", async ({
  page,
}) => {
  await page.goto("demos/challenge-onsign-tv");
  await expect(page).toHaveURL(/demos\/weather-forecast\/?$/);
  await page.goto("challenges/challenge-zygo");
  await expect(page).toHaveURL(/challenges\/configurable-book-sorting\/?$/);
  for (const alias of ["challenge-3cket", "challenge-ingenious-build-frontend", "event-discovery", "public-transit-timetable"]) {
    await page.goto(`challenges/${alias}`);
    await expect(page).toHaveURL(/challenges\/city-explorer\/?$/);
    await page.goto(`demos/${alias}`);
    await expect(page).toHaveURL(/demos\/city-explorer\/?$/);
  }
  for (const alias of ["challenge-lagoasoft", "challenge-swordhealth", "social-feed-interactions", "news-publishing-platform"]) {
    await page.goto(`challenges/${alias}`);
    await expect(page).toHaveURL(/challenges\/content-platform\/?$/);
    await page.goto(`demos/${alias}`);
    await expect(page).toHaveURL(/demos\/content-platform\/?$/);
  }
  for (const alias of ["challenge-instruct", "challenge-meetime", "lead-filtering-dashboard", "sales-lead-management"]) {
    await page.goto(`challenges/${alias}`);
    await expect(page).toHaveURL(/challenges\/lead-operations\/?$/);
    await page.goto(`demos/${alias}`);
    await expect(page).toHaveURL(/demos\/lead-operations\/?$/);
  }
  for (const alias of ["challenge-jexperts", "challenge-user-management", "employee-directory-registration", "user-administration"]) {
    await page.goto(`challenges/${alias}`);
    await expect(page).toHaveURL(/challenges\/people-operations\/?$/);
    await page.goto(`demos/${alias}`);
    await expect(page).toHaveURL(/demos\/people-operations\/?$/);
  }
  for (const alias of ["challenge-castlabs", "challenge-vuejs", "episode-management", "tv-episode-guide", "challenge-fyld-hansecom", "challenge-pipz", "movie-search", "film-crawl-experience", "tv-episode-library", "film-library"]) {
    await page.goto(`challenges/${alias}`);
    await expect(page).toHaveURL(/challenges\/screen-library\/?$/);
    await page.goto(`demos/${alias}`);
    await expect(page).toHaveURL(/demos\/screen-library\/?$/);
  }
  for (const alias of ["challenge-conaz", "challenge-devlandia", "challenge-propertiag", "javascript-data-exercises", "grid-pathfinding", "roman-numeral-converter"]) {
    await page.goto(`challenges/${alias}`);
    await expect(page).toHaveURL(/challenges\/algorithm-playground\/?$/);
    await page.goto(`demos/${alias}`);
    await expect(page).toHaveURL(/demos\/algorithm-playground\/?$/);
  }
});

test("catalog combines URL-backed filters and restores browser history", async ({
  page,
}) => {
  await page.goto("challenges?technology=React&framework=react");
  const entries = page.locator(".catalog-entry:visible");
  const initialCount = await entries.count();
  expect(initialCount).toBeGreaterThan(0);
  await expect(page.getByLabel("Technology")).toHaveValue("React");
  await expect(page.getByLabel("Framework")).toHaveValue("react");

  await page.getByLabel("Adaptation type").selectOption("consolidated");
  await expect(page).toHaveURL(/adaptation=consolidated/);
  await expect(page.locator(".catalog-entry:visible")).not.toHaveCount(
    initialCount,
  );

  await page.goBack();
  await expect(page.getByLabel("Adaptation type")).toHaveValue("");
  await expect(page.locator(".catalog-entry:visible")).toHaveCount(
    initialCount,
  );

  await page.getByRole("button", { name: "Clear filters" }).click();
  await expect(page).not.toHaveURL(/technology=|framework=|adaptation=/);
  await expect(page.locator(".catalog-entry:visible")).toHaveCount(12);

  await page.getByLabel("Theme").selectOption("Algorithms & Utilities");
  await expect(page).toHaveURL(
    (url) => url.searchParams.get("theme") === "Algorithms & Utilities",
  );
  await expect(page.locator(".catalog-entry:visible")).toHaveCount(2);
});

test("catalog keeps every challenge available without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("challenges?technology=React");

  await expect(page.locator(".catalog-entry")).toHaveCount(12);
  await expect(page.locator(".catalog-entry a")).toHaveCount(12);
  await context.close();
});
