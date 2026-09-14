---
type: Playbook
id: https://lokf-registrar.example/knowledge/playbooks/contributing
title: Contributing
description: Local dev setup, layout, and pre-PR checklist for LOKF Registrar.
resource: CONTRIBUTING.md
generated:
  by: process:lokf-librarian
  at: "2026-09-14T12:15:00Z"
verified:
  - by: process:lokf-librarian
    at: "2026-09-14T12:15:00Z"
---

# Overview

`npm install && npm run dev` (esbuild watch mode); `npm run build`
type-checks (`tsc -noEmit`) then bundles; `npm run lint` runs
`eslint-plugin-obsidianmd`; `npm run smoke-test` runs the import-free modules
under plain Node - no Obsidian install needed for that one. Since 2026-09-14
that is ten modules, not `validator.ts` alone (`locator`, `vocab`, `graph`,
`fixes`, `propose`, `report-filter`, `suggest-context`, `affordances`,
`fields`), and `CONTRIBUTING.md` was corrected in the same change: it still
said the suite covered the rule engine only.

`main.js` is git-ignored and built by the release workflow, not committed -
so a fresh clone/checkout has no `main.js` at all. Obsidian shows a bare
"Failed to load plugin" with nothing in the console when the entry file is
missing (the loader has no `require`-able target and fails silently rather
than naming the cause), which is why the playbook now tells contributors to
run `npm install && npm run dev` (or `npm run build` for a one-off) before
the first reload, and again after any `git pull` that touches `src/`.

`validator.ts` must stay import-free, and free of anything an installed OKF
v0.2 validator already checks (required `type`, Attested Computation,
`index.md`/`log.md` structure) - except the *shape* of the OKF v0.2 §5
trust/lifecycle fields, which it does check.

The import-free boundary is also where logic goes to be testable: the
saved-settings merge rule moved out of `main.ts` into `vocab.ts`
(`mergeSavedSettings`) so the smoke test could reach it, and the Obsidian-bound
half - `main.ts`, the report view, the settings tab, the modals - stays
hand-checked in a real vault.
