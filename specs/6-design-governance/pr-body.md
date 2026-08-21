## Issue

Closes #6

## Summary

Adds token-led design governance documentation and a product-neutral Storybook reference composition for the internal React library.

## Validation

- `bun run typecheck` — PASS
- `bun run test` — PASS (27 tests)
- `bun run build` — PASS
- `bun run build-storybook` — PASS
- Package contract and Storybook Chromium checks — PASS
- SpecForge knowledge validation — PASS (719 checks)

## Risk and rollback

This is additive documentation and Storybook reference work with no primitive API redesign. Remove the guides, reference story/style/tests, browser expectations, and documentation links together to roll back.

## Evidence

All blocking EVAL-6-001 through EVAL-6-004 passed with EVIDENCE-6-001 through EVIDENCE-6-020. Independent re-review resolved the discoverability P1; no P0/P1 findings remain.

Artifacts: `specs/6-design-governance/brief.md`, `delivery.md`, and `evidence/manifest.json`.
