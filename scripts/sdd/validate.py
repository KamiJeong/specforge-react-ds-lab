#!/usr/bin/env python3
"""Validate SpecForge's Codex, workflow, GitHub, OKF, and traceability contracts."""

from __future__ import annotations

import argparse
import json
import re
import sys
import tomllib
from dataclasses import dataclass, field
from datetime import datetime
from pathlib import Path
from typing import Any, Iterable

try:
    import yaml
    from jsonschema import Draft202012Validator, FormatChecker, RefResolver
except ImportError as exc:  # pragma: no cover - dependency failure is the behavior
    print(
        "error: validation dependencies are missing; run "
        "'python3 -m pip install -r scripts/sdd/requirements.txt'",
        file=sys.stderr,
    )
    raise SystemExit(2) from exc


ROOT = Path(__file__).resolve().parents[2]
STAGES = {
    "intake",
    "spec",
    "clarify",
    "eval-design",
    "plan",
    "tasks",
    "analyze",
    "implement",
    "verify",
    "eval",
    "review",
    "fix",
    "converge",
    "ready-pr",
}
SKILLS = {
    "sdd-run",
    "sdd-fast",
    "sdd-intake",
    "sdd-spec",
    "sdd-clarify",
    "sdd-eval-design",
    "sdd-plan",
    "sdd-tasks",
    "sdd-knowledge-validate",
    "sdd-analyze",
    "sdd-implement",
    "sdd-verify",
    "sdd-eval",
    "sdd-review",
    "sdd-fix",
    "sdd-converge",
    "sdd-pr",
}
AGENT_ROUTES = {
    "architect": ("gpt-5.6-terra", "medium", "workspace-write"),
    "explorer": ("gpt-5.6-terra", "medium", "read-only"),
    "implementer": ("gpt-5.6-terra", "medium", "workspace-write"),
    "evaluator": ("gpt-5.6-terra", "medium", "workspace-write"),
    "reviewer": ("gpt-5.6-terra", "medium", "read-only"),
    "fixer": ("gpt-5.6-terra", "medium", "workspace-write"),
    "utility": ("gpt-5.6-luna", "low", "workspace-write"),
}
REQUIRED_SKILL_SECTIONS = {
    "Purpose",
    "Trigger",
    "Inputs",
    "Required Artifacts",
    "Preconditions",
    "Procedure",
    "Recommended Agent",
    "Allowed Actions",
    "Forbidden Actions",
    "Outputs",
    "Completion Criteria",
    "Failure Conditions",
    "State Transition",
    "GitHub Label Transition",
    "Human Escalation Conditions",
}
ACTOR = re.compile(
    r"^(?:specforge-[a-z-]+/v[0-9]+|human:[A-Za-z0-9._-]+|process:[A-Za-z0-9._-]+)$"
)
CORRELATION = r"(?:[0-9]+|LOCAL-[A-F0-9]{12})"
FORMAT_CHECKER = FormatChecker()
LINK = re.compile(r"(?<!!)\[[^]]+\]\(([^)]+)\)")
PLACEHOLDER = re.compile(r"\{\{([^}]+)}}")


@dataclass
class Report:
    checks: int = 0
    errors: list[str] = field(default_factory=list)
    warnings: list[str] = field(default_factory=list)

    def check(self, condition: bool, message: str) -> None:
        self.checks += 1
        if not condition:
            self.errors.append(message)

    def error(self, message: str) -> None:
        self.errors.append(message)

    def warn(self, message: str) -> None:
        self.warnings.append(message)


def relative(path: Path) -> str:
    try:
        return str(path.relative_to(ROOT))
    except ValueError:
        return str(path)


def load_json(path: Path, report: Report) -> Any:
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except (OSError, UnicodeError, json.JSONDecodeError) as exc:
        report.error(f"{relative(path)}: invalid JSON: {exc}")
        return None


def load_yaml(path: Path, report: Report) -> Any:
    try:
        return yaml.safe_load(path.read_text(encoding="utf-8"))
    except (OSError, UnicodeError, yaml.YAMLError) as exc:
        report.error(f"{relative(path)}: invalid YAML: {exc}")
        return None


def parse_frontmatter(path: Path, report: Report, template: bool = False) -> tuple[dict[str, Any] | None, str]:
    try:
        text = path.read_text(encoding="utf-8")
    except (OSError, UnicodeError) as exc:
        report.error(f"{relative(path)}: cannot read UTF-8: {exc}")
        return None, ""
    if not text.startswith("---\n"):
        report.error(f"{relative(path)}: concept must start with YAML frontmatter")
        return None, text
    end = text.find("\n---\n", 4)
    if end < 0:
        report.error(f"{relative(path)}: frontmatter has no closing delimiter")
        return None, text
    raw = text[4:end]
    if template:
        def replacement(match: re.Match[str]) -> str:
            key = match.group(1)
            if key == "issue":
                return "42"
            if key == "review_iteration":
                return "1"
            if "at" in key or "timestamp" in key:
                return "2000-01-01T00:00:00Z"
            return "sample"
        raw = PLACEHOLDER.sub(replacement, raw)
    try:
        metadata = yaml.safe_load(raw)
    except yaml.YAMLError as exc:
        report.error(f"{relative(path)}: invalid YAML frontmatter: {exc}")
        return None, text[end + 5 :]
    if not isinstance(metadata, dict):
        report.error(f"{relative(path)}: frontmatter must be a mapping")
        return None, text[end + 5 :]
    return metadata, text[end + 5 :]


