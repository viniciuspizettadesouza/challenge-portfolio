# Security and publication review

Sanitization completed on 2026-07-26. No sensitive value is reproduced in this
report.

## Items removed from the complete public history

- `challenge-pipz/original/.env`;
- the recruitment-process PDF from `challenge-onsign-tv/original`;
- historical `node_modules` from `challenge-stormtech`;
- historical `node_modules` from `challenge-jexperts`;
- historical `node_modules` from `challenge-meetime`.

## Redacted values

Gitleaks 8.30.1 found three unique values matching API-key rules in histories
from `challenge-blueticket`, `challenge-fyld-hansecom`, and
`challenge-onsign-tv`. Those values were replaced with `[REDACTED]` throughout
the public history.

## Validation

- scanner: Gitleaks 8.30.1;
- commits scanned: 268;
- data scanned: approximately 12.77 MB;
- findings after sanitization: none;
- temporary files containing original values: securely deleted.

## Result

The `main` branch was approved for publication. The repository owner completed
the deletion checklist and manually deleted the 20 superseded remote
repositories on 2026-07-29.

## Expansion audit

On 2026-07-30, Gitleaks 8.30.1 scanned the complete fetched histories of
`strains` and `nuxt-challenge` with redaction enabled. It scanned approximately
978.50 KB and reported no findings.

The `nuxt-challenge` recruitment brief was removed from the complete imported
history at both historical paths, `CHALLENGE.pdf` and
`backend/CHALLENGE.pdf`, consistent with the original migration's treatment of
recruitment-process PDFs. Repeat Gitleaks scans of both rewritten histories
reported no findings before their local import merges.

## Project 23 expansion audit

On 2026-09-02, the project-23 source tree and selected head were audited before
snapshot import. The recruitment PDF was excluded, and public brand references
in `package.json` and `src/components/navbar.tsx` were neutralized. The tracked
`.env` contains only the public ReqRes base URL. Searches for credentials,
secrets, API keys, private keys, and tokens found no secret material. The
maintained demo uses only fictional identities, a visibly synthetic password,
and deterministic local token values; it calls no production API.

No repository security script or Gitleaks executable was available in the
project-23 implementation environment. The targeted source/history audit and
five-commit PDF/branding verification passed; this section does not claim a
new Gitleaks scan.

## Ongoing automation

Phase 18 added a reproducible full-history scan at
`scripts/security/scan-secrets.sh`. Both `pnpm security:secrets` and the
scheduled GitHub Actions workflow run Gitleaks 8.30.0 from the official
multi-platform container pinned by digest. Version 8.30.1 is intentionally not
used because its published build has a confirmed detection regression.

The security workflow runs for pull requests, pushes to `main`, a weekly
schedule, and manual dispatches. Dependency update proposals cover the pnpm
workspace and GitHub Actions every Monday through `.github/dependabot.yml`.

The final Phase 18 local scan on 2026-09-02 covered 310 commits and
approximately 14.42 MB with no findings.

Maintainers review a finding before changing any allowlist:

1. Treat the exposed value as real until its owner confirms otherwise. Revoke
   or rotate a live credential before addressing repository history.
2. Use the rule ID, commit, path, and line reported by Gitleaks to determine
   whether the match is a real secret, a deliberately synthetic test value, or
   public non-secret configuration.
3. Remove real secrets from the current tree. Coordinate any required history
   rewrite separately; never weaken the scanner to make a failing workflow
   pass.
4. For a verified false positive, add only its exact Gitleaks fingerprint to
   `.gitleaksignore`, with a nearby comment explaining the non-secret source.
   Broad path, rule, regex, and entropy allowlists are prohibited.
5. Run `pnpm security:secrets` against the complete local history and record
   the reviewed result here before merging the exception.
