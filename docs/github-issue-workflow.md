# GitHub Issue Workflow

## Intake forms

Feature, Bug, Technical Change, and Spike Issue Forms collect raw context. They
do not ask humans to author the final Spec, Plan, Tasks, or Evals. Blank Issues
are disabled so the workflow receives a minimal typed structure.

Feature collects problem, desired outcome, context, constraints, non-goals, and
priority. Bug collects current/expected behavior, reproduction, impact,
environment, existing evidence, and regression history; its Eval Design should
emphasize regression proof. Technical Change covers refactor, debt, performance,
infrastructure, dependency, and architecture work while asking what behavior must
be preserved. Spike asks a question, unknowns, hypothesis, expected evidence,
enabled decision, and scope boundary.

Security vulnerabilities use private reporting described in `SECURITY.md`, not a
normal public form. Planned security-sensitive work can still carry
`risk:security`.

## Correlation and branches

The Issue number is the primary correlation ID:

```text
Issue #152
specs/152-organization-rbac/
REQ-152-001 → AC-152-001 → EVAL-152-001 → TASK-152-001
             → EVIDENCE-152-001 → FINDING-152-001
PR: Closes #152
```

Suggested branches preserve type and correlation:

```text
feature/152-organization-rbac
fix/152-login-regression
refactor/152-order-state
chore/152-update-dependency
spike/152-rendering-performance
```

## Label taxonomy

`.github/labels.json` is canonical. Normally an active Issue has exactly one
`type:*`, one `workflow:quick|component|full`, one `stage:*`, and optionally
one `priority:*`, state/gate labels, and multiple `risk:*` labels. Issue
priority is not Review Finding severity.

Run the idempotent bootstrap after creating a repository from the template:

```bash
scripts/github/setup-labels.sh --repo OWNER/REPOSITORY
```

`gh` and `jq` are required. Authentication and manifest validity are checked
before labels are created or updated.

## State-first synchronization

`state.json` is authoritative. GitHub labels are a projection for collaboration
and triage. When they disagree, the Orchestrator validates persisted state and
repairs GitHub:

```bash
scripts/github/sync-stage-label.sh --dry-run 152 specs/152-organization-rbac/state.json
scripts/github/sync-stage-label.sh 152 specs/152-organization-rbac/state.json
```

The script verifies that state is non-empty, matches the Issue, has a valid
profile, current stage, and update time, and maps both projections to canonical
labels. It then replaces stale `workflow:*` and `stage:*` labels. Existing
state without a profile is treated as Full for backward compatibility. It never
writes state.

Priority semantics are P0 critical/immediate/release blocker, P1 high, P2 normal,
and P3 low. Risk labels are not decorative: the Orchestrator uses them to select
or promote the delivery profile, scope review/Evals, escalate bounded model
routing, and identify human decision boundaries. Review Finding severity remains
a separate scale.

## Pull Requests

The PR template keeps ordinary human PRs lightweight: Issue, Summary,
Validation, Risk, and Rollback. A collapsible generated section supports the full
SpecForge record without asking humans to duplicate persistent artifacts.

`sdd-pr` can run only from `ready-pr`. It includes `Closes #<issue>`, links SDD
artifacts, and summarizes real verification/evidence, independent review,
remaining P2/P3, risk, and rollback. PR creation is not merge or human approval.
