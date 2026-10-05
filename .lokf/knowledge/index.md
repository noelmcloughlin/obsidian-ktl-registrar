---
lokf_version: "0.2"
okf_version: "0.2"
base_iri: https://ktl-registrar.example/knowledge/
context: https://w3id.org/lokf/context.jsonld
title: KTL Registrar Knowledge Bundle
description: Validate the Linked Open Knowledge Format (LOKF) semantic layer on top of OKF v0.2 in Obsidian.
license: https://creativecommons.org/licenses/by/4.0/
publisher:
  type: Person
  id: https://ktl-registrar.example/knowledge/person/noelmcloughlin
  name: Noel McLoughlin
---

# KTL Registrar Knowledge Bundle

A [LOKF](https://lokf.nolan-nichols.com) knowledge base for the **KTL Registrar** Obsidian plugin. Every Markdown file under `knowledge/` is one concept; together they form a queryable knowledge graph, derived from this repository's code and docs.

`base_iri` is a placeholder (`ktl-registrar.example`, an RFC 2606 reserved domain) pending a real, owned namespace — see [Knowledge sources](playbooks/knowledge-sources.md).

# Services

* [KTL Registrar Plugin](services/ktl-registrar-plugin.md) - Obsidian plugin lifecycle - commands, status bar, vault-wide scanning, bundle-root resolution, and the read-only API the sibling KTL Curator may read.
* [Validator Engine](services/validator-engine.md) - Import-free LOKF semantic-layer rule engine - bundle-root header, type vocabulary, typed relationships, and id/IRI-minting consistency.
* [Report View](services/report-view.md) - Collapsible side-panel view rendering the vault-wide LOKF conformance report.
* [Settings Tab](services/settings-tab.md) - Declarative settings tab (Obsidian 1.13.0 getSettingDefinitions API) for KTL Registrar's configuration.

# References

* [LOKF specification](references/lokf-specification.md)
* [LOKF toolkit](references/lokf-toolkit.md)
* [OKF specification](references/okf-specification.md)
* [Obsidian plugin guidelines](references/obsidian-plugin-guidelines.md)
* [Commands and settings](references/commands-and-settings.md)

# Glossary

* [LOKF](glossary/lokf.md)
* [OKF](glossary/okf.md)
* [Diátaxis genre](glossary/diataxis-genre.md)

# Playbooks

* [Knowledge sources](playbooks/knowledge-sources.md)
* [Contributing](playbooks/contributing.md)
* [Releasing](playbooks/releasing.md)
* [Quality gates](playbooks/quality-gates.md)
* [Scheduled librarian](playbooks/scheduled-librarian.md)
* [Knowledge registrar gate](playbooks/knowledge-registrar-gate.md) - The knowledge-registrar.yaml workflow - validates the bundle on every pull request that touches it, and ties every newly added human: confirmation to evidence GitHub holds (that person's approval of the pull request, or their verified signature on the commit that introduced it), with an environment-reviewer attestation as the escape hatch for a repository that cannot sign.

# Policies

* [No telemetry](policies/no-telemetry.md)
* [AI Covenant](policies/ai-covenant.md)
* [Code of Conduct](policies/code-of-conduct.md)

# Explanation

* [Why KTL Registrar](explanation/why-ktl-registrar.md)
