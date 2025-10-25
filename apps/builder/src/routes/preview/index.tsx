import { createFileRoute } from "@tanstack/solid-router";

export const Route = createFileRoute("/preview/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/preview/"!</div>;
}
