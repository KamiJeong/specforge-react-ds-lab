#!/usr/bin/env bash
set -euo pipefail

usage() {
  echo "Usage: $0 [--repo OWNER/REPO]" >&2
}

repo=""
while (($# > 0)); do
  case "$1" in
    --repo)
      [[ $# -ge 2 ]] || { usage; exit 2; }
      repo="$2"
      shift 2
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      usage
      exit 2
      ;;
  esac
done

for command_name in gh jq; do
  command -v "$command_name" >/dev/null 2>&1 || {
    echo "error: required command '$command_name' was not found" >&2
    exit 1
  }
done

gh auth status >/dev/null 2>&1 || {
  echo "error: GitHub CLI is not authenticated; run 'gh auth login' first" >&2
  exit 1
}

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
manifest="${script_dir}/../../.github/labels.json"

jq -e 'type == "array" and all(.[]; (.name | type == "string" and length > 0) and (.description | type == "string") and (.color | test("^[0-9A-Fa-f]{6}$")))' "$manifest" >/dev/null || {
  echo "error: invalid label manifest: $manifest" >&2
  exit 1
}

repo_args=()
if [[ -n "$repo" ]]; then
  gh repo view "$repo" >/dev/null 2>&1 || {
    echo "error: cannot access GitHub repository '$repo'" >&2
    exit 1
  }
  repo_args=(--repo "$repo")
else
  gh repo view >/dev/null 2>&1 || {
    echo "error: current directory is not associated with an accessible GitHub repository; pass --repo OWNER/REPO" >&2
    exit 1
  }
fi

while IFS= read -r label; do
  name="$(jq -r '.name' <<<"$label")"
  description="$(jq -r '.description' <<<"$label")"
  color="$(jq -r '.color' <<<"$label")"
  gh label create "$name" --description "$description" --color "$color" --force "${repo_args[@]}" >/dev/null
  echo "synchronized label: $name"
done < <(jq -c '.[]' "$manifest")
