import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Presence } from "@/components/presence";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Presence> = {
  title: "components/presence",
  component: Presence,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
    controls: { exclude: ["children"] },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ['autodocs'],
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // argTypes: {
  //   data: { control: "object" },
  //   collapsible: { control: "boolean" },
  //   multiple: { control: "boolean" },
  //   value: { control: "object" },
  //   onValueChange: { action: "onValueChange" },
  //   onFocusChange: { action: "onFocusChange" },
  // },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    present: true,
    // children: (
    //   <div class="animate-in fade-in zoom-in">
    //     <span>123123</span>
    //     <span>321312</span>
    //   </div>
    // ),
  },
  render: (args) => (
    <Presence {...args}>
      <div class="animate-in fade-in zoom-in animate-out duration-1000">
        <span>123123</span>
        <span>321312</span>
      </div>
    </Presence>
  ),
};

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
/** 基础使用 */
export const Basic: StoryObj<typeof Presence> = {
  args: {
    present: true,
    // unmountOnExit: true,
  },
  render: (args) => (
    <Presence
      {...args}
      class="data-[state=open]:animate-in data-[state=closed]:animate-out fade-in slide-in-from-top-8 fade-out slide-out-to-top-8 duration-500"
    >
      <span>123123</span>
      <span>321312</span>
    </Presence>
  ),
};
