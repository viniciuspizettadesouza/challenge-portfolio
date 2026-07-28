# Instruct Challenge

The complete sanitized history is preserved under `original/`. That directory
is historical evidence and must not be modified.

## Maintained demo

The Vue 3 demo under `demo/` modernizes the original Nuxt 2 leads interface:

- display the ten lead records used by the original JSONPlaceholder endpoint;
- search contacts by name;
- extract individual categories from each company's `bs` field;
- combine multiple category filters and remove them independently;
- present the results in a responsive sales-oriented table.

The maintained island uses a deterministic local copy of the original public
API response. This prevents live JSONPlaceholder availability or response
changes from affecting the portfolio while retaining the original fields and
filtering goal.

Status: integrated, automatically tested, and owner-approved on 2026-07-28.
