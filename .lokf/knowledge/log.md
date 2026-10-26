# Change Log

## 2026-10-26

* **Changed**: the bundle index says w3id.org resolves `https://w3id.org/ktl/registrar/knowledge/`, as the docent reported on 2026-10-17; it had said the rule was pending.

## 2026-10-18

* **Changed**: Knowledge registrar gate is related to the registrar in Knowledge Trust Ladder's bundle, the role that concept says `knowledge-registrar.yaml` plays; the first link from this bundle into another member of the KTL federation.
* **Changed**: links to Knowledge Trust Ladder's docs pages and to KTL Curator use their w3id.org addresses, as `CONTRIBUTING.md`, `SECURITY.md` and `docs/install.md` now do.
* **Question**: the contributing playbook's pin rule counts three sidecar workflows, and the sync script now copies whatever the release's manifest lists, `knowledge-sync.yaml` among them.
* **Changed**: the source map lists `knowledge-sync.yaml` and its pull request template, which the sidecar syncs added, as a gap with no concept.

## 2026-10-17

* **Changed**: the Diátaxis genre term now says its `genre: reference` tag sits in its own frontmatter; it had placed the tag in the bundle's root header, which carries none.

## 2026-10-16

* **Prose**: reworded 15 concept bodies in plain English. No fact, link, number or frontmatter changed.
* **Changed**: Quality Gates; the paragraph on `MD024` and the ignored folders no longer runs on from the last list item, so Markdown shows it as a paragraph of its own.
* **Changed**: Validator Engine; the paragraph on the REQUIRED `generated.by` and source `resource` no longer runs on from the last list item, so Markdown shows it as a paragraph of its own.
* **Changed**: Why KTL Registrar names the `okf/*` findings where the base-layer switch turns them off, now that the switch has a paragraph of its own.
* **Changed**: Why KTL Registrar's section on the OKF base layer is split into three paragraphs, one each for severity, the conformance switch and the base-layer switch.
* **Changed**: Contributing now names `.github/workflows/build.yml` as a source, since it says `npm run check` runs the same three steps that workflow runs.
* **Changed**: Why KTL Registrar now says that turning off *Enforce OKF conformance as errors*, on by default in `src/settings.ts`, downgrades the OKF errors to warnings, as the reworded `docs/for-the-curious.md` puts it. The sentence after the list of checks is now its own paragraph.
* **Added**: Install KTL Registrar, from `docs/install.md`, which the source map listed as a gap.
* **Changed**: the source map now lists `docs/install.md` as the source of Install KTL Registrar and no longer as a gap, names `build.yml` beside `CONTRIBUTING.md`, and leaves out `.gitignore`, `.npmrc`, `package-lock.json`, `styles.css` and the generated `src/lokf-vocab.json` on purpose.
* **Changed**: the bundle's `base_iri` moved from the placeholder `https://ktl-registrar.example/knowledge/` to `https://w3id.org/ktl/registrar/knowledge/`, a namespace under Knowledge Trust Ladder's w3id.org authority, so the bundle can join a federation; every id and relation target moved with it, and no concept's text changed.
* **Changed**: Quality Gates now says that `.markdownlint-cli2.jsonc` ignores the folders the knowledge website generates, as it does since #74.
* **Changed**: LOKF Toolkit now gives the `>=0.8.0` floor that `.lokf/pyproject.toml` declares, not 0.7.0, and pins its fallback schema to the commit tagged v0.8.0 instead of `main`.
* **Rewrite**: LOKF Toolkit now says that `lokf-install` runs `uv sync` while the other recipes run `uv run lokf`, and that the website's sync runs `lokf export`, from `.lokf/justfile` and `website/README.md`.
* **Added**: Knowledge Website, from `website/README.md`, `website/site.config.mjs` and `.github/workflows/knowledge-website.yaml`, which #74 added.
* **Changed**: the source map now lists `website/` and `knowledge-website.yaml` as the sources of Knowledge Website, `.lokf/pyproject.toml` and `.lokf/justfile` as the sources of LOKF Toolkit, and says the README links the docs pages on the website.
* **Prose**: reworded 16 concept bodies in plain English. No fact, link, number or frontmatter changed.

## 2026-10-15

