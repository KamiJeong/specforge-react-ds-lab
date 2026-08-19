---
type: SDD Code Review
title: "{{title}} Independent Code Review"
description: "Independent review findings for issue {{issue}}."
tags: [sdd, review]
status: draft
generated:
  by: specforge-reviewer/v1
  at: "{{generated_at}}"
sources:
  - {resource: spec.md, title: Specification}
  - {resource: evals.md, title: Eval Contract}
  - {resource: verification.md, title: Verification}
  - {resource: eval-results.md, title: Eval Results}
sdd:
  issue: {{issue}}
  stage: review
  artifact: code-review
  iteration: {{review_iteration}}
---

# Independent Code Review

## Result

{{PASS_OR_CHANGES_REQUIRED}}

## Scope Reviewed

{{scope}}

## Findings

### FINDING-{{correlation_id}}-001 — {{finding_title}}

- **Severity:** {{P0_P1_P2_OR_P3}}
- **Class:** {{BLOCKER_MUST_FIX_SHOULD_FIX_OR_OPTIONAL}}
- **Status:** {{open_or_resolved}}
- **Evidence:** {{concrete_evidence}}
- **Affected requirements:** {{requirement_ids}}
- **Required action:** {{required_action}}

## Residual Risks

{{residual_risks}}
