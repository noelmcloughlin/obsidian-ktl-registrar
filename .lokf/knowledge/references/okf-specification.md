---
type: Reference
id: https://ktl-registrar.example/knowledge/references/okf-specification
title: OKF Specification (v0.2)
description: "The Open Knowledge Format v0.2 specification: a folder of Markdown files with YAML frontmatter, one concept per file, with a type as the only required field, plus the provenance, trust and lifecycle fields and attested computations."
resource: https://github.com/GoogleCloudPlatform/open-knowledge-format/blob/main/SPEC.md
generated:
  by: process:ktl-librarian
  at: "2026-10-15T23:54:09Z"
verified:
- by: process:ktl-librarian
  at: "2026-10-15T23:54:09Z"
---

# Overview

OKF v0.2 defines required `type`, the provenance/trust/lifecycle families
(`generated`, `verified`, `sources`, `status`, `stale_after`), and Attested
Computation shape. KTL Registrar checks the *shape* of the trust/lifecycle
family (in a bundle that uses it) and, since 0.4.0, the plain-OKF rules the
LOKF schema subsumes - required `type`, Attested Computation shape, reserved
`index.md`/`log.md` structure - with severity taken from the spec's own
force; see [Why KTL Registrar](../explanation/why-ktl-registrar.md).
[OKF Enforcer](https://github.com/MartinForReal/okf-enforcer) is one existing
validator for this layer.
