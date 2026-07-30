# 3cket Challenge

The approved `3cket` branch source snapshot is preserved under `original/`
without upstream commit ancestry. That directory is historical evidence and
must not be modified.

## Source selection and sanitization

The original repository is named `nuxt-challenge`, but its default `master`
branch contains only the supplied Express API, event fixture, images, and
challenge brief. The completed solution lives seven commits ahead on branch
`3cket`. The repository owner explicitly selected that branch for import.

The recruitment-process PDF was excluded from the imported snapshot at both of
its historical paths. Its functional requirements remain summarized in
portfolio-maintained documentation.

## Historical project

The original Nuxt 3/Tailwind application:

- loads ten events from the companion Express service;
- presents a responsive event-card grid;
- filters events by name;
- navigates to a dynamic event detail page;
- shows event images, location, dates, and price range;
- handles an unknown event slug.

It expects the Express server at `http://localhost:3001`, so the original
frontend cannot run on static GitHub Pages by itself.

## Maintained demo

The Vue 3 demo under `demo/` preserves the list, search, selection, detail, and
not-found flow using the imported JSON and images directly. It does not start
the historical backend or rewrite anything under `original/`.

Status: signed source snapshot imported; maintained demo owner-approved.
