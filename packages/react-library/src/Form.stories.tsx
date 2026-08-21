import type { Meta, StoryObj } from "@storybook/react-vite";
import { Form } from "./Form";
import { Field } from "./Field";
import { Select } from "./Select";

const meta = { title: "Components/Form", component: Form, tags: ["autodocs"] } satisfies Meta<typeof Form>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Form aria-label="Profile settings"><Field id="story-form-region" label="Region"><Select options={[{ label: "Korea", value: "kr" }, { label: "Japan", value: "jp" }]} /></Field></Form>,
};
