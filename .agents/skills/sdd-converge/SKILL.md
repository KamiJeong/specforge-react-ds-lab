---
name: sdd-converge
description: Make the final consistency judgment across policy, promises, code, executed evidence, and independent review before PR readiness.
---

# SDD Converge

## Purpose

Decide whether the actual codebase satisfies all promises in persistent
development knowledge.

## Trigger

The workflow is at `converge` after independent Review has no open P0/P1.

## Inputs

Constitution, Spec/AC, clarifications, Eval Contract, Plan, Tasks, code/diff,
Verification, Eval Evidence, Review, state, and knowledge-validation result.

## Required Artifacts

`.sdd/templates/convergence.md`; persist `convergence.md` and update the feature
index.

## Preconditions

Knowledge validation passes sufficiently; Verification and blocking Evals pass;
independent Review is complete with no open P0/P1.

## Procedure

Compare every authority and delivery layer. Build a promise-to-proof matrix and
detect unfinished Requirements/Tasks, unexecuted blocking Evals, missing
evidence, Spec/code divergence, temporary workarounds, unresolved findings,
untracked deviations, or stale links. Check every Definition of Done condition.

## Recommended Agent

`architect` (Sol/high); the Orchestrator adjudicates final state.

## Allowed Actions

Read and compare all final inputs, run read-only validation, and identify precise
backward transitions.

## Forbidden Actions

Do not implement fixes, waive missing evidence, infer approvals, hide P2/P3, or
declare convergence from passing tests alone.

## Outputs

OKF-conformant `convergence.md` with PASS/FAIL/BLOCKED, matrix, DoD checklist,
deviations, and residual risks.

## Completion Criteria

Every promise is implemented and evidenced, no open P0/P1 remains, deviations
are tracked, and Definition of Done passes.

## Failure Conditions

Any incomplete promise, missing evidence, divergence, workaround, stale required
relationship, unresolved P0/P1, or failed final gate.

## State Transition

Set `convergence_status: pass` and move to `ready-pr`, or route to the earliest
owning stage listed in `.sdd/workflow.yaml`.

## GitHub Label Transition

After convergence artifact and state persistence, project `stage:ready-pr` on
PASS or the persisted backward stage on failure.

## Human Escalation Conditions

Escalate disputed final authority, intentional waivers/contract changes, or any
remaining human-gated decision; do not infer release approval.
