# Meetime Challenge

> Portfolio note: this challenge's maintained demo is now consolidated into
> the domain-based **Lead Operations Workspace**. The source below remains as
> immutable historical evidence.

The complete sanitized history is preserved under `original/`. That directory
is historical evidence and must not be modified.

## Maintained demo

The consolidated Vue 3 demo under `../lead-operations/demo/` modernizes both
routes from the original Vue 2/Vuetify prospecting client:

- create a lead for one of three deterministic cadences;
- validate cadence, name length, e-mail, and phone fields;
- list local leads with their creation date, phone, and cadence;
- edit a lead through a dialog;
- confirm lead deletion;
- retain the local lead collection in browser storage.

The preserved application sent cadence and lead requests to Meetime's private
API using historical authorization values. The maintained demo never contacts
that service and uses only clearly fictional local records.

Status: integrated, automatically tested, and owner-approved on 2026-07-28.
