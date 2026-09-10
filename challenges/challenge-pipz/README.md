# Pipz Challenge

> Portfolio note: this challenge's maintained demo is now consolidated into
> the domain-based **Screen Library**. The source below remains as immutable
> historical evidence.

The complete sanitized history is preserved under `original/`. That directory
is historical evidence and must not be modified.

## Consolidated maintained demo

The film collection under `../screen-library/demo/` preserves the original
film listing and visual sequence:

- show the seven film records returned by the historical SWAPI `/films` flow;
- display episode numbers as Roman numerals and format release dates;
- present the blue introductory sentence and preserved Star Wars logo;
- animate all films in the historical API order as a yellow perspective crawl;
- provide discreet pause and restart controls for portfolio review.

The preserved frontend expected a removed `REACT_APP_API_URL` value and the old
`swapi.co` service. The maintained island stores the required title,
`episode_id`, and `release_date` fields locally, making it deterministic and
network-free.

The former `challenge-pipz` and `film-crawl-experience` routes redirect to the
canonical `screen-library` entry. Status: consolidated and automatically tested.
