import { Component, createResource, createSignal, onMount } from "solid-js";
import { trpc } from "../lib/trpc";
import { Presence } from "@repo/components/presence";

export const Test: Component = () => {
  const [name, setName] = createSignal("Luke Skywalker");

  const [showPresence, setShowPresence] = createSignal(true);

  // onMount(async () => {
  //   const res = await trpc.hello.query();
  //   console.log(res);
  // });

  return (
    // <div>123</div>
    <div class="flex flex-col gap-2">
      {/* <h2>Name:</h2> */}
      <div>{name()}</div>
      <input type="text" onInput={(e) => setName(e.target.value)} />
      <button onclick={() => setShowPresence(!showPresence())}>Presence</button>
      <Presence
        present={showPresence()}
        class="data-[state=open]:animate-in data-[state=closed]:animate-out fade-in slide-in-from-top-8 fade-out slide-out-to-top-8 duration-500"
      >
        <span>Hello World</span>
      </Presence>
    </div>
  );
};
