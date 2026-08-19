---
type: SDD Eval Result
title: "{{title}} Eval Results"
description: "Observed results against the Eval Contract for issue {{issue}}."
tags: [sdd, edd, evaluation, evidence]
status: draft
generated:
  by: specforge-evaluator/v1
  at: "{{generated_at}}"
sources:
  - {resource: evals.md, title: Eval Contract}
  - {resource: verification.md, title: Verification}
sdd:
  issue: {{issue}}
  stage: eval
  artifact: eval-result
---

# Eval Results

## EVAL-{{correlation_id}}-001 — {{PASS_FAIL_BLOCKED_OR_NOT_APPLICABLE}}

- **Evaluated by:** specforge-evaluator/v1
- **Evaluated at:** {{actual_timestamp}}
- **Evidence:** [EVIDENCE-{{correlation_id}}-001](evidence/manifest.json)
- **Observed result:** {{observed_result}}
- **Oracle comparison:** {{oracle_comparison}}
- **Explanation if BLOCKED or NOT_APPLICABLE:** {{explanation_or_none}}

PASS requires sufficient observable evidence; an Implementer assertion is not
evidence.
