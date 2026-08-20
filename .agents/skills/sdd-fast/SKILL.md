---
name: sdd-fast
description: Deliver quick and shared-component changes through a compact, risk-proportional Brief-to-PR workflow.
---

# SDD Fast

## Purpose

Preserve specification, evaluation intent, independent review, evidence
integrity, and resumability without forcing every low-risk change through the
full thirteen-stage workflow.

## Trigger

`sdd-run` selected and persisted the `quick` or `component` profile.

## Inputs

- Constitution and `.sdd/workflow.yaml`
- raw Issue or quoted intent
- selected profile and current state
- feature index and relevant repository conventions
- changed surface, risks, and available project-native checks

## Required Artifacts

Use `.sdd/templates/brief.md` and `.sdd/templates/delivery.md`. Persist
`brief.md`, `delivery.md`, `index.md`, and `state.json`. The component
profile also persists evaluation evidence in `evidence/manifest.json` when the
approved procedure produces retainable evidence.

## Preconditions

- The profile is exactly `quick` or `component`.
- No `promote_to_full_when` condition is known.
- The intended change is scoped, reversible, and can be evaluated with targeted
  project-native checks.
- Implementer and Reviewer contexts can remain independent.

## Procedure

1. Confirm the profile against the Issue, labels, affected surface, and
   repository evidence. Promote to `full` before implementation if a full-risk
   condition is present. Record the reason; do not silently continue compactly.
2. In one Architect pass, create `brief.md` containing normalized intent,
   scope/non-goals, stable Requirements and Acceptance Criteria, material
   assumptions, implementation strategy, coherent Tasks, targeted verification,
   and rollback. Avoid microscopic IDs and repeated prose.
3. For `quick`, define only the smallest observable checks needed for the
   changed behavior. Set skipped Eval Design, Analyze, Eval, and Convergence
   statuses to `not_applicable` with the profile as the reason.
4. For `component`, additionally define the component API, supported states,
   interactions, visual contract, keyboard/focus behavior, accessibility
   semantics, compatibility expectations, and stable blocking Eval cases in the
   same Brief. Mark Eval Design approved from that Brief; Analyze and
   Convergence are `not_applicable`.
5. Run knowledge validation once after the Brief. Persist the Brief, feature
   index, and state before moving to implementation.
6. Delegate all approved Tasks together to one Implementer context. Make scoped
   production and implementation-test changes. Stop and promote to `full` if
   implementation exposes a promotion condition or higher-authority conflict.
7. Delegate targeted Verification to the Evaluator. Run only project-native
   commands configured for the profile or explicitly approved in the Brief.
   Prefer changed-package lint/typecheck/tests during the loop. Never invent
   commands or PASS when the project has no executable check.
8. For `component`, execute every blocking Eval from the Brief and record
   evidence. For `quick`, retain the Verification observations in
   `delivery.md` and keep `eval_status: not_applicable`.
9. Delegate one fresh-context independent Review. Scope dimensions to the actual
   change: quick normally covers correctness, regression, and test adequacy;
   component also covers API consistency, states, events, keyboard/focus,
   accessibility, and visual contracts. Activate other dimensions only when
   affected.
10. P0/P1 findings route to Fix, then repeat targeted Verify, applicable Eval,
    and independent Review. P2/P3 remain visible and do not trigger remediation
    unless explicitly accepted into scope.
11. Persist `delivery.md` with commands, results, evidence, Review findings,
    residual risk, and rollback. Run final profile-appropriate knowledge
    validation once, then move directly from Review to `ready-pr`.

## Recommended Agent

Use Architect, Implementer, Evaluator, and Reviewer at Terra/medium. The
Orchestrator retains profile and state ownership. Escalate only the bounded
decision that meets `model_escalation.use_sol_high_when`.

## Allowed Actions

- Produce the compact Brief and Delivery artifacts.
- Implement approved scoped code and tests.
- Run targeted configured checks and component Evals.
- Perform a separate read-only Review.
- Promote safely to `full` before continuing when risk expands.

## Forbidden Actions

- Use a compact profile for authentication, security boundaries, sensitive
  data, irreversible migrations, external public API breaks, cross-boundary
  architecture, or critical performance/cost decisions.
- Combine Implementer and Reviewer judgment, omit a blocking component Eval,
  fabricate evidence, or claim an unavailable check passed.
- Turn every internal component prop into an external public-contract
  escalation without evidence of external publication or relied-upon use.

## Outputs

An approved compact `brief.md`, scoped implementation, targeted observed
results, independent Review, truthful `delivery.md`, valid state, and either
`ready-pr`, a Fix loop, a Full-profile promotion, or an explicit block.

## Completion Criteria

The selected profile's readiness conditions pass, required targeted checks were
actually observed, component blocking Evals pass when applicable, no P0/P1
findings remain, final knowledge validation passes, and state is persisted.

## Failure Conditions

A full-risk condition appears, a required command or Eval fails or cannot run,
evidence is insufficient, Reviewer independence is unavailable, a P0/P1 remains
open, state is invalid, or a human-gated decision is required.

## State Transition

- Quick: `spec → implement → verify → review → ready-pr`
- Component: `spec → implement → verify → eval → review → ready-pr`
- Fix loop: `review → fix → verify → [eval for component] → review`

Both the global transition graph and the persisted profile forward/retry route
must allow the transition. Full promotion reinitializes omitted statuses as
required by the Full route without discarding the Brief or observed evidence.

## GitHub Label Transition

Retain exactly one `workflow:quick` or `workflow:component` label and one
`stage:*` projection. Persist state first, confirm it, then synchronize labels.
On Full promotion replace the workflow label with `workflow:full` only after
the promoted state is valid.

## Human Escalation Conditions

Use the Constitution's existing human boundaries. Also escalate disputed
profile promotion or a request to keep compact delivery after a full-risk
condition is evidenced.
