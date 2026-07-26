import { execFileSync, spawnSync } from "node:child_process";
import { readFileSync, renameSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
export const manifestPath = resolve(projectRoot, "scripts/migration/repositories.json");

export function readManifest() {
  return JSON.parse(readFileSync(manifestPath, "utf8"));
}

export function writeManifest(repositories) {
  const temporaryPath = `${manifestPath}.tmp`;
  writeFileSync(temporaryPath, `${JSON.stringify(repositories, null, 2)}\n`);
  renameSync(temporaryPath, manifestPath);
}

export function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd ?? projectRoot,
    encoding: "utf8",
    stdio: options.capture ? "pipe" : "inherit",
    env: { ...process.env, ...options.env },
  });

  if (result.status !== 0) {
    const details = [result.stdout, result.stderr].filter(Boolean).join("\n").trim();
    throw new Error(`${command} ${args.join(" ")} failed${details ? `:\n${details}` : ""}`);
  }

  return (result.stdout ?? "").trim();
}

export function output(command, args, options = {}) {
  return execFileSync(command, args, {
    cwd: options.cwd ?? projectRoot,
    encoding: "utf8",
    env: { ...process.env, ...options.env },
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

export function hasCommand(command, args = ["--version"]) {
  return spawnSync(command, args, { stdio: "ignore" }).status === 0;
}

export function argument(name, fallback = undefined) {
  const index = process.argv.indexOf(`--${name}`);
  return index === -1 ? fallback : process.argv[index + 1];
}

export function assertKnownRepository(name, repositories) {
  const repository = repositories.find((item) => item.name === name);
  if (!repository) {
    throw new Error(`Unknown repository: ${name}`);
  }
  return repository;
}

