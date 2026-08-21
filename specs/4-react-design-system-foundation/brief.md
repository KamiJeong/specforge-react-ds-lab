---
type: SDD Compact Brief
title: "React Design System Foundation Brief"
description: "Component-profile contract, evaluation design, implementation strategy, and tasks for Issue #4."
tags: [sdd, edd, component, design-system, primitives]
status: stable
generated:
  by: specforge-architect/v1
  at: "2026-08-21T01:36:16Z"
sources:
  - id: source-intent-4
    resource: https://github.com/KamiJeong/specforge-react-ds-lab/issues/4
    title: "Issue #4 — React Design System Foundation"
  - id: source-foundation-1
    resource: ../1-react-design-system-foundation-button/brief.md
    title: "Existing Button foundation contract"
  - id: source-verification-4
    resource: .sdd/verification.yaml
    title: "Project verification configuration"
sdd:
  issue: 4
  stage: spec
  profile: component
  artifact: compact-brief
  requirements: [REQ-4-001, REQ-4-002, REQ-4-003]
  acceptance_criteria: [AC-4-001, AC-4-002, AC-4-003, AC-4-004, AC-4-005, AC-4-006]
  evals: [EVAL-4-001, EVAL-4-002, EVAL-4-003]
  tasks: [TASK-4-001, TASK-4-002, TASK-4-003, TASK-4-004]
---

# Compact Brief

## Intent and Outcome

Extend the existing internal React design-system library with a cohesive set of
basic, reusable primitives: typography (`Text`), semantic lists (`List`), data
tables (`Table`), field composition (`Form`/`Field`), `Label`, `Switch`, and
`Select`. They must reuse the established token-led visual language and match
the Button baseline's product-neutral, medium-density style. Every primitive
must have practical Storybook documentation, automated tests, and observable
accessibility coverage.

## Scope and Non-Goals

In scope: the named components, their documented TypeScript APIs, semantic HTML
defaults, controlled/uncontrolled state where native controls need it, token-led
styles, exports, component tests, and Storybook stories for supported states.

Out of scope: a complete theme system, Figma integration, public npm publishing,
product-specific form validation/submission, persistence, complex animation,
icon system, brand identity, marketing UI, gradients, glassmorphism, and
neumorphism. Unnamed HTML elements are not implied scope.

## Profile Decision

- Selected profile: `component` (the explicit `workflow:component` Issue label).
- Eligibility evidence: this is an internal extension of the existing private
  single-package React library; the repository already has token, test, browser,
  and Storybook verification infrastructure.
- Full-promotion signals checked: no authentication, authorization, security
  boundary, sensitive data, schema/migration, cross-service/package boundary,
  external published API, or critical performance/cost decision is evidenced.
  Promote before implementation if any appears.

## Requirements and Acceptance Criteria

### REQ-4-001 — Provide token-consistent content and structure primitives

The library shall export `Text`, `List`, and `Table` primitives that render
semantic native HTML by default and consume the shared token layer rather than
product-specific styles.

#### AC-4-001

`Text` supports documented semantic text presentation without losing a native
element's attributes; `List` renders ordered or unordered lists and `Table`
renders native table structure with accessible captions and headers when given.

#### AC-4-002

Typography, spacing, borders, surface, and focus-related presentation resolve
through shared tokens or documented component variables, preserving the existing
Button visual language without changing Button behavior.

### REQ-4-002 — Provide accessible field and selection controls

The library shall export composable `Form`/`Field`, `Label`, `Select`, and
`Switch` primitives with stable native-control behavior and explicit accessible
name/description/error wiring.

#### AC-4-003

`Label` associates with its control; `Field` can connect label, help, and error
text through native `id`, `htmlFor`, and ARIA description/error relationships
without imposing validation or submission policy.

#### AC-4-004

`Select` is a native `<select>` wrapper that supports ordinary select props,
options/children, disabled state, and visible keyboard focus. `Switch` uses a
native checkbox with `role="switch"`, supports controlled and uncontrolled
checked state, forwards its ref, exposes its name, and cannot change when
disabled.

### REQ-4-003 — Make the primitive suite inspectable and verifiable

Every supported component state shall be documented in Storybook and covered by
component-focused automated checks plus the blocking Evals below.

#### AC-4-005

Storybook provides discoverable pages and representative default, variant,
disabled, error, selected/checked, and focus-visible states relevant to each
primitive; each story has a readable accessible name where it includes a
control.

#### AC-4-006

The package typechecks, tests, builds, passes its distributable contract check,
and passes browser-observed Storybook checks after the new primitives are added.

## Component Contract