* **Changed**: the OKF specification moved to `GoogleCloudPlatform/open-knowledge-format`, which still serves v0.2; the `knowledge-catalog/okf/` copy is frozen.
* **Rewrite**: Why KTL Registrar, after the README became a doorway; the reasoning now comes from `docs/architecture.md` and `docs/for-the-curious.md`, and the history of removed designs is gone.
* **Changed**: Why KTL Registrar now names `docs/for-the-curious.md` as its resource and the architecture and using pages as sources.
* **Rewrite**: Contributing, from the current `CONTRIBUTING.md`: Node versions, the codemirror override, the skills pin with its SHA and sidecar copies, and the releasing pull request title.
* **Changed**: Contributing now names `scripts/smoke-test.ts` as a source for the word budgets.
* **Rewrite**: Knowledge registrar gate; the validate job now runs the justfile recipe, provenance reads whole events added, changed or removed, and a second step checks signatures against `.lokf/curators/` keys.
* **Changed**: Knowledge registrar gate's description now says the gate also reads confirmations a change alters or removes.
* **Rewrite**: Quality gates; `MD060` is the sixth disabled markdownlint rule, actionlint ignores the `copilot-requests` scope, and Dependabot holds back three majors.
* **Changed**: Quality gates now names the markdownlint config and the Dependabot file as sources.
* **Changed**: Releasing now records the plan job's changelog and title checks, takes the protection of `main` from `SECURITY.md`, and lists the release workflows as sources.
* **Rewrite**: Scheduled librarian; the workflow now has three jobs, the agent's one output is `.lokf/patch.yaml`, a quiet week runs no agent, and `publish` also refuses a change to a person's record.
* **Changed**: Scheduled librarian now lists the wrapper script, `SECURITY.md` and `AI_COVENANT.md` as sources.
* **Rewrite**: Knowledge sources now maps today's files, with the README split into the docs pages; the dated pass notes are gone, and `knowledge-release.yaml`, `docs/install.md` and `llms.txt` are listed as gaps.
* **Changed**: Knowledge sources' description now names the left-out files and the gaps.
* **Rewrite**: No telemetry, now drawn from the Privacy section of `docs/architecture.md` and from `SECURITY.md`, since the README became a doorway.
* **Changed**: No telemetry now names `docs/architecture.md` as its resource.
* **Rewrite**: AI covenant; the file is adapted from knowledge-trust-ladder's covenant, not a verbatim copy, as its closing note says.
* **Changed**: AI covenant's description now follows the covenant's own section names.
* **Rewrite**: Code of conduct; the file says it is adapted from Contributor Covenant 2.1, so the claim that it is unmodified is gone.
* **Changed**: Code of conduct's description now says the covenant is adapted.
* **Rewrite**: Commands and settings, from `docs/using.md` now that the README is a doorway; the command ids still come from `src/main.ts`.
* **Changed**: Commands and settings now names `docs/using.md` as its resource and `src/main.ts` as a source.
* **Changed**: OKF specification's description now names the specification's version and its trust and lifecycle fields.
* **Changed**: Obsidian plugin guidelines' description now names the guidelines the lint rules enforce here.
* **Changed**: LOKF glossary term gains a description, so its index bullet says what it defines.
* **Changed**: OKF glossary term gains a description, so its index bullet says what it defines.
* **Changed**: Diátaxis genre glossary term gains a description, so its index bullet says what it defines.
* **Changed**: KTL Registrar plugin now points at `docs/using.md` and `docs/architecture.md`, where the README's material moved; `src/main.ts` changed only names and the ribbon icon.
* **Rewrite**: Settings tab; the group headings are now spelt as `src/settings.ts` spells them, the full list of comma-separated settings is named, and the break-glass toggle is quoted from its own description.
* **Changed**: Settings tab now names `src/vocab.ts` as a source for the vocabulary refresh rule.
* **Rewrite**: Validator engine; it checks the OKF v0.2 base layer itself, reports lokf 0.8.0's pattern failures as errors, and covers thirteen relation fields with `measures`, `memberOf` and `holder`.
* **Changed**: Validator engine's description now names the OKF base layer and the errors shared with `lokf validate`.

## 2026-09-24

* **Future-dated times corrected.** 6 `process:ktl-librarian` times were later than the commit that recorded them (round placeholders written as UTC). Each now carries that commit's time, the latest moment git attests, so the bundle keeps the sidecar's new conventions rule 11.
* **The signing setup moved to its own page in the skills.**
  knowledge-trust-ladder split the registrar gate out of `automation.md` into
  `gate.md`, so `playbooks/knowledge-registrar-gate.md` now points there for
  the signing setup.

## 2026-09-23

