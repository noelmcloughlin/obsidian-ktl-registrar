---
type: Service
id: https://ktl-registrar.example/knowledge/services/validator-engine
title: Validator Engine
description: "The import-free rule engine in src/validator.ts: the LOKF semantic layer (bundle header and base_iri, type vocabulary, typed relationships, id minting, trust and lifecycle shape), the OKF v0.2 base layer behind checkOkfBaseLayer, the errors lokf validate also raises, and pure bundle-root detection."
resource: src/validator.ts
isPartOf:
- https://ktl-registrar.example/knowledge/services/ktl-registrar-plugin
about:
- https://ktl-registrar.example/knowledge/references/lokf-specification
relatedTo:
- https://ktl-registrar.example/knowledge/references/lokf-toolkit
generated:
  by: process:ktl-librarian
  at: "2026-10-15T23:50:48Z"
verified:
- by: process:ktl-librarian
  at: "2026-10-15T23:50:48Z"
---

# Overview

`src/validator.ts` imports nothing, neither Obsidian nor a YAML parser. Callers hand in already-parsed frontmatter, and the note body when they have it, so the module runs unchanged under Obsidian and under plain Node in `scripts/smoke-test.ts`.

`validateLokfConcept` runs two layers. The LOKF semantic layer has five rule groups: the bundle-root semantic header and `base_iri` (`validateRootHeader`), the type vocabulary and type-specific fields (`validateTypeVocabulary`), typed relationships with target-existence checking (`validateRelationships`), id minting (`validateConceptId`), and the shape of the OKF v0.2 §5 trust and lifecycle fields (`validateTrustLifecycle`). The OKF v0.2 base layer, the `okf/*` rules behind the `checkOkfBaseLayer` setting, checks what the LOKF schema already subsumes: a required `type` (§11), the `Attested Computation` contract (§10), the reserved `index.md` and `log.md` structure (§8 and §9), and the v0.1 to v0.2 migration hints (§13). A vault that runs a dedicated OKF validator can turn that layer off. Credibility and trust-tier interpretation stay out of scope.

# Values and types

The engine never assumes a frontmatter value is a string. A scalar is coerced to text for messages, and a mapping or list is named by its shape (`<a mapping>`, `<a list>`). A missing or blank `type` on a note that carries other LOKF fields is the error `okf/type-required` while the base layer is on, and an ordinary note with only tags or aliases is left alone. A list or mapping as `type` is a shape warning, and a coercible scalar such as `type: 123` falls through to the ordinary "not in the vocabulary" warning. The type-specific field checks key on the exact class name, so a domain subclass of `Metric` is not held to its parent's recommended fields.

# Errors that match lokf validate

Since lokf 0.8.0, `lokf validate` rejects values that break the schema's patterns, and the engine reports each as an error: a `generated` or `verified` actor that is not `human:<id>`, `process:<id>` or `<producer>/<version>`, a `sources[].author` that is not an actor string, a `Person`'s `email` that is not an address, and a `Service`'s `http_method` outside `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD` and `OPTIONS`. A `generated` block with no `by` and a `sources` entry with no `resource` are errors too, because OKF marks both REQUIRED. `stale_after` may be an ISO 8601 datetime or a bare date.

# Relation fields

`RELATION_FIELDS` names thirteen fields: `isPartOf`, `hasPart`, `references`, `dependsOn`, `derivedFrom`, `about`, `sameAs`, `relatedTo`, `definedBy`, `source`, `measures`, `memberOf` and `holder`. They are every slot the LOKF schema ranges over Concept apart from `concepts` and `target`, and the smoke test holds this hand-kept list to the pinned manifest, `src/lokf-vocab.json`. The schema declares each of them multivalued, so a bare scalar in one of them fails `lokf validate`, and the engine warns with the list form rather than only resolving the target. The code notes that an audit recorded in this bundle's `log.md` on 2026-09-09 found that mistake in roughly half its concepts.

# Paths and bundle roots

`excludeFolders` accepts the same spellings a bundle-root folder does (a leading or trailing slash, surrounding whitespace, a `./` prefix) through the same normalizer. The `base_iri` authority-denylist check compares the URL's `hostname`, not `host`, so a denylisted domain on a non-default port cannot slip past it.

`implicitBundleRoots(rootIndexHasHeader, visibleBundleIndexExists, treatVaultRootAsBundle)` is the pure decision behind bundle-root detection. A header wins over a `knowledge_bundle` folder, and the folder wins over the break-glass setting. With all three false it returns an empty list, meaning a vault with no bundle, and `resolveBundleRoot` then resolves every path to `null`.

# Relation to the LOKF toolkit

The engine is an independent TypeScript implementation of the rules, not a wrapper around the [LOKF toolkit](../references/lokf-toolkit.md), and has no run-time dependency on that Python package. It runs when Obsidian scans a vault, and the Python toolkit maintains this `.lokf/` sidecar.
