import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { projectRoot, readManifest } from "./lib.mjs";

const repositories = readManifest();
const inventory = [];

function readJson(path) {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch {
    return null;
  }
}

for (const repository of repositories) {
  const root = resolve(projectRoot, "challenges", repository.name, "original");
  const packageJson = readJson(resolve(root, "package.json"));
  const dependencies = {
    ...(packageJson?.dependencies ?? {}),
    ...(packageJson?.devDependencies ?? {}),
  };
  const framework = dependencies.vue
    ? "vue"
    : dependencies.react
      ? "react"
      : packageJson
        ? "unknown"
        : null;
  const frameworkVersion =
    framework === "vue"
      ? dependencies.vue
      : framework === "react"
        ? dependencies.react
        : null;
  const major = Number.parseInt(frameworkVersion?.match(/\d+/)?.[0] ?? "0", 10);
  const strategy =
    framework === "vue" && major >= 3
      ? "native-vue3"
      : framework === "vue"
        ? "upgrade-vue2"
        : framework === "react" && major >= 18
          ? "native-react"
          : framework === "react"
            ? "upgrade-react"
            : "manual-review";

  inventory.push({
    slug: repository.name,
    originalRepository: `${repository.owner}/${repository.name}`,
    originalDefaultBranch: repository.defaultBranch,
    originalHeadSha: repository.originalHeadSha,
    imported: existsSync(root),
    framework,
    frameworkVersion,
    language:
      existsSync(resolve(root, "tsconfig.json")) ||
      existsSync(resolve(root, "tsconfig.app.json"))
        ? "typescript"
        : packageJson
          ? "javascript"
          : null,
    bundler: dependencies.vite
      ? "vite"
      : dependencies["react-scripts"]
        ? "create-react-app"
        : dependencies["@vue/cli-service"]
          ? "vue-cli"
          : null,
    packageManager: existsSync(resolve(root, "pnpm-lock.yaml"))
      ? "pnpm"
      : existsSync(resolve(root, "yarn.lock"))
        ? "yarn"
        : existsSync(resolve(root, "package-lock.json"))
          ? "npm"
          : null,
    hasRouter: Boolean(dependencies["react-router-dom"] || dependencies["vue-router"]),
    hasTests: Boolean(
      dependencies.vitest ||
        dependencies.jest ||
        dependencies["@testing-library/react"] ||
        dependencies["@vue/test-utils"],
    ),
    hasBackend: Boolean(
      dependencies.express || dependencies.fastify || dependencies["@nestjs/core"],
    ),
    migrationStrategy: existsSync(root) ? strategy : "manual-review",
    migrationStatus: "pending",
  });
}

const jsonPath = resolve(projectRoot, "docs/migration/inventory.json");
const markdownPath = resolve(projectRoot, "docs/migration/inventory.md");
writeFileSync(jsonPath, `${JSON.stringify(inventory, null, 2)}\n`);
writeFileSync(
  markdownPath,
  [
    "# Inventário técnico",
    "",
    `Gerado em ${new Date().toISOString()} sem instalar dependências.`,
    "",
    "| Challenge | Importado | Framework | Bundler | Estratégia |",
    "| --- | --- | --- | --- | --- |",
    ...inventory.map(
      (item) =>
        `| ${item.slug} | ${item.imported ? "sim" : "não"} | ${
          item.framework ?? "—"
        } ${item.frameworkVersion ?? ""} | ${item.bundler ?? "—"} | ${
          item.migrationStrategy
        } |`,
    ),
    "",
  ].join("\n"),
);

console.log(`Inventory written for ${inventory.length} repositories.`);

