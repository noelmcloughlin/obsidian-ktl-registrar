---
type: Reference
id: https://ktl-registrar.example/knowledge/references/lokf-specification
title: LOKF Specification
description: The Linked Open Knowledge Format specification - a semantic profile of OKF binding fields and relationships to schema.org/DCAT/PROV-O.
resource: https://lokf.nolan-nichols.com/specification/
derivedFrom:
  - https://ktl-registrar.example/knowledge/references/okf-specification
generated:
  by: process:ktl-librarian
  at: "2026-09-13T19:00:00Z"
verified:
  - by: process:ktl-librarian
    at: "2026-09-13T19:00:00Z"
---

# Overview

LOKF is a semantic profile of OKF: the same directory-of-Markdown convention,
plus a bundle-root semantic header, a controlled type vocabulary (15
classes, `Role` included), typed RDF-backed relationships, and id/IRI-minting
rules. `src/validator.ts` implements Golden Rules 2-5 of this specification.
Golden Rule 6 (trust/provenance/lifecycle) is OKF v0.2's own: the plugin
checks the *shape* of those fields - a well-formed `{ by, at }` event, a
known `status`, a dated `stale_after`, a `resource` on every source - and
never their credibility, which is the sibling KTL Curator's surface
(`docs/for-the-curious.md`, "What LOKF adds over plain OKF"). Corrected
2026-09-13: this concept had said Rule 6 was left to a separately installed
OKF validator, the design abandoned on 2026-09-12.
