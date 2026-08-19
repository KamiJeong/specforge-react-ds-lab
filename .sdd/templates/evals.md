---
type: SDD Eval Contract
title: "{{title}} Eval Contract"
description: "Pre-implementation evaluation contract for issue {{issue}}."
tags: [sdd, edd, evaluation]
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
  stage: eval-design
  artifact: eval-contract
  evals: [EVAL-{{correlation_id}}-001]
---

# Eval Contract

## EVAL-{{correlation_id}}-001

**Requirements**

- [REQ-{{correlation_id}}-001](spec.md#req-{{correlation_id}}-001--{{requirement_anchor}})

**Acceptance Criteria**

- [AC-{{correlation_id}}-001](spec.md#ac-{{correlation_id}}-001)

**Purpose:** {{purpose}}

**Category:** {{category}}

**Preconditions**

- {{precondition}}

**Evaluation Method:** {{method}}

**Procedure / Command**

1. {{procedure}}

**Expected Result / Oracle**

- {{observable_oracle}}

**Required Evidence**

- executed command or procedure
- exit code or observed result
- retained output or artifact metadata when applicable

**Blocking:** true

**Automation Level:** {{automation_level}}

## Contract Change Log

After implementation begins, record reason, affected requirement, old and new
expectations, and decision owner for every material change.
