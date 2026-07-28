# JExperts Challenge

The complete sanitized history is preserved under `original/`. That directory
is historical evidence and must not be modified.

## Maintained demo

The React demo under `demo/` follows the preserved JExperts screenshot and
retains the original employee-directory workflows:

- reveal all users or search names with approximate string matching;
- inspect the original profile fields and the associated address;
- create a user with the preserved profile fields;
- complete the previously separate address form as a second registration step;
- retain created fictional users in browser storage.

The historical frontend read and wrote users through an Express/Mongoose server
connected to a hard-coded remote MongoDB instance. The maintained version uses
fictional local fixtures and never connects to that database. Registration
passwords are validated for the flow but deliberately discarded rather than
stored.

Status: integrated, automatically tested, and owner-approved on 2026-07-28.
