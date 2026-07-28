import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
export const manifestPath = resolve(projectRoot, "scripts/migration/repositories.json");

export function readManifest() {
  return JSON.parse(readFileSync(manifestPath, "utf8"));
}