def valid_timestamp(value: Any) -> bool:
    if isinstance(value, datetime):
        return value.tzinfo is not None
    if not isinstance(value, str) or not value:
        return False
    try:
        parsed = datetime.fromisoformat(value.replace("Z", "+00:00"))
    except ValueError:
        return False
    return parsed.tzinfo is not None


def validate_agents(report: Report) -> set[str]:
    agents_dir = ROOT / ".codex" / "agents"
    found: set[str] = set()
    for path in sorted(agents_dir.glob("*.toml")):
        try:
            data = tomllib.loads(path.read_text(encoding="utf-8"))
        except (OSError, UnicodeError, tomllib.TOMLDecodeError) as exc:
            report.error(f"{relative(path)}: invalid TOML: {exc}")
            continue
        for key in ("name", "description", "developer_instructions"):
            report.check(isinstance(data.get(key), str) and bool(data[key].strip()), f"{relative(path)}: missing non-empty {key}")
        name = data.get("name")
        if isinstance(name, str):
            found.add(name)
            report.check(path.stem == name, f"{relative(path)}: filename must match agent name '{name}'")
            if name in AGENT_ROUTES:
                model, effort, sandbox = AGENT_ROUTES[name]
                report.check(data.get("model") == model, f"{relative(path)}: expected model {model}")
                report.check(data.get("model_reasoning_effort") == effort, f"{relative(path)}: expected reasoning {effort}")
                report.check(data.get("sandbox_mode") == sandbox, f"{relative(path)}: expected sandbox {sandbox}")
    report.check(found == set(AGENT_ROUTES), f"custom agent set mismatch: found {sorted(found)}")

    config_path = ROOT / ".codex" / "config.toml"
    try:
        config = tomllib.loads(config_path.read_text(encoding="utf-8"))
    except (OSError, UnicodeError, tomllib.TOMLDecodeError) as exc:
        report.error(f"{relative(config_path)}: invalid TOML: {exc}")
        return found
    report.check(config.get("model") == "gpt-5.6-terra", ".codex/config.toml: Orchestrator model must be gpt-5.6-terra")
    report.check(config.get("model_reasoning_effort") == "medium", ".codex/config.toml: Orchestrator reasoning must be medium")
    report.check(config.get("agents", {}).get("enabled") is True, ".codex/config.toml: agents must be enabled")
    return found


def validate_skills(report: Report) -> set[str]:
    skills_dir = ROOT / ".agents" / "skills"
    found: set[str] = set()
    for path in sorted(skills_dir.glob("*/SKILL.md")):
        metadata, body = parse_frontmatter(path, report)
        if metadata is None:
            continue
        name = metadata.get("name")
        description = metadata.get("description")
        report.check(isinstance(name, str) and bool(name), f"{relative(path)}: missing skill name")
        report.check(isinstance(description, str) and bool(description.strip()), f"{relative(path)}: missing skill description")
        if isinstance(name, str):
            found.add(name)
            report.check(path.parent.name == name, f"{relative(path)}: folder must match skill name '{name}'")
            report.check(bool(re.fullmatch(r"[a-z0-9-]{1,63}", name)), f"{relative(path)}: invalid skill name")
        sections = set(re.findall(r"^## (.+?)\s*$", body, flags=re.MULTILINE))
        missing = REQUIRED_SKILL_SECTIONS - sections
        report.check(not missing, f"{relative(path)}: missing sections {sorted(missing)}")
    report.check(found == SKILLS, f"workflow skill set mismatch: found {sorted(found)}")
    return found


