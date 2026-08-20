---
type: SDD Compact Delivery
title: "{{title}} Delivery"
description: "Targeted verification, evaluation, review, and residual-risk record for issue {{issue}}."
tags: [sdd, delivery, evidence]
status: draft
generated:
  by: specforge-orchestrator/v1
  at: "{{generated_at}}"
sources:
  - {resource: brief.md, title: Compact Brief}
sdd:
  issue: {{issue}}
  stage: review
  profile: "{{profile}}"
  artifact: compact-delivery
---

# Compact Delivery

## Implementation Summary

{{implementation_summary}}

## Targeted Verification

| Check | Command | Scope | Exit Code | Result | Executed At | Revision |
| --- | --- | --- | ---: | --- | --- | --- |
| {{check_id}} | `{{actual_command}}` | {{targeted_scope}} | {{exit_code}} | {{result}} | {{actual_timestamp}} | {{revision}} |

Only include commands that actually ran. Missing required observation is
`BLOCKED`, not PASS.

## Component Eval Evidence

For `component`, list each blocking Eval, observed oracle, result, and Evidence
ID/path. For `quick`, record `NOT_APPLICABLE` and the profile reason.

{{eval_evidence}}

## Independent Review

- Reviewer: {{reviewer_actor}}
- Applicable dimensions: {{review_dimensions}}
- P0/P1 open: {{blocking_findings}}
- P2/P3 residual findings: {{advisory_findings}}

## Residual Risk and Rollback

{{residual_risk_and_rollback}}

## Readiness

{{READY_OR_BLOCKED}}
