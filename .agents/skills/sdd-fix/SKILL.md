---
name: sdd-fix
description: Resolve approved P0-P3 Review Findings with scoped remediation, then require re-Verification, re-Eval, and re-Review.
---

# SDD Fix

## Purpose

Remediate independent Review Findings without changing the promises used to find
them.

## Trigger

The workflow is at `fix` with approved open findings.

## Inputs

Open findings, Constitution, Spec/AC, Eval Contract, Plan, Tasks, diff, and prior
Verify/Eval evidence.

## Required Artifacts

Update implementation and tests; return finding-to-change references for the
Orchestrator to append to `review.md` and state. Do not rewrite review history.

## Preconditions

Findings have stable IDs and their requested scope does not require an unresolved
higher-authority decision.

## Procedure

Address approved findings with the smallest coherent change, add regression
coverage where useful, and record affected finding IDs. Preserve unrelated work
and disclose any remaining risk. Return to the Orchestrator without asserting
that findings are independently resolved.

## Recommended Agent

`fixer`.

## Allowed Actions

Modify production code, tests, and supporting files required by approved
findings.

## Forbidden Actions

Do not rewrite Requirements, Acceptance Criteria, blocking Evals, or finding
severity to eliminate the problem; do not skip the full recheck loop.

## Outputs

Scoped remediation changes and finding-to-change mapping.

## Completion Criteria

All targeted changes are implemented and ready for fresh Verification.

## Failure Conditions

Finding cannot be fixed within scope, exposes a higher-level conflict, or would
require unsafe/unapproved behavior.

## State Transition

Move to `verify`; required path is Fix→Verify→Eval→Review. On higher-level
conflict route to its owning stage. Enforce the two-iteration default limit.

## GitHub Label Transition

After state persistence, replace `stage:fix` with `stage:verify`, or project the
persisted backward stage.

## Human Escalation Conditions

Escalate after two unsuccessful iterations or when remediation requires a gated
product, security, data, API, migration, cost, or policy decision.
