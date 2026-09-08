# Castlabs Challenge

The complete sanitized history is preserved under `original/`. That directory
is historical evidence and must not be modified.

## Portfolio presentation

The maintained adaptation is consolidated with the Vue.js episode guide in
[`../tv-episode-library/demo`](../tv-episode-library/demo). It preserves the
Castlabs episode-management workflow:

- search episodes by title or series;
- browse episode details and local poster artwork;
- create and delete episodes through an in-memory mutation flow;
- display immediate create/delete activity and simulate the original external
  update subscription.

The original application requires a private GraphQL HTTP endpoint, a WebSocket
subscription endpoint, API credentials, and OMDb. None of those services or
credentials are present in the repository. The maintained version therefore
uses deterministic fixtures, browser-only state, and local artwork so its core
workflow can be reviewed safely without network access.

The former `challenge-castlabs` and `episode-management` routes redirect to the
canonical `tv-episode-library` entry.

Status: consolidated and automatically tested on 2026-09-08.
