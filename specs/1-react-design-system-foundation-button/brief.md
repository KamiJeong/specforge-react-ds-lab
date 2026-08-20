---
type: SDD Compact Brief
title: React Design System Foundation and Button Brief
description: Component-profile behavioral contract, evaluation design, implementation strategy, and tasks for Issue 1.
tags: [sdd, edd, component, design-system, button]
status: stable
generated:
  by: specforge-architect/v1
  at: "2026-08-20T07:56:19Z"
sources:
  - id: source-intent-1
    resource: https://github.com/KamiJeong/specforge-react-ds-lab/issues/1
    title: "Issue #1 — React Design System Foundation and Button"
  - id: source-repository-1
    resource: .sdd/verification.yaml
    title: Project verification configuration at Brief creation
sdd:
  issue: 1
  stage: spec
  profile: component
  artifact: compact-brief
  requirements: [REQ-1-001, REQ-1-002, REQ-1-003]
  acceptance_criteria: [AC-1-001, AC-1-002, AC-1-003, AC-1-004, AC-1-005, AC-1-006, AC-1-007, AC-1-008]
  evals: [EVAL-1-001, EVAL-1-002, EVAL-1-003, EVAL-1-004]
  tasks: [TASK-1-001, TASK-1-002, TASK-1-003, TASK-1-004]
---

# Compact Brief

## Intent and Outcome

Create the minimum reusable, product-neutral React design-system foundation and
one reference `Button` component for Issue #1. The reference component must
establish a repeatable structure for tokens, component API, styling, tests,
accessibility, and Storybook documentation without introducing a dependency on
an external UI component library.

The intended visual language is clear, modern, minimal, and medium density:
semantic information and controls take priority over decoration. It may take
inspiration from the cited products' restraint, but must not reproduce their
brand, assets, or exact visual design.

## Scope and Non-Goals

In scope:

- a React + TypeScript library-oriented workspace foundation using the
  repository's Bun-based monorepo constraint;
- product-neutral, semantic design tokens consumed by `Button` rather than
  component-owned hard-coded presentation values;
- one importable `Button` reference component with documented API, states,
  accessibility behavior, automated behavior/accessibility tests, and Storybook
  stories; and
- Storybook configuration/documentation sufficient to inspect the component and
  its states, with its available MCP integration enabled or documented according
  to the installed Storybook tooling.

Out of scope: Input, Select, Modal, a complete theme system, Figma integration,
public npm publishing, a complete icon or animation system, product branding,
marketing UI, glassmorphism, neumorphism, and strong-gradient styling.

## Profile Decision

- Selected profile: `component`.
- Eligibility evidence: Issue #1 is bounded to a shared React design-system
  foundation and one internal reference component. The workflow explicitly
  identifies ordinary shared design-system components as `component` work; no
  existing published package, cross-service boundary, persistence, sensitive
  data, authentication/authorization, or security boundary is evidenced.
- Full-promotion signals checked: none is currently evidenced. In particular,
  a library shape and internal component props are not treated as an externally
  published or relied-upon API. Promote before implementation if a public API
  compatibility commitment, cross-package/service architecture change, security
  boundary, sensitive-data handling, irreversible migration, critical
  performance budget/cost, or unresolved product semantics emerges.

## Requirements and Acceptance Criteria

### REQ-1-001 — Establish a reusable token-led component foundation

The delivered workspace shall provide a library-oriented React + TypeScript
foundation where semantic tokens express at least color roles, spacing, radius,
typography, focus treatment, and control sizing. `Button` presentation must
consume those tokens or token-derived component variables, so a later component
can follow the same structure without relying on a product-specific theme.

#### AC-1-001

The source exposes a documented token entry point and a documented `Button`
entry point suitable for import by another React project; their actual package
and file paths are recorded in `delivery.md` after implementation.

#### AC-1-002

The rendered Button's color, spacing, typography, radius, sizing, and visible
focus treatment resolve through the token layer or explicitly documented
token-derived component variables; it has no required dependency on an external
UI component library.

### REQ-1-002 — Provide an accessible, predictable Button reference component

The library shall provide a semantic native-button reference component whose
variants, sizes, states, interaction rules, and disabled behavior are stable
enough to guide subsequent components.

#### AC-1-003

