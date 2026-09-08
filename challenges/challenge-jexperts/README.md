# JExperts Challenge

> Portfolio note: this challenge's maintained demo is now consolidated into
> the domain-based **People Operations Workspace**. The source below remains
> preserved as historical evidence.

The complete sanitized history is preserved under `original/`. That directory
is historical evidence and must not be modified.

## Consolidated maintained demo

The React demo under `../people-operations/demo/` combines this employee
directory with the User Management challenge. It retains the JExperts
workflows through:

- approximate name search and a complete fictional directory;
- profile details including telephone, login, CPF, superior, and address;
- Director, Manager, and Consultant reporting constraints;
- direct-report filtering;
- validated creation and editing without retaining passwords.

The historical frontend read and wrote users through an Express/Mongoose server
connected to a hard-coded remote MongoDB instance. The maintained version uses
fictional local fixtures and never connects to that database. Registration
passwords are validated for the flow but deliberately discarded rather than
stored.

The consolidated demo uses runtime-only people mutations to preserve the User
Management reset requirement; theme preference remains the only persistent
state. Status: consolidated and automatically tested.
