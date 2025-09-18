import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Primitive } from "@/components/primitive";
import { Component, JSX } from "solid-js";

const meta: Meta<typeof Primitive> = {
  title: "core/primitive",
};

export default meta;

const Comp: Component<JSX.IntrinsicElements["div"]> = (props) => {
  return <div {...props}>I am a component</div>;
};

export const RenderAsTag: StoryObj<typeof Primitive> = {
  render: (args) => <Primitive.div>123</Primitive.div>,
};

export const TagWithComponent: StoryObj<typeof Primitive> = {
  render: (args) => (
    <Primitive.div
      asChild={(props) => (
        <Comp {...props} onclick={() => console.log("clicked", props())} />
      )}
      class="text-red-500"
    ></Primitive.div>
  ),
};

export const CombineProps: StoryObj<typeof Primitive> = {
  render: (args) => (
    <Primitive.div
      class="text-red-500"
      onclick={() => console.log("clicked primitive")}
      asChild={(props) => {
        return (
          <Comp
            {...props}
            class="text-blue-500"
            onclick={() => console.log("clicked component in asChild", props())}
          />
        );
      }}
    >
      <Comp
        class="text-blue-500"
        onclick={() => console.log("clicked component in children")}
      />
    </Primitive.div>
  ),
};
