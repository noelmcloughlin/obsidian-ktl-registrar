---
type: Playbook
id: https://w3id.org/ktl/registrar/knowledge/playbooks/install-ktl-registrar
title: Install KTL Registrar
genre: how-to
description: How to get a LOKF bundle, open it as its own Obsidian vault, and install KTL Registrar there from a GitHub release, with BRAT or from source. The plugin is not yet in the community plugin store and needs Obsidian 1.13.0 or later.
resource: docs/install.md
sources:
  - resource: docs/install.md
  - resource: docs/architecture.md
  - resource: docs/using.md
  - resource: manifest.json
about:
  - https://w3id.org/ktl/registrar/knowledge/services/ktl-registrar-plugin
references:
  - https://w3id.org/ktl/registrar/knowledge/references/commands-and-settings
generated:
  by: process:ktl-librarian
  at: "2026-10-18T00:14:24Z"
status: draft
verified:
  - by: process:ktl-librarian
    at: "2026-10-18T00:14:24Z"
---

# Overview

`docs/install.md` says how to get a bundle, where to install KTL Registrar, and how to start. The plugin is not yet in the community plugin store, so a person installs it by hand in the vault that holds the bundle.

A person who only wants to ask about the plugin needs none of this. They install `ktl-docent` into any agent they use, by a route from [the install page](https://w3id.org/ktl/docs/install/), and ask it. It answers from the bundle and says how far each answer has been checked.

# Quick start

1. **Get a bundle.** The usual way is to run `ktl-sidecar` once at the host and then `ktl-librarian`, which derives concepts from the host's sources and marks every one a draft. The hand-made way is to open an empty folder as an Obsidian vault and run **Insert the bundle's semantic header** (see [Commands and settings](../references/commands-and-settings.md)). A small bundle grown by hand is a fine way to learn the format, but nothing refreshes it when the sources change.
2. **Open the bundle as a vault.** Choose **File → Open folder as vault**, and pick `knowledge_bundle`.
3. **Install the plugin in that vault**, in its `.obsidian/plugins/` folder, not in the workshop. `docs/architecture.md` names the workshop as a person's everyday vault. In a vault with no bundle, the plugin reads *LOKF: no bundle* and does nothing.
4. **Edit.** The status bar reads **LOKF ✓**, **LOKF ⚠ 3** or **LOKF ✖ 1**. Run **Validate vault** for the full report. Add [KTL Curator](https://w3id.org/ktl/curator/) when you start confirming what the librarian wrote.

Clicking the status-bar item validates the active note, or runs a vault scan if no note is open, as `docs/using.md` says.

When the `knowledge_bundle` link is missing, `docs/architecture.md` says to make it with `ln -s .lokf/knowledge knowledge_bundle`, or with `mklink /J knowledge_bundle .lokf\knowledge` on Windows. A person can also open `.lokf/knowledge` by path.

# Install routes

Install the plugin in the bundle's vault, at `<bundle>/.obsidian/plugins/ktl-registrar/`, by one of three routes:

- **From a [GitHub release](https://github.com/noelmcloughlin/obsidian-ktl-registrar/releases)**: copy `main.js`, `manifest.json` and `styles.css` into that folder, and enable the plugin under **Settings → Community plugins**.
- **With [BRAT](https://github.com/TfTHacker/obsidian42-brat)**: add `noelmcloughlin/obsidian-ktl-registrar` as a beta plugin. BRAT installs the latest release and keeps it updated.
- **From source**: run `npm ci && npm run build`, then copy the same three files.

The plugin requires Obsidian 1.13.0 or later, which `manifest.json` sets as its `minAppVersion`.
