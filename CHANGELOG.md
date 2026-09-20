# Changelog

All notable changes to this project are documented here. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

No version below has been published as a GitHub release yet, so entries describe development history against `main`, not user-facing upgrades. No tags exist yet either, which is why version headings carry no compare links.

## [Unreleased]

### Added

- **A dark counterpart for all three diagrams**, `*-dark.svg` beside each original. Same geometry and wording; only the palette differs, re-toned role for role from the light one. Shared byte-for-byte with the other repositories.
- **The README picks by theme.** Each diagram is a `<picture>` with a `prefers-color-scheme: dark` source over the existing file, so the light original stays the fallback and its path is unchanged.

### Changed

- **The registrar's logo has no check mark.** Its ladder stops at the amber rung, checked by automation; the blue tick, a named person's confirmation, is the curator's alone. The logo is no longer shared byte-for-byte with the other repositories.
- **The ribbon and tab carry the trust ladder**, not Lucide's `shield-half`. No check mark on top: this plugin keeps every record well-formed and never vouches for one, so the check belongs to LOKF Curator, whose icon is this ladder with it. Line art at Lucide's weight, in `currentColor`, so it sits with Obsidian's own icons and follows any theme.

### Fixed

- **A dark copy carries no stale content credential.** The originals embed a C2PA manifest that signs their own bytes; recolouring changes those, so the copies ship without one rather than with a signature that cannot verify.

## [1.2.8] - 2026-09-20

### Fixed

- **The type-check survives a TypeScript 7 / `@types/node` 26 bump.** `moduleResolution: "bundler"` drops the `"node"` package.json export condition by design; a newer `@types/node` gates its `node:fs`/`node:path`/`node:url`/`node:module` subpaths on that condition, so `scripts/smoke-test.ts`'s plain-Node imports stopped resolving. `customConditions: ["node"]` in `tsconfig.json` re-adds it. `lib` moves to `ES2022` for `Array.prototype.at()` in `src/main.ts`; `esbuild.config.mjs`'s own output target is unaffected.

## [1.2.7] - 2026-09-19

### Fixed

- **The scheduled librarian installs `v0.21.0`**, up from `v0.19.7`, so it runs the current skill rather than two releases behind.
- **The publish job's path check reads a concept named outside ASCII.** It listed the patch's paths with git's default quoting, so such a path arrived C-quoted and was refused as outside the bundle. Synced from the skills repository's template: it now lists with `core.quotePath` off.

## [1.2.6] - 2026-09-19

### Fixed

- **An external `source` or `definedBy` is no longer flagged as dangling.** Both slots are documented as taking an off-site URL, but the audit reported any untyped IRI target as missing. Nothing in this bundle tripped it - every target happens to point at a concept.
- **The predicate list cannot go stale again.** It had drifted against the schema, missing `holder`, `measures`, `memberOf` and every reified `relations` entry; `--check-refs` reads the slots from the schema instead.
- **The scheduled librarian checks the relations it writes.** Its validate step covered frontmatter shape only, leaving a fabricated target - an agent's likeliest mistake - for the registrar gate to catch. It passes `--check-refs` now.

### Changed

- **The registrar gate validates once.** `--check-refs` rides on the existing validate step, replacing a second `lokf validate` run through `uvx --from rust-just just`.

## [1.2.5] - 2026-09-19

### Security

- **The provenance gate reads a concept whatever its name.** Synced from the skills repository's v0.19.5 templates: both gates list paths with `core.quotePath` off and refuse a path git still has to quote, so a `human:` confirmation in a non-ASCII-named concept no longer passes unread.

## [1.2.4] - 2026-09-19

### Changed

- **The scheduled librarian installs `v0.19.7`**, up from `v0.19.2`, so it runs the current skill rather than one five releases behind.
- **`LOKF_SKILLS_REPO`/`LOKF_SKILLS_REF` are now `TRUST_LADDER_SKILLS_REPO`/`TRUST_LADDER_SKILLS_REF`**, following the skills repository's own rename: the names said "LOKF" for a repository now called `knowledge-trust-ladder`. The skills keep their `lokf-*` names.

