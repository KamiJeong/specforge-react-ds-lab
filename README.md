# SpecForge

SpecForge is a reusable GitHub Template Repository and Codex-native development
harness that turns raw GitHub Issue intent into a specification, evaluation
contract, verified implementation, independent review, convergence judgment, and
traceable Pull Request.

```text
GitHub Issue
  → Specification
  → Evaluation Contract
  → Plan
  → Tasks
  → Verified Implementation
  → Evaluation Evidence
  → Independent Review
  → Convergence
  → Pull Request
```

It is framework- and language-neutral. V1 uses files, Git, GitHub CLI, Codex
Skills, and Codex Custom Agents—no database, workflow server, queue, dashboard,
external orchestrator, or Agents SDK.

## Quick start

1. Create a repository from this GitHub template.
2. Customize [the Constitution](.sdd/constitution.md) for the project before
   production work.
3. Install the validation dependencies and bootstrap the canonical labels:

   ```bash
   python3 -m pip install -r scripts/sdd/requirements.txt
   scripts/github/setup-labels.sh
   ```

4. Add project-specific mechanical checks to
   [`.sdd/verification.yaml`](.sdd/verification.yaml).
5. Open a Feature, Bug, Technical Change, or Spike Issue.
6. In Codex, run:

   ```text
   $sdd-run issue #123
   ```

Without GitHub, a local workflow can start from raw intent:

```text
$sdd-run "Add organization-level RBAC"
```

Local workflows persist a collision-resistant `LOCAL-<12 hex>` correlation token
derived from normalized intent (for example `REQ-LOCAL-A1B2C3D4E5F6-001`) while
keeping `issue: null`. Issue workflows continue to use the Issue number.

The Issue path is preferred because the Issue number becomes the correlation ID
for requirements, Evals, Tasks, evidence, findings, branch, and PR.

## Why Issues, SDD, EDD, and OKF work together

A GitHub Issue is the canonical entry point, but only as **raw intent**. Issue
Forms ask for context rather than forcing a reporter to write a complete design.
The Intake and Clarify stages turn that context into reliable inputs.

Specification-Driven Development (SDD) defines what should exist, why, expected
behavior, constraints, and explicit non-goals. Stable IDs such as `REQ-123-001`
and `AC-123-001` keep behavior traceable as the work evolves.

Eval-Driven Development (EDD) defines correctness before implementation through
`EVAL-123-001`: preconditions, method, procedure, observable oracle, evidence,
blocking status, and automation level. An implementation claim is not proof.

Open Knowledge Format (OKF) v0.2 makes the persistent Markdown under `specs/` a
navigable Knowledge Bundle. It keeps documents human-readable, agent-readable,
portable, Git-friendly, provenance-aware, and discoverable without a graph
database.

## One command, several narrow capabilities

`$sdd-run` is the Orchestrator entry point. The primary Codex session selects
and persists a Quick, Component, or Full profile, delegates to the appropriate
Skill and Custom Agent, enforces profile-specific gates, persists results,
repairs GitHub label drift, and resumes until it must stop or can create a PR.

Workflow stages are Skills under `.agents/skills/`. Execution capabilities are
Custom Agents under `.codex/agents/`. They are deliberately different:

| Capability | Default model | Reasoning | Typical work |
| --- | --- | --- | --- |
| Orchestrator | `gpt-5.6-terra` | medium | profile, state, gates, routing |
| Architect | `gpt-5.6-terra` | medium | Brief or full architecture artifacts |
| Explorer | `gpt-5.6-terra` | medium | read-only repository discovery |
| Implementer | `gpt-5.6-terra` | medium | approved Tasks and tests |
| Evaluator | `gpt-5.6-terra` | medium | targeted/full Verify, Eval, evidence |
| Reviewer | `gpt-5.6-terra` | medium | profile-scoped independent review |
| Fixer | `gpt-5.6-terra` | medium | approved finding remediation |
| Utility | `gpt-5.6-luna` | low | deterministic metadata work |

These are routing defaults. The Orchestrator escalates only bounded unresolved
security/data/migration, externally published API, high-impact architecture,
critical performance/cost, complex failure, or disputed P0/P1 decisions to
Sol/high.

## The workflow and its gates

The default for shared design-system work is Component:

```text
Brief → Implement → Targeted Verify → Eval
      → Independent Review → Pull Request
```

Quick omits the separate Eval stage when targeted Verification is sufficient:

```text
Brief → Implement → Targeted Verify → Independent Review → Pull Request
```

Full retains the complete path:

```text
Intake → Spec → Clarify → Eval Design → Plan → Tasks
       → Knowledge Validate → Analyze → Implement → Verify → Eval
       → Independent Review → Converge → Knowledge Validate → Pull Request
```

It is a state machine, not a checklist. Legal backward transitions are declared
in [`.sdd/workflow.yaml`](.sdd/workflow.yaml). Examples include Analyze→Spec for
a requirement conflict, Implement→Plan for an architecture conflict,
Eval→Fix→Verify→Eval for a failure, and Review→Fix→Verify→Eval→Review for a P1.

Knowledge validation is a required checkpoint rather than a GitHub stage. This
intentional deviation keeps the requested `stage:*` label taxonomy concise while
still enforcing OKF checks. Compact profiles run it after `brief.md` and before
PR; Full keeps its major-artifact, Convergence, and PR checkpoints.

### AUTO and MANUAL clarification

AUTO decisions are appropriate when the Constitution, current architecture,
code, tests, stable contracts, or reversible repository conventions provide safe
evidence. They record decision, reason, evidence, impact, and source.

