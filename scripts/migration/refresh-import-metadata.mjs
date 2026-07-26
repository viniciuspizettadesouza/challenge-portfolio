import { output, projectRoot, readManifest, writeManifest } from "./lib.mjs";

const sanitizedPaths = {
  "challenge-stormtech": ["backend/node_modules"],
  "challenge-jexperts": ["backend/node_modules"],
  "challenge-meetime": ["node_modules"],
  "challenge-pipz": [".env"],
  "challenge-onsign-tv": ["OnSign TV Front End Programming Test 3A (2).pdf"],
};

const redactedPaths = {
  "challenge-blueticket": [
    "blueticket_frontend/src/components/InputGeocode.vue",
    "src/components/InputGeocode.vue",
  ],
  "challenge-fyld-hansecom": [
    "components/Tutorial.vue",
    "pages/index.vue",
    "store/index.js",
  ],
  "challenge-onsign-tv": ["onsigntv_frontend/src/App.vue"],
};

const repositories = readManifest();

for (const repository of repositories) {
  if (repository.importStatus !== "imported") continue;

  const merge = output(
    "git",
    [
      "log",
      "--all",
      "--format=%H",
      "--grep",
      `^chore(history): import ${repository.name}$`,
      "-1",
    ],
    { cwd: projectRoot },
  );

  if (!merge) {
    throw new Error(`Import merge not found for ${repository.name}`);
  }

  repository.importMergeSha = merge;
  repository.rewrittenHeadSha = output("git", ["rev-parse", `${merge}^2`], {
    cwd: projectRoot,
  });
  repository.sanitizedPaths = sanitizedPaths[repository.name] ?? [];
  repository.redactedPaths = redactedPaths[repository.name] ?? [];
  repository.sanitizationStatus =
    repository.sanitizedPaths.length > 0 || repository.redactedPaths.length > 0
      ? "sanitized"
      : "not-needed";
}

writeManifest(repositories);
console.log(`Import metadata refreshed for ${repositories.length} repositories.`);
