# Change Log

## 2026-09-23

* **The scheduled librarian installs its skill from a tag that has it.** The
  pin still read `v0.21.0`, where the skills are named `lokf-*`; the rename to
  `ktl-*` landed in `v0.22.0`. The install step copies `skills/ktl-librarian`
  and is not gated on `KNOWLEDGE_LIBRARIAN_ENABLED`, so every weekly run has
  been failing there since the plugin took the KTL name, armed or not. The pin
  moves to `v0.22.0`, the first tag carrying that path. The five scripts under
  `.lokf/scripts/` already match that release's templates, so nothing else had
  to move with it.

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
