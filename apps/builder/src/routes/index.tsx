import { createFileRoute, useNavigate } from "@tanstack/solid-router";

export const Route = createFileRoute("/")({
  component: IndexComponent,
});

function IndexComponent() {
  const navigate = useNavigate();
  return (
    <div>
      <button
        class="rounded-md bg-blue-500 p-2 text-white"
        onclick={() => {
          navigate({
            to: "/edit",
          });
        }}
      >
        Go to Editor
      </button>
      Hello IndexComponent!
    </div>
  );
}
