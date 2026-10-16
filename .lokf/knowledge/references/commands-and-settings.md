---
type: Reference
id: https://w3id.org/ktl/registrar/knowledge/references/commands-and-settings
title: Commands and Settings
description: Every KTL Registrar command with its id and name, what the status-bar item does when clicked, and the settings groups under Settings → KTL Registrar, including Known LOKF types for a domain schema, from docs/using.md and src/main.ts.
resource: docs/using.md
generated:
  by: process:ktl-librarian
  at: "2026-10-15T23:50:48Z"
verified:
- by: process:ktl-librarian
  at: "2026-10-15T23:50:48Z"
sources:
- resource: docs/using.md
- resource: src/main.ts
---

# Commands

`docs/using.md` tells a person to search the command palette for **LOKF**, and lists the commands by display name with what each does. `src/main.ts` registers fifteen, with these ids:

| id | name |
| --- | --- |
| `validate-vault` | Validate vault (full LOKF report) |
| `validate-active` | Validate active note |
| `scaffold-root-header` | Insert the bundle's semantic header |
| `find-concept` | Find a concept (by name, type, or relations) |
| `find-orphan-concept` | Find an orphan concept (nothing links to it) |
| `fix-active` | Fix safe issues in the active note |
| `fix-vault` | Fix safe issues across the vault |
| `propose-relations` | Promote body links to typed relations… |
| `add-affordances-active` | Add Obsidian affordances to the active note |
| `generate-affordances` | Generate Obsidian affordances across the vault |
| `generate-diataxis-map` | Generate the Diátaxis map for this bundle |
| `field-reference` | Look up a LOKF field |
| `go-to-finding` | Go to a finding (search all findings) |
| `next-finding` | Go to next finding |
| `previous-finding` | Go to previous finding |

In a vault with no bundle, **Insert the bundle's semantic header** asks whether this vault is the bundle or should hold a `knowledge_bundle/` folder, and every other command explains why it did nothing (see [KTL Registrar plugin](../services/ktl-registrar-plugin.md)). **Fix safe issues across the vault** and **Generate Obsidian affordances across the vault** ask for a confirmation first. **Generate the Diátaxis map for this bundle** builds or refreshes `diataxis.md`, grouping concepts by `genre`.

Clicking the status-bar item validates the active note, or runs a vault scan if none is open.

# Settings groups

`docs/using.md` says every setting is also reachable through Obsidian's settings search. It lists these groups under **Settings → KTL Registrar**: This device, In-editor diagnostics, Type vocabulary, Type-specific fields, Semantic header & base_iri, Relationships, OKF v0.2 base layer, Trust & lifecycle, Rule severity, Field aliasing (advanced), and Scope & performance. [Settings tab](../services/settings-tab.md) gives the headings as `src/settings.ts` spells them.

*Known LOKF types*, under Type vocabulary, is the extension point for a bundle validated against a domain schema (`lokf validate --schema <file>`). A person lists that schema's classes there, since the plugin cannot read the schema, which sits outside the vault. Listed classes stop warning and appear in autocomplete; unlisted ones only ever warn. A list a person has edited is theirs to keep current, and should match KTL Curator's.
