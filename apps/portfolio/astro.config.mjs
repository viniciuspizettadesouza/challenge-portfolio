import react from "@astrojs/react";
import vue from "@astrojs/vue";
import { defineConfig } from "astro/config";

export default defineConfig({
  output: "static",
  integrations: [react(), vue()],
});