MANUAL decisions are required for product semantics, business rules,
authentication/authorization, security boundaries, sensitive data, public APIs,
irreversible migrations, major infrastructure cost, Constitution exceptions, or
intentional weakening of Acceptance Criteria/blocking Evals. The workflow
persists the question and consequences, applies `gate:human-required`, and stops.
No approval is inferred.

### Verify, Eval, Review, and Convergence

- **Verify** asks whether the repository is mechanically healthy. It executes
  configured format, lint, build, typecheck, test, dependency, or coverage
  commands from `.sdd/verification.yaml`.
- **Eval** asks whether observable behavior satisfies the approved expectations.
  Each blocking case needs evidence and one of PASS, FAIL, BLOCKED, or
  NOT_APPLICABLE.
- **Review** independently searches for latent bugs, regressions, security and
  architecture problems, poor error handling, races, missing tests, and weak
  Evals outside encoded checks.
- **Convergence** compares policy, promises, Tasks, code, executed evidence, and
  findings. It is the final consistency judgment, not another test suite.

After code changes, Verify and required Evals always run before re-Review.
P0/P1 findings block PR creation. The default autonomous review/fix limit is two
iterations, after which a human gate is persisted.

## Persistent state and resume

Each workflow uses `specs/<correlation>-<slug>/state.json` as authoritative
runtime state (`<issue>-<slug>` for normal Issue work and
`local-<digest>-<slug>` for quoted intent). It tracks correlation, stage,
completed stages, blocks, manual decisions, assumptions, artifact gate statuses,
review iteration, findings, convergence, branch, and real update time. JSON
Schema makes malformed state detectable.

GitHub labels are projections. A transition is always ordered:

```text
execute → validate → persist artifact → persist state.json
        → confirm state → synchronize GitHub label
```

If a terminal restarts or conversation history is lost, `$sdd-run issue #123`
reads state, the bundle and feature indexes, only the relevant stage artifacts,
and current GitHub Issue metadata. It validates state, repairs stale labels from
state, and resumes. Conversation memory is never required.

## Requirement and evidence traceability

For Issue 123, stable identifiers form this chain:

```text
REQ-123-001
  ↓ AC-123-001
  ↓ EVAL-123-001
  ↓ TASK-123-001
  ↓ implementation reference
  ↓ EVIDENCE-123-001
  ↓ FINDING-123-001 (when needed)
  ↓ PR with Closes #123
```

The schemas in `.sdd/schemas/` define state, assumptions, Eval cases/results,
evidence, and review findings. The validator detects common orphaned or uncovered
IDs and blocking Evals without observable oracles.

## OKF progressive disclosure

Codex first reads [`specs/index.md`](specs/index.md), then the relevant feature
`index.md`, then only the concepts needed for the current stage. Reserved feature
indexes contain links and descriptions, not concept frontmatter. Other persistent
concept Markdown begins with YAML frontmatter and a non-empty `type`.

`generated` identifies who produced current content. `verified` is added only
after meaningful independent source confirmation. Neither means a runtime Eval
passed. Runtime evidence lives in `eval-results.md` and
`evidence/manifest.json`.

## GitHub setup

`.github/labels.json` is the canonical label manifest. The bootstrap script uses
`gh label create --force`, so it creates missing labels, updates changed
definitions, and is safe to rerun:

```bash
scripts/github/setup-labels.sh --repo OWNER/REPOSITORY
```

It requires authenticated `gh` and `jq` and fails before mutation when either is
unavailable. Stage repair uses the persisted feature state:

```bash
scripts/github/sync-stage-label.sh 123 specs/123-feature/state.json
```

Use `--dry-run` to inspect the planned projection. See
[`docs/github-issue-workflow.md`](docs/github-issue-workflow.md).

## Configure project Verification

SpecForge does not guess a package manager or build system. Add ordered commands
to `.sdd/verification.yaml`:

```yaml
commands:
  - id: project-tests
    command: ./your-project-test-command
    required: true
    timeout_seconds: 900
```

Only commands actually executed may appear as successful evidence. Keep secrets
out of commands and retained output.

Commands may declare profile applicability. Use targeted package/component
checks for Quick/Component during the loop and full commands for Full or final
CI. Leave the list empty until real React workspace scripts exist.

## Validate this harness

```bash
python3 scripts/sdd/validate.py
python3 scripts/sdd/validate.py --transition review fix
python3 scripts/sdd/validate.py --feature specs/123-feature
bash -n scripts/github/*.sh
```

The validator requires Python 3.11+ and parses Custom Agent TOML, Skill metadata, workflow YAML, JSON
Schemas, label manifest, Issue Forms, workflow references, OKF metadata, feature
indexes, state, evidence, links, and REQ→AC→EVAL→TASK traceability. An illegal
transition returns a non-zero result.

## Adopt and customize

Start with the Constitution and project Verification commands. Then configure
private security reporting, repository ownership/branch protection, evidence
retention, manual Eval environments, and any project-specific policy. Preserve
the authority hierarchy and schemas when extending stages.

Read next:

- [Architecture](docs/architecture.md)
- [Workflow](docs/workflow.md)
- [SDD](docs/sdd.md) and [EDD](docs/edd.md)
- [OKF integration](docs/okf.md)
- [Model routing](docs/model-routing.md)
- [Human escalation](docs/human-escalation.md)
- [Adoption guide](docs/adoption.md)
- [Small end-to-end example](examples/sample-feature/index.md)
