import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { basename, resolve } from "node:path";
import {
  argument,
  output,
  projectRoot,
  readManifest,
  run,
  writeManifest,
} from "./lib.mjs";

const backupRoot = resolve(
  argument("backup-dir", resolve(projectRoot, "../challenge-portfolio-backups")),
);
const mirrorsDir = resolve(backupRoot, "mirrors");
const bundlesDir = resolve(backupRoot, "bundles");
const metadataDir = resolve(backupRoot, "github-metadata");
const repositories = readManifest();

mkdirSync(mirrorsDir, { recursive: true });
mkdirSync(bundlesDir, { recursive: true });
mkdirSync(metadataDir, { recursive: true });

for (const repository of repositories) {
  const mirror = resolve(mirrorsDir, `${repository.name}.git`);
  const bundle = resolve(bundlesDir, `${repository.name}.bundle`);

  try {
    console.log(`\nBacking up ${repository.owner}/${repository.name}`);

    if (!existsSync(mirror)) {
      run("git", ["clone", "--mirror", repository.url, mirror]);
    } else {
      run("git", ["remote", "update", "--prune"], { cwd: mirror });
    }

    const symbolicHead = output("git", ["symbolic-ref", "--short", "HEAD"], { cwd: mirror });
    repository.defaultBranch = basename(symbolicHead);
    repository.originalHeadSha = output(
      "git",
      ["rev-parse", `refs/heads/${repository.defaultBranch}`],
      { cwd: mirror },
    );

    let attributes = "";
    try {
      attributes = output(
        "git",
        ["show", `${repository.originalHeadSha}:.gitattributes`],
        { cwd: mirror },
      );
    } catch {
      // A missing .gitattributes file means no declared LFS filters.
    }
    repository.usesLfs = /filter=lfs/.test(attributes);

    if (repository.usesLfs) {
      run("git", ["lfs", "fetch", "--all"], { cwd: mirror });
    }

    run("git", ["bundle", "create", bundle, "--all"], { cwd: mirror });
    run("git", ["bundle", "verify", bundle], { cwd: mirror });

    repository.backupStatus = "verified";
    repository.backupVerifiedAt = new Date().toISOString();
    repository.backupMirror = mirror;
    repository.backupBundle = bundle;
    delete repository.backupError;
  } catch (error) {
    repository.backupStatus = "failed";
    repository.backupError = error.message;
    writeManifest(repositories);
    console.error(`Backup stopped at ${repository.name}: ${error.message}`);
    process.exit(1);
  }

  writeManifest(repositories);
}

console.log(`\nAll ${repositories.length} backups verified in ${backupRoot}`);

