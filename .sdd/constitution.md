# SpecForge Constitution

This Constitution is the highest authority for SpecForge-managed delivery. It
is intentionally framework-, language-, runtime-, and architecture-neutral.
Projects adopting SpecForge should customize the policy deliberately before
running production work.

## Authority and conflict handling

The authority order is:

1. Constitution
2. Specification
3. Acceptance Criteria
4. Eval Contract
5. Plan
6. Tasks
7. Implementation

A lower-level artifact must not silently override a higher-level artifact. On a
material conflict, stop the active stage, persist the conflict and its source,
return control to the Orchestrator, and route to the earliest stage that owns the
decision. Critical ambiguity requires human escalation.

## Code quality

Changes must be understandable, maintainable, cohesive, and scoped to approved
Tasks. Prefer explicit behavior and stable interfaces over cleverness. Handle
errors intentionally, remove temporary scaffolding before convergence, and keep
tests readable enough to serve as executable behavioral documentation.

## Architecture

Implementation must follow the approved Specification and Plan. Preserve
existing architectural boundaries unless the approved work explicitly changes
them. New coupling, shared state, public contracts, persistence models, and
irreversible decisions require analysis proportional to their impact. Record
material deviations; do not normalize accidental implementation into policy.

## Testing

Tests must cover behavior and meaningful failure modes at the lowest useful
level. A passing test suite is necessary when required, but is not by itself
proof of acceptance. Tests must not mock away the behavior they claim to prove,
hardcode answers for known fixtures, or use coverage percentage as a substitute
for correctness.

## Evaluation

Design blocking Evals before implementation whenever reasonably possible. Each
blocking Eval needs an observable oracle and required evidence. No blocking Eval
may be weakened, deleted, skipped, or reclassified merely to obtain PASS. An
incorrect Eval must use the formal modification path with old and new
expectations, affected requirements, reason, and decision owner. Evaluator
independence must be preserved where practical.

## Security

Use least privilege, validate trust boundaries, protect credentials and
sensitive data, and avoid insecure defaults. Undefined authentication,
authorization, cryptography, vulnerability disclosure, sensitive-data, or
security-boundary decisions require human escalation. Never put vulnerability
details into ordinary public issue workflows.

## Performance

Meet explicit performance budgets and avoid material regressions in affected
paths. Measure when performance is a requirement; do not infer performance from
code shape. Plans for high-impact changes must identify load assumptions,
resource risks, and rollback or containment options.

## Accessibility

User-facing behavior must preserve applicable accessibility semantics, keyboard
operation, focus behavior, readable contrast, motion preferences, and assistive
technology compatibility. Accessibility requirements need observable Evals when
the changed surface makes them relevant.

## Backward compatibility

Preserve documented and relied-upon behavior unless the Specification explicitly
authorizes a break. Public APIs, schemas, serialized data, migrations, CLI
contracts, and integration events require compatibility analysis and, when
applicable, migration and rollback evidence.

## Dependency management

Add or update dependencies only for a justified capability. Consider license,
security, maintenance, size, portability, lockfiles, and transitive impact.
Avoid ecosystem assumptions in shared SpecForge policy and tooling.

## Observability

Changes must retain enough signals to diagnose important failures without
exposing secrets or sensitive data. When behavior depends on logs, metrics,
traces, or audit records, specify and evaluate the observable contract.

## Documentation

Update user, operator, API, architecture, and workflow documentation when their
truth changes. Persistent SDD/EDD artifacts are product knowledge, not disposable
prompts. Links, status, provenance, and traceability must remain useful.

## AI development rules

- The Issue is raw intent, not the final Specification.
- Never implement before required gates pass.
- Never silently modify higher-authority artifacts from an implementation stage.
- Always Verify before Eval and run every required Eval before completion.
- Never treat Implementer self-review as independent Review.
- Use persistent artifacts instead of conversation memory as workflow truth.
- Record meaningful automatic assumptions with reason, evidence, impact, and
  source. Do not invent confidence scores.
- Escalate when evidence cannot safely resolve a critical ambiguity.

## Human approval boundaries

No human approval may be inferred. Human decisions are required for ambiguous
business behavior, product semantics, authentication or authorization, security
boundaries, sensitive-data handling, public API breaks, irreversible migrations,
significant infrastructure cost, Constitution exceptions, and intentional
weakening of Acceptance Criteria or blocking Evals. Persist the exact question,
options, consequences, recommendation when appropriate, and blocking stage.

## Evidence integrity

No evidence may be fabricated. No verification result may be claimed without
successful execution. Evidence must identify the Eval, source or procedure,
result, time actually observed, and artifact or revision when practical.
`BLOCKED` is correct when the environment or dependency prevents observation.
Generated content is not independently verified merely because generation
succeeded.

## Independence

Evaluator and Reviewer conclusions must be based on observed behavior and the
authoritative artifacts, not Implementer assertions. The Evaluator normally does
not modify production implementation. The Reviewer remains read-only and uses
separate context from the Implementer. Fixes require re-Verification, re-Eval,
and re-Review.

## Knowledge integrity

The `specs/` tree is an OKF v0.2 Knowledge Bundle. Preserve stable IDs,
provenance, lifecycle status, cross-links, and feature indexes. Do not fabricate
sources, actors, verification, timestamps, or human identity. `OKF verified`
means a document was checked against a source; Eval Evidence proves observed
software behavior. These meanings must not be conflated.

## Completion

Code existing is not completion. A normal implementation is complete only when
the Specification and clarification gates pass; Eval Design, Plan, Tasks, and
Analyze are valid; implementation is complete; Verification passes; all blocking
Evals pass with evidence; no P0 or P1 Review Findings remain; Convergence passes;
and final knowledge validation is sufficient for PR creation.
