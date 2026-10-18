---
type: Playbook
id: https://w3id.org/ktl/registrar/knowledge/playbooks/releasing
title: Releasing
description: Semantic-release computes the version and promotes CHANGELOG.md on merge to main, behind a required-reviewer Environment; the resulting tag invokes the same hardened build-and-attest workflow a hand-pushed tag always has.
resource: CONTRIBUTING.md
dependsOn:
  - https://w3id.org/ktl/registrar/knowledge/references/obsidian-plugin-guidelines
generated:
  by: process:ktl-librarian
  at: "2026-10-18T00:14:24Z"
verified:
  - by: process:ktl-librarian
    at: "2026-10-18T00:14:24Z"
sources:
  - resource: CONTRIBUTING.md
  - resource: .github/workflows/semantic-release.yml
  - resource: .github/workflows/release.yml
  - resource: .releaserc.json
  - resource: SECURITY.md
---

# Overview

Nobody picks the version by hand. `semantic-release.yml`'s `release` job runs on every push to `main`, behind the `release` GitHub Environment. The required reviewers are configured in this repository's own settings, not by the workflow file. The job runs these steps:

1. `@semantic-release/commit-analyzer` computes the next version from Conventional Commits since the last tag.
2. `@semantic-release/exec` runs `.github/scripts/changelog-release.mjs` as its `verifyRelease`, `generateNotes`, and `prepare` hooks. The script refuses the run if this repository's `CHANGELOG.md` `## [Unreleased]` section is empty. Otherwise it uses that section as the release notes, then retitles it to a dated heading with a fresh empty one above.
3. `@semantic-release/npm` (`npmPublish: false`) bumps `package.json` with `npm version <ver> --no-git-tag-version`. That triggers the `version` script, so `manifest.json` and `versions.json` update as a hand-run `npm version` would update them. `.npmrc`'s `tag-version-prefix=""` applies, so the tag stays bare, because Obsidian matches a release to a plugin version by exact tag equality.
4. `@semantic-release/git` commits those files.
5. semantic-release's own core creates and pushes that bare tag.

The tool is installed at exact pinned versions inside the workflow, never added to `package.json`.

That push then invokes `release.yml` directly, through a `workflow_call` trigger beside its original `push: tags:` trigger. The extra trigger is needed because a tag pushed with the default `GITHUB_TOKEN` does not itself re-trigger another workflow's `push` event (GitHub's own loop prevention).

`release.yml` still works on its own for a hand-pushed tag, and keeps:

- its "Verify tag matches manifest version" step;
- `step-security/harden-runner` in audit mode;
- `persist-credentials: false`;
- SHA-pinned actions;
- `permissions: {}`, defaulting to a scoped `contents: write`, `id-token: write` and `attestations: write` on the one job that needs them.

The release itself is still opened as a **draft** carrying `main.js`, `manifest.json`, and `styles.css` with build-provenance attestation, for manual review before publishing. That is a person's checkpoint, and the Environment approval is a second one in front of it.

A `pull_request`-triggered `plan` job in `semantic-release.yml` previews every pull request into `main` with `--dry-run`: no write scope, no commit, no tag. So a malformed commit message or a broken exec script surfaces in review. When the commits would release, the same job refuses an empty `## [Unreleased]` section and a pull request title with no releasing type (`feat:`, `fix:`, `security:` or a breaking `!`), because a squash merge takes its subject from the title.

`main` is protected, but not by a merge gate. `SECURITY.md` says `main` blocks deletion and force-pushes and requires linear history, and nothing more, and the skills repository's threat model gives the reasons under [Repository hardening](https://w3id.org/ktl/docs/threat-model/#repository-hardening).
