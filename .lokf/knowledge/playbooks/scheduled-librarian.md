---
type: Playbook
id: https://w3id.org/ktl/registrar/knowledge/playbooks/scheduled-librarian
title: Scheduled Librarian
description: "The knowledge-librarian.yaml workflow: three jobs split by privilege, so the agent proposes bundle changes as a patch under a read-only token and only a job that runs no agent pushes the branch and opens the review pull request; how it is switched on, when a scheduled week runs no agent, and the checks publish makes."
resource: .github/workflows/knowledge-librarian.yaml
dependsOn:
  - https://w3id.org/ktl/registrar/knowledge/references/lokf-toolkit
relatedTo:
  - https://w3id.org/ktl/registrar/knowledge/playbooks/knowledge-registrar-gate
generated:
  by: process:ktl-librarian
  at: "2026-10-18T00:14:24Z"
status: draft
verified:
  - by: process:ktl-librarian
    at: "2026-10-19T10:31:38Z"
sources:
  - resource: .github/workflows/knowledge-librarian.yaml
  - resource: .lokf/scripts/knowledge-librarian.sh
  - resource: SECURITY.md
  - resource: AI_COVENANT.md
---

# Overview

`.github/workflows/knowledge-librarian.yaml` runs the `ktl-librarian` skill on a schedule (Mondays 05:00 UTC) and on demand, to keep `.lokf/knowledge/` in step with the repository. It opens a review pull request with whatever changed. It never pushes to the default branch and never auto-merges, opens no pull request when nothing changed, and is inert until the `KNOWLEDGE_LIBRARIAN_ENABLED` repository variable is `true`. It is a copy of the `ktl-sidecar` template, and `SECURITY.md` says the copy differs from the template only in the pin it names: `TRUST_LADDER_SKILLS_REF`, with the commit that tag names in `TRUST_LADDER_SKILLS_SHA`. The install step installs nothing when the tag no longer names that commit.

# Three jobs, split by privilege

- `earlier` reads the pull requests this workflow opened before, under a token that can read pull requests and nothing else, and runs no agent. A scheduled run opens no second pull request while one is still open, and does not propose again what a person declined by closing one without merging, until the source moves or a reader asks again. A run a person starts does neither.

- `refresh` runs the agent, which is third-party code, under `contents: read` with `persist-credentials: false`, so no git credential is on disk while it runs. The agent writes one file, `.lokf/patch.yaml`, which the wrapper applies with `knowledge-apply.sh`. The job validates the result and hands the change to `publish` as a patch artifact.

- `publish` runs no agent code and is the only job that holds `contents: write` and `pull-requests: write`. It applies the patch to a clean checkout, pushes the branch and opens the pull request.

# When the agent runs

The workflow reads `AGENT_CLI` from a repository variable or, as a fallback, a secret. `AGENT_PROMPT_FLAG`, `AGENT_API_KEY_ENV`, `AGENT_USE_JOB_TOKEN` and the `AGENT_API_KEY` secret say how the prompt and the agent's credential reach it, and `KNOWLEDGE_RETRIEVAL` turns on an optional retrieval score. A scheduled week skips the agent when `knowledge-report.sh` finds nothing waiting: no moved source, no note a person left since the librarian last looked, no concept without a stamp and no reader feedback. A scheduled run in a month's first seven days, and a run a person starts, always go ahead.

# Checks on the agent's write scope

`.lokf/scripts/knowledge-librarian.sh` is the fixed wrapper the workflow runs, never a variable's content as a shell command. It splits `AGENT_CLI` into an argument array with `read -r -a`, so shell metacharacters in it are inert. The agent call and the post-run check that it wrote nothing but `.lokf/patch.yaml` live inside `main()`, which the script calls only from its last line. The wrapper snapshots `.git/config` and `.git/hooks` before the agent runs and restores both from an EXIT trap, so a changed `core.fsmonitor` or `core.hooksPath` cannot defeat a later check.

The `refresh` job's "Enforce the agent's write scope" step repeats the boundary check in YAML. The check that matters is `publish`'s, on a checkout that never shared a workspace with the agent. It re-derives the allow-list (`.lokf/knowledge/`, `knowledge_bundle/`, `.lokf/feedback.md` and `.lokf/questions.md`) from the patch's own `git apply --numstat` output, refuses a patch that adds a `by: human:` line, and after applying runs `knowledge-provenance.sh --unattended` to refuse a change to any person's event or note.

# The registrar gate does not run on this pull request

GitHub starts no `pull_request` workflow for a pull request opened with the default `GITHUB_TOKEN`, so `knowledge-registrar.yaml`'s jobs do not run on the librarian's pull request, and `publish`'s checks are its backstop. What the gate checks on a person's own pull request is in [Knowledge registrar gate](knowledge-registrar-gate.md).

# Governance

`SECURITY.md` lists this workflow and its wrapper as one row of its `Surface | What holds it` table, and links the guard design in the skills repository's [threat model](https://w3id.org/ktl/docs/threat-model/#prompt-injection-guards). The "Repository-Owned Agent Automation" section of [AI_COVENANT.md](../../../AI_COVENANT.md) sets the rules the workflow runs under: a bot identity, review always, least privilege enforced, and verdicts that only a person can record.
