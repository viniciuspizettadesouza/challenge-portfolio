# React User Management Challenge

This project is portfolio challenge 23. It keeps a sanitized historical React
18, TypeScript, Vite, and React Router snapshot beside a maintained completion
of the full four-part technical exercise.

## Historical source

The historical application implemented approximately Part 1: sign-up,
sign-in, password confirmation, router-based navigation, a session token and
user id in `sessionStorage`, a welcome route, and a user lookup through ReqRes.
It did not implement the administrative CRUD dashboard, six-user pagination,
persistent theme preference, automated challenge tests, or Docker deployment.
Sign-in incorrectly required an id left by an earlier registration, and the
welcome request read the token without sending or otherwise enforcing it.

The imported history is based on `main` at
`f73752d439ab7ae4dbf4aaca579ca19a79443653`. Its recruitment PDF is excluded,
the former public brand is replaced in the package name and navigation
heading throughout the rewritten history, and no other source is modernized.
The tracked `.env` contains only
`https://reqres.in/api`; no secret, credential, generated build, or dependency
directory is included. These are the complete sanitization differences.

## Maintained demo

The demo completes Parts 1–4. It provides independent seeded sign-in, sign-up
validation, a token-bearing session, protected asynchronous service calls,
full in-memory user CRUD, exactly six users per page, deletion confirmation,
light/dark theme persistence, unit and Playwright coverage, and a standalone
Vite production build served by Docker. The authenticated landing view is the
dashboard and retains the required `Hello <first_name>` greeting.

ReqRes is intentionally replaced by deterministic fictional fixtures. This
keeps the static portfolio reliable, removes production API and personal-data
dependencies, and makes every test reproducible. The asynchronous local service
is the maintained demo's behavioural equivalent of the brief's backend; it is
not a literal ReqRes HTTP integration. User mutations live only in React
runtime state and reset on refresh; the session uses `sessionStorage`, while
theme preference alone uses `localStorage`.

Vitest and Playwright replace the brief's Cypress preference to follow the
portfolio's established test stack. Coverage explicitly verifies successful
sign-up, independent sign-in, malformed and cleared sessions, valid and invalid
tokens for every protected operation, CRUD reset, and theme persistence after
closing and reopening the application. The sanitized historical history remains
unchanged, so improvements in `demo/` are not presented as historical capabilities.

## Standalone and Docker

From the repository root:

```bash
pnpm --filter @challenge/user-management-demo dev
pnpm --filter @challenge/user-management-demo build
docker build -f challenges/challenge-user-management/demo/Dockerfile -t user-management-demo .
docker run --rm -p 8080:80 user-management-demo
```
