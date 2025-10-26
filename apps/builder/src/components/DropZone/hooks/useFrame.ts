import { createSignal } from "solid-js";

export function useFrame() {
  const [frame, setFrame] = createSignal<{
    document?: Document;
    window?: Window;
  }>({});

  return {
    frame,
    setFrame,
  };
}
