# SpecForge Agent Instructions

Before workflow work, read `.sdd/constitution.md`, `.sdd/workflow.yaml`, and the
`SKILL.md` for the current stage. Use `.codex/agents/` to select a narrow
execution capability; the primary session remains the Orchestrator.

- Select and persist exactly one `quick`, `component`, or `full` profile.
  Use `component` for ordinary shared design-system components and promote to
  `full` when the workflow's high-risk conditions appear.
- Default to Terra/medium. Use Sol/high only for a bounded condition declared in
  `model_escalation`; an internal component API is not automatically an
  externally published public contract.
- Treat `specs/<issue>-<slug>/state.json` and persisted artifacts as workflow
  truth. Conversation history and GitHub labels are projections, not authority.
- Enforce every gate required by the selected profile. Full does not implement
  before Analyze passes. Compact profiles require an approved Brief before
  implementation and targeted Verify before applicable Eval/Review.
- Never silently change the Specification, Acceptance Criteria, or blocking Eval
  Contract during implementation or remediation.
- Never weaken, delete, skip, or game a blocking Eval to obtain PASS.
- Do not treat Implementer self-review as independent Eval or Review.
- Never fabricate commands, results, timestamps, evidence, provenance, human
  observations, or approvals. Record meaningful automatic assumptions.
- Escalate unresolved product, security, data, public API, authentication,
  authorization, irreversible migration, and Constitution-exception decisions.
- Persist the artifact, then `state.json`, confirm persistence, and only then
  synchronize GitHub labels.
- Update the feature `index.md` when persistent knowledge artifacts change.

All repository commands must follow any environment-level `AGENTS.md`
instructions that are active in the current workspace.
