# Eval-Driven Development

SDD defines expected behavior. Eval Design defines how that behavior will be
evaluated. The contract is created before implementation whenever reasonably
possible so correctness cannot be retrofitted to accidental code.

```text
SDD          defines expected behavior
Eval Design  defines how behavior will be evaluated
Verify       checks mechanical repository health
Eval         checks observable behavior
Evidence     records what actually happened
Review       searches outside encoded expectations
Convergence  checks whether implementation and promises agree
```

## Eval Contract

Each `EVAL-<issue>-<sequence>` links Requirements and Acceptance Criteria and
records purpose, preconditions, applicable category, evaluation method,
procedure/command, observable oracle, required evidence, blocking status, and
automation level.

Applicable categories include Static, Unit, Integration, End-to-End, API
Contract, Database, Security, Performance, Accessibility, Visual, Backward
Compatibility, Migration Safety, and Observability. A project uses only the
categories its risk and behavior require.

## Results and evidence

Every Eval result is exactly PASS, FAIL, BLOCKED, or NOT_APPLICABLE. BLOCKED
identifies the unavailable environment/dependency. NOT_APPLICABLE explains why a
previously considered case does not apply. PASS requires sufficient evidence.

Evidence can be test or command output, exit code, API response, database
assertion, browser observation, screenshot, trace, console output, performance or
accessibility measurement, security result, or generated artifact. Its manifest
records stable Evidence ID, Eval ID, type, source, actual procedure, result,
artifact path, revision when practical, actual timestamp, and actor.

Not every binary or temporary artifact must enter Git. Projects choose retention
in `.sdd/evidence.yaml`, including metadata-only, committed, or external artifact
handling. Redaction remains required, and the manifest must not claim evidence
that was not observed or cannot be located.

## Immutability and anti-gaming

After implementation begins, Implementer and Fixer cannot weaken, delete, skip,
or reclassify a blocking Eval to get PASS. They cannot hardcode known fixtures,
mock away evaluated behavior, change evaluation data only to manufacture PASS,
ignore negative cases, treat coverage as correctness, or edit the Spec to match
accidental behavior.

An invalid Eval may be reported. A material contract change records reason,
affected Requirement, old expectation, new expectation, and decision owner, then
routes through Eval Design. Critical or intentional weakening requires human
approval.

## Independence

The Evaluator observes behavior rather than trusting an implementation summary
and normally does not modify production code. The Reviewer receives the policy,
requirements, Eval Contract, Plan, Tasks, diff, and evidence in a fresh read-only
context. Passing Eval does not force Review to pass: tests encode known promises;
Review looks for what those promises and tests missed.