def validate_workflow(report: Report, agents: set[str], skills: set[str], transition: tuple[str, str] | None) -> dict[str, Any]:
    path = ROOT / ".sdd" / "workflow.yaml"
    workflow = load_yaml(path, report)
    if not isinstance(workflow, dict):
        return {}
    stage_map = workflow.get("stages", {})
    allowed = workflow.get("allowed_transitions", {})
    profiles = workflow.get("profiles", {})
    report.check(set(stage_map) == STAGES, f"{relative(path)}: stage set mismatch")
    report.check(set(allowed) == STAGES, f"{relative(path)}: transition source set mismatch")
    for stage, targets in allowed.items():
        report.check(isinstance(targets, list), f"{relative(path)}: transitions for {stage} must be a list")
        if isinstance(targets, list):
            for target in targets:
                report.check(target in STAGES, f"{relative(path)}: transition {stage}->{target} targets unknown stage")
    for stage, definition in stage_map.items():
        if not isinstance(definition, dict):
            report.error(f"{relative(path)}: stage {stage} must be a mapping")
            continue
        report.check(definition.get("skill") in skills, f"{relative(path)}: stage {stage} references unknown skill")
        report.check(definition.get("agent") in agents, f"{relative(path)}: stage {stage} references unknown agent")
        for edge_name in ("pass_to", "fail_to"):
            edge = definition.get(edge_name)
            if edge is not None:
                report.check(edge in allowed.get(stage, []), f"{relative(path)}: {stage}.{edge_name}={edge} is not an allowed transition")
    report.check(workflow.get("initial_stage") == "intake", f"{relative(path)}: initial stage must be intake")
    report.check(workflow.get("terminal_stage") == "ready-pr", f"{relative(path)}: terminal stage must be ready-pr")
    report.check(workflow.get("review_iteration_limit") == 2, f"{relative(path)}: review iteration limit must be 2")
    report.check(bool(workflow.get("human_gates")), f"{relative(path)}: human gates missing")
    report.check(bool(workflow.get("pr_readiness_conditions")), f"{relative(path)}: PR readiness conditions missing")
    report.check(set(profiles) == {"quick", "component", "full"}, f"{relative(path)}: profiles must be quick, component, and full")
    for profile, definition in profiles.items():
        if not isinstance(definition, dict):
            report.error(f"{relative(path)}: profile {profile} must be a mapping")
            continue
        route = definition.get("route")
        report.check(isinstance(route, list) and bool(route), f"{relative(path)}: profile {profile} route must be a non-empty list")
        if not isinstance(route, list) or not route:
            continue
        report.check(definition.get("initial_stage") == route[0], f"{relative(path)}: profile {profile} initial_stage must match route")
        report.check(route[-1] == "ready-pr", f"{relative(path)}: profile {profile} must terminate at ready-pr")
        for stage in route:
            report.check(stage in STAGES, f"{relative(path)}: profile {profile} references unknown stage {stage}")
        for source, target in zip(route, route[1:]):
            report.check(target in allowed.get(source, []), f"{relative(path)}: profile {profile} uses illegal transition {source}->{target}")
        retry_route = definition.get("retry_route")
        report.check(isinstance(retry_route, list) and bool(retry_route), f"{relative(path)}: profile {profile} retry_route must be a non-empty list")
        if isinstance(retry_route, list):
            for source, target in zip(retry_route, retry_route[1:]):
                report.check(target in allowed.get(source, []), f"{relative(path)}: profile {profile} uses illegal retry transition {source}->{target}")
    selection = workflow.get("profile_selection", {})
    report.check(selection.get("default") == "component", f"{relative(path)}: profile selection default must be component")
    report.check(bool(selection.get("promote_to_full_when")), f"{relative(path)}: full-promotion conditions missing")
    escalation = workflow.get("model_escalation", {})
    report.check(escalation.get("default") == "gpt-5.6-terra/medium", f"{relative(path)}: default model route must be Terra/medium")
    report.check(bool(escalation.get("use_sol_high_when")), f"{relative(path)}: Sol/high escalation conditions missing")
    reachable = {"intake"}
    frontier = ["intake"]
    while frontier:
        current = frontier.pop()
        for target in allowed.get(current, []):
            if target not in reachable:
                reachable.add(target)
                frontier.append(target)
    report.check(reachable == STAGES, f"{relative(path)}: unreachable stages {sorted(STAGES - reachable)}")
    can_reach_terminal = {"ready-pr"}
    changed = True
    while changed:
        changed = False
        for source, targets in allowed.items():
            if source not in can_reach_terminal and any(target in can_reach_terminal for target in targets):
                can_reach_terminal.add(source)
                changed = True
    report.check(can_reach_terminal == STAGES, f"{relative(path)}: stages without a path to ready-pr {sorted(STAGES - can_reach_terminal)}")
    report.check(allowed.get("ready-pr") == [], f"{relative(path)}: ready-pr must have no forward transition")
    if transition:
        source, target = transition
        if source not in STAGES or target not in STAGES:
            report.error(f"transition uses unknown stage: {source}->{target}")
        elif target not in allowed.get(source, []):
            report.error(f"illegal workflow transition: {source}->{target}")
    return workflow


def schema_store(schemas: dict[Path, Any]) -> dict[str, Any]:
    store: dict[str, Any] = {}
    for path, schema in schemas.items():
        store[path.resolve().as_uri()] = schema
        if isinstance(schema.get("$id"), str):
            store[schema["$id"]] = schema
    return store


