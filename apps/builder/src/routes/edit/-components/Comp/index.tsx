import { For } from "solid-js";
import { useComponentStore } from "./hooks/useComponentStore";
import { Draggable } from "./components/draggable";

export const Comp = () => {
  const { components } = useComponentStore();

  return (
    <For each={components()}>
      {(component) => (
        <Draggable id={component.type} type={component.type}>
          <div
            class="bg-primary text-primary-foreground m-2 max-w-32 rounded-md p-2"
            onClick={() => {
              console.log(component);
            }}
          >
            {component.type}
          </div>
        </Draggable>
      )}
    </For>
  );
};
