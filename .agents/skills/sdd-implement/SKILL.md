---
name: sdd-implement
description: Execute approved SpecForge Tasks in production code and implementation-owned tests without changing higher-level contracts.
---

# SDD Implement

## Purpose

Build the approved change faithfully and keep the implementation traceable to
Tasks and Requirements.

## Trigger

The workflow is at `implement` and Analyze has passed.

## Inputs

For Full: approved Tasks, Plan, Specification, Acceptance Criteria, Eval
Contract, Analyze result, and relevant repository context. For Quick/Component:
approved `brief.md` with Requirements, Acceptance Criteria, strategy, Tasks,
and targeted evaluation intent.

## Required Artifacts

No new knowledge document is mandatory during coding. Update Task statuses and
implementation references only through the Orchestrator without changing their
meaning.

## Preconditions

The selected profile's Brief or Full pre-implementation gates are approved and
no required human decision is open. Full requires approved Eval Design and
passing Analyze. Component requires Eval Design approved through `brief.md`.
Quick records Eval Design and Analyze as `not_applicable`.

## Procedure

Work task by task. Make scoped production and implementation-test changes,
follow repository conventions, and preserve unrelated work. Record material
reversible assumptions. If code exposes a conflict with architecture, Spec, AC,
or Eval, stop and return the exact conflict to the Orchestrator.

## Recommended Agent

`implementer`; use `explorer` for targeted read-only discovery.

## Allowed Actions

Modify production code, implementation-owned tests, and necessary supporting
source files within approved Tasks.

## Forbidden Actions

Do not edit the Constitution, Specification, Acceptance Criteria, or blocking
Eval expectations; do not hardcode fixtures, mock away behavior, skip negative
cases, or claim verification/evaluation/review success.

## Outputs

Scoped code and test changes, Task-to-file references, and reported conflicts or
assumptions.

## Completion Criteria

All approved implementation Tasks are complete with no known higher-authority
conflict and the change is ready for independent Verification.

## Failure Conditions

Unresolved requirement/architecture conflict, out-of-scope dependency, unsafe
decision, or incomplete Task.

## State Transition

Set `implementation_status: complete` and move to `verify`; on conflict route to
the owning earlier stage and mark implementation blocked or in progress.

## GitHub Label Transition

After state persistence, project `stage:verify` or the persisted backward stage.

## Human Escalation Conditions

Escalate only when discovered work crosses the Constitution's decision
boundaries; ordinary reversible implementation choices remain autonomous.
