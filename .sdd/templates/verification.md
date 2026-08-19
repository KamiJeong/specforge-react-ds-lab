---
type: SDD Verification
title: "{{title}} Verification"
description: "Mechanical repository health results for issue {{issue}}."
tags: [sdd, verification]
status: draft
generated:
  by: specforge-evaluator/v1
  at: "{{generated_at}}"
sources:
  - {resource: tasks.md, title: Tasks}
sdd:
  issue: {{issue}}
  stage: verify
  artifact: verification
---

# Verification

## Summary

{{PASS_FAIL_OR_BLOCKED}}

## Executed Checks

| Check | Command | Environment | Exit Code | Result | Executed At | Revision |
| --- | --- | --- | ---: | --- | --- | --- |
| {{check_id}} | `{{actual_command}}` | {{environment}} | {{exit_code}} | {{result}} | {{actual_timestamp}} | {{revision}} |

## Failures and Blocks

{{failures_or_none}}

Only include commands that were actually executed. Required failures block Eval.
