# @specforge/react-library

Internal React design-system reference library. Import `Button`, `Text`,
`List`, `Table`, `Form`, `Field`, `Label`, `Select`, and `Switch` from
`@specforge/react-library` and load `@specforge/react-library/tokens.css` when
your consumer does not bundle the library stylesheet. The CSS entry contains
the exported semantic token layer and this reference component's styles.

`Button` is a native button with `primary`, `secondary`, and `ghost` variants;
`sm`, `md`, and `lg` sizes; plus native disabled and `loading` behavior. An
icon-only button must supply `aria-label` or `aria-labelledby`.

`Text` renders `p`, `span`, or native headings. `List` keeps native `ul`/`ol`
semantics, while `Table` preserves caller-provided native table structure and
can add a caption. `Form` is a ref-forwarding native `<form>` wrapper and does
not impose validation or submission policy. `Field` wires its native-control
child to optional label, help, and error content; a caller-supplied child `id`
is used for those associations. Standalone `Label` accepts `htmlFor`. `Select`
is a native select wrapper and accepts native select props, children, or an
`options` array. Its `size` accepts either a native numeric row count (which
retains multi-row/listbox behavior) or the token-led `"sm"`, `"md"`, and
`"lg"` presentation choices. `Switch` is a checkbox-backed control with `role="switch"`,
standard controlled/uncontrolled checked props, `onCheckedChange`, and an
optional visible `label`.

Run `bun run storybook` and inspect the `Components/*` pages. The configured
`@storybook/addon-mcp` exposes its MCP endpoint at `/mcp` (normally
`http://localhost:6006/mcp`) while the dev server is running.
## Component delivery baseline

Install the workspace dependencies and the Chromium binary once per development
or CI environment:

```sh
bun install
bun run install:component-browser
```

Run the full component-quality baseline with:

```sh
bun run verify:component
```

It runs TypeScript checking, component tests, the strict external-consumer
package contract, the distributable build, and a browser-observed Storybook
check. The browser check verifies the required primitive stories and
documentation, native keyboard behavior, normal focus treatment, and the
forced-colors focus fallback.
