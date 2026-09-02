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
