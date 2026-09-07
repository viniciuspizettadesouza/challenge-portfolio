import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { projectRoot, readManifest } from "./lib.mjs";

const repositories = readManifest();
const inventory = JSON.parse(
  readFileSync(resolve(projectRoot, "docs/migration/inventory.json"), "utf8"),
);
const summaries = JSON.parse(
  readFileSync(
    resolve(projectRoot, "docs/portfolio/challenge-summaries.json"),
    "utf8",
  ),
);
const entries = JSON.parse(
  readFileSync(resolve(projectRoot, "docs/portfolio/entries.json"), "utf8"),
);
const sources = new Map();

for (const repository of repositories) {
  const slug = repository.slug ?? repository.name;
  const sourceDirectory = repository.directory ?? slug;
  const directory = resolve(projectRoot, "challenges", sourceDirectory);
  const metadataPath = resolve(directory, "challenge.json");
  const metadata = JSON.parse(readFileSync(metadataPath, "utf8"));
  const audit = inventory.find((item) => item.slug === slug);
  const migrationStatus =
    audit?.migrationStatus ??
    (repository.importStatus === "imported" ? "in-progress" : "pending");
  const renderer =
    audit?.migrationStrategy === "native-react"
      ? "react"
      : audit?.migrationStrategy === "native-vue3"
        ? "vue3"
        : audit?.migrationStrategy === "static-embed"
          ? "static"
          : (metadata.renderer ?? "case-study");

  const updated = {
    ...metadata,
    originalDefaultBranch: repository.defaultBranch,
    originalHeadSha: repository.originalHeadSha ?? "",
    ...(repository.importedSourceBranch
      ? {
          importedSourceBranch: repository.importedSourceBranch,
          importedSourceHeadSha: repository.importedSourceHeadSha,
        }
      : {}),
    framework: audit?.framework ?? metadata.framework ?? "",
    frameworkVersion:
      audit?.frameworkVersion ?? metadata.frameworkVersion ?? "",
    renderer,
    migrationStrategy: audit?.migrationStrategy ?? "manual-review",
    migrationStatus,
    hasBackend: audit?.hasBackend ?? false,
    hasExternalApi: audit?.hasExternalApi ?? false,
  };
  writeFileSync(metadataPath, `${JSON.stringify(updated, null, 2)}\n`);

  sources.set(slug, {
    slug: updated.slug,
    title: updated.title,
    description:
      summaries[updated.slug] ??
      "A preserved technical challenge available for source review and portfolio presentation.",
    technologies: updated.technologies ?? [],
    renderer: updated.renderer,
    migrationStatus: updated.migrationStatus,
    migrationStrategy: updated.migrationStrategy,
    sourcePath: `challenges/${sourceDirectory}/original`,
    originalRepository: updated.originalRepository,
    originalDefaultBranch: updated.originalDefaultBranch,
    originalHeadSha: updated.originalHeadSha,
    sourceDirectory,
  });
}

const usedSources = new Set();
const registry = entries.map((entry) => {
  const entrySources = entry.sourceSlugs.map((slug) => {
    const source = sources.get(slug);
    if (!source) throw new Error(`Unknown portfolio source: ${slug}`);
    if (usedSources.has(slug))
      throw new Error(`Duplicate portfolio source: ${slug}`);
    usedSources.add(slug);
    return source;
  });
  const primary = entrySources[0];
  const demoDirectory = entry.demoDirectory ?? primary.sourceDirectory;

  return {
    slug: entry.slug,
    title: entry.title,
    themes: entry.themes,
    description: entry.description ?? primary.description,
    technologies: [
      ...new Set(entrySources.flatMap(({ technologies }) => technologies)),
    ],
    renderer: entry.renderer ?? primary.renderer,
    migrationStatus: entrySources.every(
      ({ migrationStatus }) => migrationStatus === "migrated",
    )
      ? "migrated"
      : "in-progress",
    migrationStrategy: entry.migrationStrategy ?? primary.migrationStrategy,
    sources: entrySources.map(
      ({
        slug,
        title,
        sourcePath,
        originalRepository,
        originalDefaultBranch,
        originalHeadSha,
      }) => ({
        slug,
        title,
        sourcePath,
        originalRepository,
        originalDefaultBranch,
        originalHeadSha,
      }),
    ),
    aliases: entry.aliases ?? entry.sourceSlugs,
    ...(existsSync(resolve(projectRoot, "challenges", demoDirectory, "demo"))
      ? { demoPath: `challenges/${demoDirectory}/demo` }
      : {}),
  };
});

if (usedSources.size !== sources.size) {
  const missing = [...sources.keys()].filter((slug) => !usedSources.has(slug));
  throw new Error(
    `Portfolio sources are not represented: ${missing.join(", ")}`,
  );
}

writeFileSync(
  resolve(projectRoot, "apps/portfolio/src/challenges/data.json"),
  `${JSON.stringify(registry, null, 2)}\n`,
);
console.log(
  `Challenge metadata synchronized for ${registry.length} curated entries.`,
);
