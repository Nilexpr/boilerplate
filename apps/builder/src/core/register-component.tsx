import { Array, Console, Effect } from "effect";
import { ComponentStore } from "../services/component";
import { Button } from "../components/Button/button";
import { splitProps } from "solid-js";

export const RegisterComponent = Effect.gen(function* () {
  const componentStore = yield* ComponentStore;

  yield* componentStore.register(Button, {
    type: "button",
    componentName: "Button",
    props: {
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
            console.log("clicked");
          }}
        />
      );
    },
  });

  const list = yield* componentStore
    .list()
    .pipe(Effect.map(Array.fromIterable));

  yield* Console.log(list);
});
