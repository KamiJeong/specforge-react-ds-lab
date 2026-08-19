---
name: sdd-run
description: Orchestrate a resumable SpecForge Issue-to-PR workflow when asked to run SDD for a GitHub issue or a quoted raw intent.
---

# SDD Run

## Purpose

Act as the workflow controller behind `$sdd-run issue #123` or `$sdd-run
"raw development intent"`. Keep SDD, EDD, OKF, state, agent routing, and GitHub
synchronization behind this entry point.

## Trigger

Explicit `$sdd-run` invocation with an Issue number, Issue URL, or quoted intent.

## Inputs

- Issue reference or raw intent
- current repository, Git remote, and working tree
- optional existing feature directory

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
2. Read the Constitution and workflow contract.
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
   state exists, initialize it at `intake` with Issue-number or local
   `correlation_id` and an actual timestamp.
7. Compare GitHub `stage:*` labels with `current_stage`. Because internal state
   is authoritative, repair drift only after confirming persisted state.
8. Read `specs/index.md`, then the feature index, then only current-stage inputs.
9. Select the stage Skill from `.sdd/workflow.yaml` and its recommended Custom
   Agent. Escalate routing to Architect/Sol for ambiguity, architecture,
   security, data integrity, public contracts, critical Eval design, review
   adjudication, or convergence.
10. Execute the stage. Read-heavy analysis may be parallel; serialize writes
   unless ownership is disjoint and conflict risk is low.
11. Validate the output, stable IDs, links, traceability, and gate result.
12. Persist the artifact and update the feature index when appropriate.
13. Persist `state.json` atomically with an actual `updated_at`, then read it
    back and validate it.
14. Only after step 13, run `scripts/github/sync-stage-label.sh` for Issue mode.
15. Continue through legal transitions, stop on a block, or record and present
    a human escalation. Create a PR only from `ready-pr` after all readiness
    conditions pass.
16. On resume, repeat discovery and validation; never depend on conversation
    history.

For spikes, use `.sdd/workflow.yaml#spike_route`: pursue enough evidence for a
decision and do not assume production implementation is required.

## Recommended Agent

The primary session is the Orchestrator (`gpt-5.6-sol`, high). Delegate stage
execution to the configured narrow capability; the Orchestrator owns gates,
state, retries, adjudication, and synchronization.

## Allowed Actions

- Read repository, GitHub Issue, and relevant knowledge.
- Create and update in-scope feature artifacts and workflow state.
- Delegate read-only or disjoint work and execute configured checks.
- Synchronize labels and create a PR after internal readiness is persisted.

## Forbidden Actions

- Implement application code directly in the normal Orchestrator path.
- Skip stages or gates, infer approval, rewrite higher-authority artifacts from
  a lower stage, fabricate evidence, or update labels before state persistence.
- Load all feature artifacts when the current stage does not require them.

## Outputs

A resumable feature knowledge directory, valid `state.json`, synchronized GitHub
stage projection, and either the next stage, an explicit block/escalation, or a
PR linked with `Closes #<issue>`.

## Completion Criteria

`ready-pr` is reached legally, Definition of Done and final knowledge validation
pass, required evidence exists, P0/P1 counts are zero, and PR creation succeeds.

## Failure Conditions

Invalid state, missing authoritative input, illegal transition, unresolved
conflict, insufficient evidence, failed gate, exhausted review-fix limit, or a
required external dependency that cannot be reached.

## State Transition

Use only `allowed_transitions` in `.sdd/workflow.yaml`. Persist stage outputs,
then state, then external metadata. On failure retain the owning stage and set
`blocked_stage` when appropriate.

## GitHub Label Transition

Project `current_stage` to exactly one `stage:<current_stage>` label. Add or
remove state/gate labels according to persisted blocks. `state.json` always wins
on drift.

## Human Escalation Conditions

Use the Constitution and workflow human gates. Persist the exact question,
why it matters, options, recommendation when appropriate, consequences, and
blocking stage; add `gate:human-required` and stop autonomous progression.
