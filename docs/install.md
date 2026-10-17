# Install

This page says how to get a bundle, where to install KTL Registrar, and how to start. [Using it](using.md) lists what the plugin does once it runs.

> **Only want to ask?** Install `ktl-docent` into any agent you use, by a route from [the install page](https://w3id.org/ktl/docs/install/), and ask it about this plugin. It answers from the bundle and says how far each answer has been checked.

## Quick start

1. **Get a bundle.** The usual way: at the host, run `ktl-sidecar` once and then `ktl-librarian` to derive concepts from your sources, every one marked a draft. The hand-made way: open an empty folder as a vault and run **Insert the bundle's semantic header** (below); a small bundle grown by hand is a fine way to learn the format, but nothing will refresh it when your sources change.
2. **Open it as a vault.** **File → Open folder as vault**, pick `knowledge_bundle`.
3. **Install the plugin there** ([Install](#install)), in that vault's `.obsidian/plugins/`, not in your workshop. Installed in a vault with no bundle it reads *LOKF: no bundle* and does nothing.
4. **Edit.** The status bar reads **LOKF ✓**, **LOKF ⚠ 3**, or **LOKF ✖ 1**. Click it, or run **Validate vault**, for the full report. Add [KTL Curator](https://github.com/noelmcloughlin/obsidian-ktl-curator) when you start confirming what the librarian wrote.

## Install

The plugin is not yet in the community plugin store. Install it in the bundle's vault, at `<bundle>/.obsidian/plugins/ktl-registrar/`.

- **From a [GitHub release](https://github.com/noelmcloughlin/obsidian-ktl-registrar/releases)**: copy `main.js`, `manifest.json` and `styles.css` into that folder and enable the plugin under **Settings → Community plugins**.
- **[BRAT](https://github.com/TfTHacker/obsidian42-brat)**: add `noelmcloughlin/obsidian-ktl-registrar` as a beta plugin. BRAT installs the latest release and keeps it updated.
- **From source**: `npm ci && npm run build`, then copy the same three files.

The plugin requires Obsidian **1.13.0** or later.
