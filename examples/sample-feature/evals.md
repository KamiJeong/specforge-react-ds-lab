---
type: SDD Eval Contract
title: Slug Normalizer Sample Eval Contract
description: Observable pre-implementation evaluation for Issue 42.
tags: [sdd, edd, example]
status: draft
sources:
  - {resource: spec.md, title: Sample Specification}
sdd:
  issue: 42
  stage: eval-design
  artifact: eval-contract
  evals: [EVAL-42-001]
---

# Eval Contract

## EVAL-42-001

**Requirements**

- [REQ-42-001](spec.md#req-42-001--normalize-an-ascii-title-into-a-slug)

**Acceptance Criteria**

- [AC-42-001](spec.md#ac-42-001)
- [AC-42-002](spec.md#ac-42-002)

**Purpose:** Prove exact lowercase, separator-collapse, and edge-trim behavior.

**Category:** Integration

**Preconditions**

- A POSIX-compatible `sh`, `tr`, and `sed` are available.

**Evaluation Method:** Execute the isolated script with two fixed behavioral
examples and compare exact output.

**Procedure / Command**

1. Run `examples/sample-feature/implementation/normalize.sh 'Hello, Spec Forge!'`.
2. Run `examples/sample-feature/implementation/normalize.sh '  Already---Slugged  '`.

**Expected Result / Oracle**

- The first output is exactly `hello-spec-forge` plus newline.
- The second output is exactly `already-slugged` plus newline.

**Required Evidence**

- exact commands
- exit codes
- retained combined output
- actual execution timestamp

**Blocking:** true

**Automation Level:** automated
