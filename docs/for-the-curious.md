# For the curious: how the checking works

[The README](../README.md) says everything you need to use KTL Registrar. This page says what is checked, and why.

## What LOKF adds over plain OKF

[OKF](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md) is a folder of Markdown files, one idea per file. Each file starts with a small YAML block whose only requirement is a `type`, such as `Service`, `Policy` or `GlossaryTerm`.

[LOKF](https://lokf.nolan-nichols.com/specification/) is the same folder held to a stricter dialect. Every field and relationship is bound to a public vocabulary (schema.org, DCAT, PROV-O), so the bundle can be turned into a knowledge graph without loss and queried like a database. That precision is what this plugin checks:

- **A bundle-root semantic header** on the root `index.md`: `lokf_version`, `base_iri`, `context`, `title`, `description`, `license` and `publisher`. These keys lift the whole bundle into a graph.
- **The form and authority of `base_iri`.** It must be a valid absolute IRI, end in `/` or `#` so that an id is the two joined together, and sit in a namespace the project owns, not `https://github.com/<org>/<repo>/knowledge/...`. It is an identifier namespace, not a hyperlink: a concept's `id` only looks like a URL and need not resolve, though a [Cool URI](https://www.w3.org/Provider/Style/URI) that could later double as a working link is the ideal. The check is on form and authority, never on whether the address is live.
- **A controlled type vocabulary.** The fifteen classes come from the LOKF schema and are listed under *Settings → Type vocabulary*: `Dataset`, `Table`, `Metric`, `Service`, `Playbook`, `Tutorial`, `Explanation`, `Policy`, `GlossaryTerm`, `Reference`, `Document`, `Role`, `AttestedComputation`, `Person` and `Organization`. Some carry type-specific fields: `Table` and `Dataset` need structured `fields` and `distribution` objects, never bare strings or URLs. The list is a starting point, not a ceiling. A bundle that extends LOKF with a domain schema (LinkML, importing LOKF's, validated with `lokf validate --schema`) adds that schema's classes in the same setting. The field checks key on the exact class name, so a domain subclass of `Metric` is not held to its parent's recommended fields.
- **The optional Diátaxis `genre` facet**: `tutorial`, `how-to`, `reference` or `explanation`.
- **Typed relationships** in place of bare links. The schema's `RelationType` set is `isPartOf`, `hasPart`, `references`, `dependsOn`, `derivedFrom`, `about`, `sameAs`, `relatedTo`, `wasAttributedTo`, `definedBy`, `measures`, `joinsWith`, `source`, `memberOf` and `holder`, plus a generic `relations` list. Each has a precise meaning, and each is checked to make sure the note it points at exists.
- **`id` consistency**: does a concept's `id` match what its `base_iri` and file path would produce?
- **The shape of the trust and lifecycle fields** (OKF v0.2 §5), when a bundle uses them. A `verified` or `generated` event is a well-formed `{ by, at }` with an OKF §7 actor (`human:<id>`, `process:<id>` or `<producer>/<version>`); `status` is one of the schema's lifecycle values; `stale_after` is a datetime or a bare date; each `sources` entry names its `resource`. These fields originate in OKF, are defined in the LOKF schema, and are what curation rests on, so their shape is checked here and never their credibility or their trust tier. Two are errors because OKF marks them REQUIRED: a `generated.by` actor and each source's `resource`. A value the schema's own patterns reject is also an error since lokf 0.8.0: a malformed actor, a `sources[].author` or `email`, or an `http_method` outside its enum. The rest are warnings.

## The OKF v0.2 base layer

Every LOKF field is a LOKF schema slot, so the plugin already has what it needs to check the plain OKF rules underneath the LOKF dialect. It does so rather than rely on a separate tool that might not be installed or kept current. The specification is the authority: a rule exists here because OKF v0.2, or the LOKF schema that mirrors it, says so. These are the `okf/*` findings. *Settings → OKF v0.2 base layer* switches them off in one place if you run a dedicated OKF validator.

**Severity follows the specification's own force.** What OKF marks REQUIRED or MUST, or lists under §11 conformance, is an **error**. The shape of optional fields and the migration hints are warnings. *Enforce OKF conformance as errors*, in the same settings group, downgrades the mandatory errors to warnings for a bundle in mid-migration, so the findings stay visible without blocking. It is a break-glass switch and not recommended otherwise.

| Rule | OKF v0.2 | Severity |
| --- | --- | --- |
| A `type` is present. It is the one always-required OKF key and `required` in the LOKF schema. Flagged only when the note is plainly a concept, that is, it carries other LOKF fields, so an ordinary note with tags or aliases is left alone | §4.1, §11 | error |
| An `Attested Computation` has a `runtime`: REQUIRED in §10.2 and `required` in the schema | §10.2 | error |
| An `Attested Computation`'s optional `parameters`, `executor`, `attester` and `computation` fields are well-shaped, and a body `# Computation` block is present | §10 | warning |
| A non-root `index.md` carries no frontmatter. Only the bundle root's may, and only `okf_version` | §8, §11 | error |
| `log.md` date headings are ISO 8601 `YYYY-MM-DD` | §9, §11 | error |
| A legacy `timestamp` is superseded by `generated`, and a body `# Citations` list by `sources`. v0.2 consumers still read the v0.1 forms, so these only nudge | §13 | warning |

## What this plugin does not check

Out of scope is the verdict, not the paperwork. For the §5 trust and lifecycle fields the plugin checks shape and never credibility: it does not weigh a source's signals, rank trust tiers, or decide whether a claim is current. It executes nothing. An `Attested Computation`'s contract is checked, but running the computation, inspecting a receipt and returning an attestation verdict (§10.5) are a consumer's runtime concerns, not an in-editor linter's.

## Where this fits: the "Schema-valid" tier

The companion [knowledge-trust-ladder](https://github.com/noelmcloughlin/knowledge-trust-ladder) project describes four levels of trust a claim in a bundle can earn: **schema-valid**, the frontmatter is well-formed and its relations resolve; **source-consistent**, an agent re-checked it against its source; **human-confirmed**, a named person vouches for it; and **proven-in-use**, a reader's question was answered from it. Each proves less than its name suggests. This plugin checks the first level as you write, inside the editor. It cannot tell you whether a claim is true. That takes a **librarian** pass and a **curator**'s review, and [KTL Curator](https://github.com/noelmcloughlin/obsidian-ktl-curator) is where the review happens in the editor.

There is no dependency in either direction. This plugin reads Markdown and YAML and works on any LOKF bundle however it was produced: by hand, by the `lokf` CLI, or by the skills. It never loads or calls a skill, an agent or another plugin, and the skills rely on `lokf validate`, not on this plugin. KTL Curator sits one tier above and is equally independent; neither plugin detects whether the other is installed.

## Where the bundle lives, host by host

The plugin sees a vault. Where that vault's folder sits is the **sidecar**'s business, and the skills' page [The bundle in Obsidian](https://github.com/noelmcloughlin/knowledge-trust-ladder/blob/main/docs/obsidian.md#where-the-bundle-lives-host-by-host) walks through the layouts: a code repository, a vault kept in git, a shared drive, and many hosts in one vault. Two of them touch this plugin. A bundle rearranged into a real `knowledge_bundle/` folder inside a vault is detected as a bundle inside that vault (README, *Which folder is the bundle*). Several repositories' bundles linked into one vault are listed under *Bundle root folders*; keep such links out of Obsidian Sync, which does not carry them.

## Why almost everything is a warning

LOKF's own rules are permissive: missing optional fields, an unknown `type` and broken cross-links must never cause rejection. This plugin reserves **errors** for structural problems, of four kinds:

- A `base_iri` that is not a valid IRI, does not end in `/` or `#`, or lives in a namespace the project does not own.
- A `Field` or `Distribution` given as a bare string instead of a structured object.
- A value the LOKF schema's patterns reject, since `lokf validate` fails on it: an actor, a `sources[].author` or `email` in the wrong shape, or an `http_method` outside its enum.
- The OKF v0.2 rules the specification itself marks REQUIRED or MUST: the errors in the table above, plus a `generated` block with no `by` actor and a `sources` entry with no `resource` (§5).

The OKF errors are errors because the specification, and the LOKF schema that mirrors it, say the field or structure is required. Where OKF says a field is optional or merely superseded, the finding is a warning. The base-layer section above says how the mandatory errors can be downgraded during a migration without losing the finding. Everything else is a warning you can act on or ignore: an unrecognised type, a missing recommended field, an unresolved relative link, or an `id` that does not match what its path and `base_iri` would give it.

The plugin writes only on an explicit command, and only to the form of a record, never to a claim: a header template, a mechanical fix, a wikilink block projecting relations you already declared, a map built from genres you already set. Auto-fix is offered only where the correction is mechanical and unambiguous. **Fix safe issues in the active note** appends a missing `base_iri` terminator (`/`), rewrites a known type alias to its canonical class (`runbook` → `Playbook`), and turns a bare-string relation into a one-item list, each a format-preserving edit in one undo step. It never guesses a value the project owns. It will not pick a `base_iri`, move one into a namespace you control, or invent a publisher identity; those stay human decisions, flagged but not touched.
