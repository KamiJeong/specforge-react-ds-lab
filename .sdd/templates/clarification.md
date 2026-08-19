---
type: SDD Clarification
title: "{{title}} Clarifications"
description: "Decisions, assumptions, and unresolved questions for issue {{issue}}."
tags: [sdd, clarification]
status: draft
generated:
  by: specforge-architect/v1
  at: "{{generated_at}}"
sources:
  - id: specification-{{correlation_id}}
    resource: spec.md
    title: Specification
sdd:
  issue: {{issue}}
  stage: clarify
  artifact: clarification
---

# Clarifications

## AUTO Decisions

### CLARIFICATION-{{correlation_id}}-001

- **Decision:** {{decision}}
- **Reason:** {{reason}}
- **Evidence:** {{evidence}}
- **Impact:** {{impact}}
- **Source:** {{source}}

## MANUAL Decisions

Record the exact question, options, recommendation when appropriate,
consequences, decision owner, and actual decision. Never infer approval.

## Unresolved Questions

{{unresolved_questions}}
