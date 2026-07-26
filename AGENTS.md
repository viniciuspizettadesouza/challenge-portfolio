# Project Agent Instructions

## Git ownership

- Stage files only when the repository owner explicitly requests it.
- Do not create, amend, squash, rebase, or otherwise rewrite commits.
- Do not create tags.
- Do not push branches or tags.
- Do not open pull requests.
- By default, leave requested changes unstaged in the working tree for the
  repository owner to review, commit, and push.
- Only override these rules if the repository owner explicitly changes this
  policy in a future request.

## Historical sources

- Do not modify files under `challenges/*/original/`.
- Those directories are preserved historical sources. Adaptations belong in
  `challenges/<slug>/demo/`.

## Documentation

- Keep portfolio-maintained documentation in English.
- Keep completed migration steps visible and marked as completed.
- Update `docs/migration/status.md` with the current state and the next action.
- Do not translate documentation inside `challenges/*/original/`.