def validate_schemas(report: Report) -> tuple[dict[Path, Any], dict[str, Any] | None]:
    schemas: dict[Path, Any] = {}
    for path in sorted((ROOT / ".sdd" / "schemas").glob("*.json")):
        data = load_json(path, report)
        if not isinstance(data, dict):
            continue
        schemas[path] = data
        try:
            Draft202012Validator.check_schema(data)
        except Exception as exc:  # jsonschema exposes several schema exceptions
            report.error(f"{relative(path)}: invalid JSON Schema: {exc}")
    expected = {
        "workflow-state.schema.json",
        "assumption.schema.json",
        "eval-case.schema.json",
        "eval-result.schema.json",
        "evidence.schema.json",
        "review-finding.schema.json",
    }
    report.check({p.name for p in schemas} == expected, "JSON Schema file set mismatch")
    if not schemas:
        return schemas, None
    try:
        return schemas, schema_store(schemas)
    except Exception as exc:
        report.error(f"could not build local JSON Schema registry: {exc}")
        return schemas, None


def validate_state(path: Path, report: Report, schemas: dict[Path, Any], store: dict[str, Any] | None) -> None:
    state = load_json(path, report)
    schema_path = ROOT / ".sdd" / "schemas" / "workflow-state.schema.json"
    if not isinstance(state, dict) or schema_path not in schemas or store is None:
        return
    resolver = RefResolver.from_schema(schemas[schema_path], store=store)
    validator = Draft202012Validator(schemas[schema_path], resolver=resolver, format_checker=FORMAT_CHECKER)
    for error in sorted(validator.iter_errors(state), key=lambda item: list(item.path)):
        location = ".".join(str(part) for part in error.path) or "<root>"
        report.error(f"{relative(path)}:{location}: {error.message}")
    if isinstance(state.get("issue"), int):
        report.check(state.get("correlation_id") == str(state["issue"]), f"{relative(path)}: Issue workflow correlation_id must equal issue number")
    if state.get("current_stage") == "ready-pr":
        profile = state.get("profile", "full")
        report.check(state.get("spec_status") == "approved", f"{relative(path)}: ready-pr requires approved Spec")
        report.check(state.get("implementation_status") in {"complete", "not_applicable"}, f"{relative(path)}: ready-pr requires complete implementation or an explicit spike exception")
        report.check(state.get("verification_status") in {"pass", "not_applicable"}, f"{relative(path)}: ready-pr requires passing Verification or an explicit spike exception")
        if profile == "quick":
            report.check(state.get("eval_design_status") == "not_applicable", f"{relative(path)}: quick ready-pr requires Eval Design not_applicable")
            report.check(state.get("analysis_status") == "not_applicable", f"{relative(path)}: quick ready-pr requires Analyze not_applicable")
            report.check(state.get("eval_status") == "not_applicable", f"{relative(path)}: quick ready-pr requires Eval not_applicable")
            report.check(state.get("convergence_status") == "not_applicable", f"{relative(path)}: quick ready-pr requires Convergence not_applicable")
        elif profile == "component":
            report.check(state.get("eval_design_status") == "approved", f"{relative(path)}: component ready-pr requires approved Eval Design in Brief")
            report.check(state.get("analysis_status") == "not_applicable", f"{relative(path)}: component ready-pr requires Analyze not_applicable")
            report.check(state.get("eval_status") == "pass", f"{relative(path)}: component ready-pr requires passing Evals")
            report.check(state.get("convergence_status") == "not_applicable", f"{relative(path)}: component ready-pr requires Convergence not_applicable")
        else:
            report.check(state.get("eval_design_status") == "approved", f"{relative(path)}: full ready-pr requires approved Eval Design")
            report.check(state.get("analysis_status") == "pass", f"{relative(path)}: full ready-pr requires passing Analyze")
            report.check(state.get("eval_status") == "pass", f"{relative(path)}: full ready-pr requires passing Evals")
            report.check(state.get("convergence_status") == "pass", f"{relative(path)}: full ready-pr requires passing Convergence")
        report.check(state.get("blocked_stage") is None, f"{relative(path)}: ready-pr cannot remain blocked")
        report.check(not any(decision.get("status") == "open" for decision in state.get("manual_decisions", []) if isinstance(decision, dict)), f"{relative(path)}: ready-pr cannot have an open manual decision")
        report.check(not any(finding.get("severity") in {"P0", "P1"} and finding.get("status") in {"open", "accepted"} for finding in state.get("open_findings", []) if isinstance(finding, dict)), f"{relative(path)}: ready-pr cannot have open P0/P1 findings")


