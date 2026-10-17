---
type: Service
id: https://w3id.org/ktl/registrar/knowledge/services/ktl-registrar-plugin
title: KTL Registrar Plugin
description: "The plugin lifecycle in src/main.ts: fifteen commands, the status bar, vault-wide scanning, bundle-root resolution, and the read-only API the sibling KTL Curator may read."
documentation: https://github.com/noelmcloughlin/obsidian-ktl-registrar#readme
resource: src/main.ts
dependsOn:
- https://w3id.org/ktl/registrar/knowledge/services/validator-engine
- https://w3id.org/ktl/registrar/knowledge/services/report-view
- https://w3id.org/ktl/registrar/knowledge/services/settings-tab
about:
- https://w3id.org/ktl/registrar/knowledge/references/commands-and-settings
generated:
  by: process:ktl-librarian
  at: "2026-10-15T23:50:48Z"
verified:
- by: process:ktl-librarian
  at: "2026-10-15T23:50:48Z"
---

# Overview

**KTL Registrar Plugin** (`src/main.ts`) is the plugin's lifecycle shell. It registers:

- fifteen commands: `validate-vault`, `validate-active`, `scaffold-root-header`, plus find, fix, affordance and navigation commands ([Commands and settings](../references/commands-and-settings.md) has the full, current id list);
- a clickable status-bar indicator (`LOKF ✓` / `LOKF ⚠ N` / `LOKF ✖ N` / `LOKF: no bundle`);
- the collapsible side-panel report view.

A person may run **Validate active note** (the command, or a status-bar click) on a note excluded by settings or outside every configured bundle root. The plugin says so in a `Notice`, instead of clearing the status bar to `LOKF: —` with no explanation. Every other outcome (clean, unreadable, N findings) already produced one. The debounced file-open path that fires on every navigation stays silent by design; only an explicit ask gets told why nothing happened.

Its settings are not its own (2026-09-14). `loadSettings` is one call to `vocab.ts`'s import-free `mergeSavedSettings` and one `Object.assign`. Defaults come from the pinned manifest, and saved values go over them. A vocabulary list still equal to the pre-schema hard-coded default is refreshed to the manifest's, while an edited one is preserved. The rule moved out of `main.ts` so the smoke test could reach it, which is the boundary this plugin draws generally.

It caches the bundle-root `base_iri`, read once per scan from `index.md` and invalidated on a `create`, `modify`, `delete` or `rename` of that one file, so opening notes doesn't re-read the root on every keystroke. It debounces file-open validation by 150ms, so arrowing through a file list doesn't parse a note per keystroke.

The plugin neither detects nor recommends any other plugin. An earlier design carried three things:

- a commented-out `detectOkfValidator`, reading Obsidian's undocumented `app.plugins`;
- a one-time notice recommending a separate OKF v0.2 validator;
- a settings action deep-linking to one.

All three were removed on 2026-09-12, once the OKF v0.2 base layer was checked here directly (see [Why KTL Registrar](../explanation/why-ktl-registrar.md)). The one plugin it names in code is its sibling **KTL Curator**, as a possible reader of the read-only `api` surface (`getReport`, `validatePath`, `onValidated`). That surface is offered, never required, with no dependency in either direction.

# Bundle roots, the no-bundle state, and the Diátaxis map (2026-09-12)

With *Bundle root folders* empty, `bundleRoots()` falls back to `implicitRoots()`, which calls `validator.ts`'s pure `implicitBundleRoots`. That function was renamed from the earlier `autoBundleRoot`, whose two-argument shape only distinguished "whole vault" from "detected `knowledge_bundle/`". It decides in this order:

- a root `index.md` carrying a LOKF header makes the whole vault the bundle (`[""]`);
- otherwise a top-level `knowledge_bundle/index.md` makes that folder the bundle (`[VISIBLE_BUNDLE_FOLDER]`);
- otherwise, with the break-glass *Treat the vault root as the bundle* setting (`treatVaultRootAsBundle`, off by default) also off, it returns an **empty list**: *no bundle at all*, not the old whole-vault fallback.

`hasNoBundle()` is `bundleRoots().length === 0`. In that state nothing is scanned or warned about, the status bar reads `LOKF: no bundle`, and every command that would otherwise act shows one explanatory `Notice` (`noBundleNotice()`) instead. Turning the break-glass setting on reads a headerless whole vault as one bundle anyway, but never overrides a detected `knowledge_bundle/` folder.

**Insert the bundle's semantic header** (`scaffold-root-header`) targets whichever bundle the active note belongs to. In a vault with no bundle it opens a two-choice modal (`ScaffoldChoiceModal`, `src/scaffold-modal.ts`):

- make this vault the exhibition (the header goes on the root `index.md`);
- create a `knowledge_bundle/` folder (the notes around it are left alone).

It suggests the first when the vault holds no Markdown besides `index.md`, and the second otherwise, and it never decides alone. The scan checks Obsidian's live index before explaining an absent root, so a dot-folder root that a plugin such as Hidden Folders Access exposes is scanned like any other.

`writeDiataxisMap` now writes `diataxis.md` as a `Document` with an `id` and `generated.by: ktl-registrar/<version>` (`affordances.ts`'s `DiataxisHeader`). It upgrades a headerless map on its next refresh, because `lokf validate` aborts a run on a note with no frontmatter, which the earlier map triggered.

The feature-fit audit that stood here as open questions is resolved:

- the map defect is fixed;
- the librarian skill is told to leave the affordance blocks and the map alone;
- `docs/using.md` describes *Promote body links* as the hand-authoring aid it is;
- the live check replaced the dot-folder refusal;
- `docs/architecture.md` names the plugin's writes for what they are.

# Identity

The plugin id is `ktl-registrar`: in `manifest.json`, the community entry, and the settings folder `.obsidian/plugins/ktl-registrar/`. The read-only API is reached at `app.plugins.plugins["ktl-registrar"].api`, the device-local disable switch is stored under `ktl-registrar:disabled-on-device`, and the Diátaxis map is stamped `generated.by: ktl-registrar/<version>`. [Why KTL Registrar](../explanation/why-ktl-registrar.md) explains the name.
