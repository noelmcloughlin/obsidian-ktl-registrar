---
type: Explanation
id: https://ktl-registrar.example/knowledge/explanation/why-ktl-registrar
title: Why KTL Registrar
genre: explanation
description: Why the LOKF semantic layer needs its own in-editor check, why the plugin checks the OKF v0.2 base layer itself instead of leaning on a separate validator, why it names no other plugin but its sibling KTL Curator, and why it is called the registrar. Formerly why-ktl-registrar.md.
resource: README.md
sources:
  - resource: README.md
  - resource: docs/for-the-curious.md
about:
  - https://ktl-registrar.example/knowledge/references/okf-specification
  - https://ktl-registrar.example/knowledge/references/lokf-specification
relatedTo:
  - https://ktl-registrar.example/knowledge/services/ktl-registrar-plugin
generated:
  by: process:ktl-librarian
  at: "2026-09-13T19:00:00Z"
status: draft
verified:
  - by: process:ktl-librarian
    at: "2026-09-14T15:00:00Z"
---

# Overview

Plain OKF is prose + structure; LOKF adds a bundle-root semantic header, a
controlled type vocabulary, typed RDF-backed relationships, and
id/IRI-minting consistency - real, new surface worth its own validator, and
one that has to run *as a person writes*, in the editor, because an Obsidian
vault has no CI gate to catch a malformed record after the fact. That is the
registrar's half of the job the `knowledge-trust-ladder` README names: keeping
records well-formed, never judging whether they are true. Since 2026-09-14
the README also places that job on the **three lines of defence** the family
reads its cast through ([knowledge-trust-ladder's docs/three-lines.md](https://github.com/noelmcloughlin/knowledge-trust-ladder/blob/main/docs/three-lines.md)):
this plugin and `lokf validate` are the **second line** - compliance, not
content, ensuring every record is well-formed without owning or judging what
it claims - alongside the CI gate `knowledge-registrar.yaml` runs; the
librarian and curator are the first line, and independent audit (not
shipped) would be the third.

# Where the detailed reasoning now lives

README.md's own "For the curious" section is now one line pointing at
[docs/for-the-curious.md](../../../docs/for-the-curious.md), which carries
most of what this section below used to draw from README directly - the
checks-added-over-plain-OKF list, the OKF v0.2 base-layer rationale, what is
deliberately left unchecked, and the four-tier trust model. This concept's
"Why the name" and "What it still leaves out" sections still draw on
README.md itself (the credits, the alternatives footnote beneath them, and
the sibling-plugin framing), so both files are recorded as sources. The
README was rewritten around usage on 2026-09-13 - two vaults, a quick
start, the commands, which folder is the bundle - and now points at the
`knowledge-trust-ladder` README for the role table and the trust ladder rather
than restating them; none of the claims here changed with it.

# Why it checks the OKF v0.2 base layer itself

Every LOKF field is a slot in the LOKF schema, and the schema subsumes the
plain-OKF v0.2 rules underneath the dialect - a required `type`, the
`Attested Computation` contract, reserved `index.md`/`log.md` structure, the
v0.1→v0.2 migration hints. So the plugin checks them directly (the `okf/*`
rules, gated by `checkOkfBaseLayer`), with severity taken from the spec's own
force, rather than depending on a separate OKF validator that might not be
installed or kept current. An earlier design did the opposite - it treated
itself as a layered add-on, tried to detect an installed OKF validator, and
recommended one when absent. That detection read Obsidian's undocumented
`app.plugins` API (a routine community-review flag), and the recommendation
became moot once the base layer was covered here; both, and the settings
action that deep-linked to a specific validator, were removed on 2026-09-12.
Other OKF v0.2 validators are now mentioned once, in a footnote at the end
of the README (beneath the credits since the 2026-09-13 rewrite), as
alternatives for that layer - never as companions or dependencies.

# Why the name

The job the plugin does is the registrar's - the clerical
role in the `knowledge-trust-ladder` taxonomy, alongside `lokf validate` and CI's
`knowledge-registrar.yaml` gate - and a registrar keeps records well-formed
and says what it finds, where an enforcer would block: the longest section
of `docs/for-the-curious.md` is on why almost everything here is a warning.

# What it still leaves out

The credibility *depth* of the §5 trust fields - who vouched, whether a
source is right, which tier a concept has reached - is the sibling
**KTL Curator**'s surface; this plugin checks only that those fields are
well-shaped. Neither plugin detects, loads, or calls into the other; the
one point of contact is a read-only `api` this plugin offers and nobody is
required to use.
