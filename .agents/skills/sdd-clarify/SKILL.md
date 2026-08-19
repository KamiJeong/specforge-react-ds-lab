---
name: sdd-clarify
description: Resolve specification ambiguity through evidence-backed AUTO decisions or explicit MANUAL human gates.
---

# SDD Clarify

## Purpose

Make ambiguity visible and resolve it at the correct authority level.

## Trigger

The workflow is at `clarify`, or a later stage discovers a higher-level conflict.

## Inputs

Constitution, `issue.md`, `spec.md`, targeted repository evidence, and prior
clarification decisions.

## Required Artifacts

`.sdd/templates/clarification.md`; persist material decisions in
`clarifications.md` and assumptions/manual decisions in `state.json`.

## Preconditions

Each question identifies the affected Requirement or decision boundary.

## Procedure

Classify each question AUTO or MANUAL. AUTO is allowed when the Constitution,
architecture, code, tests, contracts, or reversible conventions provide safe
evidence. Record decision, reason, evidence, impact, and source. For MANUAL,
record exact question, options, recommendation when appropriate, consequences,
and blocking stage; persist state before stopping.

## Recommended Agent

`architect`, with `explorer` for read-only evidence.

## Allowed Actions

Make reversible evidence-backed technical assumptions and revise the Spec through
its owning stage when clarification changes behavior.

## Forbidden Actions

Do not invent confidence scores, infer human approval, or AUTO-resolve product,
security, authentication, authorization, sensitive-data, public API,
irreversible migration, major-cost, or Constitution-exception decisions.

## Outputs

OKF-conformant `clarifications.md`, updated state assumptions/decisions, and a
Spec whose open critical questions are resolved or explicitly blocked.

## Completion Criteria

No critical ambiguity remains unclassified; every AUTO decision has evidence;
every MANUAL decision has an explicit gate.

## Failure Conditions

Evidence is contradictory or insufficient, or required human input is pending.

## State Transition

Return to `spec` when behavior changes. Otherwise mark `clarify` complete and
move to `eval-design`. If MANUAL input is required, remain blocked at `clarify`.

## GitHub Label Transition

After state persistence use `stage:spec`, `stage:eval-design`, or retain
`stage:clarify`; add `state:needs-info` and `gate:human-required` for MANUAL.

## Human Escalation Conditions

Use every human decision boundary in the Constitution and workflow contract.
