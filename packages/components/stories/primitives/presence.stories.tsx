import { Presence } from "@/primitives/presence/presence";
import { createSignal, ValidComponent } from "solid-js";
import type { Meta } from "storybook-solidjs-vite";

const meta: Meta = {
  title: "Primitives / Presence",
};

const Comp: ValidComponent = (props) => {
  return <div>Hidden and Hidden</div>;
};

export const Basic = () => {
  const [present, setPresent] = createSignal(false);

  return (
    <>
      <button type="button" onClick={() => setPresent(!present())}>
        Toggle
      </button>
      <Presence present={present()}>{Comp}</Presence>
    </>
  );
};

export default meta;
