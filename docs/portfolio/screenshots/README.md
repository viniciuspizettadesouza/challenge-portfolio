# Demo screenshots

These 23 images are reproducible browser evidence for the maintained challenge
demos. Each image is captured after the representative interaction asserted by
`apps/portfolio/e2e/demos.spec.ts`.

Refresh the complete set from the repository root:

```bash
pnpm screenshots
```

The command builds and previews the Astro portfolio, runs every demo in
Chromium, fails on browser console or page errors, and replaces the PNG files
in this directory. The images document the maintained portfolio runtime; they
do not replace historical assets preserved under `challenges/*/original/`.
