---
type: SDD Clarification
title: Slug Normalizer Sample Clarifications
description: Evidence-backed decisions for the isolated Issue 42 example.
tags: [sdd, example, clarification]
status: draft
sources:
  - {resource: issue.md, title: Normalized sample intent}
sdd:
  issue: 42
  stage: clarify
  artifact: clarification
---

# Clarifications

## AUTO Decisions

### CLARIFICATION-42-001

- **Decision:** Treat non-ASCII and punctuation runs as separators and trim them
  from the result.
- **Reason:** The source explicitly scopes the sample to ASCII and excludes
  international transliteration.
- **Evidence:** [Issue input](github-issue.md) constraints and non-goal.
- **Impact:** The contract remains small and observable; production adopters must
  define their own internationalization behavior.
- **Source:** `github-issue.md`

## MANUAL Decisions

None. No product, security, data, API, migration, or policy decision is implied.

## Unresolved Questions

None for the isolated reference.
