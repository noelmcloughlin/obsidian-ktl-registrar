---
type: Playbook
id: https://ktl-registrar.example/knowledge/playbooks/quality-gates
title: Quality Gates
description: The lint-and-docs CI workflow - shell, workflow, Markdown, link, and spelling checks that run on every push and PR, independent of the Node build and the LOKF bundle's own validation.
resource: .github/workflows/lint-and-docs.yaml
dependsOn:
  - https://ktl-registrar.example/knowledge/references/obsidian-plugin-guidelines
generated:
  by: process:ktl-librarian
  at: "2026-09-14T15:00:00Z"
verified:
  - by: process:ktl-librarian
    at: "2026-09-14T15:00:00Z"
status: draft
---

# Overview

`.github/workflows/lint-and-docs.yaml` ("Lint & docs") runs three independent
jobs on push to `main`, every PR against any branch, and a weekly Monday
06:00 UTC schedule (to catch link rot with no PR to trigger it) - `push` was
narrowed from every branch to `main` only on 2026-09-14, matching
`build.yml`/`semantic-release.yml`, since an open PR can never have `main` as
its head and the two triggers no longer double-run the same commit:
`lint-scripts` (ShellCheck over the whole repo), `lint-workflows`
(`actionlint` over the GitHub Actions YAML itself, plus, since 2026-09-14, a
second step that greps every workflow's `uses:` line and fails the job if
any is not pinned to a 40-hex-char commit SHA or an image digest -
`actionlint` checks syntax, not pinning), and `validate-markdown`
(`markdownlint-cli2` against `.markdownlint-cli2.jsonc`, then `lychee`
link-checking, then `codespell`) over every `**/*.md` file. It never touches
the Node build (`build.yml`) or the LOKF bundle's own semantics (the separate
`knowledge-registrar.yaml` workflow) - this is the CI-hardening pass
backported from `knowledge-trust-ladder`'s own `validate.yml`. Each job repeats
the same `step-security/harden-runner` (audit mode) + `actions/checkout`
(`persist-credentials: false`) preamble as `release.yml`, with
`permissions: {}` at the workflow level and `contents: read` scoped per job;
a `concurrency` group cancels a superseded run on the same ref.

`.markdownlint-cli2.jsonc` disables five rules for reasons specific to this
repo's content, not because the underlying style guidance is wrong in
general: `MD013` (SKILL.md/reference prose is deliberately unwrapped),
`MD025` (every LOKF/OKF concept's frontmatter `title:` reads as an implicit
H1, so the body's own top-level heading is not a real duplicate - see Golden
Rule 2 in `ktl-librarian`'s own `SKILL.md`), `MD028` (adjacent `>` callouts
separated by a blank line are intentionally distinct blockquotes),
`MD033` (`<PROJ_NAME>`-style angle-bracket placeholders are template tokens,
not HTML), and `MD041` (`templates/readme-for-ai-agents.md` is an insertable
fragment meant to start mid-document). `MD024` is scoped to `siblings_only`
rather than disabled outright, so `CHANGELOG.md`'s repeated
Keep-a-Changelog headings (`### Added` under each `## [x.y.z]`) pass while a
genuine duplicate heading under the same parent still fails.

`.github/dependabot.yml` keeps the same gate from going stale: `actionlint`
(above) catches a pinned action's syntax drift, never its staleness, so a
weekly PR bumps the pinned SHAs in every workflow, the plugin's npm
devDependencies (grouped into one PR, since none of them ship in `main.js`),
and separately the `.lokf/` sidecar's own `lokf` floor in `pyproject.toml` -
kept apart because a major bump there can need concept-frontmatter changes,
unlike a routine Actions or devDependency bump.
