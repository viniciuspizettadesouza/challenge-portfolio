import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { argument, output, projectRoot, readManifest } from "./lib.mjs";

const backupRoot = resolve(
  argument("backup-dir", resolve(projectRoot, "../challenge-portfolio-backups")),
);
const outputRoot = resolve(backupRoot, "github-metadata");
const repositories = readManifest();

mkdirSync(outputRoot, { recursive: true });

function gh(endpoint, paginate = false) {
  const args = ["api", "-H", "Accept: application/vnd.github+json"];
  if (paginate) args.push("--paginate");
  args.push(endpoint);
  return JSON.parse(output("gh", args));
}

for (const repository of repositories) {
  const fullName = `${repository.owner}/${repository.name}`;
  const target = resolve(outputRoot, repository.name);
  mkdirSync(target, { recursive: true });
  console.log(`Exporting metadata for ${fullName}`);

  const files = {
    "github-metadata.json": gh(`repos/${fullName}`),
    "branches.json": gh(`repos/${fullName}/branches?per_page=100`, true),
    "tags.json": gh(`repos/${fullName}/tags?per_page=100`, true),
    "releases.json": gh(`repos/${fullName}/releases?per_page=100`, true),
    "issues-and-pull-requests.json": gh(
      `repos/${fullName}/issues?state=all&per_page=100`,
      true,
    ),
  };

  for (const [name, data] of Object.entries(files)) {
    writeFileSync(resolve(target, name), `${JSON.stringify(data, null, 2)}\n`);
  }
}

console.log(`Metadata exported to ${outputRoot}. Review it before publication.`);

