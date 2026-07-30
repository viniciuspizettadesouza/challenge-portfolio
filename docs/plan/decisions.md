# Decisions and constraints

## Decisions

1. Astro is the static shell and can host React and Vue 3 components.
2. `original/` is the permanent historical archive; `demo/` is adaptable.
3. The default branch enters the monorepo unless the owner explicitly approves
   a named source ref. The 3cket solution branch is the documented exception;
   other references remain outside the consolidation scope.
4. The initial 20 sanitized histories remain attached to the original signed
   portfolio lineage.
5. Leafwell and 3cket are explicit snapshot-only exceptions: their reviewed
   source trees are preserved without upstream commit ancestry, and each has a
   separate owner-signed import commit.
6. Unknown projects are not modernized before the inventory is reviewed.
7. Unavailable backends should prefer fixtures and mocks over permanent
   infrastructure.
8. Sanitized paths and redacted values are documented in the migration
   manifest and security report.

## Safety constraints

- do not automate deletion, archival, renaming, or modification of remote
  repositories;
- do not use `--force` outside disposable clones or an explicitly authorized
  local history-sanitization operation;
- do not commit builds, dependencies, or secrets;
- do not execute scripts from historical projects during initial auditing;
- stop and report credentials without printing complete values;
- treat remote repository deletion as a manual, irreversible owner action.

The repository owner completed the final review and manually deleted all 20
superseded remote repositories on 2026-07-29.

## Git ownership

Automated agents may stage files only when the repository owner explicitly
requests it. They must not commit, push, tag, or open pull requests. By default,
future changes remain unstaged in the working tree for the repository owner.

On 2026-07-30, the owner explicitly authorized restoring the signed
pre-expansion lineage, creating signed snapshot commits for Leafwell (`strains`
source repository) and 3cket, and preparing the final integration commit. This
does not authorize an automated push, tag, pull request, or remote-repository
mutation.
