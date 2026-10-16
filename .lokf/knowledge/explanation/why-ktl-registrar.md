---
type: Explanation
id: https://w3id.org/ktl/registrar/knowledge/explanation/why-ktl-registrar
title: Why KTL Registrar
genre: explanation
description: "Why KTL Registrar exists: no other known tool checks the LOKF semantic layer, so it checks that layer and the OKF v0.2 base layer beneath it in the editor, reports rather than blocks, and stays independent of its sibling KTL Curator."
resource: docs/for-the-curious.md
sources:
- resource: README.md
- resource: docs/architecture.md
- resource: docs/for-the-curious.md
- resource: docs/using.md
about:
- https://w3id.org/ktl/registrar/knowledge/references/okf-specification
- https://w3id.org/ktl/registrar/knowledge/references/lokf-specification
relatedTo:
- https://w3id.org/ktl/registrar/knowledge/services/ktl-registrar-plugin
generated:
  by: process:ktl-librarian
  at: "2026-10-15T23:50:48Z"
status: draft
verified:
- by: process:ktl-librarian
  at: "2026-10-16T00:38:14Z"
---

# Overview

KTL Registrar keeps a LOKF knowledge bundle well-formed as a person edits it in Obsidian. The README names it the **registrar** of Knowledge Trust Ladder: it checks that every record is well-formed, and it reaches no verdict of its own on whether a record is true. `docs/architecture.md` places that job for anyone who works under the **three lines of defence**: the plugin is second-line work, keeping the format and never judging truth.

# What LOKF adds over plain OKF

Plain OKF is a folder of Markdown files whose only required field is a `type`. LOKF holds the same folder to a stricter dialect, with every field and relationship bound to a public vocabulary (schema.org, DCAT, PROV-O), so the bundle can be turned into a knowledge graph without loss. `docs/for-the-curious.md` lists what the plugin checks of that dialect:

- the bundle-root semantic header;
- the form and authority of `base_iri`;
- a controlled type vocabulary;
- the optional Diátaxis `genre`;
- typed relationships whose targets must exist;
- `id` consistency;
- the shape of the OKF v0.2 §5 trust and lifecycle fields.
`docs/architecture.md` says its authors know of no other tool that checks the LOKF semantic layer.

# Why it checks the OKF v0.2 base layer itself

Every LOKF field is a LOKF schema slot, so the plugin already has what it needs to check the plain OKF rules underneath the dialect. These are the `okf/*` findings: a required `type`, the `Attested Computation` contract, the reserved `index.md` and `log.md` structure, and the v0.1 to v0.2 migration hints. Severity follows the specification's own force. *Settings → OKF v0.2 base layer* switches them off in one place for a person who runs a dedicated OKF validator. `docs/architecture.md` names [OKF Enforcer](https://github.com/MartinForReal/okf-enforcer) as one validator for that layer, and says that none is required because the same base rules are checked here.

# Why it reports instead of blocking

LOKF's own rules are permissive: a missing optional field, an unknown `type` or a broken cross-link must never cause rejection. So the plugin reserves errors for four kinds of structural problem, which `docs/for-the-curious.md` lists under "Why almost everything is a warning", and reports everything else as a warning a person can act on or ignore. It writes only on an explicit command, and only to the form of a record, never to a claim.

# What it leaves out

The plugin checks the shape of the §5 trust and lifecycle fields and never their credibility. It does not weigh a source's signals, rank trust tiers or decide whether a claim is current, and it executes nothing. Whether a claim is true takes a librarian pass and a curator's review, and the sibling **KTL Curator** is where that review happens in the editor. The plugin never loads or calls a skill, an agent or another plugin, and neither plugin detects whether the other is installed. The one point of contact is the read-only `api` that `docs/using.md` describes, which another plugin may read without either depending on the other.
