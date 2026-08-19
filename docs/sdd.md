# Specification-Driven Development

SDD separates raw intent from approved expected behavior. The Issue explains why
someone wants change; Intake normalizes it; the Specification states what the
system must do; Clarify resolves ambiguity; Plan and Tasks translate approved
behavior into execution.

## Authority

```text
Constitution → Specification → Acceptance Criteria → Eval Contract
             → Plan → Tasks → Implementation
```

If implementation convenience conflicts with expected behavior, implementation
stops. The Orchestrator records the conflict and returns to the earliest artifact
that legitimately owns the decision.

## Stable identifiers

Issue 152 produces identifiers that survive revisions:

- `REQ-152-001` for a significant Requirement
- `AC-152-001` for measurable acceptance behavior
- `EVAL-152-001` for a correctness contract
- `TASK-152-001` for a coherent unit of work
- `EVIDENCE-152-001` for observed proof
- `FINDING-152-001` for an independent review problem

Do not renumber existing IDs because sections move. Add a new sequence or mark a
superseded concept clearly so links and history remain meaningful.

## Writing requirements

A Requirement describes user- or system-observable behavior and its purpose.
Acceptance Criteria are measurable. Include negative, compatibility, security,
performance, accessibility, migration, or observability behavior only when it is
relevant. Avoid prescribing private implementation structure unless that
structure is itself a contract or constraint.

Every significant Requirement needs Acceptance Criteria. Analyze blocks a
Requirement without AC, required Eval coverage, or implementation Task coverage.

## Clarification

AUTO decisions use durable evidence for reversible technical choices. They
record decision, reason, evidence, impact, and source. MANUAL decisions persist a
question, options, consequences, recommendation when appropriate, decision owner,
and blocking stage. Human approval is never inferred from silence or prior
conversation.

## Artifact lifecycle

OKF `status: draft` means the artifact is incomplete or has not passed its gate;
`stable` means it passed and is ready to consume; `deprecated` preserves history
after supersession. Lifecycle is separate from workflow stage. A stable Spec may
be consumed while `state.json.current_stage` is `implement`.
