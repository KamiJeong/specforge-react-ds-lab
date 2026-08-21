# @specforge/react-library

Internal React design-system reference library. Import `Button` from
`@specforge/react-library` and load `@specforge/react-library/tokens.css` when
your consumer does not bundle the library stylesheet. The CSS entry contains
the exported semantic token layer and this reference component's styles.

`Button` is a native button with `primary`, `secondary`, and `ghost` variants;
`sm`, `md`, and `lg` sizes; plus native disabled and `loading` behavior. An
icon-only button must supply `aria-label` or `aria-labelledby`.

Run `bun run storybook` and inspect `Components/Button`. The configured
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
check. The browser check verifies the required Button stories and documentation,
normal focus treatment, and the forced-colors focus fallback.
