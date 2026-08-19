---
type: SDD Specification
title: "{{title}} Specification"
description: "Expected behavior and acceptance criteria for issue {{issue}}."
tags: [sdd, specification]
status: draft
generated:
  by: specforge-architect/v1
  at: "{{generated_at}}"
sources:
  - id: normalized-issue-{{correlation_id}}
    resource: issue.md
    title: Normalized issue intent
sdd:
  issue: {{issue}}
  stage: spec
  artifact: specification
  requirements: [REQ-{{correlation_id}}-001]
  acceptance_criteria: [AC-{{correlation_id}}-001]
---

# Specification

## Purpose

{{purpose}}

## Scope

{{scope}}

## Requirements

### REQ-{{correlation_id}}-001 — {{requirement_title}}

{{required_behavior}}

#### Acceptance Criteria

##### AC-{{correlation_id}}-001

{{observable_criterion}}

## Constraints

{{constraints}}

## Non-Goals

{{non_goals}}

## Open Questions

{{open_questions}}
