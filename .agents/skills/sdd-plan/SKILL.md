---
name: sdd-plan
description: Create a framework-neutral implementation strategy that satisfies the Specification and can execute the approved Eval Contract.
---

# SDD Plan

## Purpose

Translate approved behavior and evaluation obligations into a coherent technical
strategy without writing implementation.

## Trigger

The workflow is at `plan`, or implementation/analysis exposes an architecture
conflict owned by planning.

## Inputs

Constitution, Specification, clarifications, Eval Contract, repository impact
evidence, and existing architecture.

## Required Artifacts

`.sdd/templates/plan.md`; persist `plan.md` and update the feature index.

## Preconditions

Spec and Eval Design gates are approved.

## Procedure

Describe implementation strategy, architecture and repository impact, dependency
impact, data/migration impact, Eval execution strategy, risks/mitigations, and
rollback. Identify affected areas and sequencing while retaining flexibility for
reversible local choices.

## Recommended Agent

`architect`, supported by `explorer` for impact analysis.

## Allowed Actions

Choose evidence-backed technical approaches within approved behavior and document
alternatives that materially affect risk.

## Forbidden Actions

Do not change requirements, design solely to game Eval fixtures, or make gated
security/data/API/migration decisions without approval.

## Outputs

OKF-conformant `plan.md` with executable strategy and explicit risks.

## Completion Criteria

The strategy covers all requirements and Eval execution, fits repository
architecture, and identifies rollback or explains why it is not applicable.

## Failure Conditions

Architecture contradiction, unknown critical dependency, unsafe migration,
unresolved high-impact tradeoff, or mismatch with the Eval Contract.

## State Transition

Move to `tasks` on success; route to `clarify`, `spec`, or `eval-design` when the
conflict belongs there.

## GitHub Label Transition

After state persistence, project `stage:tasks` or the persisted backward stage.

## Human Escalation Conditions

Escalate public contracts, irreversible architecture/migrations, security/data
boundaries, or significant infrastructure cost choices.
