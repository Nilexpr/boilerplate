import { createFileRoute } from "@tanstack/solid-router";
import { Accordion } from "../components/accordion";

export const Route = createFileRoute("/")({
  component: IndexComponent,
});

function IndexComponent() {
  return (
    <div class="text-center">
      <Accordion />
    </div>
  );
}
