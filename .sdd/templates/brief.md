---
type: SDD Compact Brief
title: "{{title}} Brief"
description: "Risk-proportional specification, evaluation intent, plan, and tasks for issue {{issue}}."
tags: [sdd, brief]
status: draft
generated:
  by: specforge-architect/v1
  at: "{{generated_at}}"
sources:
  - id: source-intent-{{correlation_id}}
    resource: "{{source_resource}}"
    title: Source intent
sdd:
  issue: {{issue}}
  stage: spec
  profile: "{{profile}}"
  artifact: compact-brief
  requirements: [REQ-{{correlation_id}}-001]
  acceptance_criteria: [AC-{{correlation_id}}-001]
  evals: [EVAL-{{correlation_id}}-001]
  tasks: [TASK-{{correlation_id}}-001]
---

# Compact Brief

## Intent and Outcome

{{intent_and_outcome}}

## Scope and Non-Goals

{{scope_and_non_goals}}

## Profile Decision

- Selected profile: `{{profile}}`
- Eligibility evidence: {{profile_evidence}}
- Full-promotion signals checked: {{promotion_check}}

## Requirements and Acceptance Criteria

### REQ-{{correlation_id}}-001 — {{requirement_title}}

{{required_behavior}}

#### AC-{{correlation_id}}-001

{{observable_criterion}}

## Component Contract

For `component`, record API/props, states, interactions, visual behavior,
keyboard/focus behavior, accessibility semantics, and compatibility. For
`quick`, state why this section is not applicable.

{{component_contract}}

## Eval and Targeted Verification

### EVAL-{{correlation_id}}-001

- Linked AC: AC-{{correlation_id}}-001
- Blocking: {{blocking}}
- Method and command/procedure: {{evaluation_method}}
- Observable oracle: {{observable_oracle}}
- Required evidence: {{required_evidence}}

## Implementation Strategy and Tasks

### TASK-{{correlation_id}}-001

- Links: REQ-{{correlation_id}}-001, AC-{{correlation_id}}-001, EVAL-{{correlation_id}}-001
- Work: {{implementation_work}}
- Completion signal: {{completion_signal}}

## Risks, Assumptions, and Rollback

{{risks_assumptions_rollback}}
