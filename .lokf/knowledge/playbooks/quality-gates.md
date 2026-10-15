---
type: Playbook
id: https://ktl-registrar.example/knowledge/playbooks/quality-gates
title: Quality Gates
description: "The lint-and-docs.yaml workflow: ShellCheck, actionlint with a check that every action is pinned to a commit, markdownlint, a link check and codespell, on pushes to main, every pull request and a weekly schedule; plus the markdownlint rule overrides and the Dependabot updates that keep the pins current."
resource: .github/workflows/lint-and-docs.yaml
dependsOn:
- https://ktl-registrar.example/knowledge/references/obsidian-plugin-guidelines
generated:
  by: process:ktl-librarian
  at: "2026-10-15T23:50:48Z"
verified:
- by: process:ktl-librarian
  at: "2026-10-15T23:50:48Z"
status: draft
sources:
- resource: .github/workflows/lint-and-docs.yaml
- resource: .markdownlint-cli2.jsonc
- resource: .github/dependabot.yml
---

# Overview

`.github/workflows/lint-and-docs.yaml` ("Lint & docs") runs static checks on the shell, the workflows and the prose this repository ships. It never touches the Node build (`build.yml`) or the LOKF bundle's own semantics (`knowledge-registrar.yaml`). Its header calls it the CI-hardening pass backported from knowledge-trust-ladder's `validate.yml`.

It runs on a push to `main`, on every pull request against any branch, on a Monday 06:00 UTC schedule to catch link rot without a pull request, and on demand. `push` is scoped to `main` so that a push and a pull request no longer run the workflow twice for the same commit. The workflow sets `permissions: {}`, each job asks for `contents: read`, and a `concurrency` group cancels a superseded run on the same ref. Each job starts with `step-security/harden-runner` in audit mode and `actions/checkout` with `persist-credentials: false`.

# The three jobs

- `lint-scripts` runs ShellCheck over the whole repository.

- `lint-workflows` runs `actionlint` over the workflows, with `-ignore copilot-requests` because actionlint 1.7.12 predates the `copilot-requests` scope that `knowledge-librarian.yaml` requests. A second step fails the job when any `uses:` line is not pinned to a 40-character commit SHA or an image digest, since actionlint checks syntax and not pinning.

- `validate-markdown` runs `markdownlint-cli2` with `.markdownlint-cli2.jsonc`, then `lychee` link checking, then `codespell`, over every `**/*.md` file.

# Markdown rules

`.markdownlint-cli2.jsonc` disables six rules for reasons specific to this repository's content: `MD013` (prose is deliberately unwrapped), `MD025` (a concept's frontmatter `title:` reads as an implicit H1), `MD028` (adjacent `>` callouts are meant to be separate blockquotes), `MD033` (angle-bracket placeholders are template tokens, not HTML), `MD041` (an insertable template fragment starts mid-document) and `MD060` (the GFM table convention pairs a padded header with a bare separator row). `MD024` is scoped to `siblings_only`, so `CHANGELOG.md`'s repeated Keep a Changelog headings pass while a real duplicate under the same parent still fails. The config ignores virtualenvs, `node_modules`, the run-time skill folders `.agents/` and `.claude/`, and the `knowledge_bundle` link, whose files are linted at their real path.

# Dependabot

`.github/dependabot.yml` opens weekly updates for three ecosystems. `github-actions` bumps the pinned SHAs in every workflow, since actionlint catches syntax drift and not staleness. `npm` groups the plugin's devDependencies into one pull request, because none of them ships in `main.js`, and holds back major bumps of `typescript`, `eslint` and `@eslint/js`. `uv` updates the `.lokf/` sidecar's `lokf` toolkit separately, because a major bump there can need concept frontmatter changes.
