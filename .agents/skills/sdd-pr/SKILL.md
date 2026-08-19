---
name: sdd-pr
description: Prepare and create a GitHub Pull Request only after SpecForge Definition of Done and final knowledge validation pass.
---

# SDD PR

## Purpose

Publish a truthful, traceable Pull Request from a converged Issue workflow.

## Trigger

The workflow is at `ready-pr`, or a user requests the final PR after all gates.

## Inputs

Issue, final state, Specification, Tasks, Plan, Eval Contract, Verification, Eval
Evidence, Review, Convergence, residual P2/P3 findings, risks, rollback plan, Git
branch/diff, and repository remote.

## Required Artifacts

`.github/PULL_REQUEST_TEMPLATE.md`, feature knowledge links, and persisted
`state.json`. PR text may be staged in the feature directory only when the
project chooses to retain it.

## Preconditions

Current stage is `ready-pr`; final knowledge validation and every
`pr_readiness_conditions` item in `.sdd/workflow.yaml` pass; branch contains only
intended changes; GitHub authentication is available.

## Procedure

Confirm state and evidence again. Prepare Problem, Source Issue, Specification
Summary, Requirements Implemented, Implementation Summary, Important Decisions,
Eval Contract Summary, Verification Evidence, Eval Evidence, Review Result,
remaining P2/P3, Known Risks, Rollback, and SDD Artifact References. Include
`Closes #<issue>` for Issue mode. Create the PR only through the authorized GitHub
workflow and capture the real URL.

## Recommended Agent

`utility` prepares metadata; the Orchestrator performs final gate confirmation
and external mutation.

## Allowed Actions

Read final artifacts, prepare truthful PR metadata, push/create a PR when the
user's workflow authorizes it, and record the returned URL.

## Forbidden Actions

Do not create a PR early, claim unexecuted checks, omit known P2/P3 or risks,
infer human approval, or use PR text as a substitute for persistent artifacts.

## Outputs

A GitHub PR linked to the Issue and the feature knowledge bundle, or an explicit
external/authentication block.

## Completion Criteria

The PR exists, contains `Closes #<issue>` when applicable, accurately summarizes
all required sections, and references durable artifacts and real evidence.

## Failure Conditions

Readiness regression, dirty/unintended branch scope, missing GitHub auth/remote,
failed push/PR creation, or mismatch between PR claims and evidence.

## State Transition

`ready-pr` is terminal in V1. Record external PR metadata without inventing a new
stage; if a gate regresses, transition backward through the Orchestrator.

## GitHub Label Transition

Retain `stage:ready-pr`; normal repository automation may close the Issue when
the linked PR merges. Do not mark merge or approval before GitHub reports it.

## Human Escalation Conditions

Escalate branch ownership, release/merge approval, external permission, or an
intentional waiver. PR creation does not imply merge approval.
