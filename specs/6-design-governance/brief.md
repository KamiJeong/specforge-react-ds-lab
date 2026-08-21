---
type: SDD Compact Brief
title: "Design Governance Brief"
description: "Component-profile contract, evaluation design, implementation strategy, and tasks for Issue #6."
tags: [sdd, edd, component, design-system, governance]
status: stable
generated:
  by: specforge-architect/v1
  at: "2026-08-21T07:15:21Z"
sources:
  - id: source-intent-6
    resource: https://github.com/KamiJeong/specforge-react-ds-lab/issues/6
    title: "Issue #6 — Design Governance"
  - id: source-foundation-4
    resource: ../4-react-design-system-foundation/brief.md
    title: "Existing React design-system foundation contract"
  - id: source-verification-6
    resource: .sdd/verification.yaml
    title: "Project verification configuration"
sdd:
  issue: 6
  stage: spec
  profile: component
  artifact: compact-brief
  requirements: [REQ-6-001, REQ-6-002, REQ-6-003]
  acceptance_criteria: [AC-6-001, AC-6-002, AC-6-003, AC-6-004, AC-6-005, AC-6-006, AC-6-007, AC-6-008, AC-6-009]
  evals: [EVAL-6-001, EVAL-6-002, EVAL-6-003, EVAL-6-004]
  tasks: [TASK-6-001, TASK-6-002, TASK-6-003, TASK-6-004]
---

# Compact Brief

## Intent and Outcome

Establish a product-neutral, medium-density design-governance baseline for the
internal `@specforge/react-library`.  It must let developers and AI agents
extend UI consistently without a completed mockup, by treating the existing
tokens and component suite as the source of truth rather than creating a new
visual language.  The deliverable is durable guidance plus a Storybook
reference composition that can be inspected and automatically exercised.

## Scope and Non-Goals

In scope: design-foundation and UI-composition guidance; a reusable Component
Design Contract checklist; explicit anti-generic visual limits and exception
record; a product-neutral representative form or data-reference composition in
Storybook; and focused tests/browser checks for its semantic, keyboard, focus,
and documentation contract.

Out of scope: a Figma/mockup, company branding, a marketing or landing page,
redesigning existing components, a theme/icon/animation system, a new external
UI-library dependency, a new E2E or visual-regression platform, exhaustive prop
matrices, or changes to the documented API or visual behavior of `Button` and
the Issue #4 primitive suite unless separately approved.

## Profile Decision

- Selected profile: `component` (the Issue has exactly one `workflow:component`
  label, and its surface is internal shared design-system documentation and
  Storybook composition).
- Eligibility evidence: the existing library already exposes the token layer
  through `@specforge/react-library/tokens.css`, documented native primitives,
  Vitest component tests, Storybook, and browser verification.
- Full-promotion signals checked: no authentication, authorization, security
  boundary, sensitive data, persistence/migration, cross-service/package
  architecture, externally published API break, or critical performance/cost
  decision is evidenced. The internal component API is not treated as an
  external contract. Promote before implementation if any signal appears or if
  the work requires an unresolved brand, information-architecture, user-flow,
  or accessibility/usability trade-off decision.

## Requirements and Acceptance Criteria

### REQ-6-001 — Publish token-led foundation and composition guidance

The repository shall contain durable guidance that names and defers to the
existing `--sf-*` token layer and the current `Button`, `Text`, `List`, `Table`,
`Form`, `Field`, `Label`, `Select`, and `Switch` components. It shall define
product-neutral visual direction, semantic color use, type hierarchy, 4px
spacing/density, control sizing, radius/border/elevation, surfaces, interaction
states, motion, responsive behavior, and the process for a new visual decision.

#### AC-6-001

`docs/design-foundation.md` (or a clearly linked equivalent) exists and uses
real token and component names from the library; it does not introduce a
separate conflicting token scale.

#### AC-6-002

`docs/ui-composition-rules.md` (or a clearly linked equivalent) defines page
and section hierarchy, action hierarchy, when spacing/borders/sections take
precedence over cards, form label/help/error placement, loading/empty/error/
disabled states, data density for `Table` and `Form`, same-meaning reuse, and a
desktop-first layout that remains usable at narrow widths.

### REQ-6-002 — Make component extension and visual restraint explicit

The repository shall provide a Component Design Contract checklist for new
shared components and clear anti-generic/anti-AI rules. The guidance shall
require a recorded exception only when a prohibited/default-disallowed visual
choice has a stated purpose, user value, and reason existing patterns cannot
satisfy it.

#### AC-6-003

