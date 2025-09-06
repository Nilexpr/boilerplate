import type { Component } from "solid-js";
import { splitProps } from "solid-js";
import * as accordion from "@zag-js/accordion";
import { normalizeProps, useMachine } from "@zag-js/solid";
import { createMemo, createUniqueId, For } from "solid-js";
import { cn } from "@/lib/utils";
import { AccordionProps } from "./interface";

const AccordionRoot = (props) => {
  return <div {...props}>{props.children}</div>;
};

const AccordionItem = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <div class={cn("border-b last:border-b-0", local.class)} {...others}>
      {props.children}
    </div>
  );
};

const AccordionTrigger = (props) => {
  return (
    <h3 class="flex" {...props}>
      <button>{props.children}</button>
    </h3>
  );
};

const AccordionContent = (props) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <div
      class={cn(
        "animate-accordion-up overflow-hidden text-sm transition-all data-[expanded]:animate-accordion-down",
        local.class
      )}
      {...others}
    >
      <div class="pb-4 pt-0">{local.children}</div>
    </div>
  );
};

const AccordionIndicator = () => {
  return <div></div>;
};

export const Accordion: Component<AccordionProps> = (props) => {
  const [_, others] = splitProps(props, ["items"]);

  const service = useMachine(accordion.machine, {
    id: createUniqueId(),
    ...others,
  });

  const api = createMemo(() => accordion.connect(service, normalizeProps));

  return (
    <AccordionRoot {...api().getRootProps()}>
      <For each={props.items}>
        {(item) => (
          <AccordionItem {...api().getItemProps({ value: item.value })}>
            <AccordionTrigger
              {...api().getItemTriggerProps({
                value: item.value,
                disabled: item.disabled,
              })}
            >
              {item.trigger}
            </AccordionTrigger>

            <AccordionContent
              {...api().getItemContentProps({ value: item.value })}
            >
              {item.content}
            </AccordionContent>
          </AccordionItem>
        )}
      </For>
    </AccordionRoot>
  );
};
