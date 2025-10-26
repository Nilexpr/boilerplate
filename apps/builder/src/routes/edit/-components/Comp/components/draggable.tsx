import { createDraggable } from "@thisbeyond/solid-dnd";
import type { ParentComponent } from "solid-js";

export const Draggable: ParentComponent<{ id: string; type: string }> = (
  props,
) => {
  const draggable = createDraggable(props.id, { type: props.type });
  return (
    <div
      use:draggable
      class="transition-opacity"
      classList={{
        "opacity-50": draggable.isActiveDraggable,
      }}
    >
      <div>{props.children}</div>
    </div>
  );
};
