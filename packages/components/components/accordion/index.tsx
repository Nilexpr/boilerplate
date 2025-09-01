import { Component, JSX } from "solid-js";
import * as accordion from "@zag-js/accordion";
import { normalizeProps, useMachine } from "@zag-js/solid";
import { createMemo, createUniqueId, For } from "solid-js";

const data = [
  { title: "Watercraft", content: "Sample accordion content" },
  { title: "Automobiles", content: "Sample accordion content" },
  { title: "Aircraft", content: "Sample accordion content" },
];

export const Accordion: Component<{
  machineProps: Omit<accordion.Props, "id">;
  item: (accordion.ItemProps & { content: JSX.Element; title: JSX.Element })[];
}> = (props) => {
  const service = useMachine(accordion.machine, {
    id: createUniqueId(),
    ...props.machineProps,
  });

  const api = createMemo(() => accordion.connect(service, normalizeProps));

  return (
    <div {...api().getRootProps()}>
      <For each={props.item}>
        {(item) => (
          <div {...api().getItemProps({ value: item.value })}>
            <h3>
              <button {...api().getItemTriggerProps({ value: item.value })}>
                {item.title}
              </button>
            </h3>
            <div {...api().getItemContentProps({ value: item.value })}>
              {item.content}
            </div>
          </div>
        )}
      </For>
    </div>
  );
};