The Component Design Contract requires purpose/use conditions, anatomy, public
API including size/variant, representative default/hover/active/focus/disabled/
loading/error states where applicable, text and icon rules, keyboard/focus and
accessible name, responsive behavior, Do/Don't guidance, and relationships to
existing tokens/components. It explicitly does not require every prop
combination to be documented or tested.

#### AC-6-004

The guidance disallows decorative gradient, glassmorphism, glow, neumorphism,
indiscriminate pill/round styling, nested-card/floating-surface patterns,
meaningless shadows/icons, oversized headings unrelated to information
importance, and landing-page treatment of work screens as defaults; it defines
the documented exception record.

#### AC-6-005

The guidance identifies automatic checks separately from human gates: token and
hard-coded-style checks where feasible, semantic HTML/ARIA, keyboard/focus,
contrast/accessibility checks, Storybook build, and regression checks are
automatable candidates; branding, new information architecture, material user
flows, subjective visual direction, novel interaction, and accessibility versus
usability trade-offs require a human decision. No human decision is requested
unless this implementation encounters one.

### REQ-6-003 — Supply a verifiable representative reference

Storybook shall include one reusable, product-neutral representative composition
using the existing primitives. It shall act as a visual/interaction baseline,
not a product demo, and preserve the existing primitive suite's API and visual
behavior.

#### AC-6-006

The reference story composes existing `Form`/`Field`/`Label`/`Select` and/or
`List`/`Table` with `Text`, `Switch`, and `Button` as appropriate; it contains
no product logic or company branding and exposes a representative loading,
empty, error, or focus-visible state.

#### AC-6-007

Its controls retain native semantic structure, accessible names, keyboard
operation, and visible focus treatment, including the existing forced-colors
focus fallback where an interactive component is represented. Guidance states
WCAG 2.2 AA as the target for applicable user-facing outcomes without claiming
unmeasured conformance.

#### AC-6-008

The reference and documentation are discoverable in Storybook and/or linked
repository docs, build successfully, and are covered by targeted component and
browser-observed checks.

#### AC-6-009

Existing `Button` and Issue #4 primitive exports, documented APIs, and baseline
visual behavior remain unchanged except for additive reference/documentation
work required by this Brief.

## Component Contract

This change adds governance and a composed reference; it does not introduce a
new runtime component API. The contract below constrains the documentation and
story surface.

| Surface | Contract |
| --- | --- |
| Source of truth | Use `tokens.css` custom properties prefixed `--sf-` and existing exported primitives. New visual decisions first reuse these tokens/patterns; a needed extension follows the documented decision process. |
| Representative composition | A product-neutral, medium-density configuration/reference view using existing native-backed primitives. It demonstrates hierarchy, one primary action, supporting actions only when meaningful, form or data density, and an applicable state without adding persistence or submission policy. |
| States and interactions | Show the composition's normal state and at least one applicable loading, empty, error, or focus-visible state. Existing `Button` loading/disabled behavior, `Select` native selection, and `Switch` keyboard behavior are reused rather than reimplemented. |
| Visual behavior | Spacing uses the existing 4px token cadence (`--sf-space-1` through `--sf-space-4`); control sizes, color roles, border/radius, surfaces, and focus ring remain token-led. Decorative treatments listed in AC-6-004 are not defaults. |
| Keyboard and focus | Interactive controls retain native tab/keyboard behavior, accessible names, `:focus-visible` indication, and forced-colors fallback already provided by the primitives. |
| Accessibility and compatibility | Preserve semantic HTML and existing label/help/error associations. The composition adds no runtime API or package export and must not break existing `Button`/primitive imports, styles, or stories. |

## Eval and Targeted Verification

`analysis_status` and `convergence_status` are not applicable for this selected
component profile. Every Eval below is blocking. Required command results and
browser observations are future evidence to record in the delivery artifact and
`evidence/manifest.json`; this Brief claims no execution result.

### EVAL-6-001 — Governance source-of-truth contract

- Links: REQ-6-001, REQ-6-002; AC-6-001 through AC-6-005.
- Blocking: true. Method: focused automated documentation/content test plus
  reviewer-readable inspection of the persisted guidance.
- Observable oracle: the named guidance is present, references only real
  `--sf-*` tokens and current exports, includes all foundation/composition,
  contract, restraint/exception, and automatic-versus-human-boundary rules, and
  never represents a human-gated choice as automatically decided.
- Required evidence: focused test command/output and exit code; the exact docs
  paths and relevant test names/assertions; revision and observation time in
  the delivery/evidence manifest.

