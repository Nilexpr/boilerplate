import { Component, createResource, createSignal, onMount } from "solid-js";
import { trpc } from "../lib/trpc";

export const Test: Component = () => {
  const [name, setName] = createSignal("Luke Skywalker");

  onMount(async () => {
    const res = await trpc.hello.query();
    console.log(res);
  });

  return (
    <>
      <h2>Name:</h2>
      <div>{name()}</div>
      <input type="text" onInput={(e) => setName(e.target.value)} />
    </>
  );
};
