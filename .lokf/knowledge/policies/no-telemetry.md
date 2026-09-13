---
type: Policy
id: https://lokf-registrar.example/knowledge/policies/no-telemetry
title: No Telemetry
description: LOKF Registrar makes no network requests and has no telemetry, analytics, or external services.
resource: README.md
generated:
  by: process:lokf-librarian
  at: "2026-09-13T19:00:00Z"
verified:
  - by: process:lokf-librarian
    at: "2026-09-13T19:00:00Z"
---

# Overview

The plugin reads the Markdown in the open vault and writes only when the
user runs a command or report action that edits a note: the semantic-header,
safe-fix, promote-relations and Obsidian-affordance commands, and the
report's *Fix this finding* / *Silence this note* actions. The affordance
commands add a managed body block or a `diataxis.md` map; everything else
edits frontmatter. Settings live in the vault's own plugin data. Nothing
leaves the machine. (Corrected 2026-09-13: this concept had still named the
header command as the only write path, which the README has not said for
some time.)
