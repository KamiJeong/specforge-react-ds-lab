---
name: sdd-knowledge-validate
description: Perform read-only OKF v0.2 structure, metadata, index, link, actor, and traceability validation for SpecForge knowledge artifacts.
---

# SDD Knowledge Validate

## Purpose

Protect the discoverability and structural integrity of the `specs/` OKF v0.2
Knowledge Bundle without judging runtime correctness.

## Trigger

After major artifact generation, during Analyze when useful, before Convergence,
and before PR.

## Inputs

`specs/index.md`, relevant feature index and concepts, `.sdd/templates/`, and
stable REQ/AC/EVAL/TASK/EVIDENCE/FINDING references.

## Required Artifacts

Read existing knowledge only. Use `scripts/sdd/validate.py` when available; do
not create a success artifact unless the owning stage requires one.

## Preconditions

The target bundle or feature directory exists.

## Procedure

Read bundle index then feature index. Check UTF-8, parseable YAML frontmatter on
non-reserved concept Markdown, non-empty `type`, bundle root `okf_version: "0.2"`,
reserved `index.md` rules, lifecycle status, structured `generated`/`verified`,
`sources[].resource`, actor conventions, meaningful feature index links, and
resolvable traceability links where practical. Report temporarily unresolved
links distinctly from malformed bundle structure.

## Recommended Agent

`utility` for mechanical checks; `architect` adjudicates semantic traceability.

## Allowed Actions

Read files, run non-mutating validators, and report exact paths and defects.

## Forbidden Actions

Do not mutate concepts, mark generated work independently verified, fabricate
sources, or treat OKF verification as Eval Evidence.

## Outputs

A pass/fail report with structural errors, link warnings, and traceability gaps.

## Completion Criteria

All blocking OKF checks pass; warnings are explicit and do not hide malformed
metadata or broken required traceability.

## Failure Conditions

Invalid frontmatter, missing type, invalid root/index rules, invalid lifecycle or
actor metadata, missing source resource, or required traceability failure.

## State Transition

This is a checkpoint and does not change `current_stage`. A blocking failure
prevents the owning stage's forward transition.

## GitHub Label Transition

None directly. Retain the owning `stage:*`; add `state:blocked` only after the
Orchestrator persists a blocking result.

## Human Escalation Conditions

Escalate only when repair changes semantic meaning or provenance; mechanical
format defects do not require human approval.
