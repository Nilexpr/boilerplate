import type { Component } from "solid-js";

export const Header: Component = () => {
  return (
    <header class="bg-background flex h-14 items-center gap-4 border-b px-4">
      <div class="flex flex-1 items-center gap-4">
        <h1 class="text-lg font-semibold">Page Builder</h1>
      </div>
    </header>
  );
};