## [1.2.3] - 2026-09-19

### Added

- **The family logo**, `.assets/knowledge-trust-ladder-logo.svg`: a ladder rising out of an open book, its top rung the check mark, the rungs grey then amber then the curator's blue. Shared byte-for-byte with the other two repositories; beside the README title, and the mark to use as the repository avatar.
- **Both diagrams carry the mark and the wordmark**, from the same shared definition.

### Changed

- **The diagrams no longer glare.** A pure-white canvas was the brightest thing on the page, with the tinted cards sitting below it; it is now the warm `#E4E1D7`, so the cards read as raised.
- **Small grey labels are legible again**: the faint ink moved from `#888780` to `#6E6D66`, clearing 4.5:1 where it had been 3.6:1.
- **The skills repository is now `knowledge-trust-ladder`**, formerly `lokf-agent-skills`: upstream LOKF ships its own bundled skills, and a third-party repository named after the format read as their official home.
- **Every link here follows it**, and `LOKF_SKILLS_REPO` in the scheduled librarian names the new repository. The skill names, the pinned `LOKF_SKILLS_REF` and this plugin's own name are unchanged; GitHub redirects the old paths either way.
- **A label hidden behind its own card.** The curator card's "a few at a time" was painted before the card that contains it; two labels in the plugins card came within 3px of their edges.
- **Both diagrams match the skills repository's copies byte for byte.**
- **The bundle's log keeps the name the skills repository had on each day.** The rename pass had rewritten entries written weeks before it; `CHANGELOG.md` was left alone, and the log is the bundle's own record.

## [1.2.2] - 2026-09-18

### Fixed

- **Retitling a pull request re-runs the release checks.** The title check told the author to retitle, but the workflow listened only for the default pull-request types, so a title change fired nothing and the check stayed red whatever the author did. The trigger now names `edited`.

## [1.2.1] - 2026-09-17

### Security

- **The sidecar's scheduled-agent wrapper restores `.git/config` and `.git/hooks/` on every exit.** The copy here predated the `EXIT` trap, so an agent that poisoned `core.hooksPath` and then failed, or a cancelled job, left it for the workflow's later steps to read.
- **The registrar gate reads a confirmation whole, not its `by:` line.** Re-dating an existing `human:` event, moving its `revision` or writing it in flow style added no `by: human:` line and so passed the old gate unseen. The gate also refuses a `human:` id it cannot look up, resolves a commit-shaped `revision` against the tree, and now runs under a top-level `permissions: {}` with no checkout credential on disk.

### Added

- **The sidecar gains the preflight, the forge-free provenance gate and the conventions parser** - `knowledge-preflight.sh`, `knowledge-provenance.sh` and `knowledge-conventions.py` - plus `.lokf/.gitattributes`, keeping the bundle on LF so a Windows checkout gives CI's verdict.
- **A pull request that would release is held to its release notes and its title.** The `plan` job refuses an empty `## [Unreleased]`, which semantic-release itself skips on a pull-request event, and refuses a title with no releasing type, since a squash merge takes its commit subject from the title.

## [1.2.0] - 2026-09-17

### Changed

