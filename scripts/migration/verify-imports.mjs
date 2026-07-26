import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { output, projectRoot, readManifest } from "./lib.mjs";

const repositories = readManifest();
const rows = [];
let failures = 0;

function lines(command, args, cwd) {
  const value = output(command, args, { cwd });
  return value ? value.split("\n") : [];
}

function treePath(entry) {
  return entry.slice(entry.indexOf(" ") + 1);
}

function normalizeRedactions(entries, redactedPaths = []) {
  return entries.map((entry) => {
    const path = treePath(entry);
    return redactedPaths.includes(path) ? `<redacted> ${path}` : entry;
  });
}

for (const repository of repositories) {
  if (repository.importStatus !== "imported") {
    rows.push({
      name: repository.name,
      status: "pending",
      detail: "history not imported",
    });
    continue;
  }

  try {
    const sourceTree = normalizeRedactions(
      lines(
        "git",
        ["ls-tree", "-r", "--format=%(objectname) %(path)", repository.originalHeadSha],
        resolve(projectRoot, repository.backupMirror),
      ).filter((entry) => {
        const path = treePath(entry);
        return !(repository.sanitizedPaths ?? []).some(
          (sanitizedPath) =>
            path === sanitizedPath || path.startsWith(`${sanitizedPath}/`),
        );
      }),
      repository.redactedPaths,
    );
    const importedTree = normalizeRedactions(
      lines(
        "git",
        [
          "ls-tree",
          "-r",
          "--format=%(objectname) %(path)",
          `${repository.rewrittenHeadSha}:challenges/${repository.name}/original`,
        ],
        projectRoot,
      ),
      repository.redactedPaths,
    );
    const sourceAuthors = lines(
      "git",
      ["log", "--format=%an <%ae>", repository.originalHeadSha],
      repository.backupMirror,
    ).sort();
    const importedAuthors = lines(
      "git",
      ["log", "--format=%an <%ae>", repository.rewrittenHeadSha],
      projectRoot,
    ).sort();

    const treeMatches = JSON.stringify(sourceTree) === JSON.stringify(importedTree);
    const authorsMatch =
      JSON.stringify([...new Set(sourceAuthors)]) ===
      JSON.stringify([...new Set(importedAuthors)]);
    const sanitized =
      (repository.sanitizedPaths ?? []).length > 0 ||
      (repository.redactedPaths ?? []).length > 0;
    const status = treeMatches && authorsMatch ? "verified" : "failed";
    failures += status === "failed" ? 1 : 0;

    rows.push({
      name: repository.name,
      status,
      detail: `tree=${treeMatches ? "ok" : "different"}, authors=${
        authorsMatch ? "ok" : "different"
      }, files=${sourceTree.length}${
        sanitized
          ? `, removed=${(repository.sanitizedPaths ?? []).join(", ") || "—"}, redacted=${
              (repository.redactedPaths ?? []).join(", ") || "—"
            }`
          : ""
      }`,
    });
  } catch (error) {
    failures += 1;
    rows.push({ name: repository.name, status: "failed", detail: error.message });
  }
}

const report = [
  "# Relatório de preservação de histórico",
  "",
  `Gerado em ${new Date().toISOString()}.`,
  "",
  "| Repositório | Estado | Verificação |",
  "| --- | --- | --- |",
  ...rows.map((row) => `| ${row.name} | ${row.status} | ${row.detail.replaceAll("|", "\\|")} |`),
  "",
  "A comparação de árvore usa os IDs dos blobs e caminhos; a comparação de autores",
  "usa o conjunto de nomes e e-mails nos históricos original e reescrito.",
  "",
].join("\n");

writeFileSync(resolve(projectRoot, "docs/migration/history-report.md"), report);
console.log(report);
if (failures > 0) process.exitCode = 1;