### EVAL-6-002 — Representative composition semantic and state contract

- Links: REQ-6-003; AC-6-006, AC-6-007, AC-6-009.
- Blocking: true. Method: Vitest + Testing Library tests of the story/rendered
  composition, including user-event keyboard interaction where a `Switch`,
  `Select`, or `Button` is present.
- Observable oracle: the composition renders existing primitives with semantic
  roles and accessible names; its selected representative state is visible;
  enabled controls remain keyboard-operable; and no existing primitive API or
  behavior changes are required.
- Required evidence: exact `bun run test` output and exit code, test names and
  assertions, story identifier, revision, and observation time.

### EVAL-6-003 — Storybook discoverability, focus, and browser contract

- Links: REQ-6-003; AC-6-007, AC-6-008, AC-6-009.
- Blocking: true. Method: `bun run build-storybook` and the configured
  `bun --filter='@specforge/react-library' run test:storybook:browser` check,
  extended only as needed to require the new reference story.
- Observable oracle: Storybook contains the reference entry and its
  documentation, renders it in a browser, exposes the expected named controls
  and semantic state, and observes visible normal/forced-colors focus behavior
  for an applicable interactive control without regressing existing stories.
- Required evidence: both exact command outputs and exit codes, required story
  IDs/browser assertions, revision, and observation time.

### EVAL-6-004 — Targeted package regression contract

- Links: REQ-6-001, REQ-6-003; AC-6-001, AC-6-008, AC-6-009.
- Blocking: true. Method: project-configured targeted verification:
  `bun run typecheck`, `bun run test`, `bun run build`,
  `bun run build-storybook`, `bun --filter='@specforge/react-library' run
  test:package-contract`, and `bun --filter='@specforge/react-library' run
  test:storybook:browser`.
- Observable oracle: the package remains type-correct, tests/builds, retains
  its internal distributable import contract, and renders the required
  Storybook baseline; failures block progression.
- Required evidence: each command's literal command, exit code, output
  location, revision, and actual observation time.

## Implementation Strategy and Tasks

### TASK-6-001

- Links: REQ-6-001; AC-6-001, AC-6-002; EVAL-6-001, EVAL-6-004.
- Work: add the linked durable foundation and composition guidance, deriving
  every token/component reference from the existing library; include the visual
  decision/extension process and WCAG 2.2 AA direction.
- Completion signal: the source-of-truth content test and targeted verification
  can locate correct names and required guidance.

### TASK-6-002

- Links: REQ-6-002; AC-6-003, AC-6-004, AC-6-005; EVAL-6-001.
- Work: add a reusable Component Design Contract checklist and anti-generic
  rules with a bounded exception record and explicit automatic-versus-human
  review boundary.
- Completion signal: focused checks assert every mandatory checklist and
  governance section; no brand or information-architecture decision is implied.

### TASK-6-003

- Links: REQ-6-003; AC-6-006, AC-6-007, AC-6-008; EVAL-6-002, EVAL-6-003.
- Work: create an additive Storybook reference composition and its focused
  tests; extend the existing browser verifier with its stable story identifier
  and observable semantic/state/focus assertions.
- Completion signal: the reference is discoverable, browser-rendered, and
  keyboard/focus/semantic assertions pass when evaluated.

### TASK-6-004

- Links: REQ-6-003; AC-6-008, AC-6-009; EVAL-6-002, EVAL-6-003, EVAL-6-004.
- Work: preserve current primitive exports, Storybook entries, package contract,
  and styles while adding only required documentation/reference coverage.
- Completion signal: every configured targeted verification and blocking Eval
  produces retained PASS evidence with no required API or visual redesign.

## Risks, Assumptions, and Rollback

The main risk is turning governance into an ungrounded second design system or
mistaking subjective product choices for implementation decisions. Mitigate it
by anchoring all rules to `tokens.css` and current primitives, keeping the
reference product-neutral, and routing brand, information-architecture, novel
interaction, and accessibility/usability trade-offs to the documented human
gate. This gate is not currently open: Issue #6 requests a reusable baseline,
not a particular product decision.

The existing state records the material assumption that this is an internal,
product-neutral governance addition rather than an externally published API or
branding commitment. If implementation requires a new token family, alters an
existing component contract, creates a consumer-facing public contract, or
needs an unresolved human-gated decision, stop and promote to `full` rather
than deciding it in implementation.

The work is additive and reversible: remove the new guidance, reference story,
tests, and browser-verifier expectations together. It creates no persisted data
or migration and does not require a dependency rollback.
