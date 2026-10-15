---
type: GlossaryTerm
id: https://ktl-registrar.example/knowledge/glossary/diataxis-genre
title: Diátaxis genre
definition: An optional facet (tutorial/how-to/reference/explanation) tagging how a concept's prose serves the reader, orthogonal to its LOKF type.
abbreviation: genre
genre: reference
generated:
  by: process:ktl-librarian
  at: "2026-10-15T23:50:48Z"
description: The optional Diátaxis genre facet (tutorial, how-to, reference or explanation) that tags how a concept's prose serves the reader; the plugin warns on a value outside the list.
verified:
- by: process:ktl-librarian
  at: "2026-10-15T23:50:48Z"
---

# Overview

Validated by `validateTypeVocabulary` in `src/validator.ts`: an out-of-enum or
non-string `genre` value is a warning, never an error, consistent with LOKF's
permissive-by-design philosophy. This concept itself is tagged `genre:
reference` in this bundle's own root header conventions - a plain glossary
entry, not a worked example.
