# Architecture

SpecForge V1 is a repository-resident control system. The primary Codex session
is the Orchestrator; stages are Skills; Custom Agents are narrow execution
capabilities; files and Git provide durable memory; GitHub provides intake and
collaboration projections.

```text
                     Constitution
                          │
                          ▼
GitHub Issue ───────► Orchestrator
                          │
             ┌────────────┼─────────────┐
             │            │             │
             ▼            ▼             ▼
        Workflow       Skills       GitHub Sync
          State           │
             │            ▼
             │      Custom Agents
             │            │
             └──────┬─────┘
                    ▼
             OKF Knowledge
                 Bundle
                    │
      ┌─────────────┼─────────────┐
      ▼             ▼             ▼
    Spec           Eval          Plan
      │              │             │
      └──────────────┼─────────────┘
                     ▼
                   Tasks
                     │
                     ▼
                Implement
                     │
              ┌──────┴──────┐
              ▼             ▼
           Verify          Eval
              │             │
              └──────┬──────┘
                     ▼
                   Review
                     │
                     ▼
                 Converge
                     │
                     ▼
                GitHub PR
```

The diagram shows the Full profile. Component keeps
Implement → Verify → Eval → Review; Quick uses
Implement → Verify → Review because its targeted Verification is the approved
observable check. All profiles preserve independent Review.

## Authority and control planes

The Constitution governs all work. Specification, Acceptance Criteria, Eval
Contract, Plan, Tasks, and implementation form a descending authority chain. A
conflict moves backward to the earliest owning stage; lower-level convenience
never wins silently.

The workflow has three distinct stores:

- `.sdd/workflow.yaml` defines legal stages, transitions, gates, retries, and PR
  readiness.
- `specs/<issue>-<slug>/state.json` is authoritative runtime state for one Issue.
- Persistent Markdown concepts are durable development knowledge and evidence
  narrative. `evidence/manifest.json` indexes observed proof.

`.sdd/workflow.yaml` also defines Quick, Component, and Full routes. Compact
profiles combine the pre-implementation authority layers into one `brief.md`
without merging Implementer and Reviewer responsibility. They use one
`delivery.md` for observed checks, evaluation evidence when applicable,
independent Review, and residual risk.

GitHub `stage:*` labels mirror `state.json`. They are convenient for humans but
cannot authorize a transition. The synchronizer reads confirmed persisted state
and never writes it.

## Stages and capabilities

A stage such as `sdd-spec` is a composable Skill describing inputs, procedure,
gates, outputs, and transitions. A capability such as `architect` or `reviewer`
is a Custom Agent with model, reasoning, sandbox, and narrow behavioral bounds.
One capability serves multiple stages; there is intentionally no agent-per-stage
explosion.

The Orchestrator normally avoids application implementation. It reads minimal
context, chooses the stage/capability, validates outputs, owns state changes,
adjudicates findings, and controls external mutation. Explorer and Reviewer are
read-only. Evaluator may write evidence artifacts but normally not production
code. This preserves independent judgment while allowing the Orchestrator to
persist outputs from read-only agents.

## Extension boundaries

Project verification commands live in `.sdd/verification.yaml`. Schemas are
portable JSON Schema. Skills and agents are project-scoped. These interfaces let
a future external orchestrator or Agents SDK execute the same contracts without
redesigning SDD/EDD artifacts.

V1 intentionally adds two files beyond the requested illustrative tree:

- `.sdd/verification.yaml` makes repository health checks project-configurable.
- `.sdd/evidence.yaml` makes evidence retention and redaction explicit without
  forcing binary artifacts into Git.
- `scripts/sdd/validate.py` plus its small requirements file make structural and
  traceability gates executable rather than documentary.

No application runtime, database, dashboard, queue, or server is introduced.
