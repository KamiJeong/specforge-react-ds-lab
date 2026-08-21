# Design foundation

The internal `@specforge/react-library` is the source of truth for visual
foundations. Reuse the `--sf-*` custom properties in
`packages/react-library/src/tokens.css` and the existing `Button`, `Text`,
`List`, `Table`, `Form`, `Field`, `Label`, `Select`, and `Switch` primitives.
Do not introduce a parallel token scale for a local screen or component.

## Product-neutral direction

Design work screens for calm, medium-density task completion. Information
importance determines hierarchy: use `Text` size and weight deliberately,
with a page title only as prominent as the task warrants. Use
`--sf-color-text` for ordinary content, `--sf-color-text-muted` for supporting
content, `--sf-color-danger` and `--sf-color-danger-surface` only for errors,
and the action color tokens for meaningful actions. This is direction, not a
claim of measured WCAG conformance; applicable user-facing outcomes target
WCAG 2.2 AA.

Use the 4px cadence `--sf-space-1` through `--sf-space-4` for component and
section spacing. Match controls to the existing `--sf-control-height-sm`,
`--sf-control-height-md`, and `--sf-control-height-lg` sizes, and retain
`--sf-radius-control`, `--sf-color-border`, and the surface tokens for their
intended roles. Prefer a page surface with separated sections over a stack of
floating cards. Elevation is exceptional and must communicate a real layer,
not decoration.

Existing hover, active, disabled, focus-visible, forced-colors, and
reduced-motion behavior belongs to the primitives. Reuse it rather than
recreating state styles. At narrow widths, preserve source order, readable
labels, and usable controls: desktop-first layouts may reduce columns or wrap
actions, but must not hide essential context or rely on hover alone.

## New visual decisions

First, identify the existing token and primitive pattern that serves the same
meaning. If none fits, record the decision before creating a new visual rule:

1. The user/task purpose and the affected surface.
2. The user value and why the existing tokens or components cannot satisfy it.
3. The proposed token or pattern, affected states, responsive and accessibility
   impact, and rollback path.
4. The owner and review outcome; request a human decision when the choice is
   branding, information architecture, a material user flow, subjective visual
   direction, a novel interaction, or an accessibility-versus-usability trade-off.

Routine token reuse and implementation checks can proceed automatically. A
new token family, changed primitive contract, or unresolved human-gated choice
must be escalated through the delivery workflow rather than decided locally.
