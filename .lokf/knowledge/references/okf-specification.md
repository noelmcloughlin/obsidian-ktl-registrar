---
type: Reference
id: https://w3id.org/ktl/registrar/knowledge/references/okf-specification
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

OKF v0.2 defines the required `type`, the provenance, trust and lifecycle families (`generated`, `verified`, `sources`, `status`, `stale_after`), and the shape of an Attested Computation.

KTL Registrar checks the *shape* of the trust and lifecycle family, in a bundle that uses it. Since 0.4.0 it also checks the plain-OKF rules the LOKF schema subsumes: the required `type`, the shape of an Attested Computation, and the reserved structure of `index.md` and `log.md`. Severity follows the specification's own force, as [Why KTL Registrar](../explanation/why-ktl-registrar.md) explains. [OKF Enforcer](https://github.com/MartinForReal/okf-enforcer) is one existing validator for this layer.
