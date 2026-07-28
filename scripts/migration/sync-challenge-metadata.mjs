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
const registry = [];

for (const repository of repositories) {
  const directory = resolve(projectRoot, "challenges", repository.name);
  const metadataPath = resolve(directory, "challenge.json");
  const metadata = JSON.parse(readFileSync(metadataPath, "utf8"));
  const audit = inventory.find((item) => item.slug === repository.name);
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
        : metadata.renderer ?? "case-study";

  const updated = {
    ...metadata,
    originalDefaultBranch: repository.defaultBranch,
    originalHeadSha: repository.originalHeadSha ?? "",
    framework: audit?.framework ?? metadata.framework ?? "",
    frameworkVersion: audit?.frameworkVersion ?? metadata.frameworkVersion ?? "",
    renderer,
    migrationStrategy: audit?.migrationStrategy ?? "manual-review",
    migrationStatus,
    hasBackend: audit?.hasBackend ?? false,
    hasExternalApi: audit?.hasExternalApi ?? false,
  };
  writeFileSync(metadataPath, `${JSON.stringify(updated, null, 2)}\n`);

  const company = updated.title.replace(/\s+Challenge$/, "");
  registry.push({
    slug: updated.slug,
    title: updated.title,
    company,
    description:
      summaries[updated.slug] ??
      "A preserved technical challenge available for source review and portfolio presentation.",
    technologies: updated.technologies ?? [],
    renderer: updated.renderer,
    migrationStatus: updated.migrationStatus,
    migrationStrategy: updated.migrationStrategy,
    sourcePath: `challenges/${updated.slug}/original`,
    originalRepository: updated.originalRepository,
    originalDefaultBranch: updated.originalDefaultBranch,
    originalHeadSha: updated.originalHeadSha,
    ...(existsSync(resolve(directory, "demo"))
      ? { demoPath: `challenges/${updated.slug}/demo` }
      : {}),
  });
}

writeFileSync(
  resolve(projectRoot, "apps/portfolio/src/challenges/data.json"),
  `${JSON.stringify(registry, null, 2)}\n`,
);
console.log(`Challenge metadata synchronized for ${registry.length} repositories.`);
