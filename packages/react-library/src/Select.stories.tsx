import type { Meta, StoryObj } from "@storybook/react-vite";
import { Field } from "./Field";
import { Select } from "./Select";

const meta = { title: "Components/Select", component: Select, tags: ["autodocs"], args: { "aria-label": "Region", options: [{ label: "Korea", value: "kr" }, { label: "Japan", value: "jp" }] } } satisfies Meta<typeof Select>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true } };
export const FocusVisible: Story = { args: { autoFocus: true, className: "sf-select--focus-visible-story" } };
export const Error: Story = { render: () => <Field error="Choose a region" id="select-error" label="Region"><Select tone="danger" options={[{ label: "Choose one", value: "" }]} /></Field> };
