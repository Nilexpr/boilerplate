import { fn } from "storybook/test";
import type { Meta, StoryObj } from "storybook-solidjs-vite";

import { Accordion } from "../components/accordion";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Accordion",
  component: Accordion,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ['autodocs'],
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    machineProps: { control: "object" },
    item: { control: "object" },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    machineProps: {},
    item: [],
  },
} satisfies Meta<typeof Accordion>;

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: StoryObj<typeof Accordion> = {
  args: {
    item: [
      {
        value: "1",
        title: "Title 1",
        content: "Content 1",
      },
    ],
    machineProps: {
      collapsible: true,
    },
  },
};
