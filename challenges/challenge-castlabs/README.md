# Castlabs Challenge

The complete sanitized history is preserved under `original/`. That directory
is historical evidence and must not be modified.

## Maintained demo

The React demo under `demo/` preserves the original episode-management
workflow:

- search episodes by title or series;
- browse episode details and local poster artwork;
- create and delete episodes through an in-memory mutation flow;
- display immediate create/delete activity as a local subscription simulation.

The original application requires a private GraphQL HTTP endpoint, a WebSocket
subscription endpoint, API credentials, and OMDb. None of those services or
credentials are present in the repository. The maintained version therefore
uses deterministic fixtures, browser-only state, and local artwork so its core
workflow can be reviewed safely without network access.

Status: integrated, automatically tested, and owner-approved on 2026-07-28.
