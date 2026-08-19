---
name: sdd-review
description: Perform independent read-only code review after Verify and Eval pass, producing stable P0-P3 findings beyond encoded checks.
---

# SDD Review

## Purpose

Find important latent problems outside the encoded Verification and Eval checks.

## Trigger

The workflow is at `review` after required Verification and blocking Evals pass,
including after each fix loop.

## Inputs

Constitution, Spec/AC, Eval Contract, Plan, Tasks, implementation diff, Verify and
Eval results/evidence, and relevant repository context. Exclude Implementer
self-justification as authoritative evidence.

## Required Artifacts

`.sdd/templates/review.md` and `.sdd/schemas/review-finding.schema.json`; the
read-only Reviewer returns findings for Orchestrator persistence in `review.md`
and `state.json`.

## Preconditions

Verification PASS, all blocking Evals PASS, and Reviewer context is independent
from Implementer context.

## Procedure

Review correctness, regressions, architecture, security, error handling, races,
performance, accessibility, maintainability, complexity, dependencies, tests,
Eval coverage, and false-confidence tests. Assign stable
`FINDING-<issue>-<sequence>` IDs and P0 BLOCKER, P1 MUST_FIX, P2 SHOULD_FIX, or
P3 OPTIONAL with concrete evidence and affected Requirements.

## Recommended Agent

`reviewer` (Sol/high, read-only). The Orchestrator persists its output.

## Allowed Actions

Read artifacts and diff, run non-mutating diagnostics, and report findings with
reproduction steps when practical.

## Forbidden Actions

Do not edit files, share Implementer context as reviewer memory, call Eval PASS a
review PASS automatically, or resolve findings without re-review.

## Outputs

OKF-conformant `review.md`, updated review iteration, and open finding records.

## Completion Criteria

Review scope is adequate and no open P0/P1 findings remain. P2/P3 are explicit
for convergence and the PR.

## Failure Conditions

Any open P0/P1, insufficient review inputs, invalid evidence, or lack of reviewer
independence.

## State Transition

Move to `converge` when P0/P1 are zero. Otherwise move to `fix`. Increment
`review_iteration`; after two unsuccessful fix iterations require human review.

## GitHub Label Transition

After state persistence, project `stage:converge` or `stage:fix`; on limit add
`gate:human-required` and `state:blocked`.

## Human Escalation Conditions

Escalate unresolved P0/P1 after two fix iterations, disputed critical findings,
or remediation that changes a human-gated contract.
