import * as collapsible from "@zag-js/collapsible";
import { normalizeProps, useMachine } from "@zag-js/solid";
import { createMemo, createUniqueId, mergeProps, splitProps } from "solid-js";

export const Collapsible = (props: collapsible.Props) => {
  const [machineProps, localProps] = splitProps(props, collapsible.props);

  const service = useMachine(
    collapsible.machine,
    mergeProps({
      id: createUniqueId(),
      ...machineProps,
    })
  );

  const api = createMemo(() => collapsible.connect(service, normalizeProps));

  return (
    <div {...api().getRootProps()}>
      <button {...api().getTriggerProps()}>Collapse Trigger</button>
      <div {...api().getContentProps()}>Collapse Content</div>
    </div>
  );
};
