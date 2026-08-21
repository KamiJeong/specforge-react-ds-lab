import type { Meta, StoryObj } from "@storybook/react-vite";
import { Field } from "./Field";
import { Select } from "./Select";

const meta = { title: "Components/Field", component: Field, tags: ["autodocs"] } satisfies Meta<typeof Field>;
export default meta;
type Story = StoryObj<typeof meta>;
export const WithHelp: Story = { args: { id: "story-region", label: "Region", helpText: "Used for local settings", children: <Select options={[{ label: "Korea", value: "kr" }, { label: "Japan", value: "jp" }]} /> } };
export const Error: Story = { args: { id: "story-error-region", label: "Region", helpText: "Used for local settings", error: "Choose a region", children: <Select tone="danger" options={[{ label: "Choose one", value: "" }]} /> } };
