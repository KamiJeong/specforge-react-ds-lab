---
name: sdd-run
description: Orchestrate a resumable, risk-proportional SpecForge Issue-to-PR workflow using quick, component, or full delivery profiles.
---

# SDD Run

## Purpose

Act as the workflow controller behind `$sdd-run issue #123 [--profile
quick|component|full]` or `$sdd-run "raw development intent"`. Keep SDD,
EDD, OKF, state, risk-proportional routing, and GitHub synchronization behind
this entry point.

## Trigger

Explicit `$sdd-run` invocation with an Issue number, Issue URL, or quoted
intent. An optional `--profile` overrides label and automatic selection.

## Inputs

- Issue reference or raw intent
- current repository, Git remote, and working tree
- optional existing feature directory
- optional explicit profile: `quick`, `component`, or `full`

## Required Artifacts

Read `.sdd/constitution.md`, `.sdd/workflow.yaml`, `specs/index.md`, and the
current feature `index.md` and `state.json` when they exist. Load only artifacts
required by the current stage.

## Preconditions

- The working directory is inside a trusted repository.
- `.sdd/workflow.yaml` and the workflow state schema are readable.
- For Issue mode, `gh` is authenticated and the Issue can be read; otherwise
  persist the block without inventing Issue content.

## Procedure

1. Detect the repository root, GitHub remote, default branch, and working-tree
   state. Preserve unrelated work.
2. Read the Constitution and workflow contract. Select exactly one profile using
   explicit CLI, then a single `workflow:*` Issue label, then automatic risk
   classification. Use `component` for ordinary shared design-system
   components. Use `full` for conflicting labels, uncertain high-impact scope,
   security/auth, sensitive data, irreversible migration, externally published
   APIs, cross-boundary architecture, or critical performance/cost.
3. Resolve the Issue with `gh issue view` including URL, title, body, author,
   labels, and state. Treat it as raw intent. For quoted intent, use `issue: null`
   and persist `correlation_id: LOCAL-<12 uppercase SHA-256 hex characters>` from
   normalized intent. Use that token in stable IDs and a lowercase equivalent in
   `specs/local-<digest>-<slug>/` so separate local workflows cannot collide.
4. For a new Issue workflow, derive `feature/`, `fix/`, `refactor/`, `chore/`, or
   `spike/` branch naming from the normalized type, include correlation and slug,
   and persist the chosen branch. Do not switch away from unrelated dirty work.
5. Locate `specs/<correlation>-<slug>/`. If absent, create only `index.md`,
   `state.json`, and the current stage's artifact as each becomes meaningful.
6. Load and validate `state.json`. Refuse invalid or illegal transitions. If no
   state exists, persist the selected `profile` and initialize it at that
   profile's `initial_stage` with Issue-number or local `correlation_id` and
   an actual timestamp. Existing state without `profile` is `full`.
7. Compare GitHub `workflow:*` and `stage:*` labels with persisted `profile`
   and `current_stage`. Because internal state is authoritative, repair drift
   only after confirming persisted state.
8. Read `specs/index.md`, then the feature index, then only current-stage inputs.
9. For `quick` or `component`, route the compact delivery to `sdd-fast`.
   For `full`, select the current stage Skill and its recommended Custom
   Agent. The default is Terra/medium. Escalate a bounded decision to Sol/high
   only for the conditions in `model_escalation`; an internal component API is
   not automatically an externally published public contract.
10. Execute the stage. Read-heavy analysis may be parallel; serialize writes
   unless ownership is disjoint and conflict risk is low.
11. Validate the output, stable IDs, links, traceability, and gate result.
12. Persist the artifact and update the feature index when appropriate.
13. Persist `state.json` atomically with an actual `updated_at`, then read it
    back and validate it.
14. Only after step 13, run `scripts/github/sync-stage-label.sh` for Issue mode.
15. Continue only through the selected profile route, stop on a block, promote a
    compact workflow to `full` when a promotion condition is discovered, or
    record and present a human escalation. Create a PR only from `ready-pr`
    after the profile-specific readiness conditions pass.
16. On resume, repeat discovery and validation; never depend on conversation
    history.

For spikes, use `.sdd/workflow.yaml#spike_route`: pursue enough evidence for a
decision and do not assume production implementation is required.

## Recommended Agent

The primary session is the Orchestrator (`gpt-5.6-terra`, medium). Delegate
compact delivery to `sdd-fast` and full stages to the configured narrow
capability. Use Sol/high only for a bounded escalation condition. The
Orchestrator owns profile selection, gates, state, retries, adjudication, and
synchronization.

## Allowed Actions

- Read repository, GitHub Issue, and relevant knowledge.
- Create and update in-scope feature artifacts and workflow state.
- Delegate read-only or disjoint work and execute configured checks.
- Synchronize labels and create a PR after internal readiness is persisted.

## Forbidden Actions

- Implement application code directly in the normal Orchestrator path.
- Skip stages or gates required by the selected profile, use a compact profile
  after a promotion condition is known, infer approval, rewrite
  higher-authority artifacts from a lower stage, fabricate evidence, or update
  labels before state persistence.
- Load all feature artifacts when the current stage does not require them.

## Outputs

A resumable feature knowledge directory, valid `state.json`, synchronized GitHub
stage projection, and either the next stage, an explicit block/escalation, or a
PR linked with `Closes #<issue>`.

## Completion Criteria

`ready-pr` is reached legally through the persisted profile, its readiness
conditions and final knowledge validation pass, required evidence exists,
P0/P1 counts are zero, and PR creation succeeds.

## Failure Conditions

Invalid state, missing authoritative input, illegal transition, unresolved
conflict, insufficient evidence, failed gate, exhausted review-fix limit, or a
required external dependency that cannot be reached.

## State Transition

Use only transitions allowed by `allowed_transitions` and the persisted
profile's forward or retry route. Persist stage outputs, then state, then
external metadata. On failure retain the owning stage and set `blocked_stage`
when appropriate.

## GitHub Label Transition

Project `profile` to exactly one `workflow:<profile>` label and
`current_stage` to exactly one `stage:<current_stage>` label. Add or remove
state/gate labels according to persisted blocks. `state.json` always wins on
drift.

## Human Escalation Conditions

Use the Constitution and workflow human gates. Persist the exact question,
why it matters, options, recommendation when appropriate, consequences, and
blocking stage; add `gate:human-required` and stop autonomous progression.
