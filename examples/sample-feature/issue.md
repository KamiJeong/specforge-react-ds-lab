---
type: SDD Issue
title: Slug Normalizer Sample — Normalized Intent
description: Normalized local intent for the isolated Issue 42 example.
tags: [sdd, example, intake]
status: draft
sources:
  - id: local-issue-42
    resource: github-issue.md
    title: Sample GitHub Issue 42 Input
sdd:
  issue: 42
  stage: intake
  artifact: issue
---

# Intent

Demonstrate SpecForge traceability with a minimal title-to-slug behavior.

## Problem

Ad-hoc title normalization produces inconsistent slugs.

## Desired Outcome

An ASCII title becomes lowercase words joined by single hyphens.

## Known Context

The implementation is reference-only and must not become a project runtime
assumption.

## Constraints

- POSIX shell execution for the isolated example.
- ASCII normalization only.

## Known Facts

The repository requires a small example with executable evidence.

## Unknowns

None that change the narrow sample contract.

## Risks

Readers could mistake the sample language for a framework requirement; every
index and plan therefore labels it illustrative.

## Non-Goals

Unicode transliteration, package distribution, and application integration.

## Suggested Clarifications

Confirm that removing unsupported characters is acceptable for this sample.