def validate_labels_and_forms(report: Report, workflow: dict[str, Any]) -> None:
    manifest_path = ROOT / ".github" / "labels.json"
    manifest = load_json(manifest_path, report)
    if not isinstance(manifest, list):
        return
    labels: set[str] = set()
    for index, entry in enumerate(manifest):
        if not isinstance(entry, dict):
            report.error(f"{relative(manifest_path)}[{index}]: label must be an object")
            continue
        name, description, color = entry.get("name"), entry.get("description"), entry.get("color")
        report.check(isinstance(name, str) and bool(name), f"{relative(manifest_path)}[{index}]: invalid name")
        report.check(isinstance(description, str), f"{relative(manifest_path)}[{index}]: invalid description")
        report.check(isinstance(color, str) and bool(re.fullmatch(r"[0-9A-Fa-f]{6}", color)), f"{relative(manifest_path)}[{index}]: invalid color")
        if isinstance(name, str):
            report.check(name not in labels, f"{relative(manifest_path)}: duplicate label {name}")
            labels.add(name)

    expected_types = {"type:feature", "type:bug", "type:refactor", "type:tech-debt", "type:chore", "type:docs", "type:spike"}
    expected_priorities = {f"priority:p{i}" for i in range(4)}
    expected_profiles = {"workflow:quick", "workflow:component", "workflow:full"}
    expected_states = {"state:blocked", "state:needs-info", "gate:human-required", "gate:manual-eval"}
    expected_risks = {"risk:security", "risk:data", "risk:api", "risk:migration", "risk:performance", "risk:accessibility"}
    expected_stages = {f"stage:{stage}" for stage in STAGES}
    for group in (expected_types, expected_priorities, expected_profiles, expected_states, expected_risks, expected_stages):
        report.check(group <= labels, f"{relative(manifest_path)}: missing labels {sorted(group - labels)}")

    config = load_yaml(ROOT / ".github" / "ISSUE_TEMPLATE" / "config.yml", report)
    report.check(isinstance(config, dict) and config.get("blank_issues_enabled") is False, "Issue template config must disable blank issues")
    for path in sorted((ROOT / ".github" / "ISSUE_TEMPLATE").glob("*.yml")):
        if path.name == "config.yml":
            continue
        form = load_yaml(path, report)
        if not isinstance(form, dict):
            continue
        report.check(isinstance(form.get("body"), list) and bool(form["body"]), f"{relative(path)}: body is required")
        for label in form.get("labels", []):
            report.check(label in labels, f"{relative(path)}: references undefined label {label}")
    if workflow:
        report.check({f"stage:{stage}" for stage in workflow.get("stages", {})} <= labels, "workflow contains a stage without a label")


def validate_concept_metadata(path: Path, metadata: dict[str, Any], report: Report) -> None:
    report.check(isinstance(metadata.get("type"), str) and bool(metadata["type"].strip()), f"{relative(path)}: non-empty type is required")
    if "status" in metadata:
        report.check(metadata["status"] in {"draft", "stable", "deprecated"}, f"{relative(path)}: invalid OKF status")
    generated = metadata.get("generated")
    if generated is not None:
        report.check(isinstance(generated, dict), f"{relative(path)}: generated must be a mapping")
        if isinstance(generated, dict):
            report.check(bool(ACTOR.fullmatch(str(generated.get("by", "")))), f"{relative(path)}: invalid generated.by actor")
            report.check(valid_timestamp(generated.get("at")), f"{relative(path)}: invalid generated.at timestamp")
    verified = metadata.get("verified")
    if verified is not None:
        report.check(isinstance(verified, list), f"{relative(path)}: verified must be a list")
        if isinstance(verified, list):
            for index, entry in enumerate(verified):
                report.check(isinstance(entry, dict), f"{relative(path)}: verified[{index}] must be a mapping")
                if isinstance(entry, dict):
                    report.check(bool(ACTOR.fullmatch(str(entry.get("by", "")))), f"{relative(path)}: invalid verified actor")
                    report.check(valid_timestamp(entry.get("at")), f"{relative(path)}: invalid verified timestamp")
    sources = metadata.get("sources")
    if sources is not None:
        report.check(isinstance(sources, list), f"{relative(path)}: sources must be a list")
        if isinstance(sources, list):
            for index, source in enumerate(sources):
                report.check(isinstance(source, dict) and isinstance(source.get("resource"), str) and bool(source["resource"]), f"{relative(path)}: sources[{index}].resource is required")


def inspect_links(path: Path, body: str, report: Report) -> None:
    for raw_target in LINK.findall(body):
        target = raw_target.strip().split()[0].strip("<>")
        if not target or target.startswith(("#", "http://", "https://", "mailto:")):
            continue
        file_part = target.split("#", 1)[0]
        if file_part and not (path.parent / file_part).resolve().exists():
            report.warn(f"{relative(path)}: unresolved link {target}")


def sections(text: str, prefix: str) -> dict[str, str]:
    pattern = re.compile(rf"^#{{2,6}}\s+({prefix}-{CORRELATION}-[0-9]{{3,}})\b.*$", re.MULTILINE)
    matches = list(pattern.finditer(text))
    result: dict[str, str] = {}
    for index, match in enumerate(matches):
        end = matches[index + 1].start() if index + 1 < len(matches) else len(text)
        result[match.group(1)] = text[match.start():end]
    return result