`Button` renders a native `<button>` by default, forwards its React ref, accepts
the standard native button attributes needed for ordinary use, and accepts the
documented design-system props without leaking them as invalid DOM attributes.

#### AC-1-004

The component supports `primary`, `secondary`, and `ghost` variants and `sm`,
`md`, and `lg` sizes, with `md` as the default. Each combination preserves a
recognizable label and control boundary at the selected medium density.

#### AC-1-005

Default, hover, active, keyboard focus-visible, disabled, and pending/loading
states are visually distinguishable. Disabled and pending controls cannot be
activated; pending exposes a programmatic busy state while retaining an
accessible name. Hover and active are enhancements, not the sole indication of
state.

#### AC-1-006

Keyboard users can Tab to an enabled Button, perceive a visible focus indicator
that is not removed by component styling, activate it with native keyboard
behavior, and do not receive disabled Buttons in the tab order. The component
uses semantic button behavior rather than recreating button keyboard handling
on a non-button element.

#### AC-1-007

The default component has an accessible name from its visible label or an
explicit accessible-name attribute. An icon-only invocation requires an
explicit accessible name. Decorative icons, if supported, are hidden from the
accessibility tree; loading affordance does not replace the control's name.

### REQ-1-003 — Make the reference implementation inspectable and verifiable

The component shall document its intended use and all supported visual and
interactive states in Storybook, and it shall be covered by component-focused
automated checks and independent blocking Evals defined below.

#### AC-1-008

Storybook contains a discoverable Button documentation page with examples for
all variants, all sizes, disabled, pending/loading, keyboard focus-visible, and
icon-only named usage. The final delivery records the actual Storybook command
and the available MCP integration/configuration used, if supported by the
installed version.

## Component Contract

### API

The implementation exports `Button` and its public TypeScript prop type from
the library's documented component entry point. It is a `forwardRef` wrapper of
a native button and is compatible with ordinary native button attributes,
including `type`, `onClick`, `disabled`, `aria-*`, and `data-*` attributes.

Design-system props are:

| Prop | Type / default | Contract |
| --- | --- | --- |
| `variant` | `primary \| secondary \| ghost`; `primary` | Chooses semantic visual emphasis only. |
| `size` | `sm \| md \| lg`; `md` | Chooses token-derived control dimensions and text spacing. |
| `loading` | boolean; `false` | Shows a non-decorative pending affordance, sets `aria-busy=\"true\"`, retains the accessible name, and prevents activation. |
| `children` | React node | Supplies the visible label/content. Icon-only use must also provide an accessible name. |

The component may support leading/trailing icon slots only when they remain
presentational and preserve the above accessible-name rule. It must not require
an icon library or accept product-specific behavior. Any extra public props need
tests, Storybook coverage, and a Brief amendment before use.

### States, interaction, and visual behavior

- Enabled default, hover, and active states provide a clear, token-derived
  emphasis change without gradients, heavy shadows, or brand-specific assets.
- Focus-visible has a high-contrast, token-derived ring/outline that remains
  visible against each variant and does not rely solely on a color change.
- `disabled` uses the native `disabled` attribute, has a distinct muted visual,
  suppresses click activation, and is removed from sequential keyboard focus.
- `loading`/pending disables activation for the duration, conveys busy state to
  assistive technology, keeps the existing label/name available, and avoids a
  layout-breaking content jump. It is not a second submission path.
- Size differences change padding/gap/type/control height coherently via tokens;
  they must not produce clipped labels or overlap at narrow available widths.
- Button content may wrap or truncate only through a documented implementation
  decision; it must remain legible and keep the accessible name intact. The
  component itself shall not impose a desktop-only fixed page layout.

### Accessibility and compatibility

Use native semantics first. Do not add redundant `role=\"button\"`, custom
Space/Enter handlers, or ARIA that contradicts native disabled behavior.
Respect browser/user focus preferences and avoid a required motion effect;
any optional state transition respects `prefers-reduced-motion`.

Compatibility means supported usage in a current React + TypeScript consumer
using the chosen build tooling, ordinary browser-native button behavior, and
server-render-safe initial markup if the chosen setup supports server rendering.
No browser-version matrix or published semver compatibility promise is asserted
by this Issue. Exact supported React, TypeScript, Storybook, and test-tool
versions are implementation dependency decisions and must be recorded, with
their justification, in `delivery.md` rather than assumed here.

