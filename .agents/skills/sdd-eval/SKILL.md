---
name: sdd-eval
description: Execute approved Eval Contracts against observed behavior and persist PASS, FAIL, BLOCKED, or NOT_APPLICABLE results with evidence.
---

# SDD Eval

## Purpose

Answer “Does the software satisfy the previously defined expected behavior?”
using independent observation and durable evidence.

## Trigger

The workflow is at `eval` and required Verification has passed.

## Inputs

Authoritative behavior and Eval Contract, passing Verification, implementation
under test, environment, and `.sdd/evidence.yaml` retention policy. Full reads
the separate Specification and `evals.md`; Component reads `brief.md`.

## Required Artifacts

`.sdd/evidence.yaml`, `.sdd/templates/eval-results.md`,
`.sdd/schemas/eval-result.schema.json`, and
`.sdd/schemas/evidence.schema.json`. Full persists `eval-results.md` and
`evidence/manifest.json`. Component records the compact narrative in
`delivery.md` and persists `evidence/manifest.json` when evidence is retained.
Quick marks Eval not applicable and does not enter this stage.

## Preconditions

Required Verification is PASS; Eval Contract is approved and unchanged or has a
formally recorded modification.

## Procedure

Execute every applicable required Eval. Compare observed output to the stated
oracle. Classify exactly PASS, FAIL, BLOCKED, or NOT_APPLICABLE; the latter two
require explanation. Assign stable `EVIDENCE-<issue>-<sequence>` IDs and record
Eval ID, type, source, actual command/procedure, result, artifact path, revision
when practical, actual timestamp, and capturing actor. Retain binary/temporary
artifacts according to project policy.

## Recommended Agent

`evaluator`, separate from Implementer context where practical.

## Allowed Actions

Run tests and observations, create evaluation-only fixtures/harnesses that do not
replace the behavior, and persist results/evidence.

## Forbidden Actions

Do not trust Implementer assertions, fabricate PASS/evidence, weaken or delete
blocking Evals, change data merely to manufacture PASS, ignore negative cases, or
modify production implementation.

## Outputs

OKF-conformant `eval-results.md` and schema-valid evidence manifest.

## Completion Criteria

Every blocking Eval is PASS with sufficient evidence and every non-PASS result
is accurately explained.

## Failure Conditions

Any blocking FAIL/BLOCKED, missing evidence, invalid oracle, or environment that
prevents required observation.

## State Transition

On full blocking PASS set `eval_status: pass` and move to `review`. On behavior
failure route to `implement`/`fix`; on a proven contract defect route to
`eval-design` through formal modification.

## GitHub Label Transition

After state persistence, project `stage:review`, `stage:implement`, `stage:fix`,
or `stage:eval-design` as decided. When a required human-operated environment is
missing, retain `stage:eval` and add `gate:manual-eval` plus `state:blocked`.

## Human Escalation Conditions

Escalate missing manual environments or intentional contract changes, especially
security, public API, data, performance budget, or Acceptance Criteria changes.
