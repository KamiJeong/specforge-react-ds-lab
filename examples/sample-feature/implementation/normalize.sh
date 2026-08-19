#!/bin/sh
set -eu

input=${1-}
printf '%s' "$input" \
  | LC_ALL=C tr '[:upper:]' '[:lower:]' \
  | sed 's/[^a-z0-9][^a-z0-9]*/-/g; s/^-//; s/-$//'
printf '\n'
