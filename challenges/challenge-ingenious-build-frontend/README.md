# Ingenious Build Frontend Challenge

The complete sanitized history is preserved under `original/`. That directory
is historical evidence and must not be modified.

## Consolidated maintained demo

The transit collection under `../city-explorer/demo/` uses the complete
preserved `data.json` fixture and retains the original user stories:

- display all 11 bus lines in ascending order;
- select a line and view its stops ordered by route position;
- select a stop and view its departure times chronologically;
- browse all 163 unique stops, filter by name, and switch sort direction.

The historical application required a separate `json-server` process on port
3000. The maintained island imports that same bundled response locally, making
the portfolio demo deterministic and removing the localhost API requirement.

The former `challenge-ingenious-build-frontend` and
`public-transit-timetable` routes redirect to the canonical `city-explorer`
entry. Status: consolidated and automatically tested.
