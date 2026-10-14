# Architecture

This page says what a knowledge bundle is, which role KTL Registrar plays in keeping one, and how the bundle sits beside your own notes. It is for anyone deciding whether to use the plugin, and for anyone who keeps a bundle with it. [Install](install.md) gets it running, and [Using it](using.md) lists the report panel, the in-editor diagnostics, the commands, the settings and the read-only API for other plugins.

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="../.assets/ktl-obsidian-plugins-card-dimmed.svg">
    <img src="../.assets/ktl-obsidian-plugins-card.svg" alt="The five LOKF roles, and which two are Obsidian plugins" width="720" />
  </picture>
</p>

A bundle is a folder of Markdown notes in the [Linked Open Knowledge Format](https://lokf.nolan-nichols.com/) (LOKF): one concept per note, a few properties on each, and an `index.md` at the root that names the bundle. The [`knowledge-trust-ladder`](https://github.com/noelmcloughlin/knowledge-trust-ladder) skills build one beside whatever they are run on: a code repository, a vault of notes, a folder of documents.

This plugin is the **registrar** of that family: it checks that every record is well-formed. Its sibling [KTL Curator](https://github.com/noelmcloughlin/obsidian-ktl-curator) records what a person decides about each record. Neither reaches a verdict of its own; the judging stays with the person.

All the roles are on the skills' [architecture page](https://github.com/noelmcloughlin/knowledge-trust-ladder/blob/main/docs/architecture.md#four-skills-three-lines-of-the-poem), and the two plugins under [the fifth role](https://github.com/noelmcloughlin/knowledge-trust-ladder/blob/main/docs/architecture.md#the-fifth-role-which-is-not-a-skill). For anyone who works under the **three lines of defence**, this plugin is second-line work, keeping the format and never judging truth; [docs/three-lines.md](https://github.com/noelmcloughlin/knowledge-trust-ladder/blob/main/docs/three-lines.md) says where the rest sit.

Obsidian is optional in both directions: the skills rely on `lokf validate`, not on this plugin, and the plugin works on any LOKF bundle however it was made. The format is all they share.

## Two vaults

Your everyday vault is the **workshop**. The bundle is the **exhibition**: a second, smaller vault that you open through the `knowledge_bundle` link the skills leave at the root of the host. The two never index the same file, so nothing here touches your notes.

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="../.assets/ktl-two-vaults-dimmed.svg">
    <img src="../.assets/ktl-two-vaults.svg" alt="Workshop vault and exhibition vault, one folder, no shared index" width="720" />
  </picture>
</p>

How the link behaves on each host is the skills' business, recorded once in their playbook [Open the knowledge bundle in Obsidian](https://github.com/noelmcloughlin/knowledge-trust-ladder/blob/main/.lokf/knowledge/playbooks/open-bundle-in-obsidian.md): Windows junctions, synced drives that drop links, and what Obsidian's file reconciler does with it. If the link is missing, `ln -s .lokf/knowledge knowledge_bundle` (or `mklink /J knowledge_bundle .lokf\knowledge` on Windows) makes it, or open `.lokf/knowledge` by path.

## Which folder is the bundle

With nothing configured, the vault decides:

1. A root `index.md` with a LOKF header means **the whole vault is the bundle**, which is the case whenever you open `knowledge_bundle` as a vault.
2. Otherwise a top-level `knowledge_bundle/` folder with its own `index.md` is the bundle, and notes outside it are left alone.
3. Otherwise there is **no bundle**. Nothing is scanned and every command says so.

Two settings widen that under *Settings → Scope and performance*:

- **Bundle root folders**: for a bundle that sits as a folder inside a larger vault, or several of them (`bird-watching, projects/art-portfolio`). Each is an independent bundle with its own `index.md` and `base_iri`; notes outside every listed folder are ignored. Obsidian indexes such a folder like any other, so exhibits mix with your notes in search, graph and link suggestions, which is why the skills lay the bundle down as a separate vault instead (the playbook's [last section](https://github.com/noelmcloughlin/knowledge-trust-ladder/blob/main/.lokf/knowledge/playbooks/open-bundle-in-obsidian.md#why-the-bundle-is-never-a-real-folder-inside-a-vault) says why).
- **Treat the vault root as the bundle**: a break-glass switch for a vault that really is a bundle but whose root `index.md` has no header yet.

A folder inside a dot-folder is accepted but only scanned if something has put it in Obsidian's index (the community plugin *Hidden Folders Access* does that); otherwise the scan says so rather than reporting an empty bundle as clean.

## Privacy

No network requests, no telemetry, no external services. The plugin reads the Markdown in the open vault and writes only when you run a command that edits a note: the header, safe-fix, promote-relations and affordance commands, and the report's *Fix this finding* and *Silence this note* actions. Settings live in the vault's own plugin data.

## Development

See [CONTRIBUTING.md](../CONTRIBUTING.md). The layout follows the upstream [obsidian-sample-plugin](https://github.com/obsidianmd/obsidian-sample-plugin); `npm run lint` runs Obsidian's own `eslint-plugin-obsidianmd` ruleset.

```text
src/
  main.ts           plugin lifecycle: commands, status bar, vault scan, the editor aids
  validator.ts      the LOKF rule set and bundle-root resolution - import-free, runs under plain Node
  report-view.ts    the side-panel report
  scaffold-modal.ts the two-choice modal behind "Insert the bundle's semantic header"
  public-api.ts     the read-only API offered to sibling plugins
  settings.ts       declarative settings tab (Obsidian 1.13+)
  ...               quick-switchers, autocomplete, safe fixes, affordances, relation promotion - one module each
scripts/
  smoke-test.ts     validator fixtures + whole-bundle golden fixtures (npm run smoke-test)
  build-vocab.mjs   regenerates src/lokf-vocab.json from a pinned lokf.yaml (a maintenance step)
  fixtures/         frozen copy of the ktl-sidecar template skeleton the smoke test validates
docs/               the reasoning behind the checks
.lokf/              this repository's own LOKF knowledge bundle
```

`src/validator.ts` takes already-parsed frontmatter and imports nothing, so the whole rule set runs under plain Node via `npm run smoke-test` with no Obsidian install. Parsing happens in `src/main.ts` with Obsidian's own `parseYaml`.

## This repository's own bundle

This repository keeps a bundle of its own under `.lokf/knowledge/`, maintained by the `knowledge-trust-ladder`, which a scheduled [workflow](../.github/workflows/knowledge-librarian.yaml) installs at run time. It is what the docent answers from, and none of it is part of the plugin. To contribute to it, [CONTRIBUTING.md](../CONTRIBUTING.md#development-setup) says which skills that takes.

## Read on

| | |
| --- | --- |
| How to get a bundle, where to install the plugin, and the quick start | [install.md](install.md) |
| The report panel, the in-editor diagnostics, the commands, the settings and the read-only API for other plugins | [using.md](using.md) |
| What LOKF adds over plain OKF, the OKF v0.2 rules checked underneath, what is left unchecked, why almost everything is a warning, and what each host layout means for the plugin | [for-the-curious.md](for-the-curious.md) |
| The roles, the trust ladder and the two plugins, on the skills' own pages | [architecture](https://github.com/noelmcloughlin/knowledge-trust-ladder/blob/main/docs/architecture.md), [the bundle in Obsidian](https://github.com/noelmcloughlin/knowledge-trust-ladder/blob/main/docs/obsidian.md) |
| Contributing, the code of conduct and the AI covenant; reporting a security issue | [CONTRIBUTING.md](../CONTRIBUTING.md), [CODE_OF_CONDUCT.md](../CODE_OF_CONDUCT.md), [AI_COVENANT.md](../AI_COVENANT.md), [SECURITY.md](../SECURITY.md) |

## Credits

- [Nolan Nichols](https://lokf.nolan-nichols.com/), creator of [LOKF](https://lokf.nolan-nichols.com/specification/) and its [toolkit](https://github.com/nicholsn/lokf).
- The [LinkML Community](https://linkml.io/), creators of [LinkML](https://linkml.io/linkml/), the schema language LOKF is written in.
- [Introducing the Open Knowledge Bundle, Google blog](https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing), creator of the Open Knowledge Format specification.
- [LLM Wiki, Karpathy](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f), a pattern for building personal knowledge bases using LLMs.
- [obsidian-sample-plugin](https://github.com/obsidianmd/obsidian-sample-plugin), whose build, lint and release layout this repository follows.
- [knowledge-trust-ladder](https://github.com/noelmcloughlin/knowledge-trust-ladder), the registrar role this plugin fills in the editor, and whose bundle template the smoke test validates.
- [KTL Curator](https://github.com/noelmcloughlin/obsidian-ktl-curator), the sibling plugin, forked from this one and sharing the bundle-root plumbing in `src/validator.ts`.

We know of no other tool that checks the LOKF semantic layer. Validators for the plain OKF v0.2 layer beneath it exist, such as [OKF Enforcer](https://github.com/MartinForReal/okf-enforcer); the same base rules are checked here, so none is required.

## License

[Apache License 2.0](../LICENSE); see also [NOTICE](../NOTICE).
