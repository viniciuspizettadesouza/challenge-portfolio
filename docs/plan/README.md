# Consolidation plan

This directory is the permanent source of context for the consolidation. It is
organized so a contributor or a new agent session can resume the work without
depending on earlier conversations.

## Reading order

1. [Architecture and objective](architecture.md)
2. [Roadmap and exit criteria](roadmap.md)
3. [Maintenance runbook](runbook.md)
4. [Decisions and constraints](decisions.md)
5. [Current execution status](../migration/status.md)
6. [Manual deletion checklist](../migration/deletion-checklist.md)

## Central rule

Historical source lives in `challenges/<slug>/original` and must not be
modernized in place. Executable adaptations live in
`challenges/<slug>/demo`. The 20 superseded remote repositories were deleted
manually by the repository owner after the final migration review; automated
deletion remains prohibited.

## Scope

The initial scope contains exactly the 20 repositories listed in
[`scripts/migration/repositories.json`](../../scripts/migration/repositories.json).
`nuxt-challenge` is outside the initial migration.

## How to resume

Start with [`../migration/status.md`](../migration/status.md) for the completed
migration record, then use the maintenance runbook for ongoing work. Update the
status and relevant audit documents when evidence changes.

Agents may stage files only when the repository owner explicitly requests it.
They must not commit, push, tag, or open pull requests. The repository owner
handles Git publication. See [`../../AGENTS.md`](../../AGENTS.md).
