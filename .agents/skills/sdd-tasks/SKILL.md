---
name: sdd-tasks
description: Decompose an approved Plan into stable, traceable implementation Tasks tied to Requirements, Acceptance Criteria, and Evals.
---

# SDD Tasks

## Purpose

Create coherent units of implementation work with complete requirement and Eval
traceability.

## Trigger

The workflow is at `tasks`, or Analyze reveals missing or invalid task coverage.

## Inputs

Specification, Acceptance Criteria, Eval Contract, Plan, and relevant repository
impact information.

## Required Artifacts

`.sdd/templates/tasks.md`; persist `tasks.md` and update the feature index.

## Preconditions

Plan is valid and higher-level artifacts use stable IDs.

## Procedure

Create stable `TASK-<issue>-<sequence>` IDs. Each implementation Task links at
least one Requirement and applicable Acceptance Criteria and Evals. Define work,
dependencies, and an observable completion signal. Keep Tasks meaningful and
coherent rather than microscopic or cross-cutting.

## Recommended Agent

`architect`.

## Allowed Actions

Decompose and order approved work; add explicit verification/evidence-support
tasks when needed.

## Forbidden Actions

Do not introduce unapproved behavior, orphan Tasks, or rename stable IDs merely
because ordering changes.

## Outputs

OKF-conformant `tasks.md` with complete REQ/AC/EVAL references.

## Completion Criteria

Every required Requirement has implementation coverage, every Task has a
Requirement, and execution/evaluation dependencies are clear.

## Failure Conditions

Requirement without Task, Task without Requirement, missing Eval linkage,
unresolvable sequencing, or scope that requires Plan/Spec revision.

## State Transition

Run `sdd-knowledge-validate`; on success mark `tasks` complete and move to
`analyze`. Route backward on a discovered higher-level conflict.

## GitHub Label Transition

After artifact, knowledge check, and state persistence, project `stage:analyze`.

## Human Escalation Conditions

Escalate only when decomposition exposes a human-gated scope or authority
decision; reversible technical sequencing is AUTO.
