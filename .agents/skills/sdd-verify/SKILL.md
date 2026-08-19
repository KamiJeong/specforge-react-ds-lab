---
name: sdd-verify
description: Execute project-configured mechanical repository health checks and record exact commands, exit codes, timestamps, and results before Eval.
---

# SDD Verify

## Purpose

Answer “Is the repository mechanically healthy after the change?” independently
from acceptance evaluation.

## Trigger

The workflow is at `verify` after implementation or every fix iteration.

## Inputs

`.sdd/verification.yaml`, changed repository, relevant environment, Tasks, and
the previous verification record if re-running.

## Required Artifacts

`.sdd/templates/verification.md`; persist `verification.md` and update the
feature index. Configuration lives in `.sdd/verification.yaml`.

## Preconditions

Implementation or fixes are persisted, and configured commands can be executed
without inventing unavailable dependencies.

## Procedure

Run required commands in declared order: formatting checks, lint, typecheck,
compile/build, unit/integration tests, dependency checks, or coverage only when
configured. Record exact command, meaningful environment, exit code, result,
actual execution timestamp, and revision when practical. Do not report commands
that were not run. Required failure blocks Eval.

## Recommended Agent

`evaluator`.

## Allowed Actions

Execute configured checks and write verification artifacts or retained output.
Use project-specific detection only when explicitly documented.

## Forbidden Actions

Do not assume an ecosystem, modify production code to make a check pass, call a
failed command successful, or collapse acceptance Eval into Verification.

## Outputs

OKF-conformant `verification.md` with PASS, FAIL, or BLOCKED and auditable command
records.

## Completion Criteria

Every required configured command actually executes successfully, or an approved
spike explicitly records Verification as not applicable.

## Failure Conditions

Required command fails, cannot run, times out, or lacks enough result data to
establish repository health.

## State Transition

On PASS set `verification_status: pass` and move to `eval`. On failure return to
`implement` or `fix` according to review history; BLOCKED remains at `verify`.

## GitHub Label Transition

After state persistence, project `stage:eval`, `stage:implement`, `stage:fix`, or
retain `stage:verify` for a block.

## Human Escalation Conditions

Escalate only for a missing external/manual environment, unsafe required command,
or policy decision; ordinary failures route to implementation/fix.
