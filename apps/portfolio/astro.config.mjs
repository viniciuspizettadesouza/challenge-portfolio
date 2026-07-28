import react from "@astrojs/react";
import vue from "@astrojs/vue";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://viniciuspizettadesouza.github.io",
  base: "/challenge-portfolio",
  output: "static",
  integrations: [react(), vue()],
});
