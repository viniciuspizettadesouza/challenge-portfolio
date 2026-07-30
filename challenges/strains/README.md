# Leafwell Challenge

The reviewed default-branch source snapshot is preserved under `original/`
without upstream commit ancestry. That directory is historical evidence and
must not be modified. The source remains in `challenges/strains/` while the
public portfolio route is named `challenge-leafwell` to reflect the original
Leafwell branding.

## Historical project

The original Next.js 13 application recreates two Leafwell strain pages from a
Figma source:

- an alphabetical, type-filtered listing backed by a GraphQL query;
- a dynamic strain detail route with composition and descriptive sections.

The listing is substantially implemented. The detail route combines its
dynamic slug with representative static content and external Leafwell assets.
The source depends on the historical
`https://dev.admin.leafwell.com/wp/graphql` endpoint.

## Maintained demo

The React demo under `demo/` keeps the reviewable product flow self-contained:

- search and filter strains by initial and type;
- paginate the resulting directory;
- open a strain detail view;
- inspect cannabinoid ranges, composition, aromas, and flavours;
- return to the filtered directory without contacting a third-party service.

The local fixture is deterministic and avoids making the static GitHub Pages
portfolio depend on API availability, CORS policy, or mutable health content.
It is representative rather than a stored copy of a live GraphQL response.

Status: signed source snapshot imported; maintained demo owner-approved.
