import { Array, Console, Effect } from "effect";
import { ComponentStore } from "../services/component";
import { Button } from "../components/Button/button";
import { splitProps } from "solid-js";
import { Flex } from "../components/Flex";

export const RegisterComponent = Effect.gen(function* () {
  const componentStore = yield* ComponentStore;

  yield* componentStore.register(Button, {
    type: "button",
    componentName: "Button",
    defaultProps: {
      label: "Button",
    },
    fields: {
      label: {
        type: "text",
        label: "Label",
      },
    },
    render: (props) => {
      const [ctx, localProps] = splitProps(props, ["ctx"]);
      return (
        <Button
          {...localProps}
          onclick={() => {
            console.log("clicked", {
              ctx,
            });
          }}
        />
      );
    },
  });

  yield* componentStore.register(Flex, {
    type: "flex",
    componentName: "Flex",
    defaultProps: {
      justifyContent: "start",
      direction: "row",
      gap: 24,
      items: [],
    },
    fields: {
      direction: {
        label: "Direction",
        type: "text",
      },
      justifyContent: {
        label: "Justify Content",
        type: "text",
      },
      gap: {
        label: "Gap",
        type: "number",
      },
      items: {
        type: "slot",
      },
    },
    render: (props) => {
      const [ctx, localProps] = splitProps(props, ["ctx"]);
      return <Flex {...localProps} />;
    },
  });

  const list = yield* componentStore
    .list()
    .pipe(Effect.map(Array.fromIterable));

  yield* Console.log(list);
});
