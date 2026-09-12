# Challenge Portfolio architecture

This document explains how preserved challenge sources become maintained,
deployable portfolio pages. It is intended for repository maintainers; the
public project narrative remains in the root README and individual challenge
READMEs.

## System context

The deployed application is a static Astro site hosted below the
`/challenge-portfolio/` GitHub Pages base path. Astro owns routing, shared
layout, metadata, and static generation. Interactive demos are isolated behind
small renderer hosts and hydrate only where a project demo is rendered.

```mermaid
flowchart LR
  visitor[Visitor browser]
  pages[GitHub Pages<br/>static deployment]
  shell[Astro portfolio shell<br/>routing, catalog, SEO]
  registry[Generated challenge registry]
  react[React host<br/>5 demos]
  vue[Vue 3 host<br/>3 demos]
  static[Astro static host<br/>1 demo]

  visitor --> pages
  pages --> shell
  registry --> shell
  shell -->|client hydration| react
  shell -->|client hydration| vue
  shell -->|server-rendered HTML| static
```

The renderer counts describe the nine canonical entries. Historical projects
may use older or different stacks, but their dependencies are not part of the
deployed runtime.

## Repository boundaries

```mermaid
flowchart TB
  subgraph evidence[Preserved evidence]
    original[challenges/&lt;slug&gt;/original/<br/>immutable historical source]
    manifest[challenges/&lt;slug&gt;/challenge.json<br/>source metadata]
  end

  subgraph maintained[Maintained workspace]
    demo[challenges/&lt;slug&gt;/demo/<br/>supported adaptations]
    app[apps/portfolio/<br/>Astro shell and tests]
  end

  subgraph documentation[Generated and maintained documentation]
    entries[docs/portfolio/entries.json<br/>canonical portfolio model]
    inventory[docs/migration/inventory.*<br/>source audit]
    screenshots[docs/portfolio/screenshots/<br/>browser evidence]
  end

  original -. inspected by .-> inventory
  manifest --> inventory
  entries --> app
  demo --> app
  app --> screenshots
```

The critical ownership rule is one-way: maintained code may inspect and cite
`original/`, but must never modify it. Runtime fixes belong in `demo/`; catalog
and presentation fixes belong in `apps/portfolio/`.

## Metadata and catalog generation

`pnpm inventory` runs the inventory generator and metadata synchronizer in
sequence. The resulting registry is imported as typed data by Astro and is the
common input for pages, redirects, filters, structured data, and the sitemap.

```mermaid
flowchart LR
  repositories[scripts/migration/repositories.json]
  manifests[challenges/*/challenge.json]
  sources[challenges/*/original/]
  overrides[docs/migration/inventory-overrides.json]
  entries[docs/portfolio/entries.json]
  summaries[docs/portfolio/challenge-summaries.json]

  generator[generate-inventory.mjs]
  sync[sync-challenge-metadata.mjs]
  inventory[docs/migration/inventory.json + .md]
  data[apps/portfolio/src/challenges/data.json]
  registry[registry.ts<br/>typed access and aliases]

  repositories --> generator
  manifests --> generator
  sources --> generator
  overrides --> generator
  generator --> inventory

  repositories --> sync
  manifests --> sync
  inventory --> sync
  entries --> sync
  summaries --> sync
  sync -->|normalize generated fields| manifests
  sync --> data
  data --> registry
```

Edit `entries.json` for canonical entry composition, themes, descriptions,
aliases, screenshots, or featured order. Edit a challenge manifest for facts
about a preserved source. Regenerate after either change and review every
generated diff.

## Request and renderer flow

Canonical project pages and fullscreen demos share the same registry entry and
demo implementation. Aliases never create a second canonical project.

