---
type: Reference
id: https://ktl-registrar.example/knowledge/references/obsidian-plugin-guidelines
title: Obsidian Plugin Guidelines
description: Obsidian's developer guidelines for community plugins, for example sentence case in UI text, setHeading in a settings tab, no innerHTML, no detaching leaves in onunload and no hardcoded styling, which eslint-plugin-obsidianmd enforces in this repository.
resource: https://docs.obsidian.md/Plugins/Releasing/Plugin+guidelines
generated:
  by: process:ktl-librarian
  at: "2026-10-15T23:50:48Z"
verified:
- by: process:ktl-librarian
  at: "2026-10-15T23:50:48Z"
---

# Overview

Enforced in this repo via `eslint-plugin-obsidianmd` (`eslint.config.mts`):
no `innerHTML`/inline styles, no HTML heading elements in a settings tab
(`new Setting(...).setHeading()` instead), no detaching leaves in `onunload`
(this plugin has none - Obsidian cleans up views, commands, and
`registerEvent` handlers on its own), sentence-case UI text, and no plugin id
embedded inside command ids.
