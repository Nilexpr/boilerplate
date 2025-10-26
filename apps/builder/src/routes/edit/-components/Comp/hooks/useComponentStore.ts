import { createSignal, onMount, onCleanup } from "solid-js";
import { Effect, Fiber, HashMap, Stream } from "effect";
import { ComponentStore } from "../../../../../services/component";
import { RuntimeClient } from "../../../../../services/runtimeClient";
import type { ComponentConfig } from "../../../../../types/config";

export function useComponentStore() {
  const [components, setComponents] = createSignal<ComponentConfig<any>[]>([]);

  onMount(() => {
    const program = Effect.gen(function* () {
      const store = yield* ComponentStore;

      const changesStream = store.state.changes;

      yield* Stream.runForEach(changesStream, (hashMap) => {
        const componentsArray = Array.from(HashMap.values(hashMap));
        setComponents(componentsArray);
        return Effect.succeed(true);
      });
    });

    const runningFiber = RuntimeClient.runFork(program);

    onCleanup(() => {
      Fiber.interruptFork(runningFiber);
    });
  });

  return {
    components,
  };
}
