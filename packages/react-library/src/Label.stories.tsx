import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "./Label";

const meta = { title: "Components/Label", component: Label, tags: ["autodocs"], args: { children: "Email", htmlFor: "story-email" } } satisfies Meta<typeof Label>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: (args) => <><Label {...args} /><input id="story-email" /></> };
