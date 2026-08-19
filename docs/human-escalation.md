# Human Escalation

SpecForge automates reversible, evidence-backed technical choices and stops for
decisions whose authority belongs to people.

## Required human decisions

Escalate when business behavior or product semantics are ambiguous; security,
authentication, authorization, or sensitive-data boundaries are undefined;
public API behavior changes; an irreversible migration is needed; infrastructure
cost changes materially; a Constitution exception is required; or Acceptance
Criteria/blocking Evals must intentionally weaken or change.

Do not block a human for trivial formatting, local naming, ordinary test
placement, or another reversible choice when repository evidence is sufficient.

## Persistent escalation record

Before stopping, write the question to `state.json.manual_decisions` and the
relevant clarification concept. Include:

- exact question and why it matters
- available options
- recommendation when evidence supports one
- consequences of each meaningful option
- blocking stage
- open status

Set `blocked_stage`, persist a real `updated_at`, validate state, then add
`state:blocked`, `state:needs-info`, and `gate:human-required` as appropriate.
Conversation text alone is not a durable gate.

## Resuming after a decision

Record the actual decision, `human:<id>` actor, and real decision timestamp. Do
not invent an identity or infer approval from silence. Remove external gate/state
labels only after the resolved decision and resulting stage are persisted.

Route to the earliest artifact that owns the decision. A product answer may
require Spec and Eval Design revision; an architecture choice may require Plan;
an external manual environment may simply unblock Verify/Eval.

## Review exhaustion

The default autonomous Review→Fix loop allows two iterations. If P0/P1 remains,
persist a human escalation that lists findings, attempted remediations, current
evidence, options, and consequences. Do not silently start a third autonomous
loop or reclassify severity.
