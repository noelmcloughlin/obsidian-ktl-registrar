---
type: Service
id: https://w3id.org/ktl/registrar/knowledge/services/settings-tab
title: Settings Tab
description: "The declarative settings tab in src/settings.ts (Obsidian 1.13.0 getSettingDefinitions API): its eleven groups, how list settings are stored and saved, bundle root folders and the break-glass whole-vault switch, and Known LOKF types as the domain-schema extension point."
resource: src/settings.ts
isPartOf:
- https://w3id.org/ktl/registrar/knowledge/services/ktl-registrar-plugin
about:
- https://w3id.org/ktl/registrar/knowledge/references/commands-and-settings
generated:
  by: process:ktl-librarian
  at: "2026-10-15T23:50:48Z"
verified:
- by: process:ktl-librarian
  at: "2026-10-15T23:50:48Z"
sources:
- resource: src/settings.ts
- resource: src/vocab.ts
---

# Overview

`KtlRegistrarSettingTab` returns declarative `SettingDefinitionItem` groups from `getSettingDefinitions()` instead of building DOM, so Obsidian's settings search indexes every setting. The declarative form needs Obsidian 1.13.0, and `manifest.json` sets `minAppVersion` to `1.13.0`.

The tab's groups, in order, are: This device, In-editor diagnostics, Type vocabulary, Type-specific fields, Semantic header and base IRI, OKF v0.2 base layer, Trust and lifecycle (OKF v0.2 §5), Relationships, Rule severity, Field aliasing (advanced), and Scope and performance. No group concerns any other plugin.

Settings a person edits as comma-separated text are stored as string arrays: known types, genre values, known predicates, concept statuses, the authority denylist, placeholder domains, rule ids to escalate, field aliases, excluded folders and bundle root folders. `getControlValue` and `setControlValue` join and split them, and saving goes through the plugin's own `saveSettings()`. The device-local disable switch goes through the same two methods, since it lives in local storage and is never synced.

# Bundle roots

*Bundle root folders* accepts a folder inside a dot-folder. A person may save one that Obsidian's index does not list today. Then a `Notice` warns that nothing under it will be scanned until a plugin exposes it (Hidden Folders Access, for one) or the folder is opened as its own vault.

Left blank, the vault decides:

- a root `index.md` with a LOKF header makes the whole vault the bundle;
- otherwise a top-level `knowledge_bundle` folder with its own `index.md` is the bundle;
- otherwise the vault has no bundle.

*Treat the vault root as the bundle (break-glass)* (`treatVaultRootAsBundle`) is off by default, and its description says it is meant to stay off. Turned on, it has the whole vault checked anyway. It never overrides a detected `knowledge_bundle` folder, because `implicitBundleRoots` in `src/validator.ts` puts the folder first. Changing either setting tells the plugin that its scope changed.

# Known LOKF types

*Known LOKF types* (`knownTypes`, under Type vocabulary) defaults to the classes of the pinned LOKF schema, and an untouched list is refreshed on upgrade. Its description says that a bundle validated against a domain schema (`lokf validate --schema <file>`) lists that schema's classes here too, because the plugin cannot read the schema, which sits outside the vault, and that listed classes stop warning and appear in autocomplete. It asks that the list be kept the same as KTL Curator's. `mergeSavedSettings` in `src/vocab.ts` refreshes the list only while it still equals the pre-schema default, so an edited list is never overwritten and never gains a later core class on its own.