## Eval and Targeted Verification

`analysis_status` and `convergence_status` are not applicable for the component
profile. At Brief creation the repository has no application workspace and
`.sdd/verification.yaml` declares no executable commands. Accordingly, no
command is pre-claimed as passing. The Implementer must add only justified
project-native scripts/configuration; the Evaluator must record the exact
commands, exit codes, revision, and actual timestamp in the delivery/evidence
artifacts.

### EVAL-1-001 — Token-backed exported foundation

- Links: REQ-1-001; AC-1-001, AC-1-002.
- Category: Static and integration.
- Blocking: true. Automation level: automated where the chosen workspace makes
  it available.
- Preconditions: the React/TypeScript library workspace, its actual export
  entry points, and its stylesheet/token output have been built.
- Procedure: run the actual package-local typecheck/build script recorded by
  implementation; import the documented library entry points in the component
  test fixture; inspect the built/source style contract or computed styles for
  one Button per variant.
- Observable oracle: the imports resolve; Button styling references the token
  layer or documented token-derived variables for all required presentation
  roles; no external UI component library is required at runtime.
- Required evidence: exact command(s), exit code(s), resolved entry-point path,
  test/build output, and an inspected token-to-Button style reference.

### EVAL-1-002 — API, variants, sizes, and native interaction

- Links: REQ-1-002; AC-1-003, AC-1-004, AC-1-005.
- Category: Component integration.
- Blocking: true. Automation level: automated.
- Preconditions: a rendered Button test environment using the implementation's
  actual React test tooling.
- Procedure: render each variant/size pair and assert a native button; exercise
  an enabled click; render `disabled` and `loading`; attempt pointer activation
  in each inactive state; inspect forwarded ref and DOM attributes.
- Observable oracle: all nine variant/size combinations render without error;
  `md` and `primary` are defaults; enabled click is delivered once; disabled and
  loading click handlers are not delivered; `disabled` is native; loading has
  `aria-busy=\"true\"`; design props do not appear as invalid DOM attributes;
  the forwarded ref targets the native button.
- Required evidence: test name/output, assertions for each state, actual
  command and exit code, and test-tool/version identity.

### EVAL-1-003 — Keyboard and assistive-technology contract

- Links: REQ-1-002; AC-1-006, AC-1-007.
- Category: Accessibility and component integration.
- Blocking: true. Automation level: automated plus browser-assisted observation
  when the selected tools can expose computed focus styles.
- Preconditions: an enabled Button, disabled Button, loading Button, labeled
  icon-only Button, and an icon-only Button with no accessible name in a test or
  Storybook harness.
- Procedure: run the project's accessibility assertions; use keyboard traversal
  to focus and activate the enabled Button; inspect focus-visible computed
  styles in a browser/Storybook harness; assert disabled/loading focus and
  activation behavior; assert named icon-only pass and unnamed icon-only fail
  validation or is rejected by its API.
- Observable oracle: enabled Button is keyboard reachable and operable through
  native semantics; focus-visible is visibly rendered; disabled/loading controls
  are not sequentially focusable or activatable; all permitted usages have an
  accessible name; decorative icons are excluded from the accessibility tree;
  unnamed icon-only usage cannot silently pass.
- Required evidence: accessibility and interaction test output, browser/Storybook
  focus observation or retained inspection record, exact commands and exit
  codes, and any screenshot/metadata retained under `.sdd/evidence.yaml`.

### EVAL-1-004 — Storybook documentation and visual state coverage

- Links: REQ-1-003; AC-1-008.
- Category: Visual and documentation integration.
- Blocking: true. Automation level: automated build plus browser-assisted
  observation.
- Preconditions: Storybook is configured for the actual workspace and Button
  stories exist.
- Procedure: execute the installed Storybook static-build or story-validation
  command; open the Button documentation page through the actual Storybook UI
  or its available MCP integration; inspect the required stories and keyboard
  focus-visible state.
- Observable oracle: the Button page is discoverable and renders examples for
  three variants, three sizes, disabled, loading, focus-visible, and named
  icon-only usage; no required story crashes; any installed Storybook MCP
  integration is usable or its unsupported status is explicitly evidenced.
- Required evidence: command/output/exit code, Storybook version and page path,
  inspection record or retained screenshot metadata, and MCP configuration or
  unsupported-capability evidence.