def validate_traceability(feature: Path, report: Report, schemas: dict[Path, Any], store: dict[str, Any] | None) -> None:
    brief_path = feature / "brief.md"
    if brief_path.exists():
        brief = brief_path.read_text(encoding="utf-8")
        req_sections = sections(brief, "REQ")
        ac_ids = set(re.findall(rf"\bAC-{CORRELATION}-[0-9]{{3,}}\b", brief))
        eval_sections = sections(brief, "EVAL")
        task_sections = sections(brief, "TASK")
        report.check(bool(req_sections), f"{relative(brief_path)}: no Requirements found")
        report.check(bool(ac_ids), f"{relative(brief_path)}: no Acceptance Criteria found")
        report.check(bool(eval_sections), f"{relative(brief_path)}: no Evals found")
        report.check(bool(task_sections), f"{relative(brief_path)}: no Tasks found")
        for req_id, content in req_sections.items():
            report.check(bool(re.search(rf"\bAC-{CORRELATION}-[0-9]{{3,}}\b", content)), f"{relative(brief_path)}: {req_id} has no Acceptance Criterion")
        for eval_id, content in eval_sections.items():
            refs = set(re.findall(rf"\bREQ-{CORRELATION}-[0-9]{{3,}}\b", content))
            criteria = set(re.findall(rf"\bAC-{CORRELATION}-[0-9]{{3,}}\b", content))
            report.check(bool(refs), f"{relative(brief_path)}: {eval_id} has no Requirement")
            report.check(bool(criteria), f"{relative(brief_path)}: {eval_id} has no Acceptance Criterion")
            report.check(refs <= set(req_sections), f"{relative(brief_path)}: {eval_id} references unknown Requirements")
            report.check(criteria <= ac_ids, f"{relative(brief_path)}: {eval_id} references unknown Acceptance Criteria")
        for task_id, content in task_sections.items():
            refs = set(re.findall(rf"\bREQ-{CORRELATION}-[0-9]{{3,}}\b", content))
            eval_refs = set(re.findall(rf"\bEVAL-{CORRELATION}-[0-9]{{3,}}\b", content))
            report.check(bool(refs), f"{relative(brief_path)}: {task_id} has no Requirement")
            report.check(bool(eval_refs), f"{relative(brief_path)}: {task_id} has no Eval")
            report.check(refs <= set(req_sections), f"{relative(brief_path)}: {task_id} references unknown Requirements")
            report.check(eval_refs <= set(eval_sections), f"{relative(brief_path)}: {task_id} references unknown Evals")
        return
    spec_path = feature / "spec.md"
    evals_path = feature / "evals.md"
    tasks_path = feature / "tasks.md"
    if not (spec_path.exists() and evals_path.exists() and tasks_path.exists()):
        return
    spec = spec_path.read_text(encoding="utf-8")
    evals = evals_path.read_text(encoding="utf-8")
    tasks = tasks_path.read_text(encoding="utf-8")
    req_sections = sections(spec, "REQ")
    ac_ids = set(re.findall(rf"\bAC-{CORRELATION}-[0-9]{{3,}}\b", spec))
    eval_sections = sections(evals, "EVAL")
    task_sections = sections(tasks, "TASK")
    report.check(bool(req_sections), f"{relative(spec_path)}: no Requirements found")
    for req_id, content in req_sections.items():
        report.check(bool(re.search(rf"\bAC-{CORRELATION}-[0-9]{{3,}}\b", content)), f"{relative(spec_path)}: {req_id} has no Acceptance Criterion")
    covered_ac: set[str] = set()
    covered_req_by_eval: set[str] = set()
    for eval_id, content in eval_sections.items():
        refs = set(re.findall(rf"\bREQ-{CORRELATION}-[0-9]{{3,}}\b", content))
        criteria = set(re.findall(rf"\bAC-{CORRELATION}-[0-9]{{3,}}\b", content))
        report.check(bool(refs), f"{relative(evals_path)}: {eval_id} has no Requirement")
        report.check(bool(criteria), f"{relative(evals_path)}: {eval_id} has no Acceptance Criterion")
        report.check(refs <= set(req_sections), f"{relative(evals_path)}: {eval_id} references unknown Requirements {sorted(refs - set(req_sections))}")
        report.check(criteria <= ac_ids, f"{relative(evals_path)}: {eval_id} references unknown Acceptance Criteria {sorted(criteria - ac_ids)}")
        if "**Blocking:** true" in content:
            report.check("Oracle" in content or "Expected Result" in content, f"{relative(evals_path)}: blocking {eval_id} lacks an observable oracle")
        covered_ac |= criteria
        covered_req_by_eval |= refs
    report.check(ac_ids <= covered_ac, f"{relative(evals_path)}: Acceptance Criteria without Eval {sorted(ac_ids - covered_ac)}")
    covered_req_by_task: set[str] = set()
    for task_id, content in task_sections.items():
        refs = set(re.findall(rf"\bREQ-{CORRELATION}-[0-9]{{3,}}\b", content))
        eval_refs = set(re.findall(rf"\bEVAL-{CORRELATION}-[0-9]{{3,}}\b", content))
        report.check(bool(refs), f"{relative(tasks_path)}: {task_id} has no Requirement")
        report.check(refs <= set(req_sections), f"{relative(tasks_path)}: {task_id} references unknown Requirements {sorted(refs - set(req_sections))}")
        report.check(eval_refs <= set(eval_sections), f"{relative(tasks_path)}: {task_id} references unknown Evals {sorted(eval_refs - set(eval_sections))}")
        covered_req_by_task |= refs
    report.check(set(req_sections) <= covered_req_by_eval, f"{relative(evals_path)}: Requirements without Eval {sorted(set(req_sections) - covered_req_by_eval)}")
    report.check(set(req_sections) <= covered_req_by_task, f"{relative(tasks_path)}: Requirements without Task {sorted(set(req_sections) - covered_req_by_task)}")

    manifest_path = feature / "evidence" / "manifest.json"
    results_path = feature / "eval-results.md"
    if manifest_path.exists():
        manifest = load_json(manifest_path, report)
        evidence_schema = schemas.get(ROOT / ".sdd" / "schemas" / "evidence.schema.json")
        evidence_ids: set[str] = set()
        if isinstance(manifest, dict) and isinstance(manifest.get("evidence"), list):
            for entry in manifest["evidence"]:
                if evidence_schema is not None and store is not None:
                    resolver = RefResolver.from_schema(evidence_schema, store=store)
                    validator = Draft202012Validator(evidence_schema, resolver=resolver, format_checker=FORMAT_CHECKER)
                    for error in validator.iter_errors(entry):
                        report.error(f"{relative(manifest_path)}: invalid evidence: {error.message}")
                if isinstance(entry, dict):
                    evidence_ids.add(str(entry.get("id", "")))
                    report.check(entry.get("eval_id") in eval_sections, f"{relative(manifest_path)}: evidence references unknown Eval {entry.get('eval_id')}")
        else:
            report.error(f"{relative(manifest_path)}: manifest must contain an evidence array")
        if results_path.exists():
            results = results_path.read_text(encoding="utf-8")
            referenced = set(re.findall(rf"\bEVIDENCE-{CORRELATION}-[0-9]{{3,}}\b", results))
            report.check(referenced <= evidence_ids, f"{relative(results_path)}: references missing evidence {sorted(referenced - evidence_ids)}")
            evidenced_evals = {
                str(entry.get("eval_id"))
                for entry in manifest.get("evidence", [])
                if isinstance(entry, dict) and entry.get("result") == "PASS"
            } if isinstance(manifest, dict) else set()
            for eval_id, content in eval_sections.items():
                if "**Blocking:** true" in content:
                    report.check(eval_id in results and "PASS" in sections(results, "EVAL").get(eval_id, ""), f"{relative(results_path)}: blocking {eval_id} has no PASS result")
                    report.check(eval_id in evidenced_evals, f"{relative(manifest_path)}: blocking {eval_id} has no PASS evidence")


