---
type: SDD Compact Delivery
title: "React Design System Foundation Delivery"
description: "Targeted verification, evaluation, review, and residual-risk record for Issue #4."
tags: [sdd, delivery, evidence, component, design-system]
status: draft
generated:
  by: specforge-orchestrator/v1
  at: "2026-08-21T03:01:37Z"
sources:
  - resource: brief.md
    title: "Compact Brief"
  - resource: evidence/manifest.json
    title: "Independent Eval evidence"
sdd:
  issue: 4
  stage: review
  profile: component
  artifact: compact-delivery
---

# Compact Delivery

## Implementation Summary

TASK-4-001 through TASK-4-004 added token-led `Text`, `List`, `Table`,
`Field`, `Label`, `Select`, and checkbox-backed `Switch` primitives to
`@specforge/react-library`. The change includes documented exports, component
tests, Storybook pages/states, package-consumer coverage, browser-story
expectations, and README guidance while retaining the existing Button contract.

## Targeted Verification

Independent Evaluator observation on Bun 1.3.14, Node v24.15.0, Linux WSL2,
against revision `b58b96dbcf77910c4fca60314c9f8d5b72a41e00` with uncommitted
Issue #4 worktree changes.

| Check | Command | Scope | Exit Code | Result | Executed At | Revision |
| --- | --- | --- | ---: | --- | --- | --- |
| typecheck | `bun run typecheck` | changed React library | 0 | PASS | 2026-08-21T02:57:44Z | b58b96d |
| component-tests | `bun run test` | changed React library; 2 files / 19 tests | 0 | PASS | 2026-08-21T02:57:47Z | b58b96d |
| library-build | `bun run build` | changed React library distribution | 0 | PASS | 2026-08-21T02:57:49Z | b58b96d |
| storybook-build | `bun run build-storybook` | primitive and Button stories | 0 | PASS | 2026-08-21T02:57:51Z | b58b96d |
| package-contract | `bun --filter='@specforge/react-library' run test:package-contract` | strict clean consumer | 0 | PASS | 2026-08-21T02:58:00Z | b58b96d |
| storybook-browser | `bun --filter='@specforge/react-library' run test:storybook:browser` | built Storybook / Chromium | 0 | PASS | 2026-08-21T02:58:28Z | b58b96d |

The Storybook build emitted a non-failing chunk-size warning; it did not affect
the command result and no performance budget is specified by the Brief.

## Component Eval Evidence

- EVAL-4-001 — PASS. EVIDENCE-4-001 through EVIDENCE-4-003 independently show
  exported type/build contracts, native semantic rendering, design-prop
  filtering, Field associations, refs, and control behavior.
- EVAL-4-002 — PASS. EVIDENCE-4-006 independently records the Storybook browser
  procedure, including named Switch Space toggling, disabled Select behavior,
  normal focus, and forced-colors focus. The component suite also covers Select
  selection, disabled Switch, and tab-focus behavior.
- EVAL-4-003 — PASS. EVIDENCE-4-004, EVIDENCE-4-005, and EVIDENCE-4-007 record
  the 25-story build/inventory, clean-consumer package imports of every primitive
  and tokens CSS, and the browser documentation check that retains Button
  regression coverage.

All retained metadata is in [the evidence manifest](evidence/manifest.json).

## Independent Review

- Reviewer: `specforge-reviewer/v1` (fresh, read-only context).
- Applicable dimensions: component API consistency, native semantics and states,
  keyboard/focus, accessibility, visual/token contract, documentation, package
  compatibility, regression, and test adequacy.
- P0/P1 open: two P1 findings; remediation is required before readiness.
- P2/P3 residual findings: none.

### FINDING-4-001 — P1 MUST_FIX — Field label association can target the wrong control

`Field` generates a label `htmlFor` value but preserves a supplied child `id`,
so a normal child such as `<input id="email" />` can be unassociated with its
Field label. This violates REQ-4-002 / AC-4-003. Add a coherent ID policy and
regression coverage for caller-supplied control IDs.

### FINDING-4-002 — P1 MUST_FIX — Required Form primitive is absent

