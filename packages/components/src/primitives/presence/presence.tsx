import { mergeProps, Show, splitProps } from "solid-js";
import { usePresence } from "./use-presence";
import { Primitive, PrimitiveProps } from "@/components/primitive/primitive";
import { composeRefs } from "@/lib/compose-refs";

export interface PresenceProps extends PrimitiveProps<"div"> {
  present: boolean;
}

export const Presence = (props: PresenceProps) => {
  const [presenceProps, localProps] = splitProps(props, ["present"]);
  const api = usePresence(presenceProps);
  const mergedProps = mergeProps(() => api().presenceProps, localProps);

  return (
    <Show when={api().present}>
      <Primitive.div
        ref={composeRefs(api().ref, props.ref)}
        data-scope="presence"
        data-part="root"
      ></Primitive.div>
    </Show>
  );
};
