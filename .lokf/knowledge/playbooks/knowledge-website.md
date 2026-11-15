---
type: Playbook
id: https://w3id.org/ktl/registrar/knowledge/playbooks/knowledge-website
title: Knowledge Website
description: "The website/ folder and the knowledge-website.yaml workflow: a Hugo site built from the bundle, the README, docs/ and the changelog, how to preview it, what to edit, and how the workflow builds it on pull requests and deploys it to GitHub Pages at `https://noelmcloughlin.github.io/obsidian-ktl-registrar/` once KNOWLEDGE_WEBSITE_ENABLED is true."
resource: website/README.md
sources:
  - resource: website/README.md
    title: what each page is built from, the preview commands and what to edit
  - resource: website/site.toml
    title: the site's address, title, description, repository and release tag
  - resource: website/scripts/build.sh
    title: the build, serve and preview commands
  - resource: website/scripts/prepare.sh
    title: the lokf export run and the generated folder
  - resource: .github/workflows/knowledge-website.yaml
    title: the triggers, the two jobs and the deploy switch
dependsOn:
  - https://w3id.org/ktl/registrar/knowledge/references/lokf-toolkit
generated:
  by: process:ktl-librarian
  at: "2026-11-15T03:16:48Z"
status: draft
verified:
  - by: process:ktl-librarian
    at: "2026-11-09T13:38:39Z"
---

# Overview

`website/` is a Hugo site. The Knowledge website workflow builds it and publishes it to GitHub Pages at `https://noelmcloughlin.github.io/obsidian-ktl-registrar/`. The ktl-website skill installed both the folder and the workflow. Every page comes from a file the repository already holds, so a change to the site is a change to that file.

# What the site is built from

No setting names these files. The build looks for each and shows what it finds.

- Each concept in `.lokf/knowledge/` becomes a page under `knowledge/`, with its trust label from `knowledge-report.sh`, its sources and its relations both ways. The bundle also gives the health page and the graph.

- The four files `lokf export` writes are served under `knowledge/`, beside each concept's own Markdown file and its JSON-LD. The bundle log is served as an Atom feed, `knowledge/log.xml`.

- The README becomes the home page, and each page under `docs/` becomes a page under `docs/`. The home page's Architecture button opens `docs/architecture.md`. The figures in `.assets/` are served under `assets/`.

- `CHANGELOG.md` becomes a page per release under `changelog/`, which search leaves out. Each release page links the repository, the docs and the bundle at the release's tag. `website/site.toml` sets `releaseTag` to `{version}`, so a release page looks for a tag such as `1.8.1`, not `v1.8.1`.

- The repository has no LinkML schema of its own, so the Schema part shows LOKF core, the schema the bundle is written in, from the copy in the `lokf` package.

- `website/site.toml` names no `browse` folder, so the site publishes no data.

The commit that promotes a release's changelog skips CI, so its page appears with the next build: the workflow's weekly run at the latest, or a run by hand.

# Preview it

You need bash, git and uv. The build needs no Node.js. Run these from `website/`:

- `scripts/build.sh` writes `dist/` with the search index, then checks every link between its pages.

- `scripts/build.sh serve` serves the site at `http://localhost:1313/obsidian-ktl-registrar/` and rebuilds it as you edit.

- `scripts/build.sh preview` serves the site as it will be published, at `http://localhost:1313/`.

`PORT=1400 scripts/build.sh serve` uses another port.

`build.sh` runs `scripts/prepare.sh` first. `prepare.sh` runs `lokf export` from the sidecar's own environment in `.lokf/`, and writes what Hugo cannot work out for itself into `generated/`, which is never committed. Hugo and Pagefind come from PyPI, at the versions `website/pyproject.toml` names and the hashes `website/uv.lock` holds.

# What to edit

- Edit a page's words in the file it comes from: the README, a page under `docs/`, or a concept, through the librarian and the curator like any other change to the bundle.

- Edit the site's own values in `website/site.toml`: its address, title and description, the repository, and optionally a logo, the docs pages' groups, more docs folders to leave out, old addresses to redirect, and the data to publish.

- Edit the site's look in `website/assets/css/custom.css`, which loads last. The colours and the trust tones are custom properties at the top of `website/assets/css/site.css`.

`site.toml`, `custom.css` and `website/README.md` are this repository's own. Every other file in `website/` is a copy of the ktl-website skill's template, and the skill's repair replaces it.

# The workflow

`.github/workflows/knowledge-website.yaml` runs on a push to the default branch and on a pull request when either touches `website/`, `ktl-website/`, `.lokf/`, `knowledge_bundle/`, the README, `docs/`, `.assets/`, `CHANGELOG.md`, `.linkml/`, a schema under `src/*/schema/`, the workflow itself or `knowledge-federation.yaml`. It also runs on Mondays at 05:23 UTC and on demand. It has two jobs, split for least privilege:

- `build` runs under a read-only token. It runs `website/scripts/build.sh`, which runs `prepare.sh`, then Hugo and Pagefind, then cleans the raw HTML and checks the links. It uploads `website/dist` as the Pages artifact. A pull request gets the same build and link check, and no deployment.

- `deploy` holds the `pages: write` and `id-token: write` scopes and runs GitHub's own deploy-pages action. It runs for the default branch only, and only once the repository variable `KNOWLEDGE_WEBSITE_ENABLED` is `true`.

Set `KNOWLEDGE_WEBSITE_ENABLED` under Repository variables, not on an environment, because a job's `if:` sees only repository and organization variables. Before setting it, tell Pages once to take its site from Actions, under Settings > Pages > Source. A repository that already publishes Pages another way keeps the variable unset until that publisher is retired, because two publishers overwrite each other's site.
