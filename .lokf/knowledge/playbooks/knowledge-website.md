---
type: Playbook
id: https://w3id.org/ktl/registrar/knowledge/playbooks/knowledge-website
title: Knowledge Website
description: "The website/ folder and the knowledge-website.yaml workflow: an Astro Starlight site built from the bundle, the README, docs/ and the changelog, how to preview it, what to edit, and how the workflow builds it on pull requests and deploys it to GitHub Pages at `https://noelmcloughlin.github.io/obsidian-ktl-registrar/` once KNOWLEDGE_WEBSITE_ENABLED is true."
resource: website/README.md
sources:
  - resource: website/README.md
  - resource: website/site.config.mjs
  - resource: .github/workflows/knowledge-website.yaml
dependsOn:
  - https://w3id.org/ktl/registrar/knowledge/references/lokf-toolkit
generated:
  by: process:ktl-librarian
  at: "2026-10-16T00:38:14Z"
status: draft
verified:
  - by: process:ktl-librarian
    at: "2026-10-27T01:14:26Z"
---

# Overview

`website/` builds the site that the Knowledge website workflow publishes to GitHub Pages at `https://noelmcloughlin.github.io/obsidian-ktl-registrar/`. The ktl-website skill installed both the folder and the workflow. Every page comes from a file the repository already holds, so a change to the site is a change to that file.

# What the site is built from

- Each concept in `.lokf/knowledge/` becomes a page under `knowledge/`, with its trust label from `knowledge-report.sh`, its sources and its typed relations both ways.

- The four files `lokf export` writes are served under `knowledge/`, beside each concept's own Markdown file and its JSON-LD. The bundle log is served as an Atom feed, `knowledge/log.xml`.

- The README becomes the home page, each page under `docs/` becomes a page under `docs/`, and `CHANGELOG.md` becomes a page per release under `changelog/`, which search leaves out. Each release page links the repository, the docs and the bundle at the release's tag.

- The LinkML schema's pages and SQLite databases are shown only when `site.config.mjs` shows them. This repository's `site.config.mjs` sets `SCHEMA` to `"auto"` and `BROWSE` to `null`.

The commit that promotes a release's changelog skips CI, so its page appears with the next build: the workflow's weekly run at the latest, or a run by hand.

# Preview it

You need Node.js 22.12 or later and uv. From `website/`, run `npm ci`, then `npm run dev` to serve the site at `http://localhost:4321/obsidian-ktl-registrar/`, or `npm run build` to write `dist/` and check every link between its pages. Both commands run `npm run sync` first, which runs `lokf export` from the sidecar's own environment in `.lokf/` and writes the generated pages. Nothing the sync writes is committed.

# What to edit

- Edit a page's words in the file it comes from: the README, a page under `docs/`, or a concept, through the librarian and the curator like any other change to the bundle.

- Edit the site's values and options (the addresses, the title, the logo, the home page's tagline and buttons, the docs groups and the extra pages) in `site.config.mjs`.

- Edit the site's look in `src/styles/custom.css`, which is this repository's own. `theme.css` and `catalogue.css` are the house style.

# The workflow

`.github/workflows/knowledge-website.yaml` runs on a push to the default branch and on a pull request when either touches `website/`, the bundle, the README, `docs/`, `.assets/`, `CHANGELOG.md`, `llms.txt`, `.linkml/`, a justfile, a `pyproject.toml`, a `uv.lock` or the workflow itself. It also runs on Mondays at 05:23 UTC and on demand. It has two jobs, split for least privilege:

- `build` runs under a read-only token. It installs the lokf toolkit the sidecar pins with `uv sync --locked`, runs `npm ci` and `npm run build` in `website/`, and uploads `website/dist` as the Pages artifact. A pull request gets the same build and link check, and no deployment.

- `deploy` runs only GitHub's own deploy-pages action and holds the `pages: write` and `id-token: write` scopes. It runs for the default branch only, and only once the repository variable `KNOWLEDGE_WEBSITE_ENABLED` is `true`.

Set `KNOWLEDGE_WEBSITE_ENABLED` under Repository variables, not on an environment, because a job's `if:` sees only repository and organization variables. Before setting it, tell Pages once to take its site from Actions, under Settings > Pages > Source. A repository that already publishes Pages another way keeps the variable unset until that publisher is retired, because two publishers overwrite each other's site.
