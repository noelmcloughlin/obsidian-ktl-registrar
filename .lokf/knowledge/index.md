---
lokf_version: "0.2"
okf_version: "0.2"
base_iri: https://w3id.org/ktl/registrar/knowledge/
context: https://w3id.org/lokf/context.jsonld
title: KTL Registrar Knowledge Bundle
description: Validate the Linked Open Knowledge Format (LOKF) semantic layer on top of OKF v0.2 in Obsidian.
license: https://creativecommons.org/licenses/by/4.0/
publisher:
  type: Person
  id: https://w3id.org/ktl/registrar/knowledge/person/noelmcloughlin
  name: Noel McLoughlin
---

# KTL Registrar Knowledge Bundle

A [LOKF](https://lokf.nolan-nichols.com) knowledge base for the **KTL Registrar** Obsidian plugin. Every Markdown file under `knowledge/` is one concept; together they form a queryable knowledge graph, derived from this repository's code and docs.

`base_iri` is `https://w3id.org/ktl/registrar/knowledge/`, a namespace under Knowledge Trust Ladder's w3id.org authority; the w3id rule that resolves it is pending — see [Knowledge sources](playbooks/knowledge-sources.md).

# Services

* [KTL Registrar Plugin](services/ktl-registrar-plugin.md) - The plugin lifecycle in src/main.ts: fifteen commands, the status bar, vault-wide scanning, bundle-root resolution, and the read-only API the sibling KTL Curator may read.
* [Validator Engine](services/validator-engine.md) - The import-free rule engine in src/validator.ts: the LOKF semantic layer (bundle header and base_iri, type vocabulary, typed relationships, id minting, trust and lifecycle shape), the OKF v0.2 base layer behind checkOkfBaseLayer, the errors lokf validate also raises, and pure bundle-root detection.
* [Report View](services/report-view.md) - Collapsible side-panel view rendering the vault-wide LOKF conformance report.
* [Settings Tab](services/settings-tab.md) - The declarative settings tab in src/settings.ts (Obsidian 1.13.0 getSettingDefinitions API): its eleven groups, how list settings are stored and saved, bundle root folders and the break-glass whole-vault switch, and Known LOKF types as the domain-schema extension point.

# References

* [LOKF specification](references/lokf-specification.md)
* [LOKF Toolkit](references/lokf-toolkit.md) - The `lokf` PyPI package that the `.lokf/` sidecar depends on (`lokf[build]>=0.8.0`) and runs through the justfile recipes and the website's sync; a separate resource from the LOKF specification website.
* [OKF Specification (v0.2)](references/okf-specification.md) - The Open Knowledge Format v0.2 specification: a folder of Markdown files with YAML frontmatter, one concept per file, with a type as the only required field, plus the provenance, trust and lifecycle fields and attested computations.
* [Obsidian Plugin Guidelines](references/obsidian-plugin-guidelines.md) - Obsidian's developer guidelines for community plugins, for example sentence case in UI text, setHeading in a settings tab, no innerHTML, no detaching leaves in onunload and no hardcoded styling, which eslint-plugin-obsidianmd enforces in this repository.
* [Commands and Settings](references/commands-and-settings.md) - Every KTL Registrar command with its id and name, what the status-bar item does when clicked, and the settings groups under Settings → KTL Registrar, including Known LOKF types for a domain schema, from docs/using.md and src/main.ts.

# Glossary

* [LOKF](glossary/lokf.md) - LOKF, the Linked Open Knowledge Format: a semantic profile of OKF that binds every field, type and relationship to a public vocabulary, so a bundle expands to JSON-LD and RDF and can be queried.
* [OKF](glossary/okf.md) - OKF, the Open Knowledge Format: a folder of Markdown files with YAML frontmatter, one concept per file, whose only hard requirement is a type.
* [Diátaxis genre](glossary/diataxis-genre.md) - The optional Diátaxis genre facet (tutorial, how-to, reference or explanation) that tags how a concept's prose serves the reader; the plugin warns on a value outside the list.

# Playbooks

* [Knowledge Sources](playbooks/knowledge-sources.md) - Map of the repository files and outside sources this bundle is derived from, which concepts each feeds, how a refresh re-checks each, which files are left out on purpose, and which have no concept yet.
* [Contributing](playbooks/contributing.md) - How to set up KTL Registrar for development, how src/ splits into pure and Obsidian-bound modules, and the checklist before a pull request: npm run check, the changelog entry, the skills pin with its sidecar copies, and a releasing pull request title.
* [Releasing](playbooks/releasing.md) - Semantic-release computes the version and promotes CHANGELOG.md on merge to main, behind a required-reviewer Environment; the resulting tag invokes the same hardened build-and-attest workflow a hand-pushed tag always has.
* [Quality Gates](playbooks/quality-gates.md) - The lint-and-docs.yaml workflow: ShellCheck, actionlint with a check that every action is pinned to a commit, markdownlint, a link check and codespell, on pushes to main, every pull request and a weekly schedule; plus the markdownlint rule overrides and the Dependabot updates that keep the pins current.
* [Scheduled Librarian](playbooks/scheduled-librarian.md) - The knowledge-librarian.yaml workflow: three jobs split by privilege, so the agent proposes bundle changes as a patch under a read-only token and only a job that runs no agent pushes the branch and opens the review pull request; how it is switched on, when a scheduled week runs no agent, and the checks publish makes.
* [Knowledge registrar gate](playbooks/knowledge-registrar-gate.md) - The knowledge-registrar.yaml workflow: it validates the bundle and its relation targets and checks the sidecar conventions on every pull request that touches the bundle, and ties every human: confirmation a change adds, alters or removes to that person's approving review or verified signature, with an environment reviewer's attestation as the fallback.
* [Knowledge Website](playbooks/knowledge-website.md) - The website/ folder and the knowledge-website.yaml workflow: an Astro Starlight site built from the bundle, the README, docs/ and the changelog, how to preview it, what to edit, and how the workflow builds it on pull requests and deploys it to GitHub Pages at `https://noelmcloughlin.github.io/obsidian-ktl-registrar/` once KNOWLEDGE_WEBSITE_ENABLED is true.

# Policies

* [No Telemetry](policies/no-telemetry.md) - KTL Registrar makes no network requests, has no telemetry and no external services, and loads no remote code; it reads the open vault and writes only when a person runs a command that edits a note.
* [AI Covenant](policies/ai-covenant.md) - Contributors own what they submit, whichever tools helped write it; AI may support discussion but never take part on a person's behalf; a repository-owned agent commits under a bot identity, proposes every change as a reviewed pull request, runs with least privilege, and never records a person's verdict itself.
* [Code of Conduct](policies/code-of-conduct.md) - The project's code of conduct, adapted from Contributor Covenant 2.1, for harassment-free participation; the same file as the sibling knowledge-trust-ladder repository's.

# Explanation

* [Why KTL Registrar](explanation/why-ktl-registrar.md) - Why KTL Registrar exists: no other known tool checks the LOKF semantic layer, so it checks that layer and the OKF v0.2 base layer beneath it in the editor, reports rather than blocks, and stays independent of its sibling KTL Curator.
