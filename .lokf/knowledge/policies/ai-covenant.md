---
type: Policy
id: https://ktl-registrar.example/knowledge/policies/ai-covenant
title: AI Covenant
description: Contributors own what they submit, whichever tools helped write it; AI may support discussion but never take part on a person's behalf; a repository-owned agent commits under a bot identity, proposes every change as a reviewed pull request, runs with least privilege, and never records a person's verdict itself.
resource: AI_COVENANT.md
generated:
  by: process:ktl-librarian
  at: "2026-10-15T23:50:48Z"
status: draft
verified:
- by: process:ktl-librarian
  at: "2026-10-15T23:50:48Z"
---

# Overview

`AI_COVENANT.md` applies to three repositories: obsidian-ktl-registrar, obsidian-ktl-curator and knowledge-trust-ladder. Its closing note says it is adapted from the Knowledge Trust Ladder AI Covenant, itself adapted from the LinkML AI Covenant. Its "Repository-Owned Agent Automation" section covers this repository's `knowledge-librarian.yaml` workflow, which runs the `ktl-librarian` skill: a bot identity, review always, least privilege enforced, and verdicts that must be real. [Scheduled Librarian](../playbooks/scheduled-librarian.md) describes how the workflow is built.
