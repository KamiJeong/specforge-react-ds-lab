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

Constitution, selected profile, authoritative behavior contract, implementation
diff, Verify and applicable Eval results/evidence, and relevant repository
context. Full uses Spec/AC, Eval Contract, Plan, and Tasks; Quick/Component use
`brief.md`. Exclude Implementer self-justification as authoritative evidence.

## Required Artifacts

`.sdd/schemas/review-finding.schema.json`. Full uses
`.sdd/templates/review.md`; Quick/Component use
`.sdd/templates/delivery.md`. The read-only Reviewer returns findings for
Orchestrator persistence in the profile artifact and `state.json`.

## Preconditions

Verification PASS, every blocking Eval applicable to the selected profile PASS,
and Reviewer context independent from Implementer context. Quick may have
`eval_status: not_applicable`.

## Procedure

Select review dimensions from the persisted profile and actual changed surface.
Quick normally covers correctness, regressions, error handling, maintainability,
and test adequacy. Component additionally covers component API consistency,
states/events, keyboard/focus behavior, accessibility, visual contracts, and
compatibility. Full retains the broad architecture, security, concurrency,
performance, dependency, and Eval adequacy review. Activate any omitted
dimension when repository evidence shows impact. Assign stable
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

OKF-conformant `review.md` for Full or Review section in `delivery.md` for
Quick/Component, updated review iteration, and open finding records.

## Completion Criteria

Review scope is adequate and no open P0/P1 findings remain. P2/P3 are explicit
for convergence and the PR.

## Failure Conditions

Any open P0/P1, insufficient review inputs, invalid evidence, or lack of reviewer
independence.

## State Transition

Move directly to `ready-pr` for Quick/Component when P0/P1 are zero and compact
Delivery readiness passes. Full moves to `converge`. Otherwise move to `fix`.
Increment `review_iteration`; after two unsuccessful fix iterations require
human review.

## GitHub Label Transition

After state persistence, project `stage:converge` or `stage:fix`; on limit add
`gate:human-required` and `state:blocked`.

## Human Escalation Conditions

Escalate unresolved P0/P1 after two fix iterations, disputed critical findings,
or remediation that changes a human-gated contract.
