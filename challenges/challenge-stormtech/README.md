# Stormtech Challenge

The complete sanitized history is preserved under `original/`. That directory
is historical evidence and must not be modified.

## Maintained demo

The React demo under `demo/` preserves the documented four-book dataset and
both original table sections:

- sort by title or author in either direction and by edition year descending;
- run the three ordered scenarios from the original README;
- reproduce the expected `SortingServiceException` for a null collection;
- reproduce the expected empty-set result;
- show the exact output book order for each scenario.

The historical frontend fetched books from an Express server backed by a
hard-coded remote MongoDB connection. The maintained demo replaces only that
database read with the exact records documented in the repository. The
preserved Storm Tecnologia logo, red controls, and table presentation remain
recognizable without requiring two processes or a database.

Status: integrated, automatically tested, and owner-approved on 2026-07-28.
