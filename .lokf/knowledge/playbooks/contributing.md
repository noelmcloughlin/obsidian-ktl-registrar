---
type: Playbook
id: https://w3id.org/ktl/registrar/knowledge/playbooks/contributing
title: Contributing
description: "How to set up KTL Registrar for development, how src/ splits into pure and Obsidian-bound modules, and the checklist before a pull request: npm run check, the changelog entry, the skills pin with its sidecar copies, and a releasing pull request title."
resource: CONTRIBUTING.md
generated:
  by: process:ktl-librarian
  at: "2026-10-16T23:46:11Z"
verified:
- by: process:ktl-librarian
  at: "2026-10-16T23:46:11Z"
sources:
- resource: CONTRIBUTING.md
- resource: scripts/smoke-test.ts
- resource: .github/workflows/build.yml
---

# Overview

`CONTRIBUTING.md` is a checklist, not a design log: each rule is a line or two that links to where its reasoning lives. `npm run check` holds the file to a 1000-word budget, and `SECURITY.md` to a 900-word budget, through a check in `scripts/smoke-test.ts`.

# Development setup

Node 20 or later is required, and CI builds on 20, 22 and 24. A contributor clones the repository, runs `npm install`, and runs `npm run dev` for esbuild watch mode, which rebuilds `src/main.ts` into `main.js`.

`main.js` is generated and git-ignored, so a fresh clone has none, and Obsidian reports "Failed to load plugin" until the plugin is built. To test in a real vault, clone into `<your-vault>/.obsidian/plugins/ktl-registrar/`, or copy `main.js`, `manifest.json` and `styles.css` there, then reload Obsidian.

`overrides` in `package.json` points `@codemirror/state` and `@codemirror/view` at this project's own spec (`$@codemirror/state`), because `obsidian` peer-depends on exact versions of both that no bump can satisfy. Keep that reference form, since a pinned range there drifts from the dependency it overrides.

This repository's own `.lokf/` bundle is maintained with knowledge-trust-ladder, which nothing in the plugin depends on. CI installs the librarian at run time, at the release that `TRUST_LADDER_SKILLS_REF` names in `knowledge-librarian.yaml`. Skills are never committed: `.agents/`, `.claude/` and `skills-lock.json` are git-ignored.

# Layout

`src/` splits in two. The pure modules take already-parsed frontmatter and pull in nothing at run time, neither Obsidian nor a YAML library, so `npm run smoke-test` runs them under plain Node: `validator.ts`, `locator.ts`, `vocab.ts`, `graph.ts`, `fixes.ts`, `propose.ts`, `report-filter.ts`, `suggest-context.ts`, `affordances.ts` and `fields.ts`. The suite checks that `CONTRIBUTING.md` names exactly the modules it imports. Everything else (`main.ts`, the report view, the settings tab, the modals) needs a real Obsidian `App`, has no automated test, and is checked by hand in a vault. That boundary is why logic worth testing moves out of `main.ts` rather than being tested through it.

# Before opening a pull request

- Run `npm run check`: build, lint and smoke test, the same three steps `build.yml` runs. Lint is `eslint-plugin-obsidianmd`, so fix the code rather than widening the exceptions in `eslint.config.mts`.

- Check anything that needs the Obsidian `App` by hand in a real vault.

- Keep `validator.ts` to shape only: the OKF base layer (`okf/*`, behind `checkOkfBaseLayer`) and the LOKF semantic layer (`lokf/*`), never the credibility of a §5 field, a trust-tier verdict or runtime attestation.

- Make a link into a sibling repository resolve on that repository's `main` first, since the link check follows it.

- Add a line or two under `## [Unreleased]` in `CHANGELOG.md` when the change alters plugin behaviour. The release pipeline refuses an empty section.

- Regenerate `src/lokf-vocab.json` with `npm run build-vocab` only when bumping the sidecar's pinned `lokf`. It is built from the schema that `lokf` includes (`.lokf/uv.lock`, which needs `uv`) and kept identical to KTL Curator's.

- When moving `TRUST_LADDER_SKILLS_REF`, set `TRUST_LADDER_SKILLS_SHA` beside it to the commit that tag names, and copy the three `knowledge-*.yaml` workflows and the files under `.lokf/scripts/` and `.lokf/m365/` from that release's `skills/ktl-sidecar/templates/` in the same pull request.

- Give the pull request title a releasing type (`feat:`, `fix:`, `security:`) when the commits would release, because a squash merge takes its subject from the title and the `plan` job refuses a mismatch.

Dependabot bumps the pinned action SHAs and the npm devDependencies, and skips major bumps of `typescript`, `eslint` and `@eslint/js` until `eslint-plugin-obsidianmd` supports them.

# Releasing

`CONTRIBUTING.md` summarises the release flow and links to knowledge-trust-ladder's [docs/releasing.md](https://github.com/noelmcloughlin/knowledge-trust-ladder/blob/main/docs/releasing.md) for the whole pipeline. [Releasing](releasing.md) describes it from this repository's workflows.
