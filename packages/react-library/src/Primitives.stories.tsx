import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "./Text";

const textMeta = { title: "Components/Text", component: Text, tags: ["autodocs"], args: { children: "Body text" } } satisfies Meta<typeof Text>;
export default textMeta;
type TextStory = StoryObj<typeof textMeta>;
export const Default: TextStory = {};
export const Muted: TextStory = { args: { tone: "muted" } };
export const Heading: TextStory = { args: { as: "h2", children: "Section heading", size: "lg", weight: "bold" } };