- **The pinned toolkit is lokf 0.8.0**, and a malformed `by`, `sources[].author`, `http_method` or `email` is now an error, as `lokf validate` rejects each. `stale_after` accepts a datetime as well as a bare date, and the *missing recommended fields* setting no longer lists `http_method`.
- **`npm run build-vocab` reads the schema from the sidecar's pinned toolkit**, not a sibling `../lokf` checkout; `LOKF_SCHEMA` still overrides it.
- **The settings merge rule moved into the pure `vocab.ts`** (`mergeSavedSettings`, with `vocabFromManifest` for the malformed-manifest fallbacks), so the smoke test covers what sat untested in `main.ts`. No behaviour change.
- **The smoke test asserts more and characterises less.** The two golden fixtures pin their warning counts, so a rule that starts or stops firing fails the build, and a drift guard catches a settings control naming a setting that does not exist.
- **The *Known LOKF types* setting is documented as the extension point** for a bundle validated against a domain schema (`lokf validate --schema <file>`): list that schema's classes there, since the plugin cannot read a schema outside the vault. Settings tab, README and `docs/for-the-curious.md`; no behaviour change.
- **README rewritten around how to use the plugin**, as an extension of the [`lokf-agent-skills`](https://github.com/noelmcloughlin/lokf-agent-skills): the two-vault story, a four-step *Quick start*, *Using it*, the command table, *Which folder is the bundle*, *Install* and *Settings*. Shared material - the role table, the library metaphor, the trust ladder - now lives in the skills' README and is linked once; no plugin change.
- **This repository's own sidecar repaired** by `lokf-sidecar`: the `knowledge_bundle` doorway link is now committed at the root, `.lokf/justfile` regains the template's `lokf-check-refs` recipe, and markdownlint and lychee skip the link's duplicate path. No plugin change.
- **`CONTRIBUTING.md` is a checklist again**, with the release pipeline and the signing guide documented once in the skills repository's `docs/` and linked from here. `npm run check` runs build, lint and smoke test together, the settings-tab and `createEl` lint rules are errors rather than warnings, and CI fails an action not pinned to a commit; no plugin change.
- The README says which line of defence this plugin's work is, and points readers who work under that model at the skills' page on the rest; no plugin change.
- **The registrar gate checks what `lokf validate` cannot**: `.lokf/scripts/knowledge-conventions.sh` from the sidecar templates (one ISO-date log heading per day, quoted timestamps, `verified` as a list, open questions in the curator's shape) and the justfile's `lokf-check-refs`, on every `.lokf/**` pull request; no plugin change.
- **`SECURITY.md` is a policy, not a threat model**: a surface table that links to the skills repository's `docs/threat-model.md` instead of restating it, held to a word budget by `npm run check`. It now lists the plugin's write paths as the README's *Privacy* section does, where it had named only the header command; no plugin change.

## [1.1.0] - 2026-09-13

### Changed

- **"Insert the bundle's semantic header" now asks** in a vault with no bundle - *make this vault the exhibition*, or *create a `knowledge_bundle` folder* - instead of always nesting a folder. A two-choice modal (`src/scaffold-modal.ts`) suggests by what the vault holds: the root for a vault with nothing but an `index.md`, the folder otherwise. The palette name drops its parenthetical.
- **README restructured for the two-vault story.** An early notice says the plugin works on the exhibition, never the workshop vault you already keep, and that it pairs with the [`lokf-agent-skills`](https://github.com/noelmcloughlin/lokf-agent-skills) without needing them. *Where it works* replaces *How this fits*: three arrangements, the bundle as its own vault first, with the cost of a bundle folder inside your vault stated plainly. Host-by-host layouts moved to `docs/for-the-curious.md`.
- **This repository's own sidecar follows the current `lokf-sidecar` templates**: `just lokf-link` creates the `knowledge_bundle` doorway link, and the wrapper and both workflows describe the bundle's second name as the templates do. No plugin change.

## [1.0.0] - 2026-09-12

### Changed

- **A vault with no bundle is left alone.** With nothing configured, a root `index.md` carrying a LOKF header makes the whole vault the bundle and a top-level `knowledge_bundle/` makes that the bundle, as before; a vault with neither now has *no bundle* - nothing scanned, no root-header warning, status bar *LOKF: no bundle*, commands explain instead of acting - rather than being read as one whole-vault bundle. The workshop is never mistaken for the exhibition.
- **Insert the bundle's semantic header** (was *Insert semantic header template into root index.md*): in a vault with no bundle it now creates `knowledge_bundle/` and puts the header in its `index.md` instead of decorating the vault root.
- README trimmed: the *For the curious* section is now `docs/for-the-curious.md`.

### Added

- **Treat the vault root as the bundle** (Scope, off by default): the break-glass switch that restores the old whole-vault reading for a vault whose root `index.md` carries no LOKF header.

### Fixed

- `npm run lint` and `tsc` failed on `scripts/smoke-test.ts`'s `js-yaml` import and on `.github/scripts/changelog-release.mjs` (outside ESLint's project); both now pass.

## [0.5.0] - 2026-09-12

### Added

- **Bundle detection for the sidecar convention.** A top-level `knowledge_bundle/` with its own `index.md`, in a vault whose root `index.md` carries no LOKF header, becomes the bundle root with nothing configured. A vault whose root `index.md` is itself a header stays the whole-vault bundle it always was.
- **The Diátaxis map is a record the registrar accepts.** `diataxis.md` now carries a `type: Document` header with a minted `id` and `generated` provenance naming the plugin; without one, `lokf validate` aborted the whole run. An older headerless map gains a header on its next refresh.
- **Semantic release.** The version is computed from Conventional Commits on `main`, and `CHANGELOG.md`'s `## [Unreleased]` section is promoted into a dated heading and used as the release notes; `manifest.json`, `package.json` and `versions.json` bump as they always did. The resulting tag runs the same build, attestation and draft release as before, and a hand-pushed tag still does too. See [CONTRIBUTING.md](CONTRIBUTING.md).

### Changed

- **Renamed LOKF Registrar** - id `lokf-registrar`, repository `obsidian-lokf-registrar` - for the role the READMEs already gave it, and to stop shadowing an unrelated community plugin one letter away. Nothing was published under the old name, so there is no migration: settings live in `.obsidian/plugins/lokf-registrar/` and the read-only API at `app.plugins.plugins["lokf-registrar"].api`. A `diataxis.md` map stamped by an earlier build is still recognised as this plugin's own.
- **A dot-folder bundle root is accepted, not refused** - a community plugin can expose one to Obsidian's index. The scan checks the live index first and explains an absent root instead of assuming.
- **"How this fits" rewritten** around one desk that is always the person's: this plugin is the registrar there, LOKF Curator the curator's assistant. It covers both ways of reaching a bundle - the doorway opened as its own vault, or a real `knowledge_bundle/` folder inside your own vault - and names the vault the **workshop**, the bundle the **exhibition**.
- The frozen template fixture is now `scripts/fixtures/sidecar-skeleton/`, matching the upstream skill's rename from `lokf-scaffolding`.

### Removed

- The **Alternative OKF validator** settings group, its community-plugin deep link and its one-time notice, now that the OKF v0.2 base layer is checked here directly. A saved `recommendOkfValidator` / `okfValidatorNoticeShown` is ignored.

## [0.4.0] - 2026-09-12

### Added

- **OKF v0.2 base layer** (`checkOkfBaseLayer`, on by default): checks the plain-OKF v0.2 rules LOKF subsumes (required `type`, Attested Computation shape, `index.md`/`log.md` structure, v0.1→v0.2 migration hints), so a bundle stays checkable without a separate OKF validator. Severity follows the spec (REQUIRED/MUST → error); a settings toggle can downgrade those to warnings mid-migration.
- **Look up a LOKF field** (command): searchable reference of frontmatter fields, sourced from the schema's own slot definitions so wording never forks.
- **Generate Obsidian affordances**: three commands projecting LOKF facts into Obsidian conventions - `#genre` tags and `## Related` wikilinks in a managed block, plus a `diataxis.md` Map of Content. Idempotent, marker-delimited.
- **Inline diagnostics**: CodeMirror 6 extension underlines offending frontmatter values (wavy red/amber) with the finding on hover.
- **Jump-to-line from the report**: finding rows are clickable, opening the note with the cursor on the offending key.
- **Key anchors on findings**: new `src/locator.ts` maps a key path to its line/column in raw frontmatter (prerequisite for underlines/jump).
- **Incremental re-validation**: editing a note re-checks just that note from the metadata cache instead of a full rescan.
- **Schema-derived vocabulary manifest** (`src/lokf-vocab.json`, `npm run build-vocab`): default type/predicate/genre vocabulary now derives from the LOKF schema, adding `Role` and the full 15-value `RelationType`.
- **Concept graph + quick-switcher**: in-memory index of each concept's type/id/relations, plus "Find a concept" and "Find an orphan concept" commands.
- **Trust/lifecycle shape checks (OKF v0.2 §5)**: validates the shape of `verified`/`generated`, `status`, `stale_after`, `sources` - never their credibility depth. All warnings, on by default.
- **Frontmatter value autocomplete**: `EditorSuggest` for `type`/`genre`/`status`/predicate values and relation targets.
- **Safe quick-fixes** (command + vault-wide variant): applies deterministic corrections (missing `base_iri` terminator, type aliases, bare-string relations) in one undo step; never guesses owned values.
- **Promote body links to typed relations** (command): guesses a typed relation for body links resolving to another concept, confirmed via a review dialog before writing.
- **Per-note opt-out**: `lokf: ignore` frontmatter key silences a note while it stays a concept in the graph.
- **Disable on this device**: device-local switch (never synced) that silences the plugin entirely on one device.
- **Per-rule severity escalation**: settings list of rule ids whose warnings become errors; escalation only, never downgrades.
- **Report filter + finding navigation**: filter box (`sev:error`, `rule:lokf/2`, ANDed, debounced) plus go-to-next/previous commands.
- **Report context menu, finding grouping, render caps**: right-click actions, grouping by top-level key, and a 300-file/100-finding-per-file cap with a filter hint.
- **Ribbon icon** to open the report; last scan is retained across reopens.
- **Read-only public API** at `app.plugins.plugins["lokf-enforcer"].api`: `getReport()`, `validatePath(path)`, `onValidated(cb)`.
- **Field aliasing** (advanced, off by default): `user=canonical` pairs rename a vault's own keys onto LOKF ones before validation.
- **Node-tested throughout**: locator, vocabulary manifest, concept graph, §5 checks, autocomplete, safe fixes, body-link promotion, opt-out, severity escalation, report filter, grouping, and field aliasing all carry smoke-test coverage.

### Changed

- Severity icons in the report via `setIcon` instead of spelled-out words.
- Keyboard-operable collapse/expand in the report (`role="button"`, `aria-expanded`, Enter/Space, focus ring).
- Aligned three rules with upstream LOKF PR [#69](https://github.com/nicholsn/lokf/pull/69): `base_iri` may end in `#`; the `by` actor check matches the schema's exact pattern; `http_method` is no longer a recommended-field warning on a `Service`.
- `@codemirror/state`/`@codemirror/view` moved to devDependencies (types only; external at runtime).
- `tsconfig.json` enables `resolveJsonModule` for the bundled vocabulary manifest.

## [0.3.0] - 2026-09-11

### Added

- **Bundle root folders**: a vault can hold several independent bundles as sibling project folders instead of one bundle per vault; a misconfigured root is reported rather than silently producing an empty "clean" bundle.
- Scaffold command targets the active note's bundle, asking when several are configured and none is open.
- Settings shortcut to install OKF Enforcer from the community-plugin browser.
- Unit tests for bundle-resolution logic, extracted into plain Obsidian-free functions.
- Golden-fixture bundle checks in `npm run smoke-test` against a frozen scaffolding template and this repo's own `.lokf/knowledge/`.
- This repo's `.lokf/knowledge/` bundle is now maintained by `lokf-agent-skills` installed at run time rather than committed.
- README rewrite: trust-model framing shared with `lokf-agent-skills`, install section, repo layout, credits.
- `lint-and-docs.yaml`: ShellCheck, `actionlint`, markdownlint, `lychee` link-checking, and codespell on every push/PR plus weekly.
- `.markdownlint-cli2.jsonc` adopted from `lokf-agent-skills`, with `MD024` scoped to `siblings_only` so Keep a Changelog headings pass.
- `.github/dependabot.yml`: weekly updates for pinned action SHAs, npm devDependencies, and the `.lokf/` sidecar's Python toolchain.
- `AI_COVENANT.md`, `CODE_OF_CONDUCT.md` (Contributor Covenant 2.1), and a PR template scope checkbox/checklist, all shared with `lokf-agent-skills`.

### Changed

- Scaffold command writes `publisher.id` as `person/<slug>` to agree with `type: Person` (was `org/<slug>`).
- README/CONTRIBUTING clarify bundle-root defaults, PR-based release flow, and Node 20+ requirement.
- Type-vocabulary lookups are cached instead of rebuilt per note.
- Renamed `knowledge-validate.yaml` to `knowledge-registrar.yaml`, matching upstream `lokf-agent-skills` v0.12.0; cross-references updated across docs.
- `SECURITY.md` now inventories every workflow and the librarian's privilege split.
- `.markdownlint-cli2.jsonc` disables `MD060` (padded-header/bare-separator tables used throughout this repo).

### Fixed

- An unreadable note was silently dropped mid-scan yet still counted as "scanned"; now gets its own report row and separate count.
- An unreadable root `index.md` no longer aborts an entire scan; scaffold command refuses to write when it can't read the file first.
- The knowledge-librarian's prompt-building script executed part of its own prompt as shell commands due to an unescaped heredoc; re-scaffolded.
- `.lokf/knowledge/` drift: two concepts described a nonexistent command, one misattributed scan batching to the wrong file.
- A stale, frontmatter-free planning doc under `.lokf/knowledge/` crashed `lokf validate` for the whole bundle; removed.
- **`LOFK` -> `LOKF`** transposition fixed in `manifest.json`, `package.json`, and `community-plugin-entry.json`.
- A folder in **Excluded folders** written with a trailing/leading slash, whitespace, or `./` prefix silently excluded nothing; now normalized like **Bundle root folders**.
- **Base_iri authority check** compared `URL.host` (includes `:port`) against the denylist, so a ported hostname bypassed it; now compares `hostname`.
- A relation field written as a bare scalar instead of a list passed validation clean even though the schema requires an array; now warned.
- `type` set to a number, boolean, list, or mapping produced no finding at all; a list/mapping now gets its own shape warning.
- **Validate active note** went completely silent when run on an excluded or out-of-bundle note; now always produces a Notice.
- The report panel's **"N clean"** count undercounted by subtracting bundle-level findings that were never scanned files to begin with.
- Various markdownlint fixes (`MD060` tables, `MD001` heading skip, `MD032` spaced-dash-as-list-item).

### Security

- `release.yml` passes the pushed tag through the environment instead of interpolating it into a shell command, closing a script-injection path.
- `knowledge-librarian.yaml` no longer runs a repository variable's content as a shell command; runs a pinned wrapper script and fails if the agent writes outside `.lokf/knowledge/`.
- `knowledge-librarian.yaml` split into two jobs so the agent and the write-scoped token never meet: `refresh` (read-only, third-party code) hands a patch artifact to `publish` (no agent code, holds write access). Ported from `lokf-agent-skills` v0.11.0.
- `knowledge-librarian.sh` parses `AGENT_CLI` into a quoted argv array instead of expanding it unquoted, closing a shell-injection path (`SC2086`).
- The scheduled librarian run is armed by a dedicated `KNOWLEDGE_LIBRARIAN_ENABLED` repository variable rather than inferred from `AGENT_CLI` being set.

## [0.2.0] - 2026-09-08

### Added

- `.lokf/knowledge/`: this plugin's own self-documenting knowledge bundle.
- `release.yml` verifies the pushed tag matches `manifest.json`'s version before building.

### Security

- `build.yml`/`release.yml`: hardened-runner auditing, least-privilege permissions, and SHA-pinned actions.

## [0.1.0] - 2026-09-08

### Added

- Validates the LOKF semantic layer on top of OKF v0.2: bundle-root header, `base_iri` checks, the type vocabulary, typed relationships, and id/IRI-minting consistency.
- Vault-wide scan with a status-bar indicator and a side-panel report.
- Declarative settings (Obsidian 1.13.0+).
- Standard `obsidian-sample-plugin` tooling: esbuild, strict TypeScript, ESLint, a Node 20/22/24 CI matrix, and attested draft GitHub releases.
