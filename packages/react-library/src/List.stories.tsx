import type { Meta, StoryObj } from "@storybook/react-vite";
import { List } from "./List";

const meta = { title: "Components/List", component: List, tags: ["autodocs"], args: { children: <><li>First item</li><li>Second item</li></> } } satisfies Meta<typeof List>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Unordered: Story = {};
export const Ordered: Story = { args: { ordered: true } };
