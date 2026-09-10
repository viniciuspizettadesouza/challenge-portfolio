# Content Platform

This maintained Vue 3 demo consolidates two content-focused historical
projects:

- Sword Health contributes category filtering, progressive article discovery,
  details, a local author session, profile access, image preview, and validated
  article publishing.
- Lagoasoft contributes its five-post social feed, original captions and like
  counts, local visual adaptations, and independent browser-only reactions.

News and social engagement remain distinct channels beneath a shared content
navigation shell. All records and mutations are local: the demo contacts
neither the historical Auth0 tenant nor expired Instagram media endpoints.

The immutable sources remain under `challenges/challenge-swordhealth/original/`
and `challenges/challenge-lagoasoft/original/`. The canonical route is
`content-platform`; both former canonical slugs and both historical source
slugs remain available as redirects.
