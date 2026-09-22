---
type: Reference
id: https://ktl-registrar.example/knowledge/references/commands-and-settings
title: Commands and Settings
description: The plugin's commands, status-bar behavior, and settings-tab groups, as README.md documents them.
resource: README.md
generated:
  by: process:ktl-librarian
  at: "2026-09-14T14:58:54Z"
verified:
  - by: process:ktl-librarian
    at: "2026-09-14T14:58:54Z"
---

# Commands

Ids corrected 2026-09-12 against `src/main.ts` directly - several had drifted
from what the source actually names.

| id | name |
| --- | --- |
| `validate-vault` | Validate vault (full LOKF report) |
| `validate-active` | Validate active note |
| `scaffold-root-header` | Insert the bundle's semantic header (in a vault with no bundle, asks whether this vault is the exhibition or should hold a `knowledge_bundle/` folder) |
| `find-concept` | Find a concept (by name, type, or relations) |
| `find-orphan-concept` | Find an orphan concept (nothing links to it) |
| `field-reference` | Look up a LOKF field |
| `go-to-finding` | Go to a finding (search all findings) |
| `next-finding` / `previous-finding` | Go to next / previous finding |
| `fix-active` / `fix-vault` | Fix safe issues in the active note / across the vault |
| `propose-relations` | Promote body links to typed relations… |
| `add-affordances-active` / `generate-affordances` / `generate-diataxis-map` | Add Obsidian affordances to the active note / across the vault / Generate the Diátaxis map (`diataxis.md`, written as a `Document` with a minted `id` and `generated.by: ktl-registrar/<version>` so `lokf validate` accepts it) |

(Command ids other than the first three are as named in `src/main.ts`; the
README documents them by display name. There is no command that checks for,
opens, or recommends any other plugin. In a vault with **no bundle**
(neither a header on the root `index.md`, a detected `knowledge_bundle/`
folder, nor the break-glass *Treat the vault root as the bundle* setting),
every command other than `scaffold-root-header` explains why it did nothing
instead of acting - see [KTL Registrar plugin](../services/ktl-registrar-plugin.md).)

Clicking the status-bar item validates the active note, or runs a vault scan
if none is open.

# Settings groups

This device, In-editor diagnostics, Type vocabulary, Type-specific fields,
Semantic header & base_iri, OKF v0.2 base layer, Trust & lifecycle,
Relationships, Rule severity, Field aliasing, Scope & performance - see
`src/settings.ts` and [Settings tab](../services/settings-tab.md). Since
2026-09-14 the README's *Type vocabulary* bullet names *Known LOKF types*
as the extension point for a bundle validated against a domain schema
(`lokf validate --schema <file>`): list that schema's classes there, since
the plugin cannot read the schema from the vault. Unlisted classes only
warn unless `lokf/3-vocab` is escalated; an edited list is kept current by
hand, and should match KTL Curator's.
