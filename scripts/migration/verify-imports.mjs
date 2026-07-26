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
    const sourceTree = lines(
      "git",
      ["ls-tree", "-r", "--format=%(objectname) %(path)", repository.originalHeadSha],
      resolve(projectRoot, repository.backupMirror),
    );
    const importedTree = lines(
      "git",
      [
        "ls-tree",
        "-r",
        "--format=%(objectname) %(path)",
        `${repository.rewrittenHeadSha}:challenges/${repository.name}/original`,
      ],
      projectRoot,
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
    const status = treeMatches && authorsMatch ? "verified" : "failed";
    failures += status === "failed" ? 1 : 0;

    rows.push({
      name: repository.name,
      status,
      detail: `tree=${treeMatches ? "ok" : "different"}, authors=${
        authorsMatch ? "ok" : "different"
      }, files=${sourceTree.length}`,
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
