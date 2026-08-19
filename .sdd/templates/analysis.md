---
type: SDD Analysis
title: "{{title}} Pre-Implementation Analysis"
description: "Read-only consistency and coverage analysis for issue {{issue}}."
tags: [sdd, analysis]
status: draft
generated:
  by: specforge-architect/v1
  at: "{{generated_at}}"
sources:
  - {resource: spec.md, title: Specification}
  - {resource: evals.md, title: Eval Contract}
  - {resource: plan.md, title: Plan}
  - {resource: tasks.md, title: Tasks}
sdd:
  issue: {{issue}}
  stage: analyze
  artifact: analysis
---

# Analysis

## Gate Result

{{PASS_OR_FAIL}}

## Coverage

| Requirement | Acceptance Criteria | Eval | Task | Result |
| --- | --- | --- | --- | --- |
| REQ-{{correlation_id}}-001 | AC-{{correlation_id}}-001 | EVAL-{{correlation_id}}-001 | TASK-{{correlation_id}}-001 | {{result}} |

## Authority Consistency

{{authority_consistency}}

## Findings

{{findings}}

## Required Backward Transitions

{{backward_transitions}}
