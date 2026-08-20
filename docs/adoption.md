# Adoption Guide

## 1. Create and trust the project

Create a repository from the SpecForge template, inspect the initial tree, and
trust the project in Codex so project-scoped `.codex/config.toml`, Custom Agents,
and `.agents/skills/` load.

## 2. Customize policy first

Review `.sdd/constitution.md` with project owners. Add real project expectations
for security, data classification, compatibility, performance budgets,
accessibility standards, dependency policy, documentation, human approvals, and
evidence retention. Preserve the authority hierarchy and evidence rules.

Configure private vulnerability reporting and replace the generic instructions
in `SECURITY.md` with the repository's real private contact/channel before public
launch.

Review `.sdd/evidence.yaml` and choose whether text/binary artifacts are committed,
metadata-only, or retained in an external store. Keep redaction mandatory and
document how an evaluator can locate externally retained evidence.

## 3. Configure mechanical Verification

Add ordered, project-native commands to `.sdd/verification.yaml`. SpecForge does
not infer npm, Maven, Cargo, Python, or any other ecosystem. Mark each command
required or optional and set reasonable timeouts. Commands must be safe for the
evaluation environment and must not expose secrets in retained output.

Configure commands by profile once project scripts exist. Quick and Component
should use targeted changed-package or component checks during the development
loop; Full should execute every required project check. Keep the command list
empty rather than inventing npm/pnpm commands before the React workspace exists.

## 4. Bootstrap GitHub metadata

Authenticate GitHub CLI, install `jq`, and run:

```bash
scripts/github/setup-labels.sh --repo OWNER/REPOSITORY
```

Enable desired branch protection, required checks, ownership rules, and private
vulnerability reporting separately; SpecForge does not infer repository admin
policy.

## 5. Validate the template

Install tooling-only validator dependencies:

```bash
python3 -m pip install -r scripts/sdd/requirements.txt
python3 scripts/sdd/validate.py
bash -n scripts/github/*.sh
```

The Python dependency is for repository governance tooling only and does not
constrain the application's language or runtime.

## 6. Start an Issue workflow

Open an Issue with the appropriate form, apply risk and priority labels as known,
then run:

```text
$sdd-run issue #123
```

Choose a profile explicitly when useful:

```text
$sdd-run issue #123 --profile quick
$sdd-run issue #124 --profile component
$sdd-run issue #125 --profile full
```

Ordinary shared design-system components default to Component. Authentication,
security/data boundaries, migrations, externally published API breaks,
cross-boundary architecture, and critical performance/cost promote to Full.

The first run creates `specs/123-<slug>/` progressively. Do not pre-create empty
stage artifacts. Resume later with the same command; persisted state and
knowledge, not the previous chat, control the next action.

## Project extension points

- Constitution: organization/project policy
- `.sdd/verification.yaml`: commands and timeouts
- Eval Contract: project-specific evaluation methods and environments
- Evidence retention: what generated files are committed or stored externally
- Skills: additional focused stages/checks that preserve state and authority
- Custom Agents: project-specific capabilities with explicit sandbox boundaries
- JSON Schemas: additive compatible metadata, versioned when contracts break
- GitHub automation: CI may run the validator or project checks without becoming
  the source of workflow state

When adding a stage, update workflow stages, allowed transitions, labels when it
needs a GitHub projection, Skills, documentation, and validation expectations as
one coherent change.

## Suggested V2 directions

V2 may add an external orchestrator or Agents SDK adapter, richer atomic state
transactions, signed/remote evidence storage, CI annotations, policy-as-code for
manual gates, multi-repository correlation, and metrics. Those systems should
consume the existing Specification, Eval, evidence, finding, state, and OKF
contracts rather than replacing them.
