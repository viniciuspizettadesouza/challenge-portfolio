import react from "@astrojs/react";
import vue from "@astrojs/vue";
import { defineConfig } from "astro/config";
import { fileURLToPath } from "node:url";

const dependency = (path) => fileURLToPath(new URL(`./node_modules/${path}`, import.meta.url));
const dependencyDirectory = (name) =>
  fileURLToPath(new URL(`./node_modules/${name}/`, import.meta.url));

export default defineConfig({
  output: "static",
  integrations: [react(), vue()],
  vite: {
    resolve: {
      alias: [
        { find: /^react$/, replacement: dependency("react/index.js") },
        { find: /^react-dom$/, replacement: dependency("react-dom/index.js") },
        {
          find: /^vue$/,
          replacement: dependency("vue/dist/vue.runtime.esm-bundler.js"),
        },
        {
          find: /^vue\/(.+)$/,
          replacement: `${dependencyDirectory("vue")}$1`,
        },
        {
          find: /^react\/(.+)$/,
          replacement: `${dependencyDirectory("react")}$1`,
        },
        {
          find: /^react-dom\/(.+)$/,
          replacement: `${dependencyDirectory("react-dom")}$1`,
        },
      ],
    },
  },
});