* **The docent records a reader's gap without reading the file it goes in.**
  `.lokf/feedback.md` is kept newest first, so adding an entry meant reading
  it, editing it and writing it back, which put other readers' free text into
  the docent's session, held off by prose alone (Snyk W011). The sidecar now
  carries `knowledge-feedback.sh`: the docent hands over its own entry and
  never opens the file. The script comes from the `v0.23.0` templates, the
  release that ships it, and the pin moved to that tag with it.

* **The scheduled librarian installs its skill from a tag that has it.** The
  pin still read `v0.21.0`, where the skills are named `lokf-*`; the rename to
  `ktl-*` landed in `v0.22.0`. The install step copies `skills/ktl-librarian`
  and is not gated on `KNOWLEDGE_LIBRARIAN_ENABLED`, so every weekly run has
  been failing there since the plugin took the KTL name, armed or not. The pin
  moves to `v0.23.0`, the release that also ships `knowledge-feedback.sh`. The
  scripts under `.lokf/scripts/` and `knowledge-registrar.yaml` all match its
  templates.

## 2026-09-19

* **The logo now carries knowledge and trust.** The first mark was three rungs
  alone: it drew *ladder* and left the other two words to the filename. The
  ladder now rises out of an open book, and its top rung is the check mark in
  the curator's blue, so the mark reads draft, checked, vouched-for from bottom
  to top. Still byte-identical in all three repositories.

* **Both diagrams carry the mark and the wordmark** in the top-left corner,
  from the same shared definition.

* **Text that collided with its own box.** A headless-Chrome pass measured
  every label against its enclosing card: the curator card's "a few at a time"
  was painted before the card and hidden behind it, and two labels in the
  plugins card came within 3px of their edges. Both diagrams now match the
  skills repository's copy byte for byte.

* **Assets restacked, and the family logo added.** The diagrams' canvas was
  pure white while their cards were tinted, so the biggest area was the
  brightest and the cards read as sunken. The canvas is now `#E4E1D7` and the
  faint ink `#6E6D66`, which also lifts 10px grey labels past 4.5:1. New
  `.assets/knowledge-trust-ladder-logo.svg`, identical in all three
  repositories. The `.assets/*.svg` source-map row covers it.

* **Skills repository renamed to `knowledge-trust-ladder`**, from
  `lokf-agent-skills`, because upstream LOKF now ships its own bundled skills.
  Every deep link and the scheduled librarian's `LOKF_SKILLS_REPO` follow it,
  in one mechanical pass; no `verified` event changed. This plugin's own name,
  id and `base_iri` are untouched - only references to the skills repository
  moved. Concepts naming it in prose were rewritten by the same pass; entries
  below this day keep the name the skills repository had when they were
  written, as `CHANGELOG.md` does.

* **Reference audit moved onto the toolkit's own flag**: `just lokf-check-refs`
  ran a hand-written SPARQL query over ten relation predicates, which reported
  an external `source:` or `definedBy:` URL - correct usage for both slots - as
  a dangling target, and had drifted against the schema (missing `holder`,
  `measures`, `memberOf` and reified `relations`). It calls `lokf validate
  --check-refs` now, so the slot list comes from the schema. Only Knowledge
  registrar gate changed here, to describe the recipe as it now runs; the
  workflow no longer invokes it through `uvx ... just`: the gate's third
  step is gone and `--check-refs` rides on its validate step, That change has not reached the skills
  template yet, so this copy is ahead of it and the preflight's `copies`
  line reports the file as drifted until it does. That concept
  described the recipe while citing only the workflow and `SECURITY.md`, so
  `.lokf/justfile` is now one of its `sources`.

## 2026-09-18

* **Sidecar brought up to the skills templates**: the scripts here were the
  pre-0.19 copies, so the wrapper lacked the `EXIT`-trap restore and the
  registrar gate still read confirmations by their `by:` line. Synced all
  five scripts, added `.gitattributes`, and bumped `LOKF_SKILLS_REF` from
  `v0.9.0` to `v0.19.2`. The release workflow now checks release notes and
  the pull request title on a releasing pull request.

## 2026-09-14

