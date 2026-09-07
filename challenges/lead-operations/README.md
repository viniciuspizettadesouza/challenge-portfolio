# Lead Operations Workspace

This maintained Vue 3 demo consolidates the overlapping Instruct lead-filtering
and Meetime lead-management challenges. Their immutable historical sources
remain in `challenges/challenge-instruct/original/` and
`challenges/challenge-meetime/original/`.

The workspace combines contact and company search, composable category
filters, cadence assignment, validated lead creation and editing, confirmed
deletion, responsive table and card layouts, and resilient versioned browser
persistence. Thirteen deterministic records preserve both source datasets,
while a one-time compatibility path imports valid state from the retired
Meetime demo. No historical public or private API is contacted.
