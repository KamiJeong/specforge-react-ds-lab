---
name: sdd-eval-design
description: Convert approved acceptance criteria into blocking and non-blocking pre-implementation Eval Contracts with observable oracles and evidence needs.
---

# SDD Eval Design

## Purpose

Define how correctness will be observed before implementation begins.

## Trigger

The workflow is at `eval-design`, or a recorded contract defect routes work back.

## Inputs

Approved Specification, Acceptance Criteria, clarifications, risks, and relevant
existing test/evaluation capabilities.

## Required Artifacts

`.sdd/templates/evals.md`, `.sdd/schemas/eval-case.schema.json`; persist
`evals.md` and update the feature index.

## Preconditions

Requirements and Acceptance Criteria have stable IDs and critical ambiguity is
resolved.

## Procedure

Create stable `EVAL-<issue>-<sequence>` cases linking Requirements and Acceptance
Criteria. For each, record purpose, category, preconditions, method, exact
procedure or command when known, observable oracle, required evidence, blocking
flag, and automation level. Include regression and negative cases where relevant.
Choose only applicable categories.

## Recommended Agent

`architect`; route critical, security, data, public-contract, and performance
Eval design to Sol/high reasoning.

## Allowed Actions

Design behavior-focused automated, semi-automated, or manual Evals and identify
environment dependencies.

## Forbidden Actions

Do not encode implementation details as the sole oracle, mock away behavior,
omit required negative cases, or weaken criteria for anticipated convenience.

## Outputs

OKF-conformant `evals.md` with complete AC-to-Eval traceability.

## Completion Criteria

Every Acceptance Criterion that needs evaluation is covered, every blocking Eval
has an observable oracle and evidence contract, and gaps are explicit.

## Failure Conditions

Untestable acceptance behavior, unavailable required oracle, contradictory
criteria, or a decision that requires clarification.

## State Transition

Set `eval_design_status` to approved and move to `plan`, or route back to
`clarify`/`spec` on conflict.

## GitHub Label Transition

After state persistence, project `stage:plan` or the persisted backward stage.

## Human Escalation Conditions

Escalate when a blocking oracle requires product/security judgment, costly manual
infrastructure, intentional weakening, or acceptance of an untestable risk.
