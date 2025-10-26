import { For } from "solid-js";
import { useComponentStore } from "./hooks/useComponentStore";

export const Comp = () => {
  const { components } = useComponentStore();

  return (
    <For each={components()}>
      {(component) => (
        <div
          class="bg-primary text-primary-foreground m-2 max-w-32 rounded-md p-2"
          onClick={() => {
            console.log(component);
          }}
        >
          {component.type}
        </div>
      )}
    </For>
  );
};
