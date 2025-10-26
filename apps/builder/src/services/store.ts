import { Context, Effect, Layer, SynchronizedRef } from "effect";
import type { ComponentConfig } from "../types/config";
import type { Project } from "../schemas/project";

export type BuilderStoreShape = {
  readonly state: SynchronizedRef.SynchronizedRef<typeof Project.Type>;

  components: Record<string, ComponentConfig<any>>;
};

export class BuilderStore extends Context.Tag("BuilderStore")<
  BuilderStore,
  BuilderStoreShape
>() {
  static readonly Live = Layer.effect(
    this,
    Effect.gen(function* () {
      return {} as BuilderStoreShape;
    }),
  );
}
