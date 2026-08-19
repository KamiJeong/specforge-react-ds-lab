---
name: sdd-intake
description: Normalize a GitHub Issue or raw request into durable intent before specification or implementation begins.
---

# SDD Intake

## Purpose

Turn uneven raw intent into a reliable, source-grounded `issue.md` without
prematurely defining implementation.

## Trigger

The workflow is at `intake`, or normalized intent is missing or stale.

## Inputs

GitHub Issue metadata/body/labels or quoted raw intent, Constitution, and relevant
repository facts discovered without changing code.

## Required Artifacts

`.sdd/templates/issue.md`; create feature `issue.md`, `index.md`, and `state.json`
as needed.

## Preconditions

The source intent is available and its provenance can be recorded honestly.

## Procedure

Record Intent, Problem, Desired Outcome, Known Context, Constraints, Known Facts,
Unknowns, Risks, Non-Goals, and Suggested Clarifications. Separate source facts
from inference. Assign the Issue correlation and OKF metadata, then link the
artifact from the feature index.

## Recommended Agent

`architect`; use `explorer` for targeted read-only repository facts.

## Allowed Actions

Read Issue and repository context; normalize wording; record unknowns and risks.

## Forbidden Actions

Do not implement, invent requirements, resolve critical ambiguity, or describe
Issue prose as approved Specification.

## Outputs

OKF-conformant `issue.md` and initialized discovery/state artifacts.

## Completion Criteria

Every normalization section is addressed, provenance is real, and unknowns that
could alter behavior are visible.

## Failure Conditions

Source intent is unavailable, provenance cannot be established, or a suspected
security disclosure is present in a public workflow.

## State Transition

On success mark `intake` completed and move `current_stage` to `spec`. On failure
remain at `intake` and persist the block.

## GitHub Label Transition

After state persistence, replace `stage:intake` with `stage:spec`.

## Human Escalation Conditions

Escalate only when raw intent cannot be safely normalized or appears to contain
a private vulnerability report; do not require humans to write a full Spec.
