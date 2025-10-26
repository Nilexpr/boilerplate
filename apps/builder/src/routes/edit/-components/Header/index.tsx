import type { Component } from "solid-js";
import { Button } from "../../../../components/Button/button";
import { RuntimeClient } from "../../../../services/runtimeClient";
import { RegisterComponent } from "../../../../core/register-component";

export const Header: Component<{
  title?: string;
}> = (props) => {
  return (
    <header class="grid grid-cols-3 items-center gap-2 p-2">
      <h1 class="col-start-2 text-lg font-semibold">
        {props.title ?? "Page Builder"}
      </h1>

      <div class="flex flex-wrap justify-end gap-2">
        <Button>Save Draft</Button>
        <Button>Publish</Button>
        <Button
          onclick={() => {
            RuntimeClient.runPromise(RegisterComponent);
          }}
        >
          Add Component
        </Button>
      </div>
    </header>
  );
};