```mermaid
flowchart TD
  request[Requested slug]
  route{Route family}
  lookup[Registry lookup]
  alias{Canonical slug?}
  redirect[LegacyRedirect<br/>noindex + canonical redirect]
  detail[Challenge detail page<br/>BaseLayout + embedded demo]
  fullscreen[Fullscreen DemoPage<br/>noindex,follow]
  renderer{Challenge renderer}
  react[ReactDemoHost<br/>client:load]
  vue[VueDemoHost<br/>client:load]
  static[StaticDemoHost<br/>Astro HTML]

  request --> route
  route -->|/challenges/:slug| lookup
  route -->|/demos/:slug| lookup
  lookup --> alias
  alias -->|alias| redirect
  alias -->|canonical detail| detail
  alias -->|canonical demo| fullscreen
  detail --> renderer
  fullscreen --> renderer
  renderer -->|react| react
  renderer -->|vue3| vue
  renderer -->|static| static
```

`ChallengeDemo.astro` is the dispatch boundary. Additions must keep the
registry renderer and the corresponding React, Vue, or static host map in
sync.

## Image pipeline

Evidence screenshots are retained as source artifacts. `pnpm images` removes
the portfolio demo toolbar in memory, then creates deterministic web assets;
it does not rewrite the evidence PNGs.

```mermaid
flowchart LR
  demo[Canonical demo state]
  playwright[Playwright interaction<br/>UPDATE_SCREENSHOTS=1]
  evidence[9 evidence PNGs<br/>docs/portfolio/screenshots/]
  sharp[Sharp pipeline<br/>remove toolbar + crop]
  thumbs[9 WebP thumbnails<br/>800 x 500]
  projectSocial[9 project cards<br/>1200 x 630]
  portfolioSocial[1 portfolio card<br/>1200 x 630]

  demo --> playwright
  playwright -->|pnpm screenshots| evidence
  evidence -->|pnpm images| sharp
  sharp --> thumbs
  sharp --> projectSocial
  sharp --> portfolioSocial
```

Use `pnpm screenshots` only after a deliberate demo change. Use `pnpm images`
when the source screenshots are still valid and only their derived assets need
refreshing. Visually review generated binaries before publication.

## Validation and deployment

Pull requests run validation but never publish. A push to `main` runs the same
build path and, after a successful build, deploys the static artifact to
GitHub Pages.

```mermaid
flowchart TD
  change[Push or pull request]
  browser[Browser tests workflow<br/>Playwright + accessibility]
  security[Security workflow<br/>full-history Gitleaks]
  deploy[Pages workflow]
  quality[lint + typecheck + unit tests + build]
  artifact[Astro static artifact]
  event{Event type}
  pages[GitHub Pages]

  change --> browser
  change --> security
  change --> deploy
  deploy --> quality
  quality --> artifact
  artifact --> event
  event -->|pull request| stop[Validation only]
  event -->|push to main or manual dispatch| pages
```

The production build emits canonical pages, compatibility redirects,
fullscreen demos, `robots.txt`, and a sitemap restricted to the 12 canonical
URLs. After deployment, smoke-test both HTML-only pages and hydrated React and
Vue demos under the configured base path.

## Change-impact guide

| Change                               | Primary files                                | Required follow-up                                                                          |
| ------------------------------------ | -------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Add or regroup a portfolio entry     | `docs/portfolio/entries.json`, demo package  | Run `pnpm inventory`; update the renderer host when needed; test canonical and alias routes |
| Change preserved-source metadata     | `challenges/<slug>/challenge.json`           | Run `pnpm inventory`; review inventory and registry diffs                                   |
| Change a maintained demo             | `challenges/<slug>/demo/`                    | Run unit and browser tests; refresh screenshots only when the reviewed UI changed           |
| Change cards or shared presentation  | `apps/portfolio/src/`                        | Run browser presentation and accessibility tests; review desktop and mobile layouts         |
| Change screenshots or social framing | screenshot evidence or `generate-images.mjs` | Run `pnpm images`; verify all dimensions and visually review the binary outputs             |
| Change routing, aliases, or SEO      | pages, layouts, registry, Astro config       | Test canonical metadata, redirects, `noindex`, robots, and the 12-URL sitemap               |
| Change deployment or dependencies    | workflow, package, or lock files             | Run the complete quality gate and verify GitHub Pages after publication                     |

The maintenance commands and release checklist remain canonical in the
[handbook](README.md).
