---
type: Policy
id: https://w3id.org/ktl/registrar/knowledge/policies/no-telemetry
title: No Telemetry
description: KTL Registrar makes no network requests, has no telemetry and no external services, and loads no remote code; it reads the open vault and writes only when a person runs a command that edits a note.
resource: docs/architecture.md
generated:
  by: process:ktl-librarian
  at: "2026-10-15T23:50:48Z"
verified:
  - by: process:ktl-librarian
    at: "2026-10-27T01:14:26Z"
sources:
  - resource: README.md
  - resource: docs/architecture.md
  - resource: SECURITY.md
---

# Overview

KTL Registrar makes no network requests and has no telemetry and no external services, as the Privacy section of `docs/architecture.md` says. The README says the same in short: no network, no servers. `SECURITY.md` adds that the plugin loads no remote code, and makes no outward call and loads nothing while validating a note.

The plugin reads the Markdown in the open vault and writes only when a person runs a command that edits a note: the header, safe-fix, promote-relations and affordance commands, and the report's *Fix this finding* and *Silence this note* actions. Settings live in the vault's own plugin data.