### Targeted Verification

After the workspace exists, the Evaluator runs every real component-scoped
format/lint, TypeScript, unit/component-test, and Storybook-build command that
the project has configured for the component profile. The Brief does not
authorize inventing command names. If a required configured check fails or an
approved blocking Eval cannot be observed, record `FAIL` or `BLOCKED` and keep
the workflow at its owning stage.

## Implementation Strategy and Tasks

### TASK-1-001 — Initialize the minimal library foundation

- Links: REQ-1-001, AC-1-001, EVAL-1-001.
- Work: establish the Bun-monorepo-compatible React + TypeScript library
  structure, package export boundary, justified development tooling, and
  component-focused scripts. Do not add an external UI component library.
- Completion signal: actual package/export paths and executable scripts exist
  and are recorded for independent verification.

### TASK-1-002 — Define semantic tokens and Button styling primitives

- Links: REQ-1-001, REQ-1-002, AC-1-002, AC-1-004, AC-1-005, EVAL-1-001, EVAL-1-002.
- Work: define semantic token roles and token-derived Button styles for required
  variants, sizes, and states, including focus-visible and reduced-motion-safe
  behavior.
- Completion signal: all required presentation roles are traceable from Button
  styles to tokens and pass the token/style checks.

### TASK-1-003 — Implement the native accessible Button and tests

- Links: REQ-1-002, AC-1-003, AC-1-004, AC-1-005, AC-1-006, AC-1-007, EVAL-1-002, EVAL-1-003.
- Work: implement the documented API, native semantics, ref forwarding,
  loading/disabled behavior, accessible naming guidance/guard, and tests for
  positive and negative interaction/accessibility cases.
- Completion signal: all API/state/keyboard/accessibility Evals can be executed
  against observed behavior without mocks that replace the behavior under test.

### TASK-1-004 — Author Storybook and evidence-ready documentation

- Links: REQ-1-003, AC-1-008, EVAL-1-004.
- Work: configure Storybook, document Button API/usage and all required states,
  and configure or document available Storybook MCP support using the installed
  tooling.
- Completion signal: the Storybook build/page inspection procedure can produce
  the required EVAL-1-004 evidence.

## Risks, Assumptions, and Rollback

### Assumptions

| ID | Decision / reason | Evidence and impact |
| --- | --- | --- |
| ASM-1-001 | The Issue's “library import” goal is an internal project target, not a public npm or relied-upon compatibility contract. | Issue #1 lists public npm publishing as a non-goal; component profile remains eligible. Promote to full if this changes. |
| ASM-1-002 | Existing repository inventory contains no React application/workspace and `.sdd/verification.yaml` has an empty command list. | Direct repository inspection at Brief creation. Toolchain/version and actual command selection are implementation decisions, not pre-claimed facts. |
| ASM-1-003 | Three semantic emphasis variants and three medium-density sizes are a reversible reference-component baseline consistent with the Issue's product-neutral, clear/minimal direction. | Issue #1 gives visual principles but no variant taxonomy. This is an architect decision within the Issue, not a brand or business-policy decision. |
| ASM-1-004 | “Storybook MCP” means use/configure the capability supplied by the installed Storybook ecosystem when available, not a guaranteed third-party service or a requirement to expose a remote endpoint. | Issue #1 requests Storybook and Storybook MCP but specifies no package/version or external service. Unsupported capability must be evidenced, not silently omitted. |

### Risks and containment

- Tooling initialization can introduce dependency, lockfile, or monorepo-layout
  choices. Keep them minimal and justified; promote to full if it expands into a
  cross-package architecture change.
- Token values can fail contrast or make focus indistinct. Evaluate computed
  focus and accessible states rather than relying on source appearance.
- Loading behavior can accidentally double-submit or hide the control name.
  Cover inactive activation and accessible-name cases explicitly.
- A Storybook/MCP version may not offer the requested integration. Record the
  actual supported route and evidence; do not fabricate availability.

### Rollback

All proposed changes are additive and source-controlled. Revert the feature's
commit(s) to remove the workspace foundation, tokens, component, stories, and
tooling together. No migration, persisted data, public npm publication, or
external infrastructure rollback is in scope. If later consumers rely on the
exports, treat removal or API alteration as a compatibility decision and
reassess the profile before acting.