| Component | API and semantic contract | States / accessibility contract |
| --- | --- | --- |
| `Text` | `as` supports `p`, `span`, and headings; `size`, `weight`, and tone are limited documented token-led choices. | Uses the selected native element; no faux heading semantics. |
| `List` | `ordered` selects `<ol>` or `<ul>`; callers supply `<li>` children. | Native list semantics are retained. |
| `Table` | Composes native table elements and accepts a caption. | Column headers use `<th scope="col">`; caption describes the table. |
| `Field` / `Label` | `Field` provides stable IDs for label, help, and error; `Label` accepts `htmlFor`. | Help/error text is programmatically associated with its control; no validation policy. |
| `Select` | Native select attributes plus token-led size/tone presentation. | Native keyboard selection, disabled behavior, label association, and visible focus remain intact. |
| `Switch` | Checkbox-backed `checked`/`defaultChecked`, `onCheckedChange`, `disabled`, and label/name props. | Native checkbox with `role="switch"`; Space toggles enabled state, disabled is noninteractive, and focus is visible. |

No component may leak design-system-only props onto the DOM. The implementation
may refine exact prop names only if it preserves this contract and adds matching
tests and stories; a material change requires a Brief amendment.

## Eval and Targeted Verification

`analysis_status` and `convergence_status` are not applicable to this component
profile. The following Evals are blocking and use the already configured
component verification commands.

### EVAL-4-001 — Exported semantic primitive contract

- Links: REQ-4-001, REQ-4-002; AC-4-001 through AC-4-004.
- Blocking: true. Method: Vitest + Testing Library component tests and package
  typecheck/build/contract commands.
- Oracle: all documented exports resolve; each component renders its native
  semantic element; design-only props do not appear as invalid DOM attributes;
  label/help/error associations and native control/ref behavior are observed.
- Required evidence: exact command output and exit codes plus retained test
  names/assertions in the delivery and evidence manifest.

### EVAL-4-002 — Keyboard, focus, and assistive contract

- Links: REQ-4-002; AC-4-003, AC-4-004.
- Blocking: true. Method: automated user-event tests and browser-observed
  Storybook checks.
- Oracle: enabled controls receive keyboard focus and operate with native
  semantics; Switch toggles with Space, Select follows native keyboard behavior,
  disabled controls are inert, and all interactive stories expose names and
  visible focus treatment.
- Required evidence: test/browser observation output, timestamps, revision, and
  the story identifiers inspected.

### EVAL-4-003 — Documentation and distributable regression contract

- Links: REQ-4-003; AC-4-005, AC-4-006.
- Blocking: true. Method: build Storybook, run browser check, and run package
  contract verification.
- Oracle: stories build and the existing Button contract remains valid; the
  published internal package includes new entry points/styles needed by its
  documented imports.
- Required evidence: exact commands, exit codes, built story/package output,
  and manifest references.

## Implementation Strategy and Tasks

### TASK-4-001

- Links: REQ-4-001, AC-4-001, AC-4-002, EVAL-4-001.
- Work: extend shared semantic tokens only where needed; implement and export
  token-led `Text`, `List`, and `Table` with focused tests and stories.
- Completion signal: semantic rendering and token-backed style assertions pass.

### TASK-4-002

- Links: REQ-4-002, AC-4-003, EVAL-4-001, EVAL-4-002.
- Work: implement and export `Field`, `Label`, and `Select`, including stable
  association IDs and native select behavior; add tests and stories.
- Completion signal: association, ref/native attributes, disabled, and keyboard
  coverage pass.

### TASK-4-003

- Links: REQ-4-002, AC-4-004, EVAL-4-001, EVAL-4-002.
- Work: implement and export a checkbox-backed `Switch`; add controlled,
  uncontrolled, disabled, ref, accessible-name, keyboard, and story coverage.
- Completion signal: all documented Switch states and interactions pass.

### TASK-4-004

- Links: REQ-4-003, AC-4-005, AC-4-006, EVAL-4-003.
- Work: update package documentation, Storybook/browser expectations, exports,
  and package-contract coverage for the suite while retaining Button behavior.
- Completion signal: targeted configured verification and every blocking Eval
  pass with recorded evidence.

## Risks, Assumptions, and Rollback

The main risk is semantic or accessibility regression from wrappers around
native elements. Minimize it by preserving native elements, testing emitted DOM
and keyboard behavior, and running the existing browser/package checks. The
component set is additive and reversible: remove the new exports, styles,
stories, and tests as one change if a downstream issue appears; no migration or
persisted data is involved. Assumptions are recorded in `state.json`.
