# Sword Health Challenge

The complete sanitized history is preserved under `original/`. That directory
is historical evidence and must not be modified.

## Maintained demo

The Vue 3 demo under `demo/` preserves the news-platform workflow:

- browse and filter articles by category;
- progressively load more articles and open their detail view;
- start a clearly labelled local demo session;
- inspect the fixture-backed author profile;
- select and preview an article image locally;
- create an article that remains in the current browser session.

The historical application uses Auth0 for authentication and author identity.
The maintained portfolio does not contact that tenant. It substitutes a local
demo identity so the protected profile and authoring flows can be reviewed
safely without credentials, redirects, or external configuration.

Status: integrated, automatically tested, and owner-approved on 2026-07-28.
