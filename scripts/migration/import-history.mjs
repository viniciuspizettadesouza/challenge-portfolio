import { existsSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { delimiter, resolve } from "node:path";
import {
  argument,
  assertKnownRepository,
  output,
  projectRoot,
  readManifest,
  run,
  writeManifest,
} from "./lib.mjs";

const repositories = readManifest();
const localTools = resolve(projectRoot, ".migration-tools/bin");
if (existsSync(localTools)) {
  process.env.PATH = `${localTools}${delimiter}${process.env.PATH}`;
}
const repositoryName = argument("repository");
if (!repositoryName) {
  throw new Error("Pass exactly one repository with --repository <slug>.");
}

const repository = assertKnownRepository(repositoryName, repositories);
const incomplete = repositories.filter((item) => item.backupStatus !== "verified");
if (incomplete.length > 0) {
  throw new Error(
    `Import blocked: ${incomplete.length} backups are not verified (${incomplete
      .map((item) => item.name)
      .join(", ")}).`,
  );
}
if (repository.importStatus === "imported") {
  throw new Error(`${repository.name} is already marked as imported.`);
}
if (output("git", ["status", "--porcelain"], { cwd: projectRoot })) {
  throw new Error("Import requires a clean worktree.");
}

run("git", ["filter-repo", "--version"]);

const mirror = repository.backupMirror
  ? resolve(projectRoot, repository.backupMirror)
  : null;
if (!mirror || !existsSync(mirror)) {
  throw new Error(
    `Mirror not found for ${repository.name}: ${repository.backupMirror ?? "unset"}`,
  );
}

const temporaryRoot = mkdtempSync(resolve(tmpdir(), `${repository.name}-`));
const clone = resolve(temporaryRoot, repository.name);
const remoteName = `import-${repository.name}`;

try {
  run("git", ["clone", mirror, clone]);
  run(
    "git",
    [
      "filter-repo",
      "--force",
      "--to-subdirectory-filter",
      `challenges/${repository.name}/original`,
      "--tag-rename",
      `:${repository.name}-`,
    ],
    { cwd: clone },
  );

  const rewrittenHead = output(
    "git",
    ["rev-parse", `refs/heads/${repository.defaultBranch}`],
    { cwd: clone },
  );

  run("git", ["remote", "add", remoteName, clone], { cwd: projectRoot });
  run("git", ["fetch", remoteName, "--tags"], { cwd: projectRoot });
  run(
    "git",
    [
      "merge",
      "--allow-unrelated-histories",
      "--no-ff",
      `${remoteName}/${repository.defaultBranch}`,
      "-m",
      `chore(history): import ${repository.name}`,
    ],
    { cwd: projectRoot },
  );
  run("git", ["remote", "remove", remoteName], { cwd: projectRoot });

  repository.importStatus = "imported";
  repository.rewrittenHeadSha = rewrittenHead;
  repository.importMergeSha = output("git", ["rev-parse", "HEAD"], { cwd: projectRoot });
  repository.importedAt = new Date().toISOString();
  writeManifest(repositories);

  run("git", ["add", "scripts/migration/repositories.json"], { cwd: projectRoot });
  run(
    "git",
    ["commit", "-m", `chore(migration): record ${repository.name} import`],
    { cwd: projectRoot },
  );
} finally {
  try {
    run("git", ["remote", "remove", remoteName], { cwd: projectRoot, capture: true });
  } catch {
    // The remote is already absent in the successful path.
  }
  rmSync(temporaryRoot, { recursive: true, force: true });
}