def validate_okf(report: Report, feature_arg: Path | None, schemas: dict[Path, Any], store: dict[str, Any] | None) -> None:
    root_index = ROOT / "specs" / "index.md"
    metadata, body = parse_frontmatter(root_index, report)
    if metadata is not None:
        report.check(metadata == {"okf_version": "0.2"}, f"{relative(root_index)}: frontmatter must contain only okf_version 0.2")
        inspect_links(root_index, body, report)

    feature_dirs = []
    if feature_arg is not None:
        feature_dirs = [feature_arg]
    elif (ROOT / "specs").exists():
        feature_dirs = [path for path in sorted((ROOT / "specs").iterdir()) if path.is_dir()]
    example = ROOT / "examples" / "sample-feature"
    if feature_arg is None and example.exists():
        feature_dirs.append(example)

    for feature in feature_dirs:
        index = feature / "index.md"
        report.check(index.exists(), f"{relative(feature)}: feature index.md is required")
        if index.exists():
            text = index.read_text(encoding="utf-8")
            report.check(not text.startswith("---\n"), f"{relative(index)}: feature index must not have frontmatter")
            report.check(bool(LINK.search(text)), f"{relative(index)}: feature index must contain discovery links")
            inspect_links(index, text, report)
        for path in sorted(feature.glob("*.md")):
            if path.name in {"index.md", "README.md"}:
                continue
            metadata, concept_body = parse_frontmatter(path, report)
            if metadata is not None:
                validate_concept_metadata(path, metadata, report)
                report.check(bool(concept_body.strip()), f"{relative(path)}: concept body must not be empty")
                inspect_links(path, concept_body, report)
        state_path = feature / "state.json"
        if state_path.exists():
            validate_state(state_path, report, schemas, store)
        validate_traceability(feature, report, schemas, store)

    for template in sorted((ROOT / ".sdd" / "templates").glob("*.md")):
        metadata, body = parse_frontmatter(template, report, template=True)
        if metadata is not None:
            validate_concept_metadata(template, metadata, report)
            report.check(bool(body.strip()), f"{relative(template)}: template body must not be empty")


