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

The repository manifest contains the completed initial 20 repositories and
three expansion projects in
[`scripts/migration/repositories.json`](../../scripts/migration/repositories.json).
The expansion adds Leafwell (`strains` source repository) as project 21,
presented as `challenge-leafwell`, and the owner-selected `3cket` branch from
`nuxt-challenge` as project 22, presented as `challenge-3cket`.
Their investigation, classifications, and completion criteria are recorded in
the [expansion assessment](../migration/expansion-assessment.md).
Project 23 is presented under the neutral `challenge-user-management` identity
and is assessed separately in
[its expansion assessment](../migration/expansion-assessment-user-management.md).

## How to resume

Start with [`../migration/status.md`](../migration/status.md). All 23 projects
are preserved and published, and their superseded source repositories have been
deleted by the owner after verification. No consolidation or expansion action
remains. Optional maintenance work is prioritized in Phase 18 of the
[roadmap](roadmap.md); use the maintenance runbook and update status and audit
documents when evidence changes.

Agents may stage files only when the repository owner explicitly requests it.
The owner authorized restoring the signed pre-expansion lineage, two signed
snapshot imports, and the final expansion integration commit. That exception
does not authorize a push, tag, pull request, or remote-repository action. The
repository owner handles Git publication. See [`../../AGENTS.md`](../../AGENTS.md).
