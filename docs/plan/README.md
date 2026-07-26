# Consolidation plan

This directory is the permanent source of context for the consolidation. It is
organized so a contributor or a new agent session can resume the work without
depending on earlier conversations.

## Reading order

1. [Architecture and objective](architecture.md)
2. [Roadmap and exit criteria](roadmap.md)
3. [Operational runbook](runbook.md)
4. [Decisions and constraints](decisions.md)
5. [Current execution status](../migration/status.md)
6. [Manual deletion checklist](../migration/deletion-checklist.md)

## Central rule

Historical source lives in `challenges/<slug>/original` and must not be
modernized in place. Executable adaptations live in
`challenges/<slug>/demo`. Original remote repositories must never be deleted
automatically.

## Scope

The initial scope contains exactly the 20 repositories listed in
[`scripts/migration/repositories.json`](../../scripts/migration/repositories.json).
`nuxt-challenge` is outside the initial migration.

## How to resume

Start with [`../migration/status.md`](../migration/status.md). Completed work
remains visible there. Continue from the first phase marked `In progress` or
`Pending`, and update the status and relevant checklist as evidence changes.

Use [`../migration/legacy-runtime-assessment.md`](../migration/legacy-runtime-assessment.md)
for the current easiest-to-hardest testing order and owner dependency assessment.

Agents may stage files only when the repository owner explicitly requests it.
They must not commit, push, tag, or open pull requests. The repository owner
handles Git publication. See [`../../AGENTS.md`](../../AGENTS.md).
