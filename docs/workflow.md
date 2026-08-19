# Workflow

## State machine

The normal implementation route is:

```text
intake → spec → clarify → eval-design → plan → tasks
       → analyze → implement → verify → eval → review
       → converge → ready-pr
```

Knowledge validation runs after major artifact generation, at the Tasks exit,
before Convergence, and before PR. It is a gate/checkpoint, not a separate stage
label. The full legal graph and blocking conditions are machine-readable in
`.sdd/workflow.yaml`.

Common backward paths include:

```text
analyze   → spec         # behavior is ambiguous or uncovered
implement → plan         # architecture cannot support the approved strategy
eval      → fix          # observed behavior fails after a review iteration
review    → fix          # P0/P1 finding
fix       → verify → eval → review
converge  → earliest owning stage
```

Use `python3 scripts/sdd/validate.py --transition FROM TO` to test a transition.
Unknown and undeclared edges fail.

## Stage ownership

| Stage | Skill | Default capability | Primary result |
| --- | --- | --- | --- |
| intake | `sdd-intake` | Architect | normalized `issue.md` |
| spec | `sdd-spec` | Architect | `spec.md` |
| clarify | `sdd-clarify` | Architect | `clarifications.md` or human gate |
| eval-design | `sdd-eval-design` | Architect | `evals.md` |
| plan | `sdd-plan` | Architect | `plan.md` |
| tasks | `sdd-tasks` | Architect | `tasks.md` |
| analyze | `sdd-analyze` | Architect | read-only `analysis.md` |
| implement | `sdd-implement` | Implementer | code and tests |
| verify | `sdd-verify` | Evaluator | `verification.md` |
| eval | `sdd-eval` | Evaluator | results and evidence |
| review | `sdd-review` | Reviewer | independent `review.md` |
| fix | `sdd-fix` | Fixer | scoped remediation |
| converge | `sdd-converge` | Architect | `convergence.md` |
| ready-pr | `sdd-pr` | Utility + Orchestrator | linked PR |

## Transition transaction

Every forward or backward transition uses the same order:

1. Execute the active stage.
2. Validate output and gate result.
3. Persist its artifact and update the feature index.
4. Persist `state.json` with a real timestamp.
5. Read and validate persisted state.
6. Synchronize the Issue's stage label.

If step 3 or 4 fails, the GitHub label must not move. On resume, internal state
wins and stale labels are repaired.

Issue workflows use their Issue number as `correlation_id`. Quoted-intent
fallbacks use a deterministic `LOCAL-<12 uppercase SHA-256 hex>` token and retain
`issue: null`, so their REQ/AC/EVAL/TASK/EVIDENCE/FINDING IDs remain stable and
do not collide accidentally.

## Retry and review loop

Verification failure routes to Implement or Fix depending on whether review has
started. Eval behavior failure follows the same distinction. A proven Eval
Contract defect routes to Eval Design only through a recorded modification—not
through Implementer editing.

Review findings use P0 BLOCKER, P1 MUST_FIX, P2 SHOULD_FIX, and P3 OPTIONAL. P0
or P1 sends the workflow to Fix. Every code change repeats Verify, required Eval,
and independent Review. After two unsuccessful autonomous fix iterations,
SpecForge persists a human gate and stops.

## Definition of Done

PR readiness requires approved Spec and Eval Design, resolved clarification,
valid Plan/Tasks, passing knowledge and Analyze gates, completed implementation
or an approved Spike exception, passing Verification, all blocking Evals PASS
with evidence, zero P0/P1, passing Convergence, and final OKF validation.

## Spike route

Spikes are investigation-first:

```text
intake → clarify → eval-design → analyze → converge → ready-pr
```

Eval Design specifies what evidence will answer the question. Analyze synthesizes
observations into a recommendation. Production implementation and ordinary
Verification are not assumed; any not-applicable gate must be explicit and
justified in state and convergence.
