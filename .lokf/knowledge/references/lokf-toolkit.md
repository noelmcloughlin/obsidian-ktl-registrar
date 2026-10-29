---
type: Reference
id: https://w3id.org/ktl/registrar/knowledge/references/lokf-toolkit
title: LOKF Toolkit
description: The `lokf` PyPI package that the `.lokf/` sidecar depends on (`lokf[build]>=0.9.0`) and runs through the justfile recipes and the website's sync; a separate resource from the LOKF specification website.
resource: https://pypi.org/project/lokf/
sources:
  - resource: https://raw.githubusercontent.com/nicholsn/lokf/eab5fe35b99e154bec9aabc03656446b891311f8/lokf.yaml
    title: lokf.yaml at the commit tagged v0.9.0 (raw LinkML schema, no-Python fallback)
  - resource: .lokf/pyproject.toml
  - resource: .lokf/justfile
relatedTo:
  - https://w3id.org/ktl/registrar/knowledge/references/lokf-specification
generated:
  by: process:ktl-librarian
  at: "2026-10-29T02:09:46Z"
verified:
  - by: process:ktl-librarian
    at: "2026-10-27T01:14:26Z"
---

# Overview

`.lokf/pyproject.toml` declares `lokf[build]>=0.9.0`, and `.lokf/uv.lock` pins the version that is installed. In `.lokf/justfile`, the `lokf-install` recipe runs `uv sync`, and the `lokf-validate`, `lokf-check-refs`, `lokf-convert` and `lokf-serve` recipes run this package with `uv run lokf ...`. The knowledge website's sync also runs `lokf export` from this environment.

This package is a separate resource from the [LOKF specification](lokf-specification.md) (lokf.nolan-nichols.com). That site documents what LOKF *means*, and its own, broader environment-bootstrap flow, which this sidecar does not follow. Treating the two as one would credit the tooling dependency to a website that does not host it.

When `uv` or Python is not available, fetch the raw LinkML schema (`lokf.yaml`, listed as a source at the commit tagged v0.9.0) for a manual structural cross-check. It does not replace the generated JSON Schema checks that `lokf validate` runs. It is enough to catch an obviously wrong class or field name.

**Not to be confused with** [Validator Engine](../services/validator-engine.md) (`src/validator.ts`). That is the KTL Registrar *plugin*'s own independent TypeScript reimplementation of the same Golden Rules. It runs at vault-scan time and has no runtime dependency on this Python package. This toolkit only maintains this repository's `.lokf/` sidecar bundle.
