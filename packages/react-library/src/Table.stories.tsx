import type { Meta, StoryObj } from "@storybook/react-vite";
import { Table } from "./Table";

const meta = { title: "Components/Table", component: Table, tags: ["autodocs"], args: { caption: "Team members", children: <><thead><tr><th scope="col">Name</th><th scope="col">Role</th></tr></thead><tbody><tr><td>Ada</td><td>Engineer</td></tr></tbody></> } } satisfies Meta<typeof Table>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
