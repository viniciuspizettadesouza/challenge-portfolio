# Migration runbook

Run commands from the `challenge-portfolio` repository root.

## 1. Prepare the environment

```bash
corepack enable
pnpm migration:check
```

Install `git-filter-repo` through the system package manager or an isolated
environment. Install Git LFS only if a repository uses LFS. Authenticate the
GitHub CLI with `gh auth login -h github.com` when complete metadata export is
required.

## 2. Maintain backups

The backup script defaults to the sibling directory
`../challenge-portfolio-backups`. It can be overridden:

```bash
pnpm migration:backup -- --backup-dir /secure/path
```

The script creates or updates mirrors, fetches LFS objects when required,
creates bundles, and verifies them. It is resumable and does not modify remote
repositories.

## 3. Export metadata

```bash
pnpm migration:metadata
```

Review exported JSON before publication and remove unnecessary personal data.

## 4. Import history

This phase is complete for the initial 20 repositories. If it ever needs to be
repeated, confirm that the worktree is clean and all backups are `verified`,
then import one repository at a time:

```bash
pnpm migration:import -- --repository challenge-vue
```

The script creates a temporary clone, runs `git-filter-repo`, imports tags,
creates a merge commit, and removes the temporary remote.

After any authorized history sanitization, refresh rewritten SHAs:

```bash
pnpm migration:refresh
```

## 5. Verify and inventory

```bash
pnpm verify:migration
pnpm inventory
```

Review `docs/migration/history-report.md` and
`docs/migration/inventory.md`. Unexpected differences are not acceptable.
Expected sanitization differences must be declared in the repository manifest.

## 6. Develop and validate the portfolio

```bash
pnpm install
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm preview
```

## 7. Resume implementation

Read `docs/migration/status.md` and continue from its first `In progress` or
`Pending` phase. The current implementation priority is:

1. manually review the generated inventory;
2. follow `docs/migration/legacy-runtime-assessment.md` from the easiest
   unverified project;
3. finish screenshots and completion evidence for Salsify and Vue;
4. implement the remaining demos or case studies by migration wave.

## 8. Finalize

Follow `docs/migration/deletion-checklist.md`. The tooling does not implement
remote deletion. That decision belongs to the repository owner after manual
review.

## Git policy

Automated agents may stage files only when the repository owner explicitly
requests it. They must not commit, push, tag, or open pull requests. Leave
changes unstaged in the working tree by default.
