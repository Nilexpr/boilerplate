import { createFileRoute } from "@tanstack/solid-router";
import { Accordion } from "../components/accordion";
// import { Presence } from "@repo/components/presence";
import { createSignal } from "solid-js";

export const Route = createFileRoute("/")({
  component: IndexComponent,
});

function IndexComponent() {
  const [showStuff, setShowStuff] = createSignal(true);

  console.log(Accordion);

  return (
    <div class="flex flex-col gap-2 text-center">
      <Accordion />
      <button onclick={() => setShowStuff(!showStuff())}>
        {showStuff() ? "Hide" : "Show"}
      </button>

      {/* <Presence
        present={showStuff()}
        class="data-[state=open]:animate-in data-[state=closed]:animate-out fade-in slide-in-from-top-8 fade-out slide-out-to-top-8 duration-500"
      >
        <span>Hello World</span>
      </Presence> */}
    </div>
  );
}
