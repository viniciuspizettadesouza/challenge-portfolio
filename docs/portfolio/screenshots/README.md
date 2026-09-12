# Demo screenshots

These 9 images are reproducible browser evidence for the curated portfolio
demos. Each image is captured after the representative interaction asserted by
`apps/portfolio/e2e/demos.spec.ts`.

Refresh the complete set from the repository root:

```bash
pnpm screenshots
```

The command builds and previews the Astro portfolio, runs every demo in
Chromium, fails on browser console or page errors, replaces the PNG files in
this directory, and regenerates the web thumbnails and social cards under
`apps/portfolio/public/images/`.

Run `pnpm images` when only the derived assets need refreshing. The PNG files
in this directory remain the source evidence for that deterministic Sharp
pipeline. The pipeline removes the portfolio demo toolbar before it crops the
thumbnail and social-card variants, while the screenshot setup keeps the
toolbar in normal document flow to prevent it from covering demo content.
These PNGs document the maintained portfolio runtime and do not replace
historical assets preserved under `challenges/*/original/`.
