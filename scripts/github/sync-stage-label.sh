#!/usr/bin/env bash
set -euo pipefail

usage() {
  echo "Usage: $0 [--repo OWNER/REPO] [--dry-run] ISSUE STATE_JSON" >&2
}

repo=""
dry_run=false
while (($# > 0)); do
  case "$1" in
    --repo)
      [[ $# -ge 2 ]] || { usage; exit 2; }
      repo="$2"
      shift 2
      ;;
    --dry-run)
      dry_run=true
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    --*)
      usage
      exit 2
      ;;
    *)
      break
      ;;
  esac
done

[[ $# -eq 2 ]] || { usage; exit 2; }
issue="$1"
state_file="$2"

[[ "$issue" =~ ^[0-9]+$ ]] || { echo "error: ISSUE must be a positive integer" >&2; exit 1; }
[[ -s "$state_file" ]] || { echo "error: persisted state file is missing or empty: $state_file" >&2; exit 1; }

for command_name in gh jq; do
  command -v "$command_name" >/dev/null 2>&1 || {
    echo "error: required command '$command_name' was not found" >&2
    exit 1
  }
done

jq -e --argjson issue "$issue" '.issue == $issue and (.current_stage | type == "string" and length > 0) and (.updated_at | type == "string" and length > 0)' "$state_file" >/dev/null || {
  echo "error: state must be persisted, match the Issue, and contain current_stage and updated_at" >&2
  exit 1
}

current_stage="$(jq -r '.current_stage' "$state_file")"
target_label="stage:${current_stage}"
script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
manifest="${script_dir}/../../.github/labels.json"

jq -e --arg label "$target_label" 'any(.[]; .name == $label)' "$manifest" >/dev/null || {
  echo "error: workflow stage '$current_stage' has no canonical label in $manifest" >&2
  exit 1
}

gh auth status >/dev/null 2>&1 || {
  echo "error: GitHub CLI is not authenticated; internal state was not changed" >&2
  exit 1
}

repo_args=()
if [[ -n "$repo" ]]; then
  repo_args=(--repo "$repo")
fi

mapfile -t existing_stage_labels < <(gh issue view "$issue" "${repo_args[@]}" --json labels --jq '.labels[].name | select(startswith("stage:"))')

remove_args=()
target_present=false
for label in "${existing_stage_labels[@]}"; do
  if [[ "$label" == "$target_label" ]]; then
    target_present=true
  else
    remove_args+=(--remove-label "$label")
  fi
done

add_args=()
if [[ "$target_present" == false ]]; then
  add_args=(--add-label "$target_label")
fi

if [[ ${#remove_args[@]} -eq 0 && ${#add_args[@]} -eq 0 ]]; then
  echo "stage label already synchronized: $target_label"
  exit 0
fi

if [[ "$dry_run" == true ]]; then
  echo "would synchronize Issue #${issue} to ${target_label} from persisted state ${state_file}"
  exit 0
fi

gh issue edit "$issue" "${repo_args[@]}" "${remove_args[@]}" "${add_args[@]}" >/dev/null
echo "synchronized Issue #${issue} to ${target_label}"
