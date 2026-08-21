# UI composition rules

These rules compose the existing `@specforge/react-library` primitives into
work-oriented interfaces. They supplement, rather than replace, the
[design foundation](./design-foundation.md).

## Compose pages and sections

Start with a clear page purpose, then use section headings and spacing to group
related work. Reserve the primary `Button` for the one action that advances the
current task; secondary or ghost actions support it only when meaningful.
Prefer spacing, headings, borders, and `--sf-color-surface-subtle` sections to
cards. Use a card or elevated surface only when it represents a true contained
object, boundary, or temporary layer. Do not nest cards or floating surfaces
just to make a work screen look designed.

Use `Form`, `Field`, and `Label` together. Put the label before its control,
help text immediately after the control, and an error immediately after help
text. Preserve the native association and error semantics that `Field` supplies.
Use `Table` for comparable scan-friendly data, with a caption and headers; use
`List` for sequential or non-tabular content. Keep forms and tables
medium-density: use the 4px `--sf-space-*` cadence, avoid oversized row or
field padding, and let narrow layouts scroll or stack without truncating
labels, values, or actions.

Every composition accounts for loading, empty, error, and disabled states when
they apply. Explain what is loading, offer an empty-state next step, keep an
error close to its source, and make disabled controls visibly unavailable with
their reason available in surrounding text when needed. Reuse the same existing
component and token pattern for the same meaning across screens.

## Component Design Contract

Before a new shared component is accepted, document only its representative
contract—not every prop combination—and cover this checklist:

- Purpose, intended users, and use conditions.
- Anatomy and relationships to existing `--sf-*` tokens and components.
- Public API, including applicable size and variant choices.
- Representative default, hover, active, focus, disabled, loading, and error
  states where each state applies.
- Text, icon, keyboard, focus, accessible-name, and responsive rules.
- Do and Don't guidance, including when to reuse an existing component instead.

## Visual restraint and exceptions

The following are not defaults: decorative gradients, glassmorphism, glow,
neumorphism, indiscriminate pill or round styling, nested-card or
floating-surface patterns, meaningless shadows or icons, oversized headings
unrelated to information importance, and landing-page treatment of work
screens. An exception requires a short record with the prohibited/default-
disallowed choice, its stated purpose, user value, and why existing patterns
cannot satisfy it. Record affected states and the approving owner as well.

## Automatic checks and human gates

Automatable candidates include token and feasible hard-coded-style checks,
semantic HTML/ARIA, keyboard and focus behavior, contrast/accessibility checks,
Storybook builds, and regression checks. They provide evidence but do not decide
brand direction or product semantics. Branding, new information architecture,
material user flows, subjective visual direction, novel interaction, and
accessibility-versus-usability trade-offs require a human decision.
