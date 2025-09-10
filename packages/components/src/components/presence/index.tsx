import * as presence from "@zag-js/presence";
import { useMachine, normalizeProps } from "@zag-js/solid";
import {
  createMemo,
  JSX,
  Show,
  splitProps,
  createUniqueId,
  onCleanup,
  onMount,
} from "solid-js";

interface PresenceProps {
  present: boolean;
  unmountOnExit?: boolean;
  onExitComplete?: () => void;
  children: JSX.Element;
  class?: string;
}

export function Presence(props: PresenceProps) {
  const [machineProps, localProps] = splitProps(props, [
    "present",
    "unmountOnExit",
    "onExitComplete",
  ]);
  machineProps.present;

  const service = useMachine(presence.machine, machineProps);

  const api = createMemo(() => presence.connect(service, normalizeProps));
  const unmount = createMemo(
    () => !api().present && machineProps.unmountOnExit
  );

  onCleanup(() => {
    console.log("unmount");
  });

  onMount(() => {
    console.log("mount");
  });

  return (
    <Show when={!unmount()}>
      <div
        data-i={createUniqueId()}
        hidden={!api().present}
        // data-state={
        //   api().skip ? undefined : machineProps.present ? "open" : "closed"
        // }
        data-state={machineProps.present ? "open" : "closed"}
        ref={api().setNode}
        {...localProps}
      >
        <div class="flex flex-col gap-2">
          <div>{api().present ? "open" : "closed"}</div>
          <div>{!unmount() ? "should show?" : "should not show?"}</div>
        </div>
      </div>
    </Show>
  );
}
