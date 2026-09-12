import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vue from "@astrojs/vue";
import { readFileSync } from "node:fs";
import { defineConfig } from "astro/config";

const base = "/challenge-portfolio";
const entries = JSON.parse(
  readFileSync(
    new URL("../../docs/portfolio/entries.json", import.meta.url),
    "utf8",
  ),
);
const canonicalPaths = new Set([
  base,
  `${base}/about`,
  `${base}/challenges`,
  ...entries.map(({ slug }) => `${base}/challenges/${slug}`),
]);
const normalizePath = (page) => new URL(page).pathname.replace(/\/$/, "");

export default defineConfig({
  site: "https://viniciuspizettadesouza.github.io",
  base,
  output: "static",
  integrations: [
    react(),
    vue(),
    sitemap({ filter: (page) => canonicalPaths.has(normalizePath(page)) }),
  ],
});
