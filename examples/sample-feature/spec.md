---
type: SDD Specification
title: Slug Normalizer Sample Specification
description: Defines the observable ASCII slug normalization behavior in the isolated sample.
tags: [sdd, example, specification]
status: draft
sources:
  - {resource: issue.md, title: Normalized sample intent}
  - {resource: clarifications.md, title: Sample clarification}
sdd:
  issue: 42
  stage: spec
  artifact: specification
  requirements: [REQ-42-001]
  acceptance_criteria: [AC-42-001, AC-42-002]
---

# Specification

## REQ-42-001 — Normalize an ASCII title into a slug

The example accepts one short ASCII title and emits a lowercase slug whose words
are separated by one hyphen.

### Acceptance Criteria

#### AC-42-001

`Hello, Spec Forge!` produces exactly `hello-spec-forge` followed by a newline.

#### AC-42-002

Leading, trailing, and repeated non-alphanumeric separators do not produce
leading, trailing, or repeated hyphens.

## Constraints

The example remains an isolated POSIX-shell reference and is not installed as a
SpecForge runtime command.

## Non-Goals

Unicode transliteration, locale-sensitive casing, and empty-input policy beyond
emitting an empty line.
