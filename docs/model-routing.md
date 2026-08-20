# Model Routing

SpecForge routes by execution capability, not workflow stage count.

| Capability | Model | Reasoning | Sandbox |
| --- | --- | --- | --- |
| Orchestrator | `gpt-5.6-terra` | medium | active session policy |
| Architect | `gpt-5.6-terra` | medium | workspace-write for knowledge artifacts |
| Explorer | `gpt-5.6-terra` | medium | read-only |
| Implementer | `gpt-5.6-terra` | medium | workspace-write |
| Evaluator | `gpt-5.6-terra` | medium | workspace-write for evidence artifacts |
| Reviewer | `gpt-5.6-terra` | medium | read-only |
| Fixer | `gpt-5.6-terra` | medium | workspace-write |
| Utility | `gpt-5.6-luna` | low | workspace-write for deterministic metadata |

These defaults live in `.codex/config.toml` and `.codex/agents/*.toml`. Custom
Agent files contain the required `name`, `description`, and
`developer_instructions` plus explicit model, reasoning, and sandbox defaults.

## Routing policy

Terra/medium is the default for orchestration, compact architecture,
implementation, evaluation, and review. Escalate a bounded decision to Sol/high
for unresolved security/data/migration boundaries, externally published API
breaks, high-impact cross-domain architecture, critical performance/cost,
complex failure analysis, or disputed P0/P1 adjudication. An internal
design-system prop/API is not an external public contract merely because other
files import it. Use Luna for clear, repeatable, low-risk transformations.

Routing is not an authority change. A stronger model cannot waive a gate, make a
human decision, or allow one agent to review its own implementation. Runtime
sandbox/permission choices may override or constrain project defaults; the
Orchestrator must treat inability to preserve independence as a block or disclose
it for adjudication.

## Context isolation

Explorer reports targeted repository evidence. Implementer receives approved
Tasks and relevant contracts. Evaluator receives the Eval Contract and runnable
system, not a demand to validate the implementation story. Reviewer receives a
fresh context containing authoritative artifacts, diff, and evidence; Implementer
self-justification is not authoritative. Quick and Component use one Architect
pass, one Implementer context, targeted Evaluator work, and one independent
Reviewer context to reduce handoff overhead.

Read-heavy work such as repository, security, performance, test, or independent
review dimensions may run in parallel. Writes are normally serialized; parallel
writes require disjoint ownership and low conflict risk.
