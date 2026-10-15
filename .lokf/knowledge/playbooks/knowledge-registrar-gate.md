---
type: Playbook
id: https://ktl-registrar.example/knowledge/playbooks/knowledge-registrar-gate
title: Knowledge registrar gate
description: "The knowledge-registrar.yaml workflow: it validates the bundle and its relation targets and checks the sidecar conventions on every pull request that touches the bundle, and ties every human: confirmation a change adds, alters or removes to that person's approving review or verified signature, with an environment reviewer's attestation as the fallback."
genre: how-to
resource: .github/workflows/knowledge-registrar.yaml
sources:
- resource: .github/workflows/knowledge-registrar.yaml
- resource: .lokf/justfile
- resource: SECURITY.md
relatedTo:
- https://ktl-registrar.example/knowledge/playbooks/scheduled-librarian
dependsOn:
- https://ktl-registrar.example/knowledge/references/lokf-toolkit
generated:
  by: process:ktl-librarian
  at: "2026-10-15T23:50:48Z"
status: draft
verified:
- by: process:ktl-librarian
  at: "2026-10-15T23:50:48Z"
---

# Overview

`.github/workflows/knowledge-registrar.yaml` is the registrar's job in CI: it keeps the bundle's records well-formed and their provenance straight, and never judges whether a claim is true. It is a copy of the `ktl-sidecar` template in knowledge-trust-ladder, and `SECURITY.md` lists it as the template's jobs unchanged. The guard design is documented once, in the skills repository's [threat model](https://github.com/noelmcloughlin/knowledge-trust-ladder/blob/main/docs/threat-model.md#human-attribution-human-is-a-claim-not-a-credential).

The workflow runs on a pull request that touches `.lokf/**`, `knowledge_bundle/**` or the workflow itself, on a Monday 06:00 UTC schedule, and on demand. It sets `permissions: {}` at the top, and none of its three jobs can write to the repository, keeps a credential on disk, or runs an LLM or agent.

# validate: "Validate the LOKF bundle"

The job runs `uv sync --locked` in `.lokf/`, so it installs exactly what `.lokf/uv.lock` names and fails when the lock is missing or behind `pyproject.toml`. It then runs the justfile's `lokf-check-refs` recipe through `uvx --from rust-just==1.47.0 just`. That recipe runs `lokf validate --check-refs`, which validates against the schema and resolves every typed-relation target in the bundle's own namespace, and it passes the domain schema when the justfile's `schema` line names one. Last, the job runs `bash scripts/knowledge-conventions.sh knowledge` for the conventions `lokf validate` cannot see, because the toolkit reads a body as an opaque string and never opens `log.md`. On a pull request the script also gets `--since` the merge base, so its rule 14 reads each commit.

# provenance: "Check new human confirmations"

The job runs on pull requests only, with `contents: read` and `pull-requests: read`. A `human:<id>` event claims that a named person checked a concept against its source, and `lokf validate` accepts a well-formed event from any writer. So the job reads each event whole from the frontmatter of the bundle's changed files, keyed by the concept's `id`, comparing the base with the head and each commit with every parent. Every event added, changed or removed names an actor who must stand behind it.

For each such actor the job asks GitHub for evidence: an approving review of the pull request from that login, or GitHub's report that each commit which adds, changes or removes the event is signature-verified and attributed to that login. Signature status comes from GitHub's API rather than `git log`, because a runner holds no keys. An actor with neither, or an id that is not a login the gate can check, is *unbacked*. The job then writes a summary and fails, unless the `KNOWLEDGE_CURATION_ENVIRONMENT` repository variable is set, in which case it hands the verdict to `attestation`.

Where the repository keeps curator keys under `.lokf/curators/`, a second step runs `.lokf/scripts/knowledge-provenance.sh` to verify the same signatures with plain git against the keys on file. A signature from a key not on file for that id then fails even when GitHub shows it as Verified. This repository keeps one key there, `.lokf/curators/noelmcloughlin.asc`.

# attestation: "Attest to an unbacked confirmation"

The job runs only after an unbacked verdict, inside the GitHub Environment the variable names, so the run pauses until one of that environment's required reviewers clicks Approve. Unlike a pull request review, an environment reviewer may be the person who opened the pull request. An environment with no required reviewers approves itself instantly, so setting the variable without configuring reviewers silently disables the gate. What the job records is that someone with repository access vouched out of band, not that anyone opened the source.

# What follows for a solo maintainer

GitHub will not let anyone approve their own pull request, so on a one-person repository signing is the path. The workflow's comments give the setup with the SSH key already used to push: `gpg.format ssh`, `user.signingkey` and `commit.gpgsign true`, then the same key added on GitHub as a *signing* key, since GitHub keeps authentication and signing keys in separate lists. The commit email must also be a verified email on the account.

# What it does not do

It never runs on the scheduled librarian's pull request, which `knowledge-librarian.yaml`'s `publish` job opens with the default `GITHUB_TOKEN`, because GitHub starts no `pull_request` workflow for such a pull request. `publish` carries its own checks instead; see [Scheduled librarian](scheduled-librarian.md). And it is no required status check: `SECURITY.md` says `main` blocks deletion and force-pushes and requires linear history, deliberately nothing more.
