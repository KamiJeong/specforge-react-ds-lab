---
type: SDD Task Set
title: "{{title}} Tasks"
description: "Traceable implementation tasks for issue {{issue}}."
tags: [sdd, tasks]
status: draft
generated:
  by: specforge-architect/v1
  at: "{{generated_at}}"
sources:
  - id: implementation-plan-{{correlation_id}}
    resource: plan.md
    title: Implementation Plan
sdd:
  issue: {{issue}}
  stage: tasks
  artifact: task-set
  tasks: [TASK-{{correlation_id}}-001]
---

# Tasks

## TASK-{{correlation_id}}-001 — {{task_title}}

**Status:** pending

**Requirements**

- [REQ-{{correlation_id}}-001](spec.md#req-{{correlation_id}}-001--{{requirement_anchor}})

**Acceptance Criteria**

- [AC-{{correlation_id}}-001](spec.md#ac-{{correlation_id}}-001)

**Evals**

- [EVAL-{{correlation_id}}-001](evals.md#eval-{{correlation_id}}-001)

**Work**

{{work}}

**Completion Signal**

{{completion_signal}}