REQ-4-002 explicitly includes composable `Form`/`Field`, but the public barrel,
documentation, stories, and package contract expose only `Field`. Add the
required native Form primitive/export and its documentation/test/story coverage
without amending the approved Brief.

### Remediation pending independent confirmation

- FINDING-4-001: `Field` now adopts an explicit child control `id` as the
  association source of truth, including its Label/help/error relationships;
  a regression test covers conflicting Field and child IDs.
- FINDING-4-002: a native, ref-forwarding `Form` has been added with public
  export, documentation, Storybook, component tests, package-consumer coverage,
  and browser-story expectations.

The Fixer ran focused checks successfully (typecheck, 21 component tests,
package contract, Storybook/Chromium check, and whitespace check), but these
observations do not resolve findings until a fresh Verify, Eval, and Review.

### Post-fix independent verification and Evals

A fresh Evaluator repeated all six configured checks at revision `b58b96d` with
the Issue #4 worktree changes: typecheck (03:07:53Z), 21 component tests
(03:08:01Z), library build (03:08:07Z), Storybook build (03:08:14Z), package
contract (03:08:30Z), and Storybook/Chromium browser check (03:08:41Z) all
exited 0. EVAL-4-001 through EVAL-4-003 are PASS again, now supported by
EVIDENCE-4-008 through EVIDENCE-4-014: Field caller-supplied ID association,
native/ref-forwarding Form export, Form docs and clean-consumer imports, and
the existing keyboard/focus/browser contracts were independently observed.

## Residual Risk and Rollback

The remaining risk is a latent interaction, API consistency, or accessibility
issue not represented by automated tests. The change is additive and reversible:
remove the new exports, source/styles, stories, tests, and contract expectations
as one unit; no data migration or persisted state is involved.

## Readiness

BLOCKED on fresh independent Review of the remediation; the subsequent review
gate records the required human decision.

### Second independent review

The fresh reviewer independently resolved FINDING-4-001 and FINDING-4-002:
Field's supplied-child ID association is now coherent, and Form is native,
ref-forwarding, exported, documented, tested, story-covered, and included in
the package contract. The reviewer also reran typecheck and the 21-test suite
successfully.

Two new P1 findings remain:

- FINDING-4-003 — `Select` replaces native `SelectHTMLAttributes.size` with
  design-system `sm`/`md`/`lg` sizing, preventing ordinary native multi-row
  select/listbox semantics despite the native-wrapper contract.
- FINDING-4-004 — Switch has no discoverable focus-visible Storybook state;
  programmatic focus in its browser check is not a documented representative
  story state.

This is the second unsuccessful review iteration. Per the workflow, remediation
cannot continue autonomously; the user authorized one additional scoped fix
loop on 2026-08-21. It must repeat Verify, all blocking Evals, and independent
Review before the findings can be resolved.

### Authorized additional remediation pending independent confirmation

- FINDING-4-003: `Select.size` now accepts native numeric row counts as well as
  design sizes. Numeric values reach the native `size` attribute while retaining
  default token-led presentation; regression tests and README coverage were
  added.
- FINDING-4-004: a `Components/Switch → FocusVisible` story, inventory entry,
  and visible-focus browser assertion were added. Storybook preview now imports
  primitive styles so that state is rendered accurately.

The Fixer observed typecheck, 22 component tests, package contract, Storybook
browser verification, and whitespace checks passing. These findings remain open
until independent Verify, Eval, and Review complete.

### Final post-authorization independent verification and Evals

All six configured component commands passed independently, with 22 tests.
EVIDENCE-4-015 through EVIDENCE-4-021 record the repeated observations:
`Select size={4}` emits native `size="4"` while retaining `data-size="md"`,
and the rendered `components-switch--focus-visible` Chromium story has a
non-`none` focus box shadow. EVAL-4-001, EVAL-4-002, and EVAL-4-003 are PASS.
The two P1 findings remain open only until a final independent review confirms
the remediation.

### Final independent review

The fresh Reviewer resolved FINDING-4-003 and FINDING-4-004, reran typecheck,
all 22 tests, and whitespace checks successfully, and reported no new findings.
Open P0/P1 count is zero.
