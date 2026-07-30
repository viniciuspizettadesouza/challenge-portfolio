import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { relative, resolve } from "node:path";
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

const inventoryOverrides =
  readJson(resolve(projectRoot, "docs/migration/inventory-overrides.json")) ?? {};

function walk(root, predicate, results = []) {
  if (!existsSync(root)) return results;
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    if (
      entry.name === ".git" ||
      entry.name === "node_modules" ||
      entry.name === "dist" ||
      entry.name === "build" ||
      entry.name === "coverage"
    ) {
      continue;
    }
    const path = resolve(root, entry.name);
    if (entry.isDirectory()) {
      walk(path, predicate, results);
    } else if (predicate(path, entry.name)) {
      results.push(path);
    }
  }
  return results;
}

for (const repository of repositories) {
  const slug = repository.slug ?? repository.name;
  const directory = repository.directory ?? slug;
  const root = resolve(projectRoot, "challenges", directory, "original");
  const packagePaths = walk(root, (_, name) => name === "package.json");
  const packages = packagePaths
    .map((path) => ({ path, data: readJson(path) }))
    .filter(({ data }) => data);
  const dependencies = packages.reduce(
    (result, { data }) => ({
      ...result,
      ...(data.dependencies ?? {}),
      ...(data.devDependencies ?? {}),
    }),
    {},
  );
  const sourcePaths = walk(root, (_, name) =>
    /\.(?:js|jsx|ts|tsx|vue|astro|html)$/.test(name),
  );
  const source = sourcePaths
    .filter((path) => readFileSync(path).byteLength < 1_000_000)
    .map((path) => readFileSync(path, "utf8"))
    .join("\n");
  const envVariables = [
    ...new Set(
      [...source.matchAll(/(?:process\.env|import\.meta\.env)\.([A-Z][A-Z0-9_]*)/g)].map(
        (match) => match[1],
      ),
    ),
  ].sort();
  const framework = dependencies.vue
    ? "vue"
    : dependencies.react
      ? "react"
      : packages.length
        ? "unknown"
        : null;
  const frameworkVersion =
    framework === "vue"
      ? dependencies.vue
      : framework === "react"
        ? dependencies.react
        : null;
  const major = Number.parseInt(frameworkVersion?.match(/\d+/)?.[0] ?? "0", 10);
  const hasBackend =
    Boolean(dependencies.express || dependencies.fastify || dependencies["@nestjs/core"]) ||
    packagePaths.some((path) => /\/(?:backend|server)\//i.test(path));
  const hasStaticEntry = walk(root, (_, name) => name === "index.html").length > 0;
  const strategy = hasBackend
    ? "mock-backend"
    : framework === "vue" && major >= 3
      ? "native-vue3"
      : framework === "vue"
        ? "upgrade-vue2"
        : framework === "react" && major >= 18
          ? "native-react"
          : framework === "react"
          ? "upgrade-react"
          : hasStaticEntry
            ? "static-embed"
            : "manual-review";

  const generated = {
    slug,
    originalRepository: `${repository.owner}/${repository.name}`,
    originalDefaultBranch: repository.defaultBranch,
    originalHeadSha: repository.originalHeadSha,
    ...(repository.importedSourceBranch
      ? {
          importedSourceBranch: repository.importedSourceBranch,
          importedSourceHeadSha: repository.importedSourceHeadSha,
        }
      : {}),
    imported: existsSync(root),
    framework,
    frameworkVersion,
    language:
      walk(root, (_, name) => name === "tsconfig.json" || name === "tsconfig.app.json")
        .length > 0
        ? "typescript"
        : packages.length
          ? "javascript"
          : null,
    bundler: dependencies.vite
      ? "vite"
      : dependencies["react-scripts"]
        ? "create-react-app"
        : dependencies["@vue/cli-service"]
          ? "vue-cli"
          : null,
    packageManager: walk(root, (_, name) => name === "pnpm-lock.yaml").length
      ? "pnpm"
      : walk(root, (_, name) => name === "yarn.lock").length
        ? "yarn"
        : walk(root, (_, name) => name === "package-lock.json").length
          ? "npm"
          : null,
    hasRouter: Boolean(dependencies["react-router-dom"] || dependencies["vue-router"]),
    hasTests: Boolean(
      dependencies.vitest ||
        dependencies.jest ||
        dependencies["@testing-library/react"] ||
        dependencies["@vue/test-utils"],
    ),
    hasBackend,
    hasExternalApi:
      envVariables.some((name) => /API|SERVER|URL|GRAPHQL|TOKEN/.test(name)) ||
      /\b(?:fetch|axios|ApolloClient)\s*(?:\(|\.)/.test(source),
    envVariables,
    packageRoots: packages.map(({ path }) => relative(root, resolve(path, "..")) || "."),
    entrypoints: sourcePaths
      .filter((path) => /\/(?:main|index|App|server)\.(?:js|jsx|ts|tsx|vue|html)$/.test(path))
      .map((path) => relative(root, path))
      .slice(0, 20),
    nodeVersion: packages.find(({ data }) => data.engines?.node)?.data.engines.node ?? null,
    migrationStrategy: existsSync(root) ? strategy : "manual-review",
    migrationStatus: existsSync(resolve(projectRoot, "challenges", directory, "demo"))
      ? "in-progress"
      : "pending",
    reviewStatus: "unreviewed",
    reviewNotes: "",
  };
  inventory.push({
    ...generated,
    ...(inventoryOverrides[slug] ?? {}),
  });
}

const jsonPath = resolve(projectRoot, "docs/migration/inventory.json");
const markdownPath = resolve(projectRoot, "docs/migration/inventory.md");
writeFileSync(jsonPath, `${JSON.stringify(inventory, null, 2)}\n`);
writeFileSync(
  markdownPath,
  [
    "# Technical inventory",
    "",
    `Generated at ${new Date().toISOString()} without installing historical dependencies.`,
    "",
    "| Challenge | Imported | Framework | Bundler | Strategy | Review |",
    "| --- | --- | --- | --- | --- | --- |",
    ...inventory.map(
      (item) =>
        `| ${item.slug} | ${item.imported ? "yes" : "no"} | ${
          item.framework ?? "—"
        } ${item.frameworkVersion ?? ""} | ${item.bundler ?? "—"} | ${
          item.migrationStrategy
        } | ${item.reviewStatus} |`,
    ),
    "",
  ].join("\n"),
);

console.log(`Inventory written for ${inventory.length} repositories.`);
