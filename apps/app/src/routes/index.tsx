import { createFileRoute } from "@tanstack/solid-router";
import { Tooltip } from "../components/dialog";
import { Accordion } from "../components/accordion";

export const Route = createFileRoute("/")({
  component: IndexComponent,
});

function IndexComponent() {
  return (
    <div class="text-center">
      <button class="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900">
        Button
      </button>
      <Tooltip />
      <Accordion />
      <button class="btn btn-primary text-left">Button</button>
    </div>
  );
}
