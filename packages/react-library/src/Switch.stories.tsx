import type { Meta, StoryObj } from "@storybook/react-vite";
import { Switch } from "./Switch";

const meta = { title: "Components/Switch", component: Switch, tags: ["autodocs"], args: { label: "Email notifications", name: "notifications" } } satisfies Meta<typeof Switch>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Unchecked: Story = {};
export const Checked: Story = { args: { defaultChecked: true } };
export const Disabled: Story = { args: { disabled: true } };
export const FocusVisible: Story = { args: { className: "sf-switch--focus-visible-story" } };
