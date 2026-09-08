# People Operations Workspace

This maintained React and TypeScript demo consolidates the overlapping
JExperts employee-directory and User Management administration challenges.
Their immutable historical sources remain under
`challenges/challenge-jexperts/original/` and
`challenges/challenge-user-management/original/`.

The workspace combines local sign-up and seeded sign-in, token-protected CRUD,
six-person pagination, approximate directory search, reporting-line filters,
Director/Manager/Consultant hierarchy validation, detailed employee profiles,
optional addresses, deletion confirmation, and persistent light/dark themes.
Seventeen deterministic records retain both maintained source datasets, while
passwords are validated but never stored and people mutations reset on refresh.
The standalone Vite and Docker/nginx build from User Management remains
supported. No historical database or public API is contacted.
