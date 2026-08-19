---
type: SDD Convergence
title: "{{title}} Convergence"
description: "Final consistency judgment for issue {{issue}}."
tags: [sdd, convergence]
status: draft
generated:
  by: specforge-architect/v1
  at: "{{generated_at}}"
sources:
  - {resource: spec.md, title: Specification}
  - {resource: evals.md, title: Eval Contract}
  - {resource: tasks.md, title: Tasks}
  - {resource: verification.md, title: Verification}
  - {resource: eval-results.md, title: Eval Results}
  - {resource: review.md, title: Independent Review}
sdd:
  issue: {{issue}}
  stage: converge
  artifact: convergence
---

# Convergence

## Result

{{PASS_FAIL_OR_BLOCKED}}

## Promise-to-Proof Matrix

| Requirement | Task | Implementation | Blocking Eval | Evidence | Review | Result |
| --- | --- | --- | --- | --- | --- | --- |
| REQ-{{correlation_id}}-001 | TASK-{{correlation_id}}-001 | {{implementation_reference}} | EVAL-{{correlation_id}}-001 | EVIDENCE-{{correlation_id}}-001 | {{review_result}} | {{result}} |

## Definition of Done

{{definition_of_done_checklist}}

## Deviations and Temporary Workarounds

{{deviations_or_none}}

## Remaining P2/P3 Findings and Risks

{{remaining_findings_or_none}}
