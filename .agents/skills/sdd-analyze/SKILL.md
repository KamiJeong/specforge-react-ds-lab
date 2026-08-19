---
name: sdd-analyze
description: Run a read-only pre-implementation consistency, coverage, architecture, dependency, and traceability gate across SDD and EDD artifacts.
---

# SDD Analyze

## Purpose

Prevent implementation from starting against contradictory, incomplete, weak,
or untraceable development knowledge.

## Trigger

The workflow is at `analyze`, after Tasks and a knowledge checkpoint pass.

## Inputs

Constitution, Specification, Acceptance Criteria, clarifications, Eval Contract,
Plan, Tasks, feature index, and targeted repository evidence.

## Required Artifacts

`.sdd/templates/analysis.md`; persist `analysis.md` and update the feature index.

## Preconditions

Spec, Eval Design, Plan, Tasks, and knowledge structure are complete enough to
analyze. Analysis itself is read-only with respect to implementation.

## Procedure

Compare Constitution↔Spec, Spec↔AC, AC↔Eval, Spec↔Plan, Plan↔Tasks,
REQ↔Tasks, and Tasks↔Evals. Detect missing coverage, ambiguity, untestable
requirements, weak or implementation-only oracles, orphan Tasks/Evals,
architecture/dependency contradictions, and Constitution violations. Classify
findings as blocking or advisory and identify the owning backward stage.

## Recommended Agent

`architect`, supported by parallel `explorer` reads for repository, security,
performance, or test dimensions when useful.

## Allowed Actions

Read, trace, compare, run non-mutating knowledge checks, and persist the analysis
report through the Orchestrator.

## Forbidden Actions

Do not edit production code or silently repair higher-level artifacts while
claiming Analyze passed.

## Outputs

OKF-conformant `analysis.md` with gate result, traceability matrix, findings, and
required transitions.

## Completion Criteria

No blocking findings remain and every required REQ→AC→EVAL→TASK chain is sound.

## Failure Conditions

Any blocking coverage, authority, architecture, dependency, testability, or
knowledge-integrity finding.

## State Transition

Set `analysis_status: pass` and move to `implement`, or set fail/blocked and
route to `clarify`, `spec`, `eval-design`, `plan`, or `tasks` as the finding owns.

## GitHub Label Transition

After state persistence, project `stage:implement` on PASS or the owning backward
stage on FAIL.

## Human Escalation Conditions

Escalate when a blocking finding requires a human-gated semantics, security,
data, API, migration, cost, or Constitution decision.
