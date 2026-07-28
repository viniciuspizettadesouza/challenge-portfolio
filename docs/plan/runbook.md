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
pnpm test:e2e
pnpm build
pnpm preview
```

`pnpm test:e2e` builds and previews the site, exercises all 20 demos in
Chromium, and refreshes the representative screenshots. It requires the
Playwright Chromium browser installed for the current Playwright version.

## 7. Resume implementation

Read `docs/migration/status.md` and continue from its first `In progress` or
`Pending` phase. The current implementation priority is:

1. have the repository owner review, commit, and push the completed demo
   fidelity and browser-evidence changes;
2. validate a fresh clone of that exact revision;
3. deploy the verified revision and create the release;
4. complete the final manual review and deletion checklist.

## 8. Finalize

Follow `docs/migration/deletion-checklist.md`. The tooling does not implement
remote deletion. That decision belongs to the repository owner after manual
review.

## 9. Deploy to GitHub Pages

The repository uses `.github/workflows/deploy-pages.yml` and the official Astro
and GitHub Pages actions. Astro's production configuration uses:

- site: `https://viniciuspizettadesouza.github.io`;
- base path: `/challenge-portfolio`;
- production URL:
  `https://viniciuspizettadesouza.github.io/challenge-portfolio/`.

The workflow runs lint, typecheck, unit tests, and the static build before
uploading the Pages artifact. It deploys on every push to `main` and supports
manual runs through `workflow_dispatch`.

For the first deployment:

1. commit and push the prepared Pages configuration;
2. open **Settings → Pages** in the GitHub repository;
3. under **Build and deployment**, select **GitHub Actions** as the source;
4. open **Actions → Deploy to GitHub Pages** and monitor both jobs;
5. verify the home page, challenge catalog, at least one detail route, and at
   least one fullscreen demo at the production URL;
6. record the deployed commit in `docs/migration/status.md` and mark the
   deployment checklist item complete.

No GitHub secret or paid hosting plan is required for this public static site.

## 10. Create the final release

After the release notes are committed, pushed, and deployed successfully, the
repository owner creates the annotated tag and GitHub release:

```bash
git tag -a migration-complete -m "release: complete challenge portfolio migration"
git push origin migration-complete
gh release create migration-complete \
  --title "Migration complete" \
  --notes-file docs/releases/migration-complete.md
```

Automated agents must not execute these commands. Confirm that the tag targets
the final published `main` commit and that the release is visible before
marking the release checklist item complete.

## Git policy

Automated agents may stage files only when the repository owner explicitly
requests it. They must not commit, push, tag, or open pull requests. Leave
changes unstaged in the working tree by default.
