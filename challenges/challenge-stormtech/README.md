# Stormtech Challenge

> Portfolio note: this challenge's maintained demo is now consolidated into
> **Structured Data Workbench**. The source below remains as immutable
> historical evidence.

The complete sanitized history is preserved under `original/`. That directory
is historical evidence and must not be modified.

## Maintained demo

The book-sorting workspace under `../structured-data-workbench/demo/`
preserves the documented four-book dataset and both original table sections:

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

Status: consolidated and automatically tested. The historical source slug and
former `configurable-book-sorting` route redirect to the canonical
`structured-data-workbench` entry.
