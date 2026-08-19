# SpecForge Agent Instructions

Before workflow work, read `.sdd/constitution.md`, `.sdd/workflow.yaml`, and the
`SKILL.md` for the current stage. Use `.codex/agents/` to select a narrow
execution capability; the primary session remains the Orchestrator.

- Treat `specs/<issue>-<slug>/state.json` and persisted artifacts as workflow
  truth. Conversation history and GitHub labels are projections, not authority.
- Enforce every required gate. Do not implement before Analyze passes, and
  always Verify before Eval.
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
