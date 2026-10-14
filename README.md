<picture>
  <source media="(prefers-color-scheme: dark)" srcset=".assets/knowledge-trust-ladder-logo-dimmed.svg">
  <img src=".assets/knowledge-trust-ladder-logo.svg" alt="" width="56" align="right" />
</picture>

# KTL Registrar

> "We lasso the world with networks of silver-coloured Italian hemp,\
> We bind down the world into some sort of order;\
> We balance the earth in a pair of scales of our own devising."\
> — Amy Lowell, *The Congressional Library* (1922)

An Obsidian plugin that keeps a **LOKF knowledge bundle** well-formed as you edit it. Open the bundle as a vault, and a status-bar icon says where things stand, the offending frontmatter is underlined as you type, and a side panel names each finding in plain words. Nothing to configure, no network, no servers.

To install, see [the quick start](docs/install.md#quick-start). [The architecture](docs/architecture.md) says what a bundle is, which role this plugin plays in keeping one, and how it sits beside your own notes. [Using it](docs/using.md) lists the report panel, the in-editor diagnostics, the commands, the settings and the read-only API for other plugins.

KTL Registrar is the **registrar** of [Knowledge Trust Ladder](https://github.com/noelmcloughlin/knowledge-trust-ladder): it checks that every record is well-formed. Its sibling [KTL Curator](https://github.com/noelmcloughlin/obsidian-ktl-curator) records what a person decides about each record. Neither reaches a verdict of its own; the judging stays with the person.

> **Agents:** if `.lokf/knowledge/index.md` exists, read it first. `llms.txt` says how to weigh it.
