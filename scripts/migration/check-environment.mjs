import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { delimiter, resolve } from "node:path";
import { hasCommand, projectRoot } from "./lib.mjs";

const localTools = resolve(projectRoot, ".migration-tools/bin");
if (existsSync(localTools)) {
  process.env.PATH = `${localTools}${delimiter}${process.env.PATH}`;
}

const checks = [
  ["git", ["--version"], true],
  ["node", ["--version"], true],
  ["pnpm", ["--version"], true],
  ["python3", ["--version"], true],
  ["git", ["filter-repo", "--version"], true],
  ["git", ["lfs", "version"], false],
  ["gh", ["auth", "status", "--hostname", "github.com"], false],
];

let requiredFailure = false;

for (const [command, args, required] of checks) {
  const result = spawnSync(command, args, { encoding: "utf8" });
  const label = [command, ...args.slice(0, 1)].join(" ");
  const detail = (result.stdout || result.stderr || "not available").trim().split("\n")[0];
  const ok = result.status === 0;
  console.log(`${ok ? "OK" : required ? "ERROR" : "WARN"} ${label}: ${detail}`);
  requiredFailure ||= required && !ok;
}

if (!hasCommand("git", ["filter-repo", "--version"])) {
  console.error(
    "\nInstall git-filter-repo before importing history. See docs/plan/runbook.md.",
  );
}

if (requiredFailure) {
  process.exitCode = 1;
}
