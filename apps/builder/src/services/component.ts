import {
  Context,
  Effect,
  HashMap,
  Layer,
  Option,
  SubscriptionRef,
} from "effect";
import type { ComponentConfig } from "../types/config";
import type { Component, ComponentProps } from "solid-js";

export type ComponentStoreShape = {
  /** 组件状态 */
  state: SubscriptionRef.SubscriptionRef<
    HashMap.HashMap<string, ComponentConfig<any>>
  >;

  /** 注册一个组件 */
  readonly register: <C extends Component>(
    component: C,
    config: ComponentConfig<ComponentProps<C>>,
  ) => Effect.Effect<HashMap.HashMap<string, ComponentConfig<any>>>;

  /** 获取一个组件 */
  readonly get: (
    type: string,
  ) => Effect.Effect<Option.Option<ComponentConfig<any>>>;

  /** 获取所有组件 */
  readonly list: () => Effect.Effect<IterableIterator<ComponentConfig<any>>>;
};

export class ComponentStore extends Context.Tag("ComponentStore")<
  ComponentStore,
  ComponentStoreShape
>() {
  static readonly Live = Layer.effect(
    this,
    Effect.gen(function* () {
      const state = yield* SubscriptionRef.make(
        HashMap.empty<string, ComponentConfig<any>>(),
      );

      return {
        state,

        register: (_component, config) => {
          return Effect.gen(function* () {
            const result = yield* SubscriptionRef.updateAndGet(
              state,
              (components) => HashMap.set(components, config.type, config),
            );
            return result;
          });
        },

        get: (type: string) => {
          return Effect.gen(function* () {
            const components = yield* SubscriptionRef.get(state);
            const result = HashMap.get(components, type);

            return result;
          });
        },

        list: () => {
          return Effect.gen(function* () {
            const components = yield* SubscriptionRef.get(state);
            return HashMap.values(components);
          });
        },
      };
    }),
  );
}
