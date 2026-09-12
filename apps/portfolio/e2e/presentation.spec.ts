import { expect, test } from "@playwright/test";

const siteUrl = "https://viniciuspizettadesouza.github.io/challenge-portfolio";

test("home presents the selected projects with responsive imagery", async ({
  page,
}) => {
  await page.goto("");
  const cards = page.locator(".card");
  await expect(cards).toHaveCount(3);
  await expect(cards.locator("h2")).toHaveText([
    "People Operations Workspace",
    "City Explorer",
    "Climate & Weather Workspace",
  ]);
  await expect(cards.locator("img")).toHaveCount(3);
  await expect(cards.first().locator("img")).toHaveAttribute(
    "fetchpriority",
    "high",
  );
  await expect(cards.first().locator(".technology-list li")).toHaveCount(5);

  await page.setViewportSize({ width: 900, height: 1000 });
  await expect(page.locator(".grid")).toHaveCSS(
    "grid-template-columns",
    /.+ .+/,
  );
  await page.setViewportSize({ width: 480, height: 900 });
  await expect(page.locator(".grid")).toHaveCSS(
    "grid-template-columns",
    /\d+px/,
  );
});

test("canonical pages expose complete social metadata and structured data", async ({
  page,
}) => {
  await page.goto("");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    `${siteUrl}/`,
  );
  expect(
    JSON.parse(
      (await page
        .locator('script[type="application/ld+json"]')
        .textContent()) ?? "null",
    ),
  ).toMatchObject({ "@type": "WebSite" });

  await page.goto("challenges");
  expect(
    JSON.parse(
      (await page
        .locator('script[type="application/ld+json"]')
        .textContent()) ?? "null",
    ),
  ).toMatchObject({
    "@type": "CollectionPage",
    mainEntity: { "@type": "ItemList", numberOfItems: 9 },
  });

  await page.goto("about");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /preserves historical source code/i,
  );

  await page.goto("challenges/climate-workspace");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    `${siteUrl}/challenges/climate-workspace/`,
  );
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /climate workspace/i,
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    `${siteUrl}/images/social/climate-workspace.png`,
  );
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    "content",
    "summary_large_image",
  );
  const structuredData = JSON.parse(
    (await page.locator('script[type="application/ld+json"]').textContent()) ??
      "null",
  );
  expect(structuredData).toMatchObject({
    "@type": "CreativeWork",
    name: "Climate & Weather Workspace",
  });
  expect(structuredData.isBasedOn).toHaveLength(3);
});

test("fullscreen demos are not indexed and point to the canonical entry", async ({
  page,
}) => {
  await page.goto("demos/city-explorer");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    "noindex,follow",
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    `${siteUrl}/challenges/city-explorer/`,
  );
});

test("sitemap exposes only canonical portfolio pages", async ({ request }) => {
  const indexResponse = await request.get("sitemap-index.xml");
  expect(indexResponse.ok()).toBe(true);
  const index = await indexResponse.text();
  const sitemapPath = index.match(/<loc>([^<]+)<\/loc>/)?.[1];
  expect(sitemapPath).toBeTruthy();

  const localSitemapPath = new URL(sitemapPath!).pathname.replace(
    "/challenge-portfolio/",
    "",
  );
  const sitemapResponse = await request.get(localSitemapPath);
  expect(sitemapResponse.ok()).toBe(true);
  const sitemap = await sitemapResponse.text();
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    ([, url]) => url,
  );
  expect(urls).toHaveLength(12);
  expect(urls).toContain(`${siteUrl}/`);
  expect(urls).toContain(`${siteUrl}/about/`);
  expect(urls).toContain(`${siteUrl}/challenges/`);
  expect(urls.some((url) => url.includes("/demos/"))).toBe(false);
  expect(urls.some((url) => url.includes("challenge-vue"))).toBe(false);

  const aliasResponse = await request.get("challenges/challenge-vue");
  const alias = await aliasResponse.text();
  expect(alias).toContain('<meta name="robots" content="noindex">');
  expect(alias).toContain(
    `<link rel="canonical" href="${siteUrl}/challenges/structured-data-workbench/">`,
  );

  const robotsResponse = await request.get("robots.txt");
  expect(await robotsResponse.text()).toContain(
    `Sitemap: ${siteUrl}/sitemap-index.xml`,
  );
});