* **Steady-state refresh**, against this session's uncommitted `SECURITY.md`
  rewrite (matching the same change already committed in `lokf-agent-skills`
  and `obsidian-ktl-curator`): its design content moved to the skills
  repository's new `docs/threat-model.md`. Two concepts had cited it by a
  now-gone section heading - `playbooks/scheduled-librarian.md` ("The
  librarian workflow: what is inherited, what this repository owns") and
  `playbooks/knowledge-registrar-gate.md` ("The attribution gate is
  installed") - both corrected to link the threat model's anchors directly.
  `playbooks/knowledge-sources.md`'s `SECURITY.md` row updated to match.

* **Steady-state refresh** (librarian pass, no `.lokf/feedback.md` present),
  against the now-committed `chore/known-types-docs-and-coverage` branch (git
  status clean). Two real drifts found and fixed: `playbooks/knowledge-registrar-gate.md`'s
  `validate` job paragraph still described only `uv run lokf validate
  knowledge`, missing the two steps commit `80bd8b0` added to that same job
  (`scripts/knowledge-conventions.sh` and `uvx ... just lokf-check-refs`) -
  that commit updated the workflow, the new script and `CHANGELOG.md` but not
  this bundle. `services/settings-tab.md` and
  `references/commands-and-settings.md` both listed the settings-tab group
  order as `... Semantic header & base_iri, Relationships, OKF v0.2 base
  layer, Trust & lifecycle, Rule severity ...`; `src/settings.ts`'s actual
  `heading:` order is `... Semantic header and base IRI, OKF v0.2 base layer,
  Trust and lifecycle, Relationships, Rule severity ...` - both concepts
  corrected to match. Re-verified against source with no change needed:
  `playbooks/contributing.md` (`CONTRIBUTING.md`'s dev-setup, layout, and
  pre-PR checklist sections), `references/commands-and-settings.md`'s command
  table (all 15 `addCommand` ids in `src/main.ts` match),
  `services/ktl-registrar-plugin.md` (the `vocab.ts` settings-merge
  paragraph). Orphan sweep: no new file under `src/`, `docs/`,
  `.github/workflows/`, or the repository root beyond what
  `playbooks/knowledge-sources.md` already accounts for. `just lokf-validate`
  (22/22), `just lokf-check-refs`, and `bash scripts/knowledge-conventions.sh`
  all pass.

* **Steady-state refresh** (librarian pass, no `.lokf/feedback.md` present),
  against this session's further uncommitted working-tree change on top of
  the earlier pass below: `CONTRIBUTING.md` rewritten again, this time from a
  design log back into a checklist under a 1000-word budget, with the
  release walkthrough moved out to `lokf-agent-skills`' `docs/releasing.md`
  and `docs/signing-commits.md` (both confirmed present); `npm run check`
  added (`build && lint && smoke-test`, matching `build.yml`); four
  `obsidianmd` settings-tab/`createEl` lint rules promoted from warning to
  error in `eslint.config.mts`; `lint-and-docs.yaml` gained an
  action-pinning step in `lint-workflows` and, with `build.yml`, narrowed
  its `push` trigger from every branch to `main` only; and
  `scripts/smoke-test.ts` gained a drift guard checking CONTRIBUTING's own
  word count and its import-free module list against what the suite
  actually imports. `playbooks/contributing.md` rewritten to match;
  `playbooks/quality-gates.md` corrected (trigger, the new pin-check step).
  `explanation/why-ktl-registrar.md` gains a short addition: the README's
  new **three lines of defence** framing (linking `docs/three-lines.md`)
  places this plugin on the second line. Re-verified, no content change:
  `playbooks/releasing.md` (`CONTRIBUTING.md`'s own release section is now a
  pointer elsewhere, but `semantic-release.yml`/`release.yml`, the concept's
  real facts, are unchanged). `playbooks/knowledge-sources.md`: a run note,
  a new `eslint.config.mts` row, and the `package.json` row extended to
  cover npm scripts. Orphan sweep: no new file under `src/`, `docs/`,
  `.github/workflows/`, or the repository root. PyPI's `lokf` is still
  `0.7.0`, matching the `pyproject.toml` floor - no bump. `just
  lokf-validate` (22/22) and `just lokf-check-refs` both pass.

* **`CONTRIBUTING.md` and its concept disagreed with the code**, found on a
  whole-repository librarian pass. The document still said "`npm run
  smoke-test` only covers `validator.ts`" and listed only four `src/` files,
  after the suite grew to ten import-free modules and the settings merge rule
  moved into `vocab.ts` precisely so a test could reach it. The source is
  corrected (a `vocab.ts` row, the real module list, and the reason logic
  leaves `main.ts`) and `playbooks/contributing.md` re-derived from it.
  `services/ktl-registrar-plugin.md` gains the same fact for `loadSettings`,
  which the bundle had recorded only in this log.

* **Steady-state refresh** (librarian pass, no feedback pending) against the
  uncommitted `chore/known-types-docs-and-coverage` branch, where *Known
  LOKF types* is documented - settings description, README,
  `docs/for-the-curious.md` - as the extension point for a bundle validated
  against a domain schema. `services/settings-tab.md` says so, with the two
  facts the code already held: a customised list is never refreshed to the
  manifest, and the type-specific field checks key on the exact class name.
  `references/commands-and-settings.md`: the README bullet. Re-verified, no
  change: `explanation/why-ktl-registrar.md`.
  `playbooks/knowledge-sources.md`: run note.
* **Coverage pass on the same branch**, no behaviour change: the settings
  merge rule moved from `main.ts` into the pure `vocab.ts`
  (`mergeSavedSettings`, plus `vocabFromManifest` so the malformed-manifest
  fallbacks are reachable from a test); 277 to 324 expectations; the two
  golden fixtures now pin their warning counts. This map's
  `scripts/smoke-test.ts` row was stale - it asked a future run to confirm
  the suite "imports only from `../src/validator`", untrue as the plugin
  grew - and now names the import-free modules it may draw on.

## 2026-09-13

* **Steady-state refresh** (librarian pass, no feedback pending), after a
  `ktl-sidecar` repair pass that restored `.lokf/justfile`'s
  `lokf-check-refs` recipe and laid the `knowledge_bundle` doorway link.
  Re-verified `playbooks/scheduled-librarian.md` and
  `playbooks/knowledge-registrar-gate.md` against the now-committed
  workflows; the gate concept now says its copy also rewords the
  `provenance` job's signing comment, not only `persist-credentials: false`.
  `playbooks/knowledge-sources.md`: `.assets/` row and run note added.

* **Steady-state refresh** (librarian pass, no feedback pending), against the
  1.1.0 release commits and this session's uncommitted working tree: the
  README rewritten around usage (two vaults, quick start, commands, *Which
  folder is the bundle*), `SECURITY.md` restructured to inherit the guard
  design from `lokf-agent-skills`, and `knowledge-registrar.yaml` gaining the
  template's `provenance` and `attestation` jobs. Added
  `playbooks/knowledge-registrar-gate.md` for that gate - a real gap: the
  workflow had no source-map row and no concept. Corrected
  `policies/no-telemetry.md` (it still named the header command as the
  plugin's only write; the README has listed the safe-fix, promote-relations,
  affordance and report-action writes for some time - drift older than this
  session), `explanation/why-ktl-registrar.md` (the alternatives footnote
  now sits beneath the credits, and the warnings-not-errors argument is
  `docs/for-the-curious.md`'s longest section, not the README's),
  `playbooks/scheduled-librarian.md` (the `if:` guard on the `refresh` job's
  write-scope step; `SECURITY.md`'s renamed section and its links out to the
  skills repository) and `playbooks/releasing.md` (required status checks
  deliberately off, per `CONTRIBUTING.md`/`SECURITY.md`) and
  `references/lokf-specification.md` (its `definedBy` pointed at the spec's
  own URL rather than a concept, the one dangling target the hand-run
  reference check found; `derivedFrom` the OKF spec instead; "14 classes"
  corrected to 15; and it still said Rule 6's trust fields were left to a
  separately installed OKF validator - the design abandoned on 2026-09-12,
  since when the plugin checks their shape itself). Re-verified, no change:
  `references/commands-and-settings.md` (command table and settings groups
  identical in the rewritten README) and `playbooks/contributing.md`.
  **Drift audit (reported, not fixed - ktl-sidecar's job):** `.lokf/justfile`
  lacks the template's `lokf-check-refs` recipe (its query run by hand this
  pass, clean after the fix above); `knowledge-librarian.yaml` differs
  from its template in comments only, beyond the deliberate
  `persist-credentials: false`; `knowledge-registrar.yaml` differs by that
  line alone. `lokf` on PyPI is still `0.7.0`, matching the floor.

* **Steady-state refresh** (librarian pass, no feedback pending): re-verified
  `policies/no-telemetry.md`, `references/commands-and-settings.md`,
  `services/settings-tab.md` and `services/ktl-registrar-plugin.md` against
  `README.md`, `src/main.ts` and `src/settings.ts` after this session's
  README-notice rewording, the header command's new two-choice modal
  (`src/scaffold-modal.ts`), and the sidecar's `.lokf/justfile`/workflow
  comments following the current `ktl-sidecar` templates. All four already
  matched - the command table, the break-glass setting's description and the
  no-bundle state were corrected in an earlier pass this session - so only
  each concept's `verified` event was refreshed; no content changed.
  `src/scaffold-modal.ts` is not given its own concept: it is a small UI
  helper of `ktl-registrar-plugin.md`, already described there under "Insert
  the bundle's semantic header". `playbooks/quality-gates.md` and
  `playbooks/releasing.md` were not re-checked this run - their resources
  (`lint-and-docs.yaml`, `CONTRIBUTING.md`) were untouched this session.

## 2026-09-12

* **Steady-state refresh** (librarian pass, no feedback pending): corrected
  drift against this session's "no bundle" state and break-glass
  `treatVaultRootAsBundle` setting (`src/main.ts`, `src/validator.ts`,
  `src/settings.ts`) - `services/ktl-registrar-plugin.md` and
  `services/validator-engine.md` described the old always-a-whole-vault
  fallback and the renamed `autoBundleRoot`/`implicitBundleRoots` function
  under its previous name; `services/settings-tab.md` had no mention of the
  break-glass toggle at all. `references/commands-and-settings.md`'s command
  table was corrected wholesale against `src/main.ts`: it named 12 ids that
  do not exist in the source (`find-orphan`, `lookup-field`, `goto-finding`,
  `fix-safe-active`/`fix-safe-vault`, `promote-links`,
  `affordances-active`/`affordances-vault`/`diataxis-map`) in place of the 15
  the plugin actually registers - a pre-existing drift this session's changes
  only made more visible, not one this session caused.
* **Corrected** `playbooks/scheduled-librarian.md` against this session's
  security hardening of the scheduled-agent workflow: a third, independent
  write-scope re-derivation in the `publish` job (on a checkout that never
  shared a workspace with the agent), a guard refusing any patch that adds a
  `by: human:` claim, and the wrapper script's `.git/config`/`.git/hooks`
  snapshot-and-restore around the agent call - all newly documented in
  `SECURITY.md` this session.
* **Extended** `playbooks/knowledge-sources.md` with a row for the new
  `docs/for-the-curious.md` (the former README "For the curious" section,
  moved out this session) and an orphan-sweep note for `src/`'s
  implementation-detail files and a handful of repo-plumbing files, both
  consciously left without their own concepts. Added `docs/for-the-curious.md`
  to `explanation/why-ktl-registrar.md`'s `sources`, alongside `README.md`.
* **Re-verified** (no drift): `playbooks/contributing.md`,
  `policies/no-telemetry.md`, `playbooks/quality-gates.md`. `playbooks/releasing.md`
  was already current from earlier the same day. PyPI's `lokf` is still at
  `0.7.0` (checked via the PyPI JSON API; `uv pip index versions` is not a
  subcommand of this environment's `uv 0.12.11`) - no `pyproject.toml` floor
  bump needed.

* **Semantic-release, hardened** (maintainer decision): `playbooks/releasing.md`
  rewritten (`generated`/`verified` refreshed) - a person no longer picks the
  version. `semantic-release.yml`'s `release` job, behind the `release`
  GitHub Environment, computes it from Conventional Commits and runs a new
  `.github/scripts/changelog-release.mjs` as semantic-release's own
  `verifyRelease`/`generateNotes`/`prepare` hooks: refuses an empty
  `## [Unreleased]`, uses it as the release notes, retitles it to a dated
  heading. `@semantic-release/npm` (`npmPublish: false`) still triggers the
  existing `version` script, so `manifest.json`/`versions.json` update
  exactly as before. `release.yml` gained a `workflow_call` trigger so the
  resulting tag reaches it without relying on a bot-pushed tag re-triggering
  its own `push:` event; unchanged otherwise, including for a hand-pushed
  tag. semantic-release is installed at pinned versions inside the workflow,
  never added to `package.json`.

* **Name and identity recorded** (maintainer decision): `why-ktl-registrar.md`
  gains a "Why the name" section and `ktl-registrar-plugin.md` an
  "Identity" section (API path, device key, `generated.by` actor); both `generated` refreshed. `NOTICE` no
  longer calls the plugin a companion to a separate OKF validator - it
  checks the base layer itself. `references/okf-specification.md` corrected
  in passing: the plugin has checked required `type` and Attested Computation
  shape itself since 0.4.0, which that concept still denied.

* **Corrected** `services/ktl-registrar-plugin.md`, `services/settings-tab.md`,
  `references/commands-and-settings.md` after the maintainer had the
  afternoon's feature-fit audit implemented: `diataxis.md` is now written as a
  `Document` with a minted `id` and `generated.by: ktl-registrar/<version>`
  (the earlier headerless map made `lokf validate` abort a run); with no
  bundle roots configured a top-level `knowledge_bundle/` is detected on its
  own (`autoBundleRoot`); a dot-folder root is accepted with a live-index
  check and a warning instead of being refused. The `## Open questions`
  section on the plugin concept is replaced by the record of what changed.

* **Corrected** `services/ktl-registrar-plugin.md`, `services/settings-tab.md`,
  `references/commands-and-settings.md`, and rewrote
  `explanation/why-ktl-registrar.md`: the plugin no longer detects,
  recommends, or deep-links to any other OKF validator. The commented-out
  `detectOkfValidator`, the one-time notice (`recommendOkfValidator` /
  `okfValidatorNoticeShown`), and the "Alternative OKF validator" settings
  group were removed from `src/main.ts`, `src/settings.ts`, and
  `src/validator.ts` at the maintainer's direction: with the OKF v0.2 base
  layer checked here, a separate validator is an *alternative* worth a
  footnote, not a companion, and the only plugin this one names is its
  sibling KTL Curator. `README.md` was restructured the same day around how
  an Obsidian user actually meets a bundle (the bundle is the vault; a folder
  in the vault; derived from a repository and opened via `knowledge_bundle`)
  and now states, per Obsidian's own help on symbolic links, that a
  repository root opened as a vault cannot reach the bundle through the
  link - the previous README's contrary claim was wrong. The smoke test's
  first header fixture, formerly a verbatim copy of another project's
  `index.md`, is now a neutral example; the frozen template fixture moved
  from `scripts/fixtures/scaffolding-skeleton/` to
  `scripts/fixtures/sidecar-skeleton/` named for the upstream
  `ktl-sidecar` skill. Command table in
  `references/commands-and-settings.md` extended to the commands the README
  documents. Not a full steady-state sweep - concepts untouched by these
  changes were not re-checked.

## 2026-09-11

* **Corrected** `services/validator-engine.md`, `services/ktl-registrar-plugin.md`,
  `services/report-view.md` against the six-bug correctness pass on
  `src/*.ts`: the rule engine now warns on a bare scalar where the schema
  requires a list (the same bug class fixed in this bundle's own concepts on
  2026-09-09, recurring in `dependsOn` et al.), on a non-string `type`, on an
  unnormalized `excludeFolders` entry, and closes a `:port` bypass in the
  authority-denylist check; **Validate active note** now tells the user why
  when it does nothing (excluded, or outside every bundle root); and the
  report panel's "N clean" count no longer subtracts bundle-level findings
  that were never one of the scanned files.
* **Added** `playbooks/scheduled-librarian.md` (`status: draft`): the
  `knowledge-librarian.yaml` workflow's two-job privilege split (a read-only
  agent job with no persisted credentials, handing a patch to a privileged
  job that runs no agent code) had no concept at all, despite being the most
  security-sensitive workflow in the repo - `SECURITY.md` documents it in
  prose but nothing in the bundle traced back to it.
* **Added** `policies/ai-covenant.md`, `policies/code-of-conduct.md` (both
  `status: draft`): two governance documents new since the last pass,
  adopted verbatim from the sibling `lokf-agent-skills` repository.
* **Extended** `playbooks/quality-gates.md`: added `.github/dependabot.yml`,
  the mechanism that actually keeps the gate's own SHA pins from going
  stale (`actionlint` catches syntax drift, never staleness).
* **Updated** `playbooks/knowledge-sources.md` with source-map rows for all
  of the above, and re-checked the PyPI `lokf` floor (still `0.7.0`, no
  bump needed).

* **Corrected** `services/ktl-registrar-plugin.md`, `references/commands-and-settings.md`:
  both described a fourth command, `check-sibling-plugin`, "re-checking for
  an installed OKF validator" via `app.plugins`. That detection
  (`detectOkfValidator`) is commented out in `src/main.ts` - not a public
  API, flagged in community-plugin review - and was never wired to a
  command; only three commands exist (`validate-vault`, `validate-active`,
  `scaffold-root-header`), and the sibling notice now fires unconditionally
  rather than only when the sibling is absent. `README.md` already stated
  this correctly; only the bundle's own concepts had drifted.

* **Corrected** `services/report-view.md`: attributed `processQueue`/batch
  size 50 to `src/report-view.ts` itself. That batching lives in
  `src/main.ts` (see `ktl-registrar-plugin.md`) and the batch size is the
  user-configurable `batchSize` setting, not a hardcoded constant;
  `report-view.ts` only renders the progress bar it's driven with.

* **Added** `playbooks/quality-gates.md` (`status: draft`): the
  `.github/workflows/lint-and-docs.yaml` CI workflow (ShellCheck,
  actionlint, markdownlint-cli2 + `.markdownlint-cli2.jsonc`, lychee,
  codespell) had no concept and wasn't in the source map, despite being
  committed since 2026-09-08 (`e735ffe`). Extended `knowledge-sources.md`
  with a row for it and its markdownlint config.

* **Re-verified**: `playbooks/contributing.md` (enriched to describe the
  git-ignored-`main.js` "Failed to load plugin" failure mode, matching
  `CONTRIBUTING.md`'s newly added guidance), `playbooks/releasing.md`,
  `services/validator-engine.md`, `services/settings-tab.md`,
  `policies/no-telemetry.md`, `references/lokf-toolkit.md` (PyPI `lokf`
  still at `0.7.0` - `pyproject.toml`'s floor needs no bump) - no other
  drift found. The three external-spec-URL references (LOKF spec, OKF spec,
  Obsidian plugin guidelines) and the glossary/explanation concepts were not
  re-fetched this run and remain unverified.

## 2026-09-10

* **Corrected** the bundle header's `publisher.id`: it declared `type: Person`
  but minted under `org/` (`.../knowledge/org/noelmcloughlin`); now
  `person/noelmcloughlin`, the convention the sibling `lokf-agent-skills`
  bundle uses. The plugin's own scaffold template (`src/main.ts`,
  `scaffold-root-header`) carried the same mismatch and was fixed alongside.

* **Corrected** `playbooks/releasing.md`'s `resource`: it describes the
  PR-based version-bump flow now cites `CONTRIBUTING.md`.

## 2026-09-09

* **Bug fixed**: 6 concepts carried a bare-scalar value on a multivalued
  typed-relation field (`definedBy` on `glossary/lokf.md`, `glossary/okf.md`,
  `references/lokf-specification.md`; `relatedTo` on `references/lokf-toolkit.md`
  and `services/validator-engine.md`; `isPartOf` on `services/report-view.md`,
  `services/settings-tab.md`, `services/validator-engine.md`) - the same bug
  class the 2026-09-08 audit found and fixed elsewhere had recurred. `just
  lokf-validate` now passes again (17/17 concepts). Caught only after bumping
  the `lokf` toolkit floor from `>=0.5.0` to `>=0.7.0` in `.lokf/pyproject.toml`
  (latest PyPI release; no breaking changes noted) surfaced it under the newer
  generated schema.

* **Re-verified**: all 9 resource-bearing concepts backed by a repo-local file
  or by `README.md` (both plugin services, both playbooks with a repo doc
  resource, `references/commands-and-settings.md`, `policies/no-telemetry.md`)
  against their current sources - no drift found - plus `references/lokf-toolkit.md`
  against the live PyPI listing. Recorded a `process:ktl-librarian` `verified`
  event on each. The three concepts whose `resource` is an external spec URL
  (LOKF spec, OKF spec, Obsidian plugin guidelines) were not re-fetched this
  run and were left unverified.

## 2026-09-08

* **Added** `references/lokf-toolkit.md`: the `.lokf/pyproject.toml` toolkit
  dependency (the `lokf` PyPI package, or its raw LinkML schema as a
  no-Python fallback) was previously conflated with the specification website
  in this bundle's own prose (`.lokf/README.md` called the website "the
  toolkit that does the turning"). Split into its own Reference concept,
  `relatedTo`-linked from `services/validator-engine.md`, and fixed the
  website/toolkit conflation in `.lokf/README.md`.

* **Gap closed**: the version-history gap flagged in
  [Knowledge sources](playbooks/knowledge-sources.md) - `manifest.json`/the
  `v0.2.0` git tag ahead of `versions.json`/`CHANGELOG.md` - was fixed in the
  host repo (`versions.json` now records `0.2.0`; `CHANGELOG.md` has a
  `## [0.2.0]` entry). Updated the playbook to stop reporting it as open.

* **Initialization**: Bootstrap discovery pass. Scaffolded the LOKF bundle and
  populated it with 16 concepts derived from the obsidian-ktl-registrar repository: 4
  services (plugin, validator engine, report view, settings tab), 4 references
  (LOKF spec, OKF spec, Obsidian plugin guidelines, commands and settings), 3
  glossary terms (LOKF, OKF, Diátaxis genre), 3 playbooks (knowledge sources,
  contributing, releasing), 1 policy (no telemetry), and 1 explanation (why
  KTL Registrar exists as a layered add-on). `base_iri` is a placeholder
  (`ktl-registrar.example`) pending a real, owned namespace.
