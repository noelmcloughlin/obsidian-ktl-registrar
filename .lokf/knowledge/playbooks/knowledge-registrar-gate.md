---
type: Playbook
id: https://ktl-registrar.example/knowledge/playbooks/knowledge-registrar-gate
title: Knowledge registrar gate
description: "The knowledge-registrar.yaml workflow - validates the bundle on every pull request that touches it, and ties every newly added human: confirmation to evidence GitHub holds (that person's approval of the pull request, or their verified signature on the commit that introduced it), with an environment-reviewer attestation as the escape hatch for a repository that cannot sign."
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
  at: "2026-09-19T00:00:00Z"
status: draft
verified:
  - by: process:ktl-librarian
    at: "2026-09-19T00:00:00Z"
---

# Overview

`.github/workflows/knowledge-registrar.yaml` is the registrar's job in CI -
keeping records well-formed and their provenance paperwork straight, never
judging whether a claim is true. It is a copy of the `ktl-sidecar` template
in `knowledge-trust-ladder`. The deviations this copy once carried -
`persist-credentials: false` on its checkout, a top-level `permissions: {}` -
were taken into the template itself. It is now *ahead* of that template
instead: its validate step runs `lokf validate --check-refs`, which the
template has yet to adopt, so the preflight's `copies` line reports it as
drifted until that change lands there; the design and its stated limits are
documented once, in the
skills repository's shared
[threat model](https://github.com/noelmcloughlin/knowledge-trust-ladder/blob/main/docs/threat-model.md#human-attribution-human-is-a-claim-not-a-credential)
(this repository's own `SECURITY.md` links there rather than restating it -
before 2026-09-14 the same material sat under a `SECURITY.md` section called
"The attribution gate is installed", now gone). It runs on a pull request that touches
`.lokf/**`, `knowledge_bundle/**` or the workflow itself, on a Monday 06:00
UTC schedule, and on demand. Three jobs:

**`validate` - "Validate the LOKF bundle".** `uv sync` in `.lokf/`, then two
steps: `uv run lokf validate --check-refs knowledge`, what `just lokf-validate`
and `just lokf-check-refs` run locally - schema validation, plus resolving
every typed-relation target in the bundle's own namespace, leaving a target
outside `base_iri` alone, since `source` and `definedBy` are documented as
taking an external resource; and `bash scripts/knowledge-conventions.sh
knowledge` for the conventions the toolkit cannot see because it reads a
concept body as an opaque string and never opens `log.md` (one ISO-date
`log.md` heading per day, quoted timestamps, `verified` as a list with at most
one librarian event, open-question bullets in the curator's
shape). Until 2026-09-19 the reference check was a third step, running the
justfile's recipe through `uvx --from rust-just just`; `--check-refs` is part
of `lokf validate`, so it rides on the first step and the runner needs no
`just`.

**`provenance` - "Check new human confirmations".** Pull requests only;
`contents: read`, `pull-requests: read`. A `verified` event whose actor is
`human:<id>` claims that a named person checked a concept against its
source, and nothing in the bundle's format proves it - `lokf validate`
accepts a well-formed event from any writer. So this job reads the diff of
`.lokf/knowledge` and `knowledge_bundle` between the merge base and the
head, collects every newly added `by: human:<id>` (anchored on `by:`, so a
`human:` mentioned in prose - a send-back note under `## Open questions` -
is not mistaken for an event), and for each actor asks GitHub for evidence:
an APPROVED review of the pull request from that login, or, failing that, a
commit in the pull request that introduces the event and that GitHub
reports as signature-verified *and* authored by that same login. Signature
status comes from GitHub's API rather than `git log`, because a runner holds
no keys - which is also what ties a signature to an account rather than
merely proving one exists. An actor with neither is *unbacked*: the job
writes a summary naming them and fails, unless the
`KNOWLEDGE_CURATION_ENVIRONMENT` repository variable is set, in which case
it passes the verdict on to `attestation`. A pull request that adds no
`human:` event passes without any of this.

**`attestation` - "Attest to an unbacked confirmation".** Runs only after an
*unbacked* verdict, inside the GitHub Environment named by that variable, so
the run pauses until one of the environment's required reviewers clicks
Approve - a fresh, logged human action per pull request, not a switch that
turns the check off. Unlike a review approval, an environment reviewer may
be the person who opened the pull request, which is what makes this work
for a solo maintainer who cannot sign. Both halves are needed: an
environment with no required reviewers approves itself instantly, so
setting the variable without configuring reviewers silently disables the
gate. What gets recorded is that someone with repository access vouched out
of band - not that anyone opened the source.

# What follows for a solo maintainer

GitHub will not let anyone approve their own pull request, so on a
one-person repository signing is the path: a GPG key, or the SSH key already
used to push, registered on GitHub as a *signing* key (a separate list from
authentication keys), `commit.gpgsign true`, and a commit email verified on
the account. The skills' `ktl-sidecar/references/gate.md` has the SSH
setup and the trap between the two key lists, and links to the GPG
alternative. Without that, every confirmation LOKF
Curator records is rejected at this gate - the intended failure: an
unchecked concept is supposed to read as unchecked.

# What it does not do

It never runs on the librarian's own review pull request, which
`knowledge-librarian.yaml`'s `publish` job opens with the default
`GITHUB_TOKEN` - GitHub does not start `pull_request` workflows for such a
PR - so `publish` carries its own two checks first (a path allow-list, and
no added `by: human:` claim - the skills repository's threat model has that
design); see [Scheduled librarian](scheduled-librarian.md).
And it is not a required status check: `main` deliberately has no merge
gate (`CONTRIBUTING.md`), because a path-filtered required check sits at
"Expected" for ever on pull requests that never trigger it, and a release
bot's push cannot be exempted from a ruleset. Access control, plus reading
the checks before merging, is what gates a change.
