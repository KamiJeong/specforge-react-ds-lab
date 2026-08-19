# Open Knowledge Format v0.2

SpecForge represents `specs/` as an OKF v0.2 Knowledge Bundle. The goal is useful
progressive discovery and portable development knowledge, not metadata for its
own sake.

## Bundle and reserved indexes

`specs/index.md` is the bundle root and its frontmatter contains only:

```yaml
---
okf_version: "0.2"
---
```

Feature `index.md` files are reserved discovery documents. They have headings,
links, and short descriptions but no concept frontmatter. `state.json` remains
the workflow authority; indexes do not encode transient state.

## Concept documents

Every non-reserved Markdown concept under a live feature directory is UTF-8,
starts with parseable YAML frontmatter, has a non-empty `type`, and contains
normal Markdown. Stable SpecForge types include:

```text
SDD Issue               SDD Specification       SDD Clarification
SDD Eval Contract       SDD Plan                SDD Task Set
SDD Analysis            SDD Verification        SDD Eval Result
SDD Code Review         SDD Convergence
```

OKF does not require a globally registered taxonomy; unknown descriptive types
are safe. Operational files such as state and JSON evidence are not concept
documents.

## Extension metadata

The `sdd:` namespace carries lightweight workflow context, IDs, routing, and
traceability. Do not duplicate document bodies in frontmatter.

```yaml
sdd:
  issue: 152
  stage: spec
  artifact: specification
  requirements: [REQ-152-001]
  acceptance_criteria: [AC-152-001]
```

## Provenance and actors

Use `sources:` for material derivation. Every entry contains `resource`; stable
`id` is recommended where claims need attribution. Resources may be URLs or
bundle-relative paths. Never fabricate provenance.

Agents and tools use `<producer>/<version>`, including
`specforge-architect/v1` and `specforge-evaluator/v1`. Real people use
`human:<id>`. Deterministic processes use `process:<id>`. Do not invent a human
author or verifier.

`generated.by` identifies who produced the current content and `generated.at`
uses the real material-change timestamp. It does not imply verification.

`verified` is a list added only after meaningful independent confirmation
against the declared source. A document author generating valid Markdown is not
independent verification.

## Lifecycle

- `draft`: incomplete or has not passed its required gate
- `stable`: gate passed and ready for downstream consumption
- `deprecated`: retained for history and links but superseded

OKF lifecycle and SDD workflow stage are independent dimensions.

## Cross-linking and progressive disclosure

Markdown relationships such as `REQ-152-001 → spec.md#req-152-001--title` and
`EVAL-152-001 → evals.md#eval-152-001` form a natural knowledge graph. V1 does
not need a graph database.

The Orchestrator reads the bundle root, then the relevant feature index, then
only current-stage inputs. This avoids loading every feature artifact and keeps
conversation context from becoming workflow memory.

## OKF verification versus Eval Evidence

OKF `verified` means a knowledge document was independently checked against a
source/resource. Eval Evidence means observed runtime behavior satisfied an Eval
Contract. Both can exist; neither substitutes for the other.

## Validation

`sdd-knowledge-validate` is read-only. It checks frontmatter, type, reserved
indexes, root version, lifecycle, sources, generated/verified structures, actors,
index links, and traceability links. `scripts/sdd/validate.py` implements the
mechanical checks. Temporarily unresolved ordinary links may be warnings, while
malformed concepts and required traceability failures block progression.
