# Using KTL Registrar

This page lists the report panel, the in-editor diagnostics, the commands, the settings and the read-only API for other plugins. [Install](install.md) gets the plugin running, and [the architecture](architecture.md) says what a bundle is.

## The report panel

**The report panel** groups findings by folder, pins the note you are editing at the top, and names each finding in plain language with the file one click away. A filter box narrows the list (`sev:error`, `rule:lokf/2`, or any text). Right-click a finding to copy its message, open it, apply its one safe fix, or silence the whole note. Nothing is ever silently rejected: almost everything is a warning, and [docs/for-the-curious.md](for-the-curious.md#why-almost-everything-is-a-warning) says what earns an error.

## As you type

**As you type**, the offending frontmatter value is underlined, wavy red for an error and amber for a warning, with the finding on hover, and only that note is re-checked. **Autocomplete** offers the values a field expects: a `type`, `genre` or `status`, a relation's predicate, or a relation target from elsewhere in the bundle. Both work on raw frontmatter (Source mode) and switch off under *Settings → In-editor diagnostics*.

## Commands

Open the command palette and search for **LOKF**:

| Command | What it does |
| --- | --- |
| Validate vault (full LOKF report) | Scan everything and open the report panel |
| Validate active note | Check the current note |
| Go to a finding (search all findings) | Quick-switcher over every finding; opens the note on the offending line |
| Go to next / previous finding | Cycle through the report's findings |
| Fix safe issues in the active note | Applies the deterministic fixes in one undo step |
| Fix safe issues across the vault | The same for every note, after a confirmation |
| Find a concept (by name, type, or relations) | Quick-switcher over every concept in the bundle |
| Find an orphan concept (nothing links to it) | Lists the concepts nothing else links to |
| Look up a LOKF field | Searchable reference of the LOKF frontmatter fields |
| Insert the bundle's semantic header | Adds a starter header to the bundle's `index.md`. In a vault with no bundle it asks whether this vault *is* the bundle or should hold a `knowledge_bundle/` folder |
| Promote body links to typed relations… | Guesses a typed relation for each `[[wikilink]]` and lets you confirm each one: the hand-authoring aid for a bundle no agent maintains |
| Add Obsidian affordances to the active note | Tags the note with its Diátaxis `genre` and lists its typed relations as wikilinks in one managed block, so the tag pane, graph and backlinks see them |
| Generate Obsidian affordances across the vault | Does that for every concept, plus a Diátaxis map per bundle, after a confirmation |
| Generate the Diátaxis map for this bundle | Builds or refreshes `diataxis.md`, grouping concepts by `genre` |

Clicking the status-bar item validates the active note, or runs a vault scan if none is open.

## Settings

The settings are under **Settings → KTL Registrar**. Obsidian's settings search also finds every setting.

- **This device**: silences the plugin on this computer or phone only. Never synced.
- **In-editor diagnostics**: the underlines and the autocomplete, both on by default.
- **Type vocabulary**: the known LOKF classes, whether an unrecognised `type` is worth a warning, and the accepted `genre` values. *Known LOKF types* is also the extension point. For a bundle validated against a domain schema (`lokf validate --schema <file>`, [recipe](https://github.com/noelmcloughlin/knowledge-trust-ladder/blob/main/skills/ktl-librarian/references/domain-schema.md)), list that schema's classes here. The plugin cannot read the schema, which sits outside the vault. A listed class stops warning and appears in autocomplete. An unlisted one only ever warns. A list you have edited is yours to keep current, and should match KTL Curator's.
- **Type-specific fields**: the recommended-field warnings for `Metric`, `Service` and `GlossaryTerm`.
- **Semantic header & base_iri**: the authority denylist, the placeholder-domain list, and whether a missing header warns.
- **Relationships**: whether relation targets inside the bundle must resolve to a real file (always a warning, never an error), and an off-by-default predicate check.
- **OKF v0.2 base layer**: the plain OKF rules underneath LOKF, on by default so a bundle stays checkable on its own. Turn it off if a dedicated OKF validator takes over. **Enforce OKF conformance as errors** downgrades the spec's REQUIRED findings to warnings; a break-glass switch for mid-migration bundles, not recommended otherwise.
- **Trust & lifecycle**: whether the *shape* of `verified`, `generated`, `status`, `stale_after` and `sources` is checked. Their credibility is never judged here; that is the curator's work.
- **Rule severity**: rule ids whose warnings are raised to errors. Escalation only.
- **Field aliasing (advanced)**: `user=canonical` pairs that map a vault's own frontmatter keys onto the LOKF ones before checking. Off by default.
- **Scope & performance**: the bundle-root settings above, excluded folders, a per-note opt-out (`lokf: ignore` in frontmatter), and the batch size for large vaults.

## For other plugins: a read-only API

A sibling plugin or agent can read validation state at `app.plugins.plugins["ktl-registrar"].api` without either depending on the other:

- `getReport()`: returns the latest vault scan's findings, as a read-only snapshot.
- `validatePath(path)`: validates one note on demand, and never writes.
- `onValidated(callback)`: fires when a scan or incremental re-check finishes, and returns an unsubscribe function.

The `LokfFinding` shape is a stable contract in `src/public-api.ts`, independent of the plugin's internals.