def validate_scripts(report: Report) -> None:
    setup = ROOT / "scripts" / "github" / "setup-labels.sh"
    sync = ROOT / "scripts" / "github" / "sync-stage-label.sh"
    for path in (setup, sync, Path(__file__)):
        report.check(path.exists(), f"{relative(path)}: required script missing")
        if path.exists():
            report.check(bool(path.stat().st_mode & 0o111), f"{relative(path)}: script is not executable")
    if sync.exists():
        text = sync.read_text(encoding="utf-8")
        report.check("state_file" in text and "current_stage" in text, f"{relative(sync)}: does not read persisted state")
        report.check("gh issue edit" in text, f"{relative(sync)}: does not synchronize GitHub")
        report.check("state.json" not in text or "jq" in text, f"{relative(sync)}: state confirmation missing")
        report.check(not re.search(r">\s*\"?\$\{?state_file", text), f"{relative(sync)}: must never write workflow state")
    if setup.exists():
        text = setup.read_text(encoding="utf-8")
        report.check(".github/labels.json" in text, f"{relative(setup)}: must read the canonical manifest")
        report.check("gh auth status" in text, f"{relative(setup)}: must fail clearly before unauthenticated mutation")
        report.check("gh label create" in text and "--force" in text, f"{relative(setup)}: label synchronization must be idempotent")


def validate_docs(report: Report) -> None:
    required = {
        "architecture.md",
        "workflow.md",
        "sdd.md",
        "edd.md",
        "okf.md",
        "github-issue-workflow.md",
        "model-routing.md",
        "human-escalation.md",
        "adoption.md",
    }
    found = {path.name for path in (ROOT / "docs").glob("*.md")}
    report.check(required <= found, f"docs missing {sorted(required - found)}")
    report.check((ROOT / "README.md").exists(), "README.md is required")
    report.check((ROOT / "SECURITY.md").exists(), "SECURITY.md is required")
    report.check((ROOT / ".github" / "PULL_REQUEST_TEMPLATE.md").exists(), "PR template is required")
    link_docs = [ROOT / "README.md", ROOT / "SECURITY.md", ROOT / "AGENTS.md", ROOT / "specs" / "README.md"]
    link_docs.extend(sorted((ROOT / "docs").glob("*.md")))
    for path in link_docs:
        if path.exists():
            inspect_links(path, path.read_text(encoding="utf-8"), report)


def validate_runtime_configuration(report: Report) -> None:
    verification = load_yaml(ROOT / ".sdd" / "verification.yaml", report)
    report.check(isinstance(verification, dict) and isinstance(verification.get("commands"), list), ".sdd/verification.yaml: commands must be a list")
    evidence = load_yaml(ROOT / ".sdd" / "evidence.yaml", report)
    if not isinstance(evidence, dict):
        return
    report.check(evidence.get("manifest", {}).get("commit") in {True, False}, ".sdd/evidence.yaml: manifest.commit must be boolean")
    report.check(evidence.get("artifacts", {}).get("default") in {"metadata-only", "commit", "external"}, ".sdd/evidence.yaml: invalid artifacts.default")
    report.check(evidence.get("redaction", {}).get("required") is True, ".sdd/evidence.yaml: evidence redaction must remain required")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--feature", type=Path, help="Validate one specs/<issue>-<slug> directory in addition to core contracts")
    parser.add_argument("--transition", nargs=2, metavar=("FROM", "TO"), help="Validate one requested state transition")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    feature = args.feature
    if feature is not None and not feature.is_absolute():
        feature = (ROOT / feature).resolve()
    report = Report()
    agents = validate_agents(report)
    skills = validate_skills(report)
    workflow = validate_workflow(report, agents, skills, tuple(args.transition) if args.transition else None)
    schemas, store = validate_schemas(report)
    validate_labels_and_forms(report, workflow)
    validate_okf(report, feature, schemas, store)
    validate_scripts(report)
    validate_docs(report)
    validate_runtime_configuration(report)

    for warning in report.warnings:
        print(f"warning: {warning}")
    for error in report.errors:
        print(f"error: {error}", file=sys.stderr)
    if report.errors:
        print(f"SpecForge validation FAILED: {len(report.errors)} error(s), {len(report.warnings)} warning(s), {report.checks} checks", file=sys.stderr)
        return 1
    print(f"SpecForge validation PASS: {report.checks} checks, {len(report.warnings)} warning(s)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
