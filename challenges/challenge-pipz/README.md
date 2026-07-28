# Pipz Challenge

The complete sanitized history is preserved under `original/`. That directory
is historical evidence and must not be modified.

## Maintained demo

The React demo under `demo/` preserves the original film listing and visual
sequence:

- show the seven film records returned by the historical SWAPI `/films` flow;
- display episode numbers as Roman numerals and format release dates;
- present the blue introductory sentence and preserved Star Wars logo;
- animate all films in the historical API order as a yellow perspective crawl;
- provide discreet pause and restart controls for portfolio review.

The preserved frontend expected a removed `REACT_APP_API_URL` value and the old
`swapi.co` service. The maintained island stores the required title,
`episode_id`, and `release_date` fields locally, making it deterministic and
network-free.

Status: integrated, automatically tested, and owner-approved on 2026-07-28.
