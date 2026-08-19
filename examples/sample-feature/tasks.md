---
type: SDD Task Set
title: Slug Normalizer Sample Tasks
description: Traceable implementation work for the isolated Issue 42 example.
tags: [sdd, example, tasks]
status: draft
sources:
  - {resource: plan.md, title: Sample Plan}
sdd:
  issue: 42
  stage: tasks
  artifact: task-set
  tasks: [TASK-42-001]
---

# Tasks

## TASK-42-001 — Implement and exercise the isolated normalizer

**Status:** complete

**Requirements**

- [REQ-42-001](spec.md#req-42-001--normalize-an-ascii-title-into-a-slug)

**Acceptance Criteria**

- [AC-42-001](spec.md#ac-42-001)
- [AC-42-002](spec.md#ac-42-002)

**Evals**

- [EVAL-42-001](evals.md#eval-42-001)

**Work**

Add the isolated script, run shell syntax verification, execute both oracle
cases, and retain honest output metadata.

**Completion Signal**

The actual verification and Eval records contain successful exit codes and exact
expected output.
