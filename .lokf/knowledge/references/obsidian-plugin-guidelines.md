---
type: Reference
id: https://w3id.org/ktl/registrar/knowledge/references/obsidian-plugin-guidelines
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

This repository enforces these guidelines with `eslint-plugin-obsidianmd` (`eslint.config.mts`):

- no `innerHTML` and no inline styles;
- no HTML heading elements in a settings tab (`new Setting(...).setHeading()` instead);
- no detaching leaves in `onunload`;
- sentence-case UI text;
- no plugin id embedded inside command ids.

This plugin detaches no leaves: Obsidian cleans up views, commands, and `registerEvent` handlers on its own.
