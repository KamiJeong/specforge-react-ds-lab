import type { Meta, StoryObj } from "@storybook/react-vite";
import { ReferenceComposition } from "./ReferenceComposition";

const meta = {
  title: "Foundations/Reference Composition",
  component: ReferenceComposition,
  tags: ["autodocs"],
  parameters: { docs: { description: { component: "A product-neutral baseline that composes existing form, data, action, and state primitives." } } },
} satisfies Meta<typeof ReferenceComposition>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
