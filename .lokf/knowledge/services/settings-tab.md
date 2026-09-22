---
type: Service
id: https://ktl-registrar.example/knowledge/services/settings-tab
title: Settings Tab
description: Declarative settings tab (Obsidian 1.13.0 getSettingDefinitions API) for KTL Registrar's configuration.
resource: src/settings.ts
isPartOf:
  - https://ktl-registrar.example/knowledge/services/ktl-registrar-plugin
about:
  - https://ktl-registrar.example/knowledge/references/commands-and-settings
generated:
  by: process:ktl-librarian
  at: "2026-09-14T14:58:54Z"
verified:
  - by: process:ktl-librarian
    at: "2026-09-14T14:58:54Z"
---

# Overview

`KtlRegistrarSettingTab` returns declarative `SettingDefinitionItem` groups from
`getSettingDefinitions()` rather than building DOM in `display()` - the
imperative form is deprecated since Obsidian 1.13.0 and excluded from
settings search, which is why `manifest.json` sets `minAppVersion` to
`1.13.0`. Comma-separated list settings (known types, genre values, known
predicates, authority denylist, placeholder domains, excluded folders) are
joined/split in `getControlValue`/`setControlValue`, and persistence routes
through the plugin's own `saveSettings()` so settings are written from one
place. *Bundle root folders* no longer refuses a dot-folder entry: it is
saved, and a `Notice` warns if Obsidian's index does not list that folder
today (a plugin such as Hidden Folders Access can expose one); left empty, a
top-level `knowledge_bundle/` is detected on its own - and with neither a
header nor a `knowledge_bundle/` folder, the vault has no bundle at all
(status bar `LOKF: no bundle`), unless *Scope & performance*'s break-glass
**Treat the vault root as the bundle** toggle (`treatVaultRootAsBundle`, off
by default and "not recommended" in its own description) is on, which reads
a headerless whole vault as one bundle anyway without overriding a detected
`knowledge_bundle/` folder. The tab's groups are: This device, In-editor
diagnostics, Type vocabulary, Type-specific fields, Semantic header &
base_iri, OKF v0.2 base layer, Trust & lifecycle, Relationships, Rule
severity, Field aliasing, and Scope & performance. There is no group for any
other plugin: the former "Alternative OKF validator" group (a deep link into
the community-plugin browser plus a one-time-notice toggle) was removed on
2026-09-12.

*Known LOKF types* (`knownTypes`, under Type vocabulary) is the one setting
that widens what the plugin accepts rather than tightening it, and since
2026-09-14 its description says so: a bundle validated against a domain
schema (`lokf validate --schema <file>`) lists that schema's classes there,
the schema itself sitting outside the vault. Listed classes stop raising
`lokf/3-vocab` and join frontmatter autocomplete (`suggestVocabularyFor`
reads the same list). `loadSettings` refreshes the list to the pinned
manifest only while it still equals the pre-schema hard-coded default, so an
edited list is never overwritten - and never gains a later core class on its
own. The type-specific field checks in `validateTypeVocabulary` key on the
exact normalized class name, so a domain subclass of `Metric` is not held to
its parent's recommended fields.
