import { Optional } from "@/lib/types";
import { MaybeAccessor } from "@solid-primitives/utils";
import * as presence from "@zag-js/presence";
import { normalizeProps, useMachine } from "@zag-js/solid";
import { createMemo } from "solid-js";

export interface UsePresenceProps extends Optional<presence.Props, "present"> {}

export const usePresence = (props: MaybeAccessor<UsePresenceProps>) => {
  const service = useMachine(presence.machine, props);
  const api = createMemo(() => presence.connect(service, normalizeProps));

  return createMemo(() => ({
    present: api().present,
    ref: api().setNode,
  }));
};
