import * as accordion from "@zag-js/accordion";
import { normalizeProps, useMachine } from "@zag-js/solid";
import { createMemo, createUniqueId, For } from "solid-js";

const data = [
  { title: "Watercraft", content: "Sample accordion content" },
  { title: "Automobiles", content: "Sample accordion content" },
  { title: "Aircraft", content: "Sample accordion content" },
];

export function Accordion() {
  const service = useMachine(accordion.machine, { id: createUniqueId() });

  const api = createMemo(() => accordion.connect(service, normalizeProps));

  return (
    <div {...api().getRootProps()}>
      <For each={data}>
        {(item) => (
          <div
            {...api().getItemProps({ value: item.title })}
            class="collapse  collapse-arrow bg-base-100 border border-base-300"
          >
            <input type="radio" name="my-accordion-4" />
            <button
              {...api().getItemTriggerProps({ value: item.title })}
              class="collapse-title font-semibold"
            >
              {item.title}
            </button>
            <div
              {...api().getItemContentProps({ value: item.title })}
              class="collapse-content text-sm"
            >
              {item.content}
            </div>
          </div>
        )}
      </For>
    </div>
  );
}
